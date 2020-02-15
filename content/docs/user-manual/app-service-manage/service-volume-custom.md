---
title: 组件自定义存储设置
description: Rainbond组件自定义存储的管理文档
weight: 5011
hidden: true
---

### 组件为什么需要自定义存储

上篇文档[组件存储设置](/docs/user-manual/app-service-manage/service-volume)讲到了rainbond默认支持的几种存储类型，结合者互联网行业对高性能存储的需求，rainbond实现了自定义存储类型的需求，用户可以自己安装自定义存储类型供rainbond使用，可以很好的解决rainbond默认存储类型不能满足的高性能存储需求。

现已支持[阿里云盘](/docs/user-manual/app-service-manage/custom-volume/ali-disk)、[ceph-rbd块存储](/docs/user-manual/app-service-manage/custom-volume/ceph-rbd)两种自定义存储，后续会陆续增加对其他类型存储的支持。

### 实现原理

了解rainbond自定义存储类型实现原理之前，需要先了解kubernetes通过storageClass实现的动态提供存储功能。

rainbond在kubernetes实现动态提供存储功能的基础上，与rainbond平台现有存储结合，支持用户自定义存储类型供rainbond平台上的组件使用。

- 自定义存储类型的创建

自定义存储类型的创建需要考虑存储类型的不同，结合各种存储类型特性以及配置等，统一实现资源的定义。kubernetes针对该需求抽象出了storageClass的资源定义，rainbond在kubernetes的基础上，抽象了rainbond的存储类型的定义，用户可以通过rainbond平台自定义存储类型，启用之后会生成对应的storageClass，供控制台用户在组件管理的存储模块选择使用。

- 存储的创建
  
rainbond平台会检测kubernetes集群中存在的storageClass资源，将storageClass资源对象认为是用户自定义的存储类型，供rainbond控制台组件选择使用。
  
在用户通过rainbond控制台组件存储管理中，选择了对应的storageClass类型的自定义存储类型之后，需要通过组件的重启或者升级来使存储的变化生效。此时，rainbond集群组件rbd-worker会根据选择的存储类型找到对应的storageClass，并根据用户的存储需求生成相应的pvc，挂载到组件对应的pod实例上。

待驱动根据pvc创建好pv之后，pvc和pv会形成一对一的绑定关系，此时pvc的状态为绑定状态，此时挂载了该pvc的实例才会继续生命周期的下一步。否则pvc的未绑定状态将会阻止pod实例的正常创建，难以实现rainbond组件正常运行的效果。

- 存储的回收

组件被删除时会发生存储的回收，指定storageClass创建的存储会根据storageClass对应的存储回收策略选择在pvc被删除是是回收该存储还是将该存储恢复并保留或者什么都不做。

用户在添加存储类型的时候可以自己指定相应的存储回收策略。但rainbond在组件删除时只会删除组件对应的pvc，pvc的删除意味着此时pvc绑定的存储会根据storageClass的回收策略进行选择。

### 如何使用

自定义存储类型最关键的步骤就是创建相应的storageClass资源，以及在storageClass背后默默工作的存储驱动。

storageClass的创建有两种方式

* 管理后台自动添加

用户可通过管理后台存储管理功能，创建自定义存储类型，并开启使用。开启后，Rainbond会在kubernetes集群中自动创建对象的StorageClass资源对象。此时控制台的有状态组件可以选择使用。

* 用户手动创建

用户也可以通过手动创建storageClass的方式，直接使用。更多关于storageClass的内容可以到kubernetes[官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#introduction)了解。

用户也可以参考下面的文档了解如何对接阿里云盘和ceph块存储到Rainbond平台。

对接阿里云盘存储到Rainbond平台可参考[Rainbond平台对接阿里云盘](/docs/user-manual/app-service-manage/custom-volume/ali-disk#Rainbond平台对接阿里云盘)
对接ceph块存储到Rainbond平台可参考[Rainbond平台对接ceph-rbd块存储](/docs/user-manual/app-service-manage/custom-volume/ceph-rbd#Rainbond平台对接ceph-rbd块存储)


### 自定义存储缺陷

#### 限制使用

不同的存储类型有着不同的存储服务支持，比如块存储、文件存储和对象存储有着不同的读写模式，单读单写的读写模式只能挂在一次，不能多次使用。为此rainbond平台仅对有状态组件开放使用自定义存储，并且自定义存储类型不可共享给其他组件共同使用。

#### 存储的备份和迁移

自定义存储的实现完全依赖kubernetes，在挂载存储时只会挂载到实例对应的宿主机，并非集群共享，rainbond平台在进行组件备份时不能很好的获取自定义存储的数据并进行数据备份，所以rainbond平台针对使用了自定义存储的组件在应用备份时会跳过数据的备份，仅备份组件使用的存储类型。

### 自定义存储的选择

rainbond平台在应用的分享和备份时都会记录组件使用的存储类型，当使用了自定义存储类型的应用被迁移到其他集群或者通过分享安装的方式安装到其他集群之后，会出现找不到存储类型的情况。针对这个异常情况，rainbond平台设计了一套最优存储类型选择的逻辑。在找不到对应的存储类型时，rainbond平台会根据组件类型以及对存储的期望选择最适合组件的存储类型，默认选择rainbond共享存储。

> 最优存储类型的选择会在后期进行更细致的优化迭代，会综合考虑存储的读写特性、共享特性以及备份恢复策略等相关特性共同决定如何正确且最快的存储类型


