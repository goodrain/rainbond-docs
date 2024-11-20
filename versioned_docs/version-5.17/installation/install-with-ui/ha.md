---
title: 高可用集群安装说明
description: 基于图形化界面，从Linux开始安装 Rainbond 高可用集群的说明
keywords:
- 基于主机安装高可用 Kubernetes 集群
- 基于主机安装高可用 Rainbond 集群
---

:::tip
部署高可用集群关键在于规划，例如：整个集群规划使用多少台服务器，每台服务器的角色是什么，服务器资源、磁盘如何规划等。
:::

## 部署架构

![](https://static.goodrain.com/docs/5.17.0/high-availability.png)

如图所示：采用了最少的节点数量（3节点）保证高可用，K8s 采用多 Master + 多 ETCD 集群保障高可用，Rainbond 采用外部负载均衡 + 多网关节点 + 分布式文件存储 + MySQL高可用集群保障高可用。

## 高可用 Kubernetes 集群

[安装 Kubernetes 集群](../install-with-ui/#从主机开始安装-kubernetes-集群) 至少需要部署 3 个节点的集群，3 个节点的属性都可进行复用，例如：3 管理节点、3 计算节点、3 ETCD 节点。

> 如需自定义基于主机安装的 Kubernetes 集群配置，参阅[集群配置](./rke-config)。

## 高可用 Rainbond 集群

部署高可用 Rainbond 集群关键在于：①高可用 Kubernetes 集群；②Rainbond 集群的基础配置和高级配置可选项都使用外置的高可用服务。

下述将对 Rainbond 所需要的外部服务分别进行说明，包括这些服务的高可用部署。

### 负载均衡

Rainbond 集群网关需要部署在高可用的负载均衡器上，保障集群网关的高可用性。

#### 使用已有的负载均衡器

若已有高可用的负载均衡器，可直接使用，需满足以下条件：
* 代理到 Rainbond 所有网关节点
* 开放 80，443，6060，7070，8443 端口

#### 部署 Keepalived

若还没有负载均衡服务则可通过在网关节点上 [部署 Keepalived](https://t.goodrain.com/d/8334-keepalived) 服务来确保网关的高可用性，通过该种方式网关节点为主备关系。

### 网关节点

指定 Rainbond 网关服务部署并运行在哪个节点上，每个节点上的网关服务都可独立进行工作，即使某一个网关节点挂掉，其他网关节点依旧能正常工作。 

### 构建节点

指定 Rainbond 构建服务部署并运行在哪个节点上，构建节点的数量越多代表能同时并行构建的任务也就越多。

> 构建比较消耗磁盘，建议将构建服务运行在有 SSD 磁盘的节点上。

### 存储

Rainbond 需要使用文件存储，存储平台以及平台上应用数据，默认提供内置 `NFS` 存储，以 Pod 方式运行在`rbd-system`命名空间下，会随机绑定一个节点并将元数据存储在该节点的`/opt/rainbond/data/nfs`目录下。

若已有高可用文件存储则可直接使用，需满足以下条件：

* 支持 NFS v3,v4 协议
* 支持文件锁 原因详见 如何保证 NFS 文件锁的一致性？
* 支持常见的 NFS 参数，务必开启 no_root_squash

如还未安装文件存储，可以参阅 [NFS Server 单机部署](https://t.goodrain.com/d/8325-linux-nfs-server)、[NFS 主从同步部署](https://t.goodrain.com/d/8323-nfs-rsyncinotify)，安装后通过 [在 Kubernetes 中部署 NFS Client Provisioner](https://t.goodrain.com/d/8326-kubernetes-nfs-client-provisioner) 对接 NFS Server 到 Kubernetes 中，在 Rainbond 集群创建时只需要填写 StorageClassName `nfs-client` 即可。

也可选择 [部署 Rook-Ceph](https://t.goodrain.com/d/8324-rook-ceph-v18)。

### ETCD

Rainbond 集群需要使用 ETCD 用来存储集群的元数据信息，如集群状态和网络配置等。默认提供内置 `ETCD`，以 Pod 方式运行在`rbd-system`命名空间下，会随机绑定一个节点并将元数据存储该节点的`/opt/rainbond/data/etcdxxx`目录下。

对于高可用集群来说无需新建 ETCD，复用 Kubernetes 的 ETCD 即可。

> ETCD 对磁盘性能要求较高，强烈建议存储使用SSD磁盘。

基于主机安装的 Kubernetes 集群，ETCD证书文件位于 `/etc/kubernetes/ssl` 目录下，分别为 `kube-ca.pem` `kube-node.pen` `kube-node-key.pem` ，使用 [Kubectl](/docs/ops-guide/tools/#kubectl-cli) 命令创建 Secret，在安装时指定密钥名称 `rbd-etcd-secret`。

- CA证书：/etc/kubernetes/ssl/kube-ca.pem
- 客户端证书：/etc/etcd/ssl/kube-node.pem
- 客户端密钥：/etc/etcd/ssl/kube-node-key.pem

```bash
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```

### 镜像仓库

指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库，以 Pod 方式运行在`rbd-system`命名空间下，默认元数据通过  `rbd-hub` pvc 进行存储。

如已有镜像仓库可直接使用，需满足以下条件：

* 建议使用 https 协议以及可信任证书，如使用 http 则需要修改 Docker、Containerd 相关的配置。

### MySQL

Rainbond 需要使用 MySQL 存储控制台及集群端数据。默认提供内置的 MySQL 数据库，以 Pod 方式运行在`rbd-system`命名空间下，会随机绑定一个节点并将元数据存储该节点的`/opt/rainbond/data/dbxxx`目录下。

若已有高可用数据库则可直接使用，需满足以下条件：

* 数据库版本为MySQL 5.7，8.0；
* 提前创建 console region 库；
* 数据库字符编码为 utf8mb4；
* 推荐数据库与 Rainbond 集群网络在同一内网范围内。

如还未安装数据库，请参阅文档安装 [在 Docker 中部署 MySQL 主从集群](https://t.goodrain.com/d/8335-docker-mysql)、[在 Centos 7 中部署 MySQL 主从集群](https://t.goodrain.com/d/8304-centos-7-mysql)

### 控制台高可用

基于主机安装的控制台，是由 Docker 启动，无法实现高可用部署，故需要将 Docker 启动的控制台迁移到集群中，参阅文档[控制台高可用](/docs/installation/install-with-ui/console-recover)

