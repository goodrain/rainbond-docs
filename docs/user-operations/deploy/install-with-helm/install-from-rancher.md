---
title: 基于Rancher安装
description: 本文适用于正在使用 Rancher 或对 Rancher 有所了解的用户, 参考如何在 Rancher 中安装 Rainbond 控制台。
aliases:
  - /docs/install/other-methods/install-from-rancher/
hidden: true
---

> 本文适用于正在使用 Rancher 或对 Rancher 有所了解的用户。

本文将介绍：

- 如何在 Rancher 中安装 Rainbond 控制台。
- Rainbond 如何对接 Rancher 管理的 Kubernetes 集群。
- 演示安装完整流程供用户参考。

### 前提要求

1. 具有一套稳定可用的 Rancher 环境，若还没有可参考 [Rancher 安装部署文档](https://rancher.com/docs/rancher/v2.x/en/installation/)

2. Kubernetes 集群具有至少 4GB 以上的空闲调度内存

3. Kubernetes 版本最低要求1.19.x

4. Kubernetes 集群至少有一个 80⁄443 端口未被占用的节点，用于 Rainbond 网关部署。

5. Kubernetes 集群存在可用的 `StorageClass`

   > 如果集群内没有 StorageClass，可以参考 https://artifacthub.io/packages/helm/kvaps/nfs-server-provisioner

6. 如`StorageClass`是 NFS，则需要在集群内安装 NFS 客户端。如果没有安装，可以参考：

   ```bash
   # CentOS 系统
   yum install -y nfs-utils
   # Ubuntu/Debian 系统
   apt install -y nfs-common
   ```

### 开始安装

#### 添加 Rainbond Console 到应用商店

将 Rainbond Console 添加到 Rancher 的应用商店中。

1. 在**应用商店**页面中，单击**添加应用商店**

2. 输入**名称**（比如 Rainbond-Console）和 **商店 URL 地址** 输入 `https://github.com/goodrain/rainbond-chart.git`

3. 分支选择**master**、 **Helm 版本**选择**Helm v3**

4. 单击**创建**完成应用商店添加。

![image-20210825181925415](https://i.loli.net/2021/08/25/curg1wEBOl5NdC7.png)

5. 回到**应用商店**页面中，单击**启动**

6. 单击**刷新**，等 Rancher 同步完后，就可以看到刚才新加的 Rainbond Console 了。

#### 安装 Rainbond Console

**在 Rancher 商店中启动 Rainbond Console**。

1. 单击识别出的 _rainbond-console_ Chart,开始 Chart 的安装。

2. 选择命名空间或新创建命名空间。

3. 修改一些启动配置：

   - 可选使用默认镜像或自定义镜像。

   - 可选择手动填写或自动生成 Mysql、Redis 密码。
   - 选择存储类。
   - 设置 Rainbond-Console NodePort 端口。

![image-20210708170910377](https://i.loli.net/2021/07/12/6sfmoyQ4i2cZK8a.png)

4. 填写完成后，点击启动，创建 Rainbon-console。
5. 等待所有 POD 启动完成后，访问上面设置的`Rainbond-Console NodePort`端口，默认是 `30707`。

#### 访问 Rainbond-Console，对接已有集群

根据页面提示完成账号注册，进入集群安装页面，选择 **接入 Kubernetes 集群**，填写集群的`kubeconfig`文件内容，开始 Rainbond 集群的安装。

![image-20210712174937793](https://i.loli.net/2021/07/12/gHe6PSjzdGK5Lia.png)

在安装之前，如需要配置集群初始化参数，则点击下图红框中的内容填写初始化参数配置。

![image-20210712175145269](https://i.loli.net/2021/07/12/8LxNWSf9gbXiEJ6.png)

集群初始化配置参考示例：

> 集群初始化详细参数配置请参考[文档](https://www.rainbond.com/docs/user-operations/cluster-manage/init-region/)。

> Rainbond 集群初始化默认会安装 NFS-Server，集群中已存在 storageClassName 可以复用此存储。

```yaml
metadata:
  name: rainbondcluster
spec:
  #设置Rainbond对外网关IP，可以是公网IP或负载均衡
  gatewayIngressIPs:
    - 39.103.228.113
  #设置网关节点IP
  nodesForGateway:
    #内网IP
    - internalIP: xxxx
      # 节点hostname
      name: xxxx
  #指定集群中的 storageClass
  rainbondVolumeSpecRWX:
    storageClassName: nfs-server
```

### 了解 Rancher 用户使用 Rainbond 的优势

- 无需深入学习 Kubernetes 各类资源的使用方式

> Rainbond 使用云原生应用模型的方式提供给用户智能化、简单的应用开发管理模式。不管是简单应用还是复杂的微服务架构，整个开发部署过程无需开发者深入学习 Kubernetes 相关知识。

- 标准的云原生 12 要素应用管理模式

> 你或许听说过云原生 12 要素，作为目前推荐的云原生应用开发模式。Rainbond 应用模型对云原生 12 要素进行了充分的实践，使用 Rainbond，天然地使你的代码满足云原生要求。

- 从源代码到云端

> 常用的开发语言(Java、PHP、Python、Golang、NodeJS、.NetCore)无需定义 Dockerfile、无需定义 Kubernetes 部署方式即可完成持续构建、持续部署。

- 标准应用多集群交付

> Rainbond 提供多种方式便于开发者在多个集群，多个环境中快速交付应用，获取 SaaS 化应用交付体验。

- 微服务架构

> Rainbond 内置 ServiceMesh 微服务架构治理框架，所有部署组件按照微服务的治理思路进行管理，微服务治理功能开箱即用的。

### 参考视频

<!-- {{<bibili-video src="//player.bilibili.com/player.html?aid=846645893&bvid=BV1a54y1n7Ch&cid=368992863&page=1" href="https://www.bilibili.com/video/BV1a54y1n7Ch/" title="基于Rancher安装Rainbond">}} -->

### 常见问题

- Rancher 已经部署的应用能否直接由 Rainbond 接管

> 这个问题是大多数用户的疑问，我们希望达成 Rainbond 可以自动化的接管 Rancher 部署的应用。然而遗憾的是由于 Rancher 即同类型平台部署应用时目前都不会遵循标准规范(比如[OAM](https://oam.dev/)),导致我们很难 100% 兼容的转换 Rancher 已经部署的应用成为 Rainbond 应用模型。因此目前我们还是推荐用户直接使用 Rainbond 提供的基于源代码、基于镜像快速的重新部署应用（相对于部分转化后再进行人工干预优化更节省时间）。同时也便于用户在这个过程中了解 Rainbond 应用管理的机制和流程。

- Rainbond 部署的应用是否可以从 Rancher 视图中进行管理

> Rainbond 部署到 Kubernetes 集群中的资源都是由 Rainbond 控制器进行创建、升级和回收，使用 Rainbond 定义的资源创建规范。我们并不推荐用户在 Rancher 中直接对这些资源进行修改。但可以进行观测，比如日志观测、资源监控观测等等。

- 通过 Rancher 安装 Rainbond-console POD 一直处于不可用状态

> 首先排查 POD 之间是否可以通信，如不能通信则需做些优化，比如：开启内核转发、关闭 Firewalld、关闭交换分区等等。
