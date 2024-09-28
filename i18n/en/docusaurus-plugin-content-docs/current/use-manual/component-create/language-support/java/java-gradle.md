---
title: Java Gradle source deployment components
description: This article introduces the main points of Java Gradle source code deployment components, which is suitable for developer reference.
---

### Gradle project identification strategy

By default, the platform will identify a Java Gradle project according to whether there is a gradlew file or build.gradle in the source root directory.

### Platform compile and run mechanism

1. After the pre-compilation process is completed, the Java-Gradle buildpack will be selected according to the language type to compile the project. The defined JDK version will be installed during the compilation process;
2. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

Platform default Gradle build command

```bash
gradlew build -x test
```

### Gradle project source code specification

In this step, you need to provide a usable Java Gradle source program for deployment on the Rainbond platform. This application must at least meet the following conditions:

1. A locally working Gradle program
2. The source code program must be hosted on a related git or svn service such as gitlab
3. The gradlew file or build.gradle must exist in the root path of the source code program

### Compile and run environment settings

When choosing a JDK version or other component version, you need to pay attention not to choose a JDK or other component version that is too high or too low than the version used by the project to avoid source code compilation failure

#### OpenJDK support

Currently Rainbond supports OpenJDK, the following version is：

- Java 1.6 - `1.6.0_27`
- Java 1.7 - `1.7.0_95`
- Java 1.8 - `1.8.0_74`
- Java `1.9-latest`
- Java 10 - `10.0.2`
- Java 11 - `11.0.1`

平台默认版本使用`1.8`。The platform default version uses`1.8`.If you need to use other versions of OpenJDK, you can specify the required version of JDK by adding`system.properties`file to the source root directory to set the value of`java.runtime.version`.

```yaml
# system.properties The current version values that Rainbond can recognize are 11, 10, 1.9, 1.8, 1.7, 1.6
java.runtime.version=1.8
```

#### OracleJDK Support

平台目前也支持 OracleJDK,但此特性需要在平台里启用才会生效。\
The platform currently also supports OracleJDK, but this feature needs to be enabled in the platform to take effect.\
OracleJDK download is not built-in by default, you need to configure the relevant OracleJDK download address after enabling OracleJDK in the settings.

OracleJDK download address format requirements: `http://<web服务URL>/jdk-8u201-linux-x64.tar.gz`

The configuration priority of platform settings is higher than the configuration defined in the program code, such as the choice of Java JDK version, in the program code, the JDK version is specified as 1.9 through`system.properties`, and the JDK version is selected as 11 on the platform, Then by default, the platform-specific version JDK11 will be used preferentially when compiling source code.

### Sample demo program

Example[https://github.com/goodrain/java-gradle-demo](https://github.com/goodrain/java-gradle-demo.git)

### Recommended reading

- [Java-Maven source build application](./java-maven)
- [Java-War source code building application](./java-war)
- [Java-Jar source code building application](./java-jar)
- [Tomcat configures Redis to implement Session sharing](./tomcat-redis-session)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](./advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
