---
title: 简介
summary: 云帮简介
toc: true
toc_not_nested: true
asciicast: true
---


## Rainbond是什么
Rainbond（云帮）是由 [北京好雨科技有限公司](https://www.goodrain.com/aboutus#1F) 自主研发的一款以应用为中心的开源PaaS。

Rainbond深度整合了基于Kubernetes的容器管理、Service Mesh微服务架构最佳实践、多类型CI/CD应用构建与交付、多数据中心资源管理等技术，为用户提供云原生应用全生命周期解决方案，构建应用与基础设施、应用与应用、基础设施与基础设施之间互联互通的生态体系，满足支撑业务高速发展所需的敏捷开发、高效运维和精益管理需求。

## Rainbond可以做什么
Rainbond提供了一种聚焦于应用管理的新一代云计算模式，企业和开发者可以将Rainbond作为公有云或私有云环境下的：

* 应用交付平台
* DevOps平台
* 自动化运维平台
* 行业云平台

或者作为企业级的：

* 混合云多云管理工具
* Kubernetes容器管理工具
* 微服务架构改造工具

使用场景包括：

* 持续交付——产品高效上线、快速迭代
* 高效运维——轻松管理大量服务器
* 应用市场——提供丰富的一点即用的云端应用
* 灵活伸缩——支持大用户秒级扩充资源
* 微服务架构——最成熟的微服务架构解决方案原生支持Service Mesh
* 云框架——支持各种复杂的技术架构
* 多数据中心——支持多数据中心管理
* 多租户——支持租户间的网络与服务隔离
* 渐进式的混合云——公有云与私有云平滑过渡

## Rainbond主要特性

### 源代码构建

有别于一般容器云平台，Rainbond不仅可以从镜像或以docker-compose方式构建应用，还支持Java、PHP、Python、Ruby、Node.js、Golang、Scala等主流语言的源代码构建。换句话说，用户不需要理解Docker，也不需要编写Dockerfile，Rainbond将自动识别语言，并将源代码自动构建成应用。与此同时，Rainbond还提供了对于Jenkins等第三方CI/CD的对接支持。

在Rainbond上构建的应用，可搭配Mysql、Redis、Zookeeper等各类数据存储应用，构成一个完整的服务，并可发布到私有应用市场供企业内部共享，或分享到[好雨云市](http://app.goodrain.com/)进行商业销售。

### 微服务架构落地

微服务架构是Rainbond的核心功能之一，在它之上部署的任何应用，本身即是微服务，可按照微服务的方式进行操作。借助好雨微服务架构强大的插件体系，Rainbond无侵入原生提供服务治理、服务注册与发现、服务升级、服务监控、服务伸缩等功能，同时支持各类第三方微服务框架。

同样由好雨开源的最佳实践项目云框架中的[Spring Cloud](https://github.com/cloudframeworks-springcloud/user-guide-springcloud)、[api gateway](https://github.com/cloudframeworks-apigateway/user-guide-apigateway)等微服务架构主题，均可完美运行于Rainbond之上，开发者仅需替换实例中业务代码即可变成自己的微服务架构项目，并通过docker-compose的方式一键部署。

### 混合云多云管理

混合云多云管理是Rainbond的另一项优势功能。在云计算飞速发展的今天，众多厂商提供了丰富的各类型公有云资源，Rainbond通过对应用与资源的解耦，将各类资源（私有云服务器、公有云服务器、网络资源）统一整合成Rainbond数据中心，对各类资源进行自动管理，实现跨区域互联与租户化隔离，用户无需关注服务器即可将应用部署于混合云多云环境。

*更多特性请见[功能列表](https://github.com/goodrain/rainbond-docs/edit/master/v3.6/overview/edition.md)*

## Rainbond的优势

* 第一款遵循以应用为中心的理念设计的PaaS
* 国内最早确立docker+kubernetes技术方向的PaaS
* 功能覆盖从源码到交付的整个应用生命周期
* 帮助企业和开发者在提高5倍效率的同时降低50%成本
* 经过上百家政府、能源、金融、教育等大中心行业用户落地验证