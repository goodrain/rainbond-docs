---
title: Rancher 用户安装 Rainbond
description: 本文用于Rancher用户安装Rainbond的参考
keywords: Rainbond Rancher Rancher安装Rainbond
---

> 本文适用于正在使用 Rancher 或对 Rancher 有所了解的用户

Rancher，Kubernetes 生态中成功的开源项目，其定位“Run Kubernetes Everywhere”。Rancher 可以帮助开发者快速搭建云、边、端多维度的 Kubernetes 集群，并提供多个集群资源 UI 化的管理体系。

Rainbond 定位“企业应用全生命周期管理“，类似于 Rancher 的定位说法应该是“Run Application Everywhere”。Rainbond 的开源用户一直一来都面临一个缺陷，就是集群监控、可视化管理方面 Rainbond 的开源版本不提供。因此结合 Rancher 不失是一个开源场景中的解决方式。 对于 Rancher 的用户而言，你或许可以尝试使用 Rainbond 来管理你的应用，你将感受到与 Rancher 不一样的高效和简单。通过阅读 Rainbond 相关的文档，你会发现 Rainbond 在服务于企业的应用开发、应用运维、应用交付方面独特的产品魅力。

接下来将带你在 Rancher 之上完成 Rainbond 系统的安装。

### 前提条件

1. 具有一套稳定可用的 Rancher 环境，若还没有可参考[Rancher 安装部署文档]()
2. Kubernetes 集群具有至少 4GB 以上的空闲调度内存
3. Kubernetes 版本在 1.13 即以上
4. Kubernetes 集群至少有一个 80/443 端口未被占用的节点

### 操作方式

#### 添加 Rainbond Operator 到应用商店

- <b>将 Rainbond Operator 添加到 Rancher 的应用商店</b>

- <b>安装 Rainbond Operator</b>

- <b>访问 Rainbond 安装 UI，完善集群配置</b>

- <b>基于 Rancher 辅助观测 Rainbond 安装进度</b>

- <b>访问 Rainbond 开启云原生应用管理之旅</b>

### 基于 Rancher 的 Rainbond 运维参考

- <b>查看 Rainbond 各组件运行状态与日志</b>

- <b>按需扩容 Rainbond 各组件</b>

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

### 常见问题

- Rancher 已经部署的应用能否直接由 Rainbond 接管

> 这个问题是大多数用户的疑问，我们希望达成 Rainbond 可以自动化的接管 Rancher 部署的应用。然而遗憾的是由于 Rancher 即同类型平台部署应用时目前都不会遵循标准规范(比如[OAM](https://oam.dev/)),导致我们很难 100% 兼容的转换 Rancher 已经部署的应用成为 Rainbond 应用模型。因此目前我们还是推荐用户直接使用 Rainbond 提供的基于源代码、基于镜像快速的重新部署应用（相对于部分转化后再进行人工干预优化更节省时间）。同时也便于用户在这个过程中了解 Rainbond 应用管理的机制和流程。

- Rainbond 部署的应用是否可以从 Rancher 视图中进行管理

> Rainbond 部署到 Kubernetes 集群中的资源都是由 Rainbond 控制器进行创建、升级和回收，使用 Rainbond 定义的资源创建规范。我们并不推荐用户在 Rancher 中直接对这些资源进行修改。但可以进行观测，比如日志观测、资源监控观测等等。

- Rainbond 与 Rancher 是否会在同个方向上竞争

> 从两个产品从功能上来说存在一定交叉，但各有偏重点。特别是在开源路线上我们肯定会避免重复的造轮子，同时尽可能结合社区优秀的解决方案为用户提供完整的价值体验。
