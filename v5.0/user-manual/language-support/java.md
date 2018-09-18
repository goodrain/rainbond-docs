---
title: Java源码创建
summary: 云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web app程序，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！
toc: true
---

<div class="filters filters-big clearfix">
    <a href="java.html"><button class="filter-button current"><strong>构建手册</strong></button></a>
    <a href="java-demo.html"><button class="filter-button">例子</button></a>
</div>

<div id="toc"></div>

云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web应用，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！

## 一、代码识别

云帮支持部署Java源码、jar包、war包项目.

### 1.1 Maven源码项目

云帮支持的java应用程序默认构建系统是Maven。Maven项目通过`pom.xml`文件来进行项目的依赖管理，云帮也通过`pom.xml`来检测出项目的语言类型。若您提交的源码根目录中包含文件`pom.xml`，则识别该项目为源码项目，由于项目需要使用maven管理，云帮称其为**Java-maven**。

### 1.2 War包

若您将您的代码打包为War包，您需要将您的War包存放至所提交文件目录的根目录下，云帮会检测根目录中是否存在`<文件名>.war`，若存在则识别该项目为war包项目，云帮称其为 **Java-war**。

### 1.3 Jar包

若您将您的代码打包为Jar包，您需要将您的Jar包存放至所提交文件目录的根目录下，云帮会检测根目录下是否存在`LANGUAGE`文件，若存在则继续检测该文件内容是否为`java-jar` 若两项条件均符合则识别该项目为jar包项目，云帮称其为 **Java-jar**。

## 二、Java运行时环境

| 组件     | 支持的版本  | 默认值    |
| :----- | :------------------------ | :----- |
| JDK    | 1.6, 1.7, 1.8,1.9         | 1.8    |
| MAVEN  | 3.0.5, 3.1.1, 3.2.3, 3.2.5, 3.3.9 | 3.3.9  |
| TOMCAT | 6.0.41, 7.0.56, 8.0.14    | 7.0.56 |

以上各组件，您可以在平台创建应用的向导中选择，也可以自行配置支持的版本：

### 2.1 配置JDK

云帮支持的JDK版本值为 `1.6`,`1.7`, `1.8 ` 和 `1.9`，默认的版本为 `1.8 `，若您未指定JDK版本，云帮会帮您自动安装`jdk1.8` 。您也可以向应用程序中添加 `system.properties` 文件，通过设定`java.runtime.version` 来指定一个Java版本：

```bash
java.runtime.version=1.8
```

当`system.properties`文件不存在或内空为空时，云帮将自动根据pom文件中的`<java.version>1.8</java.version>`字段选择java版本，如果pom文件中没有该字段测使用1.8版本的java。

### 2.2 配置Maven

您可以通过编辑`system.properties`文件来指定一个Maven版本：

```bash
maven.version=3.3.9
```

支持的maven版本为 `3.0.5`、 `3.1.1`、 `3.2.3` 、 `3.2.5`、`3.3.9`。若未指定版本，默认版本为`3.3.9`。

当`system.properties`文件不存在或内空为空时，将自动根据java版本选择合适的maven，如果java版本低于1.7时，使用3.2.5版本的maven，否则使用3.3.9版本的maven。

## 三、基于Maven构建应用

### 3.1 编译
云帮通过`maven`对包含`pom.xml`文件的java项目进行编译，最终根据`pom.xml`中的`<packaging>war</packaging>`字段来决定生成`jar`包或者`war`包，具体的编译命令如下：

```
mvn -B -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true clean install
```

编译时会根据pom文件中指定的maven仓库下载依赖包，您也可以使用云帮的maven仓库，地址为：`maven.goodrain.me`。

### 3.2 打包

编译完成后，云帮会将代码与编译后的目标文件整体打包为slug文件，并进入启动阶段。

### 3.3 应用运行
在启动阶段，云帮会根据slug文件中的Procfile文件来启动应用。您可以通过在项目的根目录创建<a href="https://github.com/jsimone/webapp-runner" target="__blank">webapp-runner.jar</a>文件来指定应用的运行方式，如：

```
web: java $JAVA_OPTS -jar target/*.jar
```

自定义启动命令时需要注意Procfile文件的格式：

- 必须以`web: `开头
- 文件结尾不能包含特殊字符
- JAVA_OPTS ： 平台会根据应用的内存大小，自动设置Xmx和Xms的值
- PORT ： 默认监听端口为 5000

如果Procfile文件不存在，云帮会自动生成它，默认内容如下：

```
java $JAVA_OPTS -jar /opt/webapp-runner.jar --port $PORT target/*.war
```

示例：[从Java源码构建应用](https://github.com/goodrain/java-maven-demo.git)

## 四、相关文章

- <a href="java/spring-boot-mysql.html" target="_blank" >Spring Boot项目配置MySQL</a>
- <a href="java/tomcat-redis-session.html" target="_blank" >Tomcat配置Redis实现Session共享</a>
- <a href="java/jetty-runner.html" target="_blank" >部署基于Jetty-Runner的应用</a>
- <a href="java/webapp-runner.html" target="_blank" >部署基于webapp-runner的应用</a>

