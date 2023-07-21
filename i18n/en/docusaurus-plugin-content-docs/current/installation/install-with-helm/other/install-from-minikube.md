---
title: Install on MiniKube
description: Install the Rainbond cluster on Minkube
keywords:
- 在 MiniKube 上安装 Rainbond 集群
---

## 前提

- Install [MiniKube](https://minikube.sigs.k8s.io/docs/start/)
- Install [Kubectl](/docs/ops-guide/tools/#kubectl-cli)
- Install [Helm](/docs/ops-guide/tools/#helm-cli)
- Make sure `80, 443, 6060, 7070, 8443` are not occupied
- Install the NFS client

## Install MiniKube

Install Docker

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

APIServer MiniKube installation, need to change the default port 8443 to 9443, more, please refer to [MiniKube installation document](https://minikube.sigs.k8s.io/docs/start/)

```bash
minikube start --force --cpus=4 --memory=8g --vm-driver=docker --apiserver-port=9443 --ports=80:80 --ports=433:443 --ports=6060:6060 --ports=8443:8443 --ports=7070:7070 --insecure-registry=goodrain.me --registry-mirror=https://registry.docker-cn.com --image-mirror-country=cn --kubernetes-version=v1.23.10
```

## 安装 Rainbond

添加 Helm Chart 仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
```

创建命名空间

```bash
kubectl create namespace rbd-system
```

安装 Rainbond，可以使用 MiniKube 默认提供的 storageClass 作为 Rainbond 的存储。

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system \
--set Cluster.RWX.enable=true \
--set Cluster.RWX.config.storageClassName=standard
```

:::tip
更多 Helm Chart 参数请参考 [Chart 安装选项](../vaules-config)。

执行完安装命令后，请[查询集群安装进度](/docs/installation/install-with-helm/install-from-kubernetes#4-安装进度查询)。
:::

### 安装问题排查

安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](/docs/troubleshooting/installation/helm)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。