---
title: Offline install
description: Use Helm to install Rainbond offline
keywords:
  - Install Rainbond offline
---

This document describes the installation of Rainbod via Helm offline.

## Prerequisite

- Install [Helm CLI](/docs/ops-guide/tools/#helm-cli)
- Available Kubernetes clusters, version 1.16+
- Install NFS client

## Preparing offline mirrors and installation packages

Prepare the mirrors needed for Rainbond ahead of time in a network environment.You can download the required mirrors via the following scripts.

```bash title="vim download_rbd_images.sh"
#!/bin/bash

IMAGE_DOMAIN=${IMAGE_DOMAIN:-registry.cn-hangzhou.aliyuncs.com}
IMAGE_NAMESPACE=${IMAGE_NAMESPACE:-goodrain}
VERSION=${VERSION:-'v5.17.3-release'}

image_list="${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/kubernetes-dashboard:v2.6.1
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/registry:2.6.2
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/metrics-server:v0.4.1
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/etcd:v3.3.18
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/metrics-scraper:v1.0.4
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond:${VERSION}-allinone
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-mesh-data-panel:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-webcli:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-eventlog:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-init-probe:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-chaos:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-mq:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond-operator:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-worker:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-node:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-monitor:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-gateway:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-api:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-db:8.0.19
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/mysqld-exporter:latest
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/nfs-provisioner:latest"

for image in ${image_list}; do
    docker pull "${image}"
done

docker save -o rainbond-"${VERSION}".tar ${image_list}
```

Get Rainbond Helm Chart installation package

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm null rainbond/rainbond-cluster
```

## Start Installation

Import a mirror and offline package above to all servers, execute the following commands to start installation.

### Import Mirror Pack

```bash
docker load-i rainbond-v5.17.3-release.tar
```

### Install Rainbond

Unpack Helm Chart

```bash
tar xvf rainbond-cluster-5.17.3.tgz
```

Install Rainbond
with Helm Chart ::info
when a self-built mirror warehouse, database, ETCD, shared storage, specified gateway node, specified building node, etc.You can refer to [values.yaml details](/docs/installation/install-with-helm/vaules-config) and modify the following command.
:::

```bash
kubectl create name rbd-system

helm install rainbond ./rainbond-cluster -n rbd-system \
-set Cluster.enableEnvCheck=false\
--Component.rbd_app_ui.env.DISABLE_DEFAULT_APP_MARKET=true
```

## Install progress query

After executing the installation command, perform the following commands in the cluster to view the installation status.

```bash
watch kubtl get po -n rbd-system
```

Installation successful when the name `rbd-app-ui` contains the Pod `rbd-app-ui` for Running state.As shown below, the Pod `rbd-app-ui-669bb7c74b-7bmlf` states that Rainbond was installed successfully.

<details>
<summary>Installation Results</summary>

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

## Access Platform

Copy the commands below to be executed in the cluster, and get the platform access address.If there are multiple gateway nodes, any address can be accessed to the console.

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

## Use source build in offline environment (optional)

### Get Mirror

Prepare the mirrors needed for Rainbond ahead of time in a network environment.You can download the required mirrors via the following scripts.

```bash title="vim download_rbd_images_sourcebuild.sh"
#!/bin/bash
VERSION=${VERSION:-'v5.17.3-release'}

image_list="registry.cn-hangzhou.aliyuncs.com/goodrain/buildkit:latest
registry.cn-hangzhou.aliyuncs.com/goodrain/builder:${VERSION}
registry.cn-hangzhou.aliyuncs.com/goodrain/runner:${VERSION}"

for image in ${image_list}; do
    docker pull "${image}"
done

docker save -o rainbond-sourcebuild-"${VERSION}".tar ${image_list}
```

Download the `rbd-resource-proxy` image offline

```bash
wget https://pkg.rainbond.com/offline/5.3-enterprise/rbd-resource-proxy-offline-amd64.tar
```

### Import Images

Import a mirror package into a target server

```bash
docker load-i rainbond-sourceild-v5.17.3-release.tar
docker load -i rbd-resource-proxy-offline-amd64.tar
```

### Push Image

After the installation of Rainbond the `builder` `runner` `rbd-resource-proxy` mirrors to Rainbond private repository

```bash
# 获取镜像仓库密码
kubectl get rainbondcluster -n rbd-system -o yaml|grep -A 3 imageHub

# 登陆仓库
docker login -u admin goodrain.me -p <password>

# 重新打 tag 并推送镜像

docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.17.3-release goodrain.me/builder:latest-amd64
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.17.3-release goodrain.me/runner:latest-amd64
docker push goodrain.me/builder:latest-amd64
docker push goodrain.me/runner:latest-amd64
docker push goodrain.me/rbd-resource-proxy:offline-amd64
```

### Upgrade Rainbond

Reassign `rbd-resource-proxy` image using Helm to upgrade Rainbond

```bash
helm upgrade rainbond ./rainbond-cluster -n rbd-system \
--set Cluster.enableEnvCheck=false \
--set Component.rbd_app_ui.env.DISABLE_DEFAULT_APP_MARKET=true \
--set Component.rbd_resource_proxy.image=goodrain.me/rbd-resource-proxy:offline-amd64
```
