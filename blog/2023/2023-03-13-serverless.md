---
title: 如何建设私有云原生 Serverless 平台
description: 随着云计算的普及，越来越多的企业开始将业务应用迁移到云上。然而，如何构建一套完整的云原生 Serverless 平台，依然是一个需要考虑的问题。本文将介绍如何在 Rainbond 上构建私有的 Serverless 平台。
slug: serverless
image: https://static.goodrain.com/wechat/serverless/serverless.png
---

随着云计算的普及，越来越多的企业开始将业务应用迁移到云上。然而，如何构建一套完整的云原生 Serverless 平台，依然是一个需要考虑的问题。

<!--truncate-->

## Serverless的发展趋势

云计算行业从 IaaS（基础设施即服务）到 PaaS（平台即服务），再到 Serverless（无服务器）的发展，经历了一个逐渐从底层到上层，从IT基础设施提供商到应用开发者的转移的过程。

IaaS 时代，云计算提供商主要提供基础设施服务，包括计算、存储、网络等，用户需要自己搭建运维应用。这个阶段主要面向IT运维人员和企业内部的应用开发团队。

随着 PaaS 的出现，云计算提供商开始提供更高层次的服务，包括开发框架、数据库、消息队列等，用户只需要关注应用开发，无需关心底层设施。这个阶段主要面向应用开发者和创业公司，可以大大提高开发效率和降低成本。

而 Serverless 的出现，则更进一步解放了应用开发者的手脚，将服务器管理交给云计算提供商，应用开发者只需关注业务逻辑的实现，无需关心服务器的管理和维护。Serverless的出现使得应用开发更加灵活和高效，也降低了开发和运维成本，因此受到了越来越多的关注。

总体来看，从IaaS到PaaS再到Serverless的发展，是云计算服务不断向上层抽象和自动化的过程，提高了IT基础设施和应用开发的效率，降低了成本，推动了数字化转型的进程。随着技术和市场的不断变化，未来云计算服务还将不断地向更高层次的抽象和自动化发展。



## 自建 Serverless 的意义与困境

建设私有化的云原生 Serverless 平台具有重要的意义和必要性。首先，相比于公共云平台，私有化的云原生 Serverless 平台可以更好地满足企业的特定需求，保障数据的安全性和隐私性，同时也能够更好地管理和控制计算资源的分配和利用。其次，随着数字化转型和云原生技术的普及，企业对于 Serverless 架构的需求也越来越大，建设私有化的 Serverless 平台可以更好地满足企业的需求，提高企业的业务效率和运营效果。

然而，建设私有化的云原生 Serverless 平台也具有一定的难点。首先，需要企业拥有一定的技术实力和人才储备，包括云计算、容器、微服务等多种技术的掌握和运用。其次，需要进行系统的架构设计和资源规划，包括容器集群的搭建、网络的配置、存储的规划等。此外，私有化的Serverless平台需要满足高可用、高性能、高安全的要求，需要进行多方面的测试和优化。最后，建设私有化的Serverless平台需要考虑成本的控制和效益的提升，需要综合考虑多种因素，包括硬件设备、软件开发和维护等成本。因此，建设私有化的云原生Serverless平台需要企业在技术、资源、人才和经济等多方面进行全面的规划和考虑，确保平台的稳定性和可持续性。



## ServerLess 的特点

目前，Serverless 并没有一个业界统一的标准规范，因为 Serverless 并不是一种具体的技术或架构，而是一种基于云计算的应用运行和部署方式，这种部署方式凸显出开发人员不必关心服务器等基础设施。一般情况下，我们认为一个云原生的 Serverless 平台应该提供以下能力：

1. 弹性伸缩：平台应该支持应用自动扩缩容，以便应对变化的负载和流量。
2. 容器编排：平台应该支持容器编排，以方便管理应用的生命周期和资源分配。
3. 无服务器计算：平台应该支持无服务器计算模式，以提高开发者的效率和降低成本。
4. 自动化运维：平台应该支持自动化运维，包括自动部署、自动扩容、自动恢复等功能。
5. 服务发现与负载均衡：平台应该支持服务发现和负载均衡，以确保应用的高可用性和稳定性。
6. 日志监控和告警：平台应该支持日志监控和告警，以便及时发现和解决应用问题。
7. 安全管理：平台应该支持安全管理，包括身份认证、访问控制、审计服务等功能，以确保应用的安全性和隐私性。
8. 自动化CI/CD：平台应该支持自动化CI/CD，以便实现快速迭代和部署。
9. 多云支持：平台应该支持多云环境，以便应用可以跨多个云平台部署和运行。

如此多的能力要求，为自建云原生 Serverless 平添了不少难度。那么是否可以选择一个开源的方案来完成这个目标呢？



## 基于 Rainbond 自建

Rainbond 是一款开源的云原生应用管理平台，它可以帮助用户快速构建和管理云原生应用，其很多功能特性都与 Serverless 的无服务器理念不谋而合。Rainbond 提供了一系列的工具和服务，包括应用编排、容器编排、自动化部署、监控告警、应用管理等功能，可以帮助用户实现应用的快速迭代和部署。此外，Rainbond 还支持多语言、多框架、多云环境的部署，用户可以根据自己的需要选择不同的部署方式。

![server-1](https://static.goodrain.com/wechat/serverless/rainbond-serverless-1.png)



### 原生支持多云管理

Rainbond 可以架设在多种不同的云之上，原生支持多云管理。这种多云管理能力可以帮助用户抹平多种不同云计算供应商之间的差异，提供一致的应用部署、应用管理体验。无论是公有云、私有云或混合云，对用户而言都变成透明层，用户的应用可以借助Rainbond提供的能力完成跨云的快速迁移。
![server-2](https://static.goodrain.com/wechat/serverless/rainbond-serverless-2.png)


### 简化应用部署

Rainbond 支持用户部署由不同开发语言开发而来的应用，这个过程不需要用户编写 Dockerfile，不需要了解容器镜像如何打包。被支持的语言类型包括：Java、Python、Golang、PHP、NodeJS、.NetCore以及静态Html语言。用户在操作时仅需要提供代码仓库地址，或者直接上传 Jar、War 包即可将构建任务交给 Rainbond ，后者会自动识别语言类型，并自动配置语言的构建环境与最终运行环境。构建任务完成后，应用会自动运行起来，整个过程不需要用户过多参与。

部署过程中，用户可以自己选择以哪种 Workload 类型来部署应用，Rainbond 除了支持常见的 Deployment、StatefulSet 之外，也支持部署 Job、CronJob 类型的 Workload。

### 弹性伸缩能力

弹性伸缩能力是 Serverless 场景中最受关注的能力之一，自动化的弹性伸缩能够提升对计算资源的利用率。用户可以借助这种能力，自动化应对业务的峰谷流量。Rainbond 能够根据 CPU/MEM 资源利用情况进行实例数量上的 1-N 自动伸缩，用户仅需要做非常简单的一次设置即可。在更高阶的场景中，Rainbond 能够旁路感知Http业务的平均响应时间、吞吐率等性能指标，并据此实现自动伸缩能力。

### 微服务能力

Serverless架构与传统的微服务架构类似，都是基于分布式系统的思想，将一个应用拆分成多个小的、相对独立的服务单元来进行开发、部署和管理。而微服务框架可以帮助开发人员更好地设计和开发这些服务单元，提高系统的可维护性、可扩展性和可靠性。Rainbond内置灵活高效的ServiceMesh微服务框架，能够完成跨语言、跨协议、跨架构的微服务编排，并且提供全面的微服务治理、容错机制等能力。

### 自动化运维

Rainbond提供完善的自动化运维能力，能够极大的解放开发人员。许多应用运维工作都将由平台来接管，包括定时数据备份、健康检测、故障自愈等。

### 可观测性中心

可扩展的全方位可观测性能力，提供上至应用组件，下至平台的监控视图。全局日志功能与链路追踪能力，能够帮助开发者快速定位问题。实时告警能力，则保证了每一次异常都会得到开发者的关注。

### 自动CI/CD

Rainbond 能够对接 Git 或 Svn 类型的代码仓库，简化用户创建应用以及配置自动化 Webhook 的流程。开发者仅需要提交一次代码，就可以触动整个CI/CD链条，自动化完成代码更新后的上线。

### 一键配置网络入口

用户不需要学习复杂的负载均衡配置，仅仅需要一键，就可以开启 L4/L7 的网关策略，将应用的端口对外暴露，平台将会根据要求自动生成 IP:Port 或域名形式的访问地址。

### 安全管理

平台中采用双因素认证方式保证登录安全，并提供基于 RBAC 的设计方案来确保对应用的权限控制。除此之外，Rainbond 提供全局的操作日志审计功能，保留用户对应用的每一次操作记录。



Rainbond 作为一个开源的云原生应用管理平台，能够帮助企业应对建设私有化的云原生 Serverless 平台的难点。首先，Rainbond 提供了丰富的组件和工具，使得企业可以轻松构建容器集群、微服务架构、CI/CD流水线等，极大地降低了技术门槛。其次，Rainbond 提供了完善的应用管理和监控机制，包括应用部署、服务编排、负载均衡等功能，大大简化了应用开发和运维的工作量，实现了应用管理的自动化和免运维。此外，Rainbond 提供了网关组件，可通过一键即可对外暴露L4/L7层服务，提高了应用的安全性和可访问性。Rainbond 还支持 Job 任务类型或 CrontabJob 定时任务类型，使得企业能够方便地进行定时任务调度。最重要的是，Rainbond 提供了 ServerMesh 微服务框架和内置的应用编排模型，帮助企业轻松实现应用拓扑的编排和管理，实现应用的快速迭代和更新。此外，Rainbond 还能够对接 Git 类型代码仓库，实现自动化 CI/CD 流程，进一步提高了开发效率和运营效果。



## 写在最后

通过借助 Rainbond 建设私有化的云原生 Serverless 平台，企业能够更好地应对技术难点，提高平台的稳定性和可持续性。同时，Rainbond 还提供了完善的文档和社区支持，帮助企业更好地了解和掌握相关的技术和应用。因此，借助 Rainbond 建设私有化的云原生 Serverless 平台不仅能够解决技术难点，也能够提高企业的开发效率、降低运维成本，是建设私有化 Serverless 平台的理想选择。