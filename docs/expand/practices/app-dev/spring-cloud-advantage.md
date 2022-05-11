---
title: 'Spring Cloud 微服务部署在 Rainbond 的优势'
description: '讲解传统springcloud微服务为何要部署在Rainbond'
---

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

> 了解服务管理的详情，请参见文档： [服务组件管理](/docs/use-manual/component-manage/overview/basic-operation)

### 性能监控

Rainbond 支持插件扩展方式的性能监控方案，支持对基于 Http、Mysql 协议的应用进行 `平均响应时间、吞吐率、在线人数` 的监控。并检测最近 5 分钟内耗时做多的 url 排行，对于调试系统性能有指导作用：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-1.png" title="性能监控" width="100%" />

> 了解性能监控的详情，请参见文档： [性能监控](/docs/use-manual/team-manage/plugin-manage/tcm-plugin/)

### 垂直/水平伸缩

Rainbond 支持一键进行伸缩，这种伸缩包含两个层面：

- 垂直伸缩：伸缩单个服务组件所使用的内存大小
- 水平伸缩：为服务组件启动多个后端实例，并自动配置负载均衡

Spring Cloud 微服务设计已经将程序与数据分离，所以将服务组件视作无状态服务直接进行水平伸缩进行快速扩容，达成的效果如下：

- 单个服务组件伸缩只需要一键

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-2.png" title="水平伸缩多实例" width="100%" />

- 多实例服务组件在拓扑图中相应表现

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-3.png" title="水平伸缩多实例" width="100%" />

- 注册中心正常注册

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-4.png" title="注册中心服务发现" width="100%" />

### 基于共享库的快速部署

得益于 Rainbond 独有的共享库机制，在首次部署完成后，我们可以将整套 Spring Cloud 微服务（包括所有微服务组件以及数据库等中间件）打包作为应用模版发布到共享库中去。发布完成后，再次安装只需要从共享库一键安装，极大的简化了部署流程。

在首次部署 Spring Cloud 的过程中，对所使用的诸如 Mysql Redis Rabbit 等中间件，Rainbond 公有云市提供了制作好的市场应用，可供拉取后一键安装。免除了传统部署中搭建各种中间件的麻烦。

> 了解应用市场详情，请参见文档：[共享库](/docs/use-manual/enterprise-manage/appcenter/add-app)
