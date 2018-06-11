---
title: Pinpoint-java性能分析最佳实践
summary: 介绍pinpoint、云帮部署pinpoint、以及如何使用
toc: false
---
<div id="toc"></div>

## 概述

### pinpoint简介

- **何为pinpoint：** pinpoint是一个分析大型分布式系统的平台，提供解决方案来处理海量跟踪数据，主要面向基于tomcat的Java 应用。
- **为何使用它：**和如今相比， 过去的因特网的用户数量相对较小，而因特网服务的架构也没那么复杂。web服务通常使用两层(web 服务器和数据库)或三层（web服务器，应用服务器和数据库）架构。然而在如今，随着互联网的成长，需要支持大量的并发连接，并且需要将功能和服务有机结合，导致更加复杂的软件栈组合。更确切地说，比三层层次更多的n层架构变得更加普遍。系统的复杂度因此提升。系统越复杂，越难解决问题，例如系统失败或者性能问题。在三层架构中找到解决方案还不是太难，仅仅需要分析3个组件比如web服务器，应用服务器和数据库，而服务器数量也不多。但是，如果问题发生在n层架构中，就需要调查大量的组件和服务器。另一个问题是仅仅分析单个组件很难看到大局;当发生一个低可见度的问题时，系统复杂度越高，就需要更长的时间来查找原因。最糟糕的是，某些情况下我们甚至可能无法查找出来。为了解决复杂架构下的拓扑解析与性能分析，pinpoint应运而生。

### 功能、优势与架构

- **功能** 

  - 分布式事务跟踪，跟踪跨分布式应用的消息
  - 自动检测应用拓扑，帮助你搞清楚应用的架构
  - 水平扩展以便支持大规模服务器集群
  - 提供代码级别的可见性以便轻松定位失败点和瓶颈
  - 使用字节码增强技术，添加新功能而无需修改代码

- **优势** 

  - 非入侵式：不需要修改应用的代码，即可完成agent的部署。
  - 资源消耗：总体资源消耗只提高了3%左右。

- **架构** 
  
  - HBase (用于存储数据)
  - Pinpoint Collector (信息的收集者，部署在tomcat中)
  - Pinpoint Web (提供WEB_UI界面，部署在tomcat中)
  - Pinpoint Agent (附加到 java 应用来做采样)

  <center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/Pinpoint-Topology.png" style="border:1px solid #eee;max-width:100%"/></center>

###相关资料

如果想要进一步了解这款强大的APM软件，请访问以下链接：

- 官方网站：[https://naver.github.io/pinpoint/](https://naver.github.io/pinpoint/)
- Github代码托管：[https://github.com/naver/pinpoint](https://github.com/naver/pinpoint)
- WIKI：[https://github.com/naver/pinpoint/wiki](https://github.com/naver/pinpoint/wiki)
- 中文资料：[https://legacy.gitbook.com/book/skyao/learning-pinpoint/details](https://legacy.gitbook.com/book/skyao/learning-pinpoint/details)

## 云帮最佳实践

### 出发点

- **化繁为简：** 如果您通读了pinpoint安装部署的官方文档，会发现在传统架构下部署可用的pinpoint实例是一件很繁琐的事情。无论是部署它的四个组件（HBASE、Collector、Web-UI、Agent），还是部署完成后进行相应的配置，都需要操作人员具备一定的技术水平。为此，云帮平台在[云市](https://www.goodrain.com/appList)中发布了pinpoint应用，由此可以实现一键部署pinpoint应用。通过这种方式，极大的简化了部署流程的同时，也降低了操作门槛。
- **微服务化：** 云帮平台是一款无服务器PaaS平台，它通过容器化的方式发布了pinpoint应用，这可以抹去传统架构下**扩容难、升级难**等缺陷。通过在云帮平台上[应用管理界面](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-introduce.html)中进行一些简单的操作，可以根据业务量的大小轻松实现pinpoint的扩容伸缩；K8S+Docker的容器化技术，确保了升级只需升镜像的简单途径。从此，对于企业与个人的IT系统的运维开销将降低很多。
- **归根结底：** 云帮平台已经发布了成熟的应用，可以轻松构建一套基于openJDK的java环境/Tomcat。加之目前发布的pinpoint应用，归根结底，云帮可以为企业或者个人，**打造简单易用，基于openJDK的java程序开发与调试环境**。而在云市中发布pinpoint，正是其中重要的一环。

### 云市安装

- [**从云市安装**](https://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-market.html) ：是在云帮平台上部署应用非常简单的一种方式。这种部署方式对于像pinpoint这种多组件的复杂应用来说，最大程度的降低了部署难度与工作量。
- 进入云帮，选择 **从云市安装** 

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-install1.png" style="border:1px solid #eee;max-width:100%"/></center>

- 在搜索栏中搜索 **pinpoint**

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-install2.png" style="border:1px solid #eee;max-width:100%"/></center>

- 选择 **应用分组**

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-install3.png" style="border:1px solid #eee;max-width:100%"/></center>

- 点击 **确定** ，等待一小段时间后，应用就部署完成了

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-install4.png" style="border:1px solid #eee;max-width:100%"/></center>

###访问WEB-UI

- 我们可以通过访问 **pinpoint-web** 应用，来进入到pinpoint的UI界面。

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-access1.png" style="border:1px solid #eee;max-width:100%"/></center>

- 在我们的默认设置中，**pinpoint应用** 已经监控了它自身的 **collector** 、**web**组件。在进入UI界面后，就可以发现二者已经存在于应用列表中了。

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-access2.png" style="border:1px solid #eee;max-width:100%"/></center>

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-access3.png" style="border:1px solid #eee;max-width:100%"/></center>

### 添加被监控的对象

- 传统架构下的pinpoint，需要在被监控的对象里附加Agent，并通过修改配置文件使之生效。在云帮平台上，我们将这两个步骤也做了相应的简化。
  - 由 [**好雨官方OpenJDK镜像**](https://hub.docker.com/r/goodrainapps/openjdk/) 为基础制作的应用，都默认集成了Pinpoint-Agent，不需要二次安装。
  - 云帮平台利用设置 **环境变量** 的方式，代替了配置文件，键值对形式的环境变量非常简单易用。
- 下面以Tomcat为例，介绍添加被监控对象的方法：选择 **好雨官方tomcat镜像** 部署

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-tomcat-create1.png" style="border:1px solid #eee;max-width:100%"/></center>

- 点击 **高级设置**

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-tomcat-create2.png" style="border:1px solid #eee;max-width:100%"/></center>

- 添加 **环境变量** 如下：

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-tomcat-create3.png" style="border:1px solid #eee;max-width:100%"/></center>

- 通过 **添加依赖** 关联Pinpoint-Collector

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/pinpoint-tomcat-create4.png" style="border:1px solid #eee;max-width:100%"/></center>

- 对于已部署的应用，也可以通过 [**应用管理界面**](https://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-introduce.html) 中的 **依赖** 、**设置** 选项卡，来配置相应的服务依赖和环境变量。
- **环境变量** 详解：

|   变量名   |         含义         |   默认值   |
| :--------: | :------------------: | :--------: |
| ENABLE_APM | 激活/关闭Agent的开关 |   false    |
|  APP_NAME  | pinpoint中应用的名称 | SERVICE_ID |

## DEMO实例：监控分析b3log-solo应用

### solo简介

- **solo** 是一款由java编写的开源博客软件，云帮在对其进行整合之后，将与pinpoint一道，同期在云市中发布。

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/solo-demo1.png" style="border:1px solid #eee;max-width:100%"/></center>

### 效果展示

- 在按上文中的说明配置了Pinpoint-Collector的服务依赖、打开ENABLE_APM开关后，就可以在pinpoint的UI界面中发现它了。solo后端对接的MySQL数据库也被pinpoint自动发现了。

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/solo-demo2.png" style="border:1px solid #eee;max-width:100%"/></center>

- 清晰的代码级输出，让DEBUG工作事半功倍。

<center><img src="https://static.goodrain.com/images/acp/docs/bestpractice/Pinpoint/solo-demo3.png" style="border:1px solid #eee;max-width:100%"/></center>
