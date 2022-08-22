---
title: Connect to external NFS storage
description: Connect to external NFS as cluster shared storage
weight: 5015
---

### Install NFS-Client-Provisioner via Kubernetes
This article explains how to connect external NFS storage through Kubernetes and provide high-availability storage for Rainbond

### premise
For NFS shared storage, Rainbond's requirements are as：

* Support Nfs protocol (default v4, specified protocol version v3 will be added in subsequent iterations)
* For the reasons for supporting file locks, see [How to ensure the consistency of NFS file locks?](https://www.infoq.cn/article/UKKgaMSuBywDVWwCrbrN)
* Support common NFS parameters, be sure to enable no_root_squash

### Install NFS-Client-Provisioner
* Add Rainbond chart repository and sync

```shell
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
```

* Write the parameter configuration file nfs-client.yaml

```yaml
nfs:
  server: you-nfs-server #nfs server address
  path: /ifs/kubernetes #nfs server path
  mountOptions: #Add parameters
```

* Deploy NFS-Client-Provisioner

```shell 
helm install nfs-client-provisioner rainbond/nfs-client-provisioner \ 
-f nfs-client.yaml \ 
--version 1.2.8
```