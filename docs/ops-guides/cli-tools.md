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

