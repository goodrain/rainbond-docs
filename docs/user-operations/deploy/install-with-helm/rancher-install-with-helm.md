---
title: '基于自建 rancher 集群安装'
description: '基于已有的 rancher 集群，使用 helm 从零开始安装 Rainbond'
---

## 安装前提

- 推荐helm版本 3.0+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问
- 推荐[k8s版本](https://kubernetes.io/)：1.19+
- 根分区磁盘保证50G+


:::caution
注意：通过 Rancher 进行安装 kubernetes 时，Rancher 的 UI 访问默认是80，443 ，但是后续对接 Rainbond 同样会用到 80，443 端口。所以启动 Rancher 时，需要修改映射的端口，而且 Rancher 的访问，必须要用 https，即使用 http 访问，它还是会强制跳转到 https，所以如果容器内的80端口映射到宿主机的 9xxx，那么容器内的443端口要映射到宿主机的 9443。
:::

例：

``` bash
docker run --privileged -d --restart=unless-stopped -p 9xxx:80 -p 9443:443 -v <主机路径>:/var/lib/rancher/ rancher/rancher:stable
```

通过 Rancher 安装新集群时一定要关闭 Nginx Ingress

```bash
Advanced Opetions >> Nginx Ingress(选择 Disabled)
```

基于已有集群进行安装时，也要关闭 Nginx Ingress

```bash
Cluster Management >> 对应集群 >> Edit Config >> Nginx Ingress(选择 Disabled)
```

<img src="https://pic.imgdb.cn/item/622e19445baa1a80ab6917fb.png" style="zoom: 33%;" />

<img src="https://pic.imgdb.cn/item/622e199e5baa1a80ab693b29.png" style="zoom:33%;" />

### 安装步骤：

- 安装helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

- 创建rbd-system 命名空间

```bash
kubectl create namespace rbd-system
```

- 添加chart仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- 安装rainbond

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

> 需要自定义 Rainbond 集群配置的时候，参考 [values.yaml 详解](../../../user-operations/deploy/install-with-helm/vaules-config/) 创建 `values.yaml` 配置文件，并在安装 Rainbond 集群的命令中指定 `-f values.yaml`

### 验证安装

- 查看pod状态

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 ``` rbd-app-ui ``` 为 Running 状态即安装成功。
- 安装成功以后，可通过 `` $gatewayIngressIPs:7070 `` 访问 Rainbond 控制台。

### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](../install-troubleshoot/helm-install-troubleshoot)，进行故障排查。
