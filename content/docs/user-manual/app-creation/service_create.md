+++
title="组件创建方式"
menu="user-manual-appcreate"
weight=3100
+++

这篇文章将会为你介绍Rainbond组件的创建方式。

应用的定义中已经提到应用是由各个不同的组件构成，那么应用的创建就离不开组件的创建；组件创建的方式有4种，分别是：

* [从源码创建](#从源码创建)

* [从Docker镜像创建](#Docker镜像创建)

* [基于共享库创建组件](/docs/user-manual/app-store/)

* [创建第三方组件](#第三方组件)

下面分别介绍这四种创建组件的方式。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/create-app-3.7.png"width="80%"/>

### 从源码创建

Rainbond支持多种流行的编程语言的源码创建，同时也支持通过Dockerfile进行创建，从源代码创建和持续部署组件是Rainbond最常用的创建方式，其是DevOps流程中最关键的一环。

Rainbond目前支持的语言有:

- <a href="../language-support/java/"target="_blank">Java源码创建组件</a>
- <a href="../language-support/php/"target="_blank">PHP源码创建组件</a>
- <a href="../language-support/python/"target="_blank">Python源码创建组件</a>
- <a href="../language-support/nodejs/"target="_blank">Node.js源码创建组件</a>
- <a href="../language-support/golang/"target="_blank">Golang源码创建组件</a>
- <a href="../language-support/netcore/"target="_blank">.Net源码创建组件</a>
- <a href="../language-support/html/"target="_blank">Html静态源码创建组件</a>
- <a href="../language-support/dockerfile/"target="_blank">Dockerfile源码创建组件</a>

通过源码的方式创建组件，需要把源码托管在版本控制系统上，Rainbond目前支持的版本控制系统有`Git`和`SVN`，也是目前大家常用的版本控制系统。相应的源码必须符合Rainbond的源码支持规范，当然定义的规范都是与各语言推荐规范一致。
需要注意的是对于一些聚合工程，我们想要构建组件所需的源码，可能位于仓库下的某一个子目录下，获取对应子目录下的源码的方式如下：

**Git: 填写`子目录路径`，指定源码主目录。**

例如：

源码仓库地址为: https://github.com/demo/demo.git, 所需源码位于子目录`/subdir1/subdir2`下，则构建应用使用的仓库地址为: `https://github.com/demo/demo.git` 子目录路径填写为`subdir1/subdir2`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-creation/service_create/Subdirectory.png" width="100%" />

我们不推荐使用子目录的方式对项目进行区分，应该尽可能地给每个项目建立独立的Git仓库，这样可以使代码的结构更加地清晰，不至于太臃肿，方便管理。

**SVN: 原生支持处理子目录。**

例如：

源码仓库地址为: http://svn.demo.net/trunk/subdir, 则构建应用使用仓库地址为: http://svn.demo.net 分支选择为子目录路径:`trunk/subdir`


### Docker镜像创建

从标准的Docker镜像创建一些中间件或其他开源项目组件是最便捷的途径，对于企业自研的业务系统要求用户必须掌握容器化相关知识。

你可以将项目的代码，运行时环境，依赖库，配置等资源或信息通过Dockerfile打包成一个或多个镜像，上传到DockerHub或其他公有镜像仓库中，或是自己的私有仓库。对于项目中所需要的数据库，消息队列等中间件，或者ElasticSearch,Kibana,Grafana等日志收集工具，你甚至可以直接在DockerHub找官方制作好的镜像，不需要自己去制作；然后通过镜像名字，DockerRun命令，或者DockerCompose，将镜像直接跑在Rainbond平台。

从Docker镜像创建和持续构建组件也是DevOps流程中使用较为广泛的方式，特别是对于已经搭建了CI流程的企业，通过第三方的CI系统（比如Jenkins）将代码处理完成打包为Docker镜像存储于私有镜像仓库中；Rainbond完成后续的CD流程，将镜像转化为集群组件与应用中其他组件进行架构关联，调度运行，生命周期管理等。

<b>以下的镜像不能安装:</b> </br>
发行版及软件包镜像：`Debian，Ubuntu，Centos，Fedora，FreeBSD`</br>
编程语言或其他基础运行环境镜像：`Golang，Ruby，Openjdk`</br>
命令行工具类软件镜像：`Docker，HomebrewBottles`


### 指定镜像

Rainbond可以通过直接拉取Docker官方或者第三方Docker镜像的方式创建组件，但需要注意的是，第三方Docker仓库一定要支持HTTPS协议，否则需要就修改Docker配置，使其支持非HTTPS的Docker仓库.

#### DockerRun命令创建

使用DockerRun命令创建是Rainbond支持Docker镜像基础上提供的一项便捷操作，Rainbond会解析出DockerRun命令中的镜像，端口，环境变量，内存和存储等组件属性信息，然后生成Rainbond应用（组件）抽象；因此此过程的体验效果与你在单机上运行DockerRun命令可以直接运行容器一样，直接在集群下快捷创建并启动一个组件。

> Rainbond只关心`镜像，端口，环境变量，内存和持久化挂载`等信息，其它信息将会被忽略；此方式支持大多数Dockerhub上提供的镜像运行方式执行。

#### DockerCompose创建

对DockerCompose的支持是在对DockerRun命令的基础上进一步升级，用户在单机环境下可以基于DockerCompose快捷部署多个容器，在Rainbond平台一样，基于Docker Compose配置可以便捷生成多个组件（通常是一个完整的应用抽象），直接在集群环境下运行。Rainbond提供的组件间通信机制可以完美支持常用的DockerCompose配置，目前支持的DockerCompose版本有：

`1`, `1.0`, `2`, `2.0`, `2.1`, `2.2`, `2.3`, `2.4`
`3`, `3.0`, `3.1`, `3.2`, `3.3`, `3.4`, `3.5`, `3.6`, `3.7`

### 从共享库安装

从共享库安装应用目前支持从云端市场和从本地市场直接一键安装，云端市场显示应用是当前企业在云应用市场中可以直接安装使用的应用，包括公开的应用，被私有交付的应用和购买的商业应用。 

本地市场的应用来源主要是企业内部自行分享的应用。

关于共享库的更多信息,请前往：[共享库](/docs/user-manual/app-store/)

### 第三方组件

关于第三方组件请参阅：[第三方服务说明文档](../thirdparty-service)
