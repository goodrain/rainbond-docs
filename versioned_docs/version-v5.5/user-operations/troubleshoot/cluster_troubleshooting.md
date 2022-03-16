---
title: 集群问题诊断
description: 主要介绍 Rainbond 集群出现的问题及其排查思路
weight: 2000
---

本文主要介绍 Rainbond 集群出现的问题及其排查思路，在排查集群问题时，首先需要确定问题的根源是 Rainbond 集群本身出现问题，而不是应用程序本身的问题。

### 节点问题排查

- 集群有故障时，首先要做的是查看集群中的节点是否处于ready状态：

```bash
$ kubectl get nodes 
NAME            STATUS   ROLES    AGE    VERSION
192.168.2.146   Ready    master   4d2h   v1.17.2
```

- 对于有问题的节点，查看节点上的详细信息及事件：

```bash
kubectl describe node <node name>
```

### 组件故障排查

在进行组件故障排查之前，请首先确认你的集群是 Rainbond 组件出现了问题，而不是 Kubernetes 本身出现了问题。

- 查看 Rainbond 所有组件状态，Rainbond的所有组件都位于 `rbd-system` 名称空间下

```bash
$ kubectl get pods -n rbd-system

NAME                              READY   STATUS      RESTARTS   AGE
mysql-operator-7c858d698d-g6xvt   1/1     Running     0          3d2h
nfs-provisioner-0                 1/1     Running     0          4d2h
rainbond-operator-0               2/2     Running     0          3d23h
rbd-api-7db9df75bc-dbjn4          1/1     Running     1          4d2h
rbd-app-ui-75c5f47d87-p5spp       1/1     Running     0          3d5h
rbd-app-ui-migrations-6crbs       0/1     Completed   0          4d2h
rbd-chaos-nrlpl                   1/1     Running     0          3d22h
rbd-db-0                          2/2     Running     0          4d2h
rbd-etcd-0                        1/1     Running     0          4d2h
rbd-eventlog-8bd8b988-ntt6p       1/1     Running     0          4d2h
rbd-gateway-4z9x8                 1/1     Running     0          4d2h
rbd-hub-5c4b478d5b-j7zrf          1/1     Running     0          4d2h
rbd-monitor-0                     1/1     Running     0          4d2h
rbd-mq-57b4fc595b-ljsbf           1/1     Running     0          4d2h
rbd-node-tpxjj                    1/1     Running     0          4d2h
rbd-repo-0                        1/1     Running     0          4d2h
rbd-webcli-5755745bbb-kmg5t       1/1     Running     0          4d2h
rbd-worker-68c6c97ddb-p68tx       1/1     Running     3          4d2h
```

- 如果有 Pod 状态是非 Running 状态，则需要查看 Pod 日志，通过 Pod 日志基本可以定位到问题本身。

例：

查看组件日志

```bash
kubectl logs -f  <pod name>  -n rbd-system
```

关于 Rainbond 组件详情请阅读 [平台组件架构](../op-guide/component-description)

### 常见 Pod 异常状态

- Pending

这个状态通常表示 Pod 还没有调度到某个 Node 上面，可以通过以下命令查看到当前 Pod 事件，进而判断为什么没有调度。


```bash
kubectl describe pod <pod name>  -n  rbd-system
```

查看 Events 字段内容，分析原因。

- Waiting 或 ContainerCreating

这个状态通常表示 Pod 处于等待状态或创建状态，如果长时间处于这种状态，通过以下命令查看当前 Pod 的事件。

```bash
 kubectl describe pod <pod name>  -n  rbd-system
```

查看 Events 字段内容，分析原因。

- imagePullBackOff 

这个状态通常表示镜像拉取失败了，使用以下命令查看是什么镜像拉取失败了，然后在本地查看是否有该镜像。

```bash
kubectl describe pod <pod name>  -n  rbd-system
```
查看 Events 字段内容，查看镜像名字。

在本地查看镜像是否存在

```bash
docker images | grep <image name>
```

- CrashLoopBackOff

CrashLoopBackOff 状态说明容器曾经启动了，但又异常退出了；一般情况下都是应用本身的问题，此时应该先查看一下容器的日志。

```bash
kubectl logs --previous <pod name> -n  rbd-system
```

- Evicted

驱逐状态，多见于资源不足时导致的 Pod 被驱逐，一般情况下是由于系统内存或磁盘资源不足，可 `df -Th` 查看 docker数据目录 的资源使用情况，如果百分比大于85%，就要及时清理下资源，尤其是一些大文件、docker镜像。

使用如下命令可以清除状态为Evicted的pod：

```bash
kubectl get pods | grep Evicted | awk '{print $1}' | xargs kubectl delete pod
```

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案