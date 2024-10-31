---
title: 在 K3s 上安装
description: 在 K3s 上安装 Rainbond 集群
keywords:
- 在 K3s 上安装 Rainbond
- 使用 K3s Containerd 安装 Rainbond
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 前提

- 安装 [Helm](/docs/ops-guide/tools/#helm-cli) 3.0+
- 确保 `80、443、6060、7070、8443` 未被占用
- 确保服务器安装了 NFS 客户端
- K3s 的启动需要指定启动参数 `–-disable traefik`
- 安装 NFS 客户端
- 目前仅支持 1.19 ~ 1.27 版本的 K3s

## 安装 K3s

在安装 K3s 时需添加 `--disable traefik` 禁用 Traefik 的安装，Traefik 与 Rainbond 网关会产生冲突，更多请参阅 [K3s 安装文档](https://docs.k3s.io/installation)。

<Tabs>
  <TabItem value="containerd" label="Containerd" default>

Rainbond 默认会安装私有镜像仓库，通过创建 `/etc/rancher/k3s/registries.yaml` 文件来配置使用私有镜像仓库。

```yaml
configs:
  "goodrain.me":
    tls:
      insecure_skip_verify: true
```

安装 K3s

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn INSTALL_K3S_EXEC="--disable traefik" INSTALL_K3S_VERSION="v1.24.10+k3s1" sh -
```

  </TabItem>
  <TabItem value="docker" label="Docker">

安装 Docker

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

安装 K3s

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn INSTALL_K3S_EXEC="--docker --disable traefik" INSTALL_K3S_VERSION="v1.24.10+k3s1" sh -
```

  </TabItem>
</Tabs>

复制 K3s Kubeconfig 文件到 `~/.kube/config`。

```bash
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

## 安装 Rainbond

添加 Helm Chart 仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
```

创建 `rbd-system` 命名空间

```bash
kubectl create namespace rbd-system
```

<Tabs>
  <TabItem value="containerd" label="Containerd" default>

K3s 使用 Containerd 作为容器运行时，需指定 `useK3sContainerd` 参数为 `true`。

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system \
--set useK3sContainerd=true
```

  </TabItem>
  <TabItem value="docker" label="Docker">

使用 Helm 安装 Rainbond
```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

  </TabItem>
</Tabs>

:::tip
更多 Helm Chart 参数请参考 [Chart 安装选项](../vaules-config)。

执行完安装命令后，请[查询集群安装进度](/docs/installation/install-with-helm/install-from-kubernetes#4-安装进度查询)。
:::

### 安装问题排查

安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](/docs/troubleshooting/installation/helm)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
