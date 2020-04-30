---
title: "平台安装"
weight: 104
description: "Rainbond安装教程引导"
---

欢迎！跟随以下文档，您将可以快速地部署Rainbond及使用Rainbond Cloud服务。

以下安装方式请根据需求自行选择

## 一. 基于 [Rainbond Cloud](/docs/quick-start/rainbond-cloud/) 安装

> 此方式适用于具有公网资源及环境，快速部署对接Rainbond Cloud

### 阿里云用户

无需手动部署，使用阿里云ACK全程自动化安装对接Rainbond Cloud，简单快捷

请阅读：[使用阿里云ACK安装对接Rainbond Cloud](/docs/user-operations/install/rainbond-cloud/)

### 云服务商Kubernetes用户

已有公网Kubernetes集群，直接部署Rainbond，对接Rainbond Cloud

请阅读：[在Kubernetes基础上安装对接Rainbond Cloud](/docs/user-operations/install/cloud_install) 

</br>

## 二. 私有化安装 Rainbond

> 此方式适合想要私有化部署Rainbond的用户，在内网环境私有化部署 Rainbond

### 最小化安装 Rainbond

此方式适合想要快速部署Rainbond体验的用户，进行简单的操作，即可完成 Rainbond 的部署。

- 安装Rainbond前需要先安装Kubernetes，请阅读： [快速安装Kubernetes](/docs/user-operations/install/kubernetes-install)    
- 已有Kubernetes，直接部署Rainbond，请阅读： [快速部署Rainbond](/docs/user-operations/install/minimal_install) 


### 高可用安装（适合具有一定基础的用户部署Rainbond）

此方式适合想要部署生产级别Rainbond的用户，根据文档，完成生产级Rainbond的部署。

- Rainbond高可用部署需要高可用的Kubernetes环境，请阅读： [高可用部署Kubernetes](/docs/user-operations/install/kubernetes-install/#kubernetes的高可用安装)
- 如果您使用了阿里云kubernetes 集群服务或已有高可用Kubernetes集群，请阅读： [高可用部署Rainbond](/docs/user-operations/install/install-base-ha)

</br>

**当您顺利部署并体验Rainbond开源版后，不妨对接到Rainbond Cloud，体验以下功能拓展和服务支持：**

1. 多数据中心管理（多集群）
2. 离线导入导出功能，打通开发和交付环节
3. 专业的工程师协助支持   

[了解更多功能和服务](https://cloud.goodrain.com/page/price)

