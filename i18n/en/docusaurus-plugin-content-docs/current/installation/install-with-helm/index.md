---
title: 基于 Kubernetes 安装
descrition: This section document describes the existing k8s cluster, installing Rainbond with helm
keywords:
  - Install Rainbond cluster based on Kubernetes
---

## 概述

本文将指引您在已有的 Kubernetes 集群中快速安装一套可用的 Rainbond 环境，支持自建集群、托管集群等。

## 前提条件

- Kubernetes 1.24+
- [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm CLI](https://helm.sh/docs/intro/install/)
- `80 443 6060 7070 8443`端口可用

## 安装 Rainbond

1. 添加 Helm 仓库。

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system
```

2. 编辑 [values.yaml](./vaules-config.md) 文件，填写必须配置。

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: 172.20.251.93 #集群入口IP

  nodesForGateway:
  - externalIP: 172.20.251.93     #k8s节点外网IP
    internalIP: 172.20.251.93     #k8s节点内网IP
    name: 172.20.251.93           #k8s节点名称
# - More nodes for gateway
  nodesForChaos:
  - name: 172.20.251.93           #k8s节点名称
# - More nodes for chaos
  containerdRuntimePath: /var/run/containerd  #containerd.sock文件路径
```

3. 执行安装命令。

```bash
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system -f values.yaml
```

4. 执行完安装命令后，在集群中执行以下命令查看安装状态。

```bash
watch kubectl get po -n rbd-system
```

5. 当名称包含 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。如下所示，Pod `rbd-app-ui-5577b8ff88-fpnnv` 为 Running 状态时，表示 Rainbond 安装成功。

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

6. 使用 `gatewayIngressIPs` 配置的 IP 地址访问 Rainbond，例如: `http://172.20.251.93:7070`。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
