---
title: 集群安装异常检查
description: 该章节文档介绍Rainbond集群安装过程中Kubernetes的安装或Rainbond集群初始化的障碍问题排查和解决
weight: 109
hidden: true
---

### Kubernetes 集群安装异常情况分析

主要是指通过指定节点的方式安装 Kubernetes 集群这条链路。

- 报错信息提示“Cluster must have at least one etcd plane host”

<img src="https://static.goodrain.com/docs/5.3/operator/error.png" width="100%" />

> 这种情况一般是你配置的节点 IP 地址或 SSH 端口不正确或端口有防火墙策略，导致控制台无法连接指定的节点。重新配置正确的节点 IP 地址和 SSH 端口，或开启 SSH 端口的防火墙策略。

### Rainbond 集群初始化异常情况分析

Rainbond 集群初始化控制过程如下：

- 通过 KubeAPI 连接 Kubernetes 集群
- helm 安装 rainbond chart
- 创建 CR 资源
- 等待 rainbond-operator 完成集群初始化。

因此大多数情况下用户遇到的表象问题就是在等待集群完成初始化超时了。waiting rainbond region ready timeout.
<img src="https://static.goodrain.com/docs/5.3/operator/timeout.png" width="60%" />
但表象之下的实际原因有很多。我们首先给出一个排查问题的思路，然后重点列举一些常见问题：

排查思路如下：

##### 查看 rbd-system namespace 下的 pod 情况。

> rainbond 系统组件都安装在 rbd-system namespace 下，基于一定顺序进行安装。`kubectl get pod -n rbd-system` 进行 pod 信息查询。

> 通过指定节点按照的集群节点中默认不带`kubectl`命令，参考[文档](../tools/kubectl/)进行安装。

> 第一步安装基础组件包括：rainbond-operator, nfs-provider(如果初始化参数中指定了外部存储服务，无该组件), rbd-hub（如果初始化参数中指定了外部镜像仓库服务，无该组件）,rbd-etcd（如果初始化参数中指定了外部 etcd 服务，无该组件）,rbd-gateway, rbd-node

> 如果有某个组件运行异常，请通过`kubectl logs`命令查看日志进行异常处理。

常见问题有：

- rbd-gateway 无法正常运行。一般是端口冲突，特别是集群中已经存在 ingress-controller 的情况下很大可能出现冲突。rbd-gateway 运行需要节点以下端口必须空闲：80，443，8443，6060，10254, 18080, 18081。如果存在 ingress-controller，需要选择无 ingress-controller 作为 Rainbond 网关节点，在 rainbondcluster 集群初始化配置资源中指定 nodesForGateway，[参考文档](./init-region)。

- rbd-etcd 无法正常运行。主要原因有运行该组件的节点磁盘性能低或 IO 紧张。etcd 服务是集群稳定的关键服务，需要尽可能配置 SSD 磁盘。

- rbd-node 无法启动。主要原因有 rbd-hub 服务没有启动完成，镜像仓库证书签发未完成。仅需要等待 rbd-hub 服务启动完成即可。

- 如果节点网络障碍、DNS 解析障碍等因素也会导致组件出现故障。根据日志进行分析即可。

##### 查看 rainbond-operator 日志

> 上诉组件都正常运行情况下，初始化长期未完成则可查看 rainbond-operator 日志进行排查。

常见问题有：

- 网络或磁盘 IO 较慢导致长时间拉取镜像。日志体现就是一直在拉取镜像。

- 一直打印`waiting local image hub ready`，这种情况如果组件都正常情况下考虑是经常仓库证书分发出现问题。按照 [处理方式](https://github.com/goodrain/rainbond/issues/956) 进行处理。
