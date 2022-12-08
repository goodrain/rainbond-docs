---
title: '基于 K3s 安装'
description: '基于已有的 K3s 集群，使用 helm 从零开始安装 Rainbond'
keywords:
- 在 K3s 上安装 Rainbond
- 使用 K3s Containerd 安装 Rainbond
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -s -
```

  </TabItem>
  <TabItem value="docker" label="Docker">

```bash
# install docker
curl -sfL https://get.rainbond.com/install_docker | bash

# install k3s
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--docker --disable traefik" sh -s -
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

:::info
更多 Helm Chart 参数请参考 [Chart 安装选项](../vaules-config)。
:::

## 安装进度查询

执行完安装命令后，Rainbond 进行环境检查, 检查通过后开始安装。

### 环境检查

- 当你开始执行安装命令后，如果返回如下报错，则说明环境检测失败。

```bash
Error: failed pre-install: job failed: BackoffLimitExceeded
```

- 此时你需要执行以下命令检查失败日志信息，根据失败信息进行处理。

```bash
kubectl logs -f -l name=env-checker -n rbd-system
```

- 如果一切顺利，你执行完命令后，应该会看到以下输出。

```bash
NAME: rainbond
LAST DEPLOYED: Fri May 27 18:09:08 2022
NAMESPACE: rbd-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
安装过程大概持续10分钟左右，如遇问题可以参考 helm 问题排查文档：

https://www.rainbond.com/docs/installation/install-troubleshoot/helm-install-troubleshoot

动态查看 rainbond 安装进度命令：

watch kubectl get po -n rbd-system

等待 rbd-app-ui 的 pod 状态为 Running 时，即可访问 Rainbond 控制台，以下为访问地址：

  192.168.3.163:7070
```


### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](https://www.rainbond.com/docs/user-operations/deploy/install-troubleshoot/helm-install-troubleshoot/)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
