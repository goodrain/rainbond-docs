---
title: Rainbond构建Java Maven项目原理解读
description: Rainbond构建Java Maven项目原理解读
---

### Apache Maven 相关知识说明

Apache Maven 是跨平台的项目管理工具。主要服务于基于 Java 平台的项目构建，项目管理和项目信息管理。所谓的项目构建就是对项目进行清理、编译、测试、报告、打包、部署等一系列的过程称为项目的构建。

关于更多的 Maven 介绍参考官方文档：https://maven.apache.org/

标准的 Maven 管理的 Java 项目一般有几种制品打包方式：

- Jar 包

  此类打包方式过去主要用于公共的类库项目，如今也作为 SpringBoot 等架构的服务类项目的打包方式。打成 Jar 包的项目一般不需要依赖中间件可以直接运行。

- War 包

  过去传统 Java 服务的主要打包方式，运行于 Tomcat 等中间件中。

Maven 的项目组织形式一般有两种：

- 单模块

  这类方式一般被小型项目采用，主工程直接定义项目的依赖和打包形式等配置。

- 多模块

  这类方式目前使用面较广，更加灵活的项目组织方式，一个父工程，它包含了两个子工程（模块），一个 core 模块，一个 webapp 模块，webapp 模块依赖于 core 模块。这是一种很常见的工程划分方式，即 core 模块中包含了某个领域的核心业务逻辑，webapp 模块通过调用 core 模块中服务类来创建前端网站。这样将核心业务逻辑和前端展现分离开来，如果之后决定开发支持移动端 APP，那么 core 模块是可以重用。

  多模块的工程可以单独构建指定的服务模块，单独构建时也同时会构建其依赖的其他模块。

Maven 依赖包管理是其核心功能，依赖包管理我们需要注意以下几点内容：

- 本地 Maven 仓库

  本地仓库存在于编译环境的本地磁盘，可以认为这是依赖包的第一级缓存。存储路径在**settings.xml**文件中配置**localRepository**

- 远程仓库

  远程仓库包括 Maven 中央仓库，企业自建私服或其他云厂商提供的仓库, 用户在 **pom.xml** 文件或**settings.xml**文件中配置，仓库认证信息只能在**settings.xml**中配置。

- 远程仓库代理或镜像

  在**settings.xml**配置文件中可以配置**mirrors** 来设置，比如使用私服来可以缓存所有外部仓库的镜像。

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

### Rainbond 识别 Maven 项目

Rainbond rbd-chaos 服务通过 Git、SVN 源代码管理协议从用户指定的代码仓库获取项目源代码，从项目主目录下读取**pom.xml**文件，如果读取到，则认为当前项目为 Java-Maven 类型，将采用 Java-Maven 类型对应的源码编译方式对源代码进行打包构建。

1.多模块代码检测

在服务创建过程中会发起源码检测任务，源码检测程序会读取**pom.xml**文件，如果从文件中读取到多模块的配置，即认为当前代码仓库是多模块类型，将批量创建多个 Rainbond 组件。

检测程序递归读取所有模块的**pom.xml**的配置，塞选所有的打包方式为 **jar** 或者 **war** 的模块，并自动生成默认的 Maven 构建命令（BUILD_MAVEN_CUSTOM_GOALS）和服务启动命令（BUILD_PROCFILE），这两个命令需要用户自行判断是否正确并修正，下文详细描述这两个参数的自定义方式：

构建命令类似如下形式：

```bash
clean install -pl module_name -am
```

Rainbond 为每一个模块创建一个对应的服务，因此用户需要根据自身项目情况人工判断哪些是公共类库项目，在批量创建过程中取消公共类库类模块的创建。每一个服务对应有构建命令，如果不正确也需要用户自行修改。

2.单模块代码检测

如果识别的项目是单模块项目，则直接进入服务构建流程。

### Rainbond 构建 Maven 组件

当用户从 UI 触发或 Webhook 触发服务进行构建后，构建任务将由数据中心 API 服务生成发送到消息系统，由 rbd-chaos 服务从消息系统竞争构建任务，如果当前 rbd-chaos 节点正在执行的构建任务超过了最大值（默认最大值为节点 CPU 核数的 2 倍），将暂停任务的竞争。获取到任务后开始通过 git 或 svn 客户端获取项目代码并缓存下来，下一次构建任务在缓存代码的基础上进行代码更新。然后启动 builder 容器传入代码和构建参数（具体构建参数在下文中说明）执行构建任务。

构建任务的执行有如下步骤：

#### 1. JDK 和 Maven 版本的选择

在项目源码主目录中可以定义**system.properties** 文件来指定 JDK 的版本和 Maven 的版本。格式如下：

```properties
java.runtime.version=1.9
maven.version=3.2.5
```

如果代码中存在**system.properties** 文件，代码检测阶段会读取此文件定义的 JDK 版本为 BUILD_RUNTIMES 变量赋默认值。

用户可以在 Rainbond 平台设置以下变量来选择 JDK 和 Maven 的版本：

- BUILD_RUNTIMES（OPEN-JDK 版本）可选值 1.6 1.7 1.9 10 11
- BUILD_ENABLE_ORACLEJDK (是否使用 ORACLEJDK)默认为否。
- BUILD_ORACLEJDK_URL (ORACLEJDK 下载路径）用户指定。
- BUILD_RUNTIMES_MAVEN (Maven 版本)，默认为 3.3.9 如果 JDK 版本为 1.6 默认值为 3.2.5

> 注意，本文中所有描述的以 BUILD\_开头的变量都可以在服务环境变量中设置，其他大部分变量也已在构建源设置中体现。

1.1 JDK 的下载

如果开启了 ORACLEJDK 的支持，通过指定的 BUILD_ORACLEJDK_URL 路径下载 JDK, 如果未指定，Maven 构建脚本默认根据上述设置变量指定的版本来构建 JDK 的下载路径，比如：

```bash
http://lang.goodrain.me/jdk/openjdk1.8.0_20.tar.gz
```

lang.goodrain.me 域名是 Rainbond 数据中心内部域名，rbd-repo 服务（artifactory）提供，意味着资源是从数据中心内部 rbd-repo 服务下载的。rbd-repo 服务只是一层静态资源缓存，它第一次接收到请求后将从 Rainbond 提供的云 OSS 上下载相应的资源，然后缓存到本地。

> 注意，如果遇到 JDK 下载失败问题，需要确认 rbd-repo 是否能够正常联网，并且确认 Rainbond 是否提供了指定版本的 JDK 下载。

1.2 Maven 的下载

Maven 的下载与 JDK 是原理一致的，根据指定的版本构建下载路径从 rbd-repo 服务中下载。

#### 2. Maven 环境设置

2.1 settings.xml 文件的处理

**settings.xml**文件中可以定义远程仓库和认证信息，镜像仓库信息等。用户可以通过设置如下变量来自定义配置：

- BUILD_MAVEN_SETTINGS_PATH 直接定义 settings.xml 的本地路径，此路径用户只能使用源代码目录下，即路径是以`/app`开头， 比如如果在源码主目录下，路径应该为：`/app/settings.xml`
- BUILD_MAVEN_SETTINGS_URL 定义 settings.xml 的远程下载路径，由于 settings.xml 文件可能含有账号信息不适合存放到代码仓库中，可以存放于对象存储中提供下载路径。

  构建脚本将优先使用 BUILD_MAVEN_SETTINGS_PATH 变量，再使用 BUILD_MAVEN_SETTINGS_URL 变量，如果都未定义，将使用默认的 settings.xml 文件。默认的 settings.xml 定义了使用 maven.goodrain.me 全局代理所有远程库。这样做的目的是能够缓存用户所有项目需要使用到的依赖包，作为构建流程中的二级缓存。 如下配置：

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

用户也可以通过如下参数设置上述配置：

- BUILD_MAVEN_MIRROR_DISABLE 设置为 true 则上述配置不生效。不再使用 rbd-repo 服务缓存 maven 包。

- MAVEN_MIRROR_OF 设置代理范围，默认为\*, 全部代理。
- MAVEN_MIRROR_URL 设置代理仓库服务地址，默认为 rbd-repo 服务提供的 maven.goodrain.me，用户可以设置切换为企业内部支持 mirror 的私服地址。

  2.2 缓存的处理

  Rainbond 为每一个服务的构建环境提供一级缓存，Maven 项目会对 maven 的安装目录，配置目录，和**本地仓库**目录提供了缓存，用户通过设置以下变量清理缓存。

- NO_CACHE 设置后下一次构建过程将先去除缓存资源后重新下载，移除变量后下一次则不会清理。

  > 注意，存在于 rbd-repo 服务中的二级缓存用户可以访问 rbd-repo 服务的 UI 来清理。

#### 3. 执行 Maven 构建命令

编译程序首先需要构造编译命令，用户可以通过以下参数自定义设置 Maven 的编译命令：

- BUILD_MAVEN_CUSTOM_OPTS 默认值为 `-DskipTests` 忽略单元测试
- BUILD_MAVEN_CUSTOM_GOALS 默认值为 `clean dependency:list install`

因此如果你未设置任何参数时，Rainbond 默认的构建命令为：

```bash
mvn -B -s setting.xml文件路径 -DskipTests clean dependency:list install
```

-B 参数的意思是以非交互的方式运行，-s 指定 setting.xml 配置文件，路径由上文中描述的逻辑确定。

大多数用户本地测试时采用的命令是 `mvn clean install` 没有`dependency:list`参数。

如果是多模块的服务，BUILD_MAVEN_CUSTOM_GOALS 参数会在服务创建时自动更改类似下述的命令：

```bash
clean install -pl module_name -am
```

大多数标准项目都是可以正常构建的，如果用户多模块项目不符合，需要用户必须修改 BUILD_MAVEN_CUSTOM_GOALS 参数。

构建命令确定后编译程序将执行 Maven 构建，实时输出构建过程日志。

> 注意，请务必在使用 Rainbond 构建项目之前使用上述的命令本地执行测试。

#### 4. 运行环境处理

mvn 完成编译打包后有两种介质，分别为 war 包和 jar 包。

生成的介质如何运行，即启动命令配置，是在代码主目录`Procfile`文件中定义，如果代码中做了定义，服务创建时会识别配置内容来初始化 BUILD_PROCFILE 变量。 `Procfile` 文件的规范请参考 [文档](../procfile)

BUILD_PROCFILE 未定义的情况下 Rainbond 编译脚本会做如下判断来生成默认的启动命令配置：

- 判断是否为 war 包

根据 pom.xml 文件是否包含`<packaging>war</packaging>`来判断当前项目是否为 war 项目，如果是则使用下述运行命令运行：

```yaml
web: java $JAVA_OPTS -jar ./webapp-runner.jar  --port $PORT target/*.war
```

- 是否为 springboot 项目

根据 pom.xml 文件是否包含`<groupId>org.springframework.boot` 和`<artifactId>spring-boot` 且打包方式为 jar 包时识别为 springboot 项目，如果是默认运行命令是：

```yaml
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

- 是否为 wildfly_swarm 项目

根据 pom.xml 文件中是否包含`<groupId>org.wildfly.swarm`来识别是否为 wildfly_swarm 项目，如果是，默认运行命令为：

```yaml
web: java -Dswarm.http.port=$PORT $JAVA_OPTS -jar target/*.jar
```

手动配置 BUILD_PROCFILE 直接设置启动命令是最准确和直接的方式。

几个场景下需要自行设置启动命令

- 生成的包不在 target/目录下，比如多模块构建时构建的包可能处于子模块的 target 目录下，同样的服务创建时 Rainbond 已经根据识别结果进行设置。
- 项目设置不符合 Rainbond 自动识别策略。
- 启动命令需要自定义。

从上述自动生成的启动命令可以看出，Rainbond 运行 War 时采用的是[webapp-runner](https://github.com/jsimone/webapp-runner)项目，如果需要设置 Tomcat 版本或其他参数时，需要根据 webapp-runner 的相关参数来对应设置启动命令。比如设置会话路径时：

```yaml
web: java $JAVA_OPTS -jar ./webapp-runner.jar --path /test  --port $PORT target/*.war
```

其他设置参数参考文档：[tomcat 参数设置](https://github.com/jsimone/webapp-runner#options)

#### 5. 运行环境打包

上述流程完成后编译脚本将代码目录进行打包，打包命令如下：

```yaml
tar -z --exclude='.git' -X "$build_root/.slugignore" -C $build_root -cf $slug_file .
```

默认的情况下会将整个源码、编译过程下载的 JDK 等执行程序、编译生成的介质文件一起打包。目的是不遗漏任何文件，特别是静态文件、配置文件等。如果用户不想将运行态无用的源代码打包，需要定义**.slugignore** 文件。

**.slugignore** 文件与常见的.gitignore 文件语法类似。从上述打包命令可以看出此文件是在 tar 命令打包时生效。

#### 6. 生成 Docker 镜像

所有语言类型编译完成后都会生成 tar 包，我们提供了 runner 基础镜像来运行这些 tar 包。源码在 https://github.com/goodrain/runner， 其工作流程如下：

1. 解压 tar 包到/app 目录下。
2. 解析 Procfile 文件获取软件启动命令。
3. 设置程序运行的环境变量，比如 JAVA_OPTS。
4. 执行 Procfile 文件中的软件启动命令。

### 常见问题说明

1. 需要的 JDK 或 Maven 版本 Rainbond 不支持。

   > 根据上文描述的一样，如果你需要使用的 JDK 版本不在 Rainbond 目前的支持列表（主要是 Rainbond 公有 OSS 仓库有没有下载包），你可以社区反馈我们添加需要的版本或你自行准备 JDK 版本存放于 rbd-repo 仓库中做本地缓存。

2. 离线环境下能否进行 Maven 源码构建。

   > 由于构建过程需要从公网下载 JDK、Maven、依赖包等资源，默认情况下无法离线使用源码构建，你可以根据上述说明操作 rbd-repo 准备对应的资源，企业版本中提供了具备完整离线资源的 rbd-repo 服务。

3. 依赖包下载失败怎么排查。

   > 依赖包下载失败最大的可能是受限于你的网络，或你使用了私服仓库且不能被 rbd-repo 服务镜像代理。最简化的处理方式是你配置相关参数直接使用你过去使用的仓库服务。

4. 本地可以构建，Rainbond 不能构建。

   > 上文中已经完整说明了 Rainbond Mvn 构建的流程和方式，你需要逐一差异化排查与你本地构建的不同点。解决的难易程度可能取决于你对 Maven 构建机制的认识。

5. 其他问题如何反馈。

   > 遇到源码构建问题无法自己解决，可移步 [github](https://github.com/goodrain/builder) 提交你的 issues。我们非常乐于解决各类场景性问题，提供 Rainbond 源码 CI 的兼容性。
