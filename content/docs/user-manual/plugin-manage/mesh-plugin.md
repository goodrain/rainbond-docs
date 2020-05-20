---
title: ServiceMesh网络治理插件说明
description: Rainbond默认安装的ServiceMesh网络治理插件的原理和使用说明
weight: 8007
---

## ServiceMesh网络治理插件

5.1.5版本后，Rainbond默认提供了综合网络治理插件（同时处理入站和出站网络）和出站网络治理插件两个插件可用。 

综合网络治理插件与业务主容器同处一个 Pod 实例中，共享网络资源。作为入站网络治理，该插件可以监听业务主容器分配的端口，拦截入站的业务流量进行限流、断路等处理，再将流量负载到业务服务的实际监听端口之上。也可以作为出站网络治理，在业务服务需要访问上游服务时，通过访问该插件监听的端口，进行流量路由、断路、安全验证等处理，再将流量负载到上游服务的主机之上。
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/mesh-de.png)


## 插件使用实践

### 综合网络治理插件

> 使用前提 1：组件依赖其他组件；2：平台安装了综合网络治理插件。

默认提供的综合网络治理插件基于 envoy 1.13.1 实现，出站方向和入站方向的网络治理都通过 envoy 实现。

开通该插件后，插件会根据组件暴露的端口进行监听，并生成默认 envoy 配置，完成最简单的入站网络治理和出站网络治理。

该插件支持针限流的配置、请求数的配置以及重试次数的配置。以下分入站方向和出站方向两部分介绍该插件支持的配置参数：

##### 入站方向

入站方向将参数归类为`全局限流`和`断流`两部分。

全局限流：

- OPEN_LIMIT

  是否开启全局限流功能，全局限流功能需要依赖于第三方的限流服务。这里拿 [ratelimit](https://github.com/lyft/ratelimit)第三方限流服务举例，此时需要指定环境变量来设置 [ratelimit](https://github.com/lyft/ratelimit) 的服务。通过环境变量 `RATE_LIMIT_SERVER_HOST` 和 `RATE_LIMIT_SERVER_PORT` 共同指定 [ratelimit](https://github.com/lyft/ratelimit) 的服务地址。

- LIMIT_DOMAIN

  限流链路的domain key,与全局限流服务的配置对应

断路：

- MaxConnections

  最大连接数，Http协议时仅适用于http1.1，TCP协议时设置最大TCP连接数。

- MaxRequests

  并发请求数，适用于HTTP协议

- MaxPendingRequests

  最大等待请求数，适用于HTTP协议

- MaxActiveRetries

  最大重试次数，适用于HTTP协议

- MaxRequestsPerConnection

  单连接最大请求数，适用于HTTP协议，支持http1.1 和http2

##### 出站方向

出站方向的参数配置根据上游服务协议不同，支持不同的参数配置。上游组件端口使用非 HTTP 协议时，仅支持设置最大连接数这一个参数。

动态路由（HTTP协议）：

* Domains

  请求域名，对应http协议的上游服务，支持基于域名路由并复用80端口。

* Prefix

  请求Path路径的前缀，支持基于前缀来路由到不同的上游服务。

* Headers

  请求头，基于请求头的路由到不同的上游服务。

* Weight

  权重，基于不同的权重来将流量分发到不同的上游服务。

断路（面向连接）：

- MaxConnections

  最大连接数，Http协议时仅适用于http1.1，TCP协议时设置最大TCP连接数。

- MaxRequests

  并发请求数，适用于HTTP协议

- MaxPendingRequests

  最大等待请求数，适用于HTTP协议

- MaxActiveRetries

  最大重试次数，适用于HTTP协议

- MaxRequestsPerConnection

  单连接最大请求数，适用于HTTP协议，支持http1.1 和http2

断路（面向上游主机）：

- ConsecutiveErrors

  将实例从负载均衡池中剔除，需要连续的错误（HTTP5XX或者TCP断开/超时）次数。默认是5。

- BaseEjectionTimeMS

  最短拒绝访问时长。这个时间主机将保持拒绝访问，且如果拒绝访问达到一定的次数。这允许自动增加不健康服务的拒绝访问时间，时间为 `BaseEjectionTimeMS` * 驱逐次数。格式: `1h/1m/1s/1ms`，但必须大于等于`1ms`。实例被剔除后，至少多久不得返回负载均衡池，默认是 30 秒。单位毫秒。

- MaxEjectionPercent

  服务在负载均衡池中被拒绝访问（被移除）的最大百分比，负载均衡池中最多有多大比例被剔除，默认是 20% 。
  
  > envoy 默认 10% 。

- IntervalMS

  拒绝访问的时间间隔，即在interval（1s）内连续发生1个consecutiveErrors错误，则触发服务熔断，格式是1h/1m/1s/1ms，但必须大于等于1ms。即分析是否需要剔除的频率，多久分析一次，默认10秒。单位毫秒。

### 出站网络治理插件

当服务无需使用入站方向的治理功能时，可只使用出站治理插件，配置参数与综合治理插件的出站方向一致。

