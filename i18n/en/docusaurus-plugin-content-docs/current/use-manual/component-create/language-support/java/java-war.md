---
title: Java War Package Deployment Components
description: Describes the main points of Java War package deployment components, suitable for developers and operation and maintenance personnel.
---

### War item identification strategy

By default, the platform will identify a Java War project according to whether there is a War file in the root directory of the source code.

### Platform compile and run mechanism

1. The pre-compilation process will detect whether the startup command configuration file [Procfile](../procfile) is defined, if not, the default War package startup configuration file will be generated;
2. After the pre-compilation process is completed, the Java-war buildpack will be selected according to the language type to compile the project. During the compilation process, the defined JDK version and Web service will be installed;
3. After the compilation is completed, it will check whether the Procfile parameter is set on the platform. If it is configured, the startup command configuration file Procfile will be rewritten.

### War project source code specification

In this step, you need to provide a usable Java War source code program for deployment on the Rainbond platform. This application must meet at least the following conditions:

1. War package that works fine locally
2. The source code program must be hosted on a related git or svn service such as gitlab (since 5.4, it supports downloading compressed packages and building)
3. A War file must exist in the root path of the source code program (that is, the project has been converted into a war file)

#### Procfile specification

If the project does not define a Procfile, the platform will generate a default Procfile by default to run the War package.

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war
```

The above is the default Procfile, if you need to expand more startup parameters, you can customize the Procfile.

1. `web: there is a space between`and`java`
2. End of file cannot contain special characters
3. JAVA_OPTS: The platform will automatically set the values of Xmx and Xms according to the memory size of the application
4. PORT: The listening port is determined according to the port set by the user on the platform. The default listening port is 5000.

When the web server support is adjusted, packaging into War needs to adjust the startup command

- When selecting a different version of tomcat `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`
- When selecting different versions of jetty `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`\
  You need to configure the context path, you can specify [webapp-runner parameter path](https://github.com/jsimone/webapp-runner#options)by customizing the Procfile
- Example `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d> --port $PORT ./*.war`

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

The configuration priority of the platform setting is higher than the configuration defined in the program code, such as the selection of the Java JDK version, in the program code, the JDK version is specified as 1.9 through`system.properties`, and the JDK version is selected as 11 on the platform, Then by default, the platform-specific version JDK11 will be used preferentially when compiling source code.

#### Build source code from compressed package

From 5.4 onwards, the platform supports downloading compressed packages from the download address to build (the supported compressed package formats are tar, tar.gz, zip). The entry for building through compressed packages is in the source code creation component, and the warehouse address is OSS.This feature requires that the built war package and Procfile (optional) be packaged into a supported archive format.This feature requires that a built war package and a Procfile (unnecessary) package format be used to support it.

Compressed package download address format requirements: `http://<web服务URL>/warDemo.tar.gz`

The download address must end with`<compressed package name>.<compressed format>`.

#### Web service support

Run the war package through web service (tomcat or jetty), that is, through`java -jar ./webapp-runner.jar ./*.war`or`java -jar ./jetty-runner.jar ./*.war`ways to operate.

Currently you can set the web service version through the build source or define`webserver`file in the source root directory

1. Console build source configuration supports versions `tomcat7, tomcat8, tomcat85, tomcat9, jetty7, jetty9`
2. Define the webserver version in the source root directory
   - `webapp-runner-7.0.91.0.jar`
   - `webapp-runner-8.0.52.0.jar`,`webapp-runner-8.5.38.0.jar`
   - `webapp-runner-9.0.16.0.jar`
   - `jetty-runner-7.5.4.v20111024.jar`,`jetty-runner-9.4.0.v20161208.jar`

The specific correspondence is as follows:

| web service support                   | web service version                                                                              | Customize the jar file name in the Procfile |
| :------------------------------------ | :----------------------------------------------------------------------------------------------- | :------------------------------------------ |
| tomcat7                               | webapp-runner-7.0.91.0.jar       | webapp-runner.jar           |
| tomcat8                               | webapp-runner-8.0.52.0.jar       | webapp-runner.jar           |
| tomcat85 (default) | webapp-runner-8.5.38.0.jar       | webapp-runner.jar           |
| tomcat9                               | webapp-runner-9.0.16.0.jar       | webapp-runner.jar           |
| jetty7                                | jetty-runner-7.5.4.v20111024.jar | jetty-runner.jar            |
| jetty9                                | jetty-runner-9.4.0.v20161208.jar | jetty-runner.jar            |

When choosing the tomcat7 version, you need to pay attention to make sure that you can run it locally through`java -jar ./webapp-runner-7.0.91.0.jar ./*.war`\
For detailed configuration of webapp-runner, please refer to [webapp-runner Instructions for use](./webapp-runner)

### Advanced Build Options

Enable advanced build features at build advanced settings or build source

| environment variable                                          | Defaults | illustrate                                          |
| :------------------------------------------------------------ | :------- | :-------------------------------------------------- |
| BUILD_WEBSERVER_URL |          | Customize WEBAPP-RUNNER download address            |
| BUILD_ONLINE                             |          | Download Rainbond built-in Webapp-Runner by default |

### other instructions

1. By default, the war file will be decompressed to the`/app/target/tomcat.<port>`directory. It is not supported to add a configuration file to the war decompression path, otherwise the application will not be able to start normally.

### Sample demo program

Example [https://github.com/goodrain/java-war-demo](https://github.com/goodrain/java-war-demo.git)

### Recommended reading

- [Java-Maven source build application](./java-maven/)
- [Java-Jar source code building application](./java-jar/)
- [Java-Gradle source build application](./java-gradle/)
- [Tomcat configures Redis to implement Session sharing](./tomcat-redis-session)
- [webapp-runner instructions](./webapp-runner/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
