---
title: '基于 Linux 高可用安装'
weight: 1
description: '在 Linux 服务器上安装高可用的，生产可用的 Rainbond。'
---

本文会将在 Linux 服务器上安装高可用的 Rainbond，适用于生存环境。

## 开始之前

- 操作系统：
  - `CentOS 7` [升级内核到最新稳定版](https://t.goodrain.com/t/topic/1305)
  - `Ubuntu 1604/1804`
  - `Debian 9/10`
- 高可用的共享存储。
- 高可用的数据库，如 MySQL 8.0 数据库集群或 RDS 数据库服务，创建 `console`、`region` 两个数据库。
- ETCD 集群，可以复用 Kubernetes 集群已有的 ETCD 集群。

## 搭建高可用 Kubernetes

在安装 Rainbond 之前，需要一个 `1.13` 及以上版本的高可用 Kubernetes。请参考 [Kubernetes 的高可用安装](/docs/user-operations/install/kubernetes-install/#kubernetes的高可用安装)。

## 基于已有 Kubernetes 安装高可用 Rainbond 环境


接下来的安装步骤，参见 [基于 K8s 高可用安装](/docs/install/install-from-k8s/high-availability/)。