---
title: Kubernetes migrate across StorageClasss, toggle Rainbond, default SC
description: This paper will describe how to migrate Rainbond default NFS storage to external NFS storage, Kubernetes across StorageClass Migration.
slug: nfs-migration
image: https://static.goodrain.com/wechat/nfs-migration/banner.png
---

[基于主机安装](https://www.rainbond.com/docs/installation/installation-with-ui/host-install-with-ui) or[基于Kubernetes安装](https://www.rainbond.com/docs/installation/installation-with-helm/), where shared files are stored as NFS, run in Pod in Kubernetes, but there are also some unavoidable problems such as unserviceability of the cluster when：NFS SVC cannot communicate without stowing, `dumunt` when server shutdown`s are not allowed to use and `umount\` when the server is closed and so on.

There is, of course, also a need to switch between shared file storage, most of the default installation used during the first installation of Rainbond and want to switch to external NFS after a certain period of time, or NASS on the cloud, etc.

In the original Kubernetes cluster, PVC created through StorageClass cannot modify the store backend, needs to delete PV, PVC and create new PVC through the new StorageClass before migrating data and re-mount PVC.Repeated actions are required when there are many PVC.

Rainbond was also created through StorageClasss, but saved steps to create PV, PVC and remount and repeating actions compared to the native Kubernetes group.Only replace the bottom store class in Rainbond and then migrate the entire directory created by Rainbond and reload it to complete the migration by changing the mount on the page.

This paper will describe how to migrate Rainbond default NFS storage to external NFS storage, roughly in the following steps：

1. Deploy external NFS storage and pair it over K8s.
2. Backup NFS stored data.
3. Restore backup data and switch between Rainbond default storage to external storage.

**Note：**

- Shutdown the running app to avoid data inconsistencies due to incremental data.
- Component mount storage must be shared storage, while others need to be migrated individually.

## Deployment of NFS and pairs to K8s

External NFS storage can choose to deploy NFS dual-machine hot or other options, this is not demonstrated, for example with a single node.

### Deployment of NFS on Centos

1. Install `nfs-utils`

```shell
yum install - y nfs-utils
```

2. Create shared directory

```shell
mkdir -p /data
```

3. Edit `/etc/exports` file, add the following to：

```shell
$ vim /etc/exports

/data *(rw,sync,insecurity,no_subtree_check,no_root_squash)
```

4. When the configuration is completed, execute the following command to start the NFS service：

```shell
systemctl enabling nfs-server
systemctl start nfs-server
```

5. Verify NFS is available

```bash
showmount -e 172.20.251.94
```

### Deployment of NFS Client in K8s

Contains external NFS storage on Kubernetes below, deploy NFS Client Provisioner in Kubernetes

1. Install [Helm](https://www.rainbond.com/docs/ops-guide/tools/#helm-cli) command

2. Add Helm Chart repository

```shell
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

3. Install NFS-Client-Provisioner

```shell
help install nfs-client-provisioner rainbond/nfs-client-provisioner
--set nfs.server=172.20.251.94 \
--set nfs.path=/data \
--version 1.2.8
```

4. Verify that NFS Client is available, create PVC authentication.

```yaml
$ vim test-pvc. aml

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-claim
spec:
  accessModes:
    - ReadWrite Once
  volumeMode: Filesystem
  resources:
    requests:
      storage: 1Gi
  storageClassName: nfs-client
  
$ kubectl apply -f test-pvc. aml
```

Query PVC status is normal for Bound

![](https://static.goodrain.com/wechat/nfs-migration/1.png)

## Backup default NFS data

View all PVC under `rbd-system`.

```bash
kubtl get pvc -n rbd-system
```

![](https://static.goodrain.com/wechat/nfs-migration/2.png)

| PVC Name               | Explanation                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Data                   | Test if storage is created by default (useless)                                                            |
| Data-nfs-provisioner-0 | The default path used by NFS Pod is below the host's `/opt/rainbond/data/nfs`.                                |
| Data-rbd-monitor-0     | Store monitored data.(may not)                                                             |
| rbd-api                | Store api request log.(may not)                                                            |
| rbd-chaos-cache        | Store build component cache (max not)                                                                      |
| rbd-cpt-grdata         | All components on the platform mount shared storage data and the component logs.(Required) |
| rbd-db-rbd-db-0-0      | Store MySQL data. Default is local and not stored in NFS.                                     |
| rbd-etcd-rbd-etcd-0    | Store Etcd data. Default is local and is not stored in NFS.                                   |
| rbd-hub                | Store image data (required)                                                                                |

The above data include `rbd-cpt-grdata` and `rbd-hub`, searched under the name `VOLUME` under the default storage directory `/opt/rainbond/data/nfs`, e.g. `pvc-9ec619e3-1e20-4d7a-b744-a04088fb6c3`.

![](https://static.goodrain.com/wechat/nfs-migration/3.png)

Sync data to the new NFS storage server using the rsync sync sync, start syncing according to the following commands and modify the commands as it is.

```shell
rsync -avP /opt/rainbond/data/nfs/pvc-9ec619e3-1e20-4d7a-b744-aa04088fb6c3 root@172.20.251.94:/data
rsync -avP /opt/rainbond/data/nfs/pvc-d0bf09ca-5543-4050-bd08-b02ebb593b4e root@172.20.251.94:/data
```

**Note：data is synced to check the integrity of the data.**

## Toggle Rainbond Storage

### Change Rainbond Default Storage

1. Change `rainboncluster` CRD resource, add `storageClassName`

```yaml
$ kubectl edit rainbondcluster-n rbd-system

spec:
  rainbondVolummeSpecRWX:
    storageClassName: nfs-client #Sc created by NFS-Client-Provisioner
```

2. Modify `rainbondvolmes ``CRD resource, change `storageClassName`to`nfs-client\`

```yaml
$kubtl edit rainbondvolmes -n rbd-system

spec:
  storageClassName: nfs-client
```

3. Remove Rainbond from the default NFS based on the StorageClass `rainbondssss` `rainboldssc`

```bash
kubtl delete scan rainbondssscsc
```

4. Delete old PVC from `rbd-system` namespace.This will not be deleted because POD ends with this PVC, before `ctrlc`.

```bash
kubtl delete pvc data data-rbd-monitor-0 rbd-api rbd-chaos-cache rbd-cpt-grdata rbd-hub -n rbd-system
```

5. The controller that removed the Rainbond component allowed `rainbond-operator` to control PVC recreation.

```shell
kubectl delete deley rbd-api -n rbd-system
kubectl delete dds rbd-chaos -n rbd-system
kubectl delete rbd-monitor -n rbd-system
kubectl delete deley rbd-worker -n rbd-system
kubtl delete dey rbd-hub -n rbd-system
kubectl delete deley rbd-resource-proxy -n rbd-system
kubectl delete d-eventlog -n rbd-system
kubtl delete d-node -n rbd-system
```

```bash
kubtl delete pod -l release=rainbond-operator, n rbd-system
```

Wait for all POD to rebuild. Rainbond platform will be available for normal work after it has been created.

### Restore data

Restore the previous backup data to the newly created PVC below.

![](https://static.goodrain.com/wechat/nfs-migration/4.png)

For `rbd-cpt-grdata` and `rbd-hub` new directories are automatically created and deleted first.

```bash
rm -rf /data/rbd-system-rbd-cpt-grdata-pvc-44167209-1006-4de5-9801-afcce996449c/*
rm -rf /data/rbd-system-rbd-hub-pvc-c326b89f-7c0e-4990-a8e2-31472799c8/*
```

Synchronize the backup `rbd-cpt-grdata` and `rbd-hub` data to the new directory, e.g. the following command.

```bash
rsync -avP /data/pvc-9ec619e3-1e20-4d7a-b744-aa04088fb6c3/*/data/rbd-system-rbd-cpt-grdata-pvc-44167209-1006-4de5-9801-afcce996449c
rsynnc -avP /data/pvc-d0bf09ca-5543-4050-bd08-b02ebb593b4e/data/rbd-system-rbd-hub-pvc326b89f-7c0e-4990-a8e2-31472799c8 cc8
```

**Note：data is synced to check the integrity of the data.**

Restart POD of part of Rainbond components takes effect.

```bash
kubtl delete pod -l name=rbd-api -n rbd-system
kubectl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-monitor-rbd-system
kubtl delete pod -l name=rbd-wacker -n rbd-system
kubtl delete -l name=rbd-hub -n rbd-system
kubectl ete -l name=rbd-resource-proxy -n rbd-system
kubtl delete pod -l name=rbd-name=rbd-eventlog -n rbd-system
kubectl delete pod -l name=rbd-
```

### Change Component Storage on Rainbond

When the bottom storage is replaced, the store of the component over Rainbond has not been modified. You will need to re-add the current store to the component of Rainbon.

![](https://static.goodrain.com/wechat/nfs-migration/5.png)

Mount path and store type will be left unchanged, delete the current configuration and add a new one.

To complete this storage, please verify that the app's data are complete.

### Remove default NFS storage resource (optional)

Change CRD resource, set `nfs-provisioner` to 0

```yaml
$kubtl edit rbdcomponent nfs-provisioner -n rbd-system

spec:
  replas: 0
```

Delete `nfs-provisioner` controller

```shell
kubtl delete costs nfs-provisioner -n rbd-system
```

Delete nfs-provisioner PV, PVC

```bash
kubtl delete pvc data-nfs-provisioner-0 -n rbd-system
kubectl delete pv nfs-provisioner
```

Remove NFS data storage directory on host

```bash
rm -rf /opt/rainbond/data/nfs
```
