---
title: 服务路由，灰度发布，A/B测试
summary: 服务路由，灰度发布，A/B测试
toc: true
toc_not_nested: false
asciicast: true
---

### 服务路由

服务消费者通过服务名称，在众多服务中找到要调用的服务的地址列表，称为服务的路由。而对于负载较高的服务来说，往往对应着由多台服务器组成的集群。在请求到来时，为了将请求均衡地分配到后端服务器，负载均衡程序将从服务对应的地址列表中，通过相应的负载均衡算法和规则，选取一台服务器进行访问，这个过程成为服务的负载均衡。

Rainbond默认的代理插件支持4层负载均衡，借助Service Mesh便于扩展得特性，我们可以再针对各种应用层协议匹配不同的网络治理插件，实现7层负载均衡，例如HTTP、gRPC、Redis等协议。Rainbond目前提供“基于envoy的7层网络治理插件”（envoy本身可以与安生运行于Rainbond插件体系之中），我们的插件是可拔插可替换的，你可以根据需求和自己的业务来选择和实现其他插件，Rainbond运行时将提供完善的基础服务。 

通过安装我们提供的` 服务网络治理插件 `，使你可以快速的为下游应用配置路由信息，并使用它来执行高级路由任务。这对于处理边缘流量（传统的反向代理请求处理）以及构建服务间的网格（通常是通过主机/授权 HTTP 头的路由到达特定的上游服务集群）非常有用。详情可参见[ServiceMesh微服务架构电商案例](/docs/stable/microservice/service-mesh/use-case.html)。在此案例中，服务之间的调用原本走的是域名调用方式，可以将调用多个应用的服务通过配置` 服务网络治理插件 ` 路由到具体的服务而不用改变原有的代码。实现无侵入的修改。



###  使用插件


首先需要你在`我的插件`中安装插件`服务网络治理插件`，然后在您的上游应用中`插件`一栏中开通此插件。
<img src="https://static.goodrain.com/images/article/sockshop/service-plugin-install.png" style="border:1px solid #eee;width:100%">

* **配置路由信息说明**


    **DOMAINS**：内网请求域名配置，基于配置的域名转发至下游应用，仅支持一级域名，应用内部的调用则为`http://newinfo/xxx`的形式

    **PREFIX**：URL前缀path配置，例如/api

    **HEADERS**：HTTP请求头设置，多个参数以`**`;分隔

    **WEIGHT**：转发权重设置，范围1~100。规定相同的DOMAINS与PREFIX组合情况下，权重总和为100。数值越大，权重越高。
    
    如图所示sockshop微服务案例中，其中 `front-end`服务调用下游的catalogue服务，为了说明插件功能，这里开启了2个`catalogue`服务，它们功能相似但不相同，类似于我们产品的先后不同版本。
    
    <img src="https://static.goodrain.com/images/article/20180904/meshdemo.png" style="border:1px solid #eee;width:100%">
    
    服务`front-end` 配置插件
    <img src="https://static.goodrain.com/images/article/20180904/net_plugin_config.png" style="border:1px solid #eee;width:100%">
    
如上配置完成后，服务调用下游服务时，使用 `catalogue`作为域名的调用请求会调用到依赖的下游应用`catalogue`和`catalogue_new`中。其中`catalogue`服务所占权重为1，而`catalogue_new`服务所占权重为99，则对于front-end调用的请求（此处没有额外设置请求头`headers`和请求路径）。从上图的线条也能看出调用的比重关系。




### 灰度发布和A/B测试

灰度发布主要是按照一定策略选取部分用户，让他们先行体验新版本的应用，通过收集这部分用户对新版本应用的反馈，以及对新版本功能、性能、稳定性等指标进行评论，进而决定继续放大新版本投放范围直至全量升级或回滚至老版本。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度。灰度发布的优点大概有体现在以下几点：

- 提前获得目标用户的使用反馈
- 根据反馈结果，做到查漏补缺
- 发现重大问题，可回滚“旧版本”
- 补充完善产品不足
- 快速验证产品的 idea

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/selector.png" style="border:1px solid #eee;width:100%">

A/B测试提供了一个有价值的方式来评估新功能对客户行为的影响。 运行网站和服务的A/B测试实验能力，从而可以用更科学方法来评估规划过程中不同阶段的想法价值。

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/ab.jpg" style="border:1px solid #eee;width:100%">



#### 使用

您可以通过配置各下游应用的`DOMAINS`与`PREFIX`相同的情况下，给`WEIGHT(权重值)`参数分配不同的数值来控制各下游应用的流量转发，流量会按照你各下游应用权重值的占比来进行流量切分，比如您可以先让一部分用户体验到新版本的功能，以此来实现灰度发布的功能，通过对新版本的观察，进而决定继续全量升级或回滚应用。 

如上的案例：
如果对于`catalogue_new`服务，我们可以先设置其权重为1，而原有的服务`catalogue`的权重为99，则在运行的过程中会有1%的流量使用`catalogue_new`服务，等待长时间后，如果服务没有异常，可以慢慢扩大新服务的权重，减小旧服务的权重，直至`catalogue_new`的权重为100%，而就服务的权重为0。从而实现了新版服务的灰度发布过程。

对于A/B测试可以通过给特定的用户访问特定的路径或者在请求头中加入特定的参数来让不同的用户访问不同的服务来实现A/B测试。为了进行A/B测试，需要再业务层面进行特殊设置。从而保证特定的不同用户使用不同的服务。



### 其他

关于服务网络治理插件中的其他参数与作用，我们将在[熔断,限流](/docs/stable/microservice/service-mesh/fuse-limiting.html) 一篇中为你解答。

