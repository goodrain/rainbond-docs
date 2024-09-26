---
title: rainbond-operator
description: Parameter description of the rainbond-operator component
---

## 运行方式

运行于Kubernetes集群内部，POD运行

## 简要说明

:::tip

rainbond-operator 控制着 Rainbond 所有组件的配置与运行状态，持续的监控各个组件的状态，做出不同的动作，比如，rbd-db 的 pod 实例被删除或者参数修改了，operator立即会做出反馈。

:::

[rainbond-operator](https://github.com/goodrain/rainbond-operator) 是基于 [kubebuilder](https://book.kubebuilder.io/) 实现。

在安装集群端时，首先会安装 rainbond-operator，接下来会创建一些 CRD 资源，如下：

- rainbondclusters.rainbond.io
- rbdcomponents.rainbond.io

### rainbondclusters.rainbond.io

`rainbondclusters.rainbond.io` 是集群端的配置文件，例如设置网关节点、构建节点等。

在安装了集群后，我们可以通过此 CRD 资源来修改网关节点、构建节点、数据库连接信息等。

```yaml title="kubectl edit rainbondclusters.rainbond.io -n rbd-system"
spec:
  configCompleted: true
  enableHA: true # 开启高可用安装
  gatewayIngressIPs: # 网关对外IP
  - xxxx
  imageHub:
    domain: goodrain.me
    password: xxx
    username: admin  
  installVersion: v5.6.0-release # 集群安装版本
  nodesForChaos: # 构建节点
  - internalIP: 192.168.3.161
    name: 192.168.3.161
  - internalIP: 192.168.3.161
    name: 192.168.3.161
  nodesForGateway: # 网关节点
  - internalIP: 192.168.3.161
    name: 192.168.3.161
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  regionDatabase: # 集群端数据库
    host: xxx
    password: xxx
    port: 3306
    username: region
  suffixHTTPHost: xxx.grapps.cn # 平台泛域名
  uiDatabase: # 控制台数据库
    host: xxx
    password: xxx
    port: 3306
    username: console
  version: v5.2.2-release # 集群版本
```

### rbdcomponents.rainbond.io

`rbdcomponents.rainbond.io` 是控制台集群端所有 POD 的 CRD 资源，会创建出所有控制器以及POD，也可以在安装完成后修改对应组件的配置。

```shell
# 查询组件
kubectl get rbdcomponents.rainbond.io -n rbd-system

# 编辑 rbdcomponents 所有组件配置
kubectl edit rbdcomponents.rainbond.io -n rbd-system

# 编辑 rbdcomponents rbd-api 配置
kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system
```
