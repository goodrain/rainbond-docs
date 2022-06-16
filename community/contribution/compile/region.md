---
title: Rainbond集群端源码编译
description: Rainbond集群端源码编译
---

## Rainbond集群端源码编译

数据中心端是直接部署在 Kubernetes 集群上的，同时组件较多，因此你可以根据需要编译单个组件。

## 单组件编译

单组件编译在实际开发过程中⾮常重要，由于 Rainbond 系统的体系较为庞⼤，平时开发过程中通常是修改了某个组件后编译该组件，使⽤最新的组件镜像在已安装的开发测试环境中直接替换镜像。

单组件编译支持以下组件：

| 组件            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| chaos           | chaos 组件对应 Rainbond 应用构建服务，主要处理 CI 过程，将输入源包括 `源代码` 或 `Docker镜像` 或 `应用市场应用` 进行解析、编译、打包，最终生成 应用（组件）的版本介质。 |
| api             | api 组件对应 Rainbond 数据中心 API 服务，API 服务作为数据中心级抽象的核心控制服务，对外提供 Restful 风格的 API 服务，是数据中心控制请求的唯一入口。 |
| gateway         | gateway 组件对应 Rainbond 应用网关服务，应用网关是外部流量进入 Rainbond 租户内部组件的唯一入口, 提供 HTTP, HTTPs 路由, TCP/UDP 服务, 负载均衡器, 高级路由(A/B 测试, 灰度发布)，虚拟 IP 支持等功能。 |
| monitor         | monitor 组件对应 Rainbond 监控服务，Rainbond 基于 Prometheus 封装了 Monitor 组件，通过从 etcd、Kubernetes 集群中自动发现应用、集群、集群节点服务的各类监控对象并完成 Prometheus 监控目标配置，将监控目标纳入 Prometheus 监控范围。 |
| mq              | mq 组件对应 Rainbond 消息中间件服务，MQ 组件是基于 Etcd 实现的轻量级分布式、消息持久化和全局一致性的消息中间件。该组件维护异步任务消息，提供多主题的消息发布和订阅能力。 |
| webcli          | webcli 组件对应 Rainbond 应用 Web 终端控制服务，该组件实现了通过 web 的方式连接到容器控制台的功能。该组件通过与 UI 进行 WebSocket 通信，用户可以通过模拟 Web 终端发送各类 shell 命令，webcli 通过 kube-apiserver 提供的 exec 方式在容器中执行命令并返回结果到 Web 终端。 |
| worker          | worker 组件对应 Rainbond 应用运行时控制服务，应用运行时控制服务将 Rainbond-Application Model 进行实例化转化为 Kubernetes 资源模型，配属应用运行需要的各类资源，完成应用生命周期中的运行态部分，可以理解为 CD 控制服务，该服务的设计要点是支撑大量应用的生命周期监管。 |
| eventlog        | eventlog 组件对应 Rainbond 事件与日志处理服务，主要处理用户异步操作日志、应用构建日志和应用运行日志。 |
| mesh-data-panel | mesh-data-panel 组件处理组件间的依赖。                       |
| grctl           | grctl 组件提供命令行工具，用于查询集群内组件相关信息。       |
| node            | node 组件对应 Rainbond 集群、节点管理服务，Node 组件是 Rainbond 集群组建的基础服务，集群内所有节点都需要运行该组件。提供节点信息采集、集群服务维护、应用日志收集、应用运行时支持等关键能力。 |


## 编译⽅式如下：

(1) 克隆项目

```bash
git clone https://github.com/goodrain/rainbond.git
```

(2) 以 chaos 组件为例，在 rainbond 代码主目录下执行

```bash
./release.sh chaos
```

## 完整安装包打包编译

编译完整安装包适⽤于改动了较多源代码后,重新⽣成安装包。在 rainbond 代码主⽬录下执⾏

```
./release.sh all
```

## 运行数据中心端镜像

由于数据中心端部署在 Kubernetes 集群上，因此你需要满足以下前提条件，才能将编译好的组件镜像运行起来。

### 前提条件

1. 已经安装好 Rainbond 的测试环境
2. Kubectl 命令，可参考[该文档](/docs/ops-guide/tools/kubectl/)安装

### 运行镜像

Rainbond 数据中心端的组件，都是由 rbdcomponent 这个 CRD 资源进行定义的。因此当你编译好某个组件的镜像，需要运行时，则需要修改 rbdcomponent 这个资源。

仍然以 chaos 组件为例。假设你编译好的 chaos 镜像名为

```Bash
rainbond/rbd-chaos:v5.5.0-release
```

那么你需要依次执行以下操作，替换你集群中的组件镜像。

(1) 编辑对应的 rbdcomponent 文件

```Bash
kubectl edit rbdcomponent rbd-chaos -n rbd-system
```

(2) 找到镜像地址一栏，修改为你的镜像，如

```Bash
image: rainbond/rbd-chaos:v5.5.0-release
imagePolicy: IfNotPresent
```

(3) 保存退出，此时执行以下命令，应该可以看到对应组件正在更新。等待 pod 更新完毕即可。

```Bash
kubectl get po -n rbd-system
```
