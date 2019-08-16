---
title: 基于Rainbond实现服务熔断和全局限流
Description: "Rainbond网络治理插件，服务熔断与全局限流"
hidden: true
---

<div id="toc"></div>

#### 概述

  本文档讲述基于Rainbond⽹络治理插件，实现服务熔断，全局限流的原理、思路、及具体方式。
  
  
### 一. ⽹络治理插件

>5.1.5版本后，Rainbond默认提供了综合网络治理插件（同时处理入站和出站网络）和出站网络治理插件两个插件可用。

####   Rainbond⽹络治理插件界面

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/01.png" width="100%">

#### 1.1 服务网络治理插件-出站治理

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/02.png" width="40%">

UI服务安装了服务⽹络治理插件，该插件作⽤于流量的出⼝，即通向API服务的⼀端。出站治理插件会接⼿管理流向API服务的流量，并可以配置条件，实现熔断。

#### 1.2 服务综合网络治理插件-出⼊站共治

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/04.jpeg" width="80%">

 服务综合⽹络治理插件，是出站治理插件的升级版本。兼容原有功能之余，新增了⼊站治理功能；同时实现了入站方向的治理和出站方向的治理。
 
 更多关于网络治理插件说明请参阅 [SERVICEMESH网络治理插件说明](/user-manual/plugin-manage/mesh-plugin/)
### 二. 服务熔断

>服务熔断，是⼀种保护**下游服务**（UI服务）的机制。

 当来⾃UI的请求堆积于上游服务（API服务），超越了API服务的处理能⼒的时候。
熔断机制会发⽣作⽤，让UI服务去请求其他可⽤的API服务。总之不要在已经被熔断
的API服务这⾥等待回应。

**作用**：

可以避免UI服务中其他进程，因为请求API服务没有响应，⽽发⽣堆积，最终撑爆UI服务本身。服务熔断只作⽤于指定的**下游服务**。

#### 服务熔断实践

**实验目的：**对todoshow出站方向实现服务熔断

**实验环境：**

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/05.png" width="100%">

**实验配置：**


<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/06.png" width="100%">

```
 关键参数：
• MaxConnections #最⼤连接数，Http协议时仅适⽤于http1.1，TCP协议时设置最⼤TCP连接数。
• MaxRequests    #并发请求数，适⽤于HTTP协议
• MaxPendingRequests #最⼤等待请求数，适⽤于HTTP协议
• MaxActiveRetries   #最⼤重试次数，适⽤于HTTP协议
• MaxRequestsPerConnection #单连接最⼤请求数，适⽤于HTTP协议，⽀持http1.1 和http2 
```

  *在入站出站都可以做熔断策略；不同点是在入站做熔断时，所有外部请求访问时都会受到限制，具有全局性特性；而在出站做熔断时，只针对下游应用，适合拥有很多下游应用去针对不同应用做不同配置。*

**实验原理：**  

1. 在todoshow应用中配置服务综合网络治理插件；  
2. 使用Apache JMeter测试工具向todoshowUI应用发起并发性请求；触发熔断，返回503状态码（由网络综合治理插件返回）。

- 查看返回503状态码

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/07.png" width="100%">

- 可以看出来熔断机制生效，60%的请求被熔断掉。

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/08.png" width="100%">


### 三. 全局限流

>全局限流，是⼀种保护**上游服务**（API服务）的机制；是基于服务综合网络治理插件实现，作用在入站治理。

当来⾃UI服务的请求，超越API服务的处理能⼒。限流机制会发⽣作⽤，全局限流可以对访问到API服务的所有流量进⾏限制。

**作用**：

可以保证进⼊到API服务的流量始终保持⼀个合适的值，防⽌了API服务因为请求过量⽽被撑爆。限流时可以⽤IP作为限流条件，从⽽实现⿊/⽩名单功能。需要借助**第三⽅服务**实现。


#### 全局限流实践

使用第三方服务[Ratelimit](https://github.com/lyft/ratelimit)，构建镜像，底层依赖的redis，可直接从应用市场安装。

- ratelimit环境配置

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/ra01.png" width="100%">

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/ra02.png" width="100%">

**Rate-limit需持久化挂载目录，方便在持久化目录里写规则**

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/ra03.png" width="100%">

进入rate-limit容器里查看配置

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/ra04.png" width="100%">

开启限流

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/09.png" width="100%">

```
关键参数：
• OPEN_LIMIT  #开启全局限流功能，全局限流功能依赖于第三⽅的限流服务，⽐如ratelimit, 当前服务需要依赖ratelimit服务，并设置RATE_LIMIT_SERVER_HOST和RATE_LIMIT_SERVER_PORT环境变量
• LIMIT_DOMAIN  #限流链路的domain key,与全局限流服务的配置对应
```

- 使用Apache JMeter测试工具向todoshowUI应用发起并发性请求；触发限流，返回429状态码，说明限流生效。

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/service-fuse-current-limitation/10.png" width="100%">

### 高阶实现

##### 当前架构缺点

配置了服务网络综合治理插件以后，当前服务就不再支持websocket，这也是我们下一步更新的突破点，如果有用户实现了这种优化，欢迎将其分享到应用市场中，供更多的人来使用。