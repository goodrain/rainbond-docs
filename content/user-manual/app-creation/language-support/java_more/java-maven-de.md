---
title: Rainbond构建Java Maven项目原理解读
description: Rainbond构建Java Maven项目原理解读
hidden: true
---

### Apache Maven相关知识说明

Apache Maven是跨平台的项目管理工具。主要服务于基于Java平台的项目构建，项目管理和项目信息管理。所谓的项目构建就是对项目进行清理、编译、测试、报告、打包、部署等一系列的过程称为项目的构建。

关于更多的Maven介绍参考官方文档：<https://maven.apache.org/>

标准的Maven管理的Java项目一般有几种制品打包方式：

* Jar包

  此类打包方式过去主要用于公共的类库项目，如今也作为SpringBoot等架构的服务类项目的打包方式。打成Jar包的项目一般不需要依赖中间件可以直接运行。

* War包

  过去传统Java服务的主要打包方式，运行于Tomcat等中间件中。

Maven的项目组织形式一般有两种：

* 单模块

  这类方式一般被小型项目采用，主工程直接定义项目的依赖和打包形式等配置。

* 多模块

  这类方式目前使用面较广，更加灵活的项目组织方式，一个父工程，它包含了两个子工程（模块），一个core模块，一个webapp模块，webapp模块依赖于core模块。这是一种很常见的工程划分方式，即core模块中包含了某个领域的核心业务逻辑，webapp模块通过调用core模块中服务类来创建前端网站。这样将核心业务逻辑和前端展现分离开来，如果之后决定开发支持移动端APP，那么core模块是可以重用。

  多模块的工程可以单独构建指定的服务模块，单独构建时也同时会构建其依赖的其他模块。

Maven依赖包管理是其核心功能，依赖包管理我们需要注意以下几点内容：

* 本地Maven仓库

  本地仓库存在于编译环境的本地磁盘，可以认为这是依赖包的第一级缓存。存储路径在**settings.xml**文件中配置**localRepository**

* 远程仓库

  远程仓库包括Maven中央仓库，企业自建私服或其他云厂商提供的仓库, 用户在 **pom.xml** 文件或**settings.xml**文件中配置，仓库认证信息只能在**settings.xml**中配置。

* 远程仓库代理或镜像

  在**settings.xml**配置文件中可以配置**mirrors** 来设置，比如使用私服来可以缓存所有外部仓库的镜像。

  ```
  <mirrors> 
       <mirror>  
           <id>nexus</id>  
           <name>internal nexus repository</name>  
           <url>http://192.168.0.1:8081/nexus/content/groups/public/</url>  
          <mirrorOf>*</mirrorOf>  
     </mirror>  
  </mirrors>
  ```

### Rainbond识别Maven项目

Rainbond rbd-chaos服务通过Git、SVN源代码管理协议从用户指定的代码仓库获取项目源代码，从项目主目录下读取**pom.xml**文件，如果读取到，则认为当前项目为Java-Maven类型，将采用Java-Maven类型对应的源码编译方式对源代码进行打包构建。

1. 多模块代码检测

在服务创建过程中会发起源码检测任务，源码检测程序会读取**pom.xml**文件，如果从文件中读取到多模块的配置，即认为当前代码仓库是多模块类型，将批量创建多个Rainbond服务。

检测程序递归读取所有模块的**pom.xml**的配置，塞选所有的打包方式为 **jar** 或者 **war ** 的模块，并自动生成默认的Maven构建命令（BUILD_MAVEN_CUSTOM_GOALS）和服务启动命令（BUILD_PROCFILE），这两个命令需要用户自行判断是否正确并修正，下文详细描述这两个参数的自定义方式：

构建命令类似如下形式：

```
clean install -pl module_name -am
```

Rainbond为每一个模块创建一个对应的服务，因此用户需要根据自身项目情况人工判断哪些是公共类库项目，在批量创建过程中取消公共类库类模块的创建。每一个服务对应有构建命令，如果不正确也需要用户自行修改。

2. 单模块代码检测

如果识别的项目是单模块项目，则直接进入服务构建流程。

### Rainbond构建Maven服务

当用户从UI触发或Webhook触发服务进行构建后，构建任务将由数据中心API服务生成发送到消息系统，由rbd-chaos服务从消息系统竞争构建任务，如果当前rbd-chaos节点正在执行的构建任务超过了最大值（默认最大值为节点CPU核数的2倍），将暂停任务的竞争。获取到任务后开始通过git 或svn 客户端获取项目代码并缓存下来，下一次构建任务在缓存代码的基础上进行代码更新。然后启动builder容器传入代码和构建参数（具体构建参数在下文中说明）执行构建任务。

构建任务的执行有如下步骤：

#### 1. JDK和Maven版本的选择

在项目源码主目录中可以定义**system.properties** 文件来指定JDK的版本和Maven的版本。格式如下：

```
java.runtime.version=1.9
maven.version=3.2.5
```

如果代码中存在**system.properties** 文件，代码检测阶段会读取此文件定义的JDK版本为BUILD_RUNTIMES变量赋默认值。

用户可以在Rainbond平台设置以下变量来选择JDK和Maven的版本：

* BUILD_RUNTIMES（OPEN-JDK版本）可选值1.6 1.7  1.9  10 11
* BUILD_ENABLE_ORACLEJDK  (是否使用ORACLEJDK)默认为否。
* BUILD_ORACLEJDK_URL  (ORACLEJDK下载路径）用户指定。
* BUILD_RUNTIMES_MAVEN (Maven版本)，默认为3.3.9 如果JDK版本为 1.6 默认值为3.2.5

> 注意，本文中所有描述的以BUILD_开头的变量都可以在服务环境变量中设置，其他大部分变量也已在构建源设置中体现。

1.1 JDK的下载

如果开启了ORACLEJDK的支持，通过指定的BUILD_ORACLEJDK_URL路径下载JDK,  如果未指定，Maven构建脚本默认根据上诉设置变量指定的版本来构建JDK的下载路径，比如：

http://lang.goodrain.me/jdk/openjdk1.8.0_20.tar.gz

lang.goodrain.me 域名是Rainbond数据中心内部域名，rbd-repo服务（artifactory）提供，意味着资源是从数据中心内部rbd-repo服务下载的。rbd-repo服务只是一层静态资源缓存，它第一次接收到请求后将从Rainbond提供的云OSS上下载相应的资源，然后缓存到本地。

> 注意，如果遇到JDK下载失败问题，需要确认rbd-repo是否能够正常联网，并且确认Rainbond是否提供了指定版本的JDK下载。

1.2 Maven的下载

Maven的下载与JDK是原理一致的，根据指定的版本构建下载路径从rbd-repo服务中下载。

#### 2. Maven环境设置

* Setting.xml文件的处理

  **setting.xml**文件中可以定义远程仓库和认证信息，镜像仓库信息等。用户可以通过设置如下变量来自定义配置：

  * BUILD_MAVEN_SETTINGS_PATH 直接定义setting.xml的本地路径，此路径用户只能使用源代码目录下，即路径是以`/app`开头， 比如如果在源码主目录下，路径应该为：`/app/setting.xml`
  * MAVEN_SETTINGS_URL 定义setting.xml的远程下载路径，由于setting.xml文件可能含有账号信息不适合存放到代码仓库中，可以存放于对象存储中提供下载路径。

  构建脚本将优先使用BUILD_MAVEN_SETTINGS_PATH变量，再使用MAVEN_SETTINGS_URL变量，如果都未定义，将使用默认的setting.xml文件。默认的setting.xml定义了使用maven.goodrain.me全局代理所有远程库。这样做的目的是能够缓存用户所有项目需要使用到的依赖包，作为构建流程中的二级缓存。 如下配置：

  ```
  <mirrors>
    <mirror>
       <id>goodrain-repo</id>
       <name>goodrain repo</name>
       <url>maven.goodrain.me</url>
       <mirrorOf>*</mirrorOf>
  </mirror>
  </mirrors>
  ```

  用户也可以通过如下参数设置上诉配置：

  * BUILD_MAVEN_MIRROR_DISABLE 设置为true则上诉配置不生效。不再使用rbd-repo服务缓存maven包。

  * MAVEN_MIRROR_OF 设置代理范围，默认为*, 全部代理。
  * MAVEN_MIRROR_URL 设置代理仓库服务地址，默认为rbd-repo服务提供的maven.goodrain.me，用户可以设置切换为企业内部支持mirror的私服地址。

* 缓存的处理

  Rainbond为每一个服务的构建环境提供一级缓存，Maven项目会对maven的安装目录，配置目录，和**本地仓库**目录提供了缓存，用户通过设置以下变量清理缓存。

  * NO_CACHE 设置后下一次构建过程将先去除缓存资源后重新下载，移除变量后下一次则不会清理。

  > 注意，存在于rbd-repo服务中的二级缓存用户可以访问rbd-repo服务的UI来清理。

#### 3. 执行Maven构建命令

编译程序首先需要构造编译命令，用户可以通过以下参数自定义设置Maven的编译命令：

* BUILD_MAVEN_CUSTOM_OPTS 默认值为 `-DskipTests` 忽略单元测试
* BUILD_MAVEN_CUSTOM_GOALS 默认值为 `clean dependency:list install`

因此如果你未设置任何参数时，Rainbond默认的构建命令为：

```
mvn -B -s setting.xml文件路径 -DskipTests clean dependency:list install
```

-B 参数的意思是以非交互的方式运行，-s指定setting.xml配置文件，路径由上文中描述的逻辑确定。

大多数用户本地测试时采用的命令是 `mvn clean install` 没有`dependency:list`参数。

如果是多模块的服务，BUILD_MAVEN_CUSTOM_GOALS 参数会在服务创建时自动更改类似下述的命令：

```
clean install -pl module_name -am
```

大多数标准项目都是可以正常构建的，如果用户多模块项目不符合，需要用户必须修改BUILD_MAVEN_CUSTOM_GOALS参数。

构建命令确定后编译程序将执行Maven构建，实时输出构建过程日志。

> 注意，请务必在使用Rainbond构建项目之前使用上诉的命令本地执行测试。

#### 4. 运行环境处理

mvn完成编译打包后有两种介质，分别为war包和jar包。

生成的介质如何运行，即启动命令配置，是在代码主目录`Procfile`文件中定义，如果代码中做了定义，服务创建时会识别配置内容来初始化BUILD_PROCFILE变量。 `Procfile` 文件的规范请参考[文档](https://www.rainbond.com/docs/user-manual/app-creation/language-support/etc/procfile/)

BUILD_PROCFILE 未定义的情况下Rainbond编译脚本会做如下判断来生成默认的启动命令配置：

* 判断是否为war包

根据pom.xml文件是否包含`<packaging>war</packaging>`来判断当前项目是否为war项目，如果是则使用下述运行命令运行：

```
web: java $JAVA_OPTS -jar ./webapp-runner.jar  --port $PORT target/*.war
```

* 是否为springboot项目

根据pom.xml文件是否包含`<groupId>org.springframework.boot` 和`<artifactId>spring-boot` 且打包方式为jar包时识别为springboot项目，如果是默认运行命令是：

```
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

* 是否为wildfly_swarm项目

根据pom.xml文件中是否包含`<groupId>org.wildfly.swarm`来识别是否为wildfly_swarm项目，如果是，默认运行命令为：

```
web: java -Dswarm.http.port=$PORT $JAVA_OPTS -jar target/*.jar
```

手动配置 BUILD_PROCFILE 直接设置启动命令是最准确和直接的方式。

几个场景下需要自行设置启动命令

* 生成的包不在target/目录下，比如多模块构建时构建的包可能处于子模块的target目录下，同样的服务创建时Rainbond已经根据识别结果进行设置。
* 项目设置不符合Rainbond自动识别策略。
* 启动命令需要自定义。

从上诉自动生成的启动命令可以看出，Rainbond运行War时采用的是[webapp-runner](<https://github.com/jsimone/webapp-runner>)项目，如果需要设置Tomcat版本或其他参数时，需要根据webapp-runner的相关参数来对应设置启动命令。比如设置会话路径时：

```
web: java $JAVA_OPTS -jar ./webapp-runner.jar --path /test  --port $PORT target/*.war
```

其他设置参数参考文档：[tomcat参数设置](<https://github.com/jsimone/webapp-runner#options>)

#### 5. 运行环境打包

上诉流程完成后编译脚本将代码目录进行打包，打包命令如下：

```
tar -z --exclude='.git' -X "$build_root/.slugignore" -C $build_root -cf $slug_file .
```

默认的情况下会将整个源码、编译过程下载的JDK等执行程序、编译生成的介质文件一起打包。目的是不遗漏任何文件，特别是静态文件、配置文件等。如果用户不想将运行态无用的源代码打包，需要定义**.slugignore** 文件。

**.slugignore** 文件与常见的.gitignore文件语法类似。从上诉打包命令可以看出此文件是在tar命令打包时生效。

#### 6. 生成Docker镜像

所有语言类型编译完成后都会生成tar包，我们提供了runner基础镜像来运行这些tar包。源码在<https://github.com/goodrain/runner>， 其工作流程如下：

1. 解压tar包到/app目录下。
2. 解析Procfile文件获取软件启动命令。
3. 设置程序运行的环境变量，比如JAVA_OPTS。
4. 执行Procfile文件中的软件启动命令。

### 常见问题说明

1. 需要的JDK或Maven版本Rainbond不支持。

   > 根据上文描述的一样，如果你需要使用的JDK版本不在Rainbond目前的支持列表（主要是Rainbond 公有OSS仓库有没有下载包），你可以社区反馈我们添加需要的版本或你自行准备JDK版本存放于rbd-repo仓库中做本地缓存。

2. 离线环境下能否进行Maven源码构建。

   > 由于构建过程需要从公网下载JDK、Maven、依赖包等资源，默认情况下无法离线使用源码构建，你可以根据上诉说明操作rbd-repo准备对应的资源，企业版本中提供了具备完整离线资源的rbd-repo服务。

3. 依赖包下载失败怎么排查。

   > 依赖包下载失败最大的可能是受限于你的网络，或你使用了私服仓库且不能被rbd-repo服务镜像代理。最简化的处理方式是你配置相关参数直接使用你过去使用的仓库服务。

4. 本地可以构建，Rainbond不能构建。

   > 上文中已经完整说明了Rainbond Mvn构建的流程和方式，你需要逐一差异化排查与你本地构建的不同点。解决的难易程度可能取决于你对Maven构建机制的认识。

5. 其他问题如何反馈。

   > 遇到源码构建问题无法自己解决，可移步[github](https://github.com/goodrain/builder) 提交你的issues。我们非常乐于解决各类场景性问题，提供Rainbond 源码CI的兼容性。