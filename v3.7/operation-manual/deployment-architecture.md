---
title: 平台部署结构
summary: 平台服务及部署结构
toc: true
---

Rainbond是一套完整的PaaS，包含了众多的服务组件，按功能可分为不同的集群角色。

当部署一个节点时，所有组件都安装在该节点上，该节点承载了所有的集群角色。单节点只用作全功能demo演示，并不具备高可用、高性能等生产级别的需求。

单节点rainbond可以通过自动化安装脚本来扩容集群，详情清参见：[集群部署原理](cluster-management/deployment-principle.html)，本文主要介绍rainbond的逻辑与物理部署结构和集群的角色及功能。

## 一、逻辑部署结构

<a href="https://static.goodrain.com/images/docs/3.6/operation-manual/deploy-logic.png" target="_blank"><img src="https://static.goodrain.com/images/docs/3.6/operation-manual/deploy-logic.png" width="100%"  /></a>

### 1.1 逻辑层级说明

|逻辑层级| 说明|
|----------|--------|
|负载均衡|用户访问平台的应用，都经过负载均衡。该组件是全局的，以集群多节点方式部署。|
|计算节点集群|运行用户应用的集群，同时还运行了平台依赖服务，如：网络组件、Kubelet、ETCD-Proxy和node服务等。|
|管理节点集群|运行平台后端服务的集群，所有服务都支持分布式部署与高可用特性。|
|SDN网络层|实现计算节点应用（容器）跨主机网络连通和租户的网络隔离特性。|
|分布式存储|平台全局的持久化存储服务，默认使用NFS协议挂载。|
|计算资源|支撑平台的服务器，可以使用公有云服务器、物理机或者虚拟机。|

## 二、物理部署结构

本节会根据集群角色介绍服务部署及关系。

### 2.1 分布式存储集群

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/glusterfs.png" width="100%"  />

Rainbond集群部署时，需要将分布式存储分开部署，也就是说，分布式存储需要单独的集群提供服务。

我们推荐使用 [GlusterFS](storage/GlusterFS/introduce.html) 作为分布式存储服务，详细的安装配置请参考：[GlusterFS安装](storage/GlusterFS/install.html)

安装配置好GlusterFS之后，需要将存储卷挂载到 [管理节点](deployment-architecture.html#2-2) 和 [计算节点](deployment-architecture.html#2-3) 的 `/grdata` 目录：

```bash
# 手动挂载
# mount.glusterfs <存储服务器ip或主机名>:<存储卷名> /grdata
# 示例：将 storage01主机的 gv0存储卷，挂载到 /grdata
mount.glusterfs storage01:/gv0 /grdata

# 配置到 /etc/fstab 文件中，示例如下：
storage01:/gv0	/grdata	glusterfs	backupvolfile-server=storage02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

### 2.2 管理节点部署结构

管理节点运行了所有后端服务，各类服务都支持分布式部署和高可用特性，下图只列出了单台机器的部署结构。

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/manage-node.png" width="100%"  />

各组件介绍及配置详情参见：[管理节点组件说明](component-description.html#part-2a23774a75b3498)

### 2.3 计算节点部署结构

计算节点又称为容器节点，负责运行平台上的应用（容器）。除此之外还运行了节点管理等服务。

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/compute-node.png" width="100%"  />

{{site.data.alerts.callout_info}}

- rbd-proxy组件代理了管理节点的`kube-apiserver`和`rbd-hub`服务。
- ETCD-Proxy是管理节点ETCD服务的代理
- 计算节点中运行的用户应用容器最终会注册到rbd-lb(全局负载均衡)提供给用户访问。

{{site.data.alerts.end}}

各组件介绍及配置详情参见：[计算节点组件说明](component-description.html#part-27873e014342db2f)

## 三、相关文章

- [集群安装原理](cluster-management/deployment-principle.html)
- [一键安装云帮](../getting-started/installation-guide.html)
- [扩容计算节点](cluster-management/add-compute-node.html)
- [扩容管理节点](cluster-management/add-manage-node.html)