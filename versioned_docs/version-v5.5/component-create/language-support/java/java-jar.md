---
title: Java Jar包部署组件
description: 本文讲述Java Jar包部署组件的要点，适用于开发者和运维人员。
---

### Jar 项目识别策略

平台默认会根据源码根目录是否有 Jar 包来识别为 Java Jar 项目.

### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件 [Procfile](../procfile) ,如果未定义会生成默认 Jar 包启动配置文件;
2. 预编译处理完成后,会根据语言类型选择 Java-jar 的 buildpack 去编译项目.在编译过程中会安装定义的 JDK 版本;
3. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

### Jar 项目源码规范

在此步骤中，你需要提供一个可用的 Java Jar 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的 Jar 包
2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上(5.4 起支持下载压缩包构建)
3. 源码程序根路径下必须需要存在 Jar 包文件

#### Procfile 规范

如果项目未定义 Procfile 文件,平台默认会生成默认 Procfile 来运行 Jar 包。

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar ./*.jar
```

上述是默认 Procfile,如果需要扩展更多启动参数,可以自定义 Procfile。

1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. JAVA_OPTS: 平台会根据应用的内存大小，自动设置 Xmx 和 Xms 的值
4. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000

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

#### 通过压缩包进行源码构建

平台从 5.4 起支持从下载地址下载压缩包构建(支持的压缩包格式为 tar, tar.gz, zip), 通过压缩包构建的入口在源码创建组件中，仓库地址选择 OSS。此特性需要将构建好的 jar 包与 Procfile(非必需)打包为支持的压缩包格式。

压缩包下载地址格式要求: `http://<web服务URL>/jarDemo.tar.gz`

下载地址必须以`<压缩包名>.<压缩格式>`结尾。

### 示例 demo 程序

示例[https://github.com/goodrain/java-jar-demo](https://github.com/goodrain/java-jar-demo.git)

### 推荐阅读

- [Java-Maven 源码构建应用](./java-maven/)
- [Java-War 源码构建应用](./java-war/)
- [Java-Gradle 源码构建应用](./java-gradle/)
- [Tomcat 配置 Redis 实现 Session 共享](./tomcat-redis-session/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
