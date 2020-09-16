---
title: Java Jar包部署组件
description: 本文讲述Java Jar包部署组件的要点，适用于开发者和运维人员。
hidden: false
weight: 805
aliases:
- /docs/user-manual/component-create/language-support/java/java-jar/
---

### Jar项目识别策略
平台默认会根据源码根目录是否有Jar包来识别为Java Jar项目.

### 平台编译运行机制

1. 预编译处理会探测是否定义了启动命令配置文件 [Procfile](/docs/component-create/language-support/procfile/) ,如果未定义会生成默认Jar包启动配置文件;
2. 预编译处理完成后,会根据语言类型选择Java-jar的buildpack去编译项目.在编译过程中会安装定义的JDK版本;
3. 编译完成后会检查是否在平台设置了Procfile参数,若配置了会重写启动命令配置文件Procfile.

### Jar项目源码规范

在此步骤中，你需要提供一个可用的Java Jar源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常运行的Jar包
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下必须需要存在Jar包文件 

#### Procfile规范

如果项目未定义Procfile文件,平台默认会生成默认Procfile来运行Jar包。

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar ./*.jar
```

上述是默认Procfile,如果需要扩展更多启动参数,可以自定义Procfile。


1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
3. JAVA_OPTS: 平台会根据应用的内存大小，自动设置Xmx和Xms的值
4. PORT: 根据用户在平台设置的端口决定监听，默认监听端口为 5000


### 编译运行环境设置

在选择JDK版本或其他组件版本时，需要注意JDK或者其他组件版本不要选择比项目使用的版本过高或者过低以免导致源码编译失败

#### OpenJDK支持

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

#### OracleJDK支持

平台目前也支持OracleJDK,但此特性需要在平台里启用才会生效。  
默认不内置提供OracleJDK下载,需要在设置里启用OracleJDK后配置相关OracleJDK下载地址。

OracleJDK下载地址格式要求: `http://<web服务URL>/jdk-8u201-linux-x64.tar.gz`


平台设置的配置优先级要高于程序代码中定义的配置，如Java JDK版本的选择,在程序代码里通过`system.properties`指定了JDK版本为1.9,在平台上选择了JDK版本为11,那么默认在进行源码编译时会优先使用平台指定的版本JDK11


### 示例demo程序

示例[https://github.com/goodrain/java-jar-demo](https://github.com/goodrain/java-jar-demo.git)

### 推荐阅读

- [Java-Maven源码构建应用](../java-maven/)
- [Java-War源码构建应用](../java-war/)
- [Java-Gradle源码构建应用](../java-gradle/)
- [Tomcat配置Redis实现Session共享](../tomcat-redis-session/)
- [RAINBOND源码构建JAVA项目选取JDK](/docs/advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond源码构建JAVA项目配置Maven仓库](/docs/advanced-scenarios/devops/how-to-config-maven/)
