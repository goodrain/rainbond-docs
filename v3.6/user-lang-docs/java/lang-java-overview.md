---
title: 云帮支持Java
summary: 云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web app程序，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！
toc: false
---
<div id="toc"></div>

&emsp;&emsp;云帮可以将java程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于Tomcat或Jetty的web应用，同时也支持Spring、Play等框架构建的应用程序。我们的致力于在不改变开发习惯情况下将您的java应用在云端快速部署、运行、灵活伸缩！

## 代码识别

云帮支持部署Java源码、jar包、war包项目：

### 源码

云帮支持的java应用程序默认构建系统是Maven。Maven项目通过`pom.xml`文件来进行项目的依赖管理，云帮也通过`pom.xml`来检测出项目的语言类型。若您提交的源码根目录中包含文件`pom.xml`，则识别该项目为源码项目，由于项目需要使用maven管理，云帮称其为[Java-maven](lang-java-maven.html)。

### War包

若您将您的代码打包为War包，您需要将您的War包存放至所提交文件目录的根目录下，云帮会检测根目录中是否存在`<文件名>.war`，若存在则识别该项目为war包项目，云帮称其为[Java-war](lang-java-warandjar.html)。

### Jar包

若您将您的代码打包为Jar包，您需要将您的Jar包存放至所提交文件目录的根目录下，云帮会检测根目录下是否存在` LANGUAGE`文件，若存在则继续检测该文件内容是否为`java-jar`  若两项条件均符合则识别该项目为jar包项目，云帮称其为[Java-jar](lang-java-warandjar.html)。 

## Java运行时环境

| 组件     | 支持的版本                     | 默认值    |
| :----- | :------------------------ | :----- |
| JDK    | 1.6, 1.7, 1.8,1.9         | 1.8    |
| MAVEN  | 3.0.5, 3.1.1, 3.2.5,3.3.1 | 3.3.1  |
| TOMCAT | 6.0.41, 7.0.56, 8.0.14    | 7.0.56 |

以上各组件，您可以在平台创建应用的向导中选择，也可以自行配置支持的版本：

### 配置JDK

云帮支持的JDK版本值为 `1.6`,`1.7`, `1.8 ` 和 `1.9`，默认的版本为 `1.8 `，若您未指定JDK版本，云帮会帮您自动安装`jdk1.8` 。您也可以向应用程序中添加 `system.properties` 文件，通过设定`java.runtime.version` 来指定一个Java版本：

```bash
java.runtime.version=1.8
```

### 配置Maven

您可以通过设定 `maven.version` 在`system.properties` 中指定一个Maven版本：

```bash
maven.version=3.3.1
```

如果此条属性被定义，`mvnw` 脚本将会被忽略.

兼容的maven版本为 `3.0.5`、 `3.1.1`、 `3.2.5` 、 `3.3.1`、`3.3.9`。若未指定版本，默认版本为`3.3.1`。如果您当前正在使用`maven3.0.5`并希望升级到最新版本，那么您必须创建 `system.properties` 并指定版本。
