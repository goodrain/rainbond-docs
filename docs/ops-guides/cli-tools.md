---
title: CLI 工具
description: 本文介绍 Rainbond 平台常用的命令行工具及其使用方法
keywords:
- Rainbond CLI 工具
- kubectl 命令
- 日志查看
- 运维工具
---

## 概述

Rainbond 提供了多种命令行工具来帮助您管理集群和排查问题。本文将介绍这些工具的使用方法：

- kubectl：管理 Kubernetes 集群
- crictl：管理容器运行时
- helm：管理 Kubernetes 应用
- 日志查看工具

## 访问命令行工具

### 通过控制台访问

1. 进入平台：`平台管理 → 集群 → 命令行`
2. 在终端中可直接使用：
   - kubectl 命令
   - helm 命令

### 通过主机访问

如果您是通过主机安装 Rainbond，可以使用以下方式：

```bash
# 在管理节点使用 kubectl
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
/var/lib/rancher/rke2/bin/kubectl get pods -A

# 在管理节点使用 crictl
export CRI_CONFIG_FILE=/var/lib/rancher/rke2/agent/etc/crictl.yaml
/var/lib/rancher/rke2/bin/crictl ps
```

:::tip
更多 RKE2 命令行工具使用方法，请参考 [RKE2 CLI 工具文档](https://docs.rke2.io/reference/cli_tools)
:::

## 常用命令示例

### 集群管理命令

```bash
# 查看集群节点状态
kubectl get nodes

# 查看集群组件状态
kubectl get pods -n rbd-system

# 查看集群资源使用情况
kubectl top nodes
kubectl top pods -A
```

### 问题排查命令

```bash
# 查看 Pod 详细信息
kubectl describe pod <pod名称> -n <命名空间>

# 查看 Pod 运行日志
kubectl logs <pod名称> -n <命名空间>

# 进入 Pod 容器
kubectl exec -it <pod名称> -n <命名空间> -- bash
```

## 日志查看指南

### 查看组件日志

#### 方式一：通过控制台查看

1. 进入平台：`平台管理 → 日志`
2. 可查看：
   - 控制台日志
   - 集群组件日志

#### 方式二：通过命令行查看

1. **实时查看日志**
```bash
# 语法：kubectl logs -fl name=<组件名> -n rbd-system
# 示例：查看 rbd-api 日志
kubectl logs -fl name=rbd-api -n rbd-system
```

2. **查看最近日志**
```bash
# 查看最近 20 行
kubectl logs --tail=20 -l name=rbd-api -n rbd-system

# 查看最近 1 小时
kubectl logs --since=1h -l name=rbd-api -n rbd-system
```

常用参数说明：
- `-f, --follow`：持续输出日志
- `-l, --label`：根据标签筛选
- `--tail`：显示最后几行
- `--since`：显示最近时间段的日志

### 查看控制台日志

#### 快速安装版本

```bash
# 1. 进入容器
docker exec -it rainbond bash

# 2. 进入 Pod
kubectl exec -it $(kubectl get pod -l name=rbd-app-ui -n rbd-system -o name) -n rbd-system -- bash

# 3. 查看日志
tail -f /app/logs/goodrain.log
```

#### 主机或 Helm 安装版本

```bash
# 1. 进入 Pod
kubectl exec -it $(kubectl get pod -l name=rbd-app-ui -n rbd-system -o name) -n rbd-system -- bash

# 2. 查看日志
tail -f /app/logs/goodrain.log
```

:::info
建议将常用的命令别名化，可以提高运维效率。例如：
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
alias k='kubectl'
alias kgp='kubectl get pods'
alias kl='kubectl logs'
```
:::
