---
title: '基于 Kubernetes 安装'
weight: 202
description: 'troubleshot'
---

在 Kubernetes 上通过 helm 安装时如果出现问题，那么你可以根据当前的文档进行问题排查。

## 常见问题列表

### 安装时报错 Error: failed pre-install: job failed: BackoffLimitExceeded

基础环境检测不通过，通过以下命令查询日志，可以得知问题原因，根据说明处理环境即可。

```bash
kubectl logs -f -l name=env-checker -n rbd-system
```
<details>
<summary>输出如下</summary>

```bash
INFO Nfs client ready on node node1
INFO 192.168.2.180:80 ready
INFO 192.168.2.180:443 ready
INFO 192.168.2.180:6060 ready
INFO 192.168.2.180:7070 ready
INFO 192.168.2.180:8443 ready
ERROR Nfs client must been installed on node node2!
ERROR Nfs 客户端在节点 node2 中没有被检测到, 请确定是否已在所有宿主机安装该软件包.
INFO For CentOS: yum install -y nfs-utils; For Ubuntu: apt install -y nfs-common
```

</details>

### Pod 只有几个，都是 Running 状态，但是无法访问

rbd-system 命名空间下跑起来了约四五个 Pod，而且都是 Running 状态，但是无法访问。

1. 首先确定是否存在 rbd-gateway 的 Pod，如果不存在，那么执行以下命令查看 rbd-gateway 的节点亲和性是否满足当前节点的要求。不满足，则说明你的网关节点配置有误或集群节点上无对应的标签。

```bash
kubectl get ds rbd-gateway -n rbd-system -oyaml
```

2. 如果有 rbd-gateway 的 Pod 且所有 Pod 均正常运行，那么通过查看自定义资源 rainbondcluster 的 `status.conditions` 字段查看报错信息，根据报错排查即可。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -oyaml
```

### 所有 Pod 全部正常运行，也指定了 gatewayIngressIPs，但仍无法访问平台

通常出现在多节点集群中，当你只指定了 gatewayIngressIPs，而没有指定网关节点时，Rainbond 会自动选择节点作为网关节点。此时你指定的gatewayIngressIPs 需要能将流量路由到 Rainbond 自动选择的网关节点上。否则将无法访问平台。你可以通过以下命令查看 Rainbond 自动选择的网关节点。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -oyaml
```

查看 nodesForGateway 字段，需要让填写的 gatewayIngressIPs 路由到 nodesForGateway 字段所对应的节点。或者在安装时手动在 values.yaml 中指定网关节点地址。

### Pod 处于Pending 、CrashLoopBackOff 、Evicted 、ImagePullBackOff等状态

#### Pending

当 Pod 处于 Pending 状态时，代表其没有进入正常的启动流程，可能是启动之前的任务有阻塞。要了解pod启动为何会受到阻塞，以 rbd-etcd-0 为例，可以执行命令 `kubectl describe pod rbd-etcd-0 -n rbd-system` 观察事件详情，来进一步进行排查。

#### CrashLoopBackOff

CrashLoopBackOff 状态意味着当前 Pod 已经可以正常启动，但是其内部的容器自行退出，这通常是因为内部的服务出了问题。要了解 Pod (以 rbd-etcd-0 为例)的启动为何失败，可以执行命令 `kubectl logs -f rbd-etcd-0 -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。

#### Evicted

Evicted 状态意味着当前 Pod 遭到了调度系统的驱逐，触发驱逐的原因可能包括根分区磁盘占用率过高、容器运行时数据分区磁盘占用率过高等，根据经验，上述原因最为常见，需要进行磁盘空间清理解除驱逐状态。可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。

#### ImagePullBackOff

ImagePullBackOff 状态意味着 Pod 镜像下载失败退出，通常是因为镜像过大，或者网络查引起的，以 rbd-etcd-0 为例，可以执行命令 `kubectl describe pod rbd-etcd-0 -n rbd-system` 观察事件详情，进一步进行排查。

### 部分 Pod 一直无法运行，报错 create etcd.v3 client failed, try time is 10,dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host

以此报错为例，可以看出时域名解析时，并没有找到主机IP，是因为 etcd 这个 Pod 处于 Pending 的状态，也就是启动之前就出现了问题，没有在 K8S 集群的 coreDNS 进行注册，通常通过查询 Pod 的详细信息，K8S集群的信息来进行排查。
