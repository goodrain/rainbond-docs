---
title: 应用市场
summary: 应用市场
toc: true
---

本文阐述应用市场的概念，并教你如何从好雨公共应用市场同步应用与插件。

## 一、什么是应用市场

**应用市场是Rainbond定义的一种对于Rainbond应用的存储、共享、交付、管理途径。**
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/article/rainbondv372/%E5%BA%94%E7%94%A8%E5%B8%82%E5%9C%BA.png" width='100%' />
Rainbond应用市场与传统意义上的镜像仓库不同之处在于，它基于镜像仓库、包仓库和对象存储等存储系统支持，定义了支持大型、分布式数字化业务系统的标准云原生应用模型，并针对应用模型提供创建、发布、存储、交付、安装、升级等一系列业务支持，对内可作为以便捷灵活的方式共享企业创造的业务系统、中间件的业务性管理平台，对外可作为根据行业特性构建行业话交付标准、交付流程和交付路径的基础。
基于Rainbond提供的通过源码、镜像等多种途径创建1-N个服务组件构成业务系统，一键即可构建应用模型并发布到应用市场中，根据不同场景需求和可见级别服务于不同的业务场景。
应用市场中的业务系统可以通过离线导出的方式，交付到一个离线的Rainbond平台，也可以通过公有云市场的方式在线交付社区用户或目标企业用户。
使用者通过应用市场即可一键安装部署完整业务系统，并且能够持续进行升级。
<img src="https://static.goodrain.com/images/docs/3.7/user-manual/flowchart.jpg" width='100%' />

## 二、私有应用市场与共有应用市场的关系和区别

私有应用市场内置于Rainbond平台中，公有应用市场目前由好雨科技运营提供。公有云市场服务于与其对接互联的私有应用市场，提供跨平台，跨云的应用资源同步和升级。

企业也可以建立行业公有应用市场，详情参阅 [好雨企业服务](https://www.goodrain.com/industrycloud)

<img src="https://static.goodrain.com/images/docs/3.7.1/rainbond_certification.gif" width='100%' />

<center>与公有云市场互联</center>

<img src="https://static.goodrain.com/images/docs/3.7.1/shichang.jpg" width='100%' />

<center>市场间应用同步</center>

## 三、应用市场应用模型

类似于AppStore级别的云原生应用市场体验，应用可以是作品，也可以是商品。Rainbond应用模型由1-N个服务组件资源与全量配置、插件及全量配置、拓扑关系、部署方式等信息组成。应用市场应用模型由Rainbond[发布流程](https://www.rainbond.com/docs/stable/user-manual/app-store/publish_and_install.html#part-f392de06e5050a6d)创建生成，可以在多个市场间同步传播，应用模型具备多级版本控制，可以支持跨平台安装和升级。


