---
title: '安装 Rainbond'
description: 选择适合您的 Rainbond 安装方式
keywords:
- Rainbond 安装
- 安装方式选择
---

根据您的环境选择合适的安装方式：

## 如何选择安装方式

```text
我有没有现成的 Kubernetes 集群？
├── 有 → 基于 Kubernetes 安装（Helm）
└── 没有
    ├── 只想体验/测试 → 快速安装（Docker 单机）
    ├── 生产多节点 → 基于主机安装集群
    └── 离线环境 → 离线安装
```

如果您已经安装好了 Rainbond，只是希望继续对接或新增更多集群，请查看 [安装多集群](./install-with-ui/index.md)。

### [快速安装](../quick-start/quick-install.mdx)

通过 Docker 快速启动单机版 Rainbond，适合体验、测试和学习使用。

### [基于主机安装集群](./multi-node-install.md)

在 Linux 服务器上从零开始部署多节点的 Kubernetes 和 Rainbond 集群。

### [基于 Kubernetes 安装](./install-with-helm/index.md)

在已有的 Kubernetes 集群上通过 Helm 部署 Rainbond，适合想复用现有 K8s 基础设施的场景。

### [离线安装](offline.md)

在无法访问外网的隔离环境中部署 Rainbond，需要提前下载离线安装包。

