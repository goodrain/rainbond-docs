---
title: Component resource cleanup
description: Delete unnecessary data on the disk to relieve disk pressure
weight: 1003
---

资源清理的目的是: 清理磁盘上无用的数据, 减轻磁盘的压力. 清理的对象主要是, 不再使用的镜像, 已删除组件产生的数据。
清理的数据包括: 源代码, slug 包, 数据库元数据, 日志, 存储和镜像。

### 源代码

在代码检测阶段, 检测完成后会马上清理相应源代码.

### slug 包

源码构建的组件, 在构建成镜像前, 都根据源码会生成一个 slug 包, 这个 slug 包在镜像构建完后就不再需要了, 会马上被清理.
该 slug 包位于 `/grdata/build/tenant/{tenant_id}/slug/{service_id}`, `tenant_id` 和 `service_id` 分别为 租户ID 和 组件ID.

### 数据库元数据

组件的元数据保存在两个数据库中, 分别是 region 和 console. 它们保存了组件的环境变量, 端口, 健康检查, 资源配置 和 网关策略等信息;当你主动发起删除组件的操作时, 这个两个数据库中相应的数据也会被删除掉。

### 日志

日志包括 `事件日志` 和 `容器日志`， `事件日志` 即组件的构建, 启动, 更新, 停止等操作产生的日志; `容器日志` 则是组件运行时 输出到标准输出的日志, 比如访问日志, 报错日志.

事件日志的清理策略是, 保留最近的 `30 个` 和最近 `30 天` 的日志. 而容器日志的策略则是保留最近 7 天的内容.

> 这些日志文件都位于 `/grdata/download/log/` 目录下.

### 存储

存储分为 `本地存储`, `共享存储` 和 `内存文件存储`, 会持久化到磁盘的是本地存储和共享存储, 当在控制台删除他们的时候, 并不会删除他们在磁盘上相应的数据, 仅仅删除其在数据库
中的元数据. 你在控制台中已经看不到该存储了, 其实它还在磁盘上. 对于无状态的组件, 它的持久化文件位于 `/gradata/tenant/{tenant_id}/service/{service_id}/{volume name}` 下;
而对于有状态组件, 它的持久化文件则位于 `/gradata/tenant/{tenant_id}/service/{service_id}/{pod name}/{volume name}` 下.

那么这些存储的持久化数据会在什么时候被删除呢? 答案就是 `删除组件` 时, 当你主动删除了某个组件, 它对应的全部存储的持久化数据都会被删除掉.

### 镜像

镜像的清理由Kubernetes中的kubelet来完成，Kubelet的垃圾回收功能可以清理不再使用的容器和镜像，kubelet对容器进行垃圾回收的频率是每分钟一次，对镜像进行垃圾回收的频率是每五分钟一次。详细内容请查看 [Kubernetes官方文档](https://kubernetes.io/zh/docs/reference/command-line-tools-reference/kubelet/)
