---
title: A mixed cloud management solution based on Rainbond
description: The article explores the difficulties, key points in the mixed cloud scene, as well as solutions for the Rainbod platform in terms of mixed cloud management of the cross-cloud platform.Consistency management for applications in mixed clouds, including through the organization and management of containers in multiple clusters, has been achieved.
slug: hybrid-cloud
image: https://static.goodrain.com/wechat/hyper-cloud/hypercloud-1.png
---

The executive summary：explores the dilemma of the mixed cloud scenario, key points, and solutions for the Rainbod platform to blend cloud management across cloud platforms.Consistency management for applications in mixed clouds, including through the organization and management of containers in multiple clusters, has been achieved.The article also describes applications template delivery and cross-cloud team management for the Rainbod platform in a mixed cloud environment to help users simplify application delivery and delivery operations for the cross-cloud platform.

<!--truncate-->

## 混合云的应用场景

随着云原生技术的逐渐成熟，混合云成为了企业在云原生领域中的热门话题之一。混合云的场景特点是企业应用和数据在多个云环境中进行部署和运行，包括私有云和公有云，以及不同的云服务提供商。这样的场景带来了许多挑战和机遇。

混合云的价值点主要在于：

- 灵活性和可扩展性：混合云能够让企业在不同云环境中选择最适合的部署方案，使得应用和服务的部署更加灵活和可扩展。

- 高可用性和容灾能力：混合云能够通过在多个云环境中部署应用和数据，提高系统的可用性和容灾能力，从而减少系统停机时间和数据损失。

- 降低成本：混合云能够让企业根据应用和数据的需求，在不同的云环境中选择最优惠的价格和性能比例，从而降低总体成本。

## 混合云管理要点

混合云场景相较于单一的私有云或公用云场景而言复杂很多，建设混合云的难点往往来自于不同供应商提供的云平台之间有很多差异，很难做到统一的管理体验。而且，多个供应商提供的云平台之间不互通，跨云进行数据同步时，需要考虑一致性与安全性。

- 跨云平台标准化：不同的云平台之间存在着各种差异，使得跨云平台的操作和管理变得复杂。标准化能够让不同平台之间的操作和管理更加一致，减少管理难度。

- 数据一致性：不同云平台之间的数据交换和同步需要确保数据一致性，以避免数据冲突和丢失。

- 安全性：在混合云场景下，不同云平台之间的数据和应用需要得到适当的安全保护，以保障数据的机密性和完整性。

- 用户管理：在混合云场景下，不同的云平台之间的用户体系并不相通。统一的混合云管理平台能够利用一套用户体系纳管多个集群中的计算资源，极大的降低了管理成本。

## 混合云场景功能需求

在混合云场景中，以下跨云功能通常具有很强的需求：

1. 一致性操作体验：以一致性的管理体验，抹平用户使用不同云资源的操作差异。使得用户可以通过一套操作，完成应用从发布到上线到多个云环境的核心过程。一致性操作体验可以极大的弱化用户在面对多个不同云环境的不适感，使底层计算资源对用户透明。

2. 用户管理：通过在统一控制台层面抽象用户体系，完成一套用户管理所有集群的效果。可以极大的降低企业管理成本。

3. 跨云迁移和部署：随着企业在多个云平台上部署应用程序，跨云迁移和部署变得非常重要。能够将应用程序从一个云平台迁移到另一个云平台，无缝部署并在多云环境中进行管理，将大大提高企业的灵活性和敏捷性。

4. 多云容灾：由于云服务提供商可能会遇到可用性问题，因此在混合云场景中，多云容灾变得非常重要。通过在多个云平台上部署应用程序，企业可以在一个云平台遇到问题时，快速切换到另一个云平台上运行，以保持业务的连续性。

5. 跨云数据管理：在混合云场景中，跨云数据管理也是一个重要的需求。能够在多个云平台上进行数据备份和恢复，以及在不同云平台之间共享数据，将为企业提供更强的灵活性和可扩展性。

## 基于Rainbond 的混合云建设

Rainbond云原生应用管理平台在设计之初就考虑了如何适应混合云管理场景。在产品设计中，Rainbond可以从逻辑上划分为控制台和集群端组件两大部分，其中控制台的多云管理模块可以使其对接并管理多个集群。而集群端组件可以部署在各类 Kubernetes 集群之中，通过与 Kube-apiserver 的通信来管理 Kubernetes 集群之中的各类资源。Rainbond 集群端组件可以部署到各类  Kubernetes 集群之中，包括标准  Kubernetes 集群、 K3s 集群，也可以部署到阿里云ACK托管服务、腾讯云 TKE 服务等托管集群之中。并能够适配公有云服务商所提供的多种云服务，比如通过CSI为业务Pod分配阿里云硬盘存储。

Rainbond控制台则提供了多集群管理的唯一入口，用户不需要过多学习，就可以掌握面向不同云环境发布应用的操作步骤。而这些操作步骤是统一且易用的，不受低层不同云环境的掣肘。

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-1.png" width="70%" />

### 团队工作空间隔离

Rainbond云原生应用管理平台在控制台层建设用户体系，这意味着用户体系与低层云环境无关，Rainbond 通过自身RBAC权限体系来决定用户可以访问哪些云环境所对应的工作空间中的资源。Rainbond 通过团队这一抽象概念来划分用户的工作空间。团队与低层云环境的对应关系可以是共享的，也可以是独享的。用户一旦加入指定的团队，即可使用团队所开通的集群。

- 共享模式：即一个团队在多个不同的集群中开通，团队一旦在多个集群中开通，就会在其中同时创建同名的命名空间。在这个团队中的用户，自然可以在不同的集群中部署自己的业务系统。不同集群的操作入口由控制台提供，非常容易理解。
- 独享模式：独享模式更好理解，即在指定的集群中开通命名空间与之对应，用户仅可以使用这个集群中的计算资源。

基于团队这一工作空间的抽象，用户可以在其中完成应用的发布与管理操作。Rainbond 提供更多能力丰富其管理能力，包括操作审计、资源限额、权限管理等能力。

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-2.png" width="70%" />

### 多云容灾

混合云多云容灾是在混合云场景中，为了确保应用的高可用性和容灾能力而采取的一种策略。在混合云环境中，由于应用可能部署在不同的云平台上，因此需要确保即使某一云平台出现故障或不可用，应用仍能够在其他云平台上继续运行。这就需要实现混合云多云容灾，使得应用可以在不同云平台之间实现无缝切换，确保应用的高可用性和容灾能力。

Rainbond 的多云管理机制为多云容灾打造了坚实的低层框架，纵使 Rainbond 在自身高可用能力上投入甚多，但我们依然不能假定集群级别的宕机崩溃不会发生。生产环境中常借助云服务商提供的其他能力一起建设健壮的多云容灾场景。额外要引用的能力包括：

- 智能化的网络入口切换能力：Rainbond 依靠 CDN 和智能 DNS 的协作，完成网络入口智能切换的能力。在平时，外部流量可以根据地域自动切换到就近的网关进行访问。在集群级别的宕机发生时，则将有故障的集群入口下线。
- 数据同步能力：无论用户访问到哪一个集群中的服务，都会得到同样的反馈，保障这个效果的前提是多个集群中的业务数据实时同步。Rainbond 不提供数据同步能力，这一部分我们需要依靠公有云供应商提供的数据同步服务来保障。阿里云提供的 DTS 服务是其中的代表。
- 专线网络能力：多个集群之间的数据同步往往不会轻易从公共网络中穿梭。从安全性和可靠性的角度出发，我们更倾向于使用专线网络进行多个集群之间的通信，尤其是在数据跨云同步场景里。

从整体架构上考虑多云容灾是我们的首要任务。但面对数据灾难，我们能做的不仅仅是防患未然，如何进行灾难后的恢复也是非常重要的一环。Rainbond云原生管理平台提供两个层次的备份恢复能力，首先是为Rainbond平台本身进行备份，确保平台自身可以恢复；其次是针对应用的备份能力，能够将包括持久化数据在内的应用进行整体备份。机房可以被战争、火灾或者自然灾祸摧毁，但只要运维人员手里拥有备份数据，整个Rainbond混合云平台及运行其上的应用就可以被重建。

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-3.png" width="70%" />

### 跨云应用部署

在混合云场景中，业务应用是一等公民，应用如何能够在不同的云环境中自由部署实际上是对混合云管理场景最基础的要求。在这个方面，Rainbond云原生应用管理平台以应用模板的交付流程来打通应用跨云部署的屏障。

应用交付一直是 Rainbond 致力解决的痛点问题。现代微服务动辄会将业务系统拆分成为几十个相互关联的微服务，利用传统方式将其部署到 Kubernetes 容器云环境中，不免要为数十份复杂的 Yaml 文件和容器镜像头痛不已。加之不同的云供应商所提供的云环境也不相同，更加灾难化了应用交付的体验。

前文中已经说到，Rainbond云原生应用管理平台已经在混合云场景下抹平了不同云环境的使用体验。在应用跨云交付场景中也是如此，复杂的微服务系统在 Rainbond 中被抽象成为了一个可以统一管理、统一交付的应用。通过将应用发布成为应用模板，即可在不同的集群之间完成一键安装和升级。极大的降低了软件交付成本。

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-4.png" width="70%" />

## 写在最后

混合云管理场景是眼下云计算领域最炙手可热的话题，利用 Rainbond 云原生应用管理平台打造的混合云可以解决大多数难点与痛点。面向未来展望，Rainbond 会在混合云管理领域继续发力，围绕更复杂的场景，纳管更多种不同的云资源。比如通过与 Kubedge 的集成，将混合云解决方案扩展到边缘计算场景。