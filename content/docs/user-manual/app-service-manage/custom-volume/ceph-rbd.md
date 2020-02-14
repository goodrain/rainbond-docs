---
title: ceph-rbd块存储
description: 高性能块存储设备
hidden: true
weight: 5015
---

### ceph-rbd块存储介绍

Ceph引入了一个新的RBD协议，也就是Ceph块设备（Ceph Block Device）。RBD为客户端提供了可靠、分布式、高性能的块存储。RBD块呈带状分布在多个Ceph对象之上，而这些对象本身又分布在整个Ceph存储集群中，因此能够保证数据的可靠性以及性能。RBD已经被Linux内核支持，换句话说，RBD驱动程序在过去的几年里已经很好地跟Linux内核集成。几乎所有的Linux操作系统发行版都支持RBD。除了可靠性和性能之外，RBD也支持其他的企业级特性，例如完整和增量式快照，精简的配置，写时复制（copy-on-write）式克隆，以及其他特性。RBD还支持全内存式缓存，这可以大大提高它的性能。

Ceph块设备完全支持云平台，例如OpenStack、CloudStack等。在这些云平台中它已经被证明是成功的，并且具有丰富的特性。

> 需用户自己准备ceph环境，可参考[官方安装文档](http://docs.ceph.com/docs/master/start/)


### Rainbond平台对接ceph-rbd块存储

如果通过kubernetes内置程序kubectl挂载存储的话需要修改kubernetes的某些参数，只需要在计算节点安装`ceph-common`程序就可以使用ceph-rbd块存储到kubernetes集群中了。
虽然相对简单，但涉及到修改用户的kubernetes环境配置，该种方案并不被Rainbond推荐。我们采用部署provisioner的方式部署一套ceph-rbd的驱动，有驱动来挂载存储而不是kubectl来挂载。

#### 驱动的安装

使用kubernetes孵化项目[external-storage](https://github.com/kubernetes-incubator/external-storage)来安装ceph-rbd的驱动。

```
git clone https://github.com/kubernetes-incubator/external-storage.git
cd external-storage/ceph/rbd/deploy
NAMESPACE=kube-system
sed -r -i "s/namespace: [^ ]+/namespace: $NAMESPACE/g" ./rbac/clusterrolebinding.yaml ./rbac/rolebinding.yaml
kubectl -n $NAMESPACE apply -f ./rbac
```

> 根据需要调整驱动的命名空间

确定驱动是否安装成功

```
kubectl get deployment -n kube-system
```


#### storageClass的创建

ceph-rbd的storageClass定义如下

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ceph-rbd-storageclass
  namespace: rainbond
provisioner: ceph.com/rbd
reclaimPolicy: Retain
parameters:
  monitors: 192.168.2.193:6789
  fsType: ext4
  imageFeatures: layering
  imageFormat: "2"
  adminId: admin
  adminSecretName: ceph-secret
  adminSecretNamespace: rainbond
  pool: rbd
  userId: admin
  userSecretName: ceph-secret
  userSecretNamespace: rainbond
```

参数描述：

- minitors
  ceph-rbd的monitor地址，多个地址逗号隔开
- adminId
  ceph-rbd集群管理员账户
- adminSecretName
   admin账户的secret名称
- adminSecretNamespace
   admin账户的secret账户命名空间
- pool
  ceph-rbd的数据池
- fsType
  kubernetes支持的文件系统格式，默认是ext4
- imageFormat
   ceph-rbd的镜像格式，默认为“2”
- imageFeatures
  如果imageFormat参数为“2”，该参数必须设置，目前仅支持“layering”

创建admin的secret

```
ceph auth get client.admin 2>&1 |grep "key = " |awk '{print  $3'} |xargs echo -n > /tmp/key
kubectl create secret generic ceph-admin-secret --from-file=/tmp/key --namespace=kube-system --type=kubernetes.io/rbd
```

创建ceph-rbd的数据池并创建用户kube

```
ceph osd pool create kube 8 8
ceph auth add client.kube mon 'allow r' osd 'allow rwx pool=kube'
ceph auth get-key client.kube > /tmp/key
kubectl create secret generic ceph-secret --from-file=/tmp/key --namespace=kube-system --type=kubernetes.io/rbd
```

> 测试过程中全程使用的admin账户

#### 存储的使用

正确创建存储驱动并创建storageClass之后，用户可以在Rainbond控制台创建有状态组件使用ceph-rbd块存储，此时添加存储类型时，可以看到ceph-rbd块存储的storageClass对应的新增存储类型供用户使用。

> 须通过重启组件或者更新组件来触发存储的生效

#### 检查结果

存储是否生效可以通过组件是否可以正常启动来判断，组件正常启动则说明组件已经正常挂载了存储，也可以到ceph集群中确定存储的情况，确定是否存在对应大小的存储，其状态是否是使用中的状态。
