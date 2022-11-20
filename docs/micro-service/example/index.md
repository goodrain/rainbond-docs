---
title: 'Spring Cloud 微服务部署示例'
keywords:
- Spring Cloud 微服务部署在 Rainbond 的优势
- Spring Cloud 微服务与 Rainbond 的融合
- 部署 Spring Cloud 微服务 Pig
---

本系列文档介绍如何在 Rainbond 上部署 Spring Cloud 微服务的优势以及如何融合，包括部署示例教程。

## Spring Cloud 微服务部署在 Rainbond 的优势
### 概述

目前很多公司已经拥有了基于 Spring Cloud 微服务框架开发的业务系统。作为老牌成熟的微服务架构，Spring Cloud 微服务框架为企业业务开发提供了诸多好处。
我们不用去探讨这些好处是什么， Spring Cloud 巨大的市场应用基数已经指明了它的价值。但是它是否是完美无瑕，再无可补足之处呢？世界上没有完美的产品， Spring Cloud 也是如此，以下这些缺点亟待完善：

- 单个组件没有办法很好的管理
- 难以找到性能监控的方案
- 难以灵活的伸缩以适应业务并发
- 部署起来比较麻烦，包括微服务组件本身以及相关的数据库、中间件

针对以上 4 点，Rainbond 平台可以进行天然的补足。

### 支持单个组件的全生命周期管理

Rainbond 会把 Spring Cloud 的每个微服务组件单独看待，并可以针对每个组件进行深度的管理，比如：

- 开启、关闭、重启、构建、删除、滚动更新、版本回滚
- 性能监控
- 日志管理
- 垂直/水平伸缩
- 基于依赖关系的服务发现与注册
- 持久化存储以及服务组件间的共享存储
- 端口设置以及域名配置
- 插件扩展
- 构建源设置，包括 MAVEN 各种详细参数的设置、配置自动触发构建机制
- 自定义环境变量配置、健康检测机制、权限管理

### 性能监控

Rainbond 支持插件扩展方式的性能监控方案，支持对基于 Http、Mysql 协议的应用进行 `平均响应时间、吞吐率、在线人数` 的监控。并检测最近 5 分钟内耗时做多的 url 排行，对于调试系统性能有指导作用。
### 垂直/水平伸缩

Rainbond 支持一键进行伸缩，这种伸缩包含两个层面：

- 垂直伸缩：伸缩单个服务组件所使用的内存大小
- 水平伸缩：为服务组件启动多个后端实例，并自动配置负载均衡

Spring Cloud 微服务设计已经将程序与数据分离，所以将服务组件视作无状态服务直接进行水平伸缩进行快速扩容。

### 基于应用市场的快速部署

得益于 Rainbond 独有的共享库机制，在首次部署完成后，我们可以将整套 Spring Cloud 微服务（包括所有微服务组件以及数据库等中间件）打包作为应用模版发布到共享库中去。发布完成后，再次安装只需要从共享库一键安装，极大的简化了部署流程。

在首次部署 Spring Cloud 的过程中，对所使用的诸如 Mysql Redis Rabbit 等中间件，Rainbond 公有云市提供了制作好的市场应用，可供拉取后一键安装。免除了传统部署中搭建各种中间件的麻烦。

## Spring Cloud 微服务与 Service Mesh 的融合
### 概述

Rainbond 原生支持 Service Mesh 微服务架构。也就是说，无论原来是什么，只要部署在 Rainbond 上，那么就天然的成为了 Service Mesh 微服务。这也是 Service Mesh 微服务架构的一大特点：对原应用无侵入。

Spring Cloud 部署在 Rainbond 上后，整套业务即是完整的 Spring Cloud 微服务，又是一套 Service Mesh 微服务。那么如何使业务系统即保留了原有 Spring Cloud 微服务架构的特点，又能享受到 Service Mesh 带来的种种好处呢？这就涉及到了Spring Cloud 微服务与 Service Mesh 的融合。

融合的核心思想，就是 Spring Cloud 框架维护的功能，保持不变； Spring Cloud 框架无法维护的功能，交给 Service Mesh 和 Rainbond。

### Spring Cloud 不维护什么

我不会去深入讨论 Spring Cloud 微服务框架都维护了什么，这样的帖子网上有很多。

在这里，我想说明的是，当读者选择将自己原有的 Spring Cloud 微服务部署在 Rainbond 时，有哪些工作应该由 Rainbond 来完成。

#### 向 Nacos 的注册

Nacos 注册中心，是 Spring Cloud 微服务框架中，标准的注册中心解决方案。微服务框架中的 `Service provider(服务提供者)` 将自己的服务地址注册于 Nacos 中，供 `Service consumer（服务消费者）` 远程调用。这种服务注册与发现的机制，是微服务架构中为了将原来的一站式服务拆解为若干个独立的服务并相互解耦，却又能相互交互所设计的。基于这种机制，所有的 Spring Cloud 微服务组件，可以动态的获悉自己需要的 `Service Provider` 的服务地址；也可以摇身一变，将自己注册为 `Service Provider` 对其他组件提供服务。

在 Rainbond 中，可以借助于依赖关系，将微服务组件和 eureka 连接起来，帮助 Spring Cloud 完成注册这一动作：

- Nacos 本身开启端口对内服务，向 Rainbond 平台完成自身 Service Mesh 层的服务注册
- 其它微服务组件通过依赖关系连接 Nacos ，即可在不做任何变更的情况下，完成向 Nacos 的服务注册以及服务订阅

#### 对接各类中间件

一套完整的 Spring Cloud 微服务体系中，必然会采用多种数据中间件。以 PIG 为例，搭配使用 MySQL 作为数据存储、 REDIS 作为缓存。而在 Spring Cloud 中，这类中间件的对接方式也是通过配置文件配置的。并不会在微服务框架中有其它的注册机制。那么同理可以由 Rainbond 的依赖关系来将微服务与服务中间件连接起来。

我们推荐使用 **环境变量** 来定义 **pig-db** **redis** 的连接信息。在配置文件定义，如下:

```yaml
#Mysql相关
jdbc:
  name: ${MYSQL_USER}
  passwd: ${MYSQL_PASSWORD}
  host: ${MYSQL_HOST}
  port: ${MYSQL_PORT}
  database: ${MYSQL_DATABASE}

# Spring 相关
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```
#### 服务组件启动顺序

Spring Cloud 微服务组件的启动顺序是比较重要的，一个组件在所依赖的服务没有启动前自行启动，是可能引起错误的。Spring Cloud 微服务框架本身不会维护服务组件的启动顺序，这一问题可以由 Rainbond 来解决。

Rainbond 支持了基于依赖关系的启动顺序控制。启动先后逻辑为被依赖的服务先启动，只有当前服务所依赖的服务全部正常启动后，才会开始启动流程。

## Spring Cloud 部署示例
```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```