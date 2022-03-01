---
title: '基于 K8s 高可用安装'
weight: 1
description: '在已有的高可用 Kubernetes 集群上安装高可用的 Rainbond 集群。'
---

本文描述如何在已有的高可用 Kubernetes 集群上安装高可用的 Rainbond 集群，适用于生产环境。

## 开始之前

在开始安装部署之前，需要准备以下资源：

- 高可用的 Kubernetes 集群， 且版本大于等于 **1.13** 。
- 高可用的共享存储，本文以 Glusterfs 为例，参考 [Glusterfs分布式存储](../user-operations/storage/deploy-glusterfs/)。
- 高可用的数据库，如 MySQL 8.0 数据库集群或 RDS 数据库服务，创建 `console`、`region` 两个数据库。
- ETCD 集群，可以复用 Kubernetes 集群已有的 ETCD 集群。

## 使用 Helm 3 安装 Rainbond Operator

推荐使用 [Helm](https://helm.sh/) 来安装 Rainbond Opeartor。

### 安装 Helm 3

使用以下命令镜像安装（如果已安装了 Helm 3，可以跳过这一步骤）：

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```
通过以下方式，验证 Helm 已经安装成功：

```bash
helm version
```

### 安装 Rainbond Operator

1. 创建 namespace, 推荐使用 `rbd-system`：

    ```bash
    kubectl create ns rbd-system
    ```

1. 添加 Rainbond Operator 的 chart 仓库：

    ```bash
    helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
    ```

1. 安装 Rainbond Operator

    ```bash
    helm install rainbond-operator rainbond/rainbond-operator \
    --namespace rbd-system \
    --version 1.1.1    
    ```

1. 确认状态

    ```bash
    $ kubectl get pod -n rbd-system
    NAME                  READY   STATUS    RESTARTS   AGE
    rainbond-operator-0   2/2     Running   0          110s
    ```


## 高可用安装 Rainbond

访问 Rainbond Operator，开始安装 Rainbond。

**1 访问 Rainbond Operator**

   打开浏览器，输入主机 IP 地址：`http://<SERVER_IP>:30008`. 可以通过以下命令获取 `SERVER_IP`：

```bash
echo $(kubectl get po rainbond-operator-0 -n rbd-system -o jsonpath="{..hostIP}")
```

> 注意，获取到的 `SERVER_IP` 是内网地址，请根据实际情况直接使用或替换为外网地址。

**2 配置安装模式**

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-1.png" title="安装模式" width="100%" />

**3 配置镜像仓库**

   选择 **新安装镜像仓库（支持HA）**，将会在安装过程中自动安装支持高可用的镜像仓库。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-2.png" title="新安装镜像仓库" width="100%" />

   选择 **提供已有的镜像仓库**，则需要用户提供已存在的镜像仓库的 域名、空间名称、用户名以及密码。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-3.png" title="已有镜像仓库" width="100%" /> 

**4 配置数据中心数据库**

   高可用安装环境下，用户务必提供外接高可用的 Mysql 8.0 数据库，该数据库中需要提前创建 `region` 数据库：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-4.png" title="数据中心数据库" width="100%" />


**5 配置控制台数据库**

   高可用安装环境下，用户务必提供外接高可用的 Mysql 8.0 数据库，该数据库中需要提前创建 `console` 数据库：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-5.png" title="控制台数据库" width="100%" />


**6 配置 ETCD**

   选择 **新安装ETCD（支持HA）**，将会在安装过程中自动安装支持高可用的 ETCD 集群：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-6.png" title="新安装 ETCD " width="100%" />

   选择 **提供已有的 ETCD**，则需要用户提供已存在的 ETCD 集群实例地址列表：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-7.jpg" title="已有 ETCD" width="100%" />

复用Kubernetes ETCD

* ETCD地址格式为： **IP:PORT** 或者 **Domain:PORT**  

  > 请确认是否通过文档 [kubernetes的高可用安装](../user-operations/install/kubernetes-install/#kubernetes的高可用安装)，如不是请确认ETCD地址 **Domain:PORT** 是否正常或更换ETCD地址为 IP:PORT

* TLS认证打开：
  * CA证书：/etc/kubernetes/ssl/ca.pem
  * 客户端证书：/etc/etcd/ssl/etcd.pem
  * 客户端密钥：/etc/etcd/ssl/etcd-key.pem  

**7 配置网关节点**

   高可用环境中，至少选择 `2` 个节点作为集群 **网关节点** ， 默认会选择 Kubernetes 集群中符合条件的 master 节点作为网关节点。

   如果你的集群中没有 master 节点（比如使用了各类公有云服务商提供的托管集群），那么你可以 `搜索选择 2` 个 80、443、6060、7070、8443、10254、18080、18081 端口没有被占用的 node 节点，作为网关节点。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-8.png" title="网关节点" width="100%" />
    
   > 提示：如果你无法搜索并选择一个网关 IP，请参考[无法选择网关节点](../user-operations/install/troubleshooting/#无法选择网关节点)。

**8 配置构建服务运行节点**

   高可用环境中，至少选择 `2` 个节点作为集群 **构建服务运行节点** ， 默认会选择 Kubernetes 集群中符合条件的 master 节点作为网关节点。

   如果你的集群中没有 master 节点（比如使用了各类公有云服务商提供的托管集群），那么你可以 `搜索选择 2` 个 node 节点（建议节点具备访问公网的能力），作为构建服务运行节点。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-9.png" title="构建服务运行节点" width="100%" />

**9 配置分配默认域名**

   当集群具备访问公网的能力时，开启此项功能（默认），该功能可以为集群分配一个可以被公网解析的泛解析域名。

   当集群不具备访问公网的能力时，关闭该功能。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-10.png" title="分配默认域名" width="100%" />

**10 配置网关公网IP**

   高可用环境中，该选项为 **必填**，且只可以在以下两个选项中选择：

   - 当多个网关节点被统一负载均衡时，填写负载均衡的 IP 地址，如阿里云 SLB 服务地址。

   - 当多个网关节点部署诸如 Keepalived 等基于 VIP 的高可用服务时，填写 VIP，参考 [为 CentOS 安装 Keepalived 服务](../user-operations/install/centos_keepalived/)、 [为 Ubuntu 安装 Keepalived 服务](../user-operations/install/ubuntu_keepalived/)。


**11 配置共享存储**

   在高可用环境，务必提供已有的共享存储：
    
   使用集群中已有的 `StorageClass`，该存储必须支持多读多写(`RWX`)，如果用户已经安装 [Glusterfs分布式存储](../user-operations/storage/deploy-glusterfs/)  或 已经 [对接外部NFS存储](../user-operations/storage/deploy-nfs_client/) 则可以直接选择：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-11.png" title="已有存储驱动选择" width="100%" />
    
   如果是阿里云环境，推荐使用 `阿里云 NAS`：

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-12.png" title="阿里云 NAS 存储" width="100%" />

**12 配置块设备存储**

   该选项非必填。

   如集群内存在已部署好的 **块设备存储驱动** 则可以直接选择，如 [ceph-rbd块存储](../user-operations/storage/ceph-rbd/)。

   如果是阿里云环境，可以选择 [阿里云盘](../user-operations/storage/ali-disk/)。

   配置完成后，单击 **下一步** 。

**13 安装环境检测**

   Rainbond-Operator 将会自动检测安装环境，全部通过后，点击 **检测通过，开始安装**。

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-13.png" title="安装环境检测" width="100%" />

   > 如果安装受阻，可以参考[故障排查](../user-operations/install/troubleshooting/)，或联系相应管理人员。

## 验证安装

当安装的进度全部走完，会跳转到以下页面：

![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)

说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。

## 问题排查

在安装和使用过程中出现问题请参考[安装过程故障排除文档](../user-operations/install/troubleshooting)和[集群问题诊断文档](../user-operations/troubleshoot/cluster_troubleshooting)

## 安装命令行工具

为了方便运维管理集群请参照[文档](../user-operations/tools/grctl/)安装 `grctl` 命令行工具。

## 卸载

卸载程序将删除 RBAC 权限，rbd-system 命名空间和所有相关资源。

### 卸载 Rainbond

访问 Rainbond Operator 的 UI 界面，单击 **卸载** 即可。

### 卸载 Rainbond Operator

```bash
helm delete rainbond-operator -n rbd-system
```
