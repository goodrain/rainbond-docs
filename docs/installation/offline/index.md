---
title: 离线安装
description: 使用 Helm 离线安装 Rainbond
keywords: 
- 离线安装 Rainbond
---

本文档介绍通过 Helm 离线安装 Rainbond。

## 前提

- 安装 [Helm CLI](/docs/ops-guide/tools/#helm-cli)
- 可用的 Kubernetes 集群，版本 1.16+


## 1. 准备离线镜像和安装包

在有网络的环境下提前准备好 Rainbond 所需的镜像。你可以通过以下脚本下载所需的镜像。

```bash title="vim download_rbd_images.sh"
#!/bin/bash

IMAGE_DOMAIN=${IMAGE_DOMAIN:-registry.cn-hangzhou.aliyuncs.com}
IMAGE_NAMESPACE=${IMAGE_NAMESPACE:-goodrain}
VERSION=${VERSION:-'v5.14.2-release'}

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
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/resource-proxy:v5.10.0-release
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rainbond-operator:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-worker:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-node:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-monitor:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-gateway:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-api:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-db:8.0.19
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/builder:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/runner:${VERSION}
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/mysqld-exporter:latest
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/nfs-provisioner:latest
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/helm-env-checker:latest
${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/kaniko-executor:latest"

for image in ${image_list}; do
    docker pull "${image}"
done

docker save -o rainbond-"${VERSION}".tar ${image_list}
```

获取 nfs-utils 安装包
```bash
wget https://pkg.rainbond.com/offline/nfs-client/nfs_all.tar.gz
```

获取 Rainbond Helm Chart 安装包
```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
helm pull rainbond/rainbond-cluster
```

## 2. 开始安装

导入上面准备镜像包和离线包到目标所有服务器，执行以下命令开始安装。

### 安装 nfs 客户端
```bash
# 解压 nfs 压缩包
mkdir -p /opt/nfs
tar xvf nfs_all.tar.gz -C /opt/nfs

# centos
tar xvf /opt/nfs/basic_centos7.tar.gz -C /opt/nfs && rpm -Uvh --force --nodeps /opt/nfs/*.rpm

# ubuntu
export version_codename=cat /etc/os-release |grep VERSION_CODENAME|awk -F"=" '{print $2}'
tar xvf /opt/nfs/basic_$version_codename.tar.gz -C /opt/nfs/ && dpkg -i /opt/nfs/*.deb
```

### 导入镜像包
```bash
docker load -i rainbond-v5.14.2-release.tar
```

### 安装 Rainbond

解压 Helm Chart 包

```bash
tar xvf rainbond-cluster-5.14.0.tgz
```

使用 Helm Chart 安装 Rainbond，

```bash
kubectl create namespace rbd-system

helm install rainbond ./rainbond-cluster -n rbd-system \
--set Cluster.enableEnvCheck=false \
--set Component.rbd_app_ui.env.DISABLE_DEFAULT_APP_MARKET=true \
--set Component.rbd_resource_proxy.image=registry.cn-hangzhou.aliyuncs.com/goodrain/resource-proxy:v5.10.0-release
```

## 3. 安装进度查询

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

## 4. 访问平台

复制如下命令，在集群中执行，可以获取到平台访问地址。如果有多个网关节点，则任意一个地址均可访问到控制台。

```bash
kubectl get rainbondcluster rainbondcluster -n rbd-system -o go-template --template='{{range.spec.gatewayIngressIPs}}{{.}}:7070{{printf "\n"}}{{end}}'
```

### 推送镜像至私有仓库

Rainbond 安装成功后推送 `builder` `runner` 镜像到 Rainbond 私有仓库

```bash
# 获取镜像仓库密码
kubectl get rainbondcluster -n rbd-system -o yaml|grep -A 3 imageHub

# 登陆仓库
docker login -u admin goodrain.me -p <password>

# 重新打 tag 并推送镜像
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/builder:v5.14.2-release goodrain.me/builder:latest
docker tag registry.cn-hangzhou.aliyuncs.com/goodrain/runner:v5.14.2-release goodrain.me/runner:latest
docker push goodrain.me/builder:latest
docker push goodrain.me/runner:latest
```

## 5. 自定义高级配置(可选)
 
当你有一些额外需求，比如使用自建的镜像仓库、数据库、ETCD、StorageClass、指定网关节点、指定构建节点等。你可以使用[Helm安装命令生成工具](/helm)生成安装命令。
参数详细说明可以参考 [values.yaml 详解](/docs/installation/install-with-helm/vaules-config)
