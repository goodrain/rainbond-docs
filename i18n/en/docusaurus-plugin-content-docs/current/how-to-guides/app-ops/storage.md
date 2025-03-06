---
title: 持久化存储
description: Rainbond组件存储的管理文档
---

## 概述

持久化存储是指应用程序在运行过程中产生的数据，需要持久化保存的数据。如数据库、文件、日志等。

默认内置两种存储类型:

- 本地存储
- 临时存储

## 本地存储

[本地存储](https://github.com/rancher/local-path-provisioner)是 Rainbond 默认内置的存储类型，提供了一个简单的本地存储方案，支持快速创建本地存储卷，适用于各种场景。

本地存储支持无状态、有状态组件挂载，只支持单读单写，不支持多读多写。同时，挂载了本地存储的组件将会固定在存储所在的节点上，不支持跨节点调度。

默认在宿主机`/opt/rainbond/local-path-provisioner`目录下创建存储卷。

## 临时存储

临时存储是 Rainbond 默认内置的存储类型，提供了一个简单的临时存储方案，支持快速创建临时存储卷，适用于各种场景。

## 添加存储

在组件存储页，点击添加存储，选择存储类型，填写存储名称、存储大小、存储路径等信息，点击确定即可。

### 共享其他组件存储

本地存储不支持多个组件共享挂载，同时有状态组件不允许挂载其他组件的存储。

在组件存储页，点击添加存储，选择存储类型为共享其他组件存储，选择要共享的组件，填写存储路径等信息，点击确定即可。

## 对接其他存储

Rainbond 平台会检测 Kubernetes 集群中存在的 [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) 资源，将 StorageClass 资源对象认为是用户自定义的存储类型，供 Rainbond 控制台组件选择使用。对接存储服务完成后，可以在添加存储中选择到对接的存储类型。

- [在 Linux 搭建 NFS 存储](https://t.goodrain.com/d/8325-linux-nfs-server)
- [在 Kubernetes 中部署 NFS Client Provisioner](https://t.goodrain.com/d/8326-kubernetes-nfs-client-provisioner)
- [Rook-Ceph 部署指南](https://t.goodrain.com/d/8324-rook-ceph-v18)

### 存储回收

组件被删除时会发生存储的回收，指定 StorageClass 创建的存储会根据 StorageClass 对应的存储回收策略选择删除或保留。