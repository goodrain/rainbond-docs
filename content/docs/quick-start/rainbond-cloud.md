---
title: Rainbond-Cloud
description: 本篇文章主要讲解Rainbond Cloud 架构模式，用户价值和使用方式
weight: 208
---

Rainbond Cloud 是 Rainbond 产品 SaaS 化在线服务平台，由好雨科技运营。Rainbond Cloud 可以认为是 Rainbond 集群的托管服务，依托于 IaaS 厂商的计算资源，比如用户购买阿里云的托管 Kubernetes 集群，通过 API 对接到 Rainbond Cloud，由 Rainbond Cloud 来管理用户的 Kubernetes 集群，并提供给用户多云应用管理体验。Rainbond Cloud 有如下优势：

- 完整的 Rainbond 功能，持续产品迭代和升级，需求不等待；
- 多云资源管理，阿里云、AWS、华为云等 IaaS 厂商的资源，统一托管到 Rainbond Cloud，你只需要管应用，应用可以透明在多云上备份和迁移，不被 IaaS 厂商绑定；
- 便捷的云资源对接，仅需 30 分钟即可完成集群从计划到投产；
- 服务安全可靠，用户所有代码、应用、数据、流量都由用户自己掌控。Rainbond Cloud 只是管理和调度服务，即使 Rainbond Cloud 故障不影响用户业务；
- 帮助用户实现云原生 DevOps、企业中台、企业应用交付等流程和体验；
- SLA 保障，解决你的后顾之忧；

Rainbond Cloud 适用于以下几类用户：

- Rainbond 开源用户，需要使用更多的 Rainbond 功能体验，比如多集群管理、可靠的 SLA 保障等。
- 准备将业务上云的用户，减去学习 Kubernetes 复杂的概念和公有云集群环境搭建的烦恼，直接跨越到云原生应用管理模式。
- 正在转型的 ToB 的软件企业，你是否正在从过去高成本的软件交付模型向便捷交付、SaaS 化服务交付模式转型，Rainbond Cloud 完善的应用交付链路可以帮助你快速建立云原生应用交付形态。

Rainbond Cloud 的发展方向如下：

1. 应用开发、交付全流程生态，即将推出应用商店业务，支持 ToB 企业快速建立自动化软件销售、交付体系。
2. 以应用为中心，提供一站式的`自动化多云资源集成管理平台`，目前主要集成各家云厂商的计算、存储资源。接下来结合应用运维体系的各类资源，比如证书自动签发、CDN 加速、数据库、大数据分析服务等等。

Rainbond Cloud 的架构模式如下：

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/cloud/cloud%E6%9E%B6%E6%9E%84%E8%AF%B4%E6%98%8E.png)

接入 Rainbond Cloud 的每一个企业用户都需要接入自己的 Kubernetes 集群，当然我们推荐直接使用各大公有云厂商提供的 Kubernetes 集群，比如阿里云 ACK。用户也可以通过其他方式自建 Kubernetes 集群，比如使用 Rancher 创建并管理的集群。在将 Kubernetes 集群对接到 Rainbond Cloud 的过程中我们将在 Kubernetes 集群中部署 Rainbond Region 服务，从而对外暴露标准的、安全的 Rainbond Region API 供云端 Cloud 服务调用。

因此开始体验 Rainbond Cloud 服务，用户需要经过以下几个步骤：

- 注册企业和账户

> 建立您企业独有的平台访问域名，平台服务的所有用户互相隔离，保障安全。

- 对接您的公有云资源

> Cloud 服务的为你提供了基于各大云厂商便捷安装 Kubernetes 集群和初始化 Rainbond Region 的体验流程，尽可能简化用户的操作，快速上手。若你需要对接的资源不能使用便捷流程，可以通过手动安装 Rainbond Region 的方式进行对接，对接完成后你即可拥有自己的应用调度集群资源。

- 开启 Rainbond 之旅

> 用户开始使用 Rainbond Cloud 是完全免费的，当你的规模逐渐扩大，也就是说 Rainbond 为你的企业带来了真正的价值后才需要购买更多的 Rainbond Cloud 服务授权，详细见[价格说明](https://cloud.goodrain.com/page/price)

{{<video title="Rainbond Cloud对接阿里云ACK集群演示视频" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/rainbond-cloud-init-cluster.mp4">}}

### 常见 FAQ

- 为什么 Rainbond Cloud 目前只支持阿里云 ACK 对接

  > 这个问题结合上文中说到的一样，首先 Rainbond Cloud 可以对接各类 Kuberntes 集群，包括各类云厂商提供的集群和您自建的 Kubernetes 集群。但是我们推荐使用例如阿里云 ACK 托管集群以免除用户维护 Kubernetes 集群的烦恼，目前产品中也提供了基于阿里云的便捷对接流程帮助用户购买和设置相关的云资源，接下来也会逐步支持 aws、华为云等厂商。

- Rainbond Cloud 的收费模式

  > Rainbond Cloud 对于使用资源在 30GB 以内的用户完全免费，对于对接的资源量无限制，在这个授权空间内足够支持用户搭建自己的第一套业务生产环境。若需要超过 30GB 调度内存、目前的购买价格是 49/GB/月，包年有更多折扣。

- Rainbond Cloud 与 Rainbond 开源的关系

  > Rainbond Cloud 是 Rainbond 产品 SaaS 化在线服务平台，Rainbond Cloud 是 Rainbond 开源体系的超集，拥有更好的体验、更快的迭代和更棒的生产稳定性。

- Rainbond Cloud 所有的产品体验可以私有化吗

  > 可以，Rainbond 有提供 Enterprise 私有云版本，已在交通、能源、高校、民航、军队、政府等数十个行业落地，若你需要完整的私有化解决方案，请联系销售。

我已经了解了 Rainbond Cloud 的模式和价值，[开始体验](https://cloud.goodrain.com/)

我还有疑问，咨询产品、解决方案，获取技术支持，请联系 18501030060（曾庆国），此外你注册后我们的在线服务团队同事也会在第一时间与你取得联系，为你答疑解惑。
