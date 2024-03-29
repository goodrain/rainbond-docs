---
title: 概述
description: 概述 Rainbond 虚拟机
keywords: 
- Rainbond
- 虚拟机
- kubevirt
---

随着云原生技术的迅速发展，容器化已经成为现代应用部署和管理的主流方式。然而，在现实业务场景中，依然存在着大量传统的虚拟机应用，这些应用因其自身特性或遗留系统的需要，难以直接迁移到容器环境。

Rainbond 作为云原生应用管理平台，就要解决应用无法容器化上云的需求，因此 Rainbond 支持了虚拟机组件部署，以容器方式运行虚拟机，为用户提供更灵活、更开放的部署选择，提供一个整合、统一的的云原生应用管理解决方案。

## KubeVirt 集成

Rainbond 通过集成 KubeVirt 来实现虚拟机组件的部署和管理，KubeVirt 是一个 Kubernetes 扩展，它允许在 Kubernetes 上运行虚拟机。KubeVirt 通过将虚拟机抽象为 Kubernetes 自定义资源，将虚拟机的生命周期管理与 Kubernetes 的生命周期管理相结合，从而实现了虚拟机的云原生管理。

## 虚拟机组件

虚拟机组件是 Rainbond 中的一种特殊的组件，它是通过 KubeVirt 创建的虚拟机，虚拟机组件的创建和管理与普通组件类似，但是虚拟机组件的运行时实例是虚拟机。

