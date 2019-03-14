---
title: 云帮支持微服务架构
summary: 在云帮部署Dubbo框架示例
toc: false
toc_not_nested: true
asciicast: true
---
<div class="filters filters-big clearfix">

    <a href="microservice-support.html"><button class="filter-button current"><strong>微服务支持</strong></button></a>
    <a href="microservice-settings.html"><button class="filter-button">微服务配置</button></a>

</div>

<div id="toc"></div>

微服务架构被提出很短的时间内，就被越来越多的开发人员推崇，简单来说其主要的目的是有效的拆分应用，实现敏捷开发和部署 。

## 微服务架构模式

我们先来认识一下当前主流的微服务架构模式，其中包括一体化、聚合、代理、资源共享、异步消息，以及由以上模式演变而来的多种模式。

### 一体化

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc1.png" width="20%" />

传统的MVC架构，也是一体化模式。

### 聚合

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc2.png" width="40%" />

聚合模式即多个服务聚合到一个服务，称之为聚合服务。聚合服务最常见的表现是Web服务，主要功能为页面表现，后端服务为纯业务功能服务。也就是说，聚合模式下扩展业务只需增加一个新的后端微服务即可。

聚合服务符合DRY原则，可以是一个更高层次的组合微服务，增加业务逻辑后进一步发布成一个新的微服务，同时每个服务都有自己的缓存和数据库。

聚合模式是微服务架构中最常用的模式。

### 代理

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc3.png" width="40%" />

代理模式是一种特殊的聚合模式，即对外将服务统一包装。代理模式可以仅仅委派请求，也可以进行数据转换工作。

我们可以将代理模式比做通过收发室统一收发信件的小区，无论是外部请求还是内部数据服务，均由代理处理。

### 资源共享

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc4.png" width="40%" />

微服务架构的资源共享模式可实现部分业务的逻辑分离、数据共享。

资源共享模式常用在“一体化架构”向“微服务架构”迁移的过渡阶段，以及有数据一致性要求的两个服务。

### 异步消息

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc5.png" width="40%" />

微服务架构的异步消息模式适用于不需要同步的场景，如任务型服务，利用消息队列代替其他微服务架构模式所采用的REST请求及响应。

## service mesh

云帮平台原生支持基于Service Mesh 的微服务架构。架构模型如下：

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc6.png" width="60%" />

### 硬件层面

云帮资源管理系统对接不同资源抽象统一的存储资源池，租户网络，计算资源池。所有应用由应用引擎统一调度使用物理资源，无需人为干预，如此为部署大规模微服务集群提供了条件。

### 通信层面

基于ServiceMesh的通信架构无侵入式提供了服务之间的负载均衡，动态配置，服务发现，服务路由，速率控制等服务治理基础功能。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc7.png" width="50%" />

用户只需要关注服务本身的开发，基于平台提供的服务基础治理功能可以完成服务灰度发布，A/B测试，服务降级，熔断等。Mesh层面配置由应用引擎提供通知机制，热更新，自动完成。

{{site.data.alerts.callout_success}}

- 灰度发布——部分用户先使用新版，根据使用新版本的用户反馈再确定新版上线


- A/B 测试——A与B同时上线。根据两个版本的用户反馈决定新版上线
- 服务降级——整体资源不够了，先将某些暂时不需要服务先关掉
- 服务熔断——过载保护，停用某服务
- 服务发现
  - 服务注册——服务提供者注册
  - 服务订阅——服务调用者订阅，订阅需要xxx提供什么服务

{{site.data.alerts.end}}

### 平台层面

平台提供以应用为中心的CI/CD流程，多类型应用集成，服务高可用保证，服务伸缩，应用日志聚集等平台级功能。保障了微服务的快速部署，高效管理。
