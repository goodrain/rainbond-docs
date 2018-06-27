---
title: 应用拓扑与编排
summary: 应用拓扑与编排
toc: false
toc_not_nested: true
asciicast: true
---

众所周知，Kubernetes 是一个容器编排平台，它有非常丰富的原始的 API 来支持容器编排，但是对于用户来说更加关心的是一个应用的编排，包含多容器和服务的组合，管理它们之间的依赖关系，以及如何管理存储。我们平台使用Kubernetes对应用进行编排，并由拓扑图直观的了解到各应用到运行状态，依赖关系，网络连接等信息。



点击应用组，点击`拓扑图`就可以查看到本组应用中的各应用的运行状态，已各应用之间的依赖连接关系，是否开启对外网络等信息。

<img src="https://static.goodrain.com/images/docs/3.6/topology/topology1.jpg" style="border:1px solid #eee;width:100%">



点击其中的某一个应用，可以查看该应用的详情信息。包括应用的状态，内存使用，实例数量，服务信息，依赖服务等信息。通过点击某一条信息，可以快速跳转到你想去的地方。

<img src="https://static.goodrain.com/images/docs/3.6/topology/topology2.jpg" style="border:1px solid #eee;width:100%">