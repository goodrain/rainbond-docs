---
title: 'Web界面安装问题排查指南'
weight: 203
description: 'troubleshot'
---

当用户在 Web 界面中从主机开始安装 Rainbond 时，所遭遇的问题可以依靠当前文档的内容进行排查与解决。

从主机安装的过程中，根据页面的指引，经历以下各个阶段完成 Rainbond 的安装：

- [安装 Kubernetes 集群](#kubernetes-集群安装异常情况分析)，该过程通过图形化界面的定义，安装了一套完整的 Kubernetes 集群。在安装过程中可能触发图形化界面的报错提示，也需要在安装完成后，手动安装[kubectl命令行工具](/docs/ops-guide/tools/kubectl)，确认当前集群可用。

- [安装 Rainbond 集群](#rainbond-集群初始化异常情况分析)，该过程基于上个步骤安装好的 Kubernetes 集群继续安装 Rainbond 各组件。安装的过程中，可以参考日志来确定未预期的异常情况。
## Kubernetes 集群安装异常情况分析

### Web 页面中的提示

在较新版本的安装过程中，安装配置 Kubernetes 集群的过程中的日志查询入口，点击查看日志详情进而排查问题。

#### 常见问题

:::warning
报错信息提示:
Cluster must have at least one etcd plane host

<img src="https://static.goodrain.com/docs/5.3/operator/error.png" title="install" width="100%" />
:::

这种情况一般是你配置的节点 IP 地址或 SSH 端口不正确或端口有防火墙策略，导致控制台无法连接指定的节点。重新配置正确的节点 IP 地址和 SSH 端口，或开启 SSH 端口的防火墙策略。

另一种可能的情况，是安装 Rainbond 所使用的宿主机节点中， 目录 `/home/docker/.ssh` 的属主和属组不是 docker 用户，执行以下命令改正后重试：

```bash
chown docker:docker /home/docker/.ssh
```

---

:::warning
报错信息提示:
rejected: administratively prohibited
:::

这种情况说明宿主机服务器的 sshd 服务配置有限制，编辑所欧宿主机的 `/etc/ssh/sshd_config` 文件，确定存在以下配置：


```bash
AllowTcpForwarding yes
```

修改完成后重启 sshd 服务：

```bash
systemctl restart sshd
```

---

### 确认 Kubernetes 健康

Kubernetes 集群在图形化界面的安装过程完成后，未必代表该集群一定可用。请通过以下方法确定其健康情况。

:::info
通过以下命令，确定 Kubernetes 集群中的节点是否都处于健康状态
:::

```bash
kubectl get node 
```

如果某个节点处于 `NotReady` 状态，通过以下命令在对应节点查询 `kubelet` 日志，根据日志输出解决节点问题：

```bash
docker logs -f kubelet
```

:::info
通过以下命令确定 `kube-system` 命名空间中的 `flannel` 以及 `coredns` 工作是否正常。
:::

```bash
kubectl get po -n kube-system 
```

期待的结果是：

```bash
NAME                                  READY   STATUS      RESTARTS   AGE
coredns-8644d6bd8c-s2888              1/1     Running     5          30d
coredns-autoscaler-74cd6f74d9-dc4vm   1/1     Running     5          30d
kube-flannel-75nfv                    2/2     Running     14         30d
rke-coredns-addon-deploy-job-kk7kq    0/1     Completed   0          30d
rke-network-plugin-deploy-job-xb9bw   0/1     Completed   0          30d
```

如果发现 `kube-flannel` 以及 `coredns`对应的 pod 处于其他状态，则需要查询日志加以解决：

```bash
# 查询 coredns 日志
kubectl logs -f coredns-8644d6bd8c-s2888 -n kube-system
# 查询 kube-flannel 日志
kubectl logs -f kube-flannel-75nfv -n kube-system -c kube-flannel
```

常见的问题可能包括：

:::warning
coredns 日志提示：

[FATAL] plugin/loop: Loop (127.0.0.1:58477 -> :53) detected for zone ".", see https://coredns.io/plugins/loop#troubleshooting. 
:::

该问题说明 `coredns` 遭遇了循环解析问题，导致其无法正常工作。关注下 `Kubernetes` 中的各节点 `/etc/resolv.conf` 文件中定义的 nameserver 是否是 127.0.0.1 127.0.1.1 这种本地回环地址。coredns 默认引用这个文件内容作为上游 dns 服务器，写上述地址的话，会引起循环解析，这可能导致服务器崩溃。

解决的方案：
1. 直接修改 /etc/resolv.conf ，令其 nameserver 后接一个可用的 dns 服务器地址（当心这个文件可能会被某些莫名其妙的文件维护，重写你自定义的值）
2. 直接修改 coredns 的 configmap，定义 forward . 114.114.114.114 来替换 "/etc/resolv.conf" 。

---

:::warning
flannel 日志提示：

Failed to find any valid interface to use: failed to get default interface: Unable to find default route
:::

该报错意味着 `flannel` 所在的主机节点没有默认路由，导致 `flannel` 无法正常工作。这种情况常见于离线环境。解决的方式是为操作系统添加默认路由。

---

:::warning
内核版本过高或过低：

特指内核版本低于 3.10.0-514 或者高于 5.16
:::

操作系统内核版本低于 3.10.0-514 将导致无法受到 docker overlay2 存储引擎的支持。

版本高于 5.16 的某些内核会导致容器无法被创建。
 
推荐参考 [升级内核版本](https://t.goodrain.com/t/topic/1305) 安装 kernel-lt 分支的长期支持版内核。

---
## Rainbond 集群初始化异常情况分析

Rainbond 集群初始化控制过程如下：

- 通过 KubeAPI 连接 Kubernetes 集群
- 安装 rainbond 各组件
- 创建 CR 资源
- 等待 rainbond-operator 完成集群初始化。

### Web 页面中的提示

在对接的过程中，可以点击 `查看组件` 观察安装进度，如遭遇问题，会在页面中有所提示。

<img src="https://static.goodrain.com/docs/5.6/operator/operator-1.png" title="operator" width="60%" />


#### 常见问题

:::warning
rainbond-operator 报错：

open /run/flannel/subnet.env: no such file or directory

<img src="https://static.goodrain.com/docs/5.6/operator/operator-3.png" title="operator" width="100%" />
:::

该问题意味着 flannel 未能正常工作，参考上一章节了解如何排查对应日志并加以解决。另外一种可能性，是使用了 `rainbond:v5.7.0-dind-allinone` 这种内置了 `k3s` 集群的前提下，又基于该主机安装，这会导致两个集群之间的 Kubernetes 组件冲突。

---

### 日志查询

图形化界面中的操作过于黑盒，当用户遭遇未预期的问题时，需要能够找到对应的日志进行排查。这个过程所涉及到的日志包括：

#### 控制台日志

- 对于 allinone 类型的控制台而言：进入 rainbond-allinone 容器，控制台日志位于 `/app/logs/goodrain.log` 

- 基于 Helm 安装部署的情况下，进入 `rbd-system` 命名空间下的 `rbd-app-ui` pod 中，控制台日志位于 `/app/logs/goodrain.log` 

- 对于将[控制台迁移](/docs/installation/install-with-ui/console-recover)至集群中的情况，进入 console 组件的 Web终端，控制台日志位于 `/app/logs/goodrain.log` 

#### 集群安装控制器日志

- 对于 allinone 类型的控制台而言：进入 rainbond-allinone 容器，集群安装控制器日志位于 `/app/logs/cloudadaptor.log` 

- 基于 Helm 安装部署的情况下，进入 `rbd-system` 命名空间下的 `rbd-app-ui` pod 中，集群安装控制器日志位于 `/app/logs/cloudadaptor.log` 

- 对于将[控制台迁移](/docs/installation/install-with-ui/console-recover)至集群中的情况，进入 console 组件的 Web终端，集群安装控制器日志位于 `/app/logs/cloudadaptor.log` 

### 集群端问题排查

在安装 Rainbond 的过程中，了解 `rbd-system` 命名空间下所有 pod 的状态也是很有必要的。

在确认 Kubernetes 集群状态健康之后，可以开始排查 Rainbond 集群各 Pod 的状态。

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

驱逐状态，多见于资源不足时导致的 Pod 被驱逐，一般情况下是由于系统内存或磁盘资源不足，可 `df -Th` 查看 docker数据目录 的资源使用情况，如果百分比大于85%，就要及时清理下资源，尤其是一些大文件、docker镜像。

使用如下命令可以清除状态为Evicted的pod：

```bash
kubectl get pods | grep Evicted | awk '{print $1}' | xargs kubectl delete pod
```

- FailedMount

挂载卷失败，需要关注所有的宿主机节点是否安装了指定的文件系统客户端。例如在默认情况下，Rainbond 会自行安装 nfs 作为集群共享存储，可能会在 Events 中见到如下报错：`Unable to attach or mount volumes: unmount volmes=[grdata access region-api-ssl rainbond-operator-token-xxxx]: timed out waiting for the condition`。这通常是因为宿主机没有安装 `nfs-client` 或 `nfs-common` 等 nfs 客户端软件包。

### 我的问题没有被涵盖

如果你在阅读了这篇文档后，对于如何让你的集群正常工作依然一筹莫展，你可以：

移步 [GitHub](https://github.com/goodrain/rainbond/issues) 查询是否有相关的 issue ，如没有则提交 issues

前往 [社区](https://t.goodrain.com/) 搜索你的问题，寻找相似问题的答案