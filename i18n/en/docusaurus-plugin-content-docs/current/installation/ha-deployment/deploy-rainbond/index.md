---
title: Rainbond 集群安装
description: 部署高可用 Rainbond 集群
keywords:
- 部署高可用 Rainbond 集群
---

本章节介绍部署高可用 Rainbond 集群。

## 前提条件

* 请按照 [安装前概述与要求](/docs/installation/ha-deployment/overview/) 准备相关服务与资源。
* 请按照 [Kubernetes 集群安装](../deploy-k8s) 安装 Kubernetes 集群。
* 请按照 [分布式文件存储安装](../storage) 安装分布式文件存储集群，如需对接阿里云 NAS 请参阅 [对接阿里云NAS存储](./init-rainbond-config#对接阿里云-nas-存储)

## 基于主机安装 Rainbond 集群

当你的 Kubernetes 集群是通过 Web 界面安装的，你可以通过 Web 界面在第三步继续开始安装 Rainbond。

1. 在 Web 安装界面第三步初始化 Rainbond 集群的注意事项中，点击 **若您希望自定义集群初始化参数，点击这里**。

![image-20210220134706244](https://static.goodrain.com/images/5.3/init-region-config.png)

2. 填写完 [Rainbond 集群配置](./init-rainbond-config)信息后，点击 **开始初始化**。


## 基于 Kubernetes 安装 Rainbond 集群

如果你已经满足了前提条件中的所有准备工作，那么你可以参阅文档 [基于 Kubernetes 安装 Rainbond](../../install-with-helm/) 以及配置 [Helm Chart 参数](../../install-with-helm/vaules-config)




