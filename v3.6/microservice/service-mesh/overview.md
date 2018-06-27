---
title: Rainbond ServiceMesh架构框架简介
summary: Rainbond ServiceMesh架构框架简介
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 微服务架构
> 微服务架构（Microservices Architecture）是将应用拆分成小业务单元开发和部署，使用轻量级协议通信，通过协同工作实现应用逻辑的架构模式。

### 微服务架构常见架构单元模式

-  聚合模式
<center>
<img width="60%" src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc2.png"></img>
</center>
> 从多个服务的结果聚合到一个聚合服务，最常见的表现是聚合服务是web服务，主要功能是页面表现，后端的服务都是纯业务功能服务，扩展业务只需要增加一个新的后端微服务就可以啦。聚合服务也可以是一个更高层次的组合微服务，增加业务逻辑后进一步发布成一个新的微服务，这符合DRY原则。另外，每个服务都有自己的缓存和数据库。这个模式是最常用模式。

- 代理模式
<center>
<img width="60%" src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc3.png"></img>
</center>
> 代理模式是一种特殊的聚合模式，对外是一个统一的包装，一般做内部接口的代理，对外统一一个接口。代理模式可以仅仅委派请求，也可以进行数据转换工作。

- 共享资源模式
<center>
<img width="60%" src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc4.png"></img>
</center>
> 可实现部分业务的逻辑分离，数据共享。用在一体化架构往微服务架构迁移过程中的过度状态。还可用在两个服务之前有数据一致性要求，通过统一的数据库事物来实现。

- 异步消息模式
<center>
<img width="60%" src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/microservice-etc5.png"></img>
</center>
> 上面的其它模式都是同步的，会阻塞。异步消息模式适合不需要同步的场景，比如任务型服务。


## 微服务架构优点

- 可独立 部署、升级、替换、伸缩
- 高效利用资源
- 故障隔离
- 自由选择开发语言

## 微服务管理挑战

每个服务都需要 独立的 代码管理、版本管理、编译构建、部署到测试环境，部署到生产环境，代码回滚等等事情，如果要有几十个服务要部署，人工管理几乎不可能完成。

- 服务伸缩
> 无状态服务 需要配置 负载均衡和增加节点，有状态服务需要扩充单个服务的资源，如果需要减少资源浪费，需要监控每个服务，还需要减少节点和资源。

- 服务高可用
> 每种服务的高可用策略都不一样，无状态服务相对简单，管理每个有状态服务都是难题。

- 服务容错
> 任何一个服务的可用性都不是 100% 的。在分布式系统中，当我依赖的某个服务不可用的时候，我自身也将不能工作 。如果是一个复杂的分布式系统，会依赖更多服务，任何一个服务不可用的时候，系统自身也将不能工作，再加上网络不稳定的因素，系统自身的可用性将大幅度下降。

- 依赖关系
> 依赖配置文件，如果写在代码中，需要重新部署才能生效，而配置文件还会污染代码。

- 服务监控
> 监控cpu？负载？大量微服务如何同时监控？

## Rainbond微服务支持架构
<center>
<img width="85%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.6/architecture/sm-arh.png"></img>
</center>
微服务架构的支持需要从底层存储与通信到上层的应用层配置全盘考虑，大型的微服务架构是离开不了自动化管理应用的PaaS平台的。Rainbond从硬件层，通信层，平台层实现不同的控制逻辑，既兼容已有的微服务架构，同时提供了完整的ServiceMesh微服务架构实践。包容的架构形式让已有的应用服务化变得可落地。

## ServiceMesh架构
ServiceMesh架构具有以下优点：`最大化透明`,`代码无侵入`,`支持多种开发语言和协议`,`容易规模化和性能优化`,`增量，通过plugin扩展管理功能`,`方便移植`,`兼容性好`。ServiceMesh架构的核心是通过在应用运行实例的网络空间内内置入网络控制层或业务控制层来完成一系列应用治理功能。
<center>
<img width="85%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.6/architecture/mesh.png"></img>
</center>
如下图可知，Rainbond的网络治理插件通过Sidecar的方式在应用的同一个网络命名空间，同一个存储空间，同一个环境变量空间内动态启动第三方插件服务，例如envoy服务，通过与Rainbond应用运行时通信完成从应用空间到平台空间的数据交换，实现平台对应用通信的控制。
<center>
<img width="85%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.6/architecture/sidercar.png"></img>
</center>

## ServiceMesh微服务架构实践
可以这么说，通过Rainbond部署的应用都是微服务，为了达到更好的服务治理，通过下文实践文档快速Get新技能：

- [服务注册](/docs/stable/microservice/service-mesh/regist.html) 

- [服务发现](/docs/stable/microservice/service-mesh/discover.html) 

- [服务路由，灰度发布，A/B测试](/docs/stable/microservice/service-mesh/abtest-backup-app.html) 

- [日志处理](docs/stable/user-manual/view-app-logs.html)  

- [服务监控，性能监控](/docs/stable/microservice/service-mesh/service-per-monitor.html) 

- [断路器,限流](/docs/stable/microservice/service-mesh/fuse-limiting.html) 

- [服务备份、恢复](docs/stable/advanced-operation/backup-app.html) 

- [认证与权限]()

- [动态配置](/docs/stable/microservice/service-mesh/service-config.html) 

- [应用拓扑与编排](/docs/stable/microservice/service-mesh/topology.html) 

- [服务伸缩](/docs/stable/microservice/service-mesh/service-extension.html) 

- [服务通信加密]()

## 其他微服务架构支持
- [SpringCloud](https://www.rainbond.com/docs/stable/microservice/spring-cloud/spring-cloud.html)
- [Dubbo](https://www.rainbond.com/docs/stable/microservice/dubbo/dubbo-deploy.html)
- [API Gateway(Kong)](https://www.rainbond.com/docs/stable/microservice/kong/kong.html)

