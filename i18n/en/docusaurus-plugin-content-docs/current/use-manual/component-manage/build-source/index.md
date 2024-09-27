---
title: Build source management
description: This article explains various types of build source management methods for Rainbond components, including functions such as changing code addresses, branches, account passwords, and setting build parameters.
---

There are three modes for Rainbond component creation:：[source code](/docs/use-manual/component-create/language-support/java/java-maven),[mirror](/docs/use-manual/component-create/image-support/image)and application market. Different creation methods correspond to different build source types of components. For developers, it may be necessary to frequently modify code branches, mirror tags, build environment parameters, etc.These requirements are accomplished through the relevant settings of the component build sources. 对于开发者来说可能需要经常修改代码分支、镜像 Tag，构建环境参数等。这些需求通过对组件构建源的相关设置完成。

- source code

  > The source code construction source configuration includes the basic code warehouse information including (warehouse address, branch, Tag, authorization information, etc.)
  >
  > Different compilation environment parameter settings supported by each language

- mirror

  > 镜像的可配置参数主要是镜像地址，授权账号信息和镜像启动命令。

## Build source detection

When the component is created, the language of the build source is detected. In the subsequent continuous development, if the source code changes the language type, such as changing from the Java-Maven type to the Dockerfile type, it is necessary to perform the re-detection operation of the source code to let Rainbond reset the component's Compile mode to take effect.

> Rainbond will not re-identify the language type during the source code compilation process, so if the language type of the component source code changes, it must re-build the source detection.

## Automatic build settings

Automatic build is an operation that automatically triggers the build of the Rainbond component version in one way. For details, see Automatic Build

## Build parameter settings

> Please note that the configuration items of each language may change with the upgrade of the version, so please reflect on the product.

### JAVA Maven language type

| parameter name                                                                                                                                     | Defaults                                          | optional value                                                                                                                                                                                    | illustrate                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clear build cache (NO_CACHE)                                                                               |                                                   | true                                                                                                                                                                                              | Not enabled by default                                                                                                                                                                         |
| OpenJDK version (BUILD_RUNTIMES)                                                                           | 1.8                               | 1.6,1.7,1.8,1.9,10,11                                                                                                             | OpenJDK version                                                                                                                                                                                |
| Enable OracleJDK (BUILD_ENABLE_ORACLEJDK)                                             |                                                   | true                                                                                                                                                                                              | OracleJDK is not enabled by default                                                                                                                                                            |
| OracleJDK download path (BUILD_ENABLE_ORACLEJDK)                                      |                                                   |                                                                                                                                                                                                   | OracleJDK (linux amd64) download path                                                                                                                                       |
| Maven version (BUILD_RUNTIMES_MAVEN)                                                  | 3.3.1             | 3.0.5, 3.1.1, 3.2.5, 3.3.1, 3.3.9 | Maven version                                                                                                                                                                                  |
| Web Component Server Support (BUILD_RUNTIMES_SERVER)                                  | tomcat85                                          | tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9                                                                                                                                                    |                                                                                                                                                                                                |
| Disable Maven Mirror (BUILD_MAVEN_MIRROR_DISABLE)                |                                                   | true                                                                                                                                                                                              | Maven mirror is enabled by default. If Mirror is disabled, the Mirror configuration will not take effect.                                                      |
| MAVEN MIRROR OF configuration (BUILD_MAVEN_MIRROR_OF)            | \*                                                |                                                                                                                                                                                                   |                                                                                                                                                                                                |
| MAVEN MIRROR_URL(BUILD_MAVEN_MIRROR_URL)    | maven.goodrain.me |                                                                                                                                                                                                   |                                                                                                                                                                                                |
| Maven build parameters (BUILD_MAVEN_CUSTOM_OPTS)                 | -DskipTests                                       |                                                                                                                                                                                                   | Maven build parameters                                                                                                                                                                         |
| Maven build global parameters (BUILD_MAVEN_CUSTOM_GOALS)         | clean dependency:list install     |                                                                                                                                                                                                   | Maven build parameters                                                                                                                                                                         |
| MAVEN build Java parameter configuration (BUILD_MAVEN_JAVA_OPTS) | -Xmx1024m                                         |                                                                                                                                                                                                   |                                                                                                                                                                                                |
| Start command (BUILD_PROCFILE)                                                                             |                                                   |                                                                                                                                                                                                   | War package:`web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war`;Jar package:`web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA Jar language type

| parameter name                                                                                                | Defaults            | optional value                                                                        | illustrate                                                   |
| ------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| OpenJDK version (BUILD_RUNTIMES)                                      | 1.8 | 1.6,1.7,1.8,1.9,10,11 | OpenJDK version                                              |
| Enable OracleJDK (BUILD_ENABLE_ORACLEJDK)        |                     | true                                                                                  | OracleJDK is not enabled by default                          |
| OracleJDK download path (BUILD_ENABLE_ORACLEJDK) |                     |                                                                                       | OracleJDK (linux amd64) download path     |
| Startup Command (BUILD_PROCFILE)                                      |                     |                                                                                       | `web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA War language type

| parameter name                                                                                                    | Defaults            | optional value                                                                        | illustrate                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| OpenJDK version (BUILD_RUNTIMES)                                          | 1.8 | 1.6,1.7,1.8,1.9,10,11 | OpenJDK version                                              |
| Enable OracleJDK (BUILD_ENABLE_ORACLEJDK)            |                     | true                                                                                  | OracleJDK is not enabled by default                          |
| OracleJDK download path (BUILD_ENABLE_ORACLEJDK)     |                     |                                                                                       | OracleJDK (linux amd64) download path     |
| Web Component Server Support (BUILD_RUNTIMES_SERVER) | tomcat85            | tomcat7,tomcat8,tomcat85,tomcat9,jetty7,jetty9                                        |                                                              |
| Start command (BUILD_PROCFILE)                                            |                     |                                                                                       | `web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar` |

### JAVA Gradle language type

| parameter name                                                                                                | Defaults            | optional value                                                                        | illustrate                                               |
| ------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| OpenJDK version (BUILD_RUNTIMES)                                      | 1.8 | 1.6,1.7,1.8,1.9,10,11 | OpenJDK version                                          |
| Enable OracleJDK (BUILD_ENABLE_ORACLEJDK)        |                     | true                                                                                  | OracleJDK is not enabled by default                      |
| OracleJDK download path (BUILD_ENABLE_ORACLEJDK) |                     |                                                                                       | OracleJDK (linux amd64) download path |

### Python language type support

| parameter name                                                                                                      | Defaults                                                                                                                 | optional value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | illustrate             |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Python version (BUILD_RUNTIMES)                                             | python-3.6.6                                                                             | python-3.4.3,python-3.5.3,python-3.6.0,python-3.6.1,python-3.6.2,python-3.6.3,python-3.6.4,python-3.6.5,python- 3.6.6, python-2.7.9, python-2.7.10, python-2.7.13, python-2.7.14, python-2.7.15 |                        |
| Pypi source (BUILD_PIP_INDEX_URL) | https://pypi.tuna.tsinghua.edu.cn/simple |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | pip source             |
| Clear build cache (NO_CACHE)                                                |                                                                                                                          | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Not enabled by default |

### PHP language type

| parameter name                                                                                                    | Defaults                               | optional value                                                                                                                                                 | illustrate             |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| web component server support (BUILD_RUNTIMES_SERVER) | apache                                 | nginx                                                                                                                                                          |                        |
| PHP version (BUILD_RUNTIMES)                                              | 5.6.35 | 5.5.38, 5.6.35, 7.0.29, 7.1.16 |                        |
| Clear build cache (NO_CACHE)                                              |                                        | true                                                                                                                                                           | Not enabled by default |

<!--
| HHVM版本(BUILD_RUNTIMES_HHVM)|3.5.1|||
-->

### static language type

| parameter name                                                                                                    | Defaults | optional value | illustrate |
| ----------------------------------------------------------------------------------------------------------------- | -------- | -------------- | ---------- |
| web component server support (BUILD_RUNTIMES_SERVER) | nginx    | apache         |            |

### NodeJS language type

| parameter name                                                        | Defaults                               | optional value                                                                                                                                                                                                                                                                                                                 | illustrate             |
| --------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Node version (BUILD_RUNTIMES) | 8.12.0 | 4.9.1, 5.12.0, 6.14.4, 7.10.1, 8.12.0, 9.11.2, 10.13.0, 11.1.0 | Node version           |
| Clear build cache (NO_CACHE)  |                                        | true                                                                                                                                                                                                                                                                                                                           | Not enabled by default |

### Golang language type

| parameter name                                                          | Defaults                                 | optional value                                                                                                                                                                                                                                                             | illustrate |
| ----------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Golang version (BUILD_RUNTIMES) | go1.11.2 | go1.9.7 go1.8.7 go1.11.2 go1.11 go1.11.1 go1.10.5 go1.10.4 | Go version |

### NodeJS front-end language type

| parameter name                                                                                                    | Defaults                               | optional value                                                                                                                                                                                                                                                                                                                 | illustrate             |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Node version (BUILD_RUNTIMES)                                             | 8.12.0 | 4.9.1, 5.12.0, 6.14.4, 7.10.1, 8.12.0, 9.11.2, 10.13.0, 11.1.0 | Node version           |
| Clear build cache (NO_CACHE)                                              |                                        | true                                                                                                                                                                                                                                                                                                                           | Not enabled by default |
| web component server support (BUILD_RUNTIMES_SERVER) | nginx                                  | apache                                                                                                                                                                                                                                                                                                                         |                        |

### .NetCore language types

| parameter name                                                                                                                               | Defaults                               | optional value                                                                                                         | illustrate                  |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Build environment version (BUILD_DOTNET_SDK_VERSION)       | 2.2-sdk-alpine         | 3.0-sdk, 2.2-sdk-alpine, 2.1-sdk                                       | build environment version   |
| Runtime environment version (BUILD_DOTNET_RUNTIME_VERSION) | 2.2-aspnetcore-runtime | 3.0-aspnetcore-runtime, 2.2-aspnetcore-runtime, 2.1-aspnetcore-runtime | Runtime environment version |

### Dockerfile language type

Support ARG parameter setting, key-value mode

```
ARG CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD /code/run-app
```

## More advanced build source configuration

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
