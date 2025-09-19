---
title: 基于主机安装的目录扩容
description: 本文介绍如何在基于主机安装的 Rainbond 环境中扩容关键目录的存储空间
keywords:
- Rainbond 目录扩容
- RKE2 目录迁移
- 主机安装存储扩容
- 磁盘挂载
---

## 概述

基于主机安装的 Rainbond 使用 RKE2 作为 Kubernetes 运行时，主要涉及两个重要的存储目录：

* **RKE2 数据目录**：`/var/lib/rancher/rke2` - 存储 Kubernetes 集群数据、etcd 数据、容器运行时数据等
* **Rainbond 数据目录**：`/opt/rainbond` - 存储 LocalPath StorageClass 数据和本地缓存文件

随着集群使用时间的增长，这些目录可能会占用大量磁盘空间。本文将介绍如何为这些目录扩容存储空间。

## 扩容场景

- 场景一：全新安装时扩容
  - 如果您还未安装 Rainbond，建议在安装前就准备好足够的存储空间。
- 场景二：已安装环境扩容
  - 如果您已经安装了 Rainbond，需要通过数据迁移的方式进行扩容。

## 场景一：全新安装时扩容

### 1. 准备存储设备

在安装 Rainbond 之前，准备好足够容量的磁盘或分区。

### 2. 挂载目录

```bash
# 假设新磁盘设备为 /dev/sdb1 和 /dev/sdc1

# 格式化磁盘
mkfs.ext4 /dev/sdb1
mkfs.ext4 /dev/sdc1

# 创建挂载点
mkdir -p /var/lib/rancher/rke2
mkdir -p /opt/rainbond

# 挂载磁盘
mount /dev/sdb1 /var/lib/rancher/rke2
mount /dev/sdc1 /opt/rainbond

# 设置开机自动挂载
echo "/dev/sdb1 /var/lib/rancher/rke2 ext4 defaults 0 0" >> /etc/fstab
echo "/dev/sdc1 /opt/rainbond ext4 defaults 0 0" >> /etc/fstab
```

### 3. 继续正常安装

完成磁盘挂载后，按照正常的安装流程进行 Rainbond 安装。

## 场景二：已安装环境扩容

:::warning
在进行目录迁移前，请务必做好数据备份，确保可以随时恢复到原始状态。
:::

### 扩容关键目录（RKE2 + Rainbond）

#### 1. 准备工作

```bash
# 检查当前磁盘使用情况
df -h /var/lib/rancher/rke2
df -h /opt/rainbond

# 准备新的存储设备
# RKE2 数据目录使用 /dev/sdb1
mkfs.ext4 /dev/sdb1
# Rainbond 数据目录使用 /dev/sdc1
mkfs.ext4 /dev/sdc1
```

#### 2. 清空节点（重要）

在停止 RKE2 服务前，需要先清空节点上的工作负载：

```bash
# 设置节点为不可调度状态
kubectl cordon <节点名称>

# 驱逐节点上的所有 Pod（除了 DaemonSet）
kubectl drain <节点名称> --ignore-daemonsets --delete-emptydir-data --force

# 确认节点已清空
kubectl get pods --all-namespaces -o wide | grep <节点名称>
```

:::tip
- 如果是单节点集群，此步骤会导致服务中断
- 如果是多节点集群，建议逐个节点进行迁移
- 确保其他节点有足够资源承载被驱逐的工作负载
:::

#### 3. 停止 RKE2 服务

```bash
# 在当前节点上停止 RKE2 服务
systemctl stop rke2-server
systemctl stop rke2-agent  # 如果是 agent 节点
```

#### 4. 备份数据

```bash
# 直接重命名原目录作为备份
mv /var/lib/rancher/rke2 /var/lib/rancher/rke2.bak
mv /opt/rainbond /opt/rainbond.bak

# 验证备份完整性
du -sh /var/lib/rancher/rke2.bak
du -sh /opt/rainbond.bak
```

#### 5. 挂载新存储

```bash
# 创建新的挂载点（原目录已重命名为备份）
mkdir -p /var/lib/rancher/rke2
mkdir -p /opt/rainbond

# 挂载新磁盘
mount /dev/sdb1 /var/lib/rancher/rke2
mount /dev/sdc1 /opt/rainbond

# 设置开机自动挂载
echo "/dev/sdb1 /var/lib/rancher/rke2 ext4 defaults 0 0" >> /etc/fstab
echo "/dev/sdc1 /opt/rainbond ext4 defaults 0 0" >> /etc/fstab
```

#### 6. 迁移数据

```bash
# 将备份数据迁移到新目录
cp -a /var/lib/rancher/rke2.bak/* /var/lib/rancher/rke2/
cp -a /opt/rainbond.bak/* /opt/rainbond/
```

#### 7. 启动服务

```bash
# 启动 RKE2 服务
systemctl start rke2-server
# 或者对于 agent 节点
systemctl start rke2-agent

# 检查服务状态
systemctl status rke2-server
```

#### 8. 验证迁移

```bash
# 检查集群状态
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
kubectl get nodes

# 检查 Rainbond 组件状态
kubectl get pods -n rbd-system

# 验证磁盘挂载
df -h /var/lib/rancher/rke2
df -h /opt/rainbond
```

#### 9. 恢复节点调度

```bash
# 恢复节点为可调度状态
kubectl uncordon <节点名称>

# 检查节点状态
kubectl get nodes
```

#### 10. 清理工作

```bash
# 确认迁移成功后，清理备份数据
rm -rf /var/lib/rancher/rke2.bak
rm -rf /opt/rainbond.bak
```

## 最佳实践

### 存储容量规划

**RKE2 数据目录 (`/var/lib/rancher/rke2`)**
- 建议初始容量：100GB 以上
- 主要存储：etcd 数据、容器镜像、容器运行时数据
- 增长因素：集群规模、应用数量、镜像数量

**Rainbond 数据目录 (`/opt/rainbond`)**
- 建议初始容量：200GB 以上
- 主要存储：应用持久化数据、构建缓存、应用模板
- 增长因素：应用数据量、构建频率、模板数量

### 性能优化

1. **使用 SSD 存储**：建议为关键目录使用 SSD 存储以提升性能
2. **合理规划 IOPS**：确保存储设备有足够的 IOPS 支持高并发访问
3. **定期清理**：参考 [集群资源清理](/docs/ops-guides/management/resource-cleanup) 定期清理不必要的数据

## 常见问题

### 1. 迁移后服务无法启动

**可能原因**：
- 数据迁移不完整
- 权限设置错误
- 磁盘挂载失败

**解决方法**：
```bash
# 检查磁盘挂载
mount | grep -E "(rke2|rainbond)"

# 检查目录权限
ls -la /var/lib/rancher/rke2
ls -la /opt/rainbond

# 检查服务日志
journalctl -u rke2-server -f
```

### 2. 数据迁移过程中断

**解决方法**：
```bash
# 停止服务
systemctl stop rke2-server
systemctl stop rke2-agent  # 如果是 agent 节点

# 清理不完整的数据
rm -rf /var/lib/rancher/rke2/*
rm -rf /opt/rainbond/*

# 重新从备份恢复
cp -a /var/lib/rancher/rke2.bak/* /var/lib/rancher/rke2/
cp -a /opt/rainbond.bak/* /opt/rainbond/

# 重新启动服务
systemctl start rke2-server
# 或者对于 agent 节点
systemctl start rke2-agent
```

## 回滚方案

如果迁移过程中出现问题，可以通过以下步骤回滚：

### 完整回滚步骤

```bash
# 1. 停止 RKE2 服务
systemctl stop rke2-server
systemctl stop rke2-agent  # 如果是 agent 节点

# 2. 卸载新磁盘
umount /var/lib/rancher/rke2
umount /opt/rainbond

# 3. 恢复原目录
mv /var/lib/rancher/rke2.bak /var/lib/rancher/rke2
mv /opt/rainbond.bak /opt/rainbond

# 4. 启动服务
systemctl start rke2-server
# 或者对于 agent 节点
systemctl start rke2-agent

# 5. 恢复节点调度（如果之前已经 cordon）
kubectl uncordon <节点名称>
```

:::warning
执行目录扩容前，请务必做好完整备份，确保可以随时回滚到原始状态。建议在维护窗口期间进行操作。
:::
