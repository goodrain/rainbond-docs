---
title: Overview
description: This chapter describes the complex application of microservice architecture based on Rainbond
keywords:
  - 微服务部署
  - Spring Cloud 部署
  - 构建微服务架构
---

微服务架构（通常简称为微服务）是指开发应用所用的一种架构形式。通过微服务，可将大型应用分解成多个独立的组件，其中每个组件都有各自的责任领域。在处理一个用户请求时，基于微服务的应用可能会调用许多内部微服务来共同生成其响应。

## 服务组装

大家聊微服务的一个关键话题是“服务拆分”。服务拆分一般是指对于一个完整的业务系统，我们需要基于一些因素和机制对其进行业务切分形成一些独立服务组件，这些服务组件独立开发、独立管理、对外提供标准服务。在 Rainbond 中，我们经常说的一句话“部署到 Rainbond 的组件即是一个微服务”。如果的业务是一个遗留系统、一体化架构。那么你先不用考虑如何拆分它，直接先将其部署到 Rainbond 中，先使用微服务的体系将其管理起来。无非它就是提供了多种业务的服务类型，共享属性差一些。如果你的业务已经按照微服务模式开发，比如基于 SpringCloud 微服务架构框架开发的。那么你暂时可能没有拆分的烦恼。但需要将所有服务组件高效的管理起来，持续开发。

因此本篇文章主要聊，将业务系统在 Rainbond 中进行服务化组装。可能你的业务目前采用各种技术架构，有遗留一体化架构，有 SpringCloud 架构，有 Dubbo 架构等等。我们将其统一部署到 Rainbond 平台进行组装。

### 基于 ServiceMesh 组装

服务组装的关键是理清楚服务直接的通信依赖关系。基于通信关系来建立组件的依赖关系。 在应用中可以根据需要随时增加或减少业务组件，组件间的依赖关系可以动态的增加和移除。通过 ServiceMesh [流量路由管理](#网络可视化) 来管控组件间的通信。

只有通过 ServiceMesh 组装的微服务架构，可以在应用拓扑中查看到组件间的关系。

### 基于 SpringCloud 架构组装

如果您的应用是基于 SpringCloud 开发，同样的是一个服务一个组件的部署到 Rainbond 进行组装。与基于 ServiceMesh 不同的是，服务之间的通信关系由 SpringCloud 的服务注册中心为桥梁，进行服务注册和直接的通信。也就是说 Rainbond 无法获取到服务直接的通信依赖关系，从而在拓扑图中不进行展示。但是关键的是 Rainbond ServiceMesh 与 SpringCloud 在进行融合。如下图所示，所有服务与注册中心和数据库之间的通信是通过 ServiceMesh 完成，从 UI 到 Gateway 的通信是由 ServiceMesh 完成。

![SpringCloud部署示意图](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/SpringCloud.png)

## 网络可视化

Rainbond 应用拓扑图中进行网络可视化展示。应用拓扑图中展示以下维度信息：

1. 服务之间的业务拓扑关系。
2. 服务之间的通信依赖关系。
3. 服务对外网提供访问入口信息。
4. 服务实时运行状态。

![ServiceMesh架构拓扑图](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/servicemesh.png)
