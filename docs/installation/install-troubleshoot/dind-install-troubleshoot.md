---
title: '单机体验版本安装问题排查指南'
weight: 201
description: 'troubleshot'
---

安装单机体验版本 Rainbond 时如果出现问题，那么你可以根据当前的文档进行问题排查。

## 问题表现

单机体验版本 Rainbond 的安装时间大约控制在 8 分钟左右，如果安装的实际时长远超这个时间，那么你可以开始考虑主动观测安装进程。

区别于正常的容器日志输出，当单机体验版本 Rainbond 的安装没有正常完成时，终端输出会长时间处于以下状态：

```
正在加载数据，预计3分钟，时间取决于磁盘性能...
正在启动Rainbond，预计5分钟...
```

## 排查思路

单机体验版本 Rainbond 将运行所需的所有服务和组件都以容器或 POD 的形式运行于名为 rainbond-allinone 的容器之中，这借助了一项名为 dind (Docker In Docker) 的技术，所有的问题排查操作都将在 rainbond-allinone 容器环境中进行。

在整个安装过程中，会按照以下顺序依次执行一些任务：

1. 启动 supervisord 进程管理器
2. 启动容器内 dockerd 服务
3. 启动容器内 k3s 服务
4. 启动 Rainbond 各组件

整个排查的过程，也将围绕这些任务的执行情况开展。

开始排查之前，启动新的终端，执行以下命令，进入 rainbond-allinone 容器环境中：

```bash
docker exec -ti rainbond-allinone bash
```

## 启动supervisord阶段

supervisord 是一款简洁而健壮的进程管理器，单机体验版本 Rainbond 通过它统一管理所有的服务。

supervisord 并不容易出错，如果在之前的 `docker run ...` 启动过程中，并没有在终端输出中发现明显的 error 级别日志输出，那么说明它工作正常，可以跳过当前排查步骤。

## 启动dockerd阶段

rainbond-allinone 容器中会启动一个以后台进程方式运行的 dockerd 服务，后续会通过它启动和管理一系列的容器。

在终端中执行以下命令，来确定 dockerd 是否正常启动。

```bash
docker info
```

如若正确返回当前 dockerd 服务的详细信息，则说明 dockerd 服务运行正常，可以跳过当前排查步骤。

如若返回以下信息，则说明 dockerd 启动失败，根据 dockerd 日志深入排查。

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

### dockerd日志

dockerd 服务的启动日志位于文件 `/app/logs/dind.log` 中，查询日志内容，关注 error 级别日志输出。以下列举一些可能的情形及解决方案。

### dockerd常见问题列表

在日志 `/app/logs/dind.log` 中，可能会发现以下 error 级别的日志输出。

- failed to start daemon: Error initializing network controller: error obtaining controller instance: failed to create NAT chain DOCKER: iptables failed: iptables -t nat -N DOCKER: iptables v1.6.0: can't initialize iptables table `nat': Table does not exist (do you need to insmod?)

:::info
dockerd 的运行依赖于 iptables 内核模块，在一些特定的操作系统中，可能并没有加载 iptables 内核模块（可能使用nftables）。尝试在宿主机中执行 `modprobe ip_tables` 来加载这个模块。
:::

- failed to start daemon: pid file found, ensure docker is not running or delete /var/run/docker.pid

:::info
这种情况的出现意味着上一次容器未能正常关闭，手动删除 /var/run/docker.pid 文件后，重启 rainbond-allinone 容器。
:::info


## 启动k3s阶段

rainbond-allinone 容器中会启动一个以后台进程方式运行的 k3s 服务，作为容器内部的编排工具。

在终端中输入以下命令，来确定 k3s 是否正常启动。

```bash
kubectl get node
```

如若返回当前的 k3s 节点列表，并且处于 Ready 状态，则说明 k3s 工作正常，可以跳过当前排查步骤。

```
NAME   STATUS   ROLES                  AGE   VERSION
node   Ready    control-plane,master   14m   v1.22.3+k3s1
```

如若没有正常返回，则说明 k3s 启动失败，根据 k3s 日志深入排查。

### k3s日志

k3s 服务的启动日志位于文件 `/app/logs/k3s.log` 中，查询日志内容，关注 error 级别日志输出。以下列举一些可能的情形及解决方案。

### k3s常见问题列表

在日志 `/app/logs/k3s.log` 中，可能会发现以下 error 级别的日志输出。

（time=\"2022-03-07T09:52:49+08:00\" level=fatal msg=\"unable to select an IP from default routes.\"\ntime=\"2022-03-07T09:52:53+08:00\" level=fatal msg=\"unable to select an IP from default routes.\""}）

:::info
此问题一般是没有默认路由（到 Internet），因此 Kubernetes 无法确定要使用哪个 IP，要解决此问题请设置默认路线，或使用非无驱动程序,通过配置 k3s 启动参数可能会帮助您解决问题 --extra-config=apiserver.advertise-address=127.0.0.1
:::

- unable to create proxier: unable to create ipv4 proxier: can't set sysctl net/ipv4/conf/all/route_localnet to 1: open /proc/sys/net/ipv4/conf/all/route_localnet: read-only file system

:::info
确认你的 `docker run ...` 启动命令中，是否省略了参数 `--privileged` 或者 `-v ~/rainbonddata:/app/data`。如果你自定义了 k3s 的数据持久化目录，也应加入对应的持久化挂载路径设置。
:::

- Failed to create cgroup" err="cannot enter cgroupv2 \"/sys/fs/cgroup/kubepods\" with domain controllers -- it is in an invalid state

:::info
在早些版本的 rainbond-allinone 中，尚未支持 cgroupv2。而 cgroupv2 在高于 4.2.0 版本的 Docker Desktop 中被应用，这导致了冲突。所以请降级 Docker Desktop 到 4.2.0 版本及以下。或使用最新版本的单机体验版本的 Rainbond。
:::

- level=info msg="Set sysctl 'net/netfilter/nf_conntrack_max' to 196608
- level=error msg="Failed to set sysctl: open /proc/sys/net/netfilter/nf_conntrack_max: permission denied

:::info
遭遇以上问题时，可以在主机中修改对应的参数为日志中的相同值，在 linux 操作系统中，执行 `sysctl -w net/netfilter/nf_conntrack_max=196608` ;
如果上述操作没有能够解决问题，或者在非 linux 操作系统中遭遇这个问题，可以在 `docker run ...` 启动命令中添加环境变量 `-e K3S_ARGS="--kube-proxy-arg=conntrack-max-per-core=0"`。
:::

- /usr/lib/libbz2.so.1.0.8: no space left on device

:::info
主机中的磁盘空间不足，增加磁盘空间或删除不必要的文件释放空间；对于 Docker Desktop 用户而言，可以参考 [Disk utilization](https://docs.docker.com/desktop/mac/space/) 学习变更磁盘空间限额。
:::


## 启动Rainbond阶段

rainbond-allinone 容器中会在 rbd-system 命名空间下启动一系列 pod，这些 pod 组合为 Rainbond 提供各种功能支持。在终端命令行中执行以下命令获取这些 pod 的信息。

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

当以上的某些 pod 并非处于 Running 状态时，就需要根据其当前状态进行排查。异常的状态可能包含：Pending 、CrashLoopBackOff 、Evicted 等

- Pending 

:::info
Pending 状态意味着当前 pod 没有能够正常进入启动流程，pod 可能被启动之前所需要执行的任务阻塞，所以处于待定（Pending）状态。要了解 pod (以 rbd-etcd-0 为例)的启动为何遭遇阻塞，可以执行命令 `kubectl describe pod rbd-etcd-0 -n rbd-system` ，观察最后的 events 部分输出内容来确定 pod 当前事件。并根据提示深入排查。
:::

- CrashLoopBackOff

:::info
CrashLoopBackOff 状态意味着当前 pod 已经可以正常启动，但是其内部的容器自行退出，这通常是因为内部的服务出了问题。要了解 pod (以 rbd-etcd-0 为例)的启动为何失败，可以执行命令 `kubectl logs -f rbd-etcd-0 -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。
:::

- Evicted

:::info
Evicted 状态意味着当前 pod 遭到了调度系统的驱逐，触发驱逐的原因可能包括根分区磁盘占用率过高、容器运行时数据分区磁盘占用率过高等，根据经验，上述原因最为常见，需要进行磁盘空间清理解除驱逐状态。可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。
:::
### 启动 Rainbond 时常见问题
查看 pod 详细信息可能会遇到以下问题
- {"type":"Warning","reason":"FailedScheduling","message":"0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/disk-pressure: }, that the pod didn't tolerate.","from":"","age":"0s"}]}]}

:::info
以上报错可以通过几点进行分析，第一：确认一下当前节点是否开启了允许调度，一般 master节点时不被允许调度，所以会出现此报错，第二：docker 以及基础环境没有分配足够的资源时，你也可以得到这种“污点”类型的消息。 例如，在 Docker Desktop for Mac 中，在首选项中分配更多内存/cpu/swap，以及其他的资源，它可能会解决您的问题。
:::
## 问题报告

当前的安装问题排查文档也许并没有能够指引你完成安装问题的故障排除，欢迎到 Rainbond 的官方仓库 https://github.com/goodrain/rainbond/issues 搜索其他人的问题经历，或者提交自己的安装问题，会有工程师跟进问题的解决。
