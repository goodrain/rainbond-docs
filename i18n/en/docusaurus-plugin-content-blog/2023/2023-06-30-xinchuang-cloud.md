---
title: Rainbod help "Creative Apple" migrated to cloud
description: The ICT applications innovation industry is an important component of the country's digital transformation and an important backbone of critical infrastructure.Its core is to address the problem of the neck of the core technology critical chain, thereby providing a solid digital basis for China’s development, through industrial applications that drive the construction of a nationally-produced IT software and hardware base and a full-cycle ecosystem.
slug: localization-guide
image: https://static.goodrain.com/wechat/localization-guide/%E4%BF%A1%E5%88%9B.png
---

Release of Rainbond v5.14.2, also known as the **fumigation**.Beginning with this version, open source users can also use Rainbond to manage hardware computing resources that meet the requirements of confidence creation.In this version, \*\*The product team separates what previously existed only in an enterprise version of products and integrates into open source product lines.**This paper focuses on the theme of how to migrate to the clouds in a trust-generating environment** and provides a viable solution to the problem by combining the capacity of Rainbond Creation.

<!--truncate-->

## 向信创环境迁移应用的必要性

信创产业即信息技术应用创新产业，是我国数字化转型的重要组成部分，也是关键基础设施的重要支撑。其核心在于通过行业应用拉动构建国产化信息技术软硬件底层架构体系和全周期生态体系，解决核心技术关键环节**卡脖子**的问题，为中国发展奠定坚实的数字基础。

对一般的软件供应商而言，在面向党政军企售卖软件时，符合国产化信创要求已经逐渐成为无法绕过的硬性标准。即使是已经交付完成的软件，在后期的建设计划中，处于信创转型时期的党政军企也会提出向国产化信创环境中迁移的硬性要求。需求的背后总是隐藏着商机，掌握国产化信创背景下的应用迁移能力，将软件产品转化为**信创应用**是当下所有 ToB/ToG 信创应用供应商必须掌握的能力。Rainbond 信创版本在这样的场景中可以发挥极大的作用。

## 信创硬件生态

信创应用必须运行在国产化硬件和操作系统之上。国产化硬件生态中最重要的是 CPU 芯片，CPU 芯片的架构直接影响信创应用是否可以在国产化硬件上运行。目前主流的国产化 CPU 厂商包括飞腾、华为、龙芯、海光、兆芯等，其指令集集中在 `X86` 、`Arm` 以及自主性极高的 `LoongArch` (MIPS 指令集的后继者) 之中。而指令集的不同，直接影响到信创应用是否需要重新编译来进行适配。

![](https://static.goodrain.com/localization-guide/%E5%9B%BD%E4%BA%A7CPU%E7%94%9F%E6%80%81.png)

不难看出，国产化 CPU 芯片的生态有这么几个特点：

- `LoongArch`自主程度最强，但是其生态受限严重，短时间内无法很好的面向市场推广。
- 海光、兆芯手持生态最为繁茂的 `X86` 指令集授权，然而自主化程度最弱。`X86` 过于成熟稳定，前人大厦已成，很难在此基础上做出创新。
- 华为、飞腾拥有 `Arm` 指令集授权，自主化程度适中，而且 `Arm` 生态正处于蓬勃发展中，可以和 `X86` 生态掰一掰手腕。

市场的反馈非常理性，在当前国内的 CPU 芯片市场中，飞腾在党政领域PC市占率领先，海光与鲲鹏占据运营商服务器主要份额。回到信创应用供应商的视角，**如何打好 Arm 这张牌，将会是闯入国产化信创赛道的关键点**。Rainbond 信创版本通过**一云多芯**能力，方便的纳管包括 Arm 在内的多架构集群。

## “一云多芯”统管Arm & x86集群

顾名思义，[一云多芯](https://www.rainbond.com/docs/how-to-guides/localization-guide/multi-arch-installation)的异构集群，指的是在同一个集群中的计算节点中，其 CPU 芯片架构不唯一。

一般情况下，CPU 芯片的架构都是基于 Intel 公司推出的 `X86` 指令集，作为后起之秀的 AMD 也推出完全兼容 `X86` 的 `amd64` 指令集，二者可以视为等同。而在国产化信创场景中，很多国产 CPU 架构都是基于 `Arm` 指令集开发，常见的鲲鹏920、飞腾芯片等都属于该架构类型。为了能够融入国产化信创 IT 生态，Rainbond 自信创版本开始，全面兼容了 `Arm` 架构。

国产化信创绝非一朝一夕之事，大量在传统 `X86` 架构下开发的应用都需要很长时间的调整甚至重构才能完全在国产化芯片上运行，**一云多芯**主打同时能够运行多种架构应用的能力，在国产化替代的过渡阶段中将发挥重大作用。

Rainbond 信创版本可以在同个集群中统一管理和调度多种不同 CPU 架构计算节点，同时也可以借助多集群管理能力纳管多个单架构集群。超高的灵活性，可以让决策者自行决定异构计算资源的部署策略。

![](https://static.goodrain.com/localization-guide/%E5%BC%82%E6%9E%84%E9%9B%86%E7%BE%A4%E7%AE%A1%E7%90%86.png)

除 Arm 架构之外，Rainbond 信创版本也兼容主流国产化软硬件，全面支持信创场景，并且获得了国内各大 CPU 厂商、操作系统厂商的认证。一体化管理信创应用的开发、运维、交付全流程，极大降低国产化信创场景下的应用管理成本。

![](https://static.goodrain.com/localization-guide/%E5%9B%BD%E4%BA%A7%E8%AE%A4%E8%AF%81%E9%9B%86%E5%90%88.png)

## 信创应用迁移难点

对于信创应用供应商而言，从头开发一套信创应用并不是难事。我国信创生态已经日趋完整，无论是操作系统、开发工具还是数据库，都不存在空白区域，它们为全新信创应用的开发提供了全面的支持。**真正的难点在于如何将已经运行在传统服务器中的遗留业务系统迁移到国产化信创环境中去**。从传统的 `X86` 跨越到 `Arm` 架构基本意味着业务系统中所有服务组件的重新编译，甚至重构。在保障业务连续性的前提下，完成传统应用向信创应用的转化是我们无法回避的课题。

首先，让我们按照服务的开发语言、运行方式做个分类：

### 解释型语言

以 Python、PHP、Shell 为代表的解释型语言，也称脚本语言，是完全与 CPU 架构无关的。我们只需要提供能在信创环境中可用的语言解释器，即可在不改动一行代码的前提下将这种服务运行起来。

### 字节码型的编译文件

这种类型以 Java 语言编译出的 Jar、War 包为代表。Jar 、War 包是非常常见的软件交付物。由于其打包的是与  CPU 架构无关的字节码，最终运行由跨平台的 JVM 虚拟机负责，故而我们只需要提供能在信创环境中可用的 JDK 、JRE工具，即可在不改动一行代码的前提下将这种服务运行起来。

### 编译型语言

这里的描述是不严格的，因为字节码型的编译文件也产自编译型语言。在这里，我们特指的是以 C、C++、Golang 为代表的编译型语言，它们在编译时与  CPU 架构强相关，编译出的二进制产物只能在指定的 CPU 架构下运行。这一特性也意味着迁移过程必须经过重新编译，才可以在信创环境中运行起来。

遗留业务系统向国产化信创环境迁移绝非易事，需要甲方与供应商的密切合作。然而由于遗留业务系统的特性，导致供应商能够提供的支持是不一样的。支持力度的不同，直接影响迁移的效果。

### 提供支持

当甲方决意对某个遗留业务系统进行信创迁移时，恰好供应商承诺的支持期限还没有到期，供应商可以对业务系统的迁移提供全面的支持时，问题会简单很多。即使是面对编译型语言，只要能够提供源代码进行重新编译，则可以完成信创迁移，只是耗时费力罢了。

### 不提供支持

当甲方决意对某个遗留业务系统进行信创迁移时，恰好供应商承诺的支持期限已经到期，甚至已经无法联系到供应商时，事情就难办许多。甲方对遗留业务系统的了解不会太深，只能找到软件交付物进行分析，重新基于信创环境搭建编译、运行环境。然而对有些经年日久的业务系统而言，很难找到当年的源代码，如果这个服务恰好是编译型语言编译出的二进制文件，基本意味着信创迁移走入了死路。此时，甲方不得不考虑重新招标另一家供应商来重构这个系统，新的替代系统落地绝非一朝一夕之事，期间不能因为这一个服务阻碍国产化信创的整体落地进程。

**Rainbond "信创" 版本的核心功能是支持传统应用在信创环境中的云迁移**。它紧密关注用户所使用的不同语言类型，并自动化完成信创迁移的工作。一旦所有组件成功部署，通过内置的 ServiceMesh 微服务架构，可以实现跨架构的微服务编排，将服务组件连接起来形成完整的业务系统。

## 传统应用迁移上云

Rainbond 信创版本自动屏蔽架构差异，以最低成本将应用迁移到国产化信创环境之中。仅需要提供源代码，即可在指定架构环境中编译运行。开源应用商店提供不同架构的应用模板，上百种开源软件一键部署。信创应用供应商可以以最小的技术成本和时间成本，即可将不同类型的服务重新编译，并部署到信创环境中去。

![](https://static.goodrain.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)

## 异构微服务编排能力

Rainbond 信创版本凭借**一云多芯**管理能力， 可以在同个集群中统一调度管理不同 CPU 架构的计算节点。应用中的服务组件也可以按照要求部署到指定的架构中去。但是只有不同架构的微服务组件之间可以相互编排、相互通信，那么它们才能够成为一个有机的整体，形成完整的业务系统。同时也满足信创应用从传统的 `X86` 向 `Arm` 国产化迁移的过渡期的特殊要求。

借助于 Service Mesh 亦或是 Kubernetes Service 的能力，Rainbond 天生支持跨架构微服务之间的编排与通信。使用方法与 Rainbond 一直以来的拖拉拽拼积木式的微服务编排方法无异。

![](https://static.goodrain.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E7%BC%96%E6%8E%92.png)



