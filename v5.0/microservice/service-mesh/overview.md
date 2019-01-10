---
title: Rainbond ServiceMesh架构框架简介
summary: Rainbond ServiceMesh架构框架简介
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 关于微服务架构
[这里描绘了一些微服务的基础知识](/docs/stable/microservice/service-mesh/microservice.html)

## 什么是ServiceMesh
 [ServiceMesh 简史](https://www.goodrain.com/2018/06/25/tech-20180625/)
 一般的字面解释是“服务网格”，作为时下最流行的分布式系统架构微服务的动态链接器，处于服务到服务的通信的专用基础设施层，该层独立于应用程序为服务之间的通信提供轻量级的可靠传递。如果简单的描述的话，可以将它比作是应用程序或者说微服务间的 TCP/IP，负责服务之间的网络调用、限流、熔断和监控，同样使用 ServiceMesh 也就无须关系服务之间的那些原来是通过应用程序或者其他框架实现的事情，比如 Spring Cloud、OSS，现在只要交给 ServiceMesh 就可以了。ServiceMesh的出现主要是由于应用虚拟化技术的发展，例如Kubernetes,Rainbond等项目，大大降低了应用的部署和运维复杂度。
<center>
<img width="100%" src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/microservice/servicemesh-arch.png"></img>
</center>
## 微服务架构对比
<img width="100%" src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/microservice/servicemesh-compare.png"></img>

## 为何使用ServiceMesh
ServiceMesh 并没有给我们带来新功能，它是用于解决其他工具已经解决过的问题，只不过这次是在 Cloud Native 的 kubernetes 环境下的实现。

在传统的 MVC 三层 Web 应用程序架构下，服务之间的通讯并不复杂，在应用程序内部自己管理即可，但是在现今的复杂的大型网站情况下，单体应用被分解为众多的微服务，服务之间的依赖和通讯十分复杂，出现了 twitter 开发的 Finagle、Netflix 开发的 Hystrix 和 Google 的 Stubby 这样的 “胖客户端” 库，这些就是早期的 ServiceMesh，但是它们都近适用于特定的环境和特定的开发语言，并不能作为平台级的 ServiceMesh 支持。

在 Cloud Native 架构下，容器的使用给予了异构应用程序的更多可行性，kubernetes 增强的应用的横向扩容能力，用户可以快速的编排出复杂环境、复杂依赖关系的应用程序，同时开发者又无须过分关心应用程序的监控、扩展性、服务发现和分布式追踪这些繁琐的事情而专注于程序开发，赋予开发者更多的创造性。

## ServiceMesh相对其他微服务架构优势

* 最大层度透明
> ServiceMesh通过全局控制层控制服务与服务之间的调用关系，服务的治理策略。对于服务本身来说，只需要站在单机的维度考虑上游服务的依赖通信，采用简单的通信协议例如HTTP，gRPC等。Mesh层透明的发现上游目标，进行重试/超时、监控、追踪。为单机服务赋予分布式系统能力。

* 学习成本低
> 过去我们要设计搭建一个完整的微服务架构，比如SpringCloud,Dubbo等，免不了需要改变我们传统的编程思想，学习复杂的架构框架，例如SpringCloud,其包含各类组件10余个，基本与服务业务本身没有直接关系。对于大多数业务开发者来说是一个高高的门槛。但是使用ServiceMesh架构，由于其最大化的透明，开发者几乎不需要额外学习与业务无关的框架技术。大大降低了学习成本。

* 架构灵活
> 对于不同的团队组成，可能拥有具有掌握不同开发语言的成员，或者具有成熟的已实现业务系统。如果转变到微服务架构支持更大量级用户，如果使用SpringCloud架构，免不了对系统进行重构甚至重写。面对现实与未来，我们需要逐步落地微服务架构，使用合适的开发语言开发合适的服务，甚至融合多种轻量级架构模式，比如Dubbo,SpringBoot和LNMP架构。

## 性能思考
有人说，在服务与服务之间增加代理对性能会产生较大影响。对于性能问题，我们应该放眼全局。首先，ServiceMesh的网络代理层一般采用轻量级的高效率的代理实现，其本身性能非常优越。为了提供更好的功能支持，通信模型一般处在应用层，比如处理（http,grpc,mongo,mysql）等协议。如果对性能要求比较高，也可以直接使用4层网络模型。最后，ServiceMesh一般面向中大型分布式系统，分布式系统直接本身就会有通信消耗，例如自身通过http/1.1协议通信，mesh层还可以通过http/2协议优化性能。

## ServiceMesh只处理网络么？
ServiceMesh架构框架主要通过治理网络通信提供一系列服务治理功能，对于Rainbond的设计来说，ServiceMesh不仅仅提供网络治理，也包括信息安全、日志处理、数据备份等开箱即用的插件功能。

## Rainbond与ServiceMesh
Rainbond原生提供全量的ServiceMesh治理功能方案，同时提供了插件化得扩展策略，用户除了使用默认方案以外也可以自定义插件实现。Rainbond与Istio的实现有共同点，也有天然的不同。相同点是都实现了全局控制层，不同点是Istio需要依赖Kubernetes等平台工作，微服务架构的支持需要从底层存储与通信到上层的应用层配置全盘考虑，大型的微服务架构是离开不了自动化管理应用的PaaS平台的。Rainbond从硬件层，通信层，平台层实现不同的控制逻辑，既兼容已有的微服务架构，同时提供了完整的ServiceMesh微服务架构实践。包容的架构形式让已有的应用服务化变得可落地。
<center>
<img width="100%" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.6/architecture/sm-arh.png"></img>
</center>

如下图可知，Rainbond的网络治理插件通过Sidecar的方式在应用的同一个网络命名空间，同一个存储空间，同一个环境变量空间内动态启动第三方插件服务，例如envoy服务，通过与Rainbond应用运行时通信完成从应用空间到平台空间的数据交换，实现平台对应用通信的控制。
<center>
<img width="100%" src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/microservice/servicemesh-sidecar.png"></img>
</center>

## ServiceMesh微服务架构实践

可以这么说，通过Rainbond部署的应用都是微服务，为了达到更好的服务治理，通过下文实践文档快速Get新技能：

- [服务注册](/docs/stable/microservice/service-mesh/regist.html) 

- [服务发现](/docs/stable/microservice/service-mesh/discover.html) 

- [服务路由，灰度发布，A/B测试](/docs/stable/microservice/service-mesh/abtest-backup-app.html) 

- [日志处理](/docs/stable/user-manual/view-app-logs.html)  

- [服务监控，性能监控](/docs/stable/microservice/service-mesh/service-per-monitor.html) 

- [断路器,限流](/docs/stable/microservice/service-mesh/fuse-limiting.html) 

- [服务备份、恢复](/docs/stable/advanced-operation/backup-app.html) 

- 认证与权限(TODO)

- [动态配置](/docs/stable/microservice/service-mesh/service-config.html) 

- [应用拓扑与编排](/docs/stable/microservice/service-mesh/topology.html) 

- [服务伸缩](/docs/stable/microservice/service-mesh/service-extension.html) 

- 服务通信加密(TODO)

- 分布式跟踪(TODO)

## 其他微服务架构支持
- [SpringCloud](https://www.rainbond.com/docs/stable/microservice/spring-cloud/spring-cloud.html)
- [Dubbo](https://www.rainbond.com/docs/stable/microservice/dubbo/dubbo-deploy.html)
- [API Gateway(Kong)](https://www.rainbond.com/docs/stable/microservice/kong/kong.html)

