---
title: Installing based on host
description: Installing Rainbond from Linux based on graphical interface
keywords:
  - Install Rainbond based on host
  - High-available Kubernetes cluster based on host installation
  - Install High Available Rainbond Cluster based on Host
---

本文介绍了如何在 Linux 系统上通过图形化界面安装 `Kubernetes`([RKE2](https://docs.rke2.io)) 集群和 `Rainbond` 集群。

:::tip
该安装方式支持 Linux x86 和 Arm64 操作系统，支持[国产化信创](/docs/how-to-guides/localization-guide/intro.md)。
:::

## 前提

- 确保你的环境满足 [RKE2安装要求](https://docs.rke2.io/install/requirements)。 如果你的主机安装并启用了 NetworkManager，请[确保将其配置为忽略 CNI 管理的接口](https://docs.rke2.io/known_issues#networkmanager)。
- 如果主机内核支持 [AppArmor](https://apparmor.net/)，则在安装之前还必须具有 AppArmor 工具（通常可通过 `apparmor-parser` 包获得）。
- 必须以`root`用户执行安装。

:::danger
如已执行[快速安装](/docs/quick-start/quick-install)则不能在同一主机上再次基于主机安装，这会造成冲突。
:::

## Install the Kubernetes cluster from the host

1. 根据[快速安装](/docs/quick-start/quick-install)部署 Rainbond。
2. 进入`平台管理 -> 集群 -> 添加集群 -> 从主机开始安装`进入图形化安装页面。
3. 点击`添加节点`并填写节点信息。

|         | Note                                    |
| ------- | --------------------------------------- |
| 节点角色    | 选择节点的角色，`ETCD 管理节点 计算节点`                |
| 节点公网IP  | 填写节点公网 IP 地址，如无公网 IP 则不填写               |
| 节点内网IP  | 填写节点内网 IP 地址，如有多块网卡请手动填写内网 IP，为空则自动选择   |
| 控制台访问地址 | 默认为当前浏览器访问的地址，如您的注册主机与控制台无法通信，请填写可通信的地址 |

4. 复制注册命令到 Linux 主机上执行。

## Install Rainbond Cluster

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Once the Kubernetes cluster is installed, the next step will go to the Rainbond cluster installation page, which will lead you to complete the installation of the Rainbond cluster.

:::

1. Fill out base configuration and advanced configuration based on page lead.

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

A detailed description of the Rainbond cluster base configuration is provided below.

| Configuration Item      | Note                                                                              |          |
| ----------------------- | --------------------------------------------------------------------------------- | -------- |
| [集群入口 IP](./ha.md#负载均衡) | IP access to cluster entrance can be VIP, load equilibrium IP or any gateway node | Required |
| [网关节点](./ha.md#网关节点)    | Specify which nodes Rainbond gateway service will be deployed and run             | Required |
| [构建节点](./ha.md#构建节点)    | Specify on which node Rainbond build services to deploy and run                   | Required |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

Details on the advanced configuration of the Rainbond cluster are described below.

| Configuration Item      | Note                                                                                                                                                                              |          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [镜像仓库](./ha.md#镜像仓库)    | Specify Rainbond mirror repository, all components on the platform will be picked up and pushed from this warehouse.Provide built-in mirror repository by default | optional |
| [数据库](./ha.md#mysql)    | Specify the MySQL8.0+ database of the Rainbond cluster.Built-in MySQL8.0+ database provided by default                            | optional |
| Component Mirror Source | Specify which mirror source does Rainbond own component to retrieve the mirror, by default, through the Arjun mirror, Curaça                                                      | optional |

  </TabItem>
</Tabs>

2. The configuration is completed by entering the Rainbond cluster installation page, where progress information can be seen and where each component can click on status and event information.
3. 等待所有组件都启动后，下一步完成对接。

> 如熟悉 [Kubectl](https://docs.rke2.io/reference/cli_tools) 命令，可通过 `kubectl get pods -n rbd-system` 命令查看集群状态。
>
> ```bash
> export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
> /var/lib/rancher/rke2/bin/kubectl get nodes
> ```

## Next step

- 完成[快速入门](../../quick-start/getting-started.md)教程。
- 将[控制台迁移](./console-recover.md) Kubernetes 集群中。

