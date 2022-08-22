---
title: Rook-Ceph docking solution
description: High-performance block storage device
weight: 5015
---

## Overview

**Ceph** introduced a new RBD protocol, the Ceph Block Device.RBD provides clients with reliable, distributed, high-performance block storage.RBD blocks are distributed over multiple Ceph objects in stripes, and these objects are themselves distributed in the entire Ceph storage cluster, thus ensuring data reliability and performance.RBD is already supported by the Linux kernel, in other words, the RBD driver has been well integrated with the Linux kernel over the past few years.Almost all Linux operating system distributions support RBD.In addition to reliability and performance, RBD also supports other enterprise-grade features such as full and incremental snapshots, thin provisioning, copy-on-write clones, and more.RBD also supports full in-memory caching, which can greatly improve its performance.

**Rook** is an open source cloud-native storage orchestration tool that provides platform-framework-level complex storage solutions for cloud-native environments.Ceph operator received stable support in the Rook v0.9 version in December 2018. Users can implement Ceph storage-oriented installation, operation and maintenance management based on Rook, and provide an excellent cloud-native storage experience.

## Install and deploy

Using Rook to install and deploy a Ceph cluster only needs to use a simple `kubectl` command. Before the installation starts, you need to pay attention to the following prerequisites.

### Preconditions

- Deployed Kubernetes cluster with version **v1.16** or higher.

- The cluster has at least 3 nodes to deploy the ceph storage cluster.

- The minimum recommended kernel version is **5.4.13**.If the kernel version is lower than 5.4.13, you need to upgrade the kernel.

- The servers in the storage cluster need to synchronize the time, the official requirement is 0.05 seconds, and do scheduled tasks.

- Install the lvm package

  - CentOS

    ```bash
    sudo yum install -y lvm2
    ```

  - Ubuntu

    ```bash
    sudo apt-get install -y lvm2
    ```

- Storage meets one of the following options：

  - Raw device (no partition or formatted file system)
  - Raw partition (unformatted file system)

If the disk has been used before and needs to be cleaned up, use the following script to clean up

```bash
#!/usr/bin/env bash
DISK="/dev/vdc" #Modify your own drive letter information as needed

# Zap the disk to a fresh, usable state (zap-all is important, b/c MBR has to be clean)

# You will have to run this step for all disks.
sgdisk --zap-all $DISK

# Clean hdds with dd
dd if=/dev/zero of="$DISK" bs=1M count=100 oflag=direct,dsync

# Clean disks such as ssd with blkdiscard instead of dd
blkdiscard $DISK

# These steps only have to be run once on each node
# If rook sets up osds using ceph-volume, teardown leaves some devices mapped that lock the disks.
ls /dev/mapper/ceph-* | xargs -I% -- dmsetup remove %

# ceph-volume setup can leave ceph-<UUID> directories in /dev and /dev/mapper (unnecessary clutter)
rm -rf /dev/ceph-*
rm -rf /dev/mapper/ceph--*

# Inform the OS of partition table changes
partprobe $DISK
```

### Deploy Rook-Ceph

#### Deploy the Rook Operator

```bash
 git clone -b release-1.8 https://github.com/goodrain/rook.git && cd rook/deploy/examples/
 kubectl create -f crds.yaml -f common.yaml -f operator.yaml
```

If it is Running, the operator is deployed successfully

```bash
$ kubectl -n rook-ceph get pod
NAME READY STATUS RESTARTS AGE
rook-ceph-operator-b89545b4f-j64vk 1/1 Running 0 4m20s
```

#### Create a Ceph cluster

> {kube-node1,kube-node2,kube-node3} should be replaced here with the node name of the current cluster node.

- label nodes

Set：ceph-mon=enabled for nodes running ceph-mon

```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} ceph-mon=enabled
```

For the node running ceph-osd, that is, the storage node,：ceph-osd=enabled

```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} ceph-osd=enabled
```

For nodes running ceph-mgr, set：ceph-mgr=enabled

ceph-mgr can only run at most 2

```bash
kubectl label nodes {kube-node1,kube-node2} ceph-mgr=enabled
```

- Create a cluster

**Before creating, modify the node name and corresponding drive letter in the `storage.node`field**

```bash
kubectl create -f cluster.yaml
```

#### Verify Ceph Cluster

View the following pod startup through the command line, indicating success：

```
kubectl get po -n rook-ceph
```

![](https://pic.imgdb.cn/item/61e0cd882ab3f51d91f07560.png)

Install the toolbox, which contains the command-line tools required for：cluster management

```bash
$ kubectl create -f toolbox.yaml
$ kubectl get po -l app=rook-ceph-tools -n rook-ceph
NAME READY STATUS RESTARTS AGE
rook-ceph-tools-76876d788b-qtm4j 1/1 Running 0 77s
```

Use the following command to determine the Ceph cluster state：

```bash
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
$ ceph status
  cluster:
    id: 8bb6bbd4-ec90-4707-85d7-903551d08991
    health: HEALTH_OK #If this word appears, the cluster is normal

  services:
    mon: 3 daemons, quorum a,b,c (age 77s)
    mgr: b(active, since 27s), standbys: a
    osd: 6 osds: 6 up (since 37s), 6 in (since 56s)

  data:
    pools: 1 pools, 1 pgs
    objects: 0 objects, 0 B
    usage: 31 MiB used, 750 GiB / 750 GiB avail #Total disk capacity, confirm whether it is the same as the actual capacity
    pgs: 1 active +clean
```

### provide storage

Rook-ceph provides three types of storage, all of which can be used in Rainbond (version requirements not lower than v5.7.0-release).：

- **[Block](https://rook.io/docs/rook/v1.8/ceph-block.html)**：Create block storage used by Pod (RWO).The stateful service component in the Rainbond platform can select `rook-ceph-block` to apply for and mount block storage when adding storage.
- **[Shared file system](https://rook.io/docs/rook/v1.8/ceph-filesystem.html)**：Creates a file system (RWX) that is shared across multiple Pods.When installing Rainbond, it can be docked in the following way.The service component in the Rainbond platform selects the default shared storage when adding storage, and can connect to the cephfs shared file system.
- **[Object](https://rook.io/docs/rook/v1.8/ceph-object.html)**：Create an object store that can be accessed inside or outside the Kubernetes cluster.This storage type can be connected to Rainbond's object storage settings to provide support for functions such as cloud backup and recovery.



### Create shared storage

Label the node running mds：role=mds-node, usually three nodes of Ceph

```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} role=mds-node
```

```bash
$ kubectl create -f filesystem.yaml
$ kubectl -n rook-ceph get pod -l app=rook-ceph-mds
NAME READY STATUS RESTARTS AGE
rook-ceph-mds-sharedfs-a-785c845496-2hcsz 1/1 Running 0 17s
rook-ceph-mds-sharedfs-b-87df7847-5rvx9 1/1 Running 0 16s
```

Before Rook can start provisioning storage, a StorageClass needs to be created from the filesystem.This is required for Kubernetes to interoperate with the CSI driver to create persistent volumes.

```bash
$ kubectl create -f storageclass-sharedfs.yaml
$ kubectl get sc
NAME PROVISIONER RECLAIMPOLICY VOLUMEBINDINGMODE ALLOWVOLUMEEXPANSION AGE
rook-cephfs rook-ceph.cephfs.csi.ceph.com Delete Immediate false 72m
```

### Create block storage

```bash
kubectl create -f storageclass-block.yaml
$ kubectl get storageclass rook-ceph-block
NAME PROVISIONER RECLAIMPolicy VOLUMEBINDINGMODE ALLOWVOLUMEEXPANSION AGE
rook-ceph-block rook-ceph.rbd.csi.ceph.com Delete Immediate true 79m
```

After obtaining the storageclass, it has been created successfully. On the platform, stateful components can choose block storage for use.

### Create an object store

add tag

```bash
# Add node label
kubectl label nodes {kube-node1,kube-node2,kube-node3} rgw-node=enabled
# Create the object store
kubectl create -f object.yaml
# To confirm the object store is configured, wait for the rgw pod to start
kubectl -n rook -ceph get pod -l app=rook-ceph-rgw
```

Create StorageClass

```bash
cat > storageclass-bucket-delete.yaml <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: rook-ceph-bucket
provisioner: rook-ceph.ceph.rook.io/ bucket
reclaimPolicy: Delete
parameters:
  objectStoreName: my-store
  objectStoreNamespace: rook-ceph
EOF
```

```bash
$ kubectl create -f storageclass-bucket-delete.yaml
```

Create Bucket Claim

```bash
cat > object-bucket-claim-delete.yaml <<EOF
apiVersion: objectbucket.io/v1alpha1
kind: ObjectBucketClaim
metadata:
  name: ceph-bucket
  namespace: rook-ceph
spec:
  generateBucketName: ceph-bkt
  storageClassName: rook-ceph-bucket
EOF
```
```bash
$ kubectl create -f object-bucket-claim-delete.yaml
```

After the creation is complete, the following is to verify.

```bash
$ kubectl get svc rook-ceph-rgw-my-store -n rook-ceph
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
rook-ceph-rgw-my-store ClusterIP 10.43.4.250   <none>        80/TCP 3h32m
# The following return indicates that the bucket has been created
$ curl 10.43.4.250
<?xml version="1.0" encoding="UTF-8"?><ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>anonymous</ID><DisplayName></DisplayName></Owner><Buckets></Buckets></ListAllMyBucketsResult>
```

```bash
# Get connection information
$ kubectl -n rook-ceph get cm ceph-bucket -o jsonpath='{.data.BUCKET_HOST}'
rook-ceph-rgw-my-store.rook-ceph.svc
$ kubectl -n rook-ceph get secret ceph-bucket -o jsonpath='{.data.AWS_ACCESS_KEY_ID}' | base64 --decode
LV9A2S7F6A8SS3NPD9Z0
$ kubectl -n rook-ceph get secret ceph-bucket -o jsonpath='{.data.AWS_SECRET_ACCESS_KEY}' | base64 --decode


# Get bucket name $ kubectl get ObjectBucketClaim -n rook-ceph ceph-bucket -o yaml|grep "bucketName: ceph-bkt"
  bucketName: ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf
```

```bash
# Enter the tools container to verify
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash

export AWS_HOST=10.43.4.250
export AWS_ENDPOINT=10.43.4.250:80
export AWS_ACCESS_KEY_ID=LV9A2S7F6A8SS3NPD9Z0
export AWS_SECRET_ACCESS_KEY =hzuHLEjtPvaX0N4hLIJBRzP4erjMdHsuHMqeyUuW
# write it to the credentials file
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF
```

#### PUT or GET object

Upload files to the newly created bucket

```bash
echo "Hello Rook" > /tmp/rookObj
s5cmd --endpoint-url http://$AWS_ENDPOINT cp /tmp/rookObj s3://ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf
```

Download and verify files from bucket

```bash
$ s5cmd --endpoint-url http://$AWS_ENDPOINT cp s3://ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf/rookObj /tmp/rookObj-download
$ cat /tmp/rookObj-downloadcat 
Hello Rook
```

#### For external access to the cluster

Run the svc address as a third-party component on the platform and open the external access policy, you can access it through the external access policy

```bash
$ kubectl -n rook-ceph get service rook-ceph-rgw-my-store
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
rook-ceph-rgw-my-store ClusterIP 10.43.4.250   <none>        80/TCP 3h40m
```

### Visit the dashboard

Modify Ceph cluster configuration to disable dashboard built-in ssl：

```bash
$ kubectl -n rook-ceph edit cephcluster -n rook-ceph rook-ceph
# Modify ssl to false
spec:
  dashboard:
    enabled: true
    ssl: false

# Restart the operator to make the configuration take effect
$ kubectl delete po - l app=rook-ceph-operator -n rook-ceph
```

Get svc, proxy in the form of third-party components on the platform

```bash
$ kubectl -n rook-ceph get service rook-ceph-mgr-dashboard
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
rook-ceph-mgr-dashboard ClusterIP 10.43.168.11   <none>        7000/TCP 118m
```

After accessing the dashboard, the default user is`admin`, execute the following command on the server to obtain the password：

```bash
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

### Rainbond docks Rook-Ceph

When installing Rainbond, you can connect Cephfs as shared storage by specifying the StorageClass of Rook-Ceph.When using Helm to install Rainbond, the specified parameters should be similar to the following (the current command does not contain other parameters)：

```bash
helm install \
--set Cluster.RWX.enable=true \
--set Cluster.RWX.config.storageClassName=rook-cephfs \
--set Cluster.RWO.enable=true \
--set Cluster.RWO .storageClassName=rook-cephfs
```




