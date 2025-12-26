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
  # Master 节点 1
  - name: master-1                        # 主机名
    address: 192.168.1.10                 # 公网 IP
    internalAddress: 172.16.0.10          # 内网 IP
    port: 22                              # SSH 端口(默认: 22)
    user: root                            # SSH 用户
    password: "SecurePassword123!"        # SSH 密码

  - name: master-2
    address: 192.168.1.11
    internalAddress: 172.16.0.11
    user: root
    password: "SecurePassword123!"

  - name: worker-1
    address: 192.168.1.20
    internalAddress: 172.16.0.20
    user: root
    password: "SecurePassword123!"

# ==========================================
# 角色分配
# ==========================================
roleGroups:
  # Etcd 节点(通常是 master 节点)
  etcd:
    - master-1
    - master-2

  # Master 节点(控制平面)
  master:
    - master-1
    - master-2

  # Worker 节点(运行业务负载)
  worker:
    - worker-1

  # NFS 服务器节点(只能一个)
  nfs-server:
    - master-1

  # Rainbond 网关节点(可多个,用于高可用)
  rbd-gateway:
    - worker-1

  # Rainbond Chaos 节点(可多个)
  rbd-chaos:
    - worker-1

# ==========================================
# 存储配置
# ==========================================
storage:
  # LVM 自动配置
  lvm:
    enabled: false                         # 是否启用 LVM
    devices: []                            # 设备列表(空=自动扫描未使用的磁盘)
                                           # 或手动指定: ["/dev/sdb", "/dev/sdc"]

    # 方式1: 百分比分配(推荐)
    rke2Percentage: 70                    # RKE2 存储占比 70%
    rainbondPercentage: 30                # Rainbond 存储占比 30%

    # 方式2: 固定大小分配(会覆盖百分比配置)
    # rke2Size: "200G"
    # rainbondSize: "100G"

  # NFS 配置
  nfs:
    enabled: true                          # 是否启用 NFS
    sharePath: /nfs-data/k8s              # NFS 共享路径
    storageClass:
      enabled: true                        # 是否创建 StorageClass


# ==========================================
# 数据库配置
# ==========================================
database:
  mysql:
    enabled: true                          # 是否启用外部 MySQL
    masterPassword: "RootPassword123!"     # Root 密码
    replicationPassword: "ReplPass123!"    # 复制密码
    replicaCount: 1                        # secondary副本数,默认1
    # 持久化配置(自动推断)
    # persistence:
    #   enabled: true                        # 自动根据 mysql.enabled 设置
    #   storageClass: "nfs-storage"          # 自动根据 nfs.enabled 选择
    #   size: "5Gi"                          # 数据卷大小

# ==========================================
# Rainbond 配置
# ==========================================
rainbond:
  version: v6.4.0-release                   # Rainbond 版本

  # 自定义 Helm values(可选)
  # values:

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
| devices | []string | 否 | [] | 磁盘设备列表,空则自动扫描 |
| rke2Percentage | int | 条件 | - | RKE2 存储占比(0-100) |
| rainbondPercentage | int | 条件 | - | Rainbond 存储占比(0-100) |
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
    devices: []  # 自动扫描
    rke2Percentage: 70
    rainbondPercentage: 30
```

**示例 2: 固定大小分配**

```yaml
storage:
  lvm:
    enabled: true
    devices: ["/dev/sdb", "/dev/sdc"]
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

配置外部 MySQL 数据库。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| enabled | bool | 是 | false | 是否启用外部 MySQL |
| masterPassword | string | 是 | - | Root 密码 |
| replicationPassword | string | 是 | - | 复制密码 |
| replicaCount | int | 否 | 1 | secondary副本数 |
| persistence.enabled | bool | 否 | - | 自动根据 enabled 推断 |
| persistence.storageClass | string | 否 | - | 自动根据 NFS 配置推断 |
| persistence.size | string | 否 | 5Gi | 数据卷大小 |

**示例:**

```yaml
database:
  mysql:
    enabled: true
    masterPassword: "MySQL@Root123!"
    replicationPassword: "MySQL@Repl123!"
    replicaCount: 2  # 主从复制
```

### rainbond - Rainbond 配置

配置 Rainbond 平台。

| 字段 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| version | string | 否 | v6.4.0-release | Rainbond 版本 |
| values | object | 否 | - | 自定义 Helm values |

**自定义 Helm values 示例:**

```yaml
rainbond:
  version: "v6.4.0-release"
  values:
```
