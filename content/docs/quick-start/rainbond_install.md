---
title: '平台安装'
weight: 104
description: 'Rainbond安装教程引导'
---

Rainbond 提供多种安装使用模式，跟随以下文档，您将可以快速地本地化部署 Rainbond 或使用 Rainbond Cloud 服务。

## 使用 Rainbond 在线托管服务

### 基于阿里云公有云资源

> 此方式适合阿里云公有云用户，Rainbond 将辅助您自动化完成 Kubernetes 集群搭建和 Rainbond 系统安装。

请阅读：[自动对接阿里云 ACK](/docs/user-operations/install/aliyun-ack/)。

## 本地化部署 Rainbond

### 单节点部署

> 此方式适合只有虚拟机或物理服务器，需要先完成 Kubernetes 的安装再进行 Rainbond 的部署。

安装 Rainbond 前需要先安装 Kubernetes 集群，请阅读：[快速安装 Kubernetes](/docs/user-operations/install/kubernetes-install)。

安装 Kubernetes 集群之后可以直接部署 Rainbond，请阅读：[快速部署 Rainbond](/docs/user-operations/install/minimal_install)。

### 高可用部署

> 此方式适合具有一定基础的用户部署 Rainbond，根据文档，完成生产级 Rainbond 的部署。

如果您还没有自己的 Kubernetes 高可用集群，请先安装高可用的 Kubernetes 环境，请阅读：[高可用部署 Kubernetes](/docs/user-operations/install/kubernetes-install/#kubernetes的高可用安装)。

如果您使用了阿里云 kubernetes 集群服务或已有高可用 Kubernetes 集群，请阅读：[高可用部署 Rainbond](/docs/user-operations/install/install-base-ha)。

### Rancher 用户部署 Rainbond

> 此方式适合 Rancher 使用用户

请阅读：[基于 Rancher 部署 Rainbond](/docs/user-operations/install/install-from-rancher/)
