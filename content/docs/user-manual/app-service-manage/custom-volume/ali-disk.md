---
title: 阿里云盘
description: 阿里云为云服务器ECS提供的数据块级别的块存储
hidden: true
weight: 5015
---

### 云盘概述

云盘是阿里云为云服务器ECS提供的数据块级别的块存储产品，具有低时延、高性能、持久性、高可靠等特点。

云盘采用分布式三副本机制，为ECS实例提供99.9999999%的数据可靠性保证。支持在可用区内自动复制您的数据，防止意外硬件故障导致的数据不可用，保护您的业务免于组件故障的威胁。就像硬盘一样，您可以对挂载到ECS实例上的云盘做分区、格式化、创建文件系统等操作，并对数据进行持久化存储。

更多云盘介绍可到[阿里云官方文档](https://www.alibabacloud.com/help/zh/doc-detail/25383.htm?spm=a2c63.p38356.b99.223.7f2d3e9cES5ysy)进行了解。


### Rainbond平台对接阿里云盘


#### 驱动的安装

阿里云盘驱动的原理是通过阿里云盘SDK的方式远程创建出来一个云盘实例，供kubernetes使用。
阿里云盘根据kubernetes的存储规范，实现了一套阿里云CSI插件，可以通过CSI插件实现kubernetes对阿里云盘存储的生命周期管理。云盘CSI插件支持动态创建云盘数据卷、挂载数据卷。云盘是一种块存储类型，只能同时被一个负载使用(ReadWriteOnce)。

使用项目[alibaba-cloud-csi-driver](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)
```
git clone https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver.git
```

进入到项目中

创建csi-plugin

```
kubectl create -f ./deploy/disk/disk-plugin.yaml
```
> 需要注意设置环境变量中`ACCESS_KEY_ID`、`ACCESS_KEY_SECRET`两个变量为阿里云平台账户的accesskey信息。
创建驱动

```
kubectl create -f ./deploy/disk/disk-provisioner.yaml
```

检查csi-plugin的状态

```
kubectl get pods | grep csi
```

更多驱动安装的请参考[官方教程](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

#### storageClass的创建

项目中已经定义好了storageClass，可以直接执行创建。
```
kubectl create -f ./examples/disk/storageclass.yaml
```

#### 存储的使用

正确创建存储驱动并创建storageClass之后，用户可以在Rainbond控制台创建有状态组件使用阿里云盘存储，此时添加存储类型时，可以看到阿里云盘storageClass对应的新增存储类型供用户使用。

> 须通过重启组件或者更新组件来触发存储的生效

#### 检查结果

存储是否生效可以通过组件是否可以正常启动来判断，组件正常启动则说明组件已经正常挂载了存储，也可以到阿里云盘管理页面确定存储的情况，确定是否存在对应大小的存储，其状态是否是使用中的状态。
