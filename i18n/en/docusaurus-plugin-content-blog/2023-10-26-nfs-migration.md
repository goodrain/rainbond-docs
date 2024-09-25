---
title: Kubernetes跨StorageClass迁移，切换Rainbond默认SC
description: 本文将讲述如何迁移 Rainbond 默认的 NFS 存储到外部 NFS 存储，Kubernetes 跨 StorageClass 迁移。
slug: nfs-migration
image: https://static.goodrain.com/wechat/nfs-migration/banner.png
---

[基于主机安装](https://www.rainbond.com/docs/installation/install-with-ui/host-install-with-ui)或[基于Kubernetes安装](https://www.rainbond.com/docs/installation/install-with-helm/)的 Rainbond 集群（均使用默认参数安装），默认使用的共享文件存储是 NFS ，以 Pod 方式运行在 Kubernetes 中，但这种方式也有一些无法避免的问题，比如：NFS 的 SVC 无法通信时集群无法挂载存储则导致不能使用、服务器关机时卡在 `umount` 导致不能正常关机等等。

当然还有切换共享文件存储的需求，在第一次安装 Rainbond 时，大多数都使用的默认安装，使用一段时间后想切换到外部的 NFS，或者云上的 NAS等等。

在原生的 Kubernetes 集群中，通过 StorageClass 创建的 PVC 是无法修改存储后端的，需要将 PV、PVC 删除后通过新的 StorageClass 创建新的 PVC，然后再将数据迁移，再重新挂载 PVC。当有很多个 PVC 时，需要多次重复的操作。

而 Rainbond 虽然也是通过 StorageClass 创建的 PVC，但相比原生 Kubernetes 省去了创建 PV、PVC 和重新挂载的步骤，以及重复性的操作。在 Rainbond 中只需要将底层存储类更换，然后迁移 Rainbond 所创建的一整个目录，最后重新在页面中修改挂载即可完成迁移。

本文将讲述如何迁移 Rainbond 默认的 NFS 存储到外部 NFS 存储，大致分为以下几个步骤：

1. 部署外部 NFS 存储并对接到 K8s 上。
2. 备份 NFS 存储的数据。
3. 恢复备份数据并切换 Rainbond 默认存储至外部存储。

**注意：**

- 关闭正在运行的应用，避免增量数据导致数据不一致。
- 组件挂载的存储必须是共享存储，其他存储则需要单独迁移。

## 部署 NFS 并对接到 K8s 上

外部 NFS 存储可以选择部署 NFS 双机热备或其他方案，这里就不演示了，以单节点 NFS 为例。

### 在 Centos 上部署 NFS

1. 安装 `nfs-utils`

```shell
yum install -y nfs-utils
```

2. 创建共享目录

```shell
mkdir -p /data
```

3. 编辑 `/etc/exports` 文件，添加如下内容：

```shell
$ vim /etc/exports

/data *(rw,sync,insecure,no_subtree_check,no_root_squash)
```

4. 配置完成后，执行以下命令启动 NFS 服务：

```shell
systemctl enable nfs-server
systemctl start nfs-server
```

5. 验证 NFS 是否可用

```bash
showmount -e 172.20.251.94
```

### 在 K8s 中部署 NFS Client

下面将外部的 NFS 存储对接到 Kubernetes 上，在 Kubernetes 中部署 NFS Client Provisioner

1. 安装 [Helm](https://www.rainbond.com/docs/ops-guide/tools/#helm-cli) 命令

2. 添加 Helm Chart 仓库

```shell
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

3. 安装 NFS-Client-Provisioner

```shell
helm install nfs-client-provisioner rainbond/nfs-client-provisioner \
--set nfs.server=172.20.251.94 \
--set nfs.path=/data \
--version 1.2.8
```

4. 验证 NFS Client 是否可用，创建 PVC 验证。

```yaml
$ vim test-pvc.yaml

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-claim
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 1Gi
  storageClassName: nfs-client
  
$ kubectl apply -f test-pvc.yaml
```

查询 PVC 状态为 Bound 则正常。

![](https://static.goodrain.com/wechat/nfs-migration/1.png)

## 备份默认 NFS 的数据

查看 `rbd-system` 下所有的 PVC。

```bash
kubectl get pvc -n rbd-system
```

![](https://static.goodrain.com/wechat/nfs-migration/2.png)

| PVC名称                  | 解释                                                 |
| ---------------------- | -------------------------------------------------- |
| data                   | 测试存储是否正常默认创建的PVC（无用）                               |
| data-nfs-provisioner-0 | NFS Pod所使用的PVC，默认路径在宿主机的`/opt/rainbond/data/nfs`下。 |
| data-rbd-monitor-0     | 存储监控数据。（可不要）                                       |
| rbd-api                | 存储 api request 请求日志。（可不要）                          |
| rbd-chaos-cache        | 存储构建组件的缓存（可不要）                                     |
| rbd-cpt-grdata         | 存储平台上所有组件挂载共享存储数据，以及组件的日志。（必须）                     |
| rbd-db-rbd-db-0        | 存储 MySQL 数据，默认是存在本地的，没存储在 NFS 中。                   |
| rbd-etcd-rbd-etcd-0    | 存储 Etcd 数据，默认是存在本地的，没存储在 NFS 中。                    |
| rbd-hub                | 存储镜像数据（必须）                                         |

以上数据中对于我们要迁移的重要数据有 `rbd-cpt-grdata` 和 `rbd-hub`，根据 `VOLUME` 名称在默认的存储目录 `/opt/rainbond/data/nfs` 下查找，例如 `pvc-9ec619e3-1e20-4d7a-b744-aa04088fb6c3`。

![](https://static.goodrain.com/wechat/nfs-migration/3.png)

使用 rsync 同步工具，将数据同步到新的 NFS 存储服务器上，根据以下命令开始同步，根据实际情况修改命令。

```shell
rsync -avP /opt/rainbond/data/nfs/pvc-9ec619e3-1e20-4d7a-b744-aa04088fb6c3 root@172.20.251.94:/data
rsync -avP /opt/rainbond/data/nfs/pvc-d0bf09ca-5543-4050-bd08-b02ebb593b4e root@172.20.251.94:/data
```

**注意：数据同步完成后切记要校验数据的完整性。**

## 切换 Rainbond 存储

### 更改 Rainbond 默认存储

1. 修改 `rainbondcluster` CRD资源，添加 `storageClassName`

```yaml
$ kubectl edit rainbondcluster -n rbd-system

spec:
  rainbondVolumeSpecRWX:
    storageClassName: nfs-client #由 NFS-Client-Provisioner 创建的 sc
```

2. 修改 `rainbondvolumes `CRD资源，修改 `storageClassName` 为 `nfs-client`

```yaml
$ kubectl edit rainbondvolumes -n rbd-system

spec:
  storageClassName: nfs-client
```

3. 删除 Rainbond 基于默认 NFS 创建的 StorageClass `rainbondsssc` `rainbondslsc`

```bash
kubectl delete sc rainbondsssc rainbondslsc
```

4. 删除 `rbd-system` 命名空间下旧的 PVC。这时候会删除不掉，因为还有 POD 在使用该 PVC，先 `ctrl c` 结束。

```bash
kubectl delete pvc data data-rbd-monitor-0 rbd-api rbd-chaos-cache rbd-cpt-grdata rbd-hub -n rbd-system
```

5. 删除 Rainbond 组件的控制器让 `rainbond-operator` 控制 PVC 重新创建。

```shell
kubectl delete deploy rbd-api -n rbd-system
kubectl delete ds rbd-chaos -n rbd-system
kubectl delete sts rbd-monitor -n rbd-system
kubectl delete deploy rbd-worker -n rbd-system
kubectl delete deploy rbd-hub -n rbd-system
kubectl delete deploy rbd-resource-proxy -n rbd-system
kubectl delete sts rbd-eventlog -n rbd-system
kubectl delete ds rbd-node -n rbd-system
```

```bash
kubectl delete pod -l release=rainbond-operator -n rbd-system
```

等待所有 POD 重新创建，创建完成后 Rainbond 平台可正常访问，正常工作。

### 恢复数据

下面将前面备份的数据恢复到新创建的 PVC 中。

![](https://static.goodrain.com/wechat/nfs-migration/4.png)

此时  `rbd-cpt-grdata` 和 `rbd-hub` 新创建的目录下的数据都是自动创建，先将其删除。

```bash
rm -rf /data/rbd-system-rbd-cpt-grdata-pvc-44167209-1006-4de5-9801-afcce996449c/*
rm -rf /data/rbd-system-rbd-hub-pvc-c326b89f-7c0e-4990-a8e2-31472799ccc8/*
```

再将备份的  `rbd-cpt-grdata` 和 `rbd-hub` 数据分别同步到新的目录中，例如以下命令。

```bash
rsync -avP /data/pvc-9ec619e3-1e20-4d7a-b744-aa04088fb6c3/* /data/rbd-system-rbd-cpt-grdata-pvc-44167209-1006-4de5-9801-afcce996449c
rsync -avP /data/pvc-d0bf09ca-5543-4050-bd08-b02ebb593b4e /data/rbd-system-rbd-hub-pvc-c326b89f-7c0e-4990-a8e2-31472799ccc8
```

**注意：数据同步完成后切记要校验数据的完整性。**

重新 Rainbond 部分组件的 POD 生效。

```bash
kubectl delete pod -l name=rbd-api -n rbd-system
kubectl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-monitor -n rbd-system
kubectl delete pod -l name=rbd-worker -n rbd-system
kubectl delete pod -l name=rbd-hub -n rbd-system
kubectl delete pod -l name=rbd-resource-proxy -n rbd-system
kubectl delete pod -l name=rbd-eventlog -n rbd-system
kubectl delete pod -l name=rbd-node -n rbd-system
```

### 更改 Rainbond 上的组件存储

替换底层存储后，此时 Rainbond 上组件的存储还未修改，此时需要进入 Rainbond 的组件中将当前存储删除重新添加。

![](https://static.goodrain.com/wechat/nfs-migration/5.png)

挂载路径、存储类型保持不变，删除当前的配置添加新的同样配置即可。

至此存储切换完成，后续请验证应用的数据是否都完整。

### 删除默认 NFS 存储资源（可选）

修改 CRD 资源，将 `nfs-provisioner`  replicas 设置为 0

```yaml
$ kubectl edit rbdcomponent nfs-provisioner -n rbd-system

spec:
  replicas: 0
```

删除 `nfs-provisioner` 控制器

```shell
kubectl delete sts nfs-provisioner -n rbd-system
```

删除 nfs-provisioner 的 PV、PVC

```bash
kubectl delete pvc data-nfs-provisioner-0 -n rbd-system
kubectl delete pv nfs-provisioner
```

删除宿主机上的 NFS 数据存储目录

```bash
rm -rf /opt/rainbond/data/nfs
```
