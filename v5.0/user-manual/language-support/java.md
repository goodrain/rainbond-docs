---
title: Java源码创建
summary: 云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web app程序，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！
toc: true
---

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

| 组件     | 支持的版本                     | 默认值    |
| :----- | :------------------------ | :----- |
| JDK    | 1.6, 1.7, 1.8,1.9         | 1.8    |
| MAVEN  | 3.0.5, 3.1.1, 3.2.5,3.3.1 | 3.3.1  |
| TOMCAT | 6.0.41, 7.0.56, 8.0.14    | 7.0.56 |

以上各组件，您可以在平台创建应用的向导中选择，也可以自行配置支持的版本：

### 2.1 配置JDK

云帮支持的JDK版本值为 `1.6`,`1.7`, `1.8 ` 和 `1.9`，默认的版本为 `1.8 `，若您未指定JDK版本，云帮会帮您自动安装`jdk1.8` 。您也可以向应用程序中添加 `system.properties` 文件，通过设定`java.runtime.version` 来指定一个Java版本：

```bash
java.runtime.version=1.8
```

### 2.2 配置Maven

您可以通过设定 `maven.version` 在`system.properties` 中指定一个Maven版本：

```bash
maven.version=3.3.1
```

如果此条属性被定义，`mvnw` 脚本将会被忽略.

兼容的maven版本为 `3.0.5`、 `3.1.1`、 `3.2.5` 、 `3.3.1`、`3.3.9`。若未指定版本，默认版本为`3.3.1`。如果您当前正在使用`maven3.0.5`并希望升级到最新版本，那么您必须创建 `system.properties` 并指定版本。


## 三、示例：基于Maven构建应用

云帮通过 maven 对包含 `pom.xml` 文件的 java项目进行构建，最终根据 `pom.xml` 中的打包需求生成 `jar`包 或者 `war`包。

本文以好雨官方 [java-maven-demo](https://github.com/goodrain-apps/java-maven-demo) 为示例进行说明。

### 3.1 打包

云帮检测出项目为maven项目后，在构建阶段会将代码打包，在`pom.xml`文件中示例程序将编译后的文件打包为war包。

`pom.xml`
{% include copy-clipboard.html %}

```xml
...
...
    <packaging>war</packaging>
...
...
```

### 3.2 自动构建

平台检测为java-maven项目后，会自动通过mvn命令进行构建操作，具体的构建命令为：



{% include copy-clipboard.html %}

```bash
mvn -B -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true clean install
```

{{site.data.alerts.callout_success}}

后续版本会引入自定义maven构建命令的功能。

{{site.data.alerts.end}}

### 3.3 应用运行

平台默认通过 <a href="https://github.com/jsimone/webapp-runner" target="__blank">webapp-runner.jar</a> 将打包的 `war` 包运行起来，类似如下命令：

{% include copy-clipboard.html %}

```
java $JAVA_OPTS -jar /opt/webapp-runner.jar   --port $PORT target/*.war
```

{{site.data.alerts.callout_success}}

- JAVA_OPTS ： 平台会根据应用的内存大小，自动设置Xmx和Xms的值
- PORT ： 默认监听端口为 5000

{{site.data.alerts.end}}

### 3.4 自定义运行命令

用户可以通过在代码根目录创建 [Procfile](etc/procfile.html) 文件并编辑该文件，可以实现自定义运行命令：

{% include copy-clipboard.html %}

```bash
web: java $JAVA_OPTS -jar  target/*.jar
```

{{site.data.alerts.callout_danger}}
自定义启动命令时需要注意Procfile文件的格式：

- 必须以 `web: ` 开头
- 文件结尾不能包含特殊字符
{{site.data.alerts.end}}


本文示范demo源码：[java-maven-demo](https://github.com/goodrain/java-maven-demo.git)

## 四、示例：部署war/jar包

云帮为了让您更方便的部署项目，特推出识可别 **War包** 、**Jar包** 的构建模式，云帮分别称为Java-war与Java-jar。上文提到了 **War包** 与 **Jar包** 的代码识别方式及构建环境。

**示例代码:**

- [java-war-demo](https://github.com/goodrain/java-war-demo.git)
- [java-jar-demo](https://github.com/goodrain/java-jar-demo.git)


### 4.1 部署war包

WAR文件是JAR文件的一种，其中包含JSP、Java Servlet、Java类、XML文件、标签库、静态网页（HTML和相关文件），以及构成Web应用程序的其他资源。云帮平台支持WAR文件运行。

### 4.2 部署jar包

JAR文件通常是集合 类文件、数据文件或资源的文件，它的扩展名为`.jar`。云帮平台支持JAR文件运行。

### 4.3 检测

平台通过检测 `/app`目录下`LANGUAGE`文件存在且文件内容为`java-jar`识别应用为 **Java-jar** 应用。所以在您应用根目录下需创建`LANGUAGE`文件，并且写入`java-jar`内容。您可以通过以下命令写入：

{% include copy-clipboard.html %}

```
echo java-jar > LANGUAGE
```

## 五、相关文章

- <a href="java/spring-boot-mysql.html" target="_blank" >Spring Boot项目配置MySQL</a>
- <a href="java/tomcat-redis-session.html" target="_blank" >Tomcat配置Redis实现Session共享</a>
- <a href="java/jetty-runner.html" target="_blank" >部署基于Jetty-Runner的应用</a>
- <a href="java/webapp-runner.html" target="_blank" >部署基于webapp-runner的应用</a>