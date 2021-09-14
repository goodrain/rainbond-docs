---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---

欢迎来到 Rainbond 云原生应用管理的世界！

首先我们先预览一下 Rainbond 的完整安装步骤。

如果您是新用户，希望快速搭建集群尝试，请按照下述流程进行：

- 准备一台或多台虚拟机或物理机【配置 4GB(内存)/2Core(CPU)/40GB(磁盘) 以上，OpenSSH 7.0+】，安装 ubuntu 16.04 操作系统。

  > 如果您使用 centos 7 操作系统，请提前升级内核版本。

- 在该节点中安装 Docker，启动 Rainbond All-In-One 控制台。
- 基于产品引导使用准备的节点安装集群。
- 集群安装成功即可开始使用。

如果您是搭建生产可用集群，请按照下述流程进行：

- 规划节点资源和网络拓扑结构。
- 在第一个节点中装 Docker，启动 Rainbond All-In-One 控制台。
- 基于产品引导安装 RKE 高可用集群，或对接您通过其他方式准备的高可用 Kubernetes 集群。
- 准备存储集群（开源方案：GFS、Ceph 等），如果在云上购买分布式存储服务。
- 配置 Rainbond 集群初始化，对接高可用数据库，高可用存储集群，完成集群初始化。
- 集群安装成功，在平台中通过应用商店部署 Rainbond 高可用控制台，将 All-In-One 控制台迁移到高可用控制台中。

阅读完上面的信息后，下面让我们开始 Rainbond 的部署：

### 启动 Rainbond 控制台

如果您是 Rancher 用户，可参考 [基于 Rancher 部署 Rainbond 控制台](/docs/install/other-methods/install-from-rancher/)。

需要您准备一台可运行 Docker 容器的机器，可以是 Linux、Windows 和 Mac。当然我们推荐使用您准备的 Linux 服务器。如果您还未安装 Docker 服务，可先通过以下命令安装 Docker 服务。

```
curl sh.rainbond.com/install_docker | bash
```

> 请注意，该安装方式仅支持 Linux x86 操作系统。

#### All-In-One 模式启动控制台

```
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
      --name=rainbond-allinone --restart=always \
      registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.4.0-release-allinone
```

> 请注意，控制台将产生需要持久化的数据，存储于您部署节点的`~/rainbonddata`目录中。

> All-In-One 控制台默认使用 sqlite3 作为数据库，数据存储于用户主目录下的 rainbonddata 目录。Rainbond 5.3 以上版本支持控制台数据迁移，便于后续迁移数据到生产环境，请放心体验。

待容器创建启动成功后，稍等片刻即可访问机器 <b>7070</b> 端口，打开 Rainbond 控制台注册页面。

![image-20210219110137479](https://static.goodrain.com/images/5.3/regist.png)

到此，恭喜您已经完成了第一步，你还需要继续完成集群的部署。

### 安装或添加 Kubernetes 集群

首次注册完成后将导航到添加集群的页面。Rainbond 需要对接计算资源后即可创建并管理云原生应用。

5.3 版本开始支持直接对接云资源（阿里云 ACK 集群）、已经安装的 Kubernetes 集群资源和用户提供的裸机资源，支持的集群添加方式如下图所示。

![image-20210219110808088](https://static.goodrain.com/images/5.3/add-cluster.png)

- 1）对接云资源目前适合使用阿里云资源的用户（华为云、腾讯云或其他云用户可自行购买 Kubernetes 服务后使用`接入Kubernetes集群方式进行对接`）使用云资源方式将自动购买 RDS、ACK、NAS、SLB 等资源，为你快速搭建高可用的生产环境。

      > 使用该方式请注意阅读产品上显示的说明文档，完成账号的权限分配。

- 2）接入 Kubernetes 集群适合已搭建有 Kubernetes 集群的用户，你应该具有一定的 Kubernetes 管理能力。

      > 使用该方式对接已有 Kubernetes 集群请注意确保使用的 kubeconfig 文件中定义的 KubeApiServer 地址是可被控制台访问的。
      > Kubernetes 版本要求为 1.16.X-1.19.X。

- 3）如果你只有 Linux 机器，请使用从主机开始安装入口，Rainbond 为你自动安装 Kubernetes 集群。

      > 使用该方式请注意，请确保所有节点间通信无限制，所有节点可以连接互联网（离线部署模式除外），控制台可以与所有节点进行通信（SSH）。

根据你的实际情况选择对应的方式完成 Kubernetes 集群的添加，添加后集群处于运行中状态即添加成功。

### 初始化 Rainbond 集群

通过上述三种形式接入的 Kubernetes 集群，若状态满足要求即可选择进行 Rainbond 集群的初始化，Rainbond 集群初始化是指将会在该 Kubernetes 集群中部署 Rainbond Region 端服务，来控制和接管该集群的资源，部署云原生应用。

集群初始化注意事项如下：

- 若你选择的是已经在使用的 Kubernetes 集群，不要担心，接下来的初始化动作不会影响集群已有的业务形态。

- Rainbond 集群初始化时默认采用集群中第 1、2 个节点为网关节点和构建节点，你也可以在 Kubernetes 节点上增加 Annotations 来指定对应节点(rainbond.io/gateway-node=true 或 rainbond.io/chaos-node=true)。

- 网关节点以下端口必须空闲：80, 443, 6060, 8443, 10254, 18080, 18081，否则将导致初始化失败。

- 集群节点之间网络不能有任何限制，比如个别用户场景节点白名单设定限制了 UDP 通信会导致集群初始化失败。

- 如果集群节点数量大于 3 将默认安装高可用模式。

- 安装过程中需要访问网关节点 80、443、6443、8443、6060 端口，请确保相关端口可被访问，比如配置好安全组策略。

- Rainbond Region 所有服务初始态预计将占用 2GB 内存空间。其中监控服务和数据库资源占用较大。

- Rainbond 集群初始化时需使用到数据库和分布式存储系统，对于 ACK 集群，Rainbond 将自动购买 RDS 作为集群数据库，购买 NAS 作为默认存储、购买 SLB 作为负载均衡。其他集群默认部署 NFS-Server 和单实例的 Mysql 数据库。若需要自定义配置，请点击集群初始化确认页面的“自定义集群配置参数”。[参考文档](/docs/user-operations/cluster-manage/init-region/)

确认开始初始化后，初始化过程以产品展示流程为主，集群初始化过程中请不要关闭窗口。

如果集群初始化不成功，比如出现错误：waiting rainbond region ready timeout. 请参考[排查文档](/docs/user-operations/cluster-manage/check/)

### 控制台迁移

All-In-One 模式部署的控制台不具有生产可用性，体验完成后强烈建议将控制迁移到 Rainbond 中管理 [参考文档](/docs/user-operations/ha-deploy/console-recover/)

### 离线环境安装

Rainbond 可在离线环境安装和运行，但在源码构建（CI）功能上具有一定的功能损耗，请通过页面下方展示的方式加入 Rainbond 微信群或钉钉群向开发者获取并取得支持。

### 常见问题

- Rainbond 支持 ARM CPU 架构部署吗？

> Rainbond 企业版支持在华为鲲鹏、飞腾等国产服务器部署，需求请[申请企业服务 POC](https://www.goodrain.com/poc/)。

- 安装集群时报错 `failed to connect to following etcd hosts`

> 该问题属于控制台无法连接报错的节点。首先确定在配置规划集群节点时，正确的对所有节点执行了节点初始化，完成了免密登录设置。检查方式时在控制台容器中执行 `ssh docker@节点IP` 能够直接免密登录。
>
> 如果容器中能正常登录，请检查节点 OpenSSH 的版本，检查方式为 `ssh -V`， OpenSSH 的版本要求为 **OpenSSH 7.0+**。如果低于该版本，请升级 OpenSSH 后重试。

- 初始化 Rainbond 集群时长时间阻塞在 `系统所需非组件化镜像本地处理` 步骤

> 通过 kubectl 查询 rbd-system 这个 namespace 下 pod 启动状态，参考 [排查文档](/docs/user-operations/cluster-manage/check/)

其他问题参考[排查文档](/docs/user-operations/cluster-manage/check/)排查解决。或添加 Rainbond 社区钉钉群咨询。
