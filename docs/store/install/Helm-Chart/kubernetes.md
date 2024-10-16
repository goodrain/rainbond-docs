---
title: 通过 Helm 命令行安装到 k8s 集群
description: 本章描述 云原生应用市场 通过 Helm 命令行安装到 k8s 集群。
---

本章主要介绍如何把云原生应用市场的 Helm 应用通过命令行的方式部署到集群中。

## 准备工作

- 拥有可用的 Kubernetes 集群。
- 安装有 Helm 客户端 3.0 或更高的版本。
- 用户对 Kubernetes 及 Helm 相关概念及如何使用有基本了解，如有不了解可以去 [Kubernetes](https://kubernetes.io/)、[Helm](https://helm.sh/) 官网安装了解。


## 操作流程

操作流程分为以下三点： `添加 Helm 仓库->更新仓库->安装 Chart`。 

通过云原生应用市场去浏览你要安装的 Helm 类型应用，在应用列表页支持根据类型筛选，同时在每个应用的右上角都展示出当前应用对应的类型图标，选择想要安装的应用进入详情页去通过应用介绍去了解当前应用。

### 选择应用版本

如果想要安装当前应用的话，先选择一个合适的版本，然后再点击安装按钮，点击完之后会弹出一个三条命令行。

- 添加 Helm 仓库，如果您已经添加过该仓库，可直接忽略此命令。
```
helm repo add appstore https://charts.grapps.cn
```

- 更新仓库，刚添加的仓库，可直接忽略此命令。
```
helm repo update appstore
```

- 安装 Chart 命令，你还可以直接在命令行中使用--set参数来覆盖默认值。
```
helm install chart_name appstore/chart_name  --version []
```

复制完直接去终端执行即可。

### 配置参数
可根据应用下方的介绍来配置需要的参数，如果没有配置则是默认的参数。