---
title: 阿里云云盘
description: 阿里云为云服务器ECS提供的数据块级别的块存储
---

### 云盘概述

云盘是阿里云为云服务器 ECS 提供的数据块级别的块存储产品，具有低时延、高性能、持久性、高可靠等特点。

云盘采用分布式三副本机制，为 ECS 实例提供 99.9999999% 的数据可靠性保证。支持在可用区内自动复制您的数据，防止意外硬件故障导致的数据不可用，保护您的业务免于组件故障的威胁。就像硬盘一样，您可以对挂载到 ECS 实例上的云盘做分区、格式化、创建文件系统等操作，并对数据进行持久化存储。

更多云盘介绍可到 [阿里云官方文档](https://www.alibabacloud.com/help/zh/doc-detail/25383.htm?spm=a2c63.p38356.b99.223.7f2d3e9cES5ysy)进行了解。

### 驱动的原理

阿里云盘驱动的原理是通过阿里云盘 SDK 的方式远程创建出来一个云盘实例，供 kubernetes 使用。
阿里云盘根据 kubernetes 的存储规范，实现了一套阿里云 CSI 插件，可以通过 CSI 插件实现 kubernetes 对阿里云盘存储的生命周期管理。云盘 CSI 插件支持动态创建云盘数据卷、挂载数据卷。云盘是一种块存储类型，只能同时被一个负载使用(ReadWriteOnce)。

### 驱动的安装

使用项目 [alibaba-cloud-csi-driver](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

```bash
git clone https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver.git && cd alibaba-cloud-csi-driver
```

创建 k8s 账户

```bash
kubectl create -f ./deploy/rbac.yaml
```

确定账户创建成功

```bash
kubectl get sa -n kube-system
```

观察到 `admin` 账户说明创建成功

##### 创建 csi-plugin

1. 修改 `deploy/disk/disk-plugin.yaml` 中的环境变量 `ACCESS_KEY_ID`，`ACCESS_KEY_SECRET` 两个参数，替换成阿里云平台账户的 `AccessKey` 信息，

2. DaemonSet 的 apiVersion 不能使用版本 `apps/v1beta2` ，经测试可以使用 `apps/v1` 。

阿里云平台账户的 `AccessKey` 信息到阿里云平台的 `AccessKey` 管理页面进行申请。这里不再赘述。

```bash
kubectl create -f ./deploy/disk/disk-plugin.yaml
```

确定是否创建成功

```bash
kubectl get ds -n kube-system
```

观察到 `csi-diskplugin` 的 Ready 为 1 说明该组件成功创建。

##### 创建驱动

1. 修改 `deploy/disk/disk-provisioner.yaml` 中的环境变量 `ACCESS_KEY_ID`，`ACCESS_KEY_SECRET` 两个参数，替换成阿里云平台账户的 accesskey 信息。

2. 在 kubernetes 1.16 版本中 StatefulSet 的 apiVersion 不能使用 `apps/v1beta1` ，经测试可以使用 `apps/v1` 

需要在 spec 下添加 selector 的信息

```bash
selector:
    matchLabels:
      app: csi-disk-provisioner
```

```bash
kubectl create -f ./deploy/disk/disk-provisioner.yaml
```

确定 csi-provisioner 是否创建成功,Ready 为 1 说明成功

```bash
kubectl get statefulset -n kube-system
```

检查 csi-plugin 的状态

```bash
kubectl get pods -n kube-system | grep csi
```

更多驱动安装的请参考 [官方教程](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

### storageClass 的创建

**项目中已经定义好了 storageClass，需根据用户的实例所在区域进行修改方可使用**

**一块云盘只能挂载到同一地域、同一可用区的一台 ECS 实例**

测试所用 ecs 在呼和浩特区，所以我们将 `examples/disk/storageclass.yaml` 文件里面的 `zoneId` 修改成了 `cn-huhehaote-a` ，把 `regionId` 修改成了 `cn-huhehaote`。

```bash
kubectl create -f ./examples/disk/storageclass.yaml
```

### 存储的使用

Rainbond 会检测到 StorageClass 并同步到数据库中，供 Rainbond 控制台用做存储类型选择使用；用户可以到 Rainbond 控制台创建 **有状态存储** 选择刚创建的阿里云盘测试安装情况。

正确创建存储驱动并创建 storageClass 之后，用户可以在 Rainbond 控制台创建 **有状态组件** 使用阿里云盘存储，此时添加存储类型时，可以看到阿里云盘 storageClass 对应的新增存储类型供用户使用。

**阿里云盘最小存储限制为 20G，在添加存储时设定存储大小最小为 20G**。

<img src="https://static.goodrain.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage.jpg" width="100%" />

存储添加后须通过重启组件或者更新组件来触发存储的生效

### 检查结果

存储是否生效可以通过组件是否可以正常启动来判断，组件正常启动则说明组件已经正常挂载了存储，也可以到阿里云盘管理页面确定存储的情况，确定是否存在对应大小的存储，其状态是否是使用中的状态。

<img src="https://static.goodrain.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage2.jpg" width="100%" />