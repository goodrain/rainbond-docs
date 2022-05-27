---
title: '基于自建 k8s 集群安装'
weight: 100
description: '基于已有的 k8s 集群，使用 helm 从零开始安装 Rainbond'
---


#### 安装前提

- 推荐[helm版本](https://helm.sh/docs/intro/install/)：3.0+
- 推荐[k8s版本](https://kubernetes.io/)：1.19+
- 根分区磁盘保证50G+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问
- 确保服务器安装了 NFS 客户端

#### 安装 NFS 客户端

如果服务器上有 NFS 客户端，则无需重复进行安装
```bash
yum -y install nfs-utils    # Cenots系统
apt-get install nfs-common  # ubuntu系统
```
#### 安装步骤：

- 安装Rainbond

Rainbond 的安装命令可以使用 [Helm安装命令生成工具](/helm) 进行生成.

- 默认安装时，需要正确填写网关地址以及网关节点

[![XmFWuQ.png](https://s1.ax1x.com/2022/05/27/XmFWuQ.png)](https://imgtu.com/i/XmFWuQ)

- 填写完毕以后，点击最下方一键生成安装命令，然后复制生成出来的命令到终端进行安装即可，**以下为例：**

```bash
kubectl create namespace rbd-system
 helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
 helm repo update
 helm install --set Cluster.gatewayIngressIPs=49.233.27.93 --set Cluster.enableHA=false --set Cluster.nodesForGateway[0].name=49.233.27.93 --set Cluster.nodesForGateway[0].externalIP=49.233.27.93 --set Cluster.nodesForGateway[0].internalIP=10.0.16.16 rainbond rainbond/rainbond-cluster -n rbd-system
```



- 开始安装时会进行环境检测，检测成功以后，会输出以下信息，代表正在安装。

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

  49.233.27.93:7070
```



#### 验证安装

- 查看pod状态

```
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 ``` rbd-app-ui ``` 为 Running 状态即安装成功。
- 安装成功以后，可以通过安装界面弹出的提示访问信息，进行访问 Rainbond 控制台（实际访问IP以弹出的信息为准）


#### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](../install-troubleshoot/helm-install-troubleshoot)，进行故障排查。
