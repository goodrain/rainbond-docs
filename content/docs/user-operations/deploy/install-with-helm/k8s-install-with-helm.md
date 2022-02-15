---
title: '基于自建 k8s 集群安装'
weight: 100
description: '基于已有的 k8s 集群，使用 helm 从零开始安装 Rainbond'
---

#### 安装前提

- 推荐[helm版本](https://helm.sh/docs/intro/install/)：3.0+
- 推荐[k8s版本](https://kubernetes.io/)：1.19+
- 根分区磁盘保证50G+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问

#### 安装步骤：

- 创建rbd-system 命名空间

```
kubectl create namespace rbd-system
```

- 添加chart仓库

```
helm repo add rainbond https://openchart.goodrain.com/goodrain/private
```

- 编辑values.yaml文件
  - 以下配置为必填项，如果需要增加其他配置，或者安装高可用集群，可以参考[values.yaml](/docs/user-operations/deploy/install-with-helm/vaules-config/) 详解，编辑``` values.yaml  ```文件自定义集群配置

```
$vi values.yaml

## Rainbondcluster
Cluster:

## 对外网关，填写IP
  gatewayIngressIPs: 47.104.1.82

## chaos对应配置，name为Chaos节点node名称
  nodesForChaos:
  - name: node1
  
## 网关节点对应配置，externalIP为网关节点外部IP，internalIP为网关节点内部IP，name为网关节点node名称
  nodesForGateway:
  - externalIP: 47.104.1.82
    internalIP: 192.168.0.1
    name: node1
```

- 安装rainbond

```
helm install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

#### 验证安装

- 查看pod状态

```
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待``` rbd-app-ui ```pod为 Running 状态即安装成功。
- 安装成功以后，可通过`` $gatewayIngressIPs:7070 `` 访问rainbond控制台。

#### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](/docs/user-operations/deploy/install-troubleshoot/helm-install-troubleshoot.md)，进行故障排查。


