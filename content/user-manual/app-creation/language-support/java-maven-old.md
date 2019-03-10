---
title: Java Maven源码构建应用
description: Java Maven源码构建应用
hidden: true
---

## 简介

本教程将帮助你在几分钟内快速部署Java Maven源码程序。

## 准备工作

在此步骤中，你需要提供一个可用的Java Maven源码程序用来部署在Rainbond平台上,此应用程序至少需要满足如下条件:

1. 本地可以正常构建运行的Java Maven源码程序
2. 源码程序必须托管在gitlab等相关git或者svn服务上
3. 源码程序根路径下需要存在Java的依赖管理工具Maven所需的`pom.xml`文件

这里提供示例Java Maven源码程序,你可以选择自己需求选择已有的Java Maven源码程序

```bash
git clone https://github.com/goodrain/java-maven-demo.git
cd java-maven-demo
```

## 定义启动命令

Rainbond源码构建应用程序使用[Procfile](./etc/procfile.html)的特殊声明文件来明确声明应该执行什么命令来启动你的应用程序。

```bash
web: java $JAVA_OPTS -jar target/spring-boot-demo-0.0.1.jar
```



{{% notice note %}}
1. `web:`和`java`之间有一个空格
2. 文件结尾不能包含特殊字符
{{% /notice %}}

如果项目未定义Procfile文件,平台默认会根据识别项目类型有以下几种方式运行:

1. 在pom.xml中定义的打包方式为 war ,平台使用 webapp-runner.jar 将打包的 war 包运行起来，类似启动命令如下：

```bash
web: java $JAVA_OPTS -jar /opt/webapp-runner.jar --port $PORT target/*.war
```

2. 如果是SpringBoot的项目且打包方式不是 war 包, 类型启动命令如下

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

目前源码构建应用只支持单一类型: `web`, 表示此应用为Web型应用,可以接受处理web流量;  
`$JAVA_OPTS`: 平台会根据应用分配的内存自动调整此参数;  
`$PORT`: 根据用户在平台设置的端口决定监听，默认监听端口为 5000


## Java运行环境配置

### 配置Java版本

当前Rainbond只支持OpenJDK如下版本为：

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

### 配置Maven版本

Rainbond默认的推荐Maven版本为`3.3.1`,支持如下版本: `3.0.5`, `3.1.1`, `3.2.5`, `3.3.1`, `3.3.9`.    
如果你的源码根目录定义了`mvnw`,将使用此脚本启动Maven进程。  
与Java设置指定版本一致，即通过`system.properties`文件来设定`maven.version`的值来指定所需版本的Maven.  

```yaml
maven.version=3.3.1
```

如果指定了Maven版本，则会忽略`mvnw`

## 构建高级选项配置

默认平台 Java-Maven 源码构建Buildpack支持如下参数选项,进行源码构建高级配置设定，可以根据自己需求在环境变量里设置,构建时生效.

| 环境变量     | 默认值        | 说明                     |
| :------- | :----------- | :----------------------- |
| BUILD_PROCFILE   |  默认为空     | 配置此值构建时会重写源码中的Procfile |
| BUILD_DEBUG_URL   | 默认为空     | 默认不显示资源下载URL                     |
| BUILD_MAVEN_MIRROR_DISABLE   | 默认为空        | 启用Maven Mirror                    |
| BUILD_MAVEN_MIRROR_OF | * |                      |
| BUILD_MAVEN_MIRROR_URL | maven.goodrain.me |  平台默认Mirror地址                    |
| BUILD_MAVEN_CUSTOM_OPTS| `-DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true`| Maven构建参数|
| BUILD_MAVEN_CUSTOM_GOALS|`clean dependency:list install`|Maven构建参数|
| BUILD_MAVEN_SETTINGS_URL|默认为空|Maven配置地址|
| BUILD_MAVEN_JAVA_OPTS| `-Xmx1024m` ||
| BUILD_ENABLE_ORACLEJDK| 默认为空|启用ORACLEJDK|
| BUILD_ORACLEJDK_URL|默认为空|ORACLEJDK下载路径|
| NO_CACHE| 默认为空| 不使用缓存 |

## 部署应用

### 本地调试(可选)

如果可以访问管理节点，可以在管理测试是否可以正常源码构建

```bash
git clone https://github.com/goodrain/java-maven-demo.git
cd java-maven-demo
grctl buildtest
# 如果需要使用高级设置，可使用
grctl buildtest --env BUILD_DEBUG_URL=true
```

## 添加数据库依赖

前提是代码里已经配置了可以从环境变量中获取数据库的连接信息如：

- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_HOST
- MYSQL_PORT

### 首次源码构建

在识别出Java项目后高级设置里，添加依赖数据库依赖

### 构建完成后

如果应用已经构建完成,可以在依赖选项卡里添加依赖，添加完成后更新Java程序

## 推荐阅读

- [Java-Jar源码构建应用](./java-jar.html)
- [Java-War源码构建应用](./java-jar.html)
- [Java-Gradle源码构建应用](./java-jar.html)
- [Spring Boot项目配置MySQL](./java/spring-boot-mysql.html)
- [Tomcat配置Redis实现Session共享](./java/tomcat-redis-session.html)



1. 编译机制

平台默认编译运行方式

    1. 编译
    2. 运行

2. 源码规范

要求pom.xml,默认procfile

单模块，多模块

3. 编译运行环境设置

1. 项目代码定义
2. 平台定义(优先级高)

4. Demo(扩展阅读链接)