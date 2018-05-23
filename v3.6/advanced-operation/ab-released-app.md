---
title: 应用A/B测试方案
summary: 云帮应用A/B测试操作方案详解
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>




## 功能说明

对照实验，也叫随机实验和A /B测试。在软件开发中，产品需求通过多种技术手段来实现。 A/B测试实验提供了一个有价值的方式来评估新功能对客户行为的影响。 运行网站和服务的A/B测试实验能力，从而可以用更科学方法来评估规划过程中不同阶段的想法价值。一屋子人拍桌子瞪眼的争辩到底哪个设计好？哪个文案好？哪个执行策略有效，还不如让真实的用户和数据来告诉你答案。

Rainbond默认的代理插件支持4层负载均衡，借助Service Mesh便于扩展得特性，我们可以再针对各种应用层协议匹配不同的网络治理插件，实现7层负载均衡，例如HTTP、gRPC、Redis等协议。Rainbond目前提供“基于envoy的7层网络治理插件”（envoy本身可以与安生运行于Rainbond插件体系之中），用户也可以选择和实现其他插件，Rainbond运行时将提供完善的基础服务。目前我们平台仅支持内部应用A/B测试，您可以通过Rainbond`服务网络治理插件`配置管理来实现您应用的A/B测试。


<center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/ab.jpg" style="border:1px solid #eee;width:60%"/></center>

## 服务依赖

应用依赖信息，表明了当前应用都依赖了哪些其他应用。通过添加依赖，可以让当前应用读取被依赖应用的连接信息，通过这些连接信息，您的应用会自动与被依赖应用互动，为您提供相应的服务。您可以在应用中点击`依赖`板块添加`应用链接信息`。通过键值对的方式，将环境变量写入实例的系统环境中，供进程读取和调用。

应用依赖信息表明了当前应用都依赖了哪些其他应用。通过添加依赖，可以让当前应用读取被依赖应用的连接信息，通过这些连接信息，您的应用会自动与被依赖应用互动，为您提供相应的服务。
<center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/general.jpg" style="border:1px solid #eee;width:60%"/></center>
<center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/rely.jpg" style="border:1px solid #eee;width:60%"/></center>




## 配置操作


首先在`团队插件`中安装`服务网络治理插件`，在您的上游应用中开通此插件，配置您的下游应用及参数设置来灵活的管理您的下游应用，比如您可以设置`HEADERS`的值，根据请求头中的参数来决定此次请求应该分流到哪个具体的个下游应用中，以此来实现您的A/B测试功能。
<center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/extended.jpg" style="border:1px solid #eee;width:60%"/></center>
<center><img src="http://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/config.jpg" style="border:1px solid #eee;width:60%"/></center>

- PREFIX：URL前缀path配置，例如/api
- DOMAINS：内网请求域名配置，基于配置的域名转发至下游应用，仅支持一级域名
- WEIGHT：转发权重设置，范围1~100。规定相同的DOMAINS与PREFIX组合情况下，权重总和为100。数值越大，权重越高。
- HEADERS：HTTP请求头设置，多个参数以;分隔，您可以根据请求头中的参数不同来决定去请求哪个下游应用
- LIMITS：TCP限速，设值值为0则熔断
- MaxPendingRequests：HTTP最大挂起请求数，设置值为0则挂起
- MaxRequests：在任何给定时间，可以处理的最大请求数
- MaxConnections：最大连接数，为上游群集中的所有主机建立的最大连接数
- MaxEjectionPercent：最大降级节点百分比，比如您有十个节点，最大降级节点单百分比为20%，那么最大降级节点为2
- ConsecutiveErrors：连续错误降级阀值。当下游服务错误率到达一个阀值，将上游请求快速失败返回，保护上游服务稳定，同时又不给下游服务增加压力，做到快速失败、快速返回。
- MaxActiveRetries：可以执行的最大重试次数，达到设置值请求将被熔断
- IntervalMS：被逐出后多少秒(s)后自动重新投入使用
- BaseEjectionTimeMS：降级基准时间(ms)，主机被逐出几毫秒。意味着主机被标记为不健康，在负载平衡期间不会使用，除非负载平衡器处于紧急情况。毫秒数等于BaseEjectionTimeMS值乘以主机被逐出的次数。这会导致主机如果继续失败，则会被逐出更长和更长的时间。



> 说明

> 权重：权重是一个相对的概念，针对某一指标而言。某一指标的权重是指该指标在整体评价中的相对重要程度。权重是要从若干评价指标中分出轻重来，一组评价指标体系相对应的权重组成了权重体系。
>
> 依赖服务治理中未指明其他内部域名与前缀关系的权重，则访问其他接口不受权重影响
>
> LIMITS与MaxPendingRequests需根据依赖服务开放端口类型来进行配置。此处user-api*的开放端口类型为HTTP，那么此处可设置MaxPendingRequests来进行HTTP挂起功能。若设MaxPendingRequests为0，则挂起
>
> HTTP类型应用，配置LIMITS不受影响
