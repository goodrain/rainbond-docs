---
title: 离线安装
description: 使用 Rainbond ROI 工具进行离线安装的快速指南
keywords:
- Rainbond ROI 离线安装
- 离线 Kubernetes 安装
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 专题入口
如果你不是只想照着命令安装，而是想先判断自己更适合“纯离线安装、离线交付、麒麟 V10 / ARM 部署”还是“信创迁移”，建议先进入 [离线 / 信创 / 国产化专题](/offline-and-xinchuang)。
:::

离线安装是指在没有任何外网访问权限的环境中安装 Rainbond 平台。相比在线安装，离线安装需要提前在有外网访问权限的环境中下载好 RKE2、Helm Chart 和 Rainbond 镜像等离线包，并将其传输到目标环境中进行安装。离线安装适用于以下场景：
- 生产环境对安全要求较高，禁止直接访问互联网。
- 生产环境位于无法访问互联网的内网中。
- 等等。

## 前提

- 准备至少 3 台 Linux 主机及以上，所有节点内网互通。
- 生产环境建议配置 8 核 16GB 200GB。
- 所有节点可访问互联网，至少能访问 Rainbond、RKE2、Helm 相关镜像源。
- bootstrap 节点可通过 `root` 用户 SSH 到其他所有节点。
- 对外开放 7070、80、443、6060 端口；节点间放通 Kubernetes、RKE2 集群内部通信端口。

:::tip
支持 X86(amd64) 和 ARM(arm64) 架构的服务器，支持在国产化信创环境中安装部署。
:::

## 步骤一：下载离线安装包

以下操作均需在有外网访问权限的环境中进行。

1. 执行以下命令下载安装工具：

<Tabs groupId="install">
  <TabItem value="X86(amd64)" label="X86(amd64)" default>

```bash
curl -o roi https://get.rainbond.com/roi/roi-amd64 && chmod +x roi
```

  </TabItem>

  <TabItem value="ARM(arm64)" label="ARM(arm64)" default>

```bash
curl -o roi https://get.rainbond.com/roi/roi-arm64 && chmod +x roi
```

  </TabItem>
</Tabs>


2. 使用以下命令下载离线包:

```bash
./roi download
# 如无法使用命令行工具下载，请使用 ./roi download --details 查看离线包下载链接，手动下载后放到 offline-packages/ 目录中
```

3. 下载完成后应该看到以下文件:

```bash
roi                                             # 安装工具
offline-packages/
├── install.sh                                  # RKE2 安装脚本
├── rke2.linux-amd64.tar.gz                     # RKE2 二进制包
├── rke2-images.linux-amd64.tar.zst             # RKE2 镜像包
├── nfs-subdir-external-provisioner-4.0.18.tgz  # NFS Provisioner Helm Chart
├── mysql-14.0.3.tgz                            # MySQL Helm Chart
├── rainbond-images-amd64.tar.zst               # Rainbond 镜像包
├── rainbond.tgz                                # Rainbond Helm Chart
├── cnb-packages-amd64.tar.zst                  # Rainbond 源码构建包
├── cnb-images-amd64.tar.zst                    # Rainbond 源码构建镜像包
└── sha256sum-amd64.txt                         # 校验和文件
```

4. 将 `offline-packages/` 目录复制到目标离线环境的服务器上。

## 步骤二：开始离线安装

:::info
集群安装时必须在集群内的 `bootstrap` 节点上执行该命令，同时该节点上还要有 `offline-packages/` 目录。
```bash
./
├── roi
├── cluster.yaml
└── offline-packages/
```
:::

### 创建配置文件

在 bootstrap 节点创建 [cluster.yaml](#clusteryaml-完整配置示例)，下面是最小化 3 节点配置示例：

```yaml title="cluster.yaml"
hosts:
  - name: node1                    # 节点名称，任意命名但需唯一，后续 roleGroups 中会引用
    address: 192.168.1.10          # 节点公网 IP 地址，如无公网 IP 则填写内网 IP
    internalAddress: 192.168.1.10  # 节点内网 IP 地址
    user: root                     # SSH 用户，仅支持 root 用户
    password: "your-password"      # SSH 密码
    port: 22                       # SSH 端口，默认 22
    bootstrap: true                # 标记此节点为 bootstrap 节点（执行 roi up 的节点）必须为 master 节点之一，且只能有一个

  - name: node2
    address: 192.168.1.11
    internalAddress: 192.168.1.11
    user: root
    password: "your-password"
    port: 22


  - name: node3
    address: 192.168.1.12
    internalAddress: 192.168.1.12
    user: root
    password: "your-password"
    port: 22

roleGroups:
  etcd:        # etcd 节点，数量必须为奇数（1、3、5）
    - node1
  master:      # Kubernetes 控制面节点
    - node1
  worker:      # 业务负载节点
    - node1
    - node2
    - node3
  rbd-gateway: # Rainbond 网关节点，用于对外暴露服务
    - node1
  rbd-chaos:   # Rainbond 源码构建节点
    - node1
  nfs-server:  # 集群内 NFS Server 节点，只能指定一个
    - node1

storage:
  # 由 ROI 配置 NFS Server 和自动安装 nfs-client-provisioner StorageClass，默认 SC 名称为 nfs-storage。
  nfs:
    enabled: true
    sharePath: /nfs-data/k8s
    storageClass:
      enabled: true
```

:::warning 注意
在离线环境下启动 NFS 后，需要手动在所有节点上安装 NFS 包依赖。
```bash
# CentOS/RHEL
yum install -y nfs-utils rpcbind

# Ubuntu/Debian
apt-get update && apt-get install -y nfs-kernel-server nfs-common rpcbind
```
:::

### 执行安装

执行以下命令开始安装:

```bash
# 使用配置文件安装，默认读取 cluster.yaml
./roi up --mode offline
```

## 步骤三：访问 Rainbond

安装完成后，日志中会显示访问入口:

```bash
✅ Installation completed successfully!

📝 Next Steps:
  1. Access Rainbond console:
     http://192.168.1.10:7070

  2. Check cluster status:
     kubectl get nodes
     kubectl get pods -n rbd-system
```

## 离线环境下使用源码构建（可选）

如果您想要在离线环境下使用源码构建功能，请执行以下命令加载源码构建镜像:

```bash
./roi addon sourcebuild
```

注意：`offline-packages` 目录必须要存在源码构建离线镜像包

```bash
offline-packages/
├── cnb-packages-amd64.tar.zst
└── cnb-images-amd64.tar.zst
```

否则，则需要通过 `--components sourcebuild` 参数单独下载源码构建离线包:

```bash
./roi download --components sourcebuild
```

## 生产场景 cluster.yaml 配置参考

下面示例基于 3 节点生产可用集群，展示生产环境中常见的可选配置项，包括集群内 NFS、外部 NFS/NAS、复用已有 StorageClass、ROI 部署 MySQL 主从集群、对接外部 MySQL，以及对接外部镜像仓库。

示例中的配置项用于说明不同生产场景的写法，并不表示需要全部同时启用。请根据实际环境选择其中一种存储方式和一种数据库方式。

<details>
<summary>cluster.yaml 配置参考</summary>

```yaml title="cluster.yaml"
hosts:
  - name: node1                    # 节点名称，任意命名但需唯一，后续 roleGroups 中会引用
    address: 192.168.1.10          # 节点公网 IP 地址，如无公网 IP 则填写内网 IP
    internalAddress: 192.168.1.10  # 节点内网 IP 地址
    user: root                     # SSH 用户，仅支持 root 用户
    password: "your-password"      # SSH 密码
    port: 22                       # SSH 端口，默认 22
    bootstrap: true                # 标记此节点为 bootstrap 节点（执行 roi up 的节点）必须为 master 节点之一，且只能有一个

  - name: node2
    address: 192.168.1.11
    internalAddress: 192.168.1.11
    user: root
    password: "your-password"
    port: 22

  - name: node3
    address: 192.168.1.12
    internalAddress: 192.168.1.12
    user: root
    password: "your-password"
    port: 22

roleGroups:
  etcd:        # etcd 节点，数量必须为奇数（1、3、5）
    - node1
  master:      # Kubernetes 控制面节点
    - node1
  worker:      # 业务负载节点
    - node1
    - node2
    - node3
  rbd-gateway: # Rainbond 网关节点，用于对外暴露服务
    - node1
  rbd-chaos:   # Rainbond 源码构建节点
    - node1
  nfs-server:  # 集群内 NFS Server 节点，只能指定一个
    - node1

storage:
  # 由 ROI 配置 NFS Server 和自动安装 nfs-client-provisioner StorageClass，默认 SC 名称为 nfs-storage。
  nfs:
    enabled: true
    # server: 192.168.1.100  # 指定外部 NFS/NAS 地址。使用外部 NFS 时请注释掉 roleGroups.nfs-server 中的节点。
    sharePath: /nfs-data/k8s # 无论使用集群内 NFS Server 还是外部 NFS/NAS，都需要指定共享目录路径
    storageClass:            # 自动安装 nfs-client-provisioner StorageClass，默认名称为 nfs-storage。
      enabled: true

  # 复用已有共享 StorageClass。
  # 注意：storage.nfs.enabled 和 existingStorageClass.enabled 不能同时为 true。
  existingStorageClass:
    enabled: false
    name: managed-nfs-client

registry:
  # 如未指定外部镜像仓库，则会使用 Rainbond 默认启动的单节点 Docker Registry 运行在集群内。
  # Rainbond 平台使用的外部镜像仓库。
  external:
    enabled: false
    domain: registry.com      # 镜像仓库地址，需所有节点可访问
    namespace: rainbond       # 镜像仓库命名空间
    username: username        # 镜像仓库用户名
    password: password        # 镜像仓库密码
    scheme: https             # 默认 https；如果仓库是 HTTP，显式改成 http
    insecureSkipVerify: false # 是否跳过 TLS 证书验证，默认为 false

database:
  # 如 mysql.enabled 和 custom.enabled 都为 false，则会使用 Rainbond 默认启动的单节点 MySQL 运行在集群内。
  # 由 ROI 部署 MySQL 主从集群。
  mysql:
    enabled: false
    masterPassword: "Root123456"            # Root 用户默认密码
    replicationPassword: "ReplPassword123!" # 复制用户默认密码
    replicaCount: 1                         # 从节点数量，默认 1 个（即 1 主 1 从）
    persistence:                            # 是否启用持久化，默认 true
      enabled: true
      size: 50Gi
      # storageClass 不在这里指定。
      # 多节点 MySQL 持久化会使用 storage.nfs 或 existingStorageClass 推导出的共享存储。

  # 使用已有外部 MySQL。
  # 注意：database.mysql.enabled 和 database.custom.enabled 不能同时为 true。
  custom:
    enabled: false
    console:
      host: mysql.example.com
      port: 3306
      database: console
      username: rainbond
      password: rainbond123
    region:
      host: mysql.example.com
      port: 3306
      database: region
      username: rainbond
      password: rainbond123

# rainbond:
#   version: v6.x.x-release # Rainbond 版本，一般不需要修改。
```

</details>


## 常见问题

### 如何添加节点

先在 `cluster.yaml` 的 `hosts` 和 `roleGroups` 中加入新节点，再显式指定要添加的节点名：

```bash
./roi up -f cluster.yaml --add-nodes node4
./roi up -f cluster.yaml --add-nodes node4,node5
```

### 如何删除节点

先从 `roleGroups` 中移除目标节点（**保留** `hosts` 中的 SSH 信息，ROI 需要用它连接节点执行卸载），再显式指定要删除的节点名：

```bash
./roi up -f cluster.yaml --prune-nodes node4
./roi up -f cluster.yaml --prune-nodes node4,node5
```

### 如何启用调试日志

```bash
./roi up -f cluster.yaml -d
```

### 如何使用自己的分布式存储

比如你想在 ROI 中使用自己的 Ceph 存储或者其他分布式存储，你需要通过 ROI 的 `--stage` 阶段部署先安装 K8s 集群。

1. 先执行如下命令安装 Kubernetes，该命令只会执行 `prepare` 和 `rke2` 阶段，不会安装 NFS、MySQL、Rainbond：

```bash
./roi up -f cluster.yaml --stage rke2
```

2. 在 Kubernetes 集群上部署你的分布式存储，并确保它的 StorageClass 已经创建成功。记录下 StorageClass 的名称，后续安装 Rainbond 时需要用到。
3. 修改配置文件 `cluster.yaml`，将 `storage.nfs.enabled` 设置为 `false`，并启用 `storage.existingStorageClass`，指定你的分布式存储对应的 StorageClass 名称：

```yaml
storage:
  nfs:
    enabled: false
  existingStorageClass:
    enabled: true
    name: your-distributed-storage-class
```

3. 继续执行如下命令安装 Rainbond：

```bash
./roi up -f cluster.yaml --stage rainbond
./roi up -f cluster.yaml --stage mysql,rainbond 
# 如果你也想使用 ROI 部署的 MySQL，可以同时执行 mysql 和 rainbond 阶段。mysql 阶段会自动使用 storage.existingStorageClass.name 指定的 StorageClass 来部署 MySQL 的持久化存储。
```

### 提示必须在 bootstrap 节点执行怎么办？

确认当前节点是 `cluster.yaml` 中配置了 `bootstrap: true` 的节点。未配置时，请在第一个同时属于 `roleGroups.etcd` 和 `roleGroups.master` 的节点上执行。

## 下一步

- 跟随[快速入门](../quick-start/getting-started.md)教程，部署你的第一个应用
- 阅读[使用教程](../tutorial/via-rainbond-deploy-sourceandmiddleware.md)，学习和了解更多 Rainbond 功能
