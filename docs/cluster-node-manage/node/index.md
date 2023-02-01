---
title: 节点管理
description: 节点管理 指南概述
keywords:
- 节点管理 指南概述
- Rainbond node manage
---

管理员用户可以通过`平台管理 > 集群`访问集群列表页面，选择其中一个集群进入详情页。

在节点列表中选择点击某一节点，就可以访问该节点的详情页。

### 节点信息

节点状态：节点出现问题状态为 `NotReady`；禁止调度后状态为 `Ready,SchedulingDisabled`。

IP地址：默认展示外网 IP，没有配置外网则展示内网 IP。

容器运行时：展示集群中使用的容器运行时类型。

节点类型：当前节点的角色种类。

还包含系统架构、操作系统版本、操作系统类型、内核版本。

### 资源用量

展示当前节点资源的基本使用情况，如 CPU、内存、根分区和容器分区使用量。

### 标签

展示该节点的所有标签信息，点击 `编辑标签` 可以对标签进行添加、修改、删除操作，并在集群中生效。

如果直接对集群中的某个节点进行标签操作，那么平台展示也会同步。

对于特定或有用的标签，进行修改、删除操作时要注意。

具体参考 [k8s 官方文档](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/labels/)

### 污点

展示该节点的所有污点，点击 `编辑污点` 可以对污点进行添加、修改、删除操作，并在集群中生效。

填写污点的key、value并选择一种策略；策略支持NoSchedule、NoExecute、PreferNoSchedule三种。

具体参考 [k8s 官方文档](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/)

### 调度和禁止调度

当点击 `禁止调度` 后，节点的状态变为 `Ready,SchedulingDisabled`，之后在集群中创建的pod，就不会被调度到该节点上，但是不影响已存在pod的使用。

该操作相当于在集群中于使用 `kubectl uncordon nodename` 或者 `kubectl cordon nodename`。

### 排空

该操作相当于在集群中使用 `kubectl drain` 命令。

点击 `排空` 后，节点的状态变为不可调度，然后驱逐pod到其它节点上。

恢复节点到正常状态，点击重新调度即可。

具体参考 [k8s 官方文档](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/safely-drain-node/)