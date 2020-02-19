---
title: Rainbond组件运维
date: 2020-02-18T15:42:54+08:00
draft: false
weight: 1005
description: Rainbond组件运维
hidden: true
---

本章主要讲述Rainbond系统组件的常见运维方式，以帮助用户更快速，高效的运维Rainbond。


### 集群信息

查看当前集群的所有节点信息

```bash
kubectl get nodes 
```

查看当前集群资源使用信息

```bash
kubectl top nodes
```

### 组件信息

Rainbond所有组件都位于`rbd-system`同一名称空间下

- 查看Rainbond所有组件的pod信息

```bash
kubectl get pod -n rbd-system
```

- 查看rainbond所有组件的pod信息，并且查看都在哪些节点上运行
 
```bash
kubectl get pods -o wide -n rbd-system
```

### 查看组件详细信息

这里以`rbd-api`组件为例,查看详细信息

```bash
kubectl describe pod -l name=rbd-api   -n rbd-system
```


### 日志查看

`rbd-chaos`组件提供应用构建服务，提供源码，Docker镜像等方式创建应用，在构建应用异常失败时可查看该组件日志进行分析

- 实时查看日志

```bash
kubectl logs -fl name=rbd-chaos -n rbd-system
```

选项解释:

 -f, --follow  持续输出日志     
 -l, --label  标签
    

- 查看最近20行日志
 
```bash
kubectl logs --tail=20 -l name=rbd-chaos  -n rbd-system
```

- 查看容器组 nginx 过去1个小时的日志
 
```bash
kubectl logs --since=1h -l name=rbd-chaos  -n rbd-system
```

要查看其他组件日志，只需将name后的组件名称替换为想要查看日志的组件即可

`rbd-app-ui`组件的日志持久化目录为`/opt/rainbond/logs/rbd-app-ui`，查看`goodrain.log`即可以看到相关日志信息。

kubelet服务以二进制方式运行，执行命令 `service kubelet status` 可查看 kubelet 的运行状态，使用`journalctl -fu kubelet`命令直接查询kubelet日志即可。

### 调整组件配置

这里以`rbd-api`组件为例，修改其他组件配置时将名称替换即可

```bash
kubectl edit rbdcomponent rbd-api -n rbd-system
```

配置修改完成之后，保存退出，pod将自动重启更新配置

如果未自动重启请手动删除pod

```bash
kubectl delete pod <podName> -n rbd-system
```

关于更多组件配置介绍请查看 [平台组件架构](/docs/user-operations/op-guide/component-description/)


### 在pod中的容器环境内执行shell命令

以`rbd-gateway`组件为例，进入pod查看nginx配置

```bash
# 首先查看gateway组件的PodName
root@ubuntu:~# kubectl get pods -l name=rbd-gateway -n rbd-system
NAME                READY   STATUS    RESTARTS   AGE
rbd-gateway-bcjjg   1/1     Running   4          2d4h
# 进入pod
kubectl exec -it rbd-gateway-bcjjg -n rbd-system bash
# 在pod内部执行shell命令查看nginx配置
bash-5.0#  cat /run/nginx/conf/nginx.conf
```

### 查看PVC

```bash
root@ubuntu:~# kubectl get pvc -A
NAMESPACE    NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
rbd-system   cache     Bound    pvc-a78e2c32-2fa0-4869-82e7-59a0a9c2689b   1Mi        RWX            rbd-nfs        2d4h
rbd-system   grdata    Bound    pvc-63476356-df1f-4057-80c2-897741887b96   1Mi        RWX            rbd-nfs        2d4h
rbd-system   hubdata   Bound    pvc-b0ec90e1-2201-44d1-891b-f2e10127d7cc   1Mi        RWX            rbd-nfs        2d4h
```

### 更换镜像

```bash
kubectl set image ds rbd-api  rbd-api=goodrain.me/rbd-api:V5.2.0-beta1 -n rbd-system
```