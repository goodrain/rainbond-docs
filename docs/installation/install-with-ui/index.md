---
title: 基于主机安装
description: 基于图形化界面，从Linux开始安装 Rainbond
keywords:
- 基于主机安装 Rainbond
- 基于主机安装高可用 Kubernetes 集群
- 基于主机安装高可用 Rainbond 集群
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?isOutside=true&aid=113193175223399&bvid=BV1Lvsee5Ep9&cid=25988171760&p=1" />

当前安装方式，会引导用户从裸机开始安装 Rainbond ，服务器可以是物理机、虚拟机或各种云主机。

## 前提

以下操作系统是经过测试的，请按照下述列表准备：

* **CentOS：**`7.x 8.x`
* **CentOS Stream：** `8 9`
* **Ubuntu：**`16.x，18.x，20.x，22.x`
* **Debian：** `9.x，10.x，11.x`
* **Anolis OS：**`7.x，8.x`
* **openEuler**
* **KylinV10**

| 资源要求（最低）             | Rainbond 所需端口         | 其他要求                  |
| ---------------------------- | ------------------------- | ------------------------- |
| CPU：2u；内存：4G；磁盘：50G | 80，443，6060，7070，8443 | 内核：4.0+；OpenSSH：7.0+ |

:::tip

该安装方式支持 Linux x86 和 Arm64 操作系统，支持[国产化信创](/docs/localization-guide)。

:::

## 安装 Rainbond 控制台

:::info

Rainbond 控制台支持在 Linux、Windows(Docker Desktop) 或 Mac(Docker Desktop) 中运行。

:::

您可选择自行安装 `Docker 24+`，或使用 Rainbond 提供的脚本安装 `Docker`。

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

使用 Docker 启动 Rainbond 控制台，启动后使用 `http://IP:7070`进行访问。

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone
```

> 控制台将产生需要持久化的数据，存储于节点的 `~/rainbonddata` 目录中。

## 从主机开始安装 Kubernetes 集群

1. 登录 Rainbond 后，进入 **平台管理 > 集群 -> 添加集群 -> 从主机开始安装** 进入图形化安装页面。
2. 填写节点信息，如下：

|              | 说明                                        |
| ------------ | ------------------------------------------- |
| IP 地址      | 填写服务器公网 IP 地址或内网 IP 地址        |
| 内网 IP 地址 | 填写服务器内网 IP 地址                      |
| SSH 端口     | 通过 IP 地址 + SSH 端口安装 Kubernetes 集群 |
| 节点属性     | 选择 Kubernetes 节点属性，管理、计算、ETCD  |

3. 节点信息填写完毕后，根据页面提示复制节点初始化命令在集群内`所有节点`上执行。

:::tip
节点初始化命令主要用于：
* 自动创建 Docker 用户。
* 自动配置 Docker 用户的免密登录以便后续安装。
* 添加 SSH Forwading 配置。
:::

4. 初始化命令执行完毕后，开始安装 Kubernetes 集群。如遇到集群安装失败，请参阅[常见问题](#常见问题)。

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
| [集群入口 IP](/docs/installation/install-with-ui/ha#负载均衡) | 集群入口访问IP，可以是VIP、负载均衡IP或任意网关节点的IP      | 必填 |
| [网关节点](/docs/installation/install-with-ui/ha#网关节点)   | 指定 Rainbond 网关服务部署并运行在哪个节点上                 | 必填 |
| [构建节点](/docs/installation/install-with-ui/ha#构建节点)   | 指定 Rainbond 构建服务部署并运行在哪个节点上                 | 必填 |
| [存储](/docs/installation/install-with-ui/ha#存储)           | 指定 Rainbond 以及平台上应用要使用的存储，自定义则需填写存储类名称 | 可选 |
| [ETCD](/docs/installation/install-with-ui/ha#etcd)           | 存储 Rainbond 组件状态信息、网络配置等，自定义则需填写**密钥名称、节点名称** | 可选 |


</TabItem>

  <TabItem value="高级配置" label="高级配置">

下述将对 Rainbond 集群高级配置进行详细说明。

| 配置项                                                     | 说明                                                         |      |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| [镜像仓库](/docs/installation/install-with-ui/ha#镜像仓库) | 指定 Rainbond 底层镜像仓库，平台上的所有组件镜像都会从这个仓库拉取、推送。默认提供内置镜像仓库 | 可选 |
| [数据库](/docs/installation/install-with-ui/ha#mysql)      | 指定 Rainbond 集群的 MySQL8.0+ 数据库。默认提供内置 MySQL8.0+ 数据库 | 可选 |
| 组件镜像源                                                 | 指定 Rainbond 自身组件通过哪个镜像源获取镜像，默认通过阿里云镜像仓库拉取 | 可选 |

  </TabItem>
</Tabs>

2. 配置信息填写完成后进入 Rainbond 集群安装页面，在该页面可看到安装的进度信息，并且每个组件都可点击查看状态以及事件信息。
3. 等待 Rainbond 所有组件都启动后，会自动跳转到集群对接页面，填写集群 ID，完成对接。

## 高可用集群

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

## 下一步

- [快速入门](/docs/quick-start/getting-started/): 快速在 Rainbond 上部署起你的第一个应用。
- [迁移应用](/docs/ops-guide/migrate-app): 你可以参考该文档将单机版部署的应用迁移到该 Kubernetes 集群中。

### 常见问题

通过图形化界面基于主机安装 Rainbond 的过程中遭遇了任何问题，都可以参考文档 [Web界面安装问题排查指南](/docs/troubleshooting/installation/ui) 进行问题排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。
