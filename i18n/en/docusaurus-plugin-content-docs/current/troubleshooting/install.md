---
title: 安装故障
descrition: 说明 Rainbond 在各种环境下的安装过程中的故障排查方案
keywords:
  - Rainbond 安装问题排查
  - Rainbond 基于 Kubernetes 安装故障排查
  - Rainbond 基于主机安装故障排查
  - Rainbond 快速安装故障排查
---

Rainbond 在各种环境下的安装过程中，可能会遇到各种问题，本章节将会对 Rainbond 安装过程中的常见问题进行排查。

## 1. 快速安装故障排查

```mermaid
flowchart LR
    A[启动Docker容器] --> B[启动 K3s]
    B --> C[启动 Rainbond]
    C --> D[完成]
```

**Rainbond 快速安装版本**是将所有的服务都运行在一个容器中，方便用户快速使用。在 [Docker 容器中运行 K3s](https://docs.k3s.io/advanced#running-k3s-in-docker)，所有的故障排查操作都在 `rainbond` 容器中进行。

### 排查思路

容器启动过程都由 K3s 控制。在排查过程中，我们可以通过以下几个步骤来排查问题：

1. 查看 `rainbond` 容器的启动日志，查看是否有错误信息。
2. 查看 `rainbond` 容器中的 `k3s` 服务是否正常启动。
3. 查看 `rainbond` 容器中的 `rainbond` 所有服务是否正常启动。

#### 启动 K3s 阶段

首先需要查看 `rainbond` 容器的启动日志，查看是否有错误信息。

```bash
docker logs -f rainbond
```

执行以下命令，进入 `rainbond` 容器，查看 `rainbond` 容器中的 `k3s` 服务是否正常启动。

```bash
docker exec -it rainbond bash
```

执行以下命令，查看 `k3s` 服务是否正常启动。

```bash
kubectl get node
```

#### 启动 Rainbond 阶段

执行以下命令，查看 `rainbond` 容器中的 `rainbond` 所有服务是否正常启动。

```bash
kubectl get pod -n rbd-system
```

#### 可能遇到的问题

Rainbond 快速安装版本默认会将数据存储 `/opt/rainbond` 目录中，如果磁盘空间不足，可能会导致 Rainbond 无法正常启动。

1. 基于 Mac、Windows 安装无法更改为本地目录，请通过 Docker Desktop 扩容存储空间。
2. 基于 Linux 安装可以通过修改 `install.sh` 安装脚本中的 `volume` 字段，修改默认的本地目录，如下：

```bash
$ vim install.sh

VOLUME_OPTS="-v /opt/rainbond:/opt/rainbond"
```

3. 删除 `rainbond` 容器，然后重新执行 `install.sh` 脚本即可。

```bash
docker rm -f rainbond

bash ./install.sh
```

## 2. 基于 Kubernetes 安装故障排查

Pod 处于Pending 、CrashLoopBackOff 、Evicted 、ImagePullBackOff等状态

- **Pending:** 当 Pod 处于 Pending 状态时，代表其没有进入正常的启动流程，通过命令 `kubectl describe pod xxx -n rbd-system` 观察事件详情，来进一步进行排查。

- **CrashLoopBackOff:** CrashLoopBackOff 状态意味着当前 Pod 已经可以正常启动，但是其内部的容器自行退出，这通常是因为内部的服务出了问题。通过命令 `kubectl logs -f xxx -n rbd-system` ，观察日志的输出，通过业务日志来确定问题原因。

- **Evicted:** Evicted 状态意味着当前 Pod 遭到了调度系统的驱逐，触发驱逐的原因可能包括根分区磁盘占用率过高、容器运行时数据分区磁盘占用率过高等，根据经验，上述原因最为常见，需要进行磁盘空间清理解除驱逐状态。可以通过执行命令 `kubectl describe node` ，观察返回中的 `Conditions` 段落输出来确定当前节点的状态。

- **ImagePullBackOff:** ImagePullBackOff 状态意味着 Pod 镜像下载失败退出，通常是因为镜像过大或者网络差引起的，通过命令 `kubectl describe pod xxx -n rbd-system` 观察事件详情，进一步进行排查。