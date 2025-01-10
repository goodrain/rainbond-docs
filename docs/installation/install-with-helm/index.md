---
title: 基于 Kubernetes 安装
descrition: 该章节文档介绍基于已有的 k8s 集群，使用 helm 安装 Rainbond
keywords:
- 基于 Kubernetes 安装 Rainbond 集群
---

## 概述

本文将指引您在已有的 Kubernetes 集群中快速安装一套可用的 Rainbond 环境，支持自建集群、托管集群等。

## 前提

* 安装 [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
* 安装 [Helm CLI](https://helm.sh/docs/intro/install/)
* Containerd 容器运行时的 Kubernetes 1.24+ 集群
* `80 443 6060 7070 8443`端口可用

<details>
<summary>K3S 安装说明</summary>

通过创建 [registries.yaml](https://docs.k3s.io/installation/private-registry) 文件来配置使用默认的私有镜像仓库。

```yaml title="vim /etc/rancher/k3s/registries.yaml"
configs:
  "goodrain.me":
    auth:
      username: admin
      password: admin1234
    tls:
      insecure_skip_verify: true
```

在安装 [K3S](https://docs.k3s.io/installation) 时需禁用 `traefik` 和 `local-storage` 的安装，如下: 

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn \
INSTALL_K3S_EXEC="--disable traefik local-storage" \
sh -s - \
--system-default-registry "registry.cn-hangzhou.aliyuncs.com"
```

</details>

<details>
<summary>云托管 K8s 安装说明</summary>

使用阿里云的 ACK 集群安装 Rainbond，你需要购买: `ACK`、`SLB（可选）`、`RDS MySQL（可选）`、`ACR（可选）` 资源，继续按照下述步骤安装即可。其他云厂商的托管 Kubernetes 集群也是同理，购买相同资源即可，可选部分默认提供内置服务。

:::caution
购买托管集群时，请禁用默认的 Ingress 服务，这会与 Rainbond 网关冲突，导致无法访问。
:::

</details>

## 安装 Rainbond

1. 添加 Helm 仓库。

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
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
  # if you use RKE2 or K3S, you can use the following parameter
  # containerdRuntimePath: /var/run/k3s/containerd
```

3. 执行安装命令。

```bash
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system -f values.yaml
```

4. 执行完安装命令后，在集群中执行以下命令查看安装状态。

```bash
watch kubectl get pod -n rbd-system
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

7. 如您采用默认的镜像仓库，则需要修改 Containerd 的配置，配置 [goodrain.me 私有镜像仓库](../../faq/index.md#%E5%90%AF%E5%8A%A8%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96%E9%95%9C%E5%83%8F-x509-certificate-signed-by-unknown-authority)。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
