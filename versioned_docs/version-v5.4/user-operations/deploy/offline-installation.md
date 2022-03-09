---
title: '离线安装'
description: '离线安装部署 Rainbond。'
weight: 1000
---


此文档适用于在离线环境下部署All-in-one单节点Rainbond，部署前请您仔细阅读以下说明：

- 准备一台干净的虚拟机或物理机，离线安装支持的操作系统如下：
  -  `CentOS 7.*` 
  -  `Ubuntu 16.04/18.04` 
- 如果您使用 CentOS 7.* 操作系统，请务必提前 [升级内核版本](https://t.goodrain.com/t/topic/1305)；
- 硬件配置： `2核/8G` `磁盘100GB`以上；
- 设置服务器时区为 `Asia/Shanghai`，并同步时间；
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问。


### 下载安装包

该离线包部署的Rainbond版本为`v5.4.1`。

1.在有网环境获取离线包

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.4/rainbond-offline-v5.4.1-release.tgz
```

2.拷贝至需安装节点进行解压

```bash
tar xvf rainbond-offline-v5.4.1-release.tgz
```
### 部署 Rainbond

将离线安装包拷贝至安装节点解压后进行以下操作：

- 安装Docker

```bash
cd offline/ && ./install_docker_offline.sh
```

- 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-e IS_OFFLINE=true \
-e DISABLE_DEFAULT_APP_MARKET=true \
-e INSTALL_IMAGE_REPO=goodrain.me \
-e RAINBOND_VERSION=v5.4.1-release  \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
goodrain.me/rainbond:v5.4.1-release-allinone
```

`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 目录中；
- Rainbond 5.3 及以上版本支持控制台数据迁移，便于后续迁移数据到生产环境，请放心体验。


待容器启动成功后，稍等片刻即可在浏览器中访问服务器 `7070` 端口，打开 Rainbond 控制台`注册页面`。

![image-20210219110137479](https://static.goodrain.com/images/5.3/regist.png)

注册完成后，恭喜您已经完成了第一步，你还需要继续完成集群的部署。

### 安装或添加集群

Rainbond 需要对接计算资源后即可创建并管理应用。

如果您是执行快速安装希望部署单节点Rainbond的用户，后续在控制台页面 `根据导航` 即可完成集群的对接，创建并管理云原生应用，在该过程中将会进行以下操作：

1. 根据填写的服务器信息安装部署 Kubernetes 集群；
2. 在已安装的 Kubernetes 集群中初始化 Rainbond ，在 `rbd-system` 命名空间下部署 Rainbond 相关组件。

**如果您想要更多方式对接集群，请参阅后续文档：**


- 接入已安装平台集群

此方式适合已经完成部署Rainbond，希望接入控制台进行应用的调度管理。

请参考文档：[接入已安装平台集群](./install-by-rainbond/)


### 安装命令行工具

根据 [周边工具集文档](https://www.rainbond.com/docs/user-operations/tools/) 进行安装，其中需要从公网下载的资源已经包含在离线包中，具体安装步骤与文档一致。


### 常见问题


其他问题参考[排查文档](../cluster-manage/check/)排查解决或添加 Rainbond 社区钉钉群咨询。
