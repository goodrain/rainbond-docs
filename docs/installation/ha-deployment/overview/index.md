---
title: 安装前准备与要求
description: Rainbond 高可用集群安装前准备与要求
keywords:
- Rainbond 集群环境要求
- 安装容器运行时，安装Docker，安装Containerd
---

本系列文章介绍将以三台服务器搭建一个高可用 Rainbond 集群。

## 一、集群架构图

高可用安装所需的最小服务器数量，将角色属性进行复用，以搭建一个高可用性的 Rainbond 集群。

![](https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/architecture.png)

## 二、操作系统要求

|支持的操作系统|最低要求（每个节点）|
| :----- | :----- |
|**CentOS** 7.x，8.x |CPU：4，内存：16G，磁盘：50GB+|
|**CentOS Stream** 8，9 |CPU：4，内存：16G，磁盘：50GB+|
|**Ubuntu** 16.x，18.x，20.x，22.x |CPU：4，内存：16G，磁盘：50GB+|
|**Debian** 9.x，10.x，11.x |CPU：4，内存：16G，磁盘：50GB+|
|**Anolis OS** 7.x，8.x |CPU：2，内存：16G，磁盘：50GB+|

如果使用 **CentOS 7** 操作系统，请务必升级操作系统内核；操作步骤参考 [CentOS系统内核升级攻略](https://t.goodrain.com/d/9-centos)。

### 其他要求

| 内核 | OpenSSH | 节点端口                  |
| ---- | ------- | ------------------------- |
| 4.0+ | 7.0+    | 80，443，6060，7070，8443 |


## 三、节点概述

节点类型属性说明如下，以下节点均可复用。

|IP|节点属性|
| ---- | ---- |
|192.168.0.10|Kubernetes 管理，计算，ETCD节点；Rainbond 网关，构建节点，存储节点，Mysql 主|
|192.168.0.11|Kubernetes 管理，计算，ETCD节点；Rainbond 网关，构建节点，存储节点，Mysql 从|
|192.168.0.12|Kubernetes 管理，计算，ETCD节点；Rainbond 网关，构建节点，存储节点|

节点说明：

* Kubernetes 管理节点
* 计算节点：为工作负载提供计算资源
* ETCD节点：用于保存 Kubernetes 集群所有的网络配置和对象的状态信息
* 网关节点：Rainbond 平台与应用访问的入口
* 构建节点：Rainbond 执行源码构建任务的节点
* 存储节点：部署分布式存储，为 Rainbond 提供共享存储

### 磁盘分区

磁盘分区建议使用逻辑卷lvm，便于后期扩容。

| IP           | 系统盘分区 & Size | 数据盘分区 & Size                                            |
| ------------ | ----------------- | ------------------------------------------------------------ |
| 192.168.0.10 | / ，50G；         | /var/lib/docker，300G；/var/lib/etcd 50G；/cache 100G；/data 1T+； |
| 192.168.0.11 | / ，50G；         | /var/lib/docker，300G；/var/lib/etcd 50G；/cache 100G；/data 1T+； |
| 192.168.0.12 | / ，50G；         | /var/lib/docker，300G；/var/lib/etcd 50G；/cache 100G；/data 1T+； |

磁盘说明：

* /var/lib/docker：Docker 数据分区
* /var/lib/etcd：ETCD 数据分区
* /cache：源码构建缓存数据分区
* /data：共享存储数据分区

## 四、安装容器运行时

Rainbond 支持 Docker 和 Containerd 两种容器运行时

### 使用 Docker

Rainbond 支持 Docker `19.03.0+` 版本，使用 Rainbond 提供的脚本安装 Docker。

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

### 使用 Containerd

Rainbond 支持 Containerd 1.2.0+ 版本，安装 Containerd 请参考 [Containerd 官方文档](https://containerd.io/docs/getting-started/)。

## 五、安装 MySQL

Rainbond 需要使用MySQL存储控制台及集群端数据，若用户已有高可用数据库则可直接使用，需满足以下条件：

* 数据库版本为MySQL 5.7，8.0；
* 提前创建 `console` `region` 库；
* 数据库字符编码为utf8mb4；
* 推荐数据库与 Rainbond 集群网络在同一内网范围内。

如还未安装数据库，请参阅文档安装 [在 Docker 中部署 MySQL 主从集群](./mysql-ha#在-docker-中部署-mysql-主从集群)、[在 Centos 7 中部署 MySQL 主从集群](./mysql-ha#在-centos-7-中部署-mysql-主从集群)


## 六、安装负载均衡

Rainbond 集群网关需要部署在高可用的负载均衡器上，保障集群网关的高可用性。

### 使用已有的负载均衡器

若用户已有高可用的负载均衡器，可直接使用，需满足以下条件：

* 代理到 Rainbond 网关节点
* 开放 80，443，6060，7070，8443 端口

在后续部署 Rainbond 集群时填写负载均衡地址即可。

### 部署 Keepalived 

若还没有负载均衡服务则可通过在网关节点上部署 Keepalived 服务来确保网关的高可用性，通过该种方式网关节点为主备关系。请参阅文档 [部署 Keepalived](./deploy-keepalived)

## 七、安装 Kubernetes 集群

参阅文档 [安装 Kubernetes 集群](installation/ha-deployment/deploy-k8s/)

## 八、复用 Kubernetes ETCD

Rainbond 集群需要使用 ETCD 用来存储集群的元数据信息，集群状态和网络配置，通常情况下复用 Kubernetes 的 ETCD 即可。

* ETCD 对磁盘性能要求较高，强烈建议存储使用SSD磁盘.

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

## 九、分布式文件存储安装

参阅文档 [分布式文件存储安装](installation/ha-deployment/storage/)

## 十、Rainbond 集群安装

参阅文档 [Rainbond 集群安装](installation/ha-deployment/deploy-rainbond/)

## 十一、Rainbond 控制台高可用

参阅 [Rainbond 控制台高可用](installation/ha-deployment/console-recover)