---
title: Java Maven源码构建应用
description: Java Maven源码构建应用
hidden: true
---

#### Maven项目识别策略
平台默认会通过pom.xml来识别源码项目为Java Maven项目。

#### 编译原理
1. 预编译处理会探测是否定义了启动命令配置文件[Procfile](../../etc/procfile/),如果未定义会根据打包类型或者项目框架生成默认Procfile文件;
3. 预编译处理完成后,会根据语言类型选择Java的buildpack去编译项目.在编译过程中会安装定义的JDK版本，Maven版本，然后构建编译Maven源码项目;
4. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

默认Maven项目构建命令如下

```bash
mvn -DskipTests clean dependency:list install
```

#### Maven项目源码规范

在此步骤中，你需要提供一个可用的Java Maven源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以使用默认Maven命令正常构建的Java Maven源码程序,多模块项目需要确定子模块可以单独编译即`mvn install -pl <modulename> -am`
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下必须需要存在Java的依赖管理工具Maven所需的`pom.xml`文件 

##### 1. pom.xml规范

SpringBoot项目打包方式推荐使用 jar 包方式
非SpringBoot项目打包方式推荐使用 war 包方式

##### 2. Procfile规范

如果项目未定义Procfile文件,平台默认会根据识别项目类型生成默认Procfile。

- 打包方式为 war 包,平台使用 [webapp-runner.jar](https://github.com/jsimone/webapp-runner) 将打包的 war 包运行起来。示例

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war
```

- 打包方式为 jar 包,示例

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。

{{% notice note %}}
1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. 如果是多模块项目,需注意编译后jar包或者war包路径，其路径为`<子模块名>/targets/*.jar`或`<子模块名>/targets/*.war`  
4. JAVA_OPTS: 平台会根据应用的内存大小，自动设置Xmx和Xms的值
5. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000
{{% /notice %}}

{{% notice warning %}}
当调整了Web服务器支持后，打包成War需要调整启动命令  
- 选择tomcat不同版本时 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`  
- 选择jetty不同版本时 `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`  
{{% /notice %}}

#### 编译运行环境设置

{{% notice info %}}
在选择JDK版本或其他组件版本时，需要注意JDK或者其他组件版本不要选择比项目使用的版本过高或者过低以免导致源码编译失败
{{% /notice %}}

##### OpenJDK支持

当前Rainbond支持OpenJDK如下版本为：

- Java 1.6 - `1.6.0_27`
- Java 1.7 - `1.7.0_95`
- Java 1.8 - `1.8.0_74`
- Java 1.9 - `1.9-latest`
- Java 10  - `10.0.2`
- Java 11  - `11.0.1`

平台默认版本使用`1.8`。若需要使用其他版本的OpenJDK，可以通过在源码根目录下添加`system.properties`文件来设定`java.runtime.version`的值来指定所需版本的JDK。

```yaml
# system.properties 目前Rainbond能识别的版本值为11,10,1.9,1.8,1.7,1.6
java.runtime.version=1.8
```

##### OracleJDK支持

平台目前也支持OracleJDK,但此特性需要在平台里启用才会生效。  
默认不内置提供OracleJDK下载,需要在设置里启用OracleJDK后配置相关OracleJDK下载地址。

OracleJDK下载地址格式要求: `http://<web服务URL>/jdk-8u201-linux-x64.tar.gz`

##### 配置Maven版本

Rainbond默认的推荐Maven版本为`3.3.1`,支持如下版本: `3.0.5`, `3.1.1`, `3.2.5`, `3.3.1`, `3.3.9`.    
如果你的源码根目录定义了`mvnw`,将使用此脚本启动Maven进程。  
与Java设置指定版本一致，即通过`system.properties`文件来设定`maven.version`的值来指定所需版本的Maven.  

```yaml
maven.version=3.3.1
```

如果指定了Maven版本，则会忽略`mvnw`

{{% notice note %}}
平台设置的配置优先级要高于程序代码中定义的配置，如Java JDK版本的选择,在程序代码里通过`system.properties`指定了JDK版本为1.9,在平台上选择了JDK版本为11,那么默认在进行源码编译时会优先使用平台指定的版本JDK11
{{% /notice %}}

#### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

##### Maven Mirror配置

| 环境变量     | 默认值        | 说明                     |
| :------- | :----------- | :----------------------- |
| BUILD_MAVEN_MIRROR_DISABLE   |         | 默认是启用Maven Mirror                    |
| BUILD_MAVEN_MIRROR_OF | * |                      |mirrorOf值
| BUILD_MAVEN_MIRROR_URL | maven.goodrain.me |  平台默认Mirror地址                    |

##### Maven 构建高级配置

| 环境变量     | 默认值        | 说明                     |
| :------- | :----------- | :----------------------- |
| BUILD_MAVEN_CUSTOM_OPTS| `-DskipTests`| Maven构建参数|
| BUILD_MAVEN_CUSTOM_GOALS|`clean dependency:list install`|Maven构建参数|
| BUILD_MAVEN_SETTINGS_URL||默认为空Maven配置地址|
| BUILD_MAVEN_JAVA_OPTS|`-Xmx1024m`|默认|


#### 示例demo程序

示例[https://github.com/goodrain/java-maven-demo](https://github.com/goodrain/java-maven-demo.git)是Spring Boot项目。

自定义的Procfile为

```bash
web: java $JAVA_OPTS -jar target/java-maven-demo-0.0.1.jar
```

##### 本地调试(可选)

如果可以访问管理节点，可以在管理节点测试是否可以正常源码构建

```git
git clone https://github.com/goodrain/java-maven-demo.git
cd java-maven-demo
grctl buildtest
```

#### 推荐阅读

- [Java-Jar源码构建应用](../java-jar/)
- [Java-War源码构建应用](../java-war/)
- [Java-Gradle源码构建应用](../java-gradle)
- [Spring Boot项目配置MySQL](../spring-boot-mysql/)
- [Tomcat配置Redis实现Session共享](../tomcat-redis-session/)
