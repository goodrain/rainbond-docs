---
title: Eureka组件
summary: 讲解如何搭建Eureka组件
toc: false
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="spring-cloud.html"><button class="filter-button">1. 概述</button></a>
    <a href="spring-cloud-Eureka.html"><button class="filter-button current"><strong>2. Eureka组件</strong></button></a>
    <a href="spring-cloud-Hystrix.html"><button class="filter-button">3. Hystrix组件</button></a>
    <a href="spring-cloud-Config.html"><button class="filter-button">4. Config组件</button></a>
    <a href="spring-cloud-Zuul.html"><button class="filter-button">5. Zuul组件</button></a>
</div>

<div id="toc"></div>


## 组件介绍

​注册中心，云端服务发现，一个基于 REST 的服务，用于定位服务。任何服务需要其它服务的支持都需要通过它获取；同样的，所有的服务都需要来这里注册，方便以后其它服务来调用；它的好处是你不需要知道找什么服务，只需要到注册中心来获取，也不需要知道提供支持的服务在哪里，是几个服务来支持的，直接来这里获取就可以了，提升了稳定性，降低了微服务架构搭建的难度。

##项目描述

​	Eureka组件是注册中心，用于各个服务之间的互相发现。

	正常调用服务A请求服务B：

	<div align=center>
	<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/bestpractice/microservice/eureka-1.png" width="50%" height="50%">
	</div>

有了服务中心之后，服务A不能直接调用服务B，而是A,B通过在注册中心中注册服务，然后互相发现，服务A通过注册中心来调用服务B：
	
	<div align=center>
	<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/bestpractice/microservice/eureka-2.png" width="75%" height="75%">
	</div>

	以上只是2个服务之间的相互调用，如果有十几个甚至几十个服务，其中任何的一个项目改动，就可能牵连到好几个项目的重启，很麻烦而且容易出错。通过注册中心来获取服务，你不需要关注你调用的项目IP地址，由几台服务器组成，每次直接去注册中心获取可以使用的服务去调用既可。

## 部署到云帮

### 注册服务

​	1、pom中添加依赖

```
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-eureka-server</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
```

​	2、添加启动代码中添加`@EnableEurekaServer`注解

```
@SpringBootApplication
@EnableEurekaServer
public class SpringCloudEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudEurekaApplication.class, args);
	}
}
```

​	3、配置文件

在默认设置下，该服务注册中心也会将自己作为客户端来尝试注册它自己，所以我们需要禁用它的客户端注册行为，在`application.properties`添加以下配置：

```
spring.application.name=spring-cloud-eureka

server.port=8000
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false

eureka.client.serviceUrl.defaultZone=http://localhost:${server.port}/eureka/

```

- `eureka.client.register-with-eureka` ：表示是否将自己注册到Eureka Server，默认为true。
- `eureka.client.fetch-registry` ：表示是否从Eureka Server获取注册信息，默认为true。
- `eureka.client.serviceUrl.defaultZone` ：设置与Eureka Server交互的地址，查询服务和注册服务都需要依赖这个地址。默认是http://localhost:8761/eureka ；多个地址可使用 , 分隔。

启动工程后，访问：http://localhost:8000/，可以看到下面的页面，其中还没有发现任何服务

	<div align=center>
	<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/bestpractice/microservice/eureka-3.png" width="100%" height="100%">
	</div>

###服务提供者(B)

	1、pom包配置

创建一个springboot项目，pom.xml中添加如下配置：

```
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-eureka</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>

```

	2、配置文件

application.properties配置如下：

```
spring.application.name=spring-cloud-producer
server.port=9000
eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/

```

	3、启动类

启动类中添加`@EnableDiscoveryClient`注解

```
@SpringBootApplication
@EnableDiscoveryClient
public class ProducerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProducerApplication.class, args);
	}
}

```

	4、服务提供

提供hello服务：

```
@RestController
public class HelloController {
	
    @RequestMapping("/hello")
    public String index(@RequestParam String name) {
        return "hello "+name+"，this is first messge";
    }
}

```

添加`@EnableDiscoveryClient`注解后，项目就具有了服务注册的功能。启动工程后，就可以在注册中心的页面看到SPRING-CLOUD-PRODUCER服务。

	<div align=center>
	<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/bestpractice/microservice/eureka-4.png" width="100%" height="100%">
	</div>

到此服务提供者配置就完成了。

###服务消费者（A）

	1、pom包配置

和服务提供者一致

```
<dependencies>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-eureka</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>

```

	2、配置文件

application.properties配置如下：

```
spring.application.name=spring-cloud-consumer
server.port=9001
eureka.client.serviceUrl.defaultZone=http://localhost:8000/eureka/

```

	3、启动类

启动类添加`@EnableDiscoveryClient`和`@EnableFeignClients`注解：

```
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ConsumerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsumerApplication.class, args);
	}

}

```

- `@EnableDiscoveryClient` :启用服务注册与发现
- `@EnableFeignClients`：启用feign进行远程调用

{{site.data.alerts.callout_success}}
Feign是一个声明式Web Service客户端。使用Feign能让编写Web Service客户端更加简单, 它的使用方法是定义一个接口，然后在上面添加注解，同时也支持JAX-RS标准的注解。Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡。
{{site.data.alerts.end}}

4、feign调用实现

```
@FeignClient(name= "spring-cloud-producer")
public interface HelloRemote {
    @RequestMapping(value = "/hello")
    public String hello(@RequestParam(value = "name") String name);
}

```

- name:远程服务名，及spring.application.name配置的名称

此类中的方法和远程服务中contoller中的方法名和参数需保持一致。

5、web层调用远程服务

将HelloRemote注入到controller层，像普通方法一样去调用即可。

```
@RestController
public class ConsumerController {

    @Autowired
    HelloRemote HelloRemote;
	
    @RequestMapping("/hello/{name}")
    public String index(@PathVariable("name") String name) {
        return HelloRemote.hello(name);
    }

}

```

到此，最简单的一个服务注册与调用的例子就完成了。

###测试

依次启动spring-cloud-eureka、spring-cloud-producer、spring-cloud-consumer三个项目。

先输入：`http://localhost:9000/hello?name=neo` 检查spring-cloud-producer服务是否正常

返回：`hello neo，this is first messge`

说明spring-cloud-producer正常启动，提供的服务也正常。

浏览器中输入：`http://localhost:9001/hello/neo`

返回：`hello neo，this is first messge`

说明客户端已经成功的通过feign调用了远程服务hello，并且将结果返回到了浏览器。

{{site.data.alerts.callout_danger}}
部署在云帮，需要验证必须保证一下3点：<br>
1. 端口开启了`外部访问`功能<br>
2. consumer关联了producer<br>
3. `hello?name=neo`和`hello/neo`添加在`访问`所产生的url后<br>

之后组件的验证同理。


