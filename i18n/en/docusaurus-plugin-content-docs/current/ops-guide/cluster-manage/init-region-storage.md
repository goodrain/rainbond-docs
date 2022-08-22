---
title: Rainbond docking with external storage configuration
description: This chapter documents how the Rainbond cluster initialization connects to external storage
weight: 108
---

If no storage is configured when the cluster is initialized, `NFS` is installed as storage by default.

This article introduces three ways to connect to external：

* Docking with Alibaba Cloud **NAS**
* Docking **GlusterFS**
* Docking other **StorageClass**

## Docking with Alibaba Cloud NAS

* First, you need to create a NAS in Alibaba Cloud, you can refer to Alibaba Cloud[File Storage NAS](https://help.aliyun.com/product/27516.html)document

Modify the following parameters during cluster initialization, refer to[Cluster initialization configuration](./init-region/).

> Obtain the server address on the Alibaba Cloud NAS page and replace the following NAS_SERVER_ADDR.

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
      - "nolock,tcp ,noresvport"
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



## Docking with GlusterFS

Refer to the[Gluster Distributed Storage](../storage/deploy-glusterfs/)document for installation.

After the installation is complete, modify the following parameters during cluster initialization, refer to[Cluster initialization configuration](../cluster-manage/init-region/).

> Get storageClassName by command `kubectl get sc` Replace GFS_CLASS_NAME.
> 
> If there are mount parameters, please specify them in storageClassParameters.

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
    # mountOptions: 
    # - "vers=4 "
```



## Docking with other StorageClass

To connect to other StorageClasses, Rainbond's requirements are as follows：

* The PV created by StorageClass must be `spec.nfs` `spec.glusterfs`, the following is example：

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

If the above content confirms that there is no problem, modify the following parameters during cluster initialization, refer to[cluster initialization configuration](./init-region).

> Get storageClassName by command `kubectl get sc` Replace CLASS_NAME.

> If there are mount parameters, please specify them in storageClassParameters.

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
    # mountOptions: 
    # - "vers=4 "
```

* For connecting to external NFS storage, please refer to[](../storage/deploy-nfsclient/)

