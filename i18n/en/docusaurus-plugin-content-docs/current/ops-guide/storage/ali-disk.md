---
title: Alibaba Cloud Disk
description: Alibaba Cloud provides block-level block storage for cloud server ECS
weight: 5015
---

### Cloud Disk Overview

Cloud disk is a block-level block storage product provided by Alibaba Cloud for cloud server ECS, featuring low latency, high performance, durability, and high reliability.

The cloud disk adopts a distributed three-copy mechanism to provide 99.9999999% data reliability guarantee for ECS instances.Supports automatic replication of your data within the Availability Zone, preventing data unavailability caused by unexpected hardware failures, and protecting your business from the threat of component failures.Just like hard disks, you can partition, format, and create file systems for cloud disks mounted on ECS instances, and store data persistently.

For more cloud disk introduction, please refer to [Cloud Official Document](https://www.alibabacloud.com/help/zh/doc-detail/25383.htm?spm=a2c63.p38356.b99.223.7f2d3e9cES5ysy)for more information.

### The principle of driving

The principle of Alibaba Cloud Disk driver is to create a cloud disk instance remotely through the Alibaba Cloud Disk SDK for use by kubernetes. Alibaba Cloud Disk implements a set of Alibaba Cloud CSI plug-ins according to the storage specification of Kubernetes, which can realize the lifecycle management of Alibaba Cloud disk storage by kubernetes.The cloud disk CSI plug-in supports dynamic creation and mounting of cloud disk data volumes.Cloud disk is a type of block storage that can only be used by one load at the same time (ReadWriteOnce).

### driver installation

Using project [alibaba-cloud-csi-driver](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

```bash
git clone https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver.git && cd alibaba-cloud-csi-driver
```

Create k8s account

```bash
kubectl create -f ./deploy/rbac.yaml
```

Make sure the account was created successfully

```bash
kubectl get sa -n kube-system
```

Observed that the account `admin` was created successfully

##### Create csi-plugin

1. Modify the environment variables `ACCESS_KEY_ID`and`ACCESS_KEY_SECRET` in `deploy/disk/disk-plugin.yaml` and replace them with the `AccessKey` information of the Alibaba Cloud platform account,

2. The apiVersion of DaemonSet cannot use version `apps/v1beta2` , and can use `apps/v1` after testing.

The `AccessKey` information of the Alibaba Cloud platform account can be applied to the `AccessKey` management page of the Alibaba Cloud platform.I won't go into details here.

```bash
kubectl create -f ./deploy/disk/disk-plugin.yaml
```

Determine if the creation is successful

```bash
kubectl get ds -n kube-system
```

It is observed that the Ready of `csi-diskplugin` is 1, indicating that the component was successfully created.

##### Create driver

1. Modify the environment variables `ACCESS_KEY_ID`and`ACCESS_KEY_SECRET` in `deploy/disk/disk-provisioner.yaml` and replace them with the accesskey information of the Alibaba Cloud platform account.

2. In the kubernetes 1.16 version, the apiVersion of StatefulSet cannot use `apps/v1beta1` , after testing, it can use `apps/v1`

Need to add selector information under spec

```bash
selector:
    matchLabels:
      app: csi-disk-provisioner
```

```bash
kubectl create -f ./deploy/disk/disk-provisioner.yaml
```

Determine whether the csi-provisioner is successfully created, if Ready is 1, it means success

```bash
kubectl get statefulset -n kube-system
```

Check the status of csi-plugin

```bash
kubectl get pods -n kube-system | grep csi
```

For more driver installation, please refer to [official tutorial](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

### Creation of storageClass

**The storageClass has been defined in the project, and it needs to be modified according to the region where the user's instance is located before it can be used.**

**A cloud disk can only be attached to one ECS instance in the same region and same availability zone**

The ecs used in the test is in Hohhot, so we changed `zoneId` in the `examples/disk/storageclass.yaml` file to `cn-huhehaote-a` , and changed `regionId` to `cn-huhehaote`.

```bash
kubectl create -f ./examples/disk/storageclass.yaml
```

### use of storage

Rainbond will detect the StorageClass and synchronize it to the database for the Rainbond console to use for storage type selection; users can go to the Rainbond console to create **stateful storage** select the Alibaba cloud disk just created to test the installation.

After the storage driver is correctly created and the storageClass is created, the user can create **stateful components** in the Rainbond console to use Alibaba Cloud storage. When adding a storage type, you can see the new storage type corresponding to Alibaba Cloud storageClass for users to use .

**The minimum storage limit of Alibaba cloud disk is 20G, and the minimum storage size is set to 20G when adding storage**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage.jpg" width="100%" />

After the storage is added, the storage must be restarted or updated to trigger the storage to take effect.

### test result

Whether the storage is effective can be judged by whether the component can be started normally. The component starts normally, indicating that the component has mounted the storage normally. You can also go to the Alibaba Cloud Disk Management page to determine the storage status, determine whether there is storage of the corresponding size, and whether its status is is in use.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage2.jpg" width="100%" />