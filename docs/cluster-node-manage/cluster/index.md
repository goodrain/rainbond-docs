---
title: 集群管理
description: 集群管理 指南概述
keywords:
- 集群管理 指南概述
- Rainbond cluster manage
---

管理员用户可以通过`平台管理 > 集群`访问集群列表页面，选择其中一个集群进入详情页。

### 集群信息

集群名称：用户添加集群时设置的名称。

运行状态：正常状态为 `运行中`，如果集群出现故障则显示 `通信异常`。

集群版本：安装 rainbond 的版本。

节点数量：列出集群中各个角色的节点数量，当一个节点具有多个角色时，按角色划分。

安装方式：分为基于主机安装(rke)，直接对接管理集群(helm)，通过脚本快速安装(dind)。

### 节点列表

列出该集群下所有节点，并展示每一个节点的状态和基本使用信息。

`编辑节点` 功能：如果平台是通过主机(RKE)方式安装的，就可以在编辑节点中增加、删除、修改某个节点，其他安装方式则不支持。

编辑操作可参考 [基于主机安装](/docs/installation/install-with-ui/index.md)

### 资源用量

展示集群资源的基本使用情况，如 CPU、内存、存储使用量。

### Rainbond组件列表

展示 rainbond 各组件在集群中的运行情况，并可以查看每个组件运行容器实例的信息。

如果某个组件或容器实例出现异常，则可以到集群中执行 `kubectl get pod -n rbd-system` 找到异常的组件，然后执行 `kubectl describe pod <podname> -n rbd-system` 查看
具体的异常信息。

### 编辑集群信息
点击 `编辑` 可修改集群配置信息，如 API 地址、WebSocket 通信地址、域名后缀、TCP 应用默认访问 IP、证书等。

除了集群 ID，其它配置都支持修改，如果修改后导致集群通信异常不能使用，可以通过`grctl config`命令查看正确配置信息。

grctl 命令安装使用参考 [grctl 命令行工具](/docs/ops-guide/tools/grctl.md)

### 导入
将 k8s 资源导入到集群中，具体使用可参考 [资源导入](/docs/use-manual/team-manage/ns-to-team/)

### 资源限额
设置该集群下某个团队的内存限额，当内存使用达到该限额时，会提示内存不足。

### 集群监控
平台接入了 Kubernetes 仪表板(Dashboard)，获取运行在集群中的应用的概览信息。

Dashboard 详情参考 [k8s 官方文档](https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/)
