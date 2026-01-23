---
title: 安装多集群
description: 通过图形化界面对接您的服务器安装 Kubernetes 和 Rainbond 集群
keywords:
- 一体化安装
- 从主机安装 Rainbond
- 图形化安装 Kubernetes
- RKE2 安装
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 图形化多集群安装

本文介绍如何通过图形界面将集群对接到 Rainbond 平台，实现多集群管理。支持以下两种方式：
- 从 Linux 主机从零搭建新集群
- 对接已有的 Kubernetes 集群

## 一、从 Linux 主机开始对接安装


### 前提

:::tip
已通过以下任一方式部署 Rainbond 平台：
- [快速安装](../../quick-start/quick-install.mdx)
- [多节点集群安装](../multi-node-install.md)
- [基于 Kubernetes 安装](../install-with-helm/index.md)
:::

* 准备至少一台干净的 Linux 主机（建议 3 台以上组成集群）。
* 主机配置建议：`4核CPU` `8G+内存` `50G+磁盘`。
* 确保您的环境满足 [RKE2 对硬件和操作系统的要求](https://docs.rke2.io/install/requirements)。
* 如果主机内核支持 [AppArmor](https://apparmor.net/)，则在安装之前还必须具有 AppArmor 工具。
* 必须以 `root` 用户执行安装。

:::info 系统内核优化

在开始安装之前，建议先对所有准备用于部署 Rainbond 的 Linux 主机执行系统内核优化脚本，以确保系统处于最佳状态。在每台主机上执行以下命令：

```bash
curl -sfL https://get.rainbond.com/linux-system-optimize.sh | bash
```
:::

### 步骤一：启动安装向导

请在一台干净的 Linux 服务器上，参阅[快速安装](../../quick-start/quick-install.mdx)来启动图形化安装向导。

### 步骤二：开始图形化部署

1. 登录后，进入`平台管理 -> 集群 -> 添加集群 -> 从主机开始安装`，进入图形化安装页面。
2. 点击`添加节点`并填写您准备好的服务器节点信息（**不包括启动向导的这一台**）。

|              | 说明                                        |
| ------------ | ------------------------------------------- |
| 节点角色      | 选择节点的角色，建议至少 3 个`ETCD 管理节点`，其余为`计算节点` |
| 节点公网IP | 填写节点公网 IP 地址，如无公网 IP 则不填写             |
| 节点内网IP     | 填写节点内网 IP 地址，如有多块网卡请手动填写，为空则自动选择 |
| 控制台访问地址     | 保持默认即可。请确保网络通畅  |

3. 复制生成的节点注册命令，到对应的 Linux 主机上执行。
4. 所有节点状态变为`已连接`后，即可点击`开始安装`进入下一步。

### 步骤三：部署 Rainbond 平台

1. 根据页面引导填写基础配置以及高级配置。

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

下述将对 Rainbond 集群基础配置进行详细说明。

| 配置项                                                       | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 集群入口 IP | 外部访问 Rainbond 的 IP 地址。如果有负载均衡器，填写负载均衡器 IP；如果没有，填写网关节点的内外网 IP |
| 网关节点  | 指定哪台服务器运行网关服务                                   |
| 构建节点  | 指定哪台服务器运行构建服务                                   |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

下述将对 Rainbond 集群高级配置进行详细说明。

| 配置项                                                     | 说明                                                         |      |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| 镜像仓库 | 指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库 | 可选 |
| 数据库   | 指定 Rainbond 集群的 MySQL8.0+ 数据库。默认提供内置 MySQL8.0+ 数据库 | 可选 |
| 组件镜像源                                                 | 指定 Rainbond 自身组件通过哪个镜像源获取镜像，默认通过阿里云镜像仓库拉取 | 可选 |

  </TabItem>
</Tabs>

2. 配置信息填写完成后，点击`开始安装`，即可看到 Rainbond 各组件的安装进度。
3. 等待所有组件都启动后，下一步完成对接。

## 二、对接已有的 Kubernetes 集群

1. 进入 `平台管理 → 集群 → 添加集群 → 自建 Kubernetes 集群`
2. 填写配置：

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

| 配置项 | 说明 |
|-------|------|
| 集群入口 IP | 指定集群入口访问IP，可以是VIP、负载均衡IP或任意网关节点的IP。需要开放端口80、443、6060、7070、8443 |
| 网关节点 | 指定 Rainbond 网关服务部署在哪个节点上，填写节点的公网（没公网填写内网IP）、内网IP以及节点名称，节点名称通过`kubectl get node`获取 |
| 构建节点 | 指定 Rainbond 构建服务部署在哪个节点上，填写节点名称信息，节点名称通过`kubectl get node`获取 |
| Containerd Path | 指定 `containerd.sock` 目录路径, 如: `/run/containerd`, K3s or RKE2 默认路径为 `/var/run/k3s/containerd` |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

| 配置项                                                     | 说明                                                         |      |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| 镜像仓库 | 指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库 | 可选 |
| 数据库   | 指定 Rainbond 集群的 MySQL8.0+ 数据库。默认提供内置 MySQL8.0+ 数据库 | 可选 |
| 组件镜像源                                                 | 指定 Rainbond 自身组件通过哪个镜像源获取镜像，默认通过阿里云镜像仓库拉取 | 可选 |

  </TabItem>
</Tabs>

3. 点击`应用`后，按弹窗提示在目标集群执行：
4. 执行完成后点击`下一步`，等待集群对接完成。
> 控制台会主动请求目标集群的`入口IP:8443`检测集群状态，直到检测成功后才算对接完成，请确保网络畅通。

:::info 提示
对接云厂商托管的 Kubernetes 集群时，请参考下列安装文档：
- [在阿里云 ACK 上安装](../../ops-guides/more-installation/ack.md)
- [在腾讯云 TKE 上安装](../../ops-guides/more-installation/tke.md)
- [在华为云 CCE 上安装](../../ops-guides/more-installation/cce.md)
- [在 K3s 上安装](../../ops-guides/more-installation/k3s.md)
:::

## 下一步

- 跟随[快速入门](../../quick-start/getting-started.md)教程，部署你的第一个应用
- 阅读[使用教程](../../tutorial/via-rainbond-deploy-sourceandmiddleware.md)，学习和了解更多 Rainbond 功能

### 其他文档

- [故障排查文档](../../troubleshooting/install.md)
- [常见问题](../../faq/index.md)