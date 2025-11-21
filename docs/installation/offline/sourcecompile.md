---
title: 离线源码构建
description: 在离线环境下使用源码构建功能
keywords: 
- 离线源码构建
---

## 离线环境下使用源码构建（可选）

在完全离线的环境下，您仍然可以使用 Rainbond 的源码构建功能来构建应用镜像。以下是配置和部署离线源码构建服务的步骤。

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

:::tip
目前 rbd-resource-proxy 镜像仅提供 amd64 架构版本，如需 arm64 架构支持请联系 Rainbond 技术支持。
:::

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