---
title: Rainbond组件运维
date: 2020-02-18T15:42:54+08:00
draft: false
weight: 1005
description: Rainbond组件运维
hidden: true
---

目前Rainbond系统组件生命周期由Kubernetes和Rainbond-Operator共同维护和管理。


### 集群信息

当集群可能有故障时，首先要做的是查看集群中的节点：

```bash
kubectl get nodes -o wide
```

查看所有节点是否都处于`Ready`状态，如果有个别节点处于不正常状态首先应该查看该节点的事件。

```bash
kubectl describe node NODE_NAME
```
如果还不能定位问题，就需要进一步到相关的机器上查询集群组件信息及相关日志了。

### 组件信息

Rainbond所有系统组件都位于`rbd-system`同一名称空间下。

- 查看Rainbond所有组件的pod信息

```
kubectl get pod -n rbd-system
```

- 查看rainbond所有组件的pod信息，并且查看都在哪些节点上运行
 
```
kubectl get pods -o wide -n rbd-system
```

### 查看组件详细信息

这里以`rbd-api`组件为例

首先查看`PODNAME`

```bash
root@ubuntu:~# kubectl get pod -n rbd-system|grep rbd-api
rbd-api-bk4xw                1/1     Running   1          31h
```

查看组件详细信息

```bash
kubectl describe pod rbd-api-bk4xw  -n rbd-system
```


### 日志查看

`rbd-chaos`组件提供应用构建服务，提供源码，Docker镜像等方式创建应用，在构建应用异常失败时可查看该组件日志进行分析

```bash
kubectl logs -f -l name=rbd-chaos -n rbd-system
```

要查看其他组件日志，只需将name后的组件名称替换为想要查看日志的组件即可

`rbd-app-ui`组件的日志持久化目录为`/opt/rainbond/logs/rbd-app-ui`，查看`goodrain.log`即可以看到相关日志信息。

kubelet服务以二进制方式运行，使用`journalctl -fu kubelet`命令直接查询即可。

### 调整组件配置

这里以`rbd-api`组件为例

```bash
kubectl edit rbdcomponent rbd-api -n rbd-system
```

配置修改完成之后，保存退出，即可自动更新配置。

关于更多组件配置介绍请查看 [平台组件架构](/docs/user-operations/op-guide/component-description/)


### 进入pod执行shell命令

以`rbd-gateway`组件为例，进入pod查看nginx配置

```bash
# 首先查看gateway组件的PodName
kubectl get pod -n rbd-system
# 进入pod
kubectl exec -it rbd-gateway-bcjjg -n rbd-system bash
# 在pod内部执行shell命令查看nginx配置
bash-5.0#  cat /run/nginx/conf/nginx.conf
```

