---
title: Java Maven源码部署组件
description: 本文介绍Java Maven源码部署组件的要点，适用于开发者参考。
---

### 原理文档阅读

[Rainbond 构建 Java Maven 项目原理解读](./java-maven-de)

### Maven 项目识别策略

当源代码根目录下存在 pom.xml 文件，且不存在 Dockerfile 文件时，Rainbond 会将源代码识别为 Java Maven 项目。

Maven 多模块项目构建，请直接参考 [Java Maven 多模块源码构建](./java-multi-module-build)。

### 验证准备

将项目部署到 Rainbond 之前，请按照以下步骤进行本地验证，本地构建成功后，即可开始尝试将项目部署在 Rainbond 上。

- 源代码托管于 Git 或 SVN 服务器。

- 检查本地构建环境与运行环境，确定 Maven 版本、JDK 版本、是否使用了 OracleJDK。

```bash
mvn -v
java -version
```

- 清除本地构建缓存，一般情况下，本地 localRepository 位于 `${HOME}/.m2/repository`，请在确认后，将该文件夹临时更改路径。

```bash
mv ${HOME}/.m2/repository ${HOME}/.m2/repository.bak
```

- 执行以下构建命令，该命令也是 Rainbond Java Maven 项目构建的默认命令：

```bash
mvn -DskipTests clean dependency:list install
```

### pom.xml 规范

- SpringBoot 项目打包方式推荐使用 jar 包方式。
- 非 SpringBoot 项目打包方式推荐使用 war 包方式。

### 编译运行环境配置

环境准备阶段，需要将 Rainbond 构建运行环境，和常用的本地构建运行环境尽量统一。比如 JDK 版本、Maven 版本等。

#### 图形化设置

Rainbond 支持图形化定义编译运行环境，配置位于服务组件的构建源页面。**对这些配置的修改，需要通过 [构建](../../../component-manage/overview/basic-operation) 来生效！**

<img src="https://static.goodrain.com/docs/5.2/component-create/language-support/java/java-maven-1.png" title="编译运行环境定义" />

- 禁用缓存，在完成首次成功的构建之前，该开关应该始终处于打开的状态，默认关闭。

- 选择编译运行所使用的 JDK（默认提供 OpenJDK） 以及 MAVEN 版本，**务必使用验证准备时验证过的版本**。

- 选择自定义 JDK 下载地址，需要提供 Rainbond 服务器可以下载到的路径，来下载 tar.gz 格式的 JDK（可以是 OracleJDK） 安装包。

- 当构建产物为 `war` 文件时，还提供了 Tomcat、Jetty 的版本选择。

- 禁用 Maven Mirror，该开关决定是否通过 rbd-repo 进行代理（默认代理至阿里云 maven 仓库），一旦开关打开，**下方定义的 MAVEN MIRROR OF 配置与 MAVEN MIRROR URL 配置全部失效**，构建过程中使用的仓库地址将只取决于 `pom.xml` 文件中的定义（如文件中无 `repositories` 定义，则从 Maven 中央仓库拉取依赖）。

- MAVEN MIRROR OF 配置，与 MAVEN MIRROR URL 配置一起使用，可以定义构建过程中从镜像私服中拉取依赖的行为。默认配置为 `central`，如设置为 `*`，则所有的依赖包都会从 MAVEN MIRROR URL 配置中定义的镜像仓库地址拉取。

- MAVEN MIRROR URL 配置，定义了构建过程中使用的仓库私服地址，**Rainbond 不支持 jar 包本地安装部署，所有需要的第三方 jar 包，请上传到仓库私服中去**。默认的 `maven.goodrain.me` 为 `rbd-repo` 组件的内网解析域名，它代理了阿里云 maven 仓库。

- MAVEN 构建参数、构建命令两个选项，组成编译所执行的命令，默认构建命令为 `mvn -DskipTests clean dependency:list install` 。

- MAVEN 构建 java 参数配置，主要用来指定构建过程中分配的堆栈内存，**该配置只影响 maven 构建过程，构建完成的组件运行时指定的堆栈内存由 $\{JAVA_OPTS} 变量指定**。

- 启动命令，规定了构建过程完成后，Rainbond 如何启动当前服务组件，详细内容见后文 [启动命令配置](./java-maven#启动命令配置) 章节。

#### 通过代码设置(推荐)

Rainbond 支持将上述的所有配置通过代码进行定义。这样做的好处是：通过在源代码仓库加入若干配置文件，完成编译运行环境的定义，不需要任何手动配置，完成自动 CI。

**system.properties**

在源代码根目录下加入 `system.properties` 文件，可以定义 Maven 版本、JDK 版本，**务必使用验证准备时验证过的版本**：

```bash
java.runtime.version=1.8
maven.version=3.3.1
```

二者版本选择范围如下：

|  选项   |               版本                |
| :-----: | :-------------------------------: |
| OpenJDK |    1.6, 1.7, 1.8, 1.9, 10, 11     |
|  Maven  | 3.0.5, 3.1.1, 3.2.5, 3.3.1, 3.3.9 |

**settings.xml(推荐)**

在源代码根目录下加入用户本地构建可用的 [settings.xml](http://maven.apache.org/settings.html) 文件，即可完全模拟用户的本地构建设置，包括 **仓库私服设置**。该文件通常位于用户环境的 `${M2_HOME}/conf` 或者 `${HOME}/.m2` 目录下，用户本地构建使用的配置，均可在其中进行定义。

在即将到来的 `Rainbond v5.2.2` 版本中， `settings.xml` 的设置，会添加到图形化设置中去。

**mvnw**

如果你的代源码根目录定义了 `mvnw`，将使用此脚本启动 Maven 进程。如果指定了 Maven 版本，则会忽略`mvnw`。使用默认命令构建。

**rainbondfile**

在源代码根目录下加入 [rainbondfile](../rainbondfile) 可以为服务组件定义环境变量，构建过程中更多的配置，可以通过环境变量的方式定义。

在 Rainbond 源码构建的过程中，为服务组件定义的 `BUILD_` 开头的变量，可以被传入构建环境中使用。部分常用的环境变量如下:

|          环境变量          |             默认值              |                    说明                    |
| :------------------------: | :-----------------------------: | :----------------------------------------: |
| BUILD_MAVEN_MIRROR_DISABLE |             `NULL`              |        为 true 时禁用 MAVEN MIRROR         |
|   BUILD_MAVEN_MIRROR_OF    |            `central`            |    为 \* 时使用指定仓库私服拉取所有依赖    |
|   BUILD_MAVEN_MIRROR_URL   |       `maven.goodrain.me`       |            用来指定仓库私服地址            |
|  BUILD_MAVEN_CUSTOM_OPTS   |          `-DskipTests`          |               Maven 构建参数               |
|  BUILD_MAVEN_CUSTOM_GOALS  | `clean dependency:list install` |               Maven 构建参数               |
|  BUILD_MAVEN_SETTINGS_URL  |             `NULL`              | 从配置地址下载 settings.xml 并用于构建配置 |
|   BUILD_MAVEN_JAVA_OPTS    |           `-Xmx1024m`           |          MAVEN 构建 java 参数配置          |
|   BUILD_ENABLE_ORACLEJDK   |             `NULL`              |  为 true 时可以自定义 JDK 安装包下载地址   |
|    BUILD_ORACLEJDK_URL     |             `NULL`              |          定义 JDK 安装包下载地址           |
|   BUILD_RUNTIMES_SERVER    |           `tomcat85`            |     定义 `war` 包项目使用的 WEB SERVER     |

### 启动命令配置

Java Maven 源码构建过程完成后，Rainbond 会自动将服务组件运行起来，这需要我们事先指定服务组件的启动命令。

#### Procfile 规范

Rainbond 通过源代码根目录下的 `Procfile` 文件来定义项目启动命令，`Procfile` 文件定义规范详见 [Procfile](../procfile) 。

服务组件构建源页面中可以图形化输入启动命令，这里输入的命令格式要求与 `Procfile` 一致，优先级高于源代码根目录中的 `Procfile` 。输入完成后，下一次构建当前服务组件时生效。

如果项目未定义 Procfile 文件,平台默认会根据识别项目类型生成默认 Procfile。

- 打包方式为 war 包,平台使用 [webapp-runner.jar](https://github.com/jsimone/webapp-runner) 将打包好的 war 包运行起来。示例

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war
```

- 打包方式为 jar 包,示例

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

上述是默认 `Procfile` ,如果需要扩展更多启动参数,可以自定义 `Procfile` 。

- `web:`和`java`之间有一个空格
- 文件结尾不能包含特殊字符
- 如果是多模块项目,需注意编译后 jar 包或者 war 包路径，其路径为`<子模块名>/targets/*.jar`或`<子模块名>/targets/*.war`
- $JAVA_OPTS: 平台会根据应用的内存大小，自动设置 Xmx 和 Xms 的值
- $PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000

当调整了 Web 服务器支持后，打包成 War 需要调整启动命令：

- 选择 tomcat 不同版本时 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`
- 选择 jetty 不同版本时 `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`
- 需要配置 context path,可以通过自定义 Procfile 指定 [webapp-runner 参数 path](https://github.com/jsimone/webapp-runner#options)
  - 示例 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d> --port $PORT ./*.war`

#### Web 服务支持

如果 Maven 项目打包成 war 包,则需要配置 Web 服务支持。

通过 web 服务(tomcat 或者 jetty)将 war 包运行起来,即通过 `java -jar ./webapp-runner.jar ./*.war` 或者 `java -jar ./jetty-runner.jar ./*.war` 方式运行.

目前可以通过构建源设置 web 服务版本或者源码根目录定义 `webserver` 文件

1. 控制台构建源配置支持版本 `tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9`
2. 源码根目录下定义 webserver 版本
   - `webapp-runner-7.0.91.0.jar`
   - `webapp-runner-8.0.52.0.jar`,`webapp-runner-8.5.38.0.jar`
   - `webapp-runner-9.0.16.0.jar`
   - `jetty-runner-7.5.4.v20111024.jar`,`jetty-runner-9.4.0.v20161208.jar`

具体对应关系如下:

| web 服务支持    | web 服务版本                     | 自定义 Procfile 中 jar 文件名 |
| :-------------- | :------------------------------- | :---------------------------- |
| tomcat7         | webapp-runner-7.0.91.0.jar       | webapp-runner.jar             |
| tomcat8         | webapp-runner-8.0.52.0.jar       | webapp-runner.jar             |
| tomcat85 (默认) | webapp-runner-8.5.38.0.jar       | webapp-runner.jar             |
| tomcat9         | webapp-runner-9.0.16.0.jar       | webapp-runner.jar             |
| jetty7          | jetty-runner-7.5.4.v20111024.jar | jetty-runner.jar              |
| jetty9          | jetty-runner-9.4.0.v20161208.jar | jetty-runner.jar              |

选择 tomcat7 版本需要注意确定本地可以通过 `java -jar ./webapp-runner-7.0.91.0.jar ./*.war` 运行 。
关于 webapp-runner 详细配置请参考 [webapp-runner 使用说明](./webapp-runner)

### 其他说明

如果编译成 war 包，运行时默认会将 war 文件解压至 `/app/target/` 目录下,不支持通过添加配置文件的方式到 war 解压路径下,否则会导致应用无法正常启动

### 示例 demo 程序

示例 Spring Boot 项目: [https://github.com/goodrain/java-maven-demo](https://github.com/goodrain/java-maven-demo.git)

### 常见问题解决

- 项目比较复杂，使用上述方式无法进行编译

  > 这时推荐你自行定义 Dockerfile 文件进行编译和运行环境控制。

- 编译失败怎么处理

  > 查看构建日志，从日志中获取编译失败的原因。若你的项目需要从公网去下载依赖包，也有较大可能依赖包下载失败，若网络无限制，重试即可。

- 项目依赖包变化了但编译后发现没有生效

  > 若你的依赖包已经正确更新到了私服，考虑是本地缓存依赖包未更新。可以手动禁用缓存后重新构建。

- 项目编译成功，但启动后运行异常

  > 原因一：上文中提到的运行命令设置错误，导致容器无法启动。解决方式是正确设置启动命令。
  >
  > 原因二：代码有问题运行后退出，参考组件运行日志，从日志内容判断原因。
  >
  > 原因三：内存分配过少，组件无法正常启动。这种因素的日志现象是组件正在启动，然后突然就退出了。这时多考虑为内存设置不足导致 OOM。

- 通过 WEB 终端进入容器环境后，直接执行 `java -version` 版本为 1.7。

  > 运行服务组件所使用的 java 命令位于 `/app/.jdk/bin/java` 这个路径不在 $PATH 中。

### 推荐阅读

- [Java-Jar 源码构建应用](./java-jar/)
- [Java-War 源码构建应用](./java-war/)
- [Java-Gradle 源码构建应用](./java-gradle)
- [Tomcat 配置 Redis 实现 Session 共享](./tomcat-redis-session/)
- [webapp-runner 使用说明](./webapp-runner/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
