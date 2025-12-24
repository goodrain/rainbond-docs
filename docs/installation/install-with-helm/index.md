---
title: 基于 Kubernetes 安装
descrition: 该章节文档介绍基于已有的 k8s 集群，使用 helm 安装 Rainbond
keywords:
- 基于 Kubernetes 安装 Rainbond 集群
- 在 K3s 集群上安装 Rainbond
- 在 ACK 集群上安装 Rainbond
- 在 CCE 集群上安装 Rainbond
- 在 TKE 集群上安装 Rainbond
- 在 RKE2 集群上安装 Rainbond
---

## 概述

本文将指引您在已有的 Kubernetes 集群中快速安装一套可用的 Rainbond 环境，支持自建集群、托管集群等。

:::tip 专属安装指南
我们为部分主流的 Kubernetes 服务和发行版提供了专属的、更详细的安装指南。如果你的环境是其中之一，强烈建议你参考对应的文档：

- [在阿里云 ACK 上安装](../../ops-guides/more-installation/ack.md)
- [在腾讯云 TKE 上安装](../../ops-guides/more-installation/tke.md)
- [在华为云 CCE 上安装](../../ops-guides/more-installation/cce.md)
- [在 K3s 上安装](../../ops-guides/more-installation/k3s.md)
:::

## 前提

* 安装 [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
* 安装 [Helm CLI](https://helm.sh/docs/intro/install/)
* Containerd 容器运行时的 Kubernetes 1.24+ 集群
* `80 443 6060 7070 8443`端口可用

## 安装 Rainbond

:::info
在安装之前，你可以通过此脚本 `curl -sfL https://get.rainbond.com/k8s-health-check.sh | bash` 检查你的 Kubernetes 集群。
:::

1. 添加 Helm 仓库。

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
```

2. 执行以下安装命令。如需指定自定义的[values.yaml](./vaules-config.md)文件，请使用 `-f` 参数。

```bash
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system 
```

> Rainbond 默认在 `/run/containerd`、`/var/run/k3s/containerd` 路径查找 `containerd.sock`。如使用其他路径，请在 `values.yaml` 中配置 `Cluster.containerdRuntimePath` 参数。

```bash
......
NOTES:
Please use the following command to view the installation progress:

kubectl get pod -n rbd-system

Enter http://172.16.0.145:7070 in your browser to access Rainbond
```

3. 执行安装命令后，使用上述 `kubectl` 命令查看安装进度。当所有 `Pod` 都处于 `1/1 Running` 状态且 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。

<details>
<summary>安装成功结果示例</summary>

```bash
NAME                                      READY   STATUS    RESTARTS   AGE
local-path-provisioner-78d88b6df5-wkr84   1/1     Running   0          5m37s
minio-0                                   1/1     Running   0          5m37s
rainbond-operator-59ff8bb988-nlqrt        1/1     Running   0          5m56s
rbd-api-5466bd748f-brqmv                  1/1     Running   0          5m15s
rbd-app-ui-5577b8ff88-fpnnv               1/1     Running   0          4m39s
rbd-chaos-6828h                           1/1     Running   0          5m12s
rbd-db-0                                  1/1     Running   0          5m35s
rbd-gateway-69bfb68f4d-7xd9n              2/2     Running   0          5m34s
rbd-hub-8457697d4c-fqwgn                  1/1     Running   0          5m28s
rbd-monitor-0                             1/1     Running   0          5m27s
rbd-mq-5b6f94b695-gmdnn                   1/1     Running   0          5m25s
rbd-worker-7db9f9cccc-s9wml               1/1     Running   0          5m22s
```

</details>

4. 通过终端打印的地址访问 Rainbond 控制台，如上例中的 `http://172.16.0.145:7070`。

:::warning 注意
默认使用 goodrain.me 镜像仓库，需要自行修改 [Containerd 私有镜像仓库](../troubleshooting/common#启动无法获取镜像-x509-certificate-signed-by-unknown-authority)配置。
:::

## 下一步

- 跟随[快速入门](../../quick-start/getting-started.md)教程，部署你的第一个应用
- 阅读[使用教程](../../tutorial/via-rainbond-deploy-sourceandmiddleware.md)，学习和了解更多 Rainbond 功能

### 其他文档

- [故障排查文档](../../troubleshooting/install.md)
- [常见问题](../../faq/index.md)