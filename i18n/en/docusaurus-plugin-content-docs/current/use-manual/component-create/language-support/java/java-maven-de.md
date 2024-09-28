---
title: Interpretation of Rainbond's Principles of Building Java Maven Projects
description: Interpretation of Rainbond's Principles of Building Java Maven Projects
---

### Apache Maven related knowledge description

Apache Maven is a cross-platform project management tool.It mainly serves the project construction, project management and project information management based on the Java platform.The so-called project construction is a series of processes such as cleaning, compiling, testing, reporting, packaging, and deploying the project, which is called project construction.主要服务于基于 Java 平台的项目构建，项目管理和项目信息管理。所谓的项目构建就是对项目进行清理、编译、测试、报告、打包、部署等一系列的过程称为项目的构建。

For more introduction to Maven, refer to the official documentation：<https://maven.apache.org/>

Standard Maven-managed Java projects generally have several product packaging：

- Jar package

  This type of packaging was mainly used for public class library projects in the past, and now it is also used as a packaging method for service projects of SpringBoot and other architectures.Projects that are packaged as Jars generally do not need to rely on middleware and can run directly.打成 Jar 包的项目一般不需要依赖中间件可以直接运行。

- War bag

  In the past, the main packaging method of traditional Java services was to run in middleware such as Tomcat.

There are generally two forms of project organization in Maven：

- single module

  This method is generally adopted by small projects, and the main project directly defines the configuration of the project's dependencies and packaging forms.

- multi-module

  这类方式目前使用面较广，更加灵活的项目组织方式，一个父工程，它包含了两个子工程（模块），一个 core 模块，一个 webapp 模块，webapp 模块依赖于 core 模块。This type of method is currently widely used and is a more flexible project organization method. A parent project contains two sub-projects (modules), a core module and a webapp module. The webapp module depends on the core module.This is a very common way of project division, that is, the core module contains the core business logic of a certain field, and the webapp module creates the front-end website by calling the service class in the core module.This separates the core business logic from the front-end presentation. If you decide to develop and support mobile apps later, the core module can be reused.这样将核心业务逻辑和前端展现分离开来，如果之后决定开发支持移动端 APP，那么 core 模块是可以重用。

  A multi-module project can build the specified service module separately, and when it is built separately, it will also build other modules it depends on.

Maven dependency package management is its core function. We need to pay attention to the following points for dependency package management：

- local maven repository

  The local repository exists on the local disk of the compilation environment, which can be considered as the first-level cache of dependent packages.Storage path is configured in**settings.xml**file**localRepository**存储路径在**settings.xml**文件中配置**localRepository**

- remote warehouse

  Remote warehouses include Maven central warehouse, enterprise self-built private servers or warehouses provided by other cloud vendors. Users configure in **pom.xml** file or**settings.xml**file, and the warehouse authentication information can only be configured in**settings.xml**.

- Remote repository proxy or mirror

  In the**settings.xml**configuration file, you can configure**mirrors** to set, such as using a private server to cache the mirrors of all external warehouses.

  ```xml
  <mirrors>
       <mirror>
           <id>nexus</id>
           <name>internal nexus repository</name>
           <url>http://192.168.0.1:8081/nexus/content/groups/public/</url>
          <mirrorOf>*</mirrorOf>
     </mirror>
  </mirrors>
  ```

### Rainbond recognizes Maven projects

The Rainbond rbd-chaos service obtains the project source code from the code repository specified by the user through the Git and SVN source code management protocols, and reads the**pom.xml**file from the project main directory. If it is read, the current project is considered to be Java- Maven type, the source code will be packaged and constructed using the source code compilation method corresponding to the Java-Maven type.

Multi-module code detection

During the service creation process, the source code detection task will be initiated, and the source code detection program will read the**pom.xml**file. If the multi-module configuration is read from the file, the current code repository is considered to be a multi-module type, and multiple modules will be created in batches. A Rainbond component.

The detection program recursively reads the configuration of**pom.xml**of all modules, selects all modules whose packaging methods are **jar** or **war** , and automatically generates the default Maven build command (BUILD_MAVEN_CUSTOM_GOALS) and service startup command (BUILD_PROCFILE) ), these two commands need the user to judge whether they are correct or not and correct them. The following describes in detail how to customize these two：

The build command looks like the following form：

```bash
clean install -pl module_name -am
```

Rainbond creates a corresponding service for each module, so users need to manually judge which public class library projects are based on their own project conditions, and cancel the creation of public class library class modules during the batch creation process.Each service has a corresponding build command, and if it is not correct, it needs to be modified by the user.每一个服务对应有构建命令，如果不正确也需要用户自行修改。

Single module code detection

If the identified project is a single-module project, it goes directly to the service build process.

### Rainbond builds Maven components

When the user triggers the service from the UI or Webhook to build, the build task will be generated by the data center API service and sent to the message system, and the rbd-chaos service will compete for the build task from the message system. If the current rbd-chaos node is executing more than If the maximum value is set (the default maximum value is 2 times the number of CPU cores of the node), the competition of tasks will be suspended.After getting the task, start to get the project code through the git or svn client and cache it. The next build task will update the code based on the cached code.Then start the builder container and pass in the code and build parameters (the specific build parameters are described below) to execute the build task.获取到任务后开始通过 git 或 svn 客户端获取项目代码并缓存下来，下一次构建任务在缓存代码的基础上进行代码更新。然后启动 builder 容器传入代码和构建参数（具体构建参数在下文中说明）执行构建任务。

The execution of the build task has the following steps：

#### 1. Selection of JDK and Maven versions

In the main directory of the project source code, you can define**system.properties** file to specify the version of JDK and the version of Maven.The format is as follows：格式如下：

```properties
java.runtime.version=1.9
maven.version=3.2.5
```

If there is**system.properties** file in the code, the code detection phase will read the JDK version defined in this file and assign a default value to the BUILD_RUNTIMES variable.

User can set the following variables in Rainbond platform to select version：of JDK and Maven

- BUILD_RUNTIMES (OPEN-JDK version) optional values 1.6 1.7 1.9 10 11
- BUILD_ENABLE_ORACLEJDK (whether to use ORACLEJDK) defaults to no.
- BUILD_ORACLEJDK_URL (ORACLEJDK download path) user specified.
- BUILD_RUNTIMES_MAVEN (Maven version), default is 3.3.9 if JDK version is 1.6 default is 3.2.5

> Note that all of the variables described in this article starting with BUILD\_ can be set in the service environment variables, most of the other variables are also reflected in the build source settings.

1.1 JDK download

If ORACLEJDK support is enabled, download the JDK through the specified BUILD_ORACLEJDK_URL path. If not specified, the Maven build script will build the JDK download path according to the version specified by the above setting variable by default, such as：

```bash
http://lang.goodrain.me/jdk/openjdk1.8.0_20.tar.gz
```

The domain name lang.goodrain.me is the internal domain name of the Rainbond data center, provided by the rbd-repo service (artifactory), which means that the resources are downloaded from the rbd-repo service inside the data center.The rbd-repo service is just a layer of static resource cache. After it receives the request for the first time, it will download the corresponding resources from the cloud OSS provided by Rainbond, and then cache them locally.rbd-repo 服务只是一层静态资源缓存，它第一次接收到请求后将从 Rainbond 提供的云 OSS 上下载相应的资源，然后缓存到本地。

> Note that if you encounter the problem of JDK download failure, you need to confirm whether rbd-repo can be connected to the Internet normally, and whether Rainbond provides the specified version of JDK download.

1.2 Download of Maven

The download of Maven is the same as that of JDK, and it is downloaded from the rbd-repo service according to the specified version build download path.

#### 2. Maven environment settings

2.1 Processing of settings.xml file

**settings.xml**file can define remote warehouse and authentication information, mirror warehouse information, etc.Users can customize configuration：by setting the following variables用户可以通过设置如下变量来自定义配置：

- BUILD_MAVEN_SETTINGS_PATH directly defines the local path of settings.xml, this path users can only use the source code directory, that is, the path starts with`/app`, for example, if it is in the source code main directory, the path should be：`/app/settings.xml`
- BUILD_MAVEN_SETTINGS_URL defines the remote download path of settings.xml. Since the settings.xml file may contain account information, it is not suitable to be stored in the code repository. It can be stored in the object storage to provide the download path.

  The build script will use the BUILD_MAVEN_SETTINGS_PATH variable first, then the BUILD_MAVEN_SETTINGS_URL variable, and if neither is defined, the default settings.xml file will be used.The default settings.xml defines a global proxy for all remote repositories using maven.goodrain.me.The purpose of this is to be able to cache the dependency packages that all of the user's projects need to use as a second-level cache in the build process. Configure：as follows默认的 settings.xml 定义了使用 maven.goodrain.me 全局代理所有远程库。这样做的目的是能够缓存用户所有项目需要使用到的依赖包，作为构建流程中的二级缓存。 如下配置：

```xml
  <mirrors>
    <mirror>
       <id>goodrain-repo</id>
       <name>goodrain repo</name>
       <url>maven.goodrain.me</url>
       <mirrorOf>*</mirrorOf>
  </mirror>
  </mirrors>
```

The user can also set the above configuration：through the following parameters

- BUILD_MAVEN_MIRROR_DISABLE 设置为 true 则上述配置不生效。If BUILD_MAVEN_MIRROR_DISABLE is set to true, the above configuration will not take effect.The rbd-repo service is no longer used to cache maven packages.

- MAVEN_MIRROR_OF Set the proxy range, the default is \*, all proxies.

- MAVEN_MIRROR_URL Set the proxy warehouse service address, the default is maven.goodrain.me provided by the rbd-repo service, users can set and switch to the private server address that supports mirror within the enterprise.

  2.2 Cache processing

  Rainbond provides a first-level cache for the build environment of each service. The Maven project provides a cache for the maven installation directory, configuration directory, and**local warehouse**directory. Users can clear the cache by setting the following variables.

- After NO_CACHE is set, the next build process will first remove the cached resources and then download them again. After the variables are removed, it will not be cleaned up the next time.

  > Note that users of the second level cache that exists in the rbd-repo service can access the UI of the rbd-repo service to clean up.

#### 3. Execute the Maven build command

The compiler first needs to construct the compilation command. The user can customize the Maven compilation command through the following parameters:：

- BUILD_MAVEN_CUSTOM_OPTS default is `-DskipTests` ignore unit tests
- BUILD_MAVEN_CUSTOM_GOALS default value is `clean dependency:list install`

So if you don't set any parameters, Rainbond's default build command is：

```bash
mvn -B -s setting.xml file path -DskipTests clean dependency:list install
```

The -B parameter means run non-interactively, -s specifies the setting.xml configuration file, and the path is determined by the logic described above.

The command most users use when testing locally is `mvn clean install` without`dependency:list`parameters.

If it is a multi-module service, the BUILD_MAVEN_CUSTOM_GOALS parameter will be automatically changed when the service is created, similar to the following command：

```bash
clean install -pl module_name -am
```

Most standard projects can be built normally. If the user multi-module project does not meet the requirements, the user must modify the BUILD_MAVEN_CUSTOM_GOALS parameter.

After the build command is determined, the compiler will execute the Maven build and output the build process log in real time.

> Note, be sure to execute the tests locally using the above command before building the project with Rainbond.

#### 4. Operating environment processing

After mvn is compiled and packaged, there are two kinds of media, namely war package and jar package.

How the generated media runs, that is, the startup command configuration, is defined in the code main directory`Procfile`file. If defined in the code, the service will recognize the configuration content to initialize the BUILD_PROCFILE variable when it is created. `For the specification of Procfile` , please refer to [Document](../procfile) `Procfile` 文件的规范请参考 [文档](../procfile)

When BUILD_PROCFILE is not defined, the Rainbond compilation script will make the following judgments to generate the default startup command configuration：

- Determine whether it is a war package

According to whether the pom.xml file contains`<packaging>war</packaging>`to determine whether the current project is a war project, if so, use the following run command to run：

```yaml
web: java $JAVA_OPTS -jar ./webapp-runner.jar --port $PORT target/*.war
```

- Whether it is a springboot project

According to whether the pom.xml file contains`<groupId>org.springframework.boot` and`<artifactId>spring-boot` and the packaging method is jar package, it is recognized as a springboot project, if it is the default running command is：

```yaml
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

- Is it a wildfly_swarm project

According to whether the pom.xml file contains`<groupId>org.wildfly.swarm`to identify whether it is a wildfly_swarm project, if so, the default running command is：

```yaml
web: java -Dswarm.http.port=$PORT $JAVA_OPTS -jar target/*.jar
```

Manually configuring BUILD_PROCFILE Setting the startup command directly is the most accurate and straightforward way.

In several scenarios, you need to set the startup command by yourself

- The generated package is not in the target/ directory. For example, the package built during multi-module construction may be in the target directory of the submodule. When the same service is created, Rainbond has already set it according to the recognition result.
- Project settings do not comply with Rainbond auto-recognition policy.
- The startup command needs to be customized.

It can be seen from the above automatically generated startup command that Rainbond uses the[webapp-runner](https://github.com/jsimone/webapp-runner)project to run War. If you need to set the Tomcat version or other parameters, you need to set the startup command according to the relevant parameters of webapp-runner.For example, when setting the session path to：比如设置会话路径时：

```yaml
web: java $JAVA_OPTS -jar ./webapp-runner.jar --path /test --port $PORT target/*.war
```

Other setting parameters refer to document：[tomcat parameter setting](https://github.com/jsimone/webapp-runner#options)

#### 5. Package the runtime environment

After the above process is completed, compile the script to package the code directory. The packaging command is as follows:：

```yaml
tar -z --exclude='.git' -X "$build_root/.slugignore" -C $build_root -cf $slug_file.
```

By default, the entire source code, executable programs such as JDK downloaded during the compilation process, and the media files generated by compilation are packaged together.The goal is to not miss any files, especially static files, configuration files, etc.If the user does not want to package the source code that is useless in the running state, it is necessary to define\*\*.slugignore\*\* file.目的是不遗漏任何文件，特别是静态文件、配置文件等。如果用户不想将运行态无用的源代码打包，需要定义\*\*.slugignore\*\* 文件。

**.slugignore** files have a similar syntax to common .gitignore files.It can be seen from the above packaging command that this file takes effect when the tar command is packaged.Extract the tarball to the /app directory.

#### 6. Generate the Docker image

After all language types are compiled, tar packages will be generated, and we provide the runner base image to run these tar packages.The source code is at<https://github.com/goodrain/runner>, and its workflow is as follows：源码在<https://github.com/goodrain/runner>， 其工作流程如下：

1. 解压 tar 包到/app 目录下。
2. Parse the Procfile file to obtain the software startup command.
3. Set the environment variables for the program to run, such as JAVA_OPTS.
4. Execute the software startup command in the Procfile file.

### FAQ

1. Required JDK or Maven version Rainbond does not support.

   > As described above, if the JDK version you need to use is not in Rainbond's current support list (mainly whether the Rainbond public OSS repository has download packages), you can give us feedback from the community to add the required version or you can prepare your own JDK version and store it in Do local caching in the rbd-repo repository.

2. Whether Maven source code builds can be performed in an offline environment.

   > Since the building process needs to download JDK, Maven, dependency packages and other resources from the public network, the source code cannot be used offline by default. You can operate rbd-repo to prepare the corresponding resources according to the above instructions. The enterprise version provides complete offline resources. rbd-repo service.

3. How to troubleshoot a dependency package download failure.

   > The most likely reason for the failure to download the dependency package is that it is limited by your network, or you are using a private server repository and cannot be mirrored by the rbd-repo service.The easiest way to deal with it is that you configure the relevant parameters directly to use the warehouse service you used in the past.最简化的处理方式是你配置相关参数直接使用你过去使用的仓库服务。

4. Local builds are possible, Rainbond cannot.

   > The above has completely explained the process and method of Rainbond Mvn construction. You need to differentiate and check the differences with your local construction one by one.The ease of solving may depend on your knowledge of Maven's build mechanism.解决的难易程度可能取决于你对 Maven 构建机制的认识。

5. How to respond to other questions.

   > 遇到源码构建问题无法自己解决，可移步 [github](https://github.com/goodrain/builder) 提交你的 issues。If you encounter source code construction problems and cannot solve them yourself, you can move to [github](https://github.com/goodrain/builder) to submit your issues.We are very happy to solve various scenario problems and provide the compatibility of Rainbond source CI.
