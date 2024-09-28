---
title: Heterogeneous microservice orchestration
---

# 异构微服务编排的意义

Rainbond “信创”版本凭借“一云多芯”管理能力， 可以在同个集群中统一调度管理不同 CPU 架构的计算节点。应用中的服务组件也可以按照要求部署到指定的架构中去。但是只有不同架构的微服务组件之间可以相互编排、相互通信，那么它们才能够成为一个有机的整体，形成完整的业务系统。同时也满足信创应用从传统的 `X86_64` 向 `arm64` 国产化迁移的过渡期的特殊要求。

借助于服务网格（Service Mesh）亦或是 Kubernetes Service 的能力，Rainbond 天生支持跨架构微服务之间的编排与通信。使用方法与 Rainbond 一直以来的拖拉拽拼积木式的微服务编排方法无异。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E7%BC%96%E6%8E%92.png)
