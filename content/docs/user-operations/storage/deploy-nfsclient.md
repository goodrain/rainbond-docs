---
title: 对接外部NFS存储
description: 对接外部NFS作为集群共享存储
weight: 5015
---

### 通过 Kubernetes 安装 NFS-Client-Provisioner
通过本文内容为用户说明如何通过 Kubernetes 对接外部 NFS 存储，并为 Rainbond 提供高可用存储

### 前提
对于NFS共享存储，Rainbond 的要求如下：

* 支持 Nfs 协议（默认 v4，指定协议版本 v3 会在后续迭代中加入）
* 支持文件锁 原因详见 [如何保证 NFS 文件锁的一致性？](https://www.infoq.cn/article/UKKgaMSuBywDVWwCrbrN)
* 支持常见的 NFS 参数，务必开启 no_root_squash

### 安装NFS-Client-Provisioner
* 添加Rainbond chart仓库并同步

```shell
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
```

* 编写参数配置文件 nfs-client.yaml

```yaml
nfs:
  server: you-nfs-server  #nfs server地址
  path: /ifs/kubernetes   #nfs server 的路径
  mountOptions:           #添加参数
```

* 部署NFS-Client-Provisioner

```shell 
helm install nfs-client-provisioner rainbond/nfs-client-provisioner \ 
-f nfs-client.yaml \ 
--version 1.2.8
```