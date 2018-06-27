---
title: 平台部署结构
summary: 平台服务及部署结构
toc: false
---

Rainbond是一套完整的PaaS，包含了众多的服务组件，按功能可分为不同的集群。当部署一个节点时，所有组件都安装在该节点上，该节点承载了所有的集群角色。单节点只用作全功能demo演示，并不具备高可用、高性能等生产级别的需求。

单节点rainbond可以通过自动化安装脚本来扩容集群，详情清参见：[集群部署原理](cluster-management/deployment-principle.html)，本文主要介绍rainbond的逻辑与物理部署结构和集群打角色及功能，下图为逻辑部署结构：

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/deploy-logic.png" width="100%" />