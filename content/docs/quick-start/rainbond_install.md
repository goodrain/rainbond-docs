---
title: "平台安装"
weight: 104
description: "Rainbond安装教程引导"
---

欢迎！跟随以下文档，您将可以快速地部署Rainbond及使用Rainbond Cloud服务。

以下几种安装方式请根据需求自行选择

### 已有阿里云资源（极速安装）

> 此方式适合已有阿里云资源的用户，不需要懂技术，最简单的方式自动部署并对接到 Rainbond Cloud，其他公有云资源安装请电话咨询`18501030060`（曾庆国）获取技术支持

请阅读：[安装对接 Rainbond Cloud](/docs/user-operations/install/rainbond-cloud/)


### 已有 kubernetes集群

> 此方式适合已有 Kubernetes集群的用户，在不影响现有业务的情况下，进行简单的操作，即可完成 Rainbond 的部署。

请阅读： [快速部署 Rainbond](/docs/user-operations/install/minimal_install) 

推荐对接 Rainbond Cloud，请阅读：[对接 Rainbond Cloud](/docs/user-operations/install/minimal_install) 

### 单节点部署

> 此方式适合只有虚拟机或物理服务器，需要先完成 Kubernetes的安装再进行 Rainbond 的部署。

安装 Rainbond前需要先安装 Kubernetes集群，请阅读： [快速安装 Kubernetes](/docs/user-operations/install/kubernetes-install)

安装 Kubernetes集群之后可以直接部署 Rainbond，请阅读： [快速部署 Rainbond](/docs/user-operations/install/minimal_install) 
 

### 高可用部署

> 此方式适合具有一定基础的用户部署 Rainbond，根据文档，完成生产级 Rainbond的部署。


如果您还没有自己的 Kubernetes高可用集群，请先安装高可用的 Kubernetes环境，请阅读： [高可用部署 Kubernetes](/docs/user-operations/install/kubernetes-install/#kubernetes的高可用安装)

如果您使用了阿里云kubernetes集群服务或已有高可用Kubernetes集群，请阅读： [高可用部署 Rainbond](/docs/user-operations/install/install-base-ha)

</br>






