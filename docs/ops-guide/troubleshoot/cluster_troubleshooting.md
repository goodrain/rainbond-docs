---
title: Rainbond集群问题诊断
description: 主要介绍 Rainbond 集群出现的问题及其排查思路
weight: 2000
---

本文适用于排查 Rainbond 集群问题，这是一些 Rainbond 集群运行出现的问题，而非用户自己部署业务的问题。根据场景不同，我们将 Rainbond 集群的问题分为两类：

- [控制台问题](#控制台问题)。即使用 Rainbond 时，自右上角弹出一些警告，或者一些超出预期的展示。这类问题的解决方法我们将使用穷举法加以列举。

- [集群端问题](#集群端问题排查)。Rainbond 以 Pod 的形式部署运行在用户的 Kubernetes 集群中，这些位于 `rbd-system` 命名空间中的 Pod 如果出现问题，我们会给出具体解决问题的思路与途径。集群端问题的本质是 Pod 运行于 Kubernetes 集群中可能发生的问题。

### 控制台问题

:::info
在控制台页面中进行操作时，右上角弹出警告提示框，或者其他未预期的展示的情况下，参考以下内容排查问题。
:::

#### 排查思路

控制台页面由 `rbd-app-ui` 服务提供，当出现问题时，优先检查其日志，根据日志排查问题。

控制台日志地址：

- 对于 allinone 类型的控制台而言：进入 rainbond-allinone 容器，控制台日志位于 `/app/logs/goodrain.log`

- 基于 Helm 安装部署的情况下，进入 `rbd-system` 命名空间下的 `rbd-app-ui` pod 中，控制台日志位于 `/app/logs/goodrain.log`

- 对于将[控制台迁移](/docs/installation/install-with-ui/console-recover)至集群中的情况，进入 console 组件的 Web 终端，控制台日志位于 `/app/logs/goodrain.log`

#### 常见问题

:::warning
右上角警告中出现如下字样时：

- 集群端异常
- 服务开小差了
  :::

这一类问题说明控制台自身出了问题，根据 [排查思路](#排查思路) 查询并分析 `goodrain.log` 日志文件进而解决问题。

:::warning
右上角警告中出现如下字样时：

- 数据中心操作故障，请稍后重试
  :::

这一类问题意味着控制台与集群端之间借口交互有问题，打开浏览器调试页面，重新触发问题，并查看问题接口的返回。获取详细信息后提交 issue 与官方交互获取解决方案。

### 集群端问题排查

:::info
当明确发现运行于 Kubernetes 集群中的 Rainbond Pod 处于异常状态时，参考以下内容排查问题。
:::

#### 排查思路

Rainbond 集群应该运行于一个健康的 Kubernetes 集群中，故而首先应该确认 Kubernetes 集群中的所有节点都处于健康状态。如确认无误，则进一步查看 `rbd-system` 命名空间下的 Pod 状态，后续根据状态解决问题。

#### 操作步骤

在进行组件故障排查之前，请首先确认你的集群是 Rainbond 组件出现了问题，而不是 Kubernetes 本身出现了问题。

- 集群有故障时，首先要做的是查看集群中的节点是否处于 ready 状态：

```bash
$ kubectl get nodes
NAME            STATUS   ROLES    AGE    VERSION
192.168.2.146   Ready    master   4d2h   v1.17.2
```

- 对于有问题的节点，查看节点上的详细信息及事件：

```bash
kubectl describe node <node name>
```

在确认 Kubernetes 集群状态健康之后，可以开始排查 Rainbond 集群各 Pod 的状态。

- 查看 Rainbond 所有组件状态，Rainbond 的所有组件都位于 `rbd-system` 名称空间下

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

#### 常见 Pod 异常状态

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

驱逐状态，多见于资源不足时导致的 Pod 被驱逐，一般情况下是由于系统内存或磁盘资源不足，可 `df -Th` 查看 docker 数据目录 的资源使用情况，如果百分比大于 85%，就要及时清理下资源，尤其是一些大文件、docker 镜像。

使用如下命令可以清除状态为 Evicted 的 pod：

```bash
kubectl get pods | grep Evicted | awk '{print $1}' | xargs kubectl delete pod
```

- FailedMount

挂载卷失败，需要关注所有的宿主机节点是否安装了指定的文件系统客户端。例如在默认情况下，Rainbond 会自行安装 nfs 作为集群共享存储，可能会在 Events 中见到如下报错：`Unable to attach or mount volumes: unmount volmes=[grdata access region-api-ssl rainbond-operator-token-xxxx]: timed out waiting for the condition`。这通常是因为宿主机没有安装 `nfs-client` 或 `nfs-common` 等 nfs 客户端软件包。

#### 常见集群端问题

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案

获取 [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/), 我们会尽快联系你
