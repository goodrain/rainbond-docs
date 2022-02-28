---
title: Java Gradle源码部署组件
description: 本文介绍Java Gradle源码部署组件的要点，适用于开发者参考。
---

### Gradle 项目识别策略

平台默认会根据源码根目录是否有 gradlew 文件或者 build.gradle 来识别为 Java Gradle 项目.

### 平台编译运行机制

1. 预编译处理完成后,会根据语言类型选择 Java-Gradle 的 buildpack 去编译项目.在编译过程中会安装定义的 JDK 版本;
2. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

平台默认 Gradle 编译命令

```bash
gradlew build -x test
```

### Gradle 项目源码规范

在此步骤中，你需要提供一个可用的 Java Gradle 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的 Gradle 程序
2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上
3. 源码程序根路径下必须需要存在 gradlew 文件或者 build.gradle

### 编译运行环境设置

在选择 JDK 版本或其他组件版本时，需要注意 JDK 或者其他组件版本不要选择比项目使用的版本过高或者过低以免导致源码编译失败

#### OpenJDK 支持

当前 Rainbond 支持 OpenJDK 如下版本为：

- Java 1.6 - `1.6.0_27`
- Java 1.7 - `1.7.0_95`
- Java 1.8 - `1.8.0_74`
- Java 1.9 - `1.9-latest`
- Java 10 - `10.0.2`
- Java 11 - `11.0.1`

平台默认版本使用`1.8`。若需要使用其他版本的 OpenJDK，可以通过在源码根目录下添加`system.properties`文件来设定`java.runtime.version`的值来指定所需版本的 JDK。

```yaml
# system.properties 目前Rainbond能识别的版本值为11,10,1.9,1.8,1.7,1.6
java.runtime.version=1.8
```

#### OracleJDK 支持

平台目前也支持 OracleJDK,但此特性需要在平台里启用才会生效。  
默认不内置提供 OracleJDK 下载,需要在设置里启用 OracleJDK 后配置相关 OracleJDK 下载地址。

OracleJDK 下载地址格式要求: `http://<web服务URL>/jdk-8u201-linux-x64.tar.gz`

平台设置的配置优先级要高于程序代码中定义的配置，如 Java JDK 版本的选择,在程序代码里通过`system.properties`指定了 JDK 版本为 1.9,在平台上选择了 JDK 版本为 11,那么默认在进行源码编译时会优先使用平台指定的版本 JDK11

### 示例 demo 程序

示例[https://github.com/goodrain/java-gradle-demo](https://github.com/goodrain/java-gradle-demo.git)

### 推荐阅读

- [Java-Maven 源码构建应用](./java-maven)
- [Java-War 源码构建应用](./java-war)
- [Java-Jar 源码构建应用](./java-jar)
- [Tomcat 配置 Redis 实现 Session 共享](./tomcat-redis-session)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](./advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
