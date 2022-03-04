---
title: Java War包部署组件
description: 讲述Java War包部署组件要点，适用于开发者和运维人员参考。
---

### War 项目识别策略

平台默认会根据源码根目录下是否有 War 文件来识别为 Java War 项目。

### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件 [Procfile](../procfile) ,如果未定义会生成默认 War 包启动配置文件;
2. 预编译处理完成后,会根据语言类型选择 Java-war 的 buildpack 去编译项目.在编译过程中会安装定义的 JDK 版本,Web 服务;
3. 编译完成后会检查是否在平台设置了 Procfile 参数,若配置了会重写启动命令配置文件 Procfile.

### War 项目源码规范

在此步骤中，你需要提供一个可用的 Java War 源码程序用来部署在 Rainbond 平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的 War 包
2. 源码程序必须托管在 gitlab 等相关 git 或者 svn 服务上(5.4 起支持下载压缩包构建)
3. 源码程序根路径下必须需要存在 War 文件(即项目已经打成 war 文件)

#### Procfile 规范

如果项目未定义 Procfile 文件,平台默认会生成默认 Procfile 来运行 War 包。

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war
```

上述是默认 Procfile,如果需要扩展更多启动参数,可以自定义 Procfile。

1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. JAVA_OPTS: 平台会根据应用的内存大小，自动设置 Xmx 和 Xms 的值
4. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000

当调整了 Web 服务器支持后，打包成 War 需要调整启动命令

- 选择 tomcat 不同版本时 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`
- 选择 jetty 不同版本时 `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`  
  需要配置 context path,可以通过自定义 Procfile 指定 [webapp-runner 参数 path](https://github.com/jsimone/webapp-runner#options)
- 示例 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d> --port $PORT ./*.war`

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

平台从 5.4 起支持从下载地址下载压缩包构建(支持的压缩包格式为 tar, tar.gz, zip), 通过压缩包构建的入口在源码创建组件中，仓库地址选择 OSS。此特性需要将构建好的 war 包与 Procfile(非必需)打包为支持的压缩包格式。

压缩包下载地址格式要求: `http://<web服务URL>/warDemo.tar.gz`

下载地址必须以`<压缩包名>.<压缩格式>`结尾。

#### Web 服务支持

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

选择 tomcat7 版本需要注意确定本地可以通过`java -jar ./webapp-runner-7.0.91.0.jar ./*.war`运行  
关于 webapp-runner 详细配置请参考 [webapp-runner 使用说明](./webapp-runner)

### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

| 环境变量            | 默认值 | 说明                                 |
| :------------------ | :----- | :----------------------------------- |
| BUILD_WEBSERVER_URL |        | 自定义 WEBAPP-RUNNER 下载地址        |
| BUILD_ONLINE        |        | 默认下载 Rainbond 内置 Webapp-Runner |

### 其他说明

1. 默认会将 war 文件解压至`/app/target/tomcat.<port>`目录下,不支持通过添加配置文件的方式到 war 解压路径下,否则会导致应用无法正常启动

### 示例 demo 程序

示例 [https://github.com/goodrain/java-war-demo](https://github.com/goodrain/java-war-demo.git)

### 推荐阅读

- [Java-Maven 源码构建应用](./java-maven/)
- [Java-Jar 源码构建应用](./java-jar/)
- [Java-Gradle 源码构建应用](./java-gradle/)
- [Tomcat 配置 Redis 实现 Session 共享](./tomcat-redis-session)
- [webapp-runner 使用说明](./webapp-runner/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
