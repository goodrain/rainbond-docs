---
title: 国产化信创
description: Industrial and chemical information and innovation support
keywords:
- 国产化信创
- Industrial and chemical information and innovation
---

## 简介

国产化信创是指中国本土信息技术和创新产业的发展和推广。国家发展信创产业的主要目的是降低对进口技术的依赖，提高自主创新和核心技术的掌握能力；在数字化转型的过程中，通过将云原生技术与国产化系统、国产化CPU相结合，Rainbond使得应用的开发、部署、运维以及交付变得更为简单和高效。

## 主要功能

### 信创环境部署

Rainbond 对国产化 CPU 和国产化操作系统做了适配，同时还支持“一云多芯”集群的部署和管理。

#### 国产CPU、国产操作系统支持

Rainbond企业版对国产CPU和国产操作系统提供全面支持，确保应用能够在国产硬件和软件环境下稳定运行。这包括对多种国产CPU架构的优化和适配，如鲲鹏、飞腾、龙芯等，以及对国产操作系统的兼容性，例如统信、银河麒麟、中标麒麟、龙蜥、欧拉操作系统等。这种支持不仅涵盖了基础的运行环境，还包括了对特定硬件和软件特性的优化，以提高性能和安全性。此外，Rainbond平台还提供了完善的开发者工具和API接口，帮助用户快速构建和部署云原生应用。

![description](https://static.goodrain.com/docs/enterprise-app/xinchuang/xinchuang2.png)

#### 一云多芯集群支持

Rainbond 支持"一云多芯"集群的管理，"一云多芯"主要是指用一套平台来管理不同架构的硬件服务器集群，可以支持多种类型的芯片，解决不同类型芯片共存所带来的多云管理问题。而 Rainbond 在这上面主要提供以下两方面的支持。

首先，从集群部署和管理层面上来说。Rainbond 允许通过一个统一的控制台部署不同架构的集群，即可以通过页面直接部署管理x86架构的集群，也可以部署管理ARM架构的集群，同时还支持在同一个集群中部署不同架构的节点。这意味着用户可以在一个集中的界面中监控和管理横跨多种CPU架构的集群，从而优化资源分配和操作流程。

其次，Rainbond支持在单个集群内部署支持不同节点架构的异构应用。该功能使得不同架构的应用可以在同一集群中运行在适合它们的节点上，并且这些应用之间能够无缝通信。例如，在同一个集群中，基于ARM架构的应用可以运行在ARM节点上，而基于x86架构的应用则运行在x86节点上，而这一切都能通过 Rainbond 的界面轻松实现。

### 跨架构应用编译运行

Rainbond支持将有源码的x86应用系统自动编译成兼容国产化CPU的应用，同时还提供了国产化能力仓库，帮助用户实现各类国产化应用的沉淀与复用。

#### 跨CPU架构源码编译

在传统的应用开发和部署环境中，绝大多数应用都是针对 x86 设备编译的。然而，随着国产化进程的推进，越来越多的应用需要在非 x86 指令集的国产 CPU 上运行。这就意味着，原本在 x86 环境中正常运行的业务系统，需要基于国产化服务器重新编译才能正常运行。这个重新编译过程不仅复杂且耗时，还需要大量的人力和时间投入。除了找到适合的语言构建工具，还需要搜集编译过程中所需的各类依赖。

Rainbond的源码构建功能在这里发挥了关键作用。它支持将有源码的 x86 应用系统自动编译成兼容国产化CPU的应用。这一功能极大地简化了传统的编译流程，降低了将应用迁移到国产化硬件平台上的复杂度。用户无需深入研究和处理各种编译依赖和环境问题，Rainbond的构建流程会自动处理这些工作，大幅提高了国产化应用的兼容适配效率。

当前支持的源码类型主要有 Java（Maven、Jar、War、Gradle）、NodeJS、Golang、Python、PHP、Html等。

![description](https://static.goodrain.com/docs/enterprise-app/xinchuang/xinchuang3.png)

#### 国产化能力仓库

国产化兼容适配是一个系统工程，除了应用本身需要重新编译，还需要周边生态和国产化中间件支持。Rainbond 的应用市场可以将通过兼容适配的应用系统、中间件和工具等国产化能力统一存放，并分门别类的管理，通过积累国产化能力逐步实现全国产化替代。

同时 Rainbond 支持在部署时根据当前集群的 CPU 架构自动匹配合适的应用。避免由于应用架构不匹配而导致的应用无法正常运行的问题。

## 使用手册

### 信创环境部署

1. 环境准备：确保服务器环境中已安装所需的国产操作系统，如统信、银河麒麟等。
2. 部署Rainbond企业版控制台：通过 docker run 命令在国产操作系统上安装 Rainbond 控制台并访问。
3. 集群创建：在 Rainbond 控制台中创建新集群，按需添加不同架构的节点的IP地址，平台将自动创建好 Kubernetes 集群，并识别出各个节点的架构信息。
4. 监控和维护：在“平台管理-集群”中可以查看各个节点的状态、CPU 架构等，并可以在此操作节点的调度、排空等策略。

### 跨架构应用编译运行

1. 源码准备：将您的 x86 源码打成压缩包上传到平台或者直接提供 Git 仓库地址。
2. 自动识别和编译：在 Rainbond 控制台中创建新应用，选择源码构建方式，平台将自动识别出源码类型，此时，在构建时可以选择打包成 amd64 架构或 arm64 架构，平台将自动编译成兼容所选 CPU 架构的应用。
3. 应用运行和访问：编译好的应用将自动在对应的节点架构上运行。此时去组件详情中，打开对外服务，即可快速访问。
4. 异构应用编排：在往信创迁移的过程中，会存在一个过渡期，这期间，arm 应用和 amd 应用需要共存且通信。而在平台上，每个组件在构建时选择好其架构后，运行起来就可以以拖拉拽的方式进行编排，编排完成后，组件之间即可正常访问。
6. 发布到国产化能力仓库：对于已经兼容国产化的应用，可以在应用视图，通过发布功能，一键将其发布到国产化能力仓库，方便其他用户使用。
