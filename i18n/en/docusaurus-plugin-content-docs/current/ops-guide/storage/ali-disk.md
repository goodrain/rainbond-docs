---
title: Aliyun Cloud
description: Ali Cloud provides block level data storage for cloud server ECS
---

### Cloud Overview

The cloud is a block-storage product at the ECS level provided by Aliyun for the cloud server and features low timing, high performance, persistence, and high reliability.

Cloud disks use a three-copy distribution mechanism to provide ECS examples with 99.999999% assurance of data reliability.Support automatic copy of your data within available areas to prevent unavailable data due to unexpected hardware failures, and protect your business from the threat of component failures.Like a hard drive, you can partition, formatt, create filesystem and other actions for clouds mounted on ECS instances.

More cloud presentations are available at [阿里云官方文档](https://www.alibabacloud.com/help/en/doc-detail/25383.htm?spm=a2c63.p38356.b99.223.7f2d3e9cES5ysy).

### Rationale for driving

The AliyCloud Driven doctrine is a cloud instance created remotely via the Ari cloud SDK for kubernetes.
Based on kubernetes storage specifications, an Ali-Cloud CSI plugin has been implemented to implement kubernetes life-cycle management of Ari cloud storage via CSI plugin.The cloud CSI plugin supports dynamic creation of cloud data volumes, mount data volumes.The cloud is a block storage type that can only be used by one load at the same time (ReadWriteOnce).

### Driver Installation

Use item [alibaba-cloud-csi-driver](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

```bash
git clone https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver.git && cd alibaba-cloud-csi-driver
```

Create k8s account

```bash
kubtl create -f ./deploy/rbac.yaml
```

Confirm account creation successful

```bash
kubtl get sa -n kube-system
```

The `admin` account description was successfully created.

##### Create csi-plugin

1. Change the environmental variable `ACCESS_KEY_ID`, `ACCES_KEY_SECRET` to replace the `AccessKey` information with the account of the Aliyun platform,

2. The apiVersion of DaemonSet cannot be used with version `apps/v1beta2`, but can be tested using `apps/v1`.

The `AccessKey` information on the Aliyun Platform account is requested to the `AccessKey` management page of the Aliyun platform.It is not repeated here.

```bash
kubtl create -f ./Deploy/disk/disk-plugin.yaml
```

Determines whether or not created successfully

```bash
kubtl get d-n kube-system
```

The `csi-diskplugin` already observed as 1 indicates that the component was successfully created.

##### Create driver

1. Change the environmental variable `ACCESS_KEY_ID`, `ACCES_KEY_SECRET` to replace the access key information with the account of the Aliyun platform.

2. The apiVersions of StatefulSet in kubernetes 1.16 cannot use `apps/v1beta1`, but `apps/v1` can be tested

Selector information is required under spec

```bash
selector:
    matchLabels:
      app: csi-disk-provisioner
```

```bash
kubtl create -f ./Deploy/disk/disk-provisioner.yaml
```

Determines whether csi-provisioner has been created successfully,Ready is 1 successful

```bash
kubtl get stateset -n kube-system
```

Check csi-plugin status

```bash
kubtl get methods — n kube-system | grep csi
```

For more drivers installing please refer to [官方教程](https://github.com/kubernetes-sigs/alibaba-cloud-csi-driver/blob/master/docs/disk.md)

### StorageClass creation

**StorageClasses are already defined in the project and need to be modified according to the user's instance area**

**A cloud can only be mounted on a single ECS instance in the same geographical area and the same available area**

The test is in the Haute Zone, so we change the `zoneId` in the `examples/disk/storageclass.yaml` to `cn-huhehaote-a` and `regionId` to `cn-huhehaote`.

```bash
kubtl create -f ./examples/disk/storageclass.yaml
```

### Storage usage

Rainbond will detect StorageClass and synchronize it into the database for use by Rainbond Console as a storage type; users can use the Rainbond Console to create **Status Storage** to select the newly created AliyClasses to test installation.

After creating the storage driver correctly and the storageClasss, users can create **state-component parts** in the Rainbond Console and use Ali-cloud storage when adding storage types, you can see the new additional storage type for the user.

**Minimum storage limit is 20G, and minimum size is 20G** when adding storage.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage.jpg" width="100%" />

Storage must be added by restarting the component or updating it to trigger the desired effect.

### Check results

Whether the storage is effective can be determined by whether the component can be started normally, and the component is started properly indicates that the component has been mounted and can also be found on the AliyCloud Management page to determine if there is a stock size and whether its status is in use.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/storage/aliclouddisk/alistorage2.jpg" width="100%" />
