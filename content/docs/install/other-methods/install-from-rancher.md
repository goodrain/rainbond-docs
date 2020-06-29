---
title: 基于 Rancher 安装
description: 本文用于 Rancher 用户安装 Rainbond 的参考
keywords: [Rainbond, Rancher]
weight: 10
---

> 本文适用于正在使用 Rancher 或对 Rancher 有所了解的用户

Rancher，Kubernetes 生态中成功的开源项目，其定位 “Run Kubernetes Everywhere”。Rancher 可以帮助开发者快速搭建云、边、端多维度的 Kubernetes 集群，并提供多个集群资源 UI 化的管理体系。

Rainbond 定位“企业应用全生命周期管理“，类似于 Rancher 的定位说法应该是“Run Application Everywhere”。Rainbond 的开源用户一直一来都面临一个缺陷，就是集群监控、可视化管理方面 Rainbond 的开源版本不提供。因此结合 Rancher 不失是一个开源场景中的解决方式。 对于 Rancher 的用户而言，你或许可以尝试使用 Rainbond 来管理你的应用，你将感受到与 Rancher 不一样的高效和简单。通过阅读 Rainbond 相关的文档，你会发现 Rainbond 在服务于企业的应用开发、应用运维、应用交付方面独特的产品魅力。

接下来将带你在 Rancher 之上完成 Rainbond 系统的安装。

### 前提条件

1. 具有一套稳定可用的 Rancher 环境，若还没有可参考 [Rancher 安装部署文档](https://rancher.com/docs/rancher/v2.x/en/installation/)
1. Kubernetes 集群具有至少 4GB 以上的空闲调度内存
1. Kubernetes 版本在 1.13 及以上
1. Kubernetes 集群至少有一个 80/443 端口未被占用的节点
1. NFS 客户端。如果没有安装，可以参考：
    ```bash
    # CentOS 系统
    yum install -y nfs-utils
    # Ubuntu/Debian 系统
    apt install -y nfs-common
    ```

### 开始安装

#### 添加 Rainbond Operator 到应用商店

将 Rainbond Operator 添加到 Rancher 的应用商店中。

1.在**应用商店**页面中，单击**添加应用商店**

2.输入**名称**（比如 Rainbond-Operator）和 **商店 URL 地址** 输入 `https://gitee.com/rainbond/rainbond-operator`

> Rancher 会在指定的代码仓库中搜寻存在的 Helm Chart，由于国内网络原因，使用 rainbond-operator 在 gitee 的地址。

4.**Helm 版本**选择**Helm v3**

> Rainbond-operator chart 使用 Helm v3 规范定义，因此必须选择 Helm v3 版本。

5.单击**创建**完成应用商店添加。

6.回到**应用商店**页面中，单击**启动**

7.单击**刷新**，等 Rancher 同步完后，就可以看到刚才新加的 Rainbond Operator 了。

#### 安装 Rainbond Operator

在 Rancher 中启动 Rainbond Operator。

1.单击识别出的 _rainbond-operator_ Chart,开始 Chart 的安装。

2.将**命名空间**修改为`rbd-system`

> 注意，目前命名空间只能设置为 `rbd-system`, 根据*rainbond-operator* Chart 默认的配置进行安装。

3.单击**启动**，会跳转到应用列表页面，等待`rainbond-operator`的状态到 `Active`。

> 这个过程会从公网获取 rainbond-operator 的相关镜像，因此其启动时间极大的取决于您的网络环境。

#### 访问 Rainbond 安装 UI，完善集群配置

rainbond-operator 启动完成后在暴露 `30008` 提供集群配置和安装过程的 UI 展示服务。因此请访问`主机IP:30008`进入 Rainbond Operator UI 页面。

配置项目中包括镜像仓库配置、数据库配置和存储配置，请根据你所在环境的实际情况考虑是否自助提供以上服务（高可用生产环境我们建议自助提供）。当然默认情况下 Rainbond 会自动安装以上服务。

另外两个关键性配置是`网关节点`和`构建节点`的选择。默认情况下 Rainbond 将自动选择 Kubernetes 的适合的管理节点。网关节点安装`rbd-gateway`网关服务，因此需要占用`80, 443`等关键端口。构建节点作为 Rainbond 进行镜像构建的节点，最好选择存储和计算资源充足的节点。 倘若以上两个配置项没有获取的默认值，比如你的集群中已经没有`80`端口空闲的节点时，你可能需要进行以下操作：

1. 使用 IP 地址搜索其他可用节点并选择。
2. 若集群中已无可用节点，比如你只有一个节点且已安装`Ingress Controller`，那么你可以修改 `Ingress Controller` 的 `hostNetwork` 设为 false，或者修改它的端口为非 80, 443 端口。然后重新进行 Rainbond 安装。若有多个节点时可考虑将`Ingress Controller`从某个节点驱离，让出端口资源给 Rainbond 使用。

完成配置后，即可单击 **配置完成，开始安装**。安装过程中 Rainbond 将获取所有需要的镜像并上传到本地镜像仓库中，然后启动所有 Rainbond 的组件。此过程大概`20`分钟, 与您的网络环境相关。

#### 基于 Rancher 的 Rainbond 运维参考

在 Rainbond 的安装和使用过程中，都可以使用 Rancher 运维 Rainbond。比如`查看 Rainbond 各组件运行状态与日志`，`按需扩容 Rainbond 各组件`。

#### 查看 Rainbond 各组件运行状态与日志

在**工作负载**页面中，找到命名空间 `rbd-system`，查看 Rainbond 各组件的状态，事件和日志。也可以实时监控某个组件工作负载，包括 CPU，内存，网络数据包等。
如果某个组件异常了，可以通过以上的信息进行排查；必要的时候，可以把其上传到[社区](https://t.goodrain.com/)，或提交 Issues 到[Rainbond-Operator](https://github.com/goodrain/rainbond-operator/issues)

#### 按需扩容 Rainbond 各组件

当某个 Rainbond 组件的负载过高的时候，可以用 Rancher 增加该组件的副本数，分摊一些负载；相对地，可以用 Rancher 减少 Rainbond 组件的副本数。

当需要对 Rainbond 组件进行排错的时候，可能需要修改组件的启动参数，或者环境变量。这时候，就可以使用 Rancher 进行修改。

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

{{<bibili-video src="//player.bilibili.com/player.html?aid=625675438&bvid=BV1kt4y117Gu&cid=191668386&page=1" href="https://www.bilibili.com/video/BV1kt4y117Gu/" title="Rancher安装Rainbond, 并做应用部署的简单对比演示">}}

### 常见问题

- Rancher 已经部署的应用能否直接由 Rainbond 接管

> 这个问题是大多数用户的疑问，我们希望达成 Rainbond 可以自动化的接管 Rancher 部署的应用。然而遗憾的是由于 Rancher 即同类型平台部署应用时目前都不会遵循标准规范(比如[OAM](https://oam.dev/)),导致我们很难 100% 兼容的转换 Rancher 已经部署的应用成为 Rainbond 应用模型。因此目前我们还是推荐用户直接使用 Rainbond 提供的基于源代码、基于镜像快速的重新部署应用（相对于部分转化后再进行人工干预优化更节省时间）。同时也便于用户在这个过程中了解 Rainbond 应用管理的机制和流程。

- Rainbond 部署的应用是否可以从 Rancher 视图中进行管理

> Rainbond 部署到 Kubernetes 集群中的资源都是由 Rainbond 控制器进行创建、升级和回收，使用 Rainbond 定义的资源创建规范。我们并不推荐用户在 Rancher 中直接对这些资源进行修改。但可以进行观测，比如日志观测、资源监控观测等等。

- Rainbond 与 Rancher 是否会在同个方向上竞争

> 从两个产品从功能上来说存在一定交叉，但各有偏重点。特别是在开源路线上我们肯定会避免重复的造轮子，同时尽可能结合社区优秀的解决方案为用户提供完整的价值体验。
