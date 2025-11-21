---
title: 命令参数
description: ROI 工具的所有命令和参数详细说明
keywords:
- ROI 命令
- ROI 参数
- ROI 使用手册
---

本文档详细介绍 ROI 工具的所有命令和参数。

## 全局参数

所有命令都支持以下全局参数:

```bash
-d, --debug    # 启用调试输出,显示详细日志
```

## roi up - 安装集群

安装 Rainbond 集群的主命令。

### 基本用法

```bash
roi up [flags]
```

### 参数说明

**配置文件参数:**

```bash
-f, --file string    # 指定集群配置文件路径(默认: cluster.yaml)
```

**阶段控制参数:**

支持只执行特定阶段,用于调试或重试:

```bash
--check              # 只执行环境检查阶段
--optimize           # 只执行系统优化阶段
--rke2               # 只执行 RKE2 安装阶段
--mysql              # 只执行 MySQL 安装阶段
--rainbond           # 只执行 Rainbond 安装阶段
```

**存储专用参数:**

细粒度控制存储配置:

```bash
--storage-lvm                # 只配置 LVM 存储
--storage-nfs                # 只设置 NFS 服务器
--storage-nfs-provisioner    # 只安装 NFS provisioner
```

**安装选项:**

```bash
--skip-production-check      # 跳过生产环境检查(仅用于开发/测试)
--skip-optimize              # 跳过系统优化阶段
```

### 使用示例

```bash
# 单机零配置安装
roi up

# 使用配置文件完整安装
roi up -f production.yaml

# 只检查环境
roi up -f cluster.yaml --check

# 只配置 LVM 存储
roi up -f cluster.yaml --storage-lvm

# 重新部署 Rainbond(保留 Kubernetes)
roi up -f cluster.yaml --rainbond

# 跳过检查快速安装(开发环境)
roi up --skip-production-check --skip-optimize

# 启用调试日志
roi up -f cluster.yaml -d
```

## roi download - 下载离线包

下载 Kubernetes 和 Rainbond 的离线安装包。

### 基本用法

```bash
roi download [flags]
```

### 参数说明

```bash
-o, --output-dir string      # 输出目录(默认: ./offline-packages)
--components strings         # 指定下载组件,逗号分隔
                            # 可选: rke2,storage,rainbond
--concurrent int            # 并发下载数(默认: 3)
--dry-run                   # 预览下载列表,不实际下载
-y, --yes                   # 自动确认,不提示
--rke2-version string       # 指定 RKE2 版本
--rbd-version string        # 指定 Rainbond 版本
--arch string               # 指定架构(amd64/arm64,默认自动检测)
```

### 使用示例

```bash
# 下载默认版本的所有组件
roi download

# 下载特定版本
roi download --rbd-version v6.4.0-release

# 预览下载内容(不实际下载)
roi download --dry-run
```

## roi add node - 添加节点

将新节点添加到现有集群。

### 基本用法

```bash
roi add node [node-name] [flags]
```

### 参数说明

```bash
-c, --config string     # 配置文件路径(默认: cluster.yaml)
--all                   # 添加配置文件中的所有新节点
--skip-confirm          # 跳过确认提示
```

### 使用示例

```bash
# 添加单个节点
roi add node worker-2

# 添加配置文件中的所有新节点
roi add node --all -c cluster.yaml
```

### 操作流程

1. 读取集群配置文件
2. 验证新节点配置
3. 检查节点 SSH 连接
4. 安装 RKE2 并加入集群
5. 等待节点 Ready

## roi delete node - 删除节点

从集群中安全删除节点。

### 基本用法

```bash
roi delete node <node-name> [flags]
```

### 使用示例

```bash
roi delete node worker-1
```

### 操作流程

1. 验证节点存在于集群中
2. 删除节点密码 secret
3. Drain 节点(驱逐所有 Pod)
4. 从 Kubernetes 删除节点
5. 停止 RKE2 服务
6. 卸载 RKE2 并清理数据

## roi delete rainbond - 卸载 Rainbond

从集群中卸载 Rainbond 平台。

:::warning 注意
如果 MySQL 是通过 ROI 安装的(database.mysql.enabled: true),该命令也会一并卸载 MySQL 主从集群。
:::

### 基本用法

```bash
roi delete rainbond [flags]
```

### 操作流程

1. 卸载 Rainbond Helm release
2. 卸载 MySQL 集群(如果通过 ROI 安装)
   - 删除 MySQL Helm release
   - 删除 MySQL PVC 和数据
3. 删除 Rainbond namespace
4. 删除 Persistent Volumes
5. 删除 CRDs(Rainbond + APISIX)
6. 清理 `/opt/rainbond` 目录
7. 清理 Helm 配置

:::warning 注意
- 该操作会删除所有 Rainbond 数据,包括应用、配置、用户数据等
- 如果 MySQL 是通过 ROI 安装的,MySQL 数据也会被删除
- **执行前务必备份重要数据**
:::

## roi delete cluster - 删除整个集群

删除整个 Kubernetes 集群和所有组件。

### 基本用法

```bash
roi delete cluster [flags]
```

### 操作流程

1. 卸载 Rainbond(如果已安装,包括 MySQL)
2. 并发停止所有节点的 RKE2 服务
3. 并发卸载所有节点的 RKE2
4. 清理所有数据和配置
5. 删除临时文件

