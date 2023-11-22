---
title: "安装分布式文件存储"
description: "本章节介绍安装分布式文件存储"
keywords:
- 安装分布式文件存储
---

本章节介绍分布式文件存储的安装，Rainbond 需要使用分布式文件存储作为集群的共享存储。

## 对接已有的 NFS 文件存储

若你已有分布式文件存储则可对接使用，需满足以下条件：

* 支持 NFS v3,v4 协议
* 支持文件锁 原因详见 [如何保证 NFS 文件锁的一致性？](https://www.infoq.cn/article/UKKgaMSuBywDVWwCrbrN)
* 支持常见的 NFS 参数，务必开启 no_root_squash

### 部署 NFS Client Provisioner 

使用 [Helm](ops-guide/tools/#helm-cli) 安装 NFS-Client-Provisioner

1. 添加Rainbond chart仓库并同步

```shell
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
```

2. 执行命令安装，替换命令中的 `nfs.server` 和 `nfs.path` 为你的 NFS 服务器地址和路径

```shell 
helm install nfs-client-provisioner rainbond/nfs-client-provisioner \
--set nfs.server=192.168.1.11 \
--set nfs.path=/data \
--version 1.2.8
```

## 部署其他分布式文件存储，GlusterFS 或 Rook-Ceph

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```