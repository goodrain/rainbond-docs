---
title: 组件构建源设置
description: Rainbond组件的构建源设置和各语言编译参数配置文档
weight: 5017
hidden: true
---

### 组件构建源

Rainbond内置组件创建有三种模式：[源码](/user-manual/app-creation/service_create/#从源码创建)、[镜像](/user-manual/app-creation/service_create/#从docker镜像创建)和[应用市场](/user-manual/app-creation/service_create/#从应用市场安装)，它们分别具有不同的属性提供配置。

* 源码
> 源码的构建源配置参数将是最为丰富的，包括基础的代码仓库信息包括（仓库地址，分支，Tag, 授权信息等)
>
> 还有各语言的编译环境参数

* 镜像
> 镜像的可配置参数主要是镜像地址，仓库信息和镜像启动命令等

* 应用市场
> 从应用市场安装的组件不提供更多的参数配置，主要展示来源于哪个云市应用。

### 构建源检测

组件创建时对构建源进行语言检测，在后续的持续开发中，如果源码更改了语言类型，比如从Java-Maven类型更改为Dockerfile类型，需用执行重新检测源码操作，让Rainbond重新设定组件的编译方式才能生效。

> Rainbond在源码编译过程中不会重新识别语言类型、

### 自动构建设置

自动构建即通过一种方式自动触发Rainbond组件版本构建的操作，详细文档见[组件自动构建](/user-manual/app-service-manage/auto-deploy/)

### 构建参数设置

#### JAVA Maven语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| 清除构建缓存(NO_CACHE)||true|默认不启用|
| OpenJDK版本(BUILD_RUNTIMES)  | 1.8    | 1.6,1.7,1.8,1.9,10,11| OpenJDK版本     |
| 启用OracleJDK(BUILD_ENABLE_ORACLEJDK)| |true| 默认不启用OracleJDK |
| OracleJDK下载路径(BUILD_ENABLE_ORACLEJDK)| ||OracleJDK(linux amd64)下载路径|
| Maven版本(BUILD_RUNTIMES_MAVEN) | 3.3.1 | 3.0.5,3.1.1,3.2.5,3.3.1,3.3.9|Maven版本|
| Web组件器支持(BUILD_RUNTIMES_SERVER)| tomcat85| tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9||
| 禁用Maven Mirror(BUILD_MAVEN_MIRROR_DISABLE) ||true|默认启用Maven mirror,若禁用Mirror则关于Mirror配置不生效|
| MAVEN MIRROR OF配置(BUILD_MAVEN_MIRROR_OF)|*|||
| MAVEN MIRROR_URL(BUILD_MAVEN_MIRROR_URL)| maven.goodrain.me|||
| Maven构建参数(BUILD_MAVEN_CUSTOM_OPTS)|-DskipTests||Maven构建参数|
| Maven构建全局参数(BUILD_MAVEN_CUSTOM_GOALS)|clean dependency:list install||Maven构建参数|
| MAVEN构建Java参数配置(BUILD_MAVEN_JAVA_OPTS)|-Xmx1024m|||
| 启动命令(BUILD_PROCFILE)|||War包:<br \>`web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war`;<br \>Jar包:<br \>`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar`|

#### JAVA Jar语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| OpenJDK版本(BUILD_RUNTIMES)  | 1.8    | 1.6,1.7,1.8,1.9,10,11| OpenJDK版本     |
| 启用OracleJDK(BUILD_ENABLE_ORACLEJDK)| |true| 默认不启用OracleJDK |
| OracleJDK下载路径(BUILD_ENABLE_ORACLEJDK)| ||OracleJDK(linux amd64)下载路径|
| 启动命令(BUILD_PROCFILE)|||`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar`|

#### JAVA War语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| OpenJDK版本(BUILD_RUNTIMES)  | 1.8    | 1.6,1.7,1.8,1.9,10,11| OpenJDK版本     |
| 启用OracleJDK(BUILD_ENABLE_ORACLEJDK)| |true| 默认不启用OracleJDK |
| OracleJDK下载路径(BUILD_ENABLE_ORACLEJDK)| ||OracleJDK(linux amd64)下载路径|
| Web组件器支持(BUILD_RUNTIMES_SERVER)| tomcat85| tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9||
| 启动命令(BUILD_PROCFILE)|||`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar`|


#### JAVA Gradle语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| OpenJDK版本(BUILD_RUNTIMES)  | 1.8    | 1.6,1.7,1.8,1.9,10,11| OpenJDK版本     |
| 启用OracleJDK(BUILD_ENABLE_ORACLEJDK)| |true| 默认不启用OracleJDK |
| OracleJDK下载路径(BUILD_ENABLE_ORACLEJDK)| ||OracleJDK(linux amd64)下载路径|

#### Python语言类型支持
| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| Python版本(BUILD_RUNTIMES)|python-3.6.6 |python-3.4.3,python-3.5.3,python-3.6.0,python-3.6.1,python-3.6.2,python-3.6.3,python-3.6.4,python-3.6.5,python-3.6.6,python-2.7.9,python-2.7.10,python-2.7.13,python-2.7.14,python-2.7.15| |
|Pypi源(BUILD_PIP_INDEX_URL)|https://pypi.tuna.tsinghua.edu.cn/simple||PIP源|
| 清除构建缓存(NO_CACHE)||true|默认不启用|


#### PHP语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| web组件器支持(BUILD_RUNTIMES_SERVER)| apache |nginx| |
| PHP版本(BUILD_RUNTIMES)| 5.6.35 |5.5.38,5.6.35,7.0.29,7.1.16| |
| 清除构建缓存(NO_CACHE)||true|默认不启用|

<!--
| HHVM版本(BUILD_RUNTIMES_HHVM)|3.5.1|||
-->

#### 静态语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| web组件器支持(BUILD_RUNTIMES_SERVER)| nginx |apache| |

#### NodeJS语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| Node版本(BUILD_RUNTIMES)| 8.12.0 |4.9.1,5.12.0,6.14.4,7.10.1,8.12.0,9.11.2,10.13.0,11.1.0|Node版本| 
| 清除构建缓存(NO_CACHE)||true|默认不启用|


#### Golang语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| Golang版本(BUILD_RUNTIMES)| go1.11.2 |go1.9.7 go1.8.7 go1.11.2 go1.11 go1.11.1 go1.10.5 go1.10.4|Go版本| 

#### NodeJS前端语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| Node版本(BUILD_RUNTIMES)| 8.12.0 |4.9.1,5.12.0,6.14.4,7.10.1, 8.12.0,9.11.2,10.13.0,11.1.0|Node版本| 
| 清除构建缓存(NO_CACHE)||true|默认不启用|
| web组件器支持(BUILD_RUNTIMES_SERVER)| nginx|apache| |

#### .NetCore语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
|编译环境版本(BUILD_DOTNET_SDK_VERSION)|2.2-sdk-alpine|3.0-sdk,2.2-sdk-alpine,2.1-sdk|编译环境版本|
|运行环境版本(BUILD_DOTNET_RUNTIME_VERSION)|2.2-aspnetcore-runtime|3.0-aspnetcore-runtime,2.2-aspnetcore-runtime,2.1-aspnetcore-runtime|运行环境版本|

#### Dockerfile语言类型

支持ARG参数设置,key-value模式

```
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app
```
