---
title: Java Maven源码部署组件
description: 本文介绍Java Maven源码部署组件的要点，适用于开发者参考。
hidden: true
---

### 原理文档阅读

[Rainbond 构建 Java Maven 项目原理解读](../java-maven-de/)

### Maven 项目识别策略

平台默认会通过 pom.xml 来识别源码项目为 Java Maven 项目。

### 编译原理

1. 预编译处理会探测是否定义了启动命令配置文件[Procfile](../../etc/procfile/),如果未定义会根据打包类型或者项目框架生成默认 Procfile 文件;
2. 预编译处理完成后,会根据语言类型选择 Java 的 buildpack 去编译项目.在编译过程中会安装定义的 JDK 版本，Maven 版本，然后构建编译 Maven 源码项目;
3. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

默认 Maven 项目构建命令如下

```bash
mvn -DskipTests clean dependency:list install
```

### Maven 项目源码规范

在此步骤中，你需要提供一个可用的 Java Maven 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以使用默认 Maven 命令正常构建的 Java Maven 源码程序,多模块项目需要确定子模块可以单独编译即`mvn install -pl <modulename> -am`
2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上
3. 源码程序根路径下必须需要存在 Java 的依赖管理工具 Maven 所需的`pom.xml`文件

#### pom.xml 规范

SpringBoot 项目打包方式推荐使用 jar 包方式
非 SpringBoot 项目打包方式推荐使用 war 包方式

#### Procfile 规范

如果项目未定义 Procfile 文件,平台默认会根据识别项目类型生成默认 Procfile。

- 打包方式为 war 包,平台使用 [webapp-runner.jar](https://github.com/jsimone/webapp-runner) 将打包的 war 包运行起来。示例

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war
```

- 打包方式为 jar 包,示例

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

上述是默认 Procfile,如果需要扩展更多启动参数,可以自定义 Procfile。

1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. 如果是多模块项目,需注意编译后 jar 包或者 war 包路径，其路径为`<子模块名>/targets/*.jar`或`<子模块名>/targets/*.war`
4. JAVA_OPTS: 平台会根据应用的内存大小，自动设置 Xmx 和 Xms 的值
5. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000

当调整了 Web 服务器支持后，打包成 War 需要调整启动命令

- 选择 tomcat 不同版本时 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`
- 选择 jetty 不同版本时 `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`  
  需要配置 context path,可以通过自定义 Procfile 指定[webapp-runner 参数 path](https://github.com/jsimone/webapp-runner#options)
- 示例 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d> --port $PORT ./*.war`

### 编译运行环境设置

{{% notice info %}}
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

#### 配置 Maven 版本

Rainbond 默认的推荐 Maven 版本为`3.3.1`,支持如下版本: `3.0.5`, `3.1.1`, `3.2.5`, `3.3.1`, `3.3.9`.  
如果你的源码根目录定义了`mvnw`,将使用此脚本启动 Maven 进程。  
与 Java 设置指定版本一致，即通过`system.properties`文件来设定`maven.version`的值来指定所需版本的 Maven.

```yaml
maven.version=3.3.1
```

如果指定了 Maven 版本，则会忽略`mvnw`

平台设置的配置优先级要高于程序代码中定义的配置，如 Java JDK 版本的选择,在程序代码里通过`system.properties`指定了 JDK 版本为 1.9,在平台上选择了 JDK 版本为 11,那么默认在进行源码编译时会优先使用平台指定的版本 JDK11

#### Web 服务支持

如果 Maven 项目打包成 war 包,则需要配置 Web 服务支持。

通过 web 服务(tomcat 或者 jetty)将 war 包运行起来,即通过`java -jar ./webapp-runner.jar ./*.war`或者`java -jar ./jetty-runner.jar ./*.war`方式运行.

目前可以通过构建源设置 web 服务版本或者源码根目录定义`webserver`文件

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

{{% notice info %}}
选择 tomcat7 版本需要注意确定本地可以通过`java -jar ./webapp-runner-7.0.91.0.jar ./*.war`运行  
关于 webapp-runner 详细配置请参考[webapp-runner 使用说明](/docs/user-manual/component-create/language-support/java_more/webapp-runner/)

### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

#### Maven Mirror 配置

| 环境变量                   | 默认值            | 说明                    |
| :------------------------- | :---------------- | :---------------------- |
| BUILD_MAVEN_MIRROR_DISABLE |                   | 默认是启用 Maven Mirror |
| BUILD_MAVEN_MIRROR_OF      | \*                |                         | mirrorOf 值 |
| BUILD_MAVEN_MIRROR_URL     | maven.goodrain.me | 平台默认 Mirror 地址    |

#### Maven 构建高级配置

| 环境变量                 | 默认值                          | 说明                    |
| :----------------------- | :------------------------------ | :---------------------- |
| BUILD_MAVEN_CUSTOM_OPTS  | `-DskipTests`                   | Maven 构建参数          |
| BUILD_MAVEN_CUSTOM_GOALS | `clean dependency:list install` | Maven 构建参数          |
| BUILD_MAVEN_SETTINGS_URL |                                 | 默认为空 Maven 配置地址 |
| BUILD_MAVEN_JAVA_OPTS    | `-Xmx1024m`                     | 默认                    |

### 其他说明

如果编译成 war 包，运行时默认会将 war 文件解压至`/app/target/`目录下,不支持通过添加配置文件的方式到 war 解压路径下,否则会导致应用无法正常启动

### 示例 demo 程序

示例[https://github.com/goodrain/java-maven-demo](https://github.com/goodrain/java-maven-demo.git)是 Spring Boot 项目。

自定义的 Procfile 为

```bash
web: java $JAVA_OPTS -jar target/java-maven-demo-0.0.1.jar
```

#### 本地调试(可选)

如果可以访问管理节点，可以在管理节点测试是否可以正常源码构建

```git
git clone https://github.com/goodrain/java-maven-demo.git
cd java-maven-demo
grctl buildtest
```

### 推荐阅读

- [Java-Jar 源码构建应用](../java-jar/)
- [Java-War 源码构建应用](../java-war/)
- [Java-Gradle 源码构建应用](../java-gradle)
- [Spring Boot 项目配置 MySQL](../spring-boot-mysql/)
- [Tomcat 配置 Redis 实现 Session 共享](../tomcat-redis-session/)
- [webapp-runner 使用说明](/docs/user-manual/component-create/language-support/java_more/webapp-runner/)
- [RAINBOND 源码构建 JAVA 项目选取 JDK](/docs/advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](/docs/advanced-scenarios/devops/how-to-config-maven/)
