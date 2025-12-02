---
title: 快速开始
description: 使用 Rainbond ROI 工具进行离线安装的快速指南
keywords:
- Rainbond ROI 离线安装
- 离线 Kubernetes 安装
---

## 前置条件

**硬件要求:**
- CPU: 4 核及以上
- 内存: 8GB 及以上
- 磁盘: 100GB 及以上可用空间
- 操作系统: Ubuntu 20.04+

:::warning 注意
- 目前仅在 Ubuntu 20/22/24 上进行了测试，其他操作系统没有经过充分验证。
:::

## 一、下载 ROI 工具

```bash
# 下载最新版本 ROI
curl -o roi https://get.rainbond.com/roi/roi-amd64 && chmod +x roi
# roi-amd64 or roi-arm64

# 验证安装
./roi version
```

## 二、下载离线包

1. 在有网络的环境中,使用以下命令下载离线包:

```bash
# 下载默认版本的所有离线包
./roi download

# 下载特定版本
./roi download --rbd-version v6.4.0-release
```

2. 下载完成后应该看到以下文件:

```bash
offline-packages/
├── install.sh                                  # RKE2 安装脚本
├── rke2.linux-amd64.tar.gz                     # RKE2 二进制包
├── rke2-images.linux-amd64.tar.zst             # RKE2 镜像包
├── nfs-subdir-external-provisioner-4.0.18.tgz  # NFS Provisioner Helm Chart
├── mysql-14.0.3.tgz                            # MySQL Helm Chart
├── rainbond-images-amd64.tar.zst               # Rainbond 镜像包
├── rainbond.tgz                                # Rainbond Helm Chart
└── sha256sum-amd64.txt                         # 校验和文件
```

3. 将 `offline-packages/` 目录复制到目标离线环境的服务器上。

## 三、单机快速安装

:::warning 注意
单机快速安装默认 NFS 使用存储，需要您手动安装 `nfs-common` 包:

```bash
apt-get update && apt-get install -y nfs-common
```
:::

ROI 支持零配置的单机快速安装:

```bash
# 自动生成配置并安装
./roi up
```

ROI 会自动:
- 检测 `offline-packages/` 目录并使用离线包
- 生成单机配置文件
- 配置 NFS 存储
- 安装 Kubernetes + Rainbond

## 四、集群模式安装

:::info
集群安装时必须在集群内的某个节点上执行该命令，同时该节点上还要有 `offline-packages/` 目录。
```bash
./
├── roi
├── cluster.yaml
└── offline-packages/
```
:::

对于生产环境,建议使用配置文件方式:

**集群配置示例:**

```yaml title="vim cluster.yaml"
hosts:
  - name: node-1
    address: 172.16.0.134
    internalAddress: 172.16.0.134
    user: root
    password: root

  - name: node-2
    address: 172.16.0.135
    internalAddress: 172.16.0.135
    user: root
    password: root

  - name: node-3
    address: 172.16.0.136
    internalAddress: 172.16.0.136
    user: root
    password: root

# Role assignment
roleGroups:
  etcd: [node-1, node-2, node-3]
  master: [node-1, node-2]
  worker: [node-1, node-2, node-3]
  nfs-server: [node-1]
  rbd-gateway: [node-2, node-3]
  rbd-chaos: [node-2, node-3]

# Storage configuration
storage:
  nfs:
    enabled: true
    sharePath: /nfs-data/k8s
    storageClass:
      enabled: true

# Database configuration - MySQL with master-slave replication
database:
  mysql:
    enabled: true
    masterPassword: "RootPassword123!"
    replicationPassword: "ReplPassword123!"

# Rainbond configuration
rainbond:
  version: v6.4.0-release
```

:::warning 注意
如果您启用了 NFS 存储，那么需要您手动安装 `nfs-common` 包:

```bash
apt-get update && apt-get install -y nfs-common
```
:::

执行以下命令开始安装:

```bash
# 使用配置文件安装，默认读取 cluster.yaml
./roi up
```

## 访问 Rainbond

安装完成后，日志中会显示访问入口:

```bash
✅ Installation completed successfully!

📝 Next Steps:
  1. Access Rainbond console:
     http://172.16.0.135:7070

  2. Check cluster status:
     kubectl get nodes
     kubectl get pods -n rbd-system
```

```bash
# 在管理节点使用 kubectl
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
/var/lib/rancher/rke2/bin/kubectl get pods -A
```

## 下一步

- [配置文件详解](./configuration) - 学习如何编写配置文件
- [命令参考](./command-reference) - 查看所有 ROI 命令的详细说明