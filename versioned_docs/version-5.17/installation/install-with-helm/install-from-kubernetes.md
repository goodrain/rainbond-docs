---
title: 基于自建 Kubernetes 安装
descrition: 该章节文档介绍基于已有的 k8s 集群，使用 helm 安装 Rainbond
keywords:
- 基于自建 Kubernetes 安装 Rainbond 集群
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 概述

本文将指引你基于现有的 Kubernetes 集群，通过 Helm 命令快速部署 Rainbond。

## 前提条件

* Kubernetes 集群版本在 1.19-1.27 之间
* Kubectl 命令行工具，参阅 [Kubectl 安装](../../ops-guide/tools/#kubectl-cli)
* Helm 命令行工具，参阅 [Helm 安装](../../ops-guide/tools/#helm-cli)

## 安装 Rainbond

### 1. 安装 NFS 客户端挂载工具

默认安装时，Rainbond 会启动一个 `nfs-provisioner`，因此，需要节点上安装 NFS 客户端挂载工具，否则会由于无法挂载存储导致安装失败。如果你自定义配置后，使用外部的共享存储。那么此步可以忽略。

<Tabs>
  <TabItem value="Centos" label="Centos" default>

  ```bash
  yum -y install nfs-utils
  ```

  </TabItem>
  <TabItem value="Ubuntu" label="Ubuntu">

  ```bash  
  apt-get install nfs-common 
  ```

  </TabItem>
</Tabs>

### 2. 添加和更新 Helm 仓库

```bash  
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
kubectl create namespace rbd-system
```

### 3. 安装 Rainbond

Rainbond 支持 `Docker` 和 `Containerd` 两种容器运行时，当集群环境同时安装了 `Docker` 和 `Containerd` 时，默认会使用 `Docker`，你可以通过环境变量指定实际使用的容器运行时。

<Tabs>
  <TabItem value="Docker" label="Docker" default>

使用下方命令行快速安装，所有参数均采用默认参数。

```bash  
helm install rainbond rainbond/rainbond-cluster -n rbd-system
```

如果你的集群有公网 IP，需要从外部访问，请指定 `Cluster.gatewayIngressIPs` 参数，如下所示，将命令中的 gatewayIngressIPs 替换成你的公网 IP 即可：

新建示例[values.yaml](./vaules-config)文件：


```yaml
Cluster:  
  nodesForGateway: 
  - externalIP: 10.22.197.170 #外网IP
    internalIP: 10.22.197.170 #内网IP
    name: 10.22.197.170
    
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: 10.22.197.171
```

然后使用下方命令行指定```values.yaml```文件

```bash  
helm install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```
  </TabItem>

  <TabItem value="Containerd" label="Containerd">
使用下方命令行快速安装，所有参数均采用默认参数。

```bash  
helm install --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbond rainbond/rainbond-cluster -n rbd-system
```

如果你的集群有公网 IP，需要从外部访问，请指定 `Cluster.gatewayIngressIPs` 参数，如下所示，将命令中的 gatewayIngressIPs 替换成你的公网 IP 即可：

新建示例[values.yaml](/docs/installation/install-with-helm/vaules-config)文件：

```yaml
Cluster: 
  nodesForGateway:
  - externalIP: 10.22.197.170 #外网IP
    internalIP: 10.22.197.170 #内网IP
    name: 10.22.197.170
    
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: 10.22.197.171
```
```bash  
helm install --set operator.env[0].name=CONTAINER_RUNTIME --set operator.env[0].value=containerd rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```


  </TabItem>
</Tabs>

### 4. 安装进度查询

执行完安装命令后，在集群中执行以下命令查看安装状态。

```bash
watch kubectl get po -n rbd-system
```

当名称包含 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。如下所示，Pod `rbd-app-ui-669bb7c74b-7bmlf` 为 Running 状态时，表示 Rainbond 安装成功。

<details>
<summary>安装结果</summary>

```bash
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
rbd-app-ui-669bb7c74b-7bmlf                  1/1     Running     0          7d12h
rbd-app-ui-migrations--1-hp2qg               0/1     Completed   0          14d
rbd-worker-679fd44bc7-n6lvg                  1/1     Running     0          9d
rbd-node-jhfzc                               1/1     Running     0          9d
rainbond-operator-7978d4d695-ws8bz           1/1     Running     0          9d
rbd-chaos-nkxw7                              1/1     Running     0          8d
rbd-api-5d8bb8d57d-djx2s                     1/1     Running     0          47h
```

</details>

### 5. 访问平台

复制如下命令，在集群中执行，可以获取到平台访问地址。如果有多个网关节点，则任意一个地址均可访问到控制台。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

### 6. 高可用集群(可选)
 
对于[部署 Rainbond 高可用集群](../install-with-ui/ha)来说，只需要将依赖的服务（镜像仓库、数据库、存储等）都使用外置的高可用服务，然后按照 [Chart 安装选项](./vaules-config) 中的配置参数进行安装即可。 

## 问题排查

安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](../../troubleshooting/installation/helm)，进行故障排查。使用上问题可以参考[Rainbond 使用问题排查](../../troubleshooting/use/) 或加入 [微信群](/docs/support#微信群)、[钉钉群](/docs/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
