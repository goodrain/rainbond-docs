---
title: 基于主机安装
description: 基于图形化界面，从Linux开始安装 Rainbond
keywords:
- 基于主机安装 Rainbond
---

当前安装方式，会引导用户从裸机开始安装 Rainbond ，服务器可以是物理机、虚拟机或各种云主机。

安装过程中，会首先通过一条命令启动图形化的控制台，后续基于图形化界面，即可完成整个 Rainbond 集群的安装。

## 前提

### 操作系统要求

|支持的操作系统|最低要求（每个节点）|
| :----- | :----- |
|**CentOS** 7.x，8.x |CPU：2，内存：4G，磁盘：50GB+|
|**CentOS Stream** 8，9 |CPU：2，内存：4G，磁盘：50GB+|
|**Ubuntu** 16.x，18.x，20.x，22.x |CPU：2，内存：4G，磁盘：50GB+|
|**Debian** 9.x，10.x，11.x |CPU：2，内存：4G，磁盘：50GB+|
|**Anolis OS** 7.x，8.x |CPU：2，内存：4G，磁盘：50GB+|

### 网络要求

服务器的IP地址不可以使用 169.254.0.0/16 这个私有网段的地址。这个地址段是为本地链接自动配置（Link-Local）而保留的，通常用于在没有DHCP服务器的情况下自动分配IP地址。在这种情况下，Kubernetes 可能会认为服务器没有正常的网络连接，导致安装失败。

### 其他要求

| 内核 | OpenSSH | 节点端口                  |
| ---- | ------- | ------------------------- |
| 4.0+ | 7.0+    | 80，443，6060，7070，8443 |

:::tip

该安装方式支持 Linux x86 和 Arm64 操作系统，支持[国产化信创](/docs/localization-guide)。

:::

## 部署 Rainbond 控制台

:::info

Rainbond 控制台支持在 Linux、Windows(Docker Desktop) 或 Mac(Docker Desktop) 中运行。

:::

使用 Rainbond 提供的脚本安装 `Docker`。

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

#### 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone
```

:::info

控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 目录中。

:::

### 从主机开始安装

1. 登录后，进入 **平台管理 > 集群 -> 添加集群 -> 从主机开始安装** 进入图形化安装页面。

2. 填写节点信息

   - 当前使用的为阿里云服务器，拥有外网IP，在私有部署时服务器没有外网IP的情况下 IP地址和内网IP地址 **统一填写服务器IP地址** 即可。

   - 当前演示集群为3个节点，Kubernetes属性 ETCD、管理、计算属性 复用，在自行部署时**根据自身规划**选择节点属性即可。


<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/add-host.png" title="节点列表"/>

3. 节点信息填写完毕后，根据页面提示复制节点初始化命令在集群内**所有节点**上执行。

4. 初始化完成后，点击 **下一步**，等待 Kubernetes 集群安装成功即可，待状态为 **运行中** 状态时进行下一步操作

5. 勾选 **我已阅读并已清楚认识上述注意事项** 后，点击 `开始初始化` ，等待安装完成即可。
   * Rainbond 的安装部署过程中可以自定义集群初始化参数，在初始化平台集群界面进行配置，具体参数参考文档 [高可用安装](/docs/installation/ha-deployment/deploy-rainbond/init-rainbond-config)。

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/custom-parameters.jpg" title="自定义集群参数" width="100%"/>




## 下一步

- [快速入门](/docs/quick-start/getting-started/): 快速在 Rainbond 上部署起你的第一个应用。
- [迁移应用](/docs/ops-guide/migrate-app): 你可以参考该文档将单机版部署的应用迁移到该 Kubernetes 集群中。

### 常见问题

通过图形化界面基于主机安装 Rainbond 的过程中遭遇了任何问题，都可以参考文档 [Web界面安装问题排查指南](/docs/troubleshooting/installation/ui) 进行问题排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。
