---
title: 熔断，限流
summary: 熔断器与限流
toc: false
toc_not_nested: true
asciicast: true
---

### 概述

引用Hystrix官方的一个例子，假设tomcat对外提供的一个application，其内部依赖了30个服务，每个服务的可用性都很高，为99.99%。那整个applicatiion的可用性就是：99.99%的30次方 ＝ 99.7%，即0.3%的失败率。这也就意味着，每1亿个请求，有30万个失败；按时间来算，就是每个月的故障时间超过2小时。假设一个请求的调用链上面有10个服务，只要这10个服务中有1个超时，就会导致这个请求超时。更严重的，如果该请求的并发数很高，所有该请求在短时间内都被block（等待超时），tomcat的所有线程都block在此请求上，导致其他请求没办法及时响应。

为了解决上述问题，服务熔断的思想被提出来。熔断其实类似日常生活中的“保险丝”，一个用户请求的调用，在微服务内部可能是多个服务之间的连环调用，若其中一个或几个服务产生了系统瓶颈，就会导致超时，这样会阻碍整体调用链的调用进度，从而导致整个系统连接数过多，造成系统瘫痪，那么熔断要做的就是当发现某一服务的错误、超时、负载，达到某一指标时候来拦截后续的请求。当服务产生熔断后，那么就需要对服务进行降级，降级可以立即给用户一个返回，及时的返回空白内容或是错误信息。顾名思义限流就是限制请求的qps，将请求的数量控制在该服务可以接受的范围内。

云帮提供`服务网络治理`插件通过配置各下游应用的参数，来实现微服务治理，并对修改实时生效，不影响业务的正常运行。


### 安装插件

在团队中的`我的插件`中安装`服务网络治理插件`，在上游应用的`扩展`板块中开通此插件，点击查看配置，为你的下游应用配置相应的参数，来实现服务的熔断与限流。

<img src="https://static.goodrain.com/images/article/sockshop/service-plugin-install.png" style="border:1px solid #eee;width:100%">

以[ServiceMesh微服务架构电商案例](/docs/stable/microservice/service-mesh/use-case.html)为例。安装完`服务网络治理插件`后的配置如图。
<img src="https://static.goodrain.com/images/article/20180904/net_plugin_config.png" style="border:1px solid #eee;width:100%">

#### 配置说明

- MaxConnections：调用服务建立的最大连接数。这仅适用于HTTP/1.1，默认1024
- MaxPendingRequests: 最大待处理请求数，默认1024.
- MaxRequests: 在任何给定时间，最大请求数。该参数只适用于HTTP/2，因为HTTP/1.1集群由参数MaxConnections控制。
- MaxActiveRetries: 允许上游服务执行的最大并行重试次数。如果未指定，则默认值为3
- IntervalMS：每次异常值分析扫描的时间间隔，这可能导致新抛出异常以及服务被重新添加到服务集群中。每次扫描会将已经正常的服务添加到服务集群，而发生异常的服务根据其他配置（`ConsecutiveErrors`、`BaseEjectionTimeMS`、`MaxEjectionPercent`）将有可能被逐出集群。
- ConsecutiveErrors：连续错误降级阀值。当下游服务错误率到达配置的指定阀值时，上游服务的请求会快速失败并返回，以保护上游服务稳定，同时又不给下游服务增加压力，做到快速失败、快速返回。
- BaseEjectionTimeMS：降级基准时间(单位/ms)，主机被逐出几毫秒。意味着主机被标记为不健康，在负载均衡期间不会使用，除非负载均衡器处于紧急情况。毫秒数等于BaseEjectionTimeMS值乘以主机被逐出的次数。这意味着主机被降级的次数越多，降级的时间越长。
- MaxEjectionPercent：最大降级节点百分比，比如您有十个节点，最大降级节点单百分比为20%，那么最大降级节点为2


以下图为例

<img src="https://static.goodrain.com/images/article/20180904/front-end-nodes.png" style="border:1px solid #eee;width:100%">

图中`front-end`服务配置了网络治理插件，对于下游服务`catalogue`的配置如上图所示。
在该案例的配置中，上游服务`front-end`与下游服务`catalogue`建立的http请求数最大为1024，如果请求过多会进入待处理队列，而待处理队列的最大值也为1024，由于案例使用的为Http/1.1所以参数`MaxRequests`不起作用。当下游服务catalogue发生异常时，上游服务的重试次数由`MaxActiveRetries`决定。

插件会以`IntervalMS`的时间间隔来检测`catalogue`服务集群，上游服务调用下游服务，如果发生异常次数达到参数`ConsecutiveErrors`的值，则会将上游集群中的服务按照配置值`MaxEjectionPercent`进行降级（服务将不会再调用到下游服务，而是以其他的方式快速返回从而到将的目的），降级时长取决于`BaseEjectionTimeMS`和该服务被降级的次数。

尽管分布式熔断在控制分布式系统中的吞吐量方面通常是非常有效的，但是有时并不是非常有效，所以需要限流。最常见的情况是，大量主机转发请求到少量主机，并且平均请求延迟较低（例如连接到数据库服务器的请求）。如果目标主机被备份，则下游主机将压倒上游集群。在这种情况下，要在每个下游主机上配置足够严格的熔断限制是非常困难的，这样系统将在典型的请求模式期间正常运行，但仍然可以防止系统因发生故障而引发的级联故障。限流是这种情况的一个很好的解决方案。

