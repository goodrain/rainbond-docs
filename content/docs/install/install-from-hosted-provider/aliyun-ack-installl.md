---
title: '基于阿里云ACK私有部署'
weight: 1
description: '基于阿里云 ACK 托管集群安装 Rainbond'
draft: true
---

本文将会介绍如何基于阿里云 ACK 托管集群私有化安装 Rainbond 集群。

### 前提条件

开始之前，请确定已经购买了以下阿里云资源，所有资源要求在同一区域：

1. 阿里云 ACK 托管集群：

   - ACK Kubernetes 版本高于 1.13.0
   - 集群内至少 2 节点，并配置好 `kubectl` 命令，使之可用
   - 节点具备公网访问能力
   - 配置要求 8 核 CPU 32G 内存
   - 磁盘空间： 根分区 200G 数据分区（docker 分区）300G

2. SLB 负载均衡：

   - 具备一个 **公网 IP 地址**
   - 将 ACK 集群中的节点纳入后端服务器组
   - 配置以下端口映射：80 443 6060 7070 30008

3. NAS 存储服务：

   - 提供一个挂载点，格式类似 `123456789-var48.cn-shanghai.nas.aliyuncs.com:/`
   - 关闭访问控制（黑白名单），或针对所有 ACK 节点开启访问权限

4. RDS 数据库服务：

   - 预先生成两个数据库实例： `console` `region`
   - 生成数据库账户密码，对上述数据库赋予全部权限
   - 关闭访问控制（黑白名单），或针对所有 ACK 节点开启访问权限
   - 数据库版本选择 8.0
   - 数据库磁盘空间不少于 5 G

5. 容器镜像服务：
   - 创建好命名空间、用户名、密码
   - 自动创建仓库：开启
   - 默认仓库类型：私有

### 使用 Helm 3 安装 Rainbond Operator

推荐使用 [Helm](https://helm.sh/) 来安装 Rainbond Opeartor。

#### 安装 Helm 3

使用以下命令镜像安装（如果已安装了 Helm 3，可以跳过这一步骤）：

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

通过以下方式，验证 Helm 已经安装成功：

```bash
helm version
```

#### 安装 Rainbond Operator

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

### 高可用安装 Rainbond

访问 Rainbond Operator，开始安装 Rainbond。

**1 访问 Rainbond Operator**

打开浏览器，输入 **SLB 公网 IP** 地址：`http://<SLB_IP>:30008`. 即可进入安装页面。

**2 配置安装模式**

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-1.png" title="安装模式" width="100%">}}

**3 配置镜像仓库**

选择 **提供已有的镜像仓库**，需要用户提供已存在的镜像仓库的 域名、空间名称、用户名以及密码。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-3.png" title="已有镜像仓库" width="100%">}}

**4 配置数据中心数据库**

高可用安装环境下，阿里云用户务必提供外接高可用的 RDS Mysql 8.0 数据库，该数据库中需要提前创建 `region` 数据库，需要提供内网可访问的 RDS 域名、用户名、密码：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-4.png" title="数据中心数据库" width="100%">}}

**5 配置控制台数据库**

高可用安装环境下，阿里云用户务必提供外接高可用的 RDS Mysql 8.0 数据库，该数据库中需要提前创建 `console` 数据库，需要提供内网可访问的 RDS 域名、用户名、密码：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-5.png" title="控制台数据库" width="100%">}}

**6 配置 ETCD**

选择 **新安装 ETCD（支持 HA）**，将会在安装过程中自动安装支持高可用的 ETCD 集群：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-6.png" title="新安装 ETCD " width="100%">}}

如用户在阿里云环境中具备可用的 ETCD 集群，则选择 **提供已有的 ETCD**，则需要用户提供已存在的 ETCD 集群实例地址列表：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-7.jpg" title="已有 ETCD" width="100%">}}

**7 配置网关节点**

高可用环境中，至少选择 `2` 个节点作为集群 **网关节点** ，推荐将所有节点作为网关节点使用，要求节点的 80、443、6060、7070、8443、10254、18080、18081 端口没有被占用。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-8.png" title="网关节点" width="100%">}}

> 提示：如果你无法搜索并选择一个网关 IP，请参考[无法选择网关节点](/docs/user-operations/install/troubleshooting/#无法选择网关节点)。

**8 配置构建服务运行节点**

高可用环境中，至少选择 `2` 个节点作为集群 **构建服务运行节点** ，阿里云用户可以 `搜索选择 2` 个 node 节点，作为构建服务运行节点。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-9.png" title="构建服务运行节点" width="100%">}}

**9 配置分配默认域名**

开启此项功能（默认），该功能可以为集群分配一个可以被公网解析的泛解析域名。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-10.png" title="分配默认域名" width="100%">}}

**10 配置网关公网 IP**

该选项为 **必填**，填写负载均衡的 IP 地址，即阿里云 **SLB 公网 IP** 地址。

**11 配置共享存储**

阿里云环境，请使用 `阿里云 NAS`：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-12.png" title="阿里云 NAS 存储" width="100%">}}

**12 配置块设备存储**

该选项非必填。

如集群内存在已部署好的 **块设备存储驱动** 则可以直接选择，如 [ceph-rbd 块存储](/docs/user-operations/storage/ceph-rbd/)。

如果是阿里云环境，可以选择 [阿里云盘](/docs/user-operations/storage/ali-disk/)。

配置完成后，单击 **下一步** 。

**13 安装环境检测**

Rainbond-Operator 将会自动检测安装环境，全部通过后，点击 **检测通过，开始安装**。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/install/install-from-k8s/high-availability/high-availability-13.png" title="安装环境检测" width="100%">}}

> 如果安装受阻，可以参考[故障排查](/docs/user-operations/install/troubleshooting/)，或联系相应管理人员。

### 验证安装

当安装的进度全部走完，会跳转到以下页面：

![image-20200204141936123](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.2/rainbond-install-4.jpg)

说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。

### 安装命令行工具

为了方便运维管理集群请参照 [文档](/docs/user-operations/tools/grctl/) 安装 `grctl` 命令行工具。
