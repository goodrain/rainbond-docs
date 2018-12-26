---
title: 初始化数据中心
summary: 初始化数据中心
toc: true
---

## 一、 概述

一个完整的数据中心，理应在具备Rainbond完整功能的同时，兼顾高可用性、性能等方面的考虑。

|特性|说明|
|----|----|
|架构选择|通过调整部署结构，搭配Keepalived等HA方法实现|
|集群管理|至少一个Rainbond管理节点|
|计算资源|至少一个计算节点提供资源|
|应用全局负载均衡|rbd-gateway组件或商业级软硬件负载均衡|
|分布式存储|在存储层面提高可用性|
|全局监控|针对节点或应用的专业级监控、报警|
|资源管理后台|方便管理人员使用的可视化资源管理后台|

## 二、 选择合适的部署结构

在这一步，用户需要根据自己的实际情况，选择一种合适自己的部署结构。考虑因素包括：手中有多少节点可以用于部署Rainbond；对于高可用特性是否有较高的依赖。

- 针对一般用户，尤其对高可用性要求不高的用户，我们推荐安装单节点Rainbond，文档参考 [单机部署](../getting-started/online-installation.html)

- 也可以选择部署具备应用级高可用性的 [三节点高可用部署方案](cluster-management/three-nodes-deployment.html)

- 我们还提供了，实现管理节点高可用的 [五节点高可用部署方案](cluster-management/five-nodes-deployment.html)

## 三、 部署Rainbond基础集群

无论用户选择了哪一种部署结构，首要的一步，是安装好一套基础的Rainbond平台。这包括了首个管理节点的安装，以及后续节点的扩容。

1.初始化首个管理节点

参考 [平台安装](../getting-started/online-installation.html)

2.扩容节点

参考 [扩容节点](cluster-management/add-node.html)

## 四、 应用全局负载均衡

应用全局负载均衡，提供了应用访问的入口。在5.0版本，我们通过 `rbd-gateway` 组件，代替了原有的 `rbd-lb`、`rbd-entrance`。除了性能上的优化，更提供了许多高级的路由功能。

1.了解 [应用网关](/docs/v5.0/user-manual/gateway/traffic-control.html)

2.未来Rainbond考虑支持更专业的商业级软硬件负载均衡（v3.7.2已支持）

## 五、 分布式存储

在存储层面提高可用性的一个很好的手段就是提供分布式存储。Rainbond默认使用 `NFS` 为集群提供共享存储，但是可以对接支持NFS协议的多种分布式存储（如Glusterfs、NAS），以及在企业版可以对接Ceph块存储设备。

1.了解 [glusterfs及其对接方式](storage/GlusterFS/introduce.html)

2.支持NAS、以及Ceph，请咨询好雨科技工程师

## 六、 全局监控

Rainbond支持一套完整的监控、报警系统，基于Prometheus+Granfana+Alertmanager实现，详情参阅 [监控](monitor/monitor.html)、[报警](monitor/alerting.html)

## 七、 资源管理后台

**Rainbond企业版** 提供资源管理后台，该后台在图形化界面集成多种功能，可以完成对集群底层资源的管理、节点管理、数据中心管理、团队管理等多种功能。简单直观易用，极大提升集群运维效率。