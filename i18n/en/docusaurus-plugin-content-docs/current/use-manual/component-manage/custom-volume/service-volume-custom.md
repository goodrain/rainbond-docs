---
title: Component Custom Storage Settings
description: Rainbond component custom storage management documentation
---

### Why do components need custom storage

The previous document [Component Storage Settings](./index) mentioned several storage types that Rainbond supports by default. Different enterprises and different businesses have different storage requirements.For example, the big data business needs high-performance storage, etc.Rainbond implements the requirements of custom storage types. Users can install custom storage types for Rainbond to use, which can well solve the high-performance storage requirements that Rainbond's default storage types cannot meet.比如大数据业务对高性能存储的需求等。Rainbond 实现了自定义存储类型的需求，用户可以自己安装自定义存储类型供 Rainbond 使用，可以很好的解决 Rainbond 默认存储类型不能满足的高性能存储需求。

### Implementation principle

Before understanding the implementation principle of Rainbond custom storage type, you need to understand the dynamic provisioning storage function implemented by kubernetes through storageClass.

On the basis of kubernetes' dynamic provision of storage, Rainbond is combined with the existing storage of the Rainbond platform to support user-defined storage types for components on the Rainbond platform.

- Creation of custom storage types

自定义存储类型的创建需要考虑存储类型的不同，结合各种存储类型特性以及配置等，统一实现资源的定义。The creation of custom storage types needs to consider the different storage types, and combine the characteristics and configurations of various storage types to implement the definition of resources in a unified manner.Kubernetes abstracts the resource definition of storageClass for this requirement, and Rainbond abstracts the definition of Rainbond's storage type on the basis of kubernetes. Users can customize the storage type through the Rainbond platform. After activation, the corresponding storageClass will be generated for console users. The storage module selection in component management is used.

- creation of storage

The Rainbond platform will detect the storageClass resource existing in the kubernetes cluster, and regard the storageClass resource object as a user-defined storage type for the Rainbond console component to choose and use.

After the user selects a custom storage type of the corresponding storageClass type in the component storage management of the Rainbond console, it is necessary to restart or upgrade the component to make the storage change take effect.At this point, the Rainbond cluster component rbd-worker will find the corresponding storageClass according to the selected storage type, and generate the corresponding pvc according to the user's storage requirements, and mount it on the pod instance corresponding to the component.此时，Rainbond 集群组件 rbd-worker 会根据选择的存储类型找到对应的 storageClass，并根据用户的存储需求生成相应的 pvc，挂载到组件对应的 pod 实例上。

待驱动根据 pvc 创建好 pv 之后，pvc 和 pv 会形成一对一的绑定关系，此时 pvc 的状态为绑定状态，此时挂载了该 pvc 的实例才会继续生命周期的下一步。After the driver creates the pv according to the pvc, the pvc and the pv will form a one-to-one binding relationship. At this time, the pvc state is the bound state, and the instance that mounts the pvc will continue to the next step of the life cycle.Otherwise, the unbound state of pvc will prevent the normal creation of pod instances, and it is difficult to achieve the normal operation of the Rainbond component.

- storage recycling

Storage reclamation occurs when a component is deleted. The storage created by the specified storageClass will choose whether to reclaim the storage when the pvc is deleted, restore the storage and keep it, or do nothing according to the storage reclamation policy corresponding to the storageClass.

用户在添加存储类型的时候可以自己指定相应的存储回收策略。When adding a storage type, users can specify the corresponding storage reclamation policy by themselves.However, Rainbond will only delete the pvc corresponding to the component when the component is deleted. The deletion of the pvc means that the storage bound by the pvc will be selected according to the recycling strategy of the storageClass.

### How to add storage

For connecting ceph block storage to Rainbond platform, please refer to [Rainbond platform connecting ceph-rbd block storage](https://t.goodrain.com/d/8324-rook-ceph-v18)

### Custom Storage Defects

#### limited use

Different storage types have different storage service support. For example, block storage, file storage, and object storage have different read-write modes. The read-write mode of single-read-single-write can only be linked once and cannot share read and write.Currently, the Rainbond platform only opens custom storage for stateful components, and custom storage types cannot be shared with other components.目前 Rainbond 平台仅对有状态组件开放使用自定义存储，并且自定义存储类型不可共享给其他组件共同使用。

#### Backup and Migration of Storage

The implementation of custom storage is completely dependent on kubernetes. When the storage is mounted, it will only be mounted to the host corresponding to the instance, not the cluster sharing. The Rainbond platform cannot well obtain the data of the custom storage and perform data backup when performing component backup. , so the Rainbond platform currently skips data backup for components that use custom storage, and only backs up the storage type used by the component.

### Custom storage options

The Rainbond platform will record the storage type used by components during application sharing and backup. When an application using a custom storage type is migrated to other clusters or installed to other clusters by sharing installation, the storage type cannot be found. Case.In response to this abnormal situation, the Rainbond platform has designed a set of optimal storage type selection logic.When the corresponding storage type cannot be found, the Rainbond platform will select the storage type that is most suitable for the component according to the component type and storage expectations, and the Rainbond shared storage is selected by default.针对这个异常情况，Rainbond 平台设计了一套最优存储类型选择的逻辑。在找不到对应的存储类型时，Rainbond 平台会根据组件类型以及对存储的期望选择最适合组件的存储类型，默认选择 Rainbond 共享存储。

> The selection of the optimal storage type will carry out more detailed optimization iterations in the later stage, and will comprehensively consider the storage read-write characteristics, sharing characteristics, backup and recovery strategies and other related characteristics to jointly determine the correct and fastest storage type.

### 如何查找储存的真实路径

#### 基于主机安装或者helm安装

如果基于主机安装或者helm安装，可以通过[grctl](https://rainbond.com/docs/ops-guide/tools/grctl/)查找到对应的存储路径，

可以通过组件页面的伸缩一栏目 找到 grctl命令，例如这样的命令：

```shell
grctl service get gr84870f -t 8azkmbyj
```

执行此命令后 可以看到类似于这样的一行，这代表了您的储存暴露的路径。您通过mount可以正常访问到该储存

```shell
path: /export/pvc-d517b813-b366-4c38-981a-c2efe1ef1d5b/tenant/9b69ea29400d4364ad76381fe7f83c97/service/b38506ac0eec2b5e73867498e684870f/tmp1 |
```

您可以进去nfs所在节点查找目录，以下是nfs默认的储存路径`/opt/rainbond/data/nfs/`

所以完整的储存的文件地址为 `/opt/rainbond/data/nfs/pvc-d517b813-b366-4c38-981a-c2efe1ef1d5b/tenant/9b69ea29400d4364ad76381fe7f83c97/service/b38506ac0eec2b5e73867498e684870f/tmp1`

#### 基于 一键安装

一键安装是将所有的rainbond组件跑到k3s中，储存的所有文件在 `/root/rainbonddata/k3s/storage` 目录下。

进入docker容器，这个容器包含了k3s以及所有的rainbond组件。

```shell
docker exec -it rainbond-allinone bash
```

执行命令 `kubectl get pvc -n rbd-system rbd-cpt-grdata`

```shell
root@59d72aa2859e:/app/ui# kubectl get pvc -n rbd-system rbd-cpt-grdata
NAME             STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
rbd-cpt-grdata   Bound    pvc-39957e04-a3f2-4ce8-b8d8-4dff239ab975   20Gi       RWO            local-path     78m
```

可以看到VOLUME为 `pvc-39957e04-a3f2-4ce8-b8d8-4dff239ab975`
那么路径为 `/root/rainbonddata/k3s/storage/pvc-39957e04-a3f2-4ce8-b8d8-4dff239ab975_rbd-system_rbd-cpt-grdata`

然后最后拼接上`页面`显示出来的路径`/tenant/9b69ea29400d4364ad76381fe7f83c97/service/c7d35d174c8a4945a578397f9b724815/var/lib/mysql`

最后完整的路径为 `/root/rainbonddata/k3s/storage/pvc-39957e04-a3f2-4ce8-b8d8-4dff239ab975_rbd-system_rbd-cpt-grdata/tenant/03fdeb512531496895ad493e347799f8/service/794db4358fd2866c7509b76e912c174a/test/1.txt`
