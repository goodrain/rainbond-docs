---
title: 在 K3s 上安装
description: 本文介绍如何在 K3s 上安装 Rainbond，并为新手用户提供详细操作指引和常见问题解答。
keywords:
- K3s
- Rainbond
- 轻量级 Kubernetes
---

# 在 K3s 上安装 Rainbond

本文将手把手教你如何在 [K3s](https://k3s.io/)（一个轻量级的 Kubernetes 发行版）上安装 Rainbond。

## 一、准备工作

### 1. 什么是 K3s？
K3s 是一个轻量级、完全兼容的 Kubernetes 发行版，专为边缘计算、物联网等资源受限环境设计。它打包为一个小于 100MB 的二进制文件，易于安装和管理。

### 2. 环境要求
- 建议使用一个全新的、干净的操作系统。
- 操作系统：Ubuntu 20.04 / CentOS 7+
- 硬件：2核 CPU / 4GB 内存 / 40GB 磁盘以上
- 确保端口 `80, 443, 6060, 7070, 8443` 未被占用。
- 安装 [Helm CLI](https://helm.sh/docs/intro/install/)。

---

## 二、安装 K3s

### 1. 创建 K3s 配置文件

K3s 允许通过配置文件来自定义其行为。我们需要禁用一些内置组件，以避免与 Rainbond 冲突。

```bash
# 创建目录
mkdir -p /etc/rancher/k3s

# 创建 K3s 配置文件，禁用 traefik 和 local-storage
cat <<EOF > /etc/rancher/k3s/config.yaml
disable:
  - traefik
  - local-storage
system-default-registry: registry.cn-hangzhou.aliyuncs.com
EOF
```

> **说明：**
> - `traefik`: K3s 内置的 Ingress Controller，需要禁用以避免与 Rainbond 网关冲突。
> - `local-storage`: K3s 内置的 Local Path Provisioner，需要禁用以使用 Rainbond 的默认存储。
> - `system-default-registry`: 使用国内镜像加速器，提升 K3s 自身组件的拉取速度。

创建私有镜像仓库配置文件，配置 Rainbond 默认内置的私有镜像仓库。

```bash
cat <<EOF > /etc/rancher/k3s/registries.yaml
configs:
  "goodrain.me":
    auth:
      username: admin
      password: admin1234
    tls:
      insecure_skip_verify: true
EOF
```

### 2. 执行 K3s 安装脚本

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -s -
```

### 3. 配置 Kubeconfig

将 K3s 生成的 Kubeconfig 文件复制到默认路径，以便 `kubectl` 和 `helm` 命令可以直接使用。

```bash
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

---

## 三、安装 Rainbond

### 1. 添加 Rainbond Helm 仓库

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
```

### 2. 准备 values.yaml 配置文件

编辑 [values.yaml](../../installation/install-with-helm/vaules-config.md) 文件，填写以下关键信息：

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: <你的节点IP> # K3s 节点的 IP 地址

  # 绑定节点为 Rainbond 网关节点
  nodesForGateway:
  - externalIP: <K3s节点外网IP>
    internalIP: <K3s节点内网IP>
    name: <K3s节点名称>
  # 绑定节点为 Rainbond 构建节点
  nodesForChaos:
  - name: <K3s节点名称>
  
  # K3s containerd.sock 目录路径
  containerdRuntimePath: /run/k3s/containerd
```

> **说明：**
> - `gatewayIngressIPs`: Rainbond 的访问入口 IP，请填写你的 K3s 节点的 IP 地址。
> - `nodesForGateway / nodesForChaos`: 指定哪个节点用于网关和构建服务。单节点场景下，填写该节点信息即可。
> - `containerdRuntimePath`: **必须配置**。K3s 的 containerd socket 文件路径与默认不同，需要显式指定为 `/run/k3s/containerd/containerd.sock`。

### 3. 安装 Rainbond

```bash
helm install rainbond rainbond/rainbond --create-namespace -n rbd-system -f values.yaml
```

### 4. 查看安装状态

```bash
watch kubectl get pod -n rbd-system
```

等待所有 Pod 状态为 Running，尤其是 `rbd-app-ui` 相关 Pod。

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

### 5. 访问 Rainbond

使用 `gatewayIngressIPs` 配置的 IP 地址访问 Rainbond：

```
http://<gatewayIngressIPs>:7070
```

---

## 四、常见问题与排查

### 1. Pod 长时间 Pending 或 CrashLoopBackOff？
- 检查节点资源是否充足（CPU/内存）。
- 检查 `values.yaml` 配置是否正确，特别是 `containerdRuntimePath`。
- 查看 Pod 详细日志：
  ```bash
  kubectl describe pod <pod-name> -n rbd-system
  kubectl logs <pod-name> -n rbd-system
  ```

### 2. 无法访问 Rainbond 网页？
- 检查服务器防火墙是否已放通 `80, 443, 6060, 7070, 8443` 端口。
- 检查 `gatewayIngressIPs` 是否填写正确。
- 检查 `rbd-gateway` Pod 是否 Running。

---

## 五、下一步

Rainbond 安装完成后，你可以参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
