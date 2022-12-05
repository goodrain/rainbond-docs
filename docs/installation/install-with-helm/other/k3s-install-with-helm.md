---
title: '基于 K3s 安装'
description: '基于已有的 K3s 集群，使用 helm 从零开始安装 Rainbond'
---

## 安装前提

- 安装 [Helm](/docs/ops-guide/tools/#helm-cli) 3.0+
- 确保 `80、443、6060、7070、8443` 未被占用
- 确保服务器安装了 NFS 客户端
- K3s 的启动需要指定启动参数 `–-disable traefik`
- 安装 NFS 客户端
  ```bash
  yum -y install nfs-utils    # Cenots系统
  apt -y install nfs-common  # ubuntu系统
  ```

## 安装 K3s

:::caution
K3s 默认会安装 Traefik 这与 Rainbond 网关会冲突，在安装 K3s 时需添加 `--disable traefik` 禁用 Traefik 的安装。
:::

请参阅 [K3s 安装文档](https://docs.k3s.io/installation) 安装

```bash
k3s server --disable traefik
```

:::tip
Rainbond 支持 Containerd 和 Docker 作为容器运行时，如果 K3s 使用 Containerd 作为容器运行时，那么你需要执行：
```bash
ln -s /var/run/k3s/containerd/* /run/containerd/
```
该命令将 K3s 默认的 `containerd.sock` 路径软链接到 `/run/containerd`，因为 Rainbond 默认会在 `/run/containerd` 目录下挂载 `containerd.sock`
:::
## 安装 Rainbond

添加 Helm Chart 仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

创建 `rbd-system` 命名空间

```bash
kubectl create namespace rbd-system
```

安装 Rainbond

:::info
更多 Helm Chart 参数请参考 [Chart 安装选项](../vaules-config)。
:::

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

### 验证安装

查看pod状态

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 `rbd-app-ui` pod为 Running 状态即安装成功。
- 安装成功以后，可通过 `$gatewayIngressIPs:7070` 访问 Rainbond 控制台。

### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](https://www.rainbond.com/docs/user-operations/deploy/install-troubleshoot/helm-install-troubleshoot/)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
