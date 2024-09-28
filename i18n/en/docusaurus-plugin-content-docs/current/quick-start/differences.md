---
title: 与其他技术差异
description: 本章描述 Rainbond 与其他产品/技术的关键区别和共同点。
---

## Rainbond vs. Helm

### scene difference

Helm 定位于 Kubernetes 上的包管理工具，主要是 Kubernetes Yaml 文件的模版。对整个应用的状态无合理管控机制。Kubernetes is a technical component at the bottom of Rainbond. You do not need to learn containers and k8s to use Rainbond. Rainbond is compatible with the standards of containers and K8s. Rainbond runs on k8s, and k8s is responsible for the operation and scheduling of all applications.可以做到应用级的生命周期管理（构建、启动、停止、删除以及应用状态展示）。

### 2. 使用差异

1. Helm 安装应用完成后，没有明确的状态回流机制。用户无法直接了解整个应用的部署状态以及应用的运行状态。Rainbond 则通过拓扑图的形式直观展示了应用下所有组件的依赖关系以及运行状态。同时能可视化的管理应用下各个组件的生命周期。

2. Helm 应用的版本化管理是直接完整覆盖，没有合理的灰度策略。Rainbond 则可以通过应用模型以及插件能力选择性的进行灰度发布。必要时可以快速回滚。在制作 Helm 应用模版时，用户需要详细了解 Helm Chart 的编写。Rainbond 则通过界面的一键发布实现应用能力的积累复用。

## Rainbond vs. KubeSphere

### Positioning differences

KubeSphere 主要定位于面向云原生应用的容器混合云，主打即插即用的插件式生态扩展能力。cloud native Rainbond's idea of cloud native practice is similar to[Heroku](https://www.heroku.com/), but it has expanded its extension in the field of To B delivery. Other container platforms usually manage containers and infrastructure in a unified management interface, mainly for operation and maintenance. Difference with k8s Reference [Technical Architecture](/docs/quick-start/architecture/)主打应用的全生命周期管理以及2B行业的应用交付问题。

### 2. 使用差异

1. KubeSphere 基于图形化界面来部署自己的业务组件时，需要填写的字段通常是 yaml 声明式配置文件的 “翻译”，对于 Kubernetes 不够熟悉的用户想要顺利使用，仍有一定的门槛。Rainbond 不直接使用 yaml 文件，应用的各类资源均以开发者的视角定义，部署业务时则完全不需要了解 Kubernetes 相关知识，用户只需填写源码地址，关注于业务即可。对于不熟悉 Kubernetes 的用户而言非常友好。

2. 二者均提出了应用模版的概念，应用模版主要是通过对应用整体进行包装和抽象，包含应用运行所需的全部运行定义，使其与底层技术和概念隔离。最终实现用户一键部署应用的体验。KubeSphere 的应用模版主要基于标准的 Helm 应用模版实现，对 Helm 模版的支持较好，开发人员可以上传自己制作的 Helm Chart 作为应用模版。Rainbond 则是基于 RAM(Rainbond Application Model) 实现的应用模版。开发人员可以直接将正在运行的应用一键发布到应用商店，所见即所得，安装下来的应用与原应用保持一致。不需要了解 RAM 的具体实现，也不需要学习 Helm Chart 的编写。即可制作出自己的应用模版并实现离线交付、多云交付、私有交付等。

3. 在微服务架构上，KubeSphere 产品化的包装了 Istio，大幅度降低了 Istio 的使用体验，但这不意味着用户可以完全抛却 Istio 这一层的概念，应用内部的拓扑依靠事先的配置来体现。Rainbond 自研的微服务框架易用性更高一些，实现了拖拉拽式的微服务拼装模式。但在 Istio、Linkerd 这些 Service Mesh 微服务框架一统江湖的情况下，标准化还有所欠缺。目前 Rainbond 也提供集成方式接纳了 Istio 治理模式，但还没有得到大量用户的使用验证。

## Rainbond vs. Rancher

### Differences from container platforms

Rancher 是一个全栈式的 Kubernetes 容器管理平台，可以帮助运维人员快速部署和运行集群并管理上面的容器。Rainbond has different management interfaces for different groups of people. It has an application management console for development, testing, and application operation and maintenance, a command-line tool and a resource management background for system operation and maintenance, and an application market for application delivery personnel and end users.并在应用之上实现场景化的应用交付流程（软件开发交付流程、企业 IT 管理流程、企业应用市场生态）。面向系统运维则提供了命令行工具 grctl。

### 2. 使用差异

1. Rancher 最大的优点是完全兼容 K8s 体系，更注重对k8s基础设施的结合, 提供了更原生的应用部署方式，同时在各个层次可以集成的云原生领域工具集已经非常丰富，虽然学习成本较高，但提供了一站式的解决方案，对运维更加友好。Rainbond 则面向开发人员提供了更高的易用性。让开发者不需要学习 Kubernetes 和容器相关技术和概念就能快速实现云原生的体验。另外，Rainbond 提供的一体化开发环境、模块编排、应用市场等功能，能大幅度提高定制开发以及应用交付的效率。能通过应用模版的交付降低交付成本以及交付难度。

2. Rancher 专注于帮助 DevOps 团队面对多集群情况下的运维和安全挑战，多集群部署、集群监控、容器安全等方面较为出色。而 Rainbond 在使用上，没有提供直接操作集群和节点的功能。主要还是基于“应用”的多云管理，支持应用在多集群中快速部署。所以 Rancher 和 Rainbond 并没有冲突，向下对接基础设施，管理集群的安全性与合规性是 Rancher 最擅长的事情，向上为最终开发人员提高易用的云原生平台的使用体验则交给 Rainbond。
