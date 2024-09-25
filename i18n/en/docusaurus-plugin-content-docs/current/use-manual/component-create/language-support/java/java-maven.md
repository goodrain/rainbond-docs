---
title: Java Maven source code deployment component
description: This article introduces the main points of the Java Maven source code deployment component, which is suitable for developer reference.
---

### Principle document reading

[Interpretation of Rainbond's Principles of Building Java Maven Projects](./java-maven-de)

### Maven project identification strategy

When the pom.xml file exists in the source code root directory and there is no Dockerfile file, Rainbond will recognize the source code as a Java Maven project.

Maven multi-module project construction, please refer to [Java Maven multi-module source code construction](./java-multi-module-build)directly.

### Validation preparation

Before deploying the project to Rainbond, please follow the steps below for local verification. After the local build is successful, you can start trying to deploy the project on Rainbond.

- The source code is hosted on a Git or SVN server.

- Check the local build environment and runtime environment to determine the Maven version, JDK version, and whether OracleJDK is used.

```bash
mvn -v
java -version
```

- Clear the local build cache. In general, the local localRepository is located at `${HOME}/.m2/repository`. Please change the path of this folder temporarily after confirmation.

```bash
mv ${HOME}/.m2/repository ${HOME}/.m2/repository.bak
```

- Execute the following build command, which is also the default command：for Rainbond Java Maven project builds

```bash
mvn -DskipTests clean dependency:list install
```

### pom.xml specification

- The SpringBoot project packaging method is recommended to use the jar package method.
- It is recommended to use the war package for the packaging method of non-SpringBoot projects.

### Compile and run environment configuration

In the environment preparation stage, the Rainbond build and run environment needs to be as unified as possible with the commonly used local build and run environment.Such as JDK version, Maven version, etc.比如 JDK 版本、Maven 版本等。

#### Graphical settings

Rainbond supports the graphical definition of the compilation and runtime environment, and the configuration is located on the build source page of the service component.\*\*Modifications to these configurations need to take effect through [build](/docs/use-manual/component-manage/overview/basic-operation)!\*\***对这些配置的修改，需要通过 [构建](/docs/use-manual/component-manage/overview/basic-operation) 来生效！**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/component-create/language-support/java/java-maven-1.png" title="编译运行环境定义" />

- Disable caching, this switch should always be on until the first successful build is done, off by default.

- Select the JDK (OpenJDK provided by default) and MAVEN version used to compile and run,**must use the version verified when preparing for verification**.

- Select the custom JDK download address, you need to provide the path to which the Rainbond server can be downloaded to download the JDK (which can be OracleJDK) installation package in tar.gz format.

- When the build product is `war` file, version selection of Tomcat and Jetty is also provided.

- Disable Maven Mirror. This switch determines whether to proxy through rbd-repo (the default proxy is to Alibaba Cloud maven warehouse). Once the switch is turned, the MAVEN MIRROR OF configuration and MAVEN MIRROR URL configuration defined below\*\*will all be invalid. The repository address will only depend on the definitions in the `pom.xml` files (if there is no `repositories` definition in the file, the dependencies will be pulled from the Maven central repository).

- MAVEN MIRROR OF 配置，与 MAVEN MIRROR URL 配置一起使用，可以定义构建过程中从镜像私服中拉取依赖的行为。The MAVEN MIRROR OF configuration, used in conjunction with the MAVEN MIRROR URL configuration, can define the behavior of pulling dependencies from the mirror private server during the build process.The default configuration is `central`If it is set to `*`, all dependent packages will be pulled from the mirror warehouse address defined in the MAVEN MIRROR URL configuration.

- The MAVEN MIRROR URL configuration defines the warehouse private server address used in the build process.**Rainbond does not support local installation and deployment of jar packages. Please upload all required third-party jar packages to the warehouse private server**.The default `maven.goodrain.me` is the intranet resolution domain name of the `rbd-repo` component, which represents the Alibaba Cloud maven warehouse.默认的 `maven.goodrain.me` 为 `rbd-repo` 组件的内网解析域名，它代理了阿里云 maven 仓库。

- MAVEN build parameters and build commands are two options, which constitute the command executed by compilation. The default build command is `mvn -DskipTests clean dependency:list install`.

- The MAVEN build java parameter configuration is mainly used to specify the stack memory allocated during the build process.**This configuration only affects the maven build process. The stack memory specified when the built component is run is specified by ${JAVA_OPTS} variable**.

- The startup command specifies how Rainbond starts the current service component after the build process is completed. For details, see chapter [Startup Command Configuration](./java-maven#启动命令配置) below.

#### Set via code (recommended)

Rainbond 支持将上述的所有配置通过代码进行定义。Rainbond supports defining all of the above configurations in code.The advantage of this is：by adding several configuration files to the source code repository, the definition of the compilation and running environment is completed, and automatic CI is completed without any manual configuration.

**system.properties**

Add `system.properties` file in the root directory of the source code, you can define the Maven version, JDK version,**Be sure to use the version verified when preparing for verification**：

```bash
java.runtime.version=1.8
maven.version=3.3.1
```

The selection range of the two versions is as follows:：

| Options |                                                                                              Version                                                                                              |
| :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| OpenJDK |                                                     1.6, 1.7, 1.8, 1.9, 10, 11                                                    |
|  Maven  | 3.0.5, 3.1.1, 3.2.5, 3.3.1, 3.3.9 |

**settings.xml (recommended)**

Add the [settings.xml](http://maven.apache.org/settings.html) file available to the user's local build in the source code root directory to completely simulate the user's local build settings, including **warehouse private server settings**.This file is usually located in the `${M2_HOME}/conf` or `${HOME}/.m2` directory of the user environment, and the configuration used by the user's local build can be defined in it.该文件通常位于用户环境的 `${M2_HOME}/conf` 或者 `${HOME}/.m2` 目录下，用户本地构建使用的配置，均可在其中进行定义。

In the upcoming `Rainbond v5.2.2` version, the settings of `settings.xml` will be added to the graphical settings.

**mvnw**

If your code root directory defines `mvnw`, this script will be used to start the Maven process.If a Maven version is specified,`mvnw`is ignored.Build with default commands.如果指定了 Maven 版本，则会忽略`mvnw`。使用默认命令构建。

**rainbondfile**

Adding [rainbondfile](../rainbondfile) to the root directory of the source code can define environment variables for the service component, and more configurations during the build process can be defined by means of environment variables.

During the Rainbond source code building process, the variables defined for service components starting with `BUILD_` can be passed into the build environment for use.Some commonly used environment variables are as follows:部分常用的环境变量如下:

|                                    environment variable                                   |             Defaults            |                                                 illustrate                                                 |
| :---------------------------------------------------------------------------------------: | :-----------------------------: | :--------------------------------------------------------------------------------------------------------: |
| BUILD_MAVEN_MIRROR_DISABLE |              `NULL`             |                                     MAVEN MIRROR is disabled when true                                     |
|    BUILD_MAVEN_MIRROR_OF   |            `central`            |                 Use the specified repository private server to pull all dependencies for \*                |
|   BUILD_MAVEN_MIRROR_URL   |       `maven.goodrain.me`       |                         Used to specify the private server address of the warehouse                        |
|   BUILD_MAVEN_CUSTOM_OPTS  |          `-DskipTests`          |                                           Maven build parameters                                           |
|  BUILD_MAVEN_CUSTOM_GOALS  | `clean dependency:list install` |                                           Maven build parameters                                           |
|  BUILD_MAVEN_SETTINGS_URL  |              `NULL`             | Download settings.xml from the configuration address and use it to build the configuration |
|    BUILD_MAVEN_JAVA_OPTS   |           `-Xmx1024m`           |                                  MAVEN build java parameter configuration                                  |
|              BUILD_ENABLE_ORACLEJDK             |              `NULL`             |              When true, you can customize the download address of the JDK installation package             |
|               BUILD_ORACLEJDK_URL               |              `NULL`             |                         Define the download address of the JDK installation package                        |
|              BUILD_RUNTIMES_SERVER              |            `tomcat85`           |                           Define the WEB SERVER used by the `war` package project                          |

### Start command configuration

After the Java Maven source code construction process is completed, Rainbond will automatically run the service component, which requires us to specify the start command of the service component in advance.

#### Procfile specification

Rainbond defines the project startup command through the `Procfile` file in the source code root directory, and the`Procfile` file definition specification is detailed in [Procfile](../procfile).

The startup command can be entered graphically on the service component building source page. The format of the command entered here is the same as `Procfile` , and the priority is higher than `Procfile` in the source code root directory.After the input is complete, it will take effect the next time the current service component is built.输入完成后，下一次构建当前服务组件时生效。

If the project does not define a Procfile, the platform will generate a default Procfile based on the identified project type by default.

- The packaging method is war package, and the platform uses [webapp-runner.jar](https://github.com/jsimone/webapp-runner) to run the packaged war package.ExampleFAQ

```bash
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war
```

- The packaging method is jar package, example

```bash
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

The above is the default `Procfile` , if you need to expand more startup parameters, you can customize `Procfile`.

- `web: there is a space between`and`java`
- End of file cannot contain special characters
- If it is a multi-module project, pay attention to the path of the jar package or war package after compilation. The path is`<submodule name>/targets/*.jar`or`<submodule name>/targets/*.war`
- $JAVA_OPTS: The platform will automatically set the values of Xmx and Xms according to the memory size of the application
- $PORT: Listen according to the port set by the user on the platform, the default listening port is 5000

When the web server support is adjusted, packaged into War needs to adjust the startup command：

- When choosing a different version of tomcat `web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT ./*.war`
- When choosing a different version of jetty `web: java $JAVA_OPTS -jar ./jetty-runner.jar --port $PORT ./*.war`
- Need to configure context path, you can specify [webapp-runner parameter path](https://github.com/jsimone/webapp-runner#options)by custom Procfile
  - Example `web: java $JAVA_OPTS -jar ./webapp-runner.jar --path <path路径,示例: /r6d> --port $PORT ./*.war`

#### Web service support

If the Maven project is packaged as a war package, Web service support needs to be configured.

Run the war package through web service (tomcat or jetty), that is, through `java -jar ./webapp-runner.jar ./*.war` or `java -jar ./jetty-runner.jar ./*.war` ways to operate.

Currently you can set the web service version through the build source or define `webserver` file in the source root directory

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

Selecting the tomcat7 version requires attention to ensure that the local can be run through `java -jar ./webapp-runner-7.0.91.0.jar ./*.war`. For detailed configuration of webapp-runner, please refer to [webapp-runner Instructions for Use](./webapp-runner)
关于 webapp-runner 详细配置请参考 [webapp-runner 使用说明](./webapp-runner)

### other instructions

If it is compiled into a war package, the war file will be decompressed to the `/app/target/` directory by default at runtime. It is not supported to add a configuration file to the war decompression path, otherwise the application will not be able to start normally.

### Sample demo program

Example Spring Boot project: [https://github.com/goodrain/java-maven-demo](https://github.com/goodrain/java-maven-demo.git)

### 常见问题解决

- The project is more complex and cannot be compiled using the above method

  > At this time, it is recommended that you define your own Dockerfile file for compilation and running environment control.

- How to deal with compilation failure

  > 查看构建日志，从日志中获取编译失败的原因。Check the build log to get the reason for the compilation failure from the log.If your project needs to download the dependency package from the public network, there is a high possibility that the dependency package download fails. If the network is unlimited, try again.

- The project dependency package has changed, but it is found that it does not take effect after compilation

  > If your dependency package has been correctly updated to the private server, it is considered that the local cache dependency package has not been updated.You can manually disable the cache and rebuild.可以手动禁用缓存后重新构建。

- The project compiles successfully, but runs abnormally after startup

  > Reason 3：The memory allocation is too small, and the component cannot be started normally.The log phenomenon for this factor is that components are starting up and then suddenly exiting.At this time, consider more OOM caused by insufficient memory settings.Reason 1：The running command mentioned above is set incorrectly, causing the container to fail to start.The solution is to set the startup command correctly.
  >
  > Reason 2：Exit after the code runs in error. Refer to the component operation log to determine the cause from the log content.
  >
  > 原因三：内存分配过少，组件无法正常启动。这种因素的日志现象是组件正在启动，然后突然就退出了。这时多考虑为内存设置不足导致 OOM。

- After entering the container environment through the WEB terminal, directly execute `java -version` version 1.7.

  > The java command used to run the service component is located at `/app/.jdk/bin/java` this path is not in $PATH.

### Recommended reading

- [Java-Jar source code building application](./java-jar/)
- [Java-War source code building application](./java-war/)
- [Java-Gradle source build application](./java-gradle)
- [Tomcat configures Redis to implement Session sharing](./tomcat-redis-session/)
- [webapp-runner instructions](./webapp-runner/)

<!-- - [RAINBOND 源码构建 JAVA 项目选取 JDK](../advanced-scenarios/devops/how-to-select-jdk/)
- [Rainbond 源码构建 JAVA 项目配置 Maven 仓库](../advanced-scenarios/devops/how-to-config-maven/) -->
