---
title: Install on K3s
description: Install the Rainbond cluster on K3s
keywords:
  - Install Rainbond on K3s
  - Install Rainbond with K3s Containerd
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisite

- Install [Helm](/docs/ops-guide/tools/#helm-cli) 3.0+
- Ensure that `80, 443, 6060, 7070 and 8443` are not used
- Make sure the server installed the NFS client
- Start of K3s requires `–Disable trafik`
- Install NFS client
- Only K3s in version 1.19 ~1.27 are currently supported

## Install K3s

When installing K3s, you need to add `--disable trafik` to disable Traefik installation. Traefik and Rainbond gateways will conflict with [K3s install documents] (https://docs.k3s.io/installation).

<Tabs>
  <TabItem value="containerd" label="Containerd" default>

Rainbond will install private mirror repositories by default and configure using private mirror repositories by creating `/etc/rancher/k3s/registries.yaml` files.

```yaml
configs:
  "goodrain.me":
    tls:
      insecure_skip_verify: true
```

Install K3s

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INS L_K3S_MIROR=cn INSTAT_K3S_K3S_EXEC="--disable traefik" INSTAL_K3S_VERSION="v1.24.10+k3s1sh -
```

  </TabItem>
  <TabItem value="docker" label="Docker">

Install Docker

```bash
curl -sfL https://get.rainbond.com/install_docker | bash
```

Install K3s

```bash
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTAT_K3S_MIROR=cn INSTAL_K3S_K3S_EXEC="--docker --disable trafik" INSTAL_K3S_VERSION="v1.24.10+k3s1" sh -
```

  </TabItem>
</Tabs>

Copy K3s Kubeconfig file to `~/.kube/config`.

```bash
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

## Install Rainbond

Add Helm Chart repository

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
help repo update
```

Create `rbd-system` namespace

```bash
kubectl create namespace rbd-system
```

<Tabs>
  <TabItem value="containerd" label="Containerd" default>

The `useK3sContainerd` parameter must be specified as `true` when K3s run as containerd.

```bash
helm install rainbond rainbond/rainbond-cluster -n rbd-system \
--set useK3sContainerd=true
```

  </TabItem>
  <TabItem value="docker" label="Docker">

Install Rainbond with Helm

```bash
help install rainbond rainbond/rainbond-cluster-n rbd-system
```

  </TabItem>
</Tabs>

:::tip
更多 Helm Chart 参数请参考 [Chart 安装选项](../vaules-config)。

执行完安装命令后，请[查询集群安装进度](/docs/installation/install-with-helm/install-from-kubernetes#4-安装进度查询)。
:::

### Installation problem sorting

If the installation process is not completed for a long period of time, please refer to the document [Helm Installation troubleshooting/installation/helm) for troubleshooting.Or join [微信群](/community/support#microbelieve),[钉钉群](/community/support#pegs) for help.

## Next step

Use[快速入门](/docs/quick-start/getting-started/) to deploy your first application.
