---
title: 常见问题
description: 常见问题
keywords:
- Rainbond 常见问题
---

## Q: Rainbond 是否开源？

Rainbond 是 100% 开源的云原生应用管理平台，采用 LGPL-3.0 开源协议，源代码主要托管在 [Github](https://github.com/goodrain/rainbond)，国内代码托管平台 [Gitee](https://gitee.com/rainbond/Rainbond)、[GitCode](https://gitcode.com/goodrain/rainbond)。

社区版完全免费，企业版提供额外功能和商业支持。

## Q: Rainbond 和 Kubernetes 是什么关系？

Rainbond 以 Kubernetes 为基础设施，在其之上构建了应用管理平台。用户无需学习 Kubernetes 即可管理应用，但又能充分利用 Kubernetes 的优势。

## Q: Rainbond 支持多集群管理吗？

支持。可以通过在 Rainbond 中添加多个 Kubernetes 集群，实现应用的跨集群部署和管理。

## Q: Rainbond 如何保证高可用？

通过多节点部署、组件副本集、存储高可用等机制保证。建议生产环境采用至少3节点的集群部署。

## Q: Rainbond 是否支持私有化部署？

完全支持私有化部署，可以在企业内网环境中独立运行，不依赖外部网络。

## Q: Rainbond 适合中小企业使用吗？

非常适合。Rainbond 降低了应用云原生化的门槛，中小企业无需大量运维人员即可管理好应用。

## Q: Rainbond 和 Jenkins 如何选择？

两者定位不同：
- Jenkins 是 CI/CD 工具，专注于流水线构建
- Rainbond 是应用管理平台，提供全流程应用管理，包含构建、部署、运维等

可以结合使用：Jenkins 负责代码构建，Rainbond 负责应用部署和管理

## Q: Rainbond 和 Rancher 有什么区别？

<details>
  <summary>1.定位差异</summary>
  <div>

Rancher 是一个全栈式的 Kubernetes 容器管理平台，可以帮助运维人员快速部署和运行集群并管理上面的容器。Rainbond 则在云原生应用级包装和抽象，面向开发、测试和应用运维有应用管理的控制台，用于应用的全生命周期管理和运维。并在应用之上实现场景化的应用交付流程（软件开发交付流程、企业 IT 管理流程、企业应用市场生态）。

  </div>
</details>

<details>
  <summary>2.使用差异</summary>
  <div>

1. Rancher 最大的优点是完全兼容 K8s 体系，更注重对k8s基础设施的结合, 提供了更原生的应用部署方式，同时在各个层次可以集成的云原生领域工具集已经非常丰富，虽然学习成本较高，但提供了一站式的解决方案，对运维更加友好。Rainbond 则面向开发人员提供了更高的易用性。让开发者不需要学习 Kubernetes 和容器相关技术和概念就能快速实现云原生的体验。另外，Rainbond 提供的一体化开发环境、模块编排、应用市场等功能，能大幅度提高定制开发以及应用交付的效率。能通过应用模版的交付降低交付成本以及交付难度。

2. Rancher 专注于帮助 DevOps 团队面对多集群情况下的运维和安全挑战，多集群部署、集群监控、容器安全等方面较为出色。而 Rainbond 在使用上，没有提供直接操作集群和节点的功能。主要还是基于“应用”的多云管理，支持应用在多集群中快速部署。所以 Rancher 和 Rainbond 并没有冲突，向下对接基础设施，管理集群的安全性与合规性是 Rancher 最擅长的事情，向上为最终开发人员提高易用的云原生平台的使用体验则交给 Rainbond。

  </div>
</details>

## Q: Rainbond 和 KubeSphere 有什么区别？

<details>
  <summary>1.定位差异</summary>
  <div>

KubeSphere 主要定位于面向云原生应用的容器混合云，主打即插即用的插件式生态扩展能力。Rainbond 则定位于易用的云原生多云应用管理平台。主打应用的全生命周期管理以及2B行业的应用交付问题。

  </div>
</details>

<details>
  <summary>2.使用差异</summary>
  <div>

1. KubeSphere 基于图形化界面来部署自己的业务组件时，需要填写的字段通常是 yaml 声明式配置文件的 “翻译”，对于 Kubernetes 不够熟悉的用户想要顺利使用，仍有一定的门槛。Rainbond 不直接使用 yaml 文件，应用的各类资源均以开发者的视角定义，部署业务时则完全不需要了解 Kubernetes 相关知识，用户只需填写源码地址，关注于业务即可。对于不熟悉 Kubernetes 的用户而言非常友好。

2. 二者均提出了应用模版的概念，应用模版主要是通过对应用整体进行包装和抽象，包含应用运行所需的全部运行定义，使其与底层技术和概念隔离。最终实现用户一键部署应用的体验。KubeSphere 的应用模版主要基于标准的 Helm 应用模版实现，对 Helm 模版的支持较好，开发人员可以上传自己制作的 Helm Chart 作为应用模版。Rainbond 则是基于 RAM(Rainbond Application Model) 实现的应用模版。开发人员可以直接将正在运行的应用一键发布到应用商店，所见即所得，安装下来的应用与原应用保持一致。不需要了解 RAM 的具体实现，也不需要学习 Helm Chart 的编写。即可制作出自己的应用模版并实现离线交付、多云交付、私有交付等。

  </div>
</details>


## Q: Rainbond 适合什么场景？

- 企业内部应用平台
- 微服务架构转型
- DevOps 实践
- 多云应用管理
- 传统应用容器化改造
- 等等

## Q: Rainbond 对资源要求是多少？

最低配置要求：
- 单节点：4核8G，50G磁盘
- 生产环境：建议8核16G以上，100G以上磁盘
- 高可用环境：建议3台8核16G以上服务器

具体资源因应用规模和复杂度而异，建议根据实际情况进行评估。

## Q: Rainbond 支持哪些存储？

支持多种存储方案：
- 默认 LocalPath
- NFS
- Ceph
- 阿里云NAS/云盘
- 其他 Kubernetes 支持的存储类型


## Q: Rainbond 支持哪些类型的应用部署？

- [源代码构建](./how-to-guides/app-deploy/source-code/springboot)（Java/Python/Go等）
- [Docker 镜像](./how-to-guides/app-deploy/image/via-registry-deploy)
- [Helm Chart](./how-to-guides/app-deploy/deploy-using-yaml-helm/helm-example)
- [K8S YAML](./how-to-guides/app-deploy/deploy-using-yaml-helm/yaml-example)
- [应用市场](https://hub.grapps.cn/)
- 对接第三方服务

## Q: 如何清理磁盘空间？

请阅读[集群资源清理](./ops-guides/management/resource-cleanup)文档

## Q: 平台管理员密码如何重置？

请阅读[重置管理员密码](./ops-guides/management/reset-pwd)文档
