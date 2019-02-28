---
title: Java源码创建
summary: Java源码创建
toc: true
---

Rainbond 可以将 Java 程序轻松部署到平台，并提供灵活伸缩的高可用特性。您可以部署标准的基于 Tomcat 或 Jetty 的 Web 应用，同时也支持 SpringBoot 等框架构建的应用程序。我们致力于在不改变开发习惯情况下将您的 Java 应用在云端快速部署、运行、灵活伸缩！

## 一、代码识别

Rainbond 支持部署打包成 Jar 包, War 包的项目, 或者 Maven, Gradle 管理的项目


### 1.1 Jar 包

若您将您的代码打包为Jar包，您需要将您的Jar包存放至所提交文件目录的根目录下；在根目录下创建`LANGUAGE`文件，写入内容`java-jar` 。两个条件都满足的情况下，识别为Jar包项目。Rainbond称其为 **Java-jar**。

### 1.2 War 包

若您将您的代码打包为War包，您需要将您的War包存放至所提交文件目录的根目录下，云帮会检测根目录中是否存在`<文件名>.war`，若存在则识别该项目为war包项目，Rainbond称其为 **Java-war**。

### 1.3 Maven 项目

对于 Maven 项目, Rainbond 会通过`pom.xml`来识别项目的类型. 若您提交的项目根目录中包含文件 `pom.xml`, 则该项目会被识别为 Maven 项目.

### 1.4 Gradle 项目

对于 Gradle 项目, Rainbond 会通过`build.gradle`来识别项目的类型. 若您提交的项目根目录中包含文件 `build.gradle`, 则该项目会被识别为 Gradle 项目.

{{site.data.alerts.callout_success}}

当上述情况同时存在时，Rainobnd 识别代码的优先级为： Dockerfile > Jar 包 > War 包 > Maven 项目 > Gradle 项目

{{site.data.alerts.end}}

## 二、Java运行时环境

| 组件   | 支持的版本                | 默认值 |
| :----- | :------------------------ | :----- |
| JDK    | 1.6, 1.7, 1.8             | 1.8    |
| MAVEN  | 3.0.5, 3.1.1, 3.2.5, 3.3.1 | 3.3.1  |
| TOMCAT | 6.0.41, 7.0.56, 8.0.14    | 7.0.56 |

以上各组件，您可以在平台创建应用的向导中选择，也可以自行配置支持的版本：

{{site.data.alerts.callout_success}}

Rainbond默认提供的 JDK 为 OpenJDK，如果需要使用 OracleJDK，请自行使用 [Dockerfile](./dockerfile.html) 指定。

{{site.data.alerts.end}}

### 2.1 配置 JDK

Rainbond 支持的 JDK 版本值为 `1.6`,`1.7`, `1.8 ` ，默认的版本为 `1.8 `.  若您需要其他版本的 JDK, 可以向所提交代码的根目录中添加 `system.properties` 文件，通过设定`java.runtime.version` 来指定一个Java版本：
{% include copy-clipboard.html %}

```bash
java.runtime.version=1.8
```

### 2.2 配置 Maven

Rainbond 默认的 Maven 版本是 `3.3.1`. 您也可以在 `system.properties` 通过 参数 `maven.version` 指定一个您需要的 Maven 版本：
{% include copy-clipboard.html %}

```bash
maven.version=3.3.1
```

如果设置了 `maven.version`，`mvnw` 脚本将会被忽略.

兼容的 maven 版本为 `3.0.5`, `3.1.1`, `3.2.5`, `3.3.1`, `3.3.9`, 默认为`3.3.1`.

### 3.3 配置 Gradle

目前使用的 Gradle 的版本是 4.10.2, 暂不支持配置.

## 三、示例：部署war/jar包

Rainbond为了让您更方便的部署项目，特推出识可别 **War包** 、**Jar包** 的构建模式，云帮分别称为Java-war与Java-jar。上文提到了 **War包** 与 **Jar包** 的代码识别方式及构建环境。

**示例代码:**

- [java-war-demo](https://github.com/goodrain/java-war-demo.git) 请忽略代码中的源码目录`src` ，您需要的只是war包和自定义的`system.properties` 配置文件。
- [java-jar-demo](https://github.com/goodrain/java-jar-demo.git)


### 3.1 部署war包

WAR文件是JAR文件的一种，其中包含JSP、Java Servlet、Java类、XML文件、标签库、静态网页（HTML和相关文件），以及构成Web应用程序的其他资源，它的扩展名为`.war`。云帮平台支持WAR文件运行。

在代码根目录上传好War包后，通过源码构建即可。需要注意的是，War包类型优先级低于Maven类型，因此如果主目录具有pom.xml文件将优先识别为Java-Maven项目。
Rainbond运行War包的方式如下述Profile定义：

```
web: java -jar /opt/webapp-runner.jar --port $PORT *.war
```

### 3.2 部署jar包

在代码根目录上传好Jar包后，通过创建`Procfile`来指定运行命令。比如在您正常部署的时候，使用`java -jar demo.jar`的命令来运行，那么在`Procfile`中定义如下：
{% include copy-clipboard.html %}

```bash
web: java $JAVA_OPTS -jar demo.jar
```
完成后，通过源码构建即可。

## 四、示例：基于Maven构建应用

Rainbond 通过 maven 对包含 `pom.xml` 文件的 java项目进行构建，最终根据 `pom.xml` 中的打包需求生成 `jar`包 或者 `war`包。

本文以好雨官方 [java-maven-demo](https://github.com/goodrain-apps/java-maven-demo) 为示例进行说明。

### 4.1 打包

Rainbond 检测出项目为 maven 项目后，在构建阶段会将代码打包，在`pom.xml`文件中示例程序将编译后的文件打包为war包。

`pom.xml`
{% include copy-clipboard.html %}

```xml
...
...
    <packaging>war</packaging>
...
...
```

### 4.2 自动构建

平台检测为java-maven项目后，会自动通过mvn命令进行构建操作，具体的构建命令为：



{% include copy-clipboard.html %}

```bash
mvn -B -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true clean install
```

{{site.data.alerts.callout_success}}

后续版本会引入自定义maven构建命令的功能。

{{site.data.alerts.end}}

### 4.3 应用运行

在你未定义[Procfile](etc/procfile.html)的情况下，平台默认通过以下几种方式运行：

* 在pom.xml中定义的打包方式为war
平台使用<a href="https://github.com/jsimone/webapp-runner" target="__blank">webapp-runner.jar</a> 将打包的 `war` 包运行起来，类似如下命令：

{% include copy-clipboard.html %}

```
java $JAVA_OPTS -jar /opt/webapp-runner.jar --port $PORT target/*.war
```
* 如果是SpringBoot的项目且打包方式不是war包

默认运行方式如下：
```
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```
{{site.data.alerts.callout_success}}

- JAVA_OPTS ： 平台会根据应用的内存大小，自动设置Xmx和Xms的值
- PORT ： 根据用户在平台设置的端口决定监听，默认监听端口为 5000

{{site.data.alerts.end}}

### 4.4 自定义运行命令

用户可以通过在代码根目录创建 [Procfile](etc/procfile.html) 文件并编辑该文件，实现自定义运行命令：

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

## 五、示例：Gradle 项目的构建

接下来, 将会通过`java-gradle-demo`这个 Gradle 项目进行演示和说明. `java-gradle-demo`是一个由 Gradle 管理的 Spring Boot 项目, 作用是打印"Hello Java Gradle Demo!". 它的目录树如下:

```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── rainbond
    │   │           └── javagradledemo
    │   │               ├── JavaGradleDemoApplication.java
    │   │               └── controller
    │   │                   └── HelloController.java
    │   └── resources
    │       └── application.properties
```

可以看出来, 该项目包含 `build.gradle`, `gradlew`,`gradle/wrapper/gradle-wrapper.jar` 和 `gradle/wrapper/gradle-wrapper.properties`

项目的 Github 地址: [java-gradle-demo](https://github.com/goodrain/java-gradle-demo.git)

### 5.1 验证您的构建文件是否已正确设置

由于 java-gradle-demo 是一个 Spring boot 项目, Rainbond 底层的 Gradle buildpack 会执行 `./gradlew build -x test`进行验证. 对于没有使用框架的项目, 将会执行 `./gradlew stage`.

### 5.2 应用运行

对于 Spring Boot 项目, Rainbond 在默认情况下, 会用以下命令去执行打包好的 Jar 包:
```
java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/*.jar
```

您也可以通过在代码根目录创建 [Procfile](etc/procfile.html) 文件并编辑该文件，实现自定义运行命令：

{% include copy-clipboard.html %}

```bash
web: java $JAVA_OPTS -jar  target/*.jar
```

{{site.data.alerts.callout_danger}}
自定义启动命令时需要注意Procfile文件的格式：

- 必须以 `web: ` 开头
- 文件结尾不能包含特殊字符
{{site.data.alerts.end}}

## 六、相关文章

- <a href="java/spring-boot-mysql.html" target="_blank" >Spring Boot项目配置MySQL</a>
- <a href="java/tomcat-redis-session.html" target="_blank" >Tomcat配置Redis实现Session共享</a>
- <a href="java/jetty-runner.html" target="_blank" >部署基于Jetty-Runner的应用</a>
- <a href="java/webapp-runner.html" target="_blank" >部署基于webapp-runner的应用</a>
- <a href="java/webapp-runner.html" target="_blank" >使用 Heroku 部署 Gradle 项目</a>
