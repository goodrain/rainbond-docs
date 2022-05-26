---
title: 'helm 安装问题排查指南'
weight: 202
description: 'troubleshot'
---

#### helm 安装问题排查指南

通过helm安装 Rainbond 时如果出现问题，那么你可以根据当前的文档进行问题排查。

#### 问题表现

通过helm安装rainbond的时间控制在8分钟左右，如果安装的实际时长远超这个时间，那么你可以开始考虑主动观测安装进程。

当长时间没有安装成功，且没有明显报错，查看pod状态一般会处于卡住状态

```
$ kubectl get po -n rbd-system

NAME                                READY   STATUS    RESTARTS   AGE
nfs-provisioner-0                   1/1     Running   0          2m14s
rainbond-operator-5f9598747-w88rc   1/1     Running   0          2m33s
rbd-etcd-0                          0/1     Pending   0          113s
rbd-hub-64777d89d8-rvs45            1/1     Running   0          108s
rbd-node-7gsgl                      0/1     Running   0          113s
```

#### 排查思路

通过helm安装rainbond，整个的安装过程可以细化分为几个任务，知道整个安装的过程以后，出现问题也将围绕这些任务的执行情况进行开展。

1. helm install 会首先进行基础环境检测，如环境不符合要求，安装过程会自动退出并报错。
2. 继而安装 rainbond 控制器，也就是 rainbond-operator。
3. 控制器启动成功以后，rainbond的组件会在 operator 的控制下，进行逐步安装。
4. rainbond组件的安装通常是有顺序依赖的，pod 启动时会先向数据库进行连接，或者查看存储是否准备完毕，所以当单个组件出现不是 Running 时，首先可以查看 rbd-etcd , nfs-provisioner , rbd-db 等pod日志。
5. 最终，通过访问命令行界面提示的 `IP:7070` 地址，访问控制台则证明安装成功

#### 环境检测阶段

如果在执行 `helm install` 命令后，返回如下报错，则说明环境检测失败：

```bash
Error: failed pre-install: job failed: BackoffLimitExceeded
```

通过以下命令查询日志，可以得知问题原因：

```bash
kubectl logs -f -l name=env-checker -n rbd-system

# 可能的输出如下：
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

红色的 ERROR 部分说明有问题的节点以及对应的原因，根据说明处理环境即可。

#### 启动组件阶段

首先在安装的过程中，可以通过以下命令查看组件pod的状态，来进行判断是否正常。

````
kubectl get po -n rbd-system
````

1. pod状态为Pending，或者长时间Running但是并没有达到READY时，可以通过以下命令查看pod的详细信息。

```
kubectl describe po pod_name -n rbd-system
```

2. 当通过查看pod详细信息，但是无法确定原因时，也可通过查看operator日志进行排错。

```
kubectl logs -f rainbond-operator -n rbd-system
```

#### 常见问题

- level=error msg="create etcd.v3 client failed, try time is 10,dial tcp: lookup rbd-etcd on 10.43.0.10:53: no such host

>以此报错为例，可以看出时域名解析时，并没有找到主机IP，是因为 etcd 这个 pod 处于pending 的状态，也就是启动之前就出现了问题，没有在 K8S 集群的 coredns 进行注册，通常通过查询 pod 的详细信息，K8S集群的信息来进行排查。

#### 启动成功的Pod状态

```
root@helm:~# kubectl get po -n rbd-system

NAME                                         READY   STATUS      RESTARTS   AGE
dashboard-metrics-scraper-7db45b8bb4-zrrf7   1/1     Running     0          5h44m
kubernetes-dashboard-fbd4fb949-l6jzg         1/1     Running     0          5h44m
nfs-provisioner-0                            1/1     Running     0          5h46m
rainbond-operator-8676899b76-87cbv           1/1     Running     0          5h46m
rbd-api-64d86d5b84-nhzfr                     1/1     Running     0          5h43m
rbd-app-ui-5cd9f457fc-6cst6                  1/1     Running     0          5h40m
rbd-app-ui-migrations--1-rwd2q               0/1     Completed   0          5h43m
rbd-chaos-v7sbb                              1/1     Running     0          5h43m
rbd-db-0                                     2/2     Running     0          5h44m
rbd-etcd-0                                   1/1     Running     0          5h45m
rbd-eventlog-0                               1/1     Running     0          5h43m
rbd-gateway-mvxdh                            1/1     Running     0          5h45m
rbd-hub-64777d89d8-k4ld4                     1/1     Running     0          5h45m
rbd-monitor-0                                1/1     Running     0          5h44m
rbd-mq-c95cf9857-br9sq                       1/1     Running     0          5h44m
rbd-node-s8tfx                               1/1     Running     0          5h45m
rbd-resource-proxy-67879f484-fhztx           1/1     Running     0          5h44m
rbd-webcli-6d64c66cb7-vhz44                  1/1     Running     0          5h44m
rbd-worker-8485f9ff56-hnnwt                  1/1     Running     0          5h43m
```

当以上的某些 pod 并非处于 Running 状态时，就需要根据其当前状态进行排查。异常的状态可能包含：Pending 、CrashLoopBackOff 、Evicted 、ImagePullBackOff等.

- Pending

>当组件处于pending状态时，代表其没有进入正常的启动流程，可能是启动之前的任务有阻塞，所以一直处于pending状态。要了解pod启动为何会受到阻塞，以 rbd-etcd-0 为例，可以执行命令``` kubectl describe pod rbd-etcd-0 -n rbd-system``` 观察时间详情，来进一步进行排查。

- CrashLoopBackOff

>CrashLoopBackOff 状态意味着当前 pod 已经可以正常启动，但是其内部的容器自行退出，这通常是因为内部的服务出了问题。要了解 pod (以 rbd-etcd-0 为例)的启动为何失败，可以执行命令 `kubectl logs -f rbd-etcd-0 -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。

- Evicted

>Evicted 状态意味着当前 pod 遭到了调度系统的驱逐，触发驱逐的原因可能包括根分区磁盘占用率过高、容器运行时数据分区磁盘占用率过高等，根据经验，上述原因最为常见，需要进行磁盘空间清理解除驱逐状态。可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。

- ImagePullBackOff

>ImagePullBackOff 状态意味着 pod 镜像下载失败退出，通常是因为镜像过大，或者网络查引起的，以 rbd-etcd-0 为例，可以执行命令``` kubectl describe pod rbd-etcd-0 -n rbd-system``` 观察时间详情，来进一步进行排查。



#### 问题报告

当前的安装问题排查文档也许并没有能够指引你完成安装问题的故障排除，欢迎到 Rainbond 的官方仓库 https://github.com/goodrain/rainbond/issues 搜索其他人的问题经历，或者提交自己的安装问题，会有工程师跟进问题的解决。