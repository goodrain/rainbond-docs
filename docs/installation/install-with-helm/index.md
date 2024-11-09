---
title: 基于 Kubernetes 安装
descrition: 该章节文档介绍基于已有的 k8s 集群，使用 helm 安装 Rainbond
keywords:
- 基于 Kubernetes 安装 Rainbond 集群
---

## 概述

本文将指引您在已有的 Kubernetes 集群中快速安装一套可用的 Rainbond 环境，支持自建集群、托管集群等。

## 前提条件

* Kubernetes 1.24+
* [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
* [Helm CLI](https://helm.sh/docs/intro/install/)
* `80 443 6060 7070 8443`端口可用

## 安装 Rainbond

1. 您可以使用默认参数安装或[自定义安装参数](./vaules-config.md)，请执行下述命令开始安装。

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm repo update
helm install rainbond rainbond/rainbond-cluster --create-namespace -n rbd-system
```

2. 执行完安装命令后，在集群中执行以下命令查看安装状态。

```bash
watch kubectl get po -n rbd-system
```

3. 当名称包含 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。如下所示，Pod `rbd-app-ui-669bb7c74b-7bmlf` 为 Running 状态时，表示 Rainbond 安装成功。

<details>
<summary>安装成功结果示例</summary>

```bash
NAME                                         READY   STATUS      RESTARTS   AGE
rbd-hub-64777d89d8-l56d8                     1/1     Running     0          14d
rbd-gateway-76djb                            1/1     Running     0          14d
rbd-mq-6b847d874b-j5jg2                      1/1     Running     0          14d
rbd-monitor-0                                1/1     Running     0          14d
rbd-db-0                                     2/2     Running     0          14d
rbd-app-ui-669bb7c74b-7bmlf                  1/1     Running     0          7d12h
rbd-worker-679fd44bc7-n6lvg                  1/1     Running     0          9d
rainbond-operator-7978d4d695-ws8bz           1/1     Running     0          9d
rbd-chaos-nkxw7                              1/1     Running     0          8d
rbd-api-5d8bb8d57d-djx2s                     1/1     Running     0          47h
```

</details>

4. 访问平台

使用以下命令获取 Rainbond 访问地址。如有多个网关节点，则任意一个地址均可访问。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```


## 问题排查

安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](/docs/troubleshooting/installation/helm)，进行故障排查。使用上问题可以参考[Rainbond 使用问题排查](/docs/troubleshooting/use/) 或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
