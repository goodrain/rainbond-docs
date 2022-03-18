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
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- 安装rainbond

```
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

> 需要自定义 Rainbond 集群配置的时候，参考 [values.yaml 详解](./vaules-config/) 创建 `values.yaml` 配置文件，并在安装 Rainbond 集群的命令中指定 `-f values.yaml`

#### 验证安装

- 查看pod状态

```
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 ``` rbd-app-ui ``` 为 Running 状态即安装成功。
- 安装成功以后，可通过 `` $gatewayIngressIPs:7070 `` 访问rainbond控制台。

#### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](../install-troubleshoot/helm-install-troubleshoot/)，进行故障排查。
