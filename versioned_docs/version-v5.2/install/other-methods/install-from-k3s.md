---
title: 基于 k3s 安装
description: 本文用于 k3s 用户安装 Rainbond 的参考
keywords: [Rainbond, k3s]
weight: 11
---

> 本文档适用于熟悉 k3s 的用户阅读。
> 基于 k3s 安装 Rainbond 的方式适用于快速了解 Rainbond 功能特性，生产环境建议 [基于 k8s 高可用安装](../install-from-k8s/high-availability/)

k3s是完全兼容的Kubernetes发行版，有以下更改：

- 移除过时的功能、Alpha功能、非默认功能，这些功能在大多数Kubernetes集群中已不可用。
- 删除内置插件(比如云供应商插件和存储插件)，可用外部插件程序替换。
- 添加SQLite3作为默认的数据存储。etcd3仍然可用，但并非默认项。
- 包含在一个简单的启动程序当中，可以处理复杂的TLS和其他选项。
- 几乎没有操作系统依赖性（仅需要健全的内核和cgroup挂载）。k3s软件包所需的依赖：
  - containerd
  - Flannel
  - CoreDNS
  - CNI
  - 主机系统服务 (iptables, socat, etc)

### 前提条件

1. 安装Docker。如果已安装，请跳过：

```shell
curl http://sh.rainbond.com/install_docker | bash
```



### 开始安装K3s

1. 安装`v1.18.13-k3s1`版本的k3s，更多详情参考k3s[官网](https://www.rancher.com)

```shell
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn INSTALL_K3S_EXEC="--docker --disable traefik" INSTALL_K3S_VERSION="v1.18.13-k3s1" sh -
```

> --disable traefik : 不安装traefik （避免80 443被占用）
>
> --docker：使用docker ，k3s默认使用containerd，rainbond暂不支持containerd

2. 拷贝`k3s kubeconfig` 到 `~/.kube/config`，配置`k3s kubeconfig`文件，[详情参考官方文档](https://docs.rancher.cn/docs/k3s/cluster-access/_index)

```bash
mkdir ~/.kube
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

### 安装rainbond

参考 [基于k8s最小化安装](../install-from-k8s/minimal-install/)  继续安装 helm 以及 Rainbond。 