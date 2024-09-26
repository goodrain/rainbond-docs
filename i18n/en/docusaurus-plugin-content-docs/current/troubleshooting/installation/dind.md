---
title: Stand-alone experience version
description: Single-machine experience version installation troubleshooting
keywords:
  - 单机体验版本, 安装问题排查
  - allinone，安装问题排查
---

通过快速安装脚本安装的 Rainbond 是属于**单机体验版本**，如果在安装时出现问题，请根据当前的文档进行排查问题。

## 启动流程

![dind-process](https://static.goodrain.com/docs/5.12/troubleshooting/installation/dind-process.png)

**Rainbond 单机体验版本** 是将所有的服务都运行在一个容器中，方便用户快速使用，采用了 dind (Docker in Docker) 的技术，所有的排查操作都在 `rainbond-allione` 这个容器环境中进行。

在整个安装过程中，会按照以下顺序依次启动服务：

1. 启动 Containerd 服务，由 **Supervisord** 控制启动。
   - 日志路径：`/app/logs/containerd.log`
2. Load 容器镜像包。
3. 启动 K3s 服务，由 **Supervisord** 控制启动。
   - 日志路径：`/app/logs/k3s.log`
4. 启动 Rainbodn Region。
   - 运行在 K3s 之上，以 POD 运行。
5. 启动 Rainbond Console，由 **Supervisord** 控制启动。

## 排查思路

整个排查的过程，也将围绕这些任务的执行情况开展。

开始排查之前，启动新的终端，执行以下命令，进入 `rainbond-allinone` 容器环境中：

```bash
docker exec -it rainbond-allinone bash
```

### 启动 Containerd 阶段

`rainbond-allinone` 容器中会启动一个以后台进程方式运行的 **Containerd** 服务，后续会通过它启动和管理一系列的容器。

如果 Containerd 启动失败，你将会在 `rainbond-allinone` 的启动日志中看到：

```bash
ERROR: Containerd failed to start. Please use the command to view the containerd log 'docker exec rainbond-allinone /bin/cat /app/logs/containerd.log'
```

根据日志中的命令，执行命令查看 Containerd 日志:

```bash
tail -f /app/logs/containerd.log
```

根据 Containerd 日志排查错误，结合 [Containerd 官方文档 ](https://containerd.io/)进行查询。

### Load 镜像阶段

在 Load 镜像阶段，使用 [nerdctl](https://github.com/containerd/nerdctl) 工具进行 `load`。

如果您遇到 Load 失败，该阶段会一直循环 Load。

#### Load 镜像常见问题

如果在 **Win、Mac** 上部署并使用 `-v local:/app/data` 将数据挂载到了本地，将会遇到 Load 失败的现象，这是因为本地的存储与 Docker 存储驱动不一致导致的。

:::tip

需要将存储修改为 Docker Volume 卷的方式挂载可解决问题。

:::

### 启动 K3s 阶段

`rainbond-allinone` 容器中会启动一个以后台进程方式运行的 **K3s** 服务，作为容器内部的编排工具。

如果 K3s 启动失败，你将会在 `rainbond-allinone` 的启动日志中看到：

```bash
ERROR: K3s failed to start. Please use the command to view the k3s log 'docker exec rainbond-allinone /bin/cat /app/logs/k3s.log
```

根据日志中的命令，执行命令查看 K3s 日志：

```bash
tail -f /app/logs/k3s.log
```

根据 K3s 日志排查错误。

#### k3s常见问题列表

```bash
Failed to create cgroup" err="cannot enter cgroupv2 \"/sys/fs/cgroup/kubepods\" with domain controllers -- it is in an invalid state
```

:::info
在早些版本的 rainbond-allinone 中，尚未支持 cgroupv2。而 cgroupv2 在高于 4.2.0 版本的 Docker Desktop 中被应用，这导致了冲突。所以请降级 Docker Desktop 到 4.2.0 版本及以下。或使用最新版本的单机体验版本的 Rainbond。
:::

```bash
level=info msg="Set sysctl 'net/netfilter/nf_conntrack_max' to 196608
level=error msg="Failed to set sysctl: open /proc/sys/net/netfilter/nf_conntrack_max: permission denied
```

:::info
遭遇以上问题时，可以在主机中修改对应的参数为日志中的相同值，在 linux 操作系统中，执行 `sysctl -w net/netfilter/nf_conntrack_max=196608` ;
如果上述操作没有能够解决问题，或者在非 linux 操作系统中遭遇这个问题，可以在 `docker run ...` 启动命令中添加环境变量 `-e K3S_ARGS="--kube-proxy-arg=conntrack-max-per-core=0"`。
:::

```bash
/usr/lib/libbz2.so.1.0.8: no space left on device
```

:::info
主机中的磁盘空间不足，增加磁盘空间或删除不必要的文件释放空间；对于 Docker Desktop 用户而言，可以参考 [Disk utilization](https://docs.docker.com/desktop/mac/space/) 学习变更磁盘空间限额。
:::

### 启动 Rainbond Region 阶段

`rainbond-allinone` 容器中会在 `rbd-system` 命名空间下启动 **Rainbond Region POD**。在终端命令行中执行以下命令获取这些 POD 的信息。

```bash
kubectl get pod -n rbd-system
```

通过观察 pod 的运行状态，预期的运行状态是 n/n Running

```bash
NAME                                         READY   STATUS    RESTARTS   AGE
rbd-etcd-0                                   1/1     Running   0          2d22h
rainbond-operator-5f785ff5f6-2dvq6           1/1     Running   0          2d22h
rbd-gateway-4ss6z                            1/1     Running   0          2d22h
rbd-hub-64777d89d8-vvjn5                     1/1     Running   0          2d22h
rbd-node-bsmnj                               1/1     Running   0          2d22h
rbd-webcli-8c6849dc6-8lx98                   1/1     Running   0          2d22h
rbd-mq-5fcfb64d86-w8bjl                      1/1     Running   0          2d22h
rbd-monitor-0                                1/1     Running   0          2d22h
kubernetes-dashboard-fbd4fb949-5lf88         1/1     Running   0          2d22h
dashboard-metrics-scraper-7db45b8bb4-mqbpm   1/1     Running   0          2d22h
rbd-resource-proxy-8654b98bc9-4rvnq          1/1     Running   0          2d22h
rbd-db-0                                     2/2     Running   0          2d22h
rbd-chaos-xn6zr                              1/1     Running   0          2d22h
rbd-worker-8664fb5d9-zcfw4                   1/1     Running   0          2d22h
rbd-eventlog-0                               1/1     Running   0          2d22h
rbd-api-6f6c565856-bq9bp                     1/1     Running   0          2d22h
```

当以上的某些 pod 并非处于 Running 状态时，就需要根据其当前状态进行排查。异常的状态可能包含：

- Pending
- CrashLoopBackOff
- Evicted

:::info
Pending 状态意味着当前 pod 没有能够正常进入启动流程，pod 可能被启动之前所需要执行的任务阻塞，所以处于待定（Pending）状态。要了解 pod (以 rbd-etcd-0 为例)的启动为何遭遇阻塞，可以执行命令 `kubectl describe pod rbd-etcd-0 -n rbd-system` ，观察最后的 events 部分输出内容来确定 pod 当前事件。并根据提示深入排查。
:::

:::info
CrashLoopBackOff 状态意味着当前 pod 已经可以正常启动，但是其内部的容器自行退出，这通常是因为内部的服务出了问题。要了解 pod (以 rbd-etcd-0 为例)的启动为何失败，可以执行命令 `kubectl logs -f rbd-etcd-0 -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。
:::

:::info
Evicted 状态意味着当前 pod 遭到了调度系统的驱逐，触发驱逐的原因可能包括根分区磁盘占用率过高、容器运行时数据分区磁盘占用率过高等，根据经验，上述原因最为常见，需要进行磁盘空间清理解除驱逐状态。可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。
:::

### 启动 Rainbond Console 阶段

`rainbond-allinone` 容器中会启动 Rainbond Console 服务，它是由 `Supervisord` 控制启动。

如果需要 Console 无法访问的情况，请排查以下日志分析问题：

```bash
/app/logs/console.log
/app/logs/console_error.log
```

## 修改挂载存储目录路径

Rainbond dind 单机体验版默认会将数据存储在两个目录内，容器内数据目录为 `/app/data` `/opt/rainbond`，而宿主机的目录分两种情况：

1. Linux 安装的单机体验版默认的本地数据目录是 `~/rainbonddata` `/opt/rainbond`。
2. Mac、Windows 安装的单机体验版存在 docker volume 中，可以通过 `docker volume ls` 命令查看，`rainbond-data` `rainbond-opt`。

基于 Mac、Windows 安装的单机体验版，无法更改为本地目录，如果因为存储空间满了导致平台无法功能，请通过 Docker Desktop 扩容存储空间。

基于 Linux 安装的单机体验版，可以通过修改 `install.sh` 安装脚本中的 volume 字段，修改默认的本地目录，如下：

:::tip
如果已经存在数据，需要将数据迁移到新的目录中。
:::

```bash
$ vim install.sh

VOLUME_OPTS="-v ~/.ssh:/root/.ssh -v <local_path>:/app/data -v <local_path>:/opt/rainbond"
```

删除 `rainbond-allinone` 容器，然后重新执行 `install.sh` 脚本即可。

```bash
docker rm -f rainbond-allinone

bash ./install.sh
```
