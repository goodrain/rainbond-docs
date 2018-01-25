---
title: Dubbo示例
summary: 在云帮部署Dubbo框架示例
toc: false
toc_not_nested: true
asciicast: true
---
<div class="filters filters-big clearfix">
    <a href="dubbo-overview.html"><button class="filter-button">Dubbo概述</button></a>
    <a href="dubbo-demo-construction.html"><button class="filter-button">Dubbo示例</button></a>
    <a href="dubbo-deploy.html"><button class="filter-button current"><strong>云帮部署Dubbo</strong></button></a>
</div>

<div id="toc"></div>

上一篇文章已经介绍了使用Dubbo微服务架构实现投票的示例结构。下图即是本文对应投票系统示例的演示界面:

- 输入投票人姓名回车，进入投票界面
- 点赞，即可实现投票

{{site.data.alerts.callout_info}}

该图为Dubbo投票示例运行后的界面

<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy1.png" width="40%"/>

<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy3.png" width="80%"/>

{{site.data.alerts.end}}

下边将根据此示例介绍如何配置Dubbo应用；并将Dubbo应用容器化后部署在云帮平台上。

## 创建项目

下面我们就会用[Spring Boot](https://projects.spring.io/spring-boot/)开发服务提供方Service Provider和服务调用方Service Web。

{{site.data.alerts.callout_success}}

本文主要讲解配置，点击查看[示例源码](https://github.com/goodrain-apps/Dubbo-Demo)。

{{site.data.alerts.end}}

### 定义接口

创建一个Maven模块service-api，定义服务接口。

{% include copy-clipboard.html %}

```Java
//user service
public interface UserService {
  	public Integer registerUser(String name);
  	public String getUser(Integer id);
}
```

{% include copy-clipboard.html %}

```java
//vote service
public interface VoteService {
    public String agree(String name, String topic);
  	public String disagree(String name, String topic);
}
```

在pom.xml中引入对Dubbo的依赖：

{% include copy-clipboard.html %}

```xml
<dependencies>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>dubbo</artifactId>
        <version>2.5.3</version>
    </dependency>
</dependencies>
```

我们用的是dubbo 2.5.3版本，读者如果愿意尝试更新的版本，可以自行调整。

### Provider服务

投票应用Provider服务包括User-Provider与Vote-Provider。此处以User-Provider为例介绍Provider服务配置：

1. 创建Userservice的实现类

   {% include copy-clipboard.html %}

```Java
public class UserServiceImpl implements UserService {
  	private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	private Map<Integer, String> userRegisterDB = new HashMap<Integer, String>();
  	public Integer registerUser(String name) {
	.......
}
```

2. 为了能找到服务接口，需要在pom.xml中定义对service-api的依赖。

   {% include copy-clipboard.html %}

```xml
<dependency>
  <groupId>com.goodrain</groupId>
  <artifactId>demo.vote.service</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependency>
```

3. Dubbo通过spring xml配置文件的方式声明对zookeeper的访问。在resources目录下创建provider.xml，其中最重要的内容是指定zookeeper的地址和端口。xml文件中的其他内容包括指定本服务的侦听端口为`28018`，UserService的接口API类等。

   {% include copy-clipboard.html %}

```xml
<dubbo:application name="demo.user.provider" />
<!-- <dubbo:registry protocol="zookeeper" address="127.0.0.1:2181" />  
指定Zookeeper address 不同写法-->
<dubbo:registry address="zookeeper://127.0.0.1:2181" />
<dubbo:protocol name="dubbo" port="28018" host="localhost" />
<dubbo:service interface="com.goodrain.demo.vote.service.UserService" ref="userService" />
```

4. xml文件中的其他内容包括指定本服务的侦听端口为`20880`，`GreetingsImpl`类实现的接口API类等。

下面要在pom.xml引入dubbo的项目依赖（其它依赖可参考[源码](https://github.com/goodrain-apps/Dubbo-Demo)）。

{% include copy-clipboard.html %}

```Xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>dubbo</artifactId>
  <version>2.5.3</version>
  <exclusions>
    <exclusion>
      <artifactId>spring</artifactId>
      <groupId>org.springframework</groupId>
    </exclusion>
    <exclusion>
      <groupId>org.jboss.netty</groupId>
      <artifactId>netty</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

5. Springboot有一个很好的特性，就是把一个Java应用的所有相关依赖打包成为一个超级JAR包，对于生成Docker镜像来说非常方便。在pom.xml编译模块添加:

   {% include copy-clipboard.html %}

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

6. 创建一个Spring主类。由于Dubbo采用xml配置文件的方式，则在主类中声明加载provider.xml配置文件.

   {% include copy-clipboard.html %}

```java
public class Launch {
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("provider.xml");
		context.start();
		logger.info("user provider started!");
	}
}
```

### Web 服务调用

1. Web服务调用的配置与Provider服务配置类似，也需要在pom.xml中引入对dubbo, service-api的依赖和springboot的编译方式。在resouces目录下创建vote-dubbo.xml，声明zookeeper的地址和要访问的服务接口：

   {% include copy-clipboard.html %}

```Xml
<dubbo:application name="demo.vote.web" />
<dubbo:registry address="zookeeper://zookeeper:2181" />
<!-- user-provider接口 -->
<dubbo:reference id="voteService" 		interface="com.goodrain.demo.vote.service.VoteService" />
<!-- vote-provider接口 -->
<dubbo:reference id="userService" 		interface="com.goodrain.demo.vote.service.UserService" />
```

2. 创建Spring主类，使用另外一种方式声明加载vote-dubbo.xml配置文件。通过`@ImportResource`声明加载配置文件。

   {% include copy-clipboard.html %}

```java
@ImportResource({ "classpath:vote-dubbo.xml" })
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
```

3. Springboot Web应用启动后会自动侦听8080端口。

### 编译源码

在Service Provider与Service Web的源码目录下执行以下命令，编译源码：

{% include copy-clipboard.html %}

```
mvn package
```

## 项目容器化

1. Provider服务与Web服务调用通过Zookeeper注册服务。Zookeeper已经有了Docker镜像，可在云帮[创建应用-应用市场](https://user.goodrain.com/apps/grapps/service-entrance/?ty=app)搜索Zookeeper应用一键部署。

2. 新建目录，并将此目录作为新的源码目录。待完成编辑Dockerfile，将Dockerfile与前边生成的编译后jar包放置此新建目录。Dockerfile内容如下：

   {% include copy-clipboard.html %}

```dockerfile
FROM goodrainapps/maven:jdk7-alpine
COPY target/<jar-name>.jar <jar-name>.jar
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/<jar-name>.jar"]
```

{{site.data.alerts.callout_success}}

此处`<jar-name>.jar`为pom.xml中配置的名称。

{{site.data.alerts.end}}

## 在云帮部署Dubbo应用

### 创建

获取您代码仓库中包含Dockerfile的源码地址，使用该地址在云帮部署应用。此处应用一并部署Zookeeper应用，方便后边依赖使用。

参考文档[创建应用-从源码](http://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-code.html)

### 端口

[创建应用-应用设置](http://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-code.html#part-2c9f27d6be436681)部分需将应用服务端口指定。如图：

- Provider服务开设端口类型为http，设置对外服务（内部访问）<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy4.png" width="100%"/>

- Web服务开设端口累心为http，设置外部访问

  <img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy4.png" width="100%"/>

### 依赖

以Dubbo-投票示例结构举例说明。

1. Vote-Web服务、Vote-Provider服务、User-Provider服务均依赖Zookeeper。这三个服务创建完毕的时候，在[应用控制台-依赖](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html)选择关联刚刚创建的Zookeeper。

   <img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy6.png" width="100%"/>


2. Web服务依赖Provider服务，故在本示例Vote-Web服务应当依赖Vote-Provider服务与User-Provider服务，依赖方式与上相同。

   <img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-deploy7.png" width="100%"/>

   此时Web服务应当依赖Zookeeper于其他Provider服务。

##### 由于配置改变，此时需重启应用适配。待重启完毕即可访问Dubbo架构的应用了！