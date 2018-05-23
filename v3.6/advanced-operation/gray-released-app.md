---
title: 应用灰度发布方案
summary: 云帮应用灰度发布操作方案详解
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>




## 功能说明

灰度发布主要是按照一定策略选取部分用户，让他们先行体验新版本的应用，通过收集这部分用户对新版本应用的反馈，以及对新版本功能、性能、稳定性等指标进行评论，进而决定继续放大新版本投放范围直至全量升级或回滚至老版本。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度。灰度发布的优点大概有体现在以下几点：

1. 提前获得目标用户的使用反馈
2. 根据反馈结果，做到查漏补缺
3. 发现重大问题，可回滚“旧版本”
4. 补充完善产品不足
5. 快速验证产品的 idea

我们云帮支持通过简单的配置帮您实现灰度发布的需求。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/selector.png" style="border:1px solid #eee;width:80%"/></center>


## 应用连接

应用依赖信息，表明了当前应用都依赖了哪些其他应用。通过添加依赖，可以让当前应用读取被依赖应用的连接信息，通过这些连接信息，您的应用会自动与被依赖应用互动，为您提供相应的服务。您可以在应用中点击`依赖`板块添加`应用链接信息`。通过键值对的方式，将环境变量写入实例的系统环境中，供进程读取和调用。

应用依赖信息表明了当前应用都依赖了哪些其他应用。通过添加依赖，可以让当前应用读取被依赖应用的连接信息，通过这些连接信息，您的应用会自动与被依赖应用互动，为您提供相应的服务。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/general.jpg" style="border:1px solid #eee;width:80%"/></center>

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/rely.jpg" style="border:1px solid #eee;width:80%"/></center>


## 配置操作


首先在您的团队`团队插件`中安装`服务网络治理插件`，在需要灰度发布的应用中部署服务，在您的上游应用中开通此插件，添加下游应用并配置它们的参数信息。您可以通过各下游应用的`DOMAINS`与`PREFIX`相同的情况下，给`WEIGHT(权重值)`参数分配不同的数值来控制流量的转发，实现灰度发布的功能，通过对新版本的观察，进而决定继续全量升级或回滚应用。

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/extended.jpg" style="border:1px solid #eee;width:80%"/></center>

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/advanced-operation/config.jpg" style="border:1px solid #eee;width:80%"/></center>

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
> LIMITS与MaxPendingRequests需根据依赖服务开放端口类型来进行配置。此处user-api\*的开放端口类型为HTTP，那么此处可设置MaxPendingRequests来进行HTTP挂起功能。若设MaxPendingRequests为0，则挂起
>
>  HTTP类型应用，配置LIMITS不受影响
