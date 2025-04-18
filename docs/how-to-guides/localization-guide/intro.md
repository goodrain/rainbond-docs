---
title: 国产化信创概述
description: Rainbond 信创版本概述
keywords:
- 信创
- 多架构支持
- 国产化
- 国产化信创
---

专门针对国产化信创场景推出的 **Rainbond 信创**版本，全面降低应用系统向信创环境中迁移的技术成本，助力信创应用零成本迁移上云。Rainbond 长期深耕国产化 IT 生态，与多家国产 CPU 架构完成兼容性认证，能够在不同的架构下快速部署运行。信创应用、遗留业务系统可以提供源代码、软件包、容器镜像等方式零成本完成向国产化信创环境迁移上云。

同时，Rainbond 借助强大的多云管理能力，使得用户可以通过统一的控制台管理多个**异构集群、一云多芯**集群，充分利用不同云平台的资源，完成跨云调度、异构应用混合编排等复杂场景。

信创版本还进一步拓展了云原生应用商店的功能。信创应用可以被轻松地发布成为适用于不同架构的应用模板，在国产化信创环境中一键安装。开源应用商店也提供不同架构下可用的上百款开源软件，极大降低了面向国产化信创环境的软件交付成本。

## 概述

Rainbond 的国产化信创版本主要包括以下几个方面：

1. **多架构支持模型**：支持 x86_64、ARM64 等多种硬件架构
2. **多架构安装部署**：在不同硬件架构环境中的安装配置
3. **多架构应用部署**：如何部署和管理跨架构应用
4. **多架构应用编排**：针对不同架构的应用编排策略和最佳实践

通过这些功能，Rainbond 能够帮助企业实现真正的跨平台、跨架构应用管理，提高部署效率，降低运维成本。

## 多架构支持模型

Rainbond 的多架构支持基于容器镜像的多架构特性，通过统一的应用模型抽象，实现了应用在不同硬件架构间的无缝迁移和部署。

主要支持的架构包括：
- x86_64 (amd64)
- ARM64 (aarch64)
- 其他兼容架构

Rainbond 在应用部署时自动选择与目标环境匹配的架构镜像，确保应用在不同硬件平台上都能正常运行。

## 多架构安装部署

Rainbond 支持在多种硬件架构环境中的安装部署，包括标准的 x86_64 服务器和新兴的 ARM64 服务器。

在不同架构环境中安装 Rainbond 前，需确保：
- 操作系统与架构兼容（如 ARM64 架构需使用对应的系统版本）
- Docker/Containerd 等容器运行时支持目标架构
- 已规划好集群资源配置和网络环境

Rainbond 在不同架构环境中的安装方式基本一致，主要包括：
1. 单节点安装
2. 基于主机安装
3. 基于 Kubernetes 的安装

每种方式都有针对特定架构优化的参数设置和部署建议。

## 多架构应用部署

在 Rainbond 平台上部署多架构应用时，需注意以下几点：

1. **源码构建**：确保构建环境与目标运行环境架构一致
2. **镜像选择**：优先使用支持多架构的容器镜像
3. **依赖管理**：确保应用依赖的组件和库在目标架构上可用
4. **性能优化**：针对不同架构特点进行应用性能优化

Rainbond 提供了完整的多架构应用部署工作流，从构建、测试到发布，全程支持不同架构环境的特殊需求。

## 多架构应用编排

针对跨架构应用场景，Rainbond 提供了灵活的应用编排能力：

1. **架构感知调度**：基于节点架构标签自动调度应用组件
2. **多架构组件集成**：将不同架构的组件集成到统一的应用中
3. **跨架构服务发现**：实现不同架构节点间的服务互通
4. **统一的监控与管理**：对不同架构上运行的应用提供一致的监控和管理体验

通过这些功能，用户可以轻松构建和管理跨架构的复杂应用系统，充分利用混合架构环境的优势。

