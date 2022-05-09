---
title: 与容器平台的区别
description: 本章描述Rainbond项目与其他容器管理平台的关键区别和共同点。
---

<!-- <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/images/WechatIMG110.jpeg" title="产品定位图例说明" /> -->

### 定位差异

Rainbond 在云原生应用级包装和抽象，使用者不用学习容器和 k8s 知识，不用了解服务器、网络、存储等底层基础设施。管理者可以在资源层面管理容器、k8s 和相关基础设施。并在应用之上实现场景化的应用交付流程（软件开发交付流程、企业 IT 管理流程、企业应用市场生态）。

其他容器平台主要是为了简化容器管理和扩展容器的功能，概念上体现容器和 k8s，使用者要要学习容器和 K8s，并在容器粒度实现场景化解决方案。

### 云原生

Rainbond 在云原生实践的思路与[Heroku](https://www.heroku.com/)类似，但在 To B 交付领域扩大了外延。

### 场景差异

Rainbond 根据不同人群有不同的管理界面，面向开发、测试和应用运维有应用管理的控制台，面向系统运维有命令行工具和资源管理后台，面向应用交付人员和最终用户有应用市场。

其他容器平台通常在统一的管理界面管理容器和基础设施，主要面向人群是运维。

### 跟 k8s 差异

Kubernetes 是 Rainbond 底层一个技术组件，使用 Rainbond 不需要学习容器和 k8s，Rainbond 兼容容器和 K8s 的标准, Rainbond 运行在 k8s 上，k8s 负责所有应用的运行和调度。

参考 [技术架构](/docs/quick-start/architecture/)
