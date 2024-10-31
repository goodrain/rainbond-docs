---
title: 性能分析
description: Rainbond组件性能分析功能解读
---

组件实时性能分析功能依赖于组件开通性能分析类插件完成。 Rainbond 目前默认提供了支持 HTTP 协议和 Mysql 协议的性能分析插件供用户使用。

## 组件性能分析

我们将所有类型的组件的性能情况用三个指标来衡量：

- 响应时间

响应时间也称为延迟，组件一般工作于网络通信的应用层，比如 http、mysql、redis、grpc 等。组件每次处理一次客户端请求的用时即响应时间。如果我们从网络报文的维度来衡量的话即请求报文第一个包到达到响应报文的第一个包发出中间的时间。

- 吞吐率

吞吐率也称为通讯量，即组件在单位时间内处理请求的次数。

- 错误率

错误有显性错误（比如 HTTP 500 错误）和隐性错误（比如 HTTP 返回 200 然而业务是错误的），这里我们主要关注显形错误，每一种通信协议都有标准的错误类型，比如 mysql 有查询语句错误。错误率正常情况下与组件的饱和度有密切关系。

综上所述，实现性能分析时我们有两种思路，一种是在 ServiceMesh 网络中，代理端会根据不同的协议汇报三类指标，第二种是目前使用的方式，性能分析插件通过旁路的方式监听组件的网络通信，从而直接分析组件上述指标。

## 监控效果

性能分析数据持久化的存储于 Rainbond monitor 组件中，供给客户端查询。在组件监控页面中，我们除了展示监控历史数据以为，还实时的展示 http 和 mysql 的请求情况，比如 mysql 请求的 sql 语句执行情况。这对于用户进行精细化挑优提供了一个直接的指引。

![](https://static.goodrain.com/docs/5.6/use-manual/component-manage/monitor/performance-analysis.png)



## 操作步骤

安装性能分析插件并开通。

![](https://static.goodrain.com/docs/5.6/use-manual/component-manage/monitor/open-plugin.png)

开通插件之后，更新/重启组件即可生效。

## 更多的协议支持

TODO 列表中我们计划支持 grpc 协议、redis 协议、mongodb 协议的性能分析。
