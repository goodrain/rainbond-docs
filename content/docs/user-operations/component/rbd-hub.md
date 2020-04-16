---
title: rbd-hub组件说明
description: "rbd-hub组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

rbd-hub基于registry镜像，详细参数参阅 [Docker Registry官方文档](https://docs.docker.com/registry/configuration/)


### 如何向集群私有镜像仓库推镜像

>在集群内的任意节点进行如下操作

将需要推送的镜像名字修改为`goodrain.me/***`，直接进行`push`操作即可

以`nginx`镜像为例

```bash
# 获取镜像
docker pull nginx
# 修改镜像名字
docker tag nginx goodrain.me/nginx:v1
# push镜像
docker push  goodrain.me/nginx:v1
```


