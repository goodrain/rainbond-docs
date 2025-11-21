---
title: 概述
description: 介绍 Rainbond Offline Installer (ROI) 工具
keywords:
- Rainbond ROI 离线安装
- 离线 Kubernetes 安装
---

Rainbond Offline Installer (ROI) 是一个用于在完全离线环境下安装 Rainbond 平台的工具。

- **极简操作:** 不再需要繁琐的 K8s 部署脚本。
- **全栈交付:** 在完全无网的物理机或虚拟机上，ROI 可以从零开始完成全套安装。
- **生产就绪:** 通过 ROI 交付的集群完全符合生产环境标准，真正实现了离线环境下的"开箱即用"。

## 功能特性

- **一键下载:** 通过简单命令下载所有必需的 K8s 和 Rainbond 离线包。
- **自动分发:** 自动将离线包分发到所有集群节点，无需手动传输。
- **高可用支持:** 支持单节点和多节点高可用集群安装。
- **镜像预加载:** 自动将所有必需的容器镜像加载到节点，无需联网拉取。
- **多架构支持:** 支持 amd64 和 arm64 架构。

## 工作流程

ROI 的工作流程主要分为以下阶段:

```
[1/7] check        → 环境检查(硬件、网络、磁盘性能)
[2/7] lvm          → LVM 存储自动配置(可选)
[3/7] optimize     → 系统优化(内核参数、防火墙等)
[4/7] rke2         → RKE2 Kubernetes 集群安装
[5/7] nfs          → NFS 存储配置(可选)
[6/7] mysql        → MySQL 数据库集群部署(可选)
[7/7] rainbond     → Rainbond 平台部署
```