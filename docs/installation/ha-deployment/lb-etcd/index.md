---
title: 部署负载均衡和复用ETCD集群
description: 部署负载均衡器保障 Rainbond 集群网关的高可用性
keywords:
- keepalived部署
- 复用 Kubernetes ETCD集群
---

本章节介绍负载均衡器的部署，Rainbond 集群网关需要部署在高可用的负载均衡器上，保障集群网关的高可用性。

## 使用已有的负载均衡器

若用户已有高可用的负载均衡器，可直接使用，需满足以下条件：

* 代理到 Rainbond 网关节点
* 开放 80、443、6060、6443、7070、8443 端口

在后续部署 Rainbond 集群时填写负载均衡地址即可。

### 部署 Keepalived 

若还没有负载均衡服务则可通过在网关节点上部署 Keepalived 服务来确保网关的高可用性，通过该种方式网关节点为主备关系， Keepalived部署请参考：


```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

## 复用 Kubernetes ETCD

Rainbond 集群需要使用 ETCD 用来存储集群的元数据信息，集群状态和网络配置，通常情况下复用 Kubernetes 的 ETCD 即可。

* ETCD 对磁盘性能要求较高，所以请务必按照 [软件和硬件环境要求](/docs/installation/ha-deployment/resource-prepare) 准备相关资源，以免后续使用过程中出现不稳定情况；如果 ETCD 节点与其他属性节点复用，强烈建议存储使用SSD磁盘.

:::tip
如不复用 Kubernetes 集群的 ETCD，Rainbond 会默认在 `rbd-system` 命名空间下安装 3 节点的 ETCD 集群。
:::

### 创建 ETCD secret 证书

基于主机安装的 Kubernetes 集群，ETCD证书文件位于 `/etc/kubernetes/ssl` 目录下，分别为 `kube-ca.pem` `kube-node.pen` `kube-node-key.pem` 使用以下命令创建 secret，在安装 Rainbond 时使用。

* CA证书：/etc/kubernetes/ssl/kube-ca.pem
* 客户端证书：/etc/etcd/ssl/kube-node.pem
* 客户端密钥：/etc/etcd/ssl/kube-node-key.pem

```bash
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```

其他方式安装的 Kubernetes 集群，按照上述方式创建 secret 即可。