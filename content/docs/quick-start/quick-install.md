---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---

本指南会使用最简单，最方便的方式安装 Rainbond。帮助你快速地评估 Rainbond。

### 启动 Rainbond 控制台

需要您准备一台可运行 Docker 容器的机器，可以是 Linux、Windows 和 Mac。当然我们推荐使用 Linux 服务器。如果您还未安装 Docker 服务，可先通过以下命令安装 Docker 服务。

```
curl sh.rainbond.com/install_docker | bash
```

> 请注意，该命令仅支持 Linux x86 操作系统。

#### All-In-One 模式启动控制台

国内用户：

```
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
      --name=rainbond-allinone --restart=always \
      registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.3.0-release-allinone
```

If you are not in China：

```
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
      --name=rainbond-allinone --restart=always \
      rainbond/rainbond:v5.3.0-release-allinone
```

> 默认使用 sqlite3 作为数据库，数据存储于用户主目录下的 rainbonddata 目录。Rainbond 5.3 支持控制台数据迁移，便于后续迁移数据到生产环境，请放心体验。

待容器创建启动成功后，访问机器 <b>7070</b> 端口即可访问到 Rainbond 控制台。

![image-20210219110137479](https://static.goodrain.com/images/5.3/regist.png)

### 初始化 Rainbond 集群资源

首次注册完成后将导航到添加集群的页面。Rainbond 需要对接计算资源后即可创建并管理云原生应用。5.3 版本开始支持直接对接云资源（阿里云 ACK 集群）、已经安装的 Kubernetes 集群资源和用户提供的裸机资源。

![image-20210219110808088](https://static.goodrain.com/images/5.3/add-cluster.png)

1）对接云资源适合使用阿里云资源的用户（华为云、腾讯云或其他云用户可自行购买 Kubernetes 服务后使用`接入Kubernetes集群方式进行对接`）使用云资源方式将自动购买 RDS、ACK、NAS、SLB 等资源，为你快速搭建高可用的生产环境。

2）接入 Kubernetes 集群适合已搭建有 Kubernetes 集群的用户，你应该具有一定的 Kubernetes 管理能力。该方式需要集群版本在 1.16 以上。

3）如果你只有 Linux 机器，请使用从主机开始安装入口，Rainbond 为你自动安装 Kubernetes 集群。

请基于产品引导选择合适的方式进行集群的安装和初始化。 参考文档 [添加集群](/docs/user-operations/cluster-manage/add-cluster/)

> 请注意，集群安装初始化可以并行进行，你可以同时进行多个集群的安装和初始化。

集群初始化不成功，出现错误：waiting rainbond region ready timeout. 请参考[排查文档](/docs/user-operations/cluster-manage/check/)

### 控制台迁移

All-In-One 模式部署的控制台不具有生产可用性，体验完成后强烈建议将控制迁移到 Rainbond 中管理 [参考文档](/docs/user-operations/ha-deploy/console-recover/)

### 离线环境安装

离线环境安装具有一定的功能损耗，主要体现在源码 CI 层面，请通过页面下方展示的方式加入 Rainbond 微信群或钉钉群向开发者获取并取得支持。

### 常见问题

- 安装集群时报错 `failed to connect to following etcd hosts`

> 该问题属于控制台无法连接报错的节点。首先确定在配置规划集群节点时，正确的对所有节点执行了节点初始化，完成了免密登录设置。检查方式时在控制台容器中执行 `ssh docker@节点IP` 能够直接免密登录。

- 初始化 Rainbond 集群时长时间阻塞在 `系统所需非组件化镜像本地处理` 步骤

参考[排查文档](/docs/user-operations/cluster-manage/check/)排查解决
