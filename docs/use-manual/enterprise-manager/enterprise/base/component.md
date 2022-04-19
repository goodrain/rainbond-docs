---
title: 内部组件库
description: 介绍内部组件的种类以及相关功能
---

### 功能描述

用于存储发布到组件库的应用模型镜像，其需要能被所有集群访问。

#### 适用场景

当控制台对接了多个集群时，一个内部组件应用想在多个集群中都安装，默认集群之间无法访问对方的镜像仓库地址，比如在 A 集群发布的内部组件库应用模板镜像信息无法被 B 集群所拉取。

### 操作流程

默认 Rainbond 是使用本地镜像仓库，想要配置公共镜像仓库，需要打开`内部组件镜像仓库`功能

1. 进入`企业视图`-->`设置`界面，打开内部组件库

![组件库](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-1.png)

![信息](https://static.goodrain.com/docs/5.6/use-manual/user-manual/components/components-2.png)

参数说明：

|          | 镜像仓库信息                     |
| :------- | -------------------------------- |
| 仓库地址 | 自定义，如：hub.xxx.com (必填项) |
| 命名空间 | 自定义，如：goodrain             |
| 用户名   | 自定义                           |
| 密码     | 自定义                           |













