---
title: Add node
description: Rainbond Adding nodes Guide
keywords:
- Add nodes
- Rainbond 添加节点指南
---

## 前提

Rainbond 只支持 **基于主机安装** 的集群添加新的节点。

## 添加节点

进入 **平台管理 -> 集群**，跳转到集群管理页面，点击 **编辑节点**，进入添加节点页面。

* **IP 地址:** 节点的公网 IP 地址，如果节点没有公网 IP 地址，可以使用内网 IP 地址。
* **内网 IP 地址:** 节点的内网 IP 地址。
* **SSH端口:** 节点的 SSH 端口，默认为 22。
* **节点类型:** 节点的类型，包括 ETCD、管理、计算。

点击 **更新集群**，即可添加新的节点。
