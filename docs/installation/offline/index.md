---
title: 离线安装
description: 使用 Helm 离线安装 Rainbond
keywords: 
- 离线安装 Rainbond
---

本文档介绍通过 Helm 离线安装 Rainbond。

## 前提

* 安装 [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
* 安装 [Helm CLI](https://helm.sh/docs/intro/install/)
* 安装 [nerdctl CLI](https://github.com/containerd/nerdctl/releases)
* Containerd 容器运行时的 Kubernetes 1.24+ 集群
* `80 443 6060 7070 8443`端口可用

## 离线安装 Rainbond

### 准备 Rainbond 离线镜像和安装包

1. 在有网络的环境下提前准备好 Rainbond 所需的镜像。你可以通过以下脚本下载所需的镜像。

```bash title="vim download_rbd_images.sh"
#!/bin/bash

IMAGE_DOMAIN=registry.cn-hangzhou.aliyuncs.com
IMAGE_NAMESPACE=goodrain
VERSION=v6.0.1-release

image_list="${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-chaos:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-mq:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond-operator:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-worker:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-api:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-monitor:v2.20.0
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/apisix-ingress-controller:1.8.2
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/apisix:3.9.1-debian
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/local-path-provisioner:v0.0.29
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/minio:RELEASE.2023-10-24T04-42-36Z
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-db:8.0.19
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/registry:2.6.2
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/alpine:latest"

for image in ${image_list}; do
    nerdctl pull "${image}"
done

nerdctl save -o rainbond-offline-images.tar ${image_list}
```

2. 获取 Rainbond Helm Chart

```bash
git clone -b main --depth=1 https://github.com/goodrain/rainbond-chart.git
```

### 开始安装

1. 导入提前准备好的镜像包和 Chart 包到目标服务器，执行以下命令导入镜像。

```bash
nerdctl -n k8s.io load -i rainbond-offline-images.tar
```

2. 编辑 [values.yaml](../install-with-helm/vaules-config) 文件，填写必须配置。

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: 172.20.251.93 #集群入口IP

  nodesForGateway:
  - externalIP: 172.20.251.93     #k8s节点外网IP
    internalIP: 172.20.251.93     #k8s节点内网IP
    name: 172.20.251.93           #k8s节点名称
# - More nodes for gateway
  nodesForChaos:
  - name: 172.20.251.93           #k8s节点名称
# - More nodes for chaos
  containerdRuntimePath: /var/run/containerd  #containerd.sock文件路径
Component:
  rbd_app_ui:
    env:
    - name: DISABLE_DEFAULT_APP_MARKET # 禁用默认开源应用商店
      value: true
```

3. 执行安装命令。

```bash
helm install rainbond ./rainbond-chart --create-namespace -n rbd-system -f values.yaml
```

4. 执行完安装命令后，在集群中执行以下命令查看安装状态。

```bash
watch kubectl get pod -n rbd-system
```

5. 当名称包含 `rbd-app-ui` 的 Pod 为 Running 状态时即安装成功。如下所示，Pod `rbd-app-ui-5577b8ff88-fpnnv` 为 Running 状态时，表示 Rainbond 安装成功。

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

6. 使用 `gatewayIngressIPs` 配置的 IP 地址访问 Rainbond，例如: `http://172.20.251.93:7070`。

7. 如您采用默认的镜像仓库，则需要修改 Containerd 的配置，配置 [goodrain.me 私有镜像仓库](../../faq/#%E5%90%AF%E5%8A%A8%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96%E9%95%9C%E5%83%8F-x509-certificate-signed-by-unknown-authority)。


## 离线环境下使用源码构建（可选）

### 获取镜像

在有网络的环境下提前准备好源码构建所需的镜像，你可以通过以下脚本下载所需的镜像。

```bash title="vim download_rbd_images_sourcebuild.sh"
#!/bin/bash
image_list="registry.cn-hangzhou.aliyuncs.com/goodrain/buildkit:v0.12.0
registry.cn-hangzhou.aliyuncs.com/goodrain/builder:stable-amd64
registry.cn-hangzhou.aliyuncs.com/goodrain/runner:stable-amd64
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-resource-proxy:offline-amd64"

for image in ${image_list}; do
  nerdctl pull "${image}"
done

nerdctl save -o rainbond-sourcebuild.tar ${image_list}
```

### 部署离线源码构建服务

1. 将镜像包导入到目标服务器

```bash
nerdctl -n k8s.io load -i rainbond-sourcebuild.tar
```

2. 在 `rbd-chaos` 构建节点上给镜像重新打 `tag` 并推送到私有镜像仓库

```bash
# login to goodrain.me
nerdctl login -u admin -p admin1234 goodrain.me --insecure-registry

# tag
nerdctl -n k8s.io tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:stable-amd64 goodrain.me/builder:latest-amd64
nerdctl -n k8s.io tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:stable-amd64 goodrain.me/runner:latest-amd64
nerdctl -n k8s.io tag registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-resource-proxy:offline-amd64 goodrain.me/rbd-resource-proxy:offline-amd64

# push
nerdctl -n k8s.io push goodrain.me/builder:latest-amd64 --insecure-registry
nerdctl -n k8s.io push goodrain.me/runner:latest-amd64 --insecure-registry
nerdctl -n k8s.io push goodrain.me/rbd-resource-proxy:offline-amd64 --insecure-registry
```

3. 部署 `rbd-resource-proxy` 离线源码构建服务

```yaml title="vim rbd-resource-proxy.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    name: rbd-resource-proxy
  name: rbd-resource-proxy
  namespace: rbd-system
spec:
  replicas: 1
  selector:
    matchLabels:
      name: rbd-resource-proxy
  template:
    metadata:
      labels:
        name: rbd-resource-proxy
      name: rbd-resource-proxy
    spec:
      containers:
      - image: goodrain.me/rbd-resource-proxy:offline-amd64
        imagePullPolicy: IfNotPresent
        name: rbd-resource-proxy
---
apiVersion: v1
kind: Service
metadata:
  labels:
    name: rbd-resource-proxy
  name: rbd-resource-proxy
  namespace: rbd-system
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    name: rbd-resource-proxy
  type: NodePort
```

4. 获取 `rbd-resource-proxy` 服务的 `NodePort` 端口

```bash
kubectl get svc -n rbd-system rbd-resource-proxy
NAME                 TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
rbd-resource-proxy   NodePort   10.43.122.71   <none>        80:31980/TCP   8h
```

5. 将上述获取到的 `NodePort` 端口和 IP 配置到下述配置中，IP 为 `rbd-resource-proxy` 服务所在节点的 IP

```yaml title="kubectl edit apisixroute lang-proxy -n rbd-system"
spec:
  http:
  - name: lang-proxy
    plugins:
    - config:
        host: 172.20.251.110:31980
        scheme: http
```

```yaml title="kubectl edit apisixupstream -n rbd-system buildpack-upstream"
spec:
  externalNodes:
  - name: 172.20.251.110
    port: 31980
    type: Domain
  scheme: http
```