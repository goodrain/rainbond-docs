---
title: 构建源管理
description: 本文讲解Rainbond组件各类型构建源管理方式，包括更改代码地址、分支、账号密码，设置构建参数等功能
---

Rainbond 组件创建有三种模式：[源码](/docs/use-manual/component-create/language-support/java/java-maven)、[镜像](/docs/use-manual/component-create/image-support/image)和应用市场，不同的创建方式对应组件不同的构建源类型。 对于开发者来说可能需要经常修改代码分支、镜像 Tag，构建环境参数等。这些需求通过对组件构建源的相关设置完成。

- 源码

  > 源码的构建源配置包括基础的代码仓库信息包括（仓库地址，分支，Tag, 授权信息等)
  >
  > 各语言支持的不同编译环境参数设置

- 镜像

  > 镜像的可配置参数主要是镜像地址，授权账号信息和镜像启动命令。

## 构建源检测

组件创建时对构建源进行语言检测，在后续的持续开发中，如果源码更改了语言类型，比如从 Java-Maven 类型更改为 Dockerfile 类型，需用执行重新检测源码操作，让 Rainbond 重新设定组件的编译方式才能生效。

> Rainbond 在源码编译过程中不会重新识别语言类型，因此如果组件源码的语言类型发生改变必须重新进行构建源检测。

## 自动构建设置

自动构建即通过一种方式自动触发 Rainbond 组件版本构建的操作，详细文档见 [组件自动构建](./auto_build)

## 构建参数设置

> 请注意，各语言配置项可能随着版本的升级而变更，因此请以产品体现为主。

### JAVA Maven 语言类型

| 参数名称                                        | 默认值                        | 可选值                                         | 说明                                                                                                                                                                   |
| ----------------------------------------------- | ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 清除构建缓存(NO_CACHE)                          |                               | true                                           | 默认不启用                                                                                                                                                             |
| OpenJDK 版本(BUILD_RUNTIMES)                    | 1.8                           | 1.6,1.7,1.8,1.9,10,11                          | OpenJDK 版本                                                                                                                                                           |
| 启用 OracleJDK(BUILD_ENABLE_ORACLEJDK)          |                               | true                                           | 默认不启用 OracleJDK                                                                                                                                                   |
| OracleJDK 下载路径(BUILD_ENABLE_ORACLEJDK)      |                               |                                                | OracleJDK(linux amd64)下载路径                                                                                                                                         |
| Maven 版本(BUILD_RUNTIMES_MAVEN)                | 3.3.1                         | 3.0.5,3.1.1,3.2.5,3.3.1,3.3.9                  | Maven 版本                                                                                                                                                             |
| Web 组件器支持(BUILD_RUNTIMES_SERVER)           | tomcat85                      | tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9 |                                                                                                                                                                        |
| 禁用 Maven Mirror(BUILD_MAVEN_MIRROR_DISABLE)   |                               | true                                           | 默认启用 Maven mirror,若禁用 Mirror 则关于 Mirror 配置不生效                                                                                                           |
| MAVEN MIRROR OF 配置(BUILD_MAVEN_MIRROR_OF)     | \*                            |                                                |                                                                                                                                                                        |
| MAVEN MIRROR_URL(BUILD_MAVEN_MIRROR_URL)        | maven.goodrain.me             |                                                |                                                                                                                                                                        |
| Maven 构建参数(BUILD_MAVEN_CUSTOM_OPTS)         | -DskipTests                   |                                                | Maven 构建参数                                                                                                                                                         |
| Maven 构建全局参数(BUILD_MAVEN_CUSTOM_GOALS)    | clean dependency:list install |                                                | Maven 构建参数                                                                                                                                                         |
| MAVEN 构建 Java 参数配置(BUILD_MAVEN_JAVA_OPTS) | -Xmx1024m                     |                                                |                                                                                                                                                                        |
| 启动命令(BUILD_PROCFILE)                        |                               |                                                | War 包:`web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war`;Jar 包:`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA Jar 语言类型

| 参数名称                                   | 默认值 | 可选值                | 说明                                                         |
| ------------------------------------------ | ------ | --------------------- | ------------------------------------------------------------ |
| OpenJDK 版本(BUILD_RUNTIMES)               | 1.8    | 1.6,1.7,1.8,1.9,10,11 | OpenJDK 版本                                                 |
| 启用 OracleJDK(BUILD_ENABLE_ORACLEJDK)     |        | true                  | 默认不启用 OracleJDK                                         |
| OracleJDK 下载路径(BUILD_ENABLE_ORACLEJDK) |        |                       | OracleJDK(linux amd64)下载路径                               |
| 启动命令(BUILD_PROCFILE)                   |        |                       | `web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA War 语言类型

| 参数名称                                   | 默认值   | 可选值                                         | 说明                                                         |
| ------------------------------------------ | -------- | ---------------------------------------------- | ------------------------------------------------------------ |
| OpenJDK 版本(BUILD_RUNTIMES)               | 1.8      | 1.6,1.7,1.8,1.9,10,11                          | OpenJDK 版本                                                 |
| 启用 OracleJDK(BUILD_ENABLE_ORACLEJDK)     |          | true                                           | 默认不启用 OracleJDK                                         |
| OracleJDK 下载路径(BUILD_ENABLE_ORACLEJDK) |          |                                                | OracleJDK(linux amd64)下载路径                               |
| Web 组件器支持(BUILD_RUNTIMES_SERVER)      | tomcat85 | tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9 |                                                              |
| 启动命令(BUILD_PROCFILE)                   |          |                                                | `web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA Gradle 语言类型

| 参数名称                                   | 默认值 | 可选值                | 说明                           |
| ------------------------------------------ | ------ | --------------------- | ------------------------------ |
| OpenJDK 版本(BUILD_RUNTIMES)               | 1.8    | 1.6,1.7,1.8,1.9,10,11 | OpenJDK 版本                   |
| 启用 OracleJDK(BUILD_ENABLE_ORACLEJDK)     |        | true                  | 默认不启用 OracleJDK           |
| OracleJDK 下载路径(BUILD_ENABLE_ORACLEJDK) |        |                       | OracleJDK(linux amd64)下载路径 |

### Python 语言类型支持

| 参数名称                     | 默认值                                   | 可选值                                                                                                                                                                                    | 说明       |
| ---------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Python 版本(BUILD_RUNTIMES)  | python-3.6.6                             | python-3.4.3,python-3.5.3,python-3.6.0,python-3.6.1,python-3.6.2,python-3.6.3,python-3.6.4,python-3.6.5,python-3.6.6,python-2.7.9,python-2.7.10,python-2.7.13,python-2.7.14,python-2.7.15 |            |
| Pypi 源(BUILD_PIP_INDEX_URL) | https://pypi.tuna.tsinghua.edu.cn/simple |                                                                                                                                                                                           | PIP 源     |
| 清除构建缓存(NO_CACHE)       |                                          | true                                                                                                                                                                                      | 默认不启用 |

### PHP 语言类型

| 参数名称                              | 默认值 | 可选值                      | 说明       |
| ------------------------------------- | ------ | --------------------------- | ---------- |
| web 组件器支持(BUILD_RUNTIMES_SERVER) | apache | nginx                       |            |
| PHP 版本(BUILD_RUNTIMES)              | 5.6.35 | 5.5.38,5.6.35,7.0.29,7.1.16 |            |
| 清除构建缓存(NO_CACHE)                |        | true                        | 默认不启用 |

<!--
| HHVM版本(BUILD_RUNTIMES_HHVM)|3.5.1|||
-->

### 静态语言类型

| 参数名称                              | 默认值 | 可选值 | 说明 |
| ------------------------------------- | ------ | ------ | ---- |
| web 组件器支持(BUILD_RUNTIMES_SERVER) | nginx  | apache |      |

### NodeJS 语言类型

| 参数名称                  | 默认值 | 可选值                                                  | 说明       |
| ------------------------- | ------ | ------------------------------------------------------- | ---------- |
| Node 版本(BUILD_RUNTIMES) | 8.12.0 | 4.9.1,5.12.0,6.14.4,7.10.1,8.12.0,9.11.2,10.13.0,11.1.0 | Node 版本  |
| 清除构建缓存(NO_CACHE)    |        | true                                                    | 默认不启用 |

### Golang 语言类型

| 参数名称                    | 默认值   | 可选值                                                     | 说明    |
| --------------------------- | -------- | ---------------------------------------------------------- | ------- |
| Golang 版本(BUILD_RUNTIMES) | go1.11.2 | go1.9.7 go1.8.7 go1.11.2 go1.11 go1.11.1 go1.10.5 go1.10.4 | Go 版本 |

### NodeJS 前端语言类型

| 参数名称                              | 默认值 | 可选值                                                   | 说明       |
| ------------------------------------- | ------ | -------------------------------------------------------- | ---------- |
| Node 版本(BUILD_RUNTIMES)             | 8.12.0 | 4.9.1,5.12.0,6.14.4,7.10.1, 8.12.0,9.11.2,10.13.0,11.1.0 | Node 版本  |
| 清除构建缓存(NO_CACHE)                |        | true                                                     | 默认不启用 |
| web 组件器支持(BUILD_RUNTIMES_SERVER) | nginx  | apache                                                   |            |

### .NetCore 语言类型

| 参数名称                                   | 默认值                 | 可选值                                                               | 说明         |
| ------------------------------------------ | ---------------------- | -------------------------------------------------------------------- | ------------ |
| 编译环境版本(BUILD_DOTNET_SDK_VERSION)     | 2.2-sdk-alpine         | 3.0-sdk,2.2-sdk-alpine,2.1-sdk                                       | 编译环境版本 |
| 运行环境版本(BUILD_DOTNET_RUNTIME_VERSION) | 2.2-aspnetcore-runtime | 3.0-aspnetcore-runtime,2.2-aspnetcore-runtime,2.1-aspnetcore-runtime | 运行环境版本 |

### Dockerfile 语言类型

支持 ARG 参数设置,key-value 模式

```
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app
```

## 更多高级构建源配置

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```