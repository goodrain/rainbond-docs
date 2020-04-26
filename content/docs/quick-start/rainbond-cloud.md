---
title: Rainbond-Cloud
description: 本篇文章主要讲解Rainbond Cloud 架构模式，用户价值和使用方式
weight: 208
hidden: true
---

Rainbond Cloud 是Rainbond产品SaaS化在线服务平台，由好雨科技运营。Rainbond Cloud可以认为是Rainbond集群的托管服务，依托于IaaS厂商的计算资源，比如用户购买阿里云的托管Kubernetes集群，通过API对接到Rainbond Cloud，由Rainbond Cloud来管理用户的Kubernetes集群，并提供给用户多云应用管理体验。Rainbond Cloud有如下优势：

* 完整的Rainbond功能，持续产品迭代和升级，需求不等待；
* 多云资源管理，阿里云、AWS、华为云等IaaS厂商的资源，统一托管到Rainbond Cloud，你只需要管应用，应用可以透明在多云上备份和迁移，不被IaaS厂商绑定；
* 便捷的云资源对接，仅需30分钟即可完成集群从计划到投产；
* 服务安全可靠，用户所有代码、应用、数据、流量都由用户自己掌控。Rainbond Cloud只是管理和调度服务，即使Rainbond Cloud故障不影响用户业务；
* 帮助用户实现云原生DevOps、企业中台、企业应用交付等流程和体验；
* SLA保障，解决你的后顾之忧；



Rainbond Cloud 适用于以下几类用户：

* Rainbond开源用户，需要使用更多的Rainbond功能体验，比如多集群管理、可靠的SLA保障等。
* 准备将业务上云的用户，减去学习Kubernetes复杂的概念和公有云集群环境搭建的烦恼，直接跨越到云原生应用管理模式。
* 正在转型的ToB的软件公司，你是否正在从过去高成本的软件交付模型向便捷交付、SaaS化服务交付模式转型，Rainbond Cloud完善的应用交付链路可以帮助你快速建立云原生应用交付形态。



Rainbond Cloud的架构模式如下：

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/cloud/cloud%E6%9E%B6%E6%9E%84%E8%AF%B4%E6%98%8E.png)

接入Rainbond Cloud的每一个企业用户都需要接入自己的Kubernetes集群，当然我们推荐直接使用各大公有云厂商提供的Kubernetes集群，比如阿里云ACK。用户也可以通过其他方式自建Kubernetes集群，比如使用Rancher创建并管理的集群。在将Kubernetes集群对接到Rainbond Cloud的过程中我们将在Kubernetes集群中部署Rainbond Region服务，从而对外暴露标准的、安全的Rainbond Region API供云端Cloud服务调用。

因此开始体验Rainbond Cloud服务，用户需要经过以下几个步骤：

* 注册企业和账户

> 建立您企业独有的平台访问域名，平台服务的所有用户互相隔离，保障安全。

* 对接您的公有云资源

> Cloud服务的为你提供了基于各大云厂商便捷安装Kubernetes集群和初始化Rainbond Region的体验流程，尽可能简化用户的操作，快速上手。若你需要对接的资源不能使用便捷流程，可以通过手动安装Rainbond Region的方式进行对接，对接完成后你即可拥有自己的应用调度集群资源。

* 开启Rainbond之旅

> 用户开始使用Rainbond Cloud是完全免费的，当你的规模逐渐扩大，也就是说Rainbond 为你的企业带来了真正的价值后才需要购买更多的Rainbond Cloud服务授权，详细见[价格说明](https://cloud.goodrain.com/page/price)

{{<video title="Rainbond Cloud对接阿里云ACK集群演示视频" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/rainbond-cloud-init-cluster.mp4">}}



### 常见FAQ

* 为什么Rainbond Cloud目前只支持阿里云ACK对接

  > 这个问题结合上文中说到的一样，首先Rainbond Cloud可以对接各类Kuberntes集群，包括各类云厂商提供的集群和您自建的Kubernetes集群。但是我们推荐使用例如阿里云ACK托管集群以免除用户维护Kubernetes集群的烦恼，目前产品中也提供了基于阿里云的便捷对接流程帮助用户购买和设置相关的云资源，接下来也会逐步支持aws、华为云等厂商。

* Rainbond Cloud的收费模式

  > Rainbond Cloud对于使用资源在30GB以内的用户完全免费，对于对接的资源量无限制，在这个授权空间内足够支持用户搭建自己的第一套业务生产环境。若需要超过30GB调度内存、目前的购买价格是49/GB/月，包年有更多折扣。

* Rainbond Cloud与Rainbond开源的关系

  > Rainbond Cloud 是Rainbond产品SaaS化在线服务平台，Rainbond Cloud是Rainbond开源体系的超集，拥有更好的体验、更快的迭代和更棒的生产稳定性。

* Rainbond Cloud所有的产品体验可以私有化吗

  > 可以，Rainbond有提供Enterprise私有云版本，已在交通、能源、高校、民航、军队、政府等数十个行业落地，若你需要完整的私有化解决方案，请联系销售。

  

我已经了解了Rainbond Cloud的模式和价值，[开始体验](https://cloud.goodrain.com/) 

我还有疑问，咨询产品、解决方案，获取技术支持，请联系 18501030060（曾庆国），此外你注册后我们的在线服务团队同事也会在第一时间与你取得联系，为你答疑解惑。