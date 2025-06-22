---
title: 基于 Linux 一体化安装 (图形化界面)
description: 本文档将指导您如何从零开始，在 Linux 服务器上通过图形化界面安装一套包含 Kubernetes 的、生产可用的 Rainbond 平台。
keywords:
- 一体化安装
- 从主机安装 Rainbond
- 图形化安装 Kubernetes
- RKE2 安装
---

# 基于 Linux 一体化安装 (图形化界面)

本文将指导您如何从零开始，在 Linux 服务器上通过图形化界面安装一套包含 Kubernetes 的、生产可用的 Rainbond 平台。

:::tip
该安装方式适用于希望 Rainbond 帮助您从零搭建 Kubernetes 和 Rainbond 的场景，支持 Linux x86 和 Arm64 操作系统，并兼容[国产化信创](/docs/how-to-guides/localization-guide/intro.md)环境。
:::

## 安装逻辑

此安装模式的核心逻辑是：首先在一个节点上，通过 Docker 运行 **Rainbond 快速安装包**，并将其作为一个**临时的安装向导**。接着，利用这个向导的图形化控制台，在您指定的多个服务器节点上部署一个**生产级的 RKE2 Kubernetes 集群**以及**一套全新的 Rainbond 平台**。最终的 Rainbond 平台将运行在新的 K8s 集群中，而最初的 Docker 安装向导则可以安全销毁。

## 前提

* 准备至少一台干净的 Linux 主机（建议 3 台以搭建高可用集群）。
* 主机配置建议：`4核CPU` `8G+内存` `50G+磁盘`。
* 确保您的环境满足 [RKE2 对硬件和操作系统的要求](https://docs.rke2.io/install/requirements)。
* 如果主机内核支持 [AppArmor](https://apparmor.net/)，则在安装之前还必须具有 AppArmor 工具。
* 必须以 `root` 用户执行安装。

:::danger
如已在某台主机上执行过[快速安装](/docs/quick-start/quick-install)并用于体验，则不能在该主机上再次执行此安装流程，这会造成冲突。
:::

## 步骤一：启动安装向导

请在您准备的一台服务器上，参照 [快速安装文档](../../quick-start/quick-install.mdx) 来启动图形化安装向导。

:::tip
如果您的某台主机上**已经运行了 Rainbond 快速安装实例**，您可以直接将其作为安装向导使用，无需重复执行此步骤，请直接进入下一步。
:::

通常，您只需执行以下命令即可：
```bash
curl -o install.sh https://get.rainbond.com && bash ./install.sh
```
执行完上述脚本后，耐心等待 3-5 分钟，使用浏览器访问 `http://<服务器IP>:7070` 即可看到 Rainbond 的登录/注册界面。

## 步骤二：开始图形化部署

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

## 步骤三：部署 Rainbond 平台

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
Kubernetes 集群安装完成后，将自动进入 Rainbond 平台的部署页面。
:::

1. 根据页面引导填写基础配置以及高级配置。

<Tabs groupId="configuration">
  <TabItem value="基础配置" label="基础配置" default>

下述将对 Rainbond 集群基础配置进行详细说明。

| 配置项                                                       | 说明                                                         |      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [集群入口 IP](./ha.md#负载均衡) | 集群入口访问IP，可以是VIP、负载均衡IP或任意网关节点的IP      | 必填 |
| [网关节点](./ha.md#网关节点)   | 指定 Rainbond 网关服务部署并运行在哪个节点上                 | 必填 |
| [构建节点](./ha.md#构建节点)   | 指定 Rainbond 构建服务部署并运行在哪个节点上                 | 必填 |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

下述将对 Rainbond 集群高级配置进行详细说明。

| 配置项                                                     | 说明                                                         |      |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| [镜像仓库](./ha.md#镜像仓库) | 指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库 | 可选 |
| [数据库](./ha.md#mysql)      | 指定 Rainbond 集群的 MySQL8.0+ 数据库。默认提供内置 MySQL8.0+ 数据库 | 可选 |
| 组件镜像源                                                 | 指定 Rainbond 自身组件通过哪个镜像源获取镜像，默认通过阿里云镜像仓库拉取 | 可选 |

  </TabItem>
</Tabs>

2. 配置信息填写完成后，点击`开始安装`，即可看到 Rainbond 各组件的安装进度。
3. 等待所有组件都启动后，下一步完成对接。

> 您可以通过 `kubectl get pods -n rbd-system` 命令在任意已接入的节点上查看集群状态。
> ```bash
> export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
> /var/lib/rancher/rke2/bin/kubectl get nodes
> ```

## 下一步

- 完成[快速入门](../../quick-start/getting-started.md)教程。
- 将[控制台迁移](./console-recover.md)至新部署的 Kubernetes 集群中，以实现高可用。
  > 迁移后，您可以清空向导节点，并将其继续添加为计算节点。

