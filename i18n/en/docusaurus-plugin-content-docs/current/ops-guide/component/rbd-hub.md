---
title: rbd-hub
description: Parameter Description of the rbd-hub component
---

## rbd-hub组件说明

基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务

### 运行方式

运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理

### 常用参数说明

rbd-hub基于registry镜像，详细参数参阅 [Docker Registry官方文档](https://docs.docker.com/registry/configuration/)

### 向集群私有镜像仓库推送镜像

:::tip
在集群内的任意节点进行如下操作
:::

首先获取私有镜像仓库的相关信息

```yaml title="kubectl get rainbondcluster -n rbd-system -o yaml|grep  -A 3 imageHub"
  imageHub:
    domain: goodrain.me
    password: 2118317a
    username: admin
```

登录私有镜像仓库

```bash
$ docker login goodrain.me -uadmin -p2118317a
```

将需要推送的镜像名字修改为`goodrain.me/***`，直接进行`push`操作即可

以推送`nginx`镜像为例

```bash
# 修改镜像名字
docker tag nginx goodrain.me/nginx:v1
# push镜像
docker push  goodrain.me/nginx:v1
```
