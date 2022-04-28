---
title: 本地组件库镜像仓库
description: 用于存储发布到组件库的应用模型镜像，其需要能被所有集群访问
---

## 功能描述

用于存储发布到组件库的应用模型镜像，其需要能被所有集群访问。

## 适用场景

每套 Rainbond 集群都会安装默认的镜像仓库 `rbd-hub`，它只能在 k8s 集群内部访问，当前集群的所有镜像都会同步到此镜像仓库中，包括发布的本地组件库的应用模型镜像。

当控制台对接了多套 Rainbond 集群时，在 A 集群中发布应用到本地组件库中，如果不配置同步的镜像仓库地址，那么将会同步到默认的镜像仓库中，则 B 集群无法从本地组件库安装此应用。


## 操作流程

进入`企业视图`-->`设置`界面，打开 内部组件库镜像仓库 按钮。


|          | 镜像仓库信息                     |
| :------- | -------------------------------- |
| 仓库地址 | 自定义，如：hub.xxx.com (必填项) |
| 命名空间 | 自定义，如：goodrain             |
| 用户名   | 自定义                           |
| 密码     | 自定义                           |



![组件库](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-1.png)

![信息](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-2.png)














