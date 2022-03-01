---
title: '基于自建 k3s 集群安装'
weight: 102
description: '基于已有的 k3s 集群，使用 helm 从零开始安装 Rainbond'
hidden: true
---

### 安装前提

- 推荐[helm版本](https://helm.sh/docs/intro/install/)：3.0根分区磁盘保证50G+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问
- 确保服务器安装了 NFS 客户端
  - 对接外部存储时，则无需安装
- K3s 的启动需要指定启动参数 –docker –disable traefik
  - k3s启动默认会使用containerd作为容器的运行环境，同时会安装 traefik 作为k3s的 ingress controller，会出现端口冲突。
- 确保服务器已经安装了docker

`` 说明：``rainbond 默认会使用docker作为容器的运行环境，同时rainbond 的 rbd-gatway 网关会作为 ingress controller，所以需要修改k3s 的启动参数，以及卸载之前安装的 traefik。

安装docker

```
curl sh.rainbond.com/install_docker | bash
```

安装NFS客户端

```
yum -y install nfs-utils    # Cenots系统
apt-get install nfs-common  # ubuntu系统
```

卸载traefik

```
kubectl delete -f /var/lib/rancher/k3s/server/manifests/traefik.yaml
```

修改k3s启动参数

```
vi /etc/systemd/system/multi-user.target.wants/k3s.service

# 编辑k3s.service文件末尾行
ExecStart=/usr/local/bin/k3s server --docker --disable traefik
# 重新加载配置文件
systemctl daemon-reload
# 重新启动k3s
service k3s restart
```

增加config文件

``说明： ``k3s默认的 配置文件路径，helm 是没有办法使用的，所以需要添加一个 config文件，供 helm 使用。 

```
mkdir ~/.kube
ln -s /etc/rancher/k3s/k3.yaml ~/.kube/config
```

### 安装Rainbond：

- 安装helm

```
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

- 创建rbd-system 命名空间

```
kubectl create namespace rbd-system
```

- 添加chart仓库

```
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- 安装rainbond
  - 参考 [values.yaml 详解](https://www.rainbond.com/docs/user-operations/deploy/install-with-helm/vaules-config/)  了解更多自定义配置项，以及如何为已有 Rainbond 集群变更配置。

```
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

### 验证安装

- 查看pod状态

```
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待``` rbd-app-ui ```pod为 Running 状态即安装成功。
- 安装成功以后，可通过`` $gatewayIngressIPs:7070 `` 访问rainbond控制台。

### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](https://www.rainbond.com/docs/user-operations/deploy/install-troubleshoot/helm-install-troubleshoot/)，进行故障排查。
