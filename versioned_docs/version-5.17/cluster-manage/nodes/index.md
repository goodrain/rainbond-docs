---
title: 节点管理
description: Rainbond 集群节点管理指南
keywords:
- Nodes Manage
- Rainbond Cluster Nodes Manage
---

Kubernetes 通过将容器放入在节点（Node）上运行的 Pod 中来执行你的工作负载。 节点可以是一个虚拟机或者物理机器，取决于所在的集群配置。 每个节点包含运行 Pod 所需的服务； 这些节点由控制面负责管理。

通常集群中会有若干个节点；而在一个学习所用或者资源受限的环境中，你的集群中也可能只有一个节点。

节点上的组件包括 kubelet、 容器运行时以及 kube-proxy。

更多关于节点的信息，请参阅 [Kubernetes Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)。

进入 **平台管理 -> 集群 -> 节点**，点击任意节点跳转到节点管理详情页。

## 节点详情

节点详情页包含以下信息：

* **名称:** 节点的 IP 或者主机名
* **状态:** 节点的状态，Ready 表示节点正常，NotReady 表示节点异常
* **IP地址:** 节点的内网 IP 地址
* **容器运行时:** 节点的容器运行时，包括 docker、containerd 以及运行时版本
* **系统架构:** 节点的系统架构，包括 amd64、arm64 等
* **节点类型:** 节点的类型，包括 master、worker、etcd
* **操作系统版本:** 节点的操作系统版本
* **操作系统类型:** 节点的操作系统类型，包括 Linux、Windows 等
* **内核版本:** 节点的内核版本
* **创建时间:** 节点创建的时间

## 资源用量

节点详情页的资源用量包含以下信息：

* **CPU:** 节点的 CPU 用量，包括总量、已使用量、可用量、使用率
* **内存:** 节点的内存用量，包括总量、已使用量、可用量、使用率
* **磁盘根分区:** 节点的磁盘根分区用量，包括总量、已使用量、可用量、使用率
* **磁盘容器数据卷:** 节点的磁盘容器数据卷用量，包括总量、已使用量、可用量、使用率

## 标签管理

管理节点的标签，点击 **编辑标签** 按钮，弹出编辑标签对话框，可以对节点的标签进行添加、删除、修改。

## 污点管理

管理节点的污点，点击 **编辑污点** 按钮，可以对节点的污点进行添加、删除、修改。

目前支持污点的策略有：

* **NoSchedule:** 不允许新的 Pod 调度到该节点上，但是允许已经调度到该节点上的 Pod 继续运行。
* **PreferNoSchedule:** 不允许新的 Pod 调度到该节点上，但是允许已经调度到该节点上的 Pod 继续运行。但是，调度器会尽量避免将 Pod 调度到带有该污点的节点上。
* **NoExecute:** 不允许新的 Pod 调度到该节点上，也不允许已经调度到该节点上的 Pod 继续运行。但是，如果 Pod 已经在该节点上运行，那么允许 Pod 在节点上运行直到它被删除。

更多关于节点污点的信息，请参阅 [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)。

## 节点禁止调度

禁止调度节点，点击 **禁止调度** 按钮，弹出禁止调度对话框，可以对节点进行禁止调度，同时也会添加一个污点 `node.kubernetes.io/unschedulable:NoSchedule` 可在污点列表中看到。

## 节点排空

节点排空实际上是对节点进行禁止调度，然后将节点上的 Pod 进行强制驱逐，对应的命令是 `kubectl drain`。

点击 **排空** 按钮，可以对节点进行排空。

更多关于节点排空的信息，请参阅 [Drain Node](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)。


