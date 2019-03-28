---
title: Java War源码构建应用
description: Java War源码构建应用
hidden: true
menu: "java"
---

#### War项目识别策略
平台默认会根据源码根目录下是否有War文件来识别为Java War项目。

#### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件[Procfile](../../etc/procfile/),如果未定义会生成默认War包启动配置文件;
2. 预编译处理完成后,会根据语言类型选择Java-war的buildpack去编译项目.在编译过程中会安装定义的JDK版本,Web服务;
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

#### War项目源码规范

在此步骤中，你需要提供一个可用的Java War源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的War包
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下必须需要存在War文件(即项目已经打成war文件)

##### Procfile规范

如果项目未定义Procfile文件,平台默认会生成默认Procfile来运行War包。

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。

{{% notice note %}}
1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. JAVA_OPTS: 平台会根据应用的内存大小，自动设置Xmx和Xms的值
4. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000
{{% /notice %}}

{{% notice warning %}}
当调整了Web服务器支持后，打包成War需要调整启动命令  
- 选择tomcat不同版本时 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`  
- 选择jetty不同版本时 `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`  
需要配置context path,可以通过自定义Procfile指定[webapp-runner参数path](https://github.com/jsimone/webapp-runner#options)  
- 示例 `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d>  --port $PORT ./*.war` 
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

{{% notice note %}}
平台设置的配置优先级要高于程序代码中定义的配置，如Java JDK版本的选择,在程序代码里通过`system.properties`指定了JDK版本为1.9,在平台上选择了JDK版本为11,那么默认在进行源码编译时会优先使用平台指定的版本JDK11
{{% /notice %}}

##### Web服务支持

通过web服务(tomcat或者jetty)将war包运行起来,即通过`java -jar ./webapp-runner.jar ./*.war`或者`java -jar ./jetty-runner.jar ./*.war`方式运行.

目前可以通过构建源设置web服务版本或者源码根目录定义`webserver`文件

1. 控制台构建源配置支持版本 `tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9`  
2. 源码根目录下定义webserver版本 
    - `webapp-runner-7.0.57.2.jar`
    - `webapp-runner-8.0.18.0-M1.jar`,`webapp-runner-8.5.38.0.jar`
    - `webapp-runner-9.0.16.0.jar`
    - `jetty-runner-7.5.4.v20111024.jar`,`jetty-runner-9.4.0.v20161208.jar`  

具体对应关系如下:

| web服务支持     | web服务版本        | 自定义Procfile中jar文件名                    |
| :------- | :----------- | :----------------------- |
| tomcat7   |  webapp-runner-7.0.57.2.jar       | webapp-runner.jar |
| tomcat8 | webapp-runner-8.0.18.0-M1.jar | webapp-runner.jar |
| tomcat85 (默认) | webapp-runner-8.5.38.0.jar | webapp-runner.jar |
| tomcat9 | webapp-runner-9.0.16.0.jar | webapp-runner.jar |
| jetty7 | jetty-runner-7.5.4.v20111024.jar | jetty-runner.jar |
| jetty9 | jetty-runner-9.4.0.v20161208.jar | jetty-runner.jar |

#### 高级构建选项

在构建高级设置或构建源处启用高级构建特性

| 环境变量     | 默认值        | 说明                     |
| :------- | :----------- | :----------------------- |
| BUILD_WEBSERVER_URL   |         | 自定义WEBAPP-RUNNER下载地址                    |
| BUILD_ONLINE |  | 默认下载Rainbond内置Webapp-Runner |

#### 其他说明

1. 默认会将war文件解压至`/app/target/tomcat.<port>`目录下,不支持添加存储路径为/app/target/目录,否则会导致应用无法正常启动
2. 不支持添加存储到war解压目录路径下

#### 示例demo程序

示例[https://github.com/goodrain/java-war-demo](https://github.com/goodrain/java-war-demo.git)

#### 推荐阅读

- [Java-Maven源码构建应用](../java-maven/)
- [Java-Jar源码构建应用](../java-jar/)
- [Java-Gradle源码构建应用](../java-gradle/)
- [Spring Boot项目配置MySQL](../spring-boot-mysql/)
- [Tomcat配置Redis实现Session共享](../tomcat-redis-session)
- [Webapp Runner配置说明](/user-manual/app-creation/language-support/java_more/webapp-runner/)
