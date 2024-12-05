---
title: 基于主机安装
description: 基于图形化界面，从Linux开始安装 Rainbond
keywords:
- 基于主机安装 Rainbond
- 基于主机安装高可用 Kubernetes 集群
- 基于主机安装高可用 Rainbond 集群
---

本文介绍了如何在 Linux 系统上通过图形化界面安装 `Kubernetes`([RKE2](https://docs.rke2.io)) 集群和 `Rainbond` 集群。

:::tip
该安装方式支持 Linux x86 和 Arm64 操作系统，支持[国产化信创](/docs/localization-guide)。
:::

## 前提

* 确保你的环境满足 [RKE2安装要求](https://docs.rke2.io/install/requirements)。 如果你的主机安装并启用了 NetworkManager，请[确保将其配置为忽略 CNI 管理的接口](https://docs.rke2.io/known_issues#networkmanager)。
* 如果主机内核支持 [AppArmor](https://apparmor.net/)，则在安装之前还必须具有 AppArmor 工具（通常可通过 `apparmor-parser` 包获得）。
* 必须以`root`用户执行安装。

:::danger
如已执行[快速安装](/docs/quick-start/quick-install)则不能在同一主机上再次基于主机安装，这会造成冲突。
:::

## 从主机开始安装 Kubernetes 集群

1. 根据[快速安装](/docs/quick-start/quick-install)部署 Rainbond。
2. 进入`平台管理 -> 集群 -> 添加集群 -> 从主机开始安装`进入图形化安装页面。
3. 点击`添加节点`并填写节点信息。

|              | 说明                                        |
| ------------ | ------------------------------------------- |
| 节点角色      | 选择节点的角色，`ETCD 管理节点 计算节点`        |
| 节点公网IP | 填写节点公网 IP 地址，如无公网 IP 则不填写             |
| 节点内网IP     | 填写节点内网 IP 地址，如有多块网卡请手动填写内网 IP，为空则自动选择 |
| 控制台访问地址     | 默认为当前浏览器访问的地址，如您的注册主机与控制台无法通信，请填写可通信的地址  |

4. 复制注册命令到 Linux 主机上执行。

## 安装 Rainbond 集群

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

在安装完成 Kubernetes 集群后，下一步将进入 Rainbond 集群安装页面，这部分将引导您完成 Rainbond 集群的安装。

:::

1. 根据页面引导填写基础配置以及高级配置。

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

下述将对 Rainbond 集群基础配置进行详细说明。

| 配置项                                                       | 说明                                                         |      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [集群入口 IP](ha#负载均衡) | 集群入口访问IP，可以是VIP、负载均衡IP或任意网关节点的IP      | 必填 |
| [网关节点](ha#网关节点)   | 指定 Rainbond 网关服务部署并运行在哪个节点上                 | 必填 |
| [构建节点](ha#构建节点)   | 指定 Rainbond 构建服务部署并运行在哪个节点上                 | 必填 |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

下述将对 Rainbond 集群高级配置进行详细说明。

| 配置项                                                     | 说明                                                         |      |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| [镜像仓库](ha#镜像仓库) | 指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库 | 可选 |
| [数据库](ha#mysql)      | 指定 Rainbond 集群的 MySQL8.0+ 数据库。默认提供内置 MySQL8.0+ 数据库 | 可选 |
| 组件镜像源                                                 | 指定 Rainbond 自身组件通过哪个镜像源获取镜像，默认通过阿里云镜像仓库拉取 | 可选 |

  </TabItem>
</Tabs>

2. 配置信息填写完成后进入 Rainbond 集群安装页面，在该页面可看到安装的进度信息，并且每个组件都可点击查看状态以及事件信息。
3. 等待所有组件都启动后，下一步完成对接。

> 如熟悉 [Kubectl](https://docs.rke2.io/reference/cli_tools) 命令，可通过 `kubectl get pods -n rbd-system` 命令查看集群状态。
> ```bash
> export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
> /var/lib/rancher/rke2/bin/kubectl get nodes
> ```

## 下一步

- 完成[快速入门](../../quick-start/getting-started/)教程。
- 将[控制台迁移](./console-recover) Kubernetes 集群中。

