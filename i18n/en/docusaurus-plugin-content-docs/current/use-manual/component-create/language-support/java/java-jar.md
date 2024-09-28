---
title: Java Jar Package Deployment Components
description: This article describes the main points of Java Jar package deployment components, suitable for developers and operation and maintenance personnel.
---

### Jar project identification strategy

By default, the platform will identify a Java Jar project according to whether there is a Jar package in the source root directory.

### Platform compile and run mechanism

1. The pre-compilation process will detect whether the startup command configuration file [Procfile](../procfile) is defined, if not, the default Jar package startup configuration file will be generated;
2. After the pre-compilation process is completed, the Java-jar buildpack will be selected according to the language type to compile the project. During the compilation process, the defined JDK version will be installed;
3. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

### Jar project source code specification

In this step, you need to provide an available Java Jar source program for deployment on the Rainbond platform. This application must at least meet the following conditions:

1. Jar package that works fine locally
2. The source code program must be hosted on a related git or svn service such as gitlab (since 5.4, it supports downloading compressed packages and building)
3. The Jar package file must exist in the root path of the source program

#### Procfile specification

If the project does not define a Procfile, the platform will generate a default Procfile by default to run the Jar package.

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar ./*.jar
```

The above is the default Procfile, if you need to expand more startup parameters, you can customize the Procfile.

1. `web: there is a space between`and`java`
2. End of file cannot contain special characters
3. JAVA_OPTS: The platform will automatically set the values of Xmx and Xms according to the memory size of the application
4. PORT: The listening port is determined according to the port set by the user on the platform. The default listening port is 5000.

### Compile and run environment settings

When choosing a JDK version or other component version, you need to pay attention not to choose a JDK or other component version that is too high or too low than the version used by the project to avoid source code compilation failure

#### OpenJDK support

Currently Rainbond supports OpenJDK, the following version is：

- Java 1.6 - `1.6.0_27`
- Java 1.7 - `1.7.0_95`
- Java 1.8 - `1.8.0_74`
- Java `1.9-latest`
- Java 10 - `10.0.2`
- Java `11.0.1`

The default version of the platform is `1.8`.The platform default version uses`1.8`.If you need to use other versions of OpenJDK, you can specify the required version of JDK by adding`system.properties`file to the source root directory to set the value of`java.runtime.version`.

```yaml
# system.properties The current version values that Rainbond can recognize are 11, 10, 1.9, 1.8, 1.7, 1.6
java.runtime.version=1.8
```

#### OracleJDK Support

The platform now also supports OracleJDK, but this feature needs to be enabled in the platform to take effect.\
The platform currently also supports OracleJDK, but this feature needs to be enabled in the platform to take effect.\
OracleJDK download is not built-in by default, you need to configure the relevant OracleJDK download address after enabling OracleJDK in the settings.

OracleJDK download address format requirements: `http://<web服务URL>/jdk-8u201-linux-x64.tar.gz`

The configuration priority of platform settings is higher than the configuration defined in the program code, such as the choice of Java JDK version, in the program code, the JDK version is specified as 1.9 through`system.properties`, and the JDK version is selected as 11 on the platform, Then by default, the platform-specific version JDK11 will be used preferentially when compiling source code.

#### Build source code from compressed package

From 5.4 onwards, the platform supports downloading compressed packages from the download address to build (the supported compressed package formats are tar, tar.gz, zip). The entry for building through compressed packages is in the source code creation component, and the warehouse address is OSS.This feature needs to package the built jar package and Procfile (optional) into a supported compressed package format.This feature requires that a built jar pack and a Procfile (not necessary) package format to be supported.

Compressed package download address format requirements: `http://<web服务URL>/jarDemo.tar.gz`

The download address must end with`<compressed package name>.<compressed format>`.

### Sample demo program

Example[https://github.com/goodrain/java-jar-demo](https://github.com/goodrain/java-jar-demo.git)

### Recommended reading

- [Java-Maven source build application](./java-maven/)
- [Java-War source code building application](./java-war/)
- [Java-Gradle source build application](./java-gradle/)
- [Tomcat configures Redis to implement Session sharing](./tomcat-redis-session/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
