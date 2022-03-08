---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---


如果您是新用户，希望快速搭建集群尝试，请按照下述流程进行：

- 准备一台干净的虚拟机或物理机，配置如下

|操作系统|CPU|内存|磁盘|内核版本|OpenSSH版本|
| :----: | :----: | :----: | :----: | :----: | :----: |
|Ubuntu16.04/CentOS 7.*|2|8|50G+|4.0+|7.0+|

- 如果您使用 CentOS 7.* 操作系统，请务必提前 [升级内核版本](https://t.goodrain.com/t/topic/1305)；
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问；
- 服务器能够正常连接互联网，安装过程将从互联网下载所需资源。

如果您希望部署生产级别高可用的Rainbond集群，请参考 [高可用部署文档](../user-operations/deploy/ha-deployment/resource-prepare) 进行部署。

阅读完上面的信息后，下面让我们开始 Rainbond 的部署：

### 部署 Rainbond 控制台

如果您是 Rancher 用户，可参考 [基于 Rancher 部署 Rainbond 控制台](../install/other-methods/install-from-rancher/)。

Rainbond 控制台支持在 Linux、Windows 和 Mac 中运行；为避免网络因素影响您的体验，推荐使用已准备的 Linux 服务器进行部署。

- 安装Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

`备注:`

该安装方式仅支持 Linux x86 操作系统。

#### 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-release-allinone
```

`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 目录中；
- Rainbond 5.3 及以上版本支持控制台数据迁移，便于后续迁移数据到生产环境，请放心体验。


待容器启动成功后，稍等片刻即可在浏览器中访问服务器 `7070` 端口，打开 Rainbond 控制台`注册页面`。

![image-20210219110137479](https://static.goodrain.com/images/5.3/regist.png)

到此，恭喜您已经完成了第一步，你还需要继续完成集群的部署。

### 安装或添加集群

Rainbond 需要对接计算资源后即可创建并管理应用。

如果您是执行快速安装希望部署单节点Rainbond的用户，后续在控制台页面 `根据导航` 即可完成集群的对接，创建并管理云原生应用，在该过程中将会进行以下操作：

1. 根据填写的服务器信息安装部署 Kubernetes 集群；
2. 在已安装的 Kubernetes 集群中初始化 Rainbond ，在 `rbd-system` 命名空间下部署 Rainbond 相关组件。

**如果您想要更多方式对接集群，请参阅后续文档：**

- 接入已有Kubernetes集群

此方式适合已经安装了 Kubernetes 集群，希望对接Rainbond平台，此过程将初始化安装平台并接入，初始化及接入过程不会影响集群已有的业务形态。

请参考文档：[接入已安装Kubernetes集群](../user-operations/deploy/install-from-k8s/)

- 接入已安装平台集群

此方式适合已经完成部署Rainbond，希望接入控制台进行应用的调度管理。

请参考文档：[接入已安装平台集群](../user-operations/deploy/install-by-rainbond/)


### 控制台迁移

All-In-One 模式部署的控制台不具有生产可用性，体验完成后如果您想继续使用建议将控制台迁移到 Rainbond 中管理 [参考文档](../user-operations/ha-deploy/console-recover/)。


### 常见问题

> Rainbond 支持 ARM CPU 架构部署吗？

Rainbond 企业版支持在华为鲲鹏、飞腾等国产服务器部署，需求请[申请企业服务 POC](https://www.goodrain.com/poc/)。

> 安装集群时报错 `failed to connect to following etcd hosts`

- 该问题属于控制台无法连接报错的ETCD节点。首先确定在配置规划集群节点时，正确的对所有节点执行了节点初始化，完成了免密登录设置。检查方式时在控制台容器中执行 `ssh docker@节点IP` 能够直接免密登录。

- 如果容器中能正常登录，请检查节点 OpenSSH 的版本，检查方式为 `ssh -V`， OpenSSH 的版本要求为 **OpenSSH 7.0+**。如果低于该版本，请升级 OpenSSH 后重试。

> 初始化 Rainbond 集群时长时间阻塞在 `系统所需非组件化镜像本地处理` 步骤

通过 kubectl 查询 rbd-system 这个 namespace 下 pod 启动状态，参考 [排查文档](../user-operations/cluster-manage/check/)

其他问题参考[排查文档](../user-operations/cluster-manage/check/)排查解决。或添加 Rainbond 社区钉钉群咨询。
