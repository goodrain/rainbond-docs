---
title: 在腾讯云 TKE 上安装
description: 本文介绍如何在腾讯云 TKE 上安装 Rainbond，并为新手用户提供详细操作指引和常见问题解答。
keywords:
- TKE
- Rainbond
- 腾讯云 TKE
---

# 在腾讯云 TKE 上安装 Rainbond

本文将手把手教你如何在 [腾讯云 TKE](https://cloud.tencent.com/product/tke)（Tencent Kubernetes Engine）集群上安装 Rainbond。无论你是第一次接触 Kubernetes，还是 Rainbond 新用户，都能顺利完成安装。

:::tip
**场景说明**：
- 如果你已经有 Rainbond 平台，想再对接一个 TKE 集群，请在平台管理 → 集群管理 → 添加集群 → 选择 TKE 集群，然后按照下文步骤操作。
- 如果你是第一次安装 Rainbond，也可以直接参考本指南。
:::

## 一、准备工作

### 1. 什么是 TKE？
腾讯云 TKE（Tencent Kubernetes Engine）是腾讯云提供的高度可扩展、高性能的容器管理服务，帮助你轻松在云上运行和管理容器化应用。

### 2. 创建 TKE 集群
1. 登录 [腾讯云容器服务控制台](https://console.cloud.tencent.com/tke2/cluster)。
2. 点击新建集群，按需选择节点配置、网络、地域等。

### 3. 安装必要工具
在任意 TKE 节点上，安装：
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)（Kubernetes 命令行工具）
- [Helm](https://helm.sh/docs/intro/install/)（Kubernetes 包管理工具）

> 建议提前配置好 kubectl 连接到你的 TKE 集群。

### 4. 可选资源准备

#### 4.1 CLB 负载均衡（推荐）
- 购买腾讯云 [CLB](https://cloud.tencent.com/product/clb)（Cloud Load Balancer）实例。
- 用于代理 Rainbond 网关流量，提升高可用性。
- 添加必要端口：`80`、`443`、`6060`、`7070`、`8443`。

#### 4.2 TencentDB for MySQL（可选）
- Rainbond 默认自带 MySQL，如需高可用或数据持久化，建议购买腾讯云 [TencentDB for MySQL](https://cloud.tencent.com/product/cdb_mysql)。
- 要求：MySQL 8.0+，需创建 `console` 和 `region` 两个数据库。

#### 4.3 TCR 镜像仓库（可选）
- Rainbond 默认自带 `goodrain.me` 私有镜像仓库。
- 如需更快拉取镜像，建议购买腾讯云 [TCR](https://cloud.tencent.com/product/tcr)（Tencent Container Registry）镜像仓库。

## 二、安装 Rainbond

### 1. 添加 Rainbond Helm 仓库

```bash
helm repo add rainbond https://chart.rainbond.com
helm repo update
```

### 2. 准备 values.yaml 配置文件

编辑 [values.yaml](../../installation/install-with-helm/vaules-config.md) 文件，填写以下关键信息：

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: <你的CLB IP> # CLB 负载均衡的 IP，或网关节点的外网 IP

  # 绑定节点为 Rainbond 网关节点
  nodesForGateway:
  - externalIP: <TKE节点外网IP>
    internalIP: <TKE节点内网IP>
    name: <TKE节点名称>
  # 绑定节点为 Rainbond 构建节点
  nodesForChaos:
  - name: <TKE节点名称>

  # 使用 TCR 镜像仓库（如有）
  imageHub:
    enable: true
    domain: <你的TCR域名>
    namespace: <你的命名空间>
    username: <你的用户名>
    password: <你的密码>

  # 使用 TencentDB for MySQL 数据库（如有）
  regionDatabase:
    enable: true
    host: <你的DB地址>
    port: 3306
    name: region
    username: <你的用户名>
    password: <你的密码>

  uiDatabase:
    enable: true
    host: <你的DB地址>
    port: 3306
    name: console
    username: <你的用户名>
    password: <你的密码>
```

> **说明：**
> - gatewayIngressIPs：Rainbond 网关对外访问的 IP，建议填写 CLB 的公网 IP。
> - nodesForGateway：指定哪个节点作为网关节点。
> - nodesForChaos：指定哪个节点作为构建节点。
> - imageHub/regionDatabase/uiDatabase：如不使用外部服务，可不填写。

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

## 三、常见问题与排查

### 1. Pod 长时间 Pending 或 CrashLoopBackOff？
- 检查节点资源是否充足（CPU/内存）。
- 检查 values.yaml 配置是否正确，尤其是 IP、节点名称。
- 查看 Pod 详细日志：
  ```bash
  kubectl describe pod <pod-name> -n rbd-system
  kubectl logs <pod-name> -n rbd-system
  ```

### 2. 无法访问 Rainbond 网页？
- 检查 CLB 或节点安全组端口是否已放通。
- 检查 gatewayIngressIPs 是否填写正确。
- 检查 rbd-gateway Pod 是否 Running。

### 3. 镜像拉取失败？
- 检查 imageHub 配置是否正确。
- 检查 TCR 仓库是否授权 TKE 集群访问。

### 4. 数据库连接失败？
- 检查 TencentDB 的网络和账号权限。
- 检查 regionDatabase/uiDatabase 配置。

## 四、下一步

Rainbond 安装完成后，你可以参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
