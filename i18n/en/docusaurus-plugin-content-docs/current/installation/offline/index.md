---
title: Offline Installation
description: Install Rainbond Offline with Helm
keywords:
  - Offline Installation Rainbond
---

This document describes how to install Rainbond offline with Helm.

## Prerequisites

- Install [Kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
- Install [Helm CLI](https://helm.sh/docs/intro/install/)
- Install [nerdctl CLI](https://github.com/containerd/nerdctl/releases)
- Kubernetes 1.24+ cluster with Containerd container runtime
- Ports `80 443 6060 7070 8443` are available

## Offline Installation Rainbond

### Prepare Rainbond offline images and installation package

1. Prepare the required images for Rainbond in advance in a networked environment.You can download the required images through the following script.`<version>` can be viewed in [Rainbond Release](https://github.com/goodrain/rainbond/releases).

```bash title="vim download_rbd_images.sh"
#!/bin/bash

IMAGE_DOMAIN=registry.cn-hangzhou.aliyuncs.com
IMAGE_NAMESPACE=goodrain
VERSION=<version>

image_list="${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-chaos:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-mq:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond-operator:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-worker:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-api:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-init-probe:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-monitor:v2.20.0
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/apisix-ingress-controller:1.8.2
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/apisix:3.9.1-debian
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/local-path-provisioner:v0.0.30
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/minio:RELEASE.2023-10-24T04-42-36Z
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-db:8.0.19
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/registry:2.6.2
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/alpine:latest"

for image in ${image_list}; do
    nerdctl pull "${image}"
done

nerdctl save -o rainbond-offline-images.tar ${image_list}
```

2. Get Rainbond Helm Chart

```bash
git clone -b main --depth=1 https://github.com/goodrain/rainbond-chart.git
```

### Start Installation

1. Import the pre-prepared image package and Chart package to the target server, and execute the following command to import the images.

```bash
nerdctl -n k8s.io load -i rainbond-offline-images.tar
```

2. Edit the [values.yaml](../install-with-helm/vaules-config.md) file and fill in the necessary configurations.

```yaml title="vim values.yaml"
Cluster:
  gatewayIngressIPs: 172.20.251.93 #Cluster ingress IP

  nodesForGateway:
  - externalIP: 172.20.251.93     #k8s node external IP
    internalIP: 172.20.251.93     #k8s node internal IP
    name: 172.20.251.93           #k8s node name
# - More nodes for gateway
  nodesForChaos:
  - name: 172.20.251.93           #k8s node name
# - More nodes for chaos
  containerdRuntimePath: /var/run/containerd  #containerd.sock file path
Component:
  rbd_app_ui:
    env:
    - name: DISABLE_DEFAULT_APP_MARKET # Disable default open source app store
      value: true
```

3. Execute the installation command.

```bash
helm install rainbond ./rainbond-chart --create-namespace -n rbd-system -f values.yaml
```

4. After executing the installation command, execute the following command in the cluster to check the installation status.

```bash
watch kubectl get pod -n rbd-system
```

5. When the Pod with the name containing `rbd-app-ui` is in the Running state, the installation is successful.As shown below, when the Pod `rbd-app-ui-5577b8ff88-fpnnv` is in the Running state, it means Rainbond is successfully installed.

<details>
<summary>Example of successful installation</summary>

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

6. Access Rainbond using the IP address configured in `gatewayIngressIPs`, for example: `http://172.20.251.93:7070`.

7. If you use the default image repository, you need to modify the configuration of Containerd, configure [goodrain.me private image repository](../../faq/index.md#%E5%90%AF%E5%8A%A8%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96%E9%95%9C%E5%83%8F-x509-certificate-signed-by-unknown-authority).

## Using source code build in offline environment (optional)

### Get images

Prepare the required images for source code build in advance in a networked environment, you can download the required images through the following script.

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

### Deploy offline source code build service

1. Import the image package to the target server

```bash
nerdctl -n k8s.io load -i rainbond-sourcebuild.tar
```

2. On the `rbd-chaos` build node, re-tag the images and push them to the private image repository

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

3. Deploy `rbd-resource-proxy` offline source code build service

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

4. Get the `NodePort` port of the `rbd-resource-proxy` service

```bash
kubectl get svc -n rbd-system rbd-resource-proxy
NAME                 TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
rbd-resource-proxy   NodePort   10.43.122.71   <none>        80:31980/TCP   8h
```

5. Configure the `NodePort` port and IP obtained above in the following configuration, the IP is the IP of the node where the `rbd-resource-proxy` service is located

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