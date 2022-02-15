---
title: '基于自建 k8s 集群安装'
weight: 100
description: '基于已有的 k8s 集群，使用 helm 从零开始安装 Rainbond'
---

#### 安装前提

- 推荐[helm版本](https://helm.sh/docs/intro/install/)：3.0+
- 推荐k8s版本：1.19+
- 根分区磁盘保证50G+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问；

#### 安装步骤：

- 创建rbd-system 命名空间

```
kubectl create namespace rbd-system
```

- 添加chart仓库

```
helm repo add rainbond https://openchart.goodrain.com/goodrain/private
```

- 安装rainbond

```
helm install rainbond rainbond/rainbond-cluster -n rbd-system \
--set Cluster.gatewayIngressIPs=47.104.73.84 \
--set Cluster.nodesForGateway[0].externalIP=47.104.73.84 \
--set Cluster.nodesForGateway[0].internalIP=172.31.112.135 \
--set Cluster.nodesForGateway[0].name=172.31.112.135 \
--set Cluster.nodesForChaos[0].name=172.31.112.135

```
