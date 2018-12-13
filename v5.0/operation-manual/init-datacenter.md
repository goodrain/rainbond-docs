---
title: 初始化数据中心
summary: 初始化数据中心
toc: true
---

## 一、 概述

一个完整的数据中心，理应在具备Rainbond完整功能的同时，兼顾高可用性、性能等方面的考虑。

|特性|说明|
|----|----|
|集群管理|至少一个Rainbond管理节点|
|计算资源|至少一个计算节点提供资源|
|高可用性|通过调整部署结构，搭配Keepalived等HA方法实现|
|应用全局负载均衡|rbd-gateway组件或商业级软硬件负载均衡|
|资源管理后台|方便管理人员使用的可视化资源管理后台|
|全局监控|针对节点或应用的专业级监控、报警|

## 二、 部署Rainbond基础集群

1.初始化首个管理节点

参考 [平台安装](../getting-started/online-installation.html)

2.扩容节点

参考 [扩容节点](cluster-management/add-node.html)
