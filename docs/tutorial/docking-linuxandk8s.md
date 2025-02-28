---
title: 接入现有物理机和 K8S 集群
description: 无缝接入现有 Linux 服务器与 Kubernetes 集群
keywords:
- 基础设施集成
- 混合云管理
---

完成本教程您将掌握：
- 接入现有 Linux 虚拟机或物理机
- 接入现有 Kubernetes 集群

## 接入 Linux 主机

### 图形化接入（10分钟）
1. 启动安装向导：
    - 平台管理 ➡️ 集群 ➡️ 添加集群 ➡️ 从主机开始安装
2. 在目标主机执行页面上命令。
3. 填写集群安装信息并继续安装
4. 完成对接。

> 📘完整流程见[主机接入手册](../installation/install-with-ui/index.md)。

## 对接现有的 Kubernetes 集群

### 两步快速接入

1. 进入平台管理 ➡️ 集群 ➡️ 添加集群 ➡️ 从K8S集群开始安装。
2. 填写集群安装信息并在目标 K8S 集群中执行命令。
3. 完成对接。

> 📘完整流程见[接入 K8S 集群手册](../installation/install-with-helm/index.md)。