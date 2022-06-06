---
title: Rook-Ceph 对接方案
description: 高性能块存储设备
weight: 5015
---

## 概述

**Ceph** 引入了一个新的 RBD 协议，也就是 Ceph 块设备（Ceph Block Device）。RBD 为客户端提供了可靠、分布式、高性能的块存储。RBD 块呈带状分布在多个 Ceph 对象之上，而这些对象本身又分布在整个 Ceph 存储集群中，因此能够保证数据的可靠性以及性能。RBD 已经被 Linux 内核支持，换句话说，RBD 驱动程序在过去的几年里已经很好地跟 Linux 内核集成。几乎所有的 Linux 操作系统发行版都支持 RBD。除了可靠性和性能之外，RBD 也支持其他的企业级特性，例如完整和增量式快照，精简的配置，写时复制（copy-on-write）式克隆，以及其他特性。RBD 还支持全内存式缓存，这可以大大提高它的性能。

**Rook** 是一种开源的云原生存储编排工具，提供了为云原生环境而生的平台框架级复杂存储解决方案。Ceph operator 在 2018 年 12 月的 Rook v0.9 版本中得到了稳定的支持，用户可以基于 Rook 实现面向 Ceph 存储的安装、运维管理，并提供了优秀的云原生存储使用体验。

## 安装部署

利用 Rook 安装部署 Ceph 集群仅需要使用简单的 `kubectl` 命令，安装开始之前，需要关注以下前提条件。

### 前提条件

- 已部署Kubernetes集群，版本为 **v1.16** 或更高版本。

- 集群最少拥有3个节点用来部署 ceph 存储集群。

- 建议的最低内核版本为 **5.4.13** 。如果内核版本低于 5.4.13则需要升级内核。

- 存储集群的服务器之间需要进行同步时间，官方要求0.05秒，并且做定时任务。

- 安装lvm包
  
  - CentOS
    
    ```bash
    sudo yum install -y lvm2
    ```
  
  - Ubuntu
    
    ```bash
    sudo apt-get install -y lvm2
    ```

- 存储满足以下选项之一：
  
  - 原始设备（无分区或格式化文件系统）
  - 原始分区（无格式化的文件系统）

如果磁盘之前已经使用过，需要进行清理，使用以下脚本进行清理

```bash
#!/usr/bin/env bash
DISK="/dev/vdc"  #按需修改自己的盘符信息

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

### 部署 Rook-Ceph

#### 部署 Rook Operator

```bash
 git clone -b release-1.8 https://github.com/goodrain/rook.git && cd rook/deploy/examples/
 kubectl create -f crds.yaml -f common.yaml -f operator.yaml
```

为Running则Operator部署成功

```bash
$ kubectl -n rook-ceph get pod
NAME                                 READY   STATUS    RESTARTS   AGE
rook-ceph-operator-b89545b4f-j64vk   1/1     Running   0          4m20s
```

#### 创建Ceph集群

> {kube-node1,kube-node2,kube-node3} 此处应替换为当前集群节点的 node 名称。

- 给节点打标签
  
为运行ceph-mon的节点打上：ceph-mon=enabled
  
```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} ceph-mon=enabled
```

为运行ceph-osd的节点，也就是存储节点，打上：ceph-osd=enabled

```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} ceph-osd=enabled
```

为运行ceph-mgr的节点，打上：ceph-mgr=enabled

ceph-mgr最多只能运行2个

```bash
kubectl label nodes {kube-node1,kube-node2} ceph-mgr=enabled
```

- 创建集群
  
**创建前修改 `storage.node`字段中的节点名称及对应盘符**
  
```bash
kubectl create -f cluster.yaml
```

#### 验证Ceph集群

通过命令行查看以下pod启动，表示成功：

```
kubectl get po -n rook-ceph
```

![](https://pic.imgdb.cn/item/61e0cd882ab3f51d91f07560.png)

安装工具箱，其中包含了 Ceph 集群管理所需要的命令行工具：

```bash
$ kubectl create -f toolbox.yaml
$ kubectl get po -l app=rook-ceph-tools -n rook-ceph
NAME                               READY   STATUS    RESTARTS   AGE
rook-ceph-tools-76876d788b-qtm4j   1/1     Running   0          77s
```

使用如下命令确定 Ceph 集群状态：

```bash
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
$ ceph status
  cluster:
    id:     8bb6bbd4-ec90-4707-85d7-903551d08991
    health: HEALTH_OK #出现该字样则集群正常

  services:
    mon: 3 daemons, quorum a,b,c (age 77s)
    mgr: b(active, since 27s), standbys: a
    osd: 6 osds: 6 up (since 37s), 6 in (since 56s)

  data:
    pools:   1 pools, 1 pgs
    objects: 0 objects, 0 B
    usage:   31 MiB used, 750 GiB / 750 GiB avail #磁盘总容量，确认是否与实际容量相同
    pgs:     1 active+clean
```

### 提供存储

Rook-ceph提供了三种类型的存储，三种存储类型在 Rainbond （版本要求不低于v5.7.0-release）中均可以对接使用。：

- **[Block](https://rook.io/docs/rook/v1.8/ceph-block.html)**：创建由 Pod (RWO) 使用的块存储。Rainbond 平台中的有状态类型服务组件，可以在添加存储时选择 `rook-ceph-block` 申请并挂载块存储。
- **[共享文件系统](https://rook.io/docs/rook/v1.8/ceph-filesystem.html)**：创建一个跨多个 Pod 共享的文件系统 (RWX)。安装 Rainbond 时可按照后文中的方式进行对接。Rainbond 平台中的服务组件在添加存储时选择默认的共享存储，即可对接 cephfs 共享文件系统。
- **[Object](https://rook.io/docs/rook/v1.8/ceph-object.html)**：创建一个可以在 Kubernetes 集群内部或外部访问的对象存储。该存储类型可以对接 Rainbond 的对象存储设置，为云端备份恢复等功能提供支持。



### 创建共享存储

为运行 mds 的节点添加标签：role=mds-node，通常为 Ceph 的三个节点

```bash
kubectl label nodes {kube-node1,kube-node2,kube-node3} role=mds-node
```

```bash
$ kubectl create -f filesystem.yaml
$ kubectl -n rook-ceph get pod -l app=rook-ceph-mds
NAME                                        READY   STATUS    RESTARTS   AGE
rook-ceph-mds-sharedfs-a-785c845496-2hcsz   1/1     Running   0          17s
rook-ceph-mds-sharedfs-b-87df7847-5rvx9     1/1     Running   0          16s
```

在 Rook 开始供应存储之前，需要根据文件系统创建一个 StorageClass。这是 Kubernetes 与 CSI 驱动程序互操作以创建持久卷所必需的。

```bash
$ kubectl create -f storageclass-sharedfs.yaml
$ kubectl get sc
NAME          PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-cephfs   rook-ceph.cephfs.csi.ceph.com   Delete          Immediate           false                  72m
```

### 创建块存储

```bash
kubectl create -f storageclass-block.yaml
$ kubectl get storageclass  rook-ceph-block
NAME              PROVISIONER                  RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-ceph-block   rook-ceph.rbd.csi.ceph.com   Delete          Immediate           true                   79m
```

获取到 storageclass 后已创建成功，在平台上有状态组件可选择块存储进行使用。

### 创建对象存储

添加标签

```bash
# 添加节点标签
kubectl label nodes {kube-node1,kube-node2,kube-node3} rgw-node=enabled
# Create the object store
kubectl create -f object.yaml
# To confirm the object store is configured, wait for the rgw pod to start
kubectl -n rook-ceph get pod -l app=rook-ceph-rgw
```

创建 StorageClass

```bash
cat > storageclass-bucket-delete.yaml <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: rook-ceph-bucket
provisioner: rook-ceph.ceph.rook.io/bucket
reclaimPolicy: Delete
parameters:
  objectStoreName: my-store
  objectStoreNamespace: rook-ceph
EOF
```

```bash
$ kubectl create -f storageclass-bucket-delete.yaml
```

创建 Bucket Claim

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

创建完成后，下面来验证。

```bash
$ kubectl get svc rook-ceph-rgw-my-store -n rook-ceph
NAME                     TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
rook-ceph-rgw-my-store   ClusterIP   10.43.4.250   <none>        80/TCP    3h32m
# 出现以下返回即证明bucket创建完成
$ curl 10.43.4.250
<?xml version="1.0" encoding="UTF-8"?><ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>anonymous</ID><DisplayName></DisplayName></Owner><Buckets></Buckets></ListAllMyBucketsResult>
```

```bash
# 获取连接信息
$ kubectl -n rook-ceph get cm ceph-bucket -o jsonpath='{.data.BUCKET_HOST}'
rook-ceph-rgw-my-store.rook-ceph.svc
$ kubectl -n rook-ceph get secret ceph-bucket -o jsonpath='{.data.AWS_ACCESS_KEY_ID}' | base64 --decode
LV9A2S7F6A8SS3NPD9Z0
$ kubectl -n rook-ceph get secret ceph-bucket -o jsonpath='{.data.AWS_SECRET_ACCESS_KEY}' | base64 --decode
hzuHLEjtPvaX0N4hLIJBRzP4erjMdHsuHMqeyUuW
# 获取bucket name
$ kubectl get ObjectBucketClaim -n rook-ceph ceph-bucket -o yaml|grep "bucketName: ceph-bkt"
  bucketName: ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf
```

```bash
# 进入tools容器验证
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash

export AWS_HOST=10.43.4.250
export AWS_ENDPOINT=10.43.4.250:80
export AWS_ACCESS_KEY_ID=LV9A2S7F6A8SS3NPD9Z0
export AWS_SECRET_ACCESS_KEY=hzuHLEjtPvaX0N4hLIJBRzP4erjMdHsuHMqeyUuW
# 将其写入credentials文件
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF
```

#### PUT 或 GET 对象

上传文件到新创建的bucket

```bash
echo "Hello Rook" > /tmp/rookObj
s5cmd --endpoint-url http://$AWS_ENDPOINT cp /tmp/rookObj s3://ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf
```

从bucket下载并验证文件

```bash
$ s5cmd --endpoint-url http://$AWS_ENDPOINT cp s3://ceph-bkt-6c317bdb-ce51-444e-9d96-40903b3c24cf/rookObj /tmp/rookObj-download
$ cat /tmp/rookObj-downloadcat 
Hello Rook
```

#### 供集群外部访问

将该svc地址在平台以第三方组件形式运行并打开对外访问策略，即可通过对外访问策略进行访问

```bash
$ kubectl -n rook-ceph get service rook-ceph-rgw-my-store
NAME                     TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
rook-ceph-rgw-my-store   ClusterIP   10.43.4.250   <none>        80/TCP    3h40m
```

### 访问dashboard

修改 Ceph 集群配置，禁用 dashboard 内置 ssl：

```bash
$ kubectl -n rook-ceph edit cephcluster -n rook-ceph rook-ceph
# 修改 ssl 为 false
spec:
  dashboard:
    enabled: true
    ssl: false

# 重启 operator 使配置生效
$ kubectl delete po -l app=rook-ceph-operator -n rook-ceph
```

获取svc，在平台上使用第三方组件的形式代理

```bash
$ kubectl -n rook-ceph get service rook-ceph-mgr-dashboard
NAME                      TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
rook-ceph-mgr-dashboard   ClusterIP   10.43.168.11   <none>        7000/TCP   118m
```

访问到仪表板后，默认用户为`admin`，在服务器执行以下命令获取密码：

```bash
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

### Rainbond 对接 Rook-Ceph

安装 Rainbond 时，可以通过指定 Rook-Ceph 的 StorageClass 来对接 Cephfs 作为共享存储使用。当使用 Helm 的方式安装 Rainbond 时，指定的参数应类似以下情形（当前命令不包含其他参数）：

```bash
helm install \
--set Cluster.RWX.enable=true \
--set Cluster.RWX.config.storageClassName=rook-cephfs \
--set Cluster.RWO.enable=true \
--set Cluster.RWO.storageClassName=rook-cephfs
```




