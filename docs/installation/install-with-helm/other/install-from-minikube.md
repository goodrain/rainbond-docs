---
title: '基于 MiniKube 集群安装'
description: '基于 MiniKube 集群，使用 helm 从零开始安装 Rainbond'
---

## 概述

本文将指引你基于现有的 MiniKube 集群，通过 Helm 命令快速部署 Rainbond。

## 先决条件

:::caution

1. 集群中所有节点都需要安装 NFS 客户端挂载工具
2. 节点 80、443、6060、6443、7070、8443 端口可用
3. 默认安装的 Minikube 集群 会占用 8443 端口，所以需要在启动 Minikube 集群的时候指定 api 的端口，以下为示例命令，供参考：

   ```bash
   minikube start --vm-driver=docker  --apiserver-port=9443 --ports=80:80 --ports=433:443  --ports=6060:6060 --ports=8443:8443 --ports=7070:7070  --insecure-registry=goodrain.me  --registry-mirror=https://registry.docker-cn.com  --image-mirror-country cn --kubernetes-version=v1.22.2
   ```

:::

### 安装 Helm 命令

我们使用 Helm 来部署 Rainbond。因此集群中执行该操作的节点必须安装 Helm 命令行工具。建议 Helm 版本大于 3.0，你可复制以下命令在你的集群中快速安装 Helm。

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### 安装 Kubectl 命令

当需要查看集群中安装状态，管理集群时，我们需要安装 Kubectl 命令行工具，你可复制以下命令在你的集群中快速安装 Kubectl 工具。

```bash
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

## 安装 Rainbond

以下将会列出基于 Kind 集群部署 Rainbond 的一些必要步骤，以及相关参数的简要说明。

### 获取网关节点信息：

Rainbond 会部署一个平台的全局网关，即 `rbd-gateway` 组件，它是平台内所有应用的访问入口。因此它需要监听节点的 80、443、6060、6443、7070、8443 端口。

### 安装 Rainbond

:::caution
以下命令仅用作示例，不要直接复制，需要修改以下命令中的 IP 地址为你当前机器的实际的 IP, IIP 修改成你的node节点的IP地址。
:::

填写完毕后，点击最下方一键生成安装命令，你将会看到以下输出：

```bash
kubectl create namespace rbd-system

helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond

helm repo update

helm install --set Cluster.gatewayIngressIPs=192.168.94.148 --set Cluster.enableHA=false --set Cluster.RWX.enable=true --set Cluster.RWX.config.storageClassName=standard --set Cluster.RWO.enable=true --set Cluster.RWO.storageClassName=standard --set Cluster.nodesForGateway[0].name=minikube --set Cluster.nodesForGateway[0].externalIP=192.168.94.148 --set Cluster.nodesForGateway[0].internalIP=172.18.0.2 rainbond rainbond/rainbond-cluster -n rbd-system
```

该命令主要执行了以下操作：

- 创建 rbd-system 命名空间
- 添加 Rainbond 的 Helm 仓库
- 更新仓库数据
- 执行安装

你接下来可以复制生成的命令，去你的 Kubernetes 集群中进行安装。

#### 安装进度查询

执行完安装命令后，Rainbond 进行环境检查, 检查通过后开始安装。

#### 环境检查

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
LAST DEPLOYED: Fri Sep 23 21:34:48 2022
NAMESPACE: rbd-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
The installation process lasts about 10 minutes. If you encounter problems, you can refer to the helm troubleshooting document:

https://www.rainbond.com/docs/installation/install-troubleshoot/helm-install-troubleshoot

Dynamic view of rainbond installation progress command:

watch kubectl get po -n rbd-system

Observe pod status, When the status of rbd-app-ui is running, you can access the console of Rainbond. the following is the access address:


  192.168.94.148:7070
```



#### 开始安装

- 当环境检查通过后，将会开始安装 Rainbond，此时你可以通过以下命令，查看 Pod 启动状态。

```
watch kubectl get po -n rbd-system
```

- 当名称包含 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。如下所示，Pod `rbd-app-ui-669bb7c74b-7bmlf` 为 Running 状态时，表示 Rainbond 安装成功。

```
NAME                                         READY   STATUS      RESTARTS   AGE
nfs-provisioner-0                            1/1     Running     0          14d
rbd-etcd-0                                   1/1     Running     0          14d
rbd-hub-64777d89d8-l56d8                     1/1     Running     0          14d
rbd-gateway-76djb                            1/1     Running     0          14d
dashboard-metrics-scraper-7db45b8bb4-tcgxd   1/1     Running     0          14d
rbd-mq-6b847d874b-j5jg2                      1/1     Running     0          14d
rbd-webcli-76b54fd7f6-jrcdj                  1/1     Running     0          14d
kubernetes-dashboard-fbd4fb949-2qsn9         1/1     Running     0          14d
rbd-resource-proxy-547874f4d7-dh8bv          1/1     Running     0          14d
rbd-monitor-0                                1/1     Running     0          14d
rbd-db-0                                     2/2     Running     0          14d
rbd-eventlog-0                               1/1     Running     0          14d
rbd-app-ui-migrations--1-hp2qg               0/1     Completed   0          14d
rbd-worker-679fd44bc7-n6lvg                  1/1     Running     0          9d
rbd-node-jhfzc                               1/1     Running     0          9d
rainbond-operator-7978d4d695-ws8bz           1/1     Running     0          9d
rbd-chaos-nkxw7                              1/1     Running     0          8d
rbd-app-ui-669bb7c74b-7bmlf                  1/1     Running     0          7d12h
rbd-api-5d8bb8d57d-djx2s                     1/1     Running     0          47h
```

- 安装成功以后，可以通过安装界面弹出的提示访问信息，访问 Rainbond 控制台（实际访问 IP 以弹出的信息为准）

## 问题排查

安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](/docs/troubleshooting/installation/helm)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。