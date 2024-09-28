---
title: Installing based on host
description: Installing Rainbond from Linux based on graphical interface
keywords:
  - Install Rainbond based on host
  - High-available Kubernetes cluster based on host installation
  - Install High Available Rainbond Cluster based on Host
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?isOutside=true&aid=113193175223399&bvid=BV1Lvsee5Ep9&cid=25988171760&p=1" />

The current installation method leads users to install Rainbond from naked machines, servers can be physical, virtual or cloud hosts.

## Prerequisite

The following operating systems have been tested, please use the list below to prepare：

- **CentOS：**`7.x 8.x`
- **CentS Stream：** `89`
- **Ubuntu：**`16.x,18.x,20.x,22.x`
- **Debian：** `9.x,10.x,11.x`
- **Anolis OS：**`7.x,8.x`
- **openEuler**
- **KylinV10**

| Resource requirements (lowest) | Port required for Rainbond | Other requirements                                       |
| ------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| CPU：2u;Memory：4G;Disk：50G                         | 80,443,6060,7070,8443      | Kernel：4.0+;OpenSSH：7.0+ |

:::tip

This installation supports Linux x86 and Arm64 operating systems,[国产化信创](/docs/localization-guide).

:::

## Install Rainbond Console

:::info

Rainbond Console supports running on Linux, Windows (Docker Desktop) or Mac(Docker Desktop).

:::

You may choose to install `Docker 24+` on your own or to install `Docker` using the script provided by Rainbon.

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

Launch the Rainbond Console using Docker to access the `http://IP:7070` on startup.

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.3-release-allinone
```

> The console will generate data that needs to be persistent and stored in the `~/rainbonddata` directory of the node.

## Install the Kubernetes cluster from the host

1. Sign in with Rainbond to enter _platform management > cluster -> Add cluster -> Install cluster -> Install from host_\* to the graphical installation page.
2. Fill in the node information below：

|                     | Note                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| IP address          | Enter the IP address of the server or the IP address of the Intranet |
| Intranet IP address | Enter the IP address of the server                                   |
| SSH Port            | Install the Kubernetes cluster via IP address + SSH port             |
| Node Properties     | Select Kubernetes node properties, manage, calculate, ETCD           |

3. After completion of the node information, copy the node initialization command on the cluster `all notes` as the page prompts.

:::tip
节点初始化命令主要用于：

- Automatically create a Docker user.
- Automatically configure the decrypt login of the Docker user for subsequent installation.
- Add SSH Forwading configuration.
  :::

4. After initialization command has been executed, start installing the Kubernetes cluster.If cluster installation fails, see[常见问题](#FAQ).

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

| Configuration Item                                                                                                                            | Note                                                                                                                                   |          |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [Cluster entry IP](/docs/installation/install-with-ui/ha#load balancy) | IP access to cluster entrance can be VIP, load equilibrium IP or any gateway node                                                      | Required |
| [网关节点](/docs/installation/install-with-ui/ha#gateways)                                                                                        | Specify which nodes Rainbond gateway service will be deployed and run                                                                  | Required |
| [构建节点](/docs/installation/install-with-ui/ha#build nodes)              | Specify on which node Rainbond build services to deploy and run                                                                        | Required |
| [存储](/docs/installation/install-with-ui/ha#storage)                                                                                           | Specify Rainbond and the store to be used on the platform, customize it to fill in the store class name                                | optional |
| [ETCD](/docs/installation/install-with-ui/ha#etcd)                                                                                            | Store Rainbond component status information, network configuration, etc. Customize it requires **Key Name, Node Name** | optional |

</TabItem>

  <TabItem value="高级配置" label="高级配置">

Details on the advanced configuration of the Rainbond cluster are described below.

| Configuration Item                                                                                                                     | Note                                                                                                                                                                              |          |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| [镜像仓库](/docs/installation/install-with-ui/ha#mirror repository) | Specify Rainbond mirror repository, all components on the platform will be picked up and pushed from this warehouse.Provide built-in mirror repository by default | optional |
| [数据库](/docs/installation/install-with-ui/ha#mysql)                                                                                     | Specify the MySQL8.0+ database of the Rainbond cluster.Built-in MySQL8.0+ database provided by default                            | optional |
| Component Mirror Source                                                                                                                | Specify which mirror source does Rainbond own component to retrieve the mirror, by default, through the Arjun mirror, Curaça                                                      | optional |

  </TabItem>
</Tabs>

2. The configuration is completed by entering the Rainbond cluster installation page, where progress information can be seen and where each component can click on status and event information.
3. Wait that all components of Rainbond start will automatically jump to the cluster interface page, fill the cluster ID and complete the interface.

## High Available Cluster

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

## Next step

- [快速入门](/docs/quick-start/getting-started/): quickly deploy your first app on Rainbond
- [迁移应用](/docs/ops-guide/migrate-app): You can refer to this document to migrate the single server deployed app to the Kubernetes cluster.

### FAQ

Any problems encountered while installing Rainbond on the host via graphical interface can be tracked by reference to document [Web界面安装问题排查指南](/docs/troubleshooting/installation/ui).Or join [微信群](/community/support#microbelieve),[钉钉群](/community/support#pegs) for help.
