---
title: Rainbond 对接外部存储配置
description: 该章节文档介绍 Rainbond 集群初始化如何对接外部存储
weight: 108
---

初始化集群时如果不配置存储，则默认安装 `NFS` 作为存储。

本文介绍对接外部存储的三种方式：

* 对接阿里云 **NAS** 
* 对接 **GlusterFS**
* 对接其他 **StorageClass**

## 对接阿里云NAS

* 首先需在阿里云创建NAS，可参考阿里云[文件存储NAS](https://help.aliyun.com/product/27516.html)文档

在集群初始化时修改以下参数，参考[集群初始化配置](./init-region/)。

> 在阿里云NAS页面获取server地址，替换下面 NAS_SERVER_ADDR。

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RainbondCluster
metadata:
  name: rainbondcluster
  namespace: rbd-system
spec:
  rainbondVolumeSpecRWX:
    csiPlugin: 
      aliyunNas: {}
    storageClassParameters:
      mountOptions: 
      - "nolock,tcp,noresvport"
      - "vers=4"
      - "minorversion=0"
      - "rsize=1048576"
      - "wsize=1048576"
      - "timeo=600"
      - "retrans=2"
      - "hard"
      parameters: 
        volumeAs: subpath
        archiveOnDelete: "true"
        server: <NAS_SERVER_ADDR>
```



## 对接GlusterFS

参考[安装Gluster分布式存储](../storage/deploy-glusterfs/)文档进行安装。

安装完成后，在集群初始化时修改以下参数，参考[集群初始化配置](../cluster-manage/init-region/)。

> 通过命令 `kubectl get sc` 获取 storageClassName 替换 GFS_CLASS_NAME。
>
> 如有挂载参数请在 storageClassParameters 中指定。

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RainbondCluster
metadata:
  name: rainbondcluster
  namespace: rbd-system
spec:
  rainbondVolumeSpecRWX:
    storageClassName: <GFS_CLASS_NAME>
    storageClassParameters: {}
    #  mountOptions: 
    #  - "vers=4"
```



## 对接其他StorageClass

如需对接其他 StorageClass，Rainbond的要求如下：

* StorageClass创建出来的PV必须是 `spec.nfs` `spec.glusterfs`，以下是示例：

```yaml
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  # nfs or glusterfs
  nfs:
    path: /export/pvc-94cd9160-adba-4950-a7b0-ed6779ec13fb
    server: 10.43.92.23
  persistentVolumeReclaimPolicy: Retain
  storageClassName: rainbondvolumerwx
  volumeMode: Filesystem
```

如上述内容确认没问题，在集群初始化时修改以下参数，参考[集群初始化配置](./init-region)。

> 通过命令 `kubectl get sc` 获取 storageClassName 替换 CLASS_NAME。

> 如有挂载参数请在 storageClassParameters 中指定。

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RainbondCluster
metadata:
  name: rainbondcluster
  namespace: rbd-system
spec:
  rainbondVolumeSpecRWX:
    storageClassName: <CLASS_NAME>
    storageClassParameters: {}
    #  mountOptions: 
    #  - "vers=4"
```

* 如需对接外部NFS存储请参考[文档](../storage/deploy-nfsclient/)

