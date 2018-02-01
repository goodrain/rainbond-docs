---
title: 应用全生命周期解决方案
summary: 应用全生命周期解决方案
toc: false
toc_not_nested: true
asciicast: true
---
Rainbond遵循“以应用为中心，软件定义一切”的[设计理念](http://www.rainbond.com/docs/stable/getting-started/design-concept.html)，提供应用创建组装、运行生产、发布传播三阶段体系化支持。Rainbond支持包括源代码构建在内的多种途径持续构建应用，可搭配Mysql、Redis、Zookeeper等各类数据存储应用，构成一个完整的服务，并可发布到私有应用市场供企业内部共享，或分享到[好雨云市](https://www.goodrain.com/#/appList)进行商业销售。

## 应用构建

一般容器化的PaaS平台，往往会从镜像开始应用的构建，这就意味着开发者需要花费额外的时间来把源代码打包成镜像。其次，容器镜像的构建者进行的任何修改，对于镜像使用者来说往往是不透明的，不利于团队之间的协作。另外，当容器镜像依赖的父镜像发生变化时，必须重新构建，而如果不能从源代码自动构建的话，需要手动修改容器的文件系统。这些重复性的工作其实是没有价值的。

Rainbond在应用构建方面面向多种介质来源，设计为持续集成／持续交付（CI/CD）的插件式Pipeline。目前支持的来源有：

* 源码（Java、PHP、Python、Ruby、Node.js、Golang、Scala）
* 镜像
* Dockerfile
* Docker-Compose

基于不同的来源，Rainbond构建出统一的应用完整运行介质，可以运行在各处Rainbond平台之上。

在构建流程中，Rainbond从Dockerfile或镜像文件中智能识别存储、端口等配置信息，近期还会定义rbdfile规范，方便开发者在源码中预先定义应用配置和运行环境配置。另外，Rainbond针对Jenkins等已有CI系统的对接也会在近期开放。
