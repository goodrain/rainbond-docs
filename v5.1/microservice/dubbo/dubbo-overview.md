---
title: Dubbo概述
summary: 讲解Dubbo框架
toc: false
toc_not_nested: true
asciicast: true
---
<div class="filters filters-big clearfix">
    <a href="dubbo-overview.html"><button class="filter-button current"><strong>1.Dubbo概述</strong></button></a>
    <a href="dubbo-demo-construction.html"><button class="filter-button">2.Dubbo示例</button></a>
    <a href="dubbo-deploy.html"><button class="filter-button">3.部署到云帮</button></a>
</div>

<div id="toc"></div>

Dubbo是Alibaba开源的分布式服务框架，它最大的特点是按照分层的方式来架构，使用这种方式可以使各个层之间解耦合（或者最大限度地松耦合）。从服务模型的角度来看，Dubbo采用的是一种非常简单的模型，要么是提供方提供服务，要么是消费方消费服务，所以基于这一点可以抽象出服务提供方（Provider）和服务消费方（Consumer）两个角色。关于注册中心、协议支持、服务监控等内容，详见后面描述。

## Dubbo架构

<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-overview1.jpg" width="60%"/>

### 说明

| 节点        | 角色说明                |
| --------- | ------------------- |
| Provider  | 暴露服务的服务提供方          |
| Consumer  | 调用远程服务的服务消费方        |
| Registry  | 服务注册与发现的注册中心        |
| Monitor   | 统计服务的调用次数和调用时间的监控中心 |
| Container | 服务运行容器              |

### 调用关系

1. 服务容器负责启动，加载，运行服务提供者。
2. 服务提供者在启动时，向注册中心注册自己提供的服务。
3. 服务消费者在启动时，向注册中心订阅自己所需的服务。
4. 注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。
5. 服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。
6. 服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。

Dubbo 架构具有以下几个特点，分别是连通性、健壮性、伸缩性、以及向未来架构的升级性。

## 特点

### 连通性

- 注册中心负责服务地址的注册与查找，相当于目录服务，服务提供者和消费者只在启动时与注册中心交互，注册中心不转发请求，压力较小
- 监控中心负责统计各服务调用次数，调用时间等，统计先在内存汇总后每分钟一次发送到监控中心服务器，并以报表展示
- 服务提供者向注册中心注册其提供的服务，并汇报调用时间到监控中心，此时间不包含网络开销
- 服务消费者向注册中心获取服务提供者地址列表，并根据负载算法直接调用提供者，同时汇报调用时间到监控中心，此时间包含网络开销
- 注册中心，服务提供者，服务消费者三者之间均为长连接，监控中心除外
- 注册中心通过长连接感知服务提供者的存在，服务提供者宕机，注册中心将立即推送事件通知消费者
- 注册中心和监控中心全部宕机，不影响已运行的提供者和消费者，消费者在本地缓存了提供者列表
- 注册中心和监控中心都是可选的，服务消费者可以直连服务提供者

### 健状性

- 监控中心宕掉不影响使用，只是丢失部分采样数据
- 数据库宕掉后，注册中心仍能通过缓存提供服务列表查询，但不能注册新服务
- 注册中心对等集群，任意一台宕掉后，将自动切换到另一台
- 注册中心全部宕掉后，服务提供者和服务消费者仍能通过本地缓存通讯
- 服务提供者无状态，任意一台宕掉后，不影响使用
- 服务提供者全部宕掉后，服务消费者应用将无法使用，并无限次重连等待服务提供者恢复

### 伸缩性

- 注册中心为对等集群，可动态增加机器部署实例，所有客户端将自动发现新的注册中心
- 服务提供者无状态，可动态增加机器部署实例，注册中心将推送新的服务提供者信息给消费者

### 升级性

当服务集群规模进一步扩大，带动IT治理结构进一步升级，需要实现动态部署，进行流动计算，现有分布式服务架构不会带来阻力。下图是未来可能的一种架构：

<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-overview2.jpg" width="60%"/>

#### 节点角色说明

| 节点         | 角色说明                |
| ---------- | ------------------- |
| Deployer   | 自动部署服务的本地代理         |
| Repository | 仓库用于存储服务应用发布包       |
| Scheduler  | 调度中心基于访问压力自动增减服务提供者 |
| Admin      | 统一管理控制台             |
| Registry   | 服务注册与发现的注册中心        |
| Monitor    | 统计服务的调用次数和调用时间的监控中心 |

## 其他微服务架构支持
- [SpringCloud](https://www.rainbond.com/docs/stable/microservice/spring-cloud/spring-cloud.html)
- [Dubbo](https://www.rainbond.com/docs/stable/microservice/dubbo/dubbo-deploy.html)
- [API Gateway(Kong)](https://www.rainbond.com/docs/stable/microservice/kong/kong.html)