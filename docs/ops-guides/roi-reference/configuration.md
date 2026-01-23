---
title: 配置文件详解
description: ROI 配置文件的完整说明和配置示例
keywords:
- ROI 配置
- cluster.yaml
- ROI 配置参数
---

本文档详细介绍 ROI 配置文件 `cluster.yaml` 的所有配置项和使用方法。

## 配置文件结构

ROI 使用 YAML 格式的配置文件来定义集群拓扑和组件配置。配置文件主要包含以下部分:

1. **hosts** - 主机定义
2. **roleGroups** - 角色分配
3. **storage** - 存储配置
4. **database** - 数据库配置
5. **rainbond** - Rainbond 配置

## 完整配置示例

以下是一个包含所有配置项的完整示例:

```yaml
# ==========================================
# 主机配置
# ==========================================
hosts:
  - name: node-1                          # 主机名
    address: 192.168.1.10                 # 公网 IP
    internalAddress: 172.16.0.10          # 内网 IP
    port: 22                              # SSH 端口(默认: 22)
    user: root                            # SSH 用户
    password: "SecurePassword123!"        # SSH 密码

  - name: node-2
    address: 192.168.1.11
    internalAddress: 172.16.0.11
    user: root
    password: "SecurePassword123!"

  - name: node-3
    address: 192.168.1.20
    internalAddress: 172.16.0.20
    user: root
    password: "SecurePassword123!"

# ==========================================
# 角色分配
# ==========================================
roleGroups:
  # Etcd 节点
  etcd:
    - node-1
    - node-2
    - node-3

  # Master 节点(控制平面)
  master:
    - node-1
    - node-2
    - node-3

  # Worker 节点(运行业务负载)
  worker:
    - node-1
    - node-2
    - node-3

  # NFS 服务器节点(只能一个)
  nfs-server:
    - node-1

  # Rainbond 网关节点(可多个,用于高可用)
  rbd-gateway:
    - node-1
    - node-2
    - node-3

  # Rainbond 构建节点(可多个)
  rbd-chaos:
    - node-1
    - node-2
    - node-3

# ==========================================
# 存储配置
# ==========================================
storage:
  # LVM 配置，自动创建 RKE2 和 Rainbond 所需的逻辑卷
  lvm:
    enabled: false        # 是否启用 LVM，默认 false
    # 填写各个节点的磁盘设备列表，必须与 hosts 中的节点一一对应
    nodeDevices:
      node-1:
        - /dev/sdb
        - /dev/sdc
      node-2:
        - /dev/nvme0n1
      node-3:
        - /dev/vdb

    # 方式1: 百分比分配(推荐)
    rke2Percentage: 70       # RKE2 存储占比 70% (/var/lib/rancher/rke2)，存储 RKE2 数据包括镜像数据等
    rainbondPercentage: 30   # Rainbond 存储占比 30% (/opt/rainbond)，组件本地存储默认路径以及构建缓存数据等
    # rke2Percentage: 100    # 如果为 100 则只创建 RKE2 分区
    # rainbondPercentage: 0  # 如果为 0 则跳过 Rainbond 分区创建

    # 方式2: 固定大小分配(会覆盖百分比配置)
    # rke2Size: "200G"
    # rainbondSize: "100G"

  # NFS Server 配置
  nfs:
    enabled: false               # 是否启用 NFS，默认 false，启动后会在 nfs-server 节点上安装 NFS 服务
    sharePath: /nfs-data/k8s     # NFS 共享路径，默认 /nfs-data/k8s
    storageClass:
      enabled: true              # 是否创建 StorageClass，默认 true


# ==========================================
# 数据库配置
# ==========================================
database:
  # 启用 ROI 工具安装的 MySQL 主从集群
  mysql:
    enabled: false                          # 是否启用，默认 false
    masterPassword: "Root123456"            # Root 用户默认密码
    replicationPassword: "ReplPassword123!" # 复制用户默认密码
    replicaCount: 1                         # secondary副本数,默认1
    # 持久化配置(自动推断)
    # persistence:
    #   enabled: true                        # 自动根据 mysql.enabled 设置
    #   storageClass: "nfs-storage"          # 自动根据 nfs.enabled 选择，如果启用 NFS 则为 nfs-storage，否则为 local-path（本地存储）
    #   size: "5Gi"                          # 数据卷大小
  # 对接集群之外的自定义 MySQL 数据库
  custom:
    enabled: false                           # 是否启用，默认 false 
    console:                                 # Rainbond 控制台数据库配置        
      host: "mysql.example.com"                 # MySQL 主机地址
      port: 3306                                # MySQL 端口
      database: "console"                       # 数据库名称
      username: "rainbond"                      # 数据库用户名
      password: "your-password"                 # 数据库密码
    region:                                  # Rainbond Region 数据库配置
      host: "mysql.example.com"                 # MySQL 主机地址
      port: 3306                                # MySQL 端口
      database: "region"                        # 数据库名称
      username: "rainbond"                      # 数据库用户名
      password: "your-password"                 # 数据库密码

# ==========================================
# Rainbond 配置
# ==========================================
rainbond:
  # 通过 github release 获取最新版本号，https://github.com/goodrain/rainbond/releases/latest
  version: v6.x.x-release                   # 默认 Rainbond 最新版本
```

## 配置项详细说明

### hosts - 主机配置

定义集群中的所有节点。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | string | 是 | - | 主机名,集群内唯一标识 |
| address | string | 是 | - | 公网 IP 地址(没公网IP写内网IP),用于 SSH 连接 |
| internalAddress | string | 是 | address | 内网 IP 地址,用于集群网络通信 |
| port | int | 否 | 22 | SSH 端口 |
| user | string | 是 | - | SSH 用户名 |
| password | string | 是 | - | SSH 密码 |

**示例:**

```yaml
hosts:
  - name: node-1
    address: 192.168.1.10
    internalAddress: 10.0.0.10
    port: 22
    user: root
    password: "password123"
```

### roleGroups - 角色分配

定义节点的角色。节点可以有多个角色。

| 角色 | 必需 | 说明 | 推荐数量 |
|------|------|------|----------|
| etcd | 是 | Etcd 集群节点 | 1, 3, 5(奇数) |
| master | 是 | Kubernetes 控制平面节点 | 1, 3, 5 |
| worker | 是 | Kubernetes 工作节点 | >= 1 |
| nfs-server | 条件 | NFS 服务器节点 | 1(启用 NFS 时必需) |
| rbd-gateway | 是 | Rainbond 网关节点 | >= 1 |
| rbd-chaos | 是 | Rainbond 构建节点 | >= 1 |

**示例:**

```yaml
roleGroups:
  etcd: [master-1, master-2, master-3]
  master: [master-1, master-2, master-3]
  worker: [worker-1, worker-2]
  nfs-server: [master-1]
  rbd-gateway: [worker-1, worker-2]
  rbd-chaos: [worker-1, worker-2]
```

### storage - 存储配置

#### storage.lvm - LVM 存储配置

自动配置 LVM 存储,为 RKE2 和 Rainbond 创建独立的逻辑卷，并分别挂载到 `/var/lib/rancher/rke2` 和 `/opt/rainbond`。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| enabled | bool | 是 | false | 是否启用 LVM |
| nodeDevices | []list | 是 | - | 节点磁盘设备列表 |
| rke2Percentage | int | 条件 | - | RKE2 存储占比(0-100)，为0代表跳过创建 |
| rainbondPercentage | int | 条件 | - | Rainbond 存储占比(0-100)，为0代表跳过创建 |
| rke2Size | string | 条件 | - | RKE2 固定大小(如 "200G") |
| rainbondSize | string | 条件 | - | Rainbond 固定大小(如 "100G") |

**注意:**
- 百分比和固定大小二选一,固定大小优先级更高
- 百分比之和应为 100

**示例 1: 百分比分配**

```yaml
storage:
  lvm:
    enabled: true
    nodeDevices:
      node-1:
        - /dev/sdb
        - /dev/sdc
      node-2:
        - /dev/nvme0n1
      node-3:
        - /dev/vdb
    rke2Percentage: 70
    rainbondPercentage: 30
```

**示例 2: 固定大小分配**

```yaml
storage:
  lvm:
    enabled: true
    nodeDevices:
      node-1:
        - /dev/sdb
        - /dev/sdc
      node-2:
        - /dev/nvme0n1
      node-3:
        - /dev/vdb
    rke2Size: "300G"
    rainbondSize: "200G"
```

#### storage.nfs - NFS 存储配置

配置 NFS 共享存储。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| enabled | bool | 是 | false | 是否启用 NFS |
| sharePath | string | 是 | - | NFS 共享路径 |
| storageClass.enabled | bool | 否 | true | 是否创建 StorageClass |

**示例:**

```yaml
storage:
  nfs:
    enabled: true
    sharePath: /nfs-data/k8s
    storageClass:
      enabled: true
```

### database - 数据库配置

:::info

如果 mysql.enabled 和 custom.enabled 都为 false，那么将会使用 Rainbond 创建的单节点 rbd-db 为默认数据库。

:::

#### mysql - 内置安装

配置 MySQL 主从数据库，默认由 ROI 程序自动安装。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| mysql.enabled | bool | 是 | false | 是否启用外部 MySQL |
| mysql.masterPassword | string | 是 | - | Root 密码 |
| mysql.replicationPassword | string | 是 | - | 复制密码 |
| mysql.replicaCount | int | 否 | 1 | secondary副本数 |
| mysql.persistence.enabled | bool | 否 | - | 自动根据 enabled 推断 |
| mysql.persistence.storageClass | string | 否 | - | 自动根据 NFS 配置推断 |
| mysql.persistence.size | string | 否 | 5Gi | 数据卷大小 |

**示例:**

```yaml
database:
  mysql:
    enabled: true
    masterPassword: "MySQL@Root123!"
    replicationPassword: "MySQL@Repl123!"
    replicaCount: 2  # 主从复制
```

#### custom - 外部自定义

配置外部自定义数据库。

| 字段                    | 类型   | 必需 | 默认值 | 说明                               |
| ----------------------- | ------ | ---- | ------ | ---------------------------------- |
| custom.enabled          | bool   | 是   | false  | 是否启用外部数据库                 |
| custom.console          | -      | -    | -      | 配置外部自定义控制台端的数据库信息 |
| custom.console.host     | string | 是   | -      | 数据库地址                         |
| custom.console.port     | int    | 是   | -      | 数据库端口                         |
| custom.console.database | string | 是   | -      | 数据库名称                         |
| custom.console.username | string | 是   | -      | 数据库用户名                       |
| custom.console.password | string | 是   | -      | 数据库密码                         |
| custom.region           | -      | -    | -      | 配置外部自定义集群端的数据库信息   |
| custom.region.host      | string | 是   | -      | 数据库地址                         |
| custom.region.port      | int    | 是   | -      | 数据库端口                         |
| custom.region.database  | string | 是   | -      | 数据库名称                         |
| custom.region.username  | string | 是   | -      | 数据库用户名                       |
| custom.region.password  | string | 是   | -      | 数据库密码                         |

**示例:**

```yaml
database:
  custom:
    enabled: true
    console:
      host: "mysql.example.com"
      port: 3306
      database: "console"
      username: "rainbond"
      password: "your-password"
    region:
      host: "mysql.example.com"
      port: 3306
      database: "region"
      username: "rainbond"
      password: "your-password"
```

### rainbond - Rainbond 配置

配置 Rainbond 平台。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| version | string | 否 | https://github.com/goodrain/rainbond/releases/latest | Rainbond 版本 |
| values | object | 否 | - | 自定义 Helm values |

**自定义 Helm values 示例:**

```yaml
rainbond:
  version: ""
  values:
```
