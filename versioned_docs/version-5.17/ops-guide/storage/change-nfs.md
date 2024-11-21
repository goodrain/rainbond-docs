---
title: 更换 NFS 存储节点
description: 本文介绍如何将默认的 NFS 存储更换到其他大存储节点上。
---

基于主机或 Helm 安装时，Rainbond 在默认情况下会提供一个 NFS Provisioner，用做整个平台的共享存储和组件的存储。该存储数据默认保存在 nfs-provisioner-0 这个 Pod 所在节点的 /opt/rainbond/data/nfs 目录下。但是在一些场景下，这个 Pod 所调度的节点不一定是集群中存储最大的节点。

本文将介绍如何将默认的 NFS 服务切换到其他大存储节点上。

:::warning
注意：更换 NFS 存储节点有风险，请做好数据备份。在更换节点的过程中，有可能会出现业务不可用的情况，请选择合适时间更换。
:::

## 操作原理

整体操作原理如下图所示，下面的 Node 1 是默认 NFS 运行的节点。Node 2 是要迁移的节点。操作步骤主要分为以下三步：

1. 存储数据迁移：默认情况下，内置的 NFS 服务会将数据保存到 nfs-provisioner-0 这个 Pod 所在节点的 /opt/rainbond/data/nfs 目录下，所以需要将该目录下的业务数据复制一份到你即将要切换的存储节点上。

2. PVC、PV 迁移：数据复制完毕后，我们需要创建新的 PVC 和 PV 进行绑定，并将其指向新节点 Node 2 的数据目录。

3. StatefulSet 迁移：PVC 和 PV 重新创建后，需要让 StatefulSet 迁移到新节点 Node 2 上。

![change-nfs](https://static.goodrain.com/docs/5.14.2/change-nfs.png)

## 操作流程

### 存储数据迁移

1. 在新节点 Node 2 上创建目录

```bash
mkdir /opt/rainbond/data/nfs/
```

2. 将旧节点 Node 1 的数据拷贝过来，此处需要在 Node 2 上执行，在你实际操作时应将下方 IP 替换为你真实节点的 IP。

```bash
scp -r root@112.126.81.128:/opt/rainbond/data/nfs /opt/rainbond/data
```

以上两步完成后，就实现了存储数据的迁移。

### PVC、PV 迁移

1. 备份原有的 PV 和 PVC（可选）

```bash
kubectl get pvc data-nfs-provisioner-0 -nrbd-system -oyaml > nfs-pvc-bak.yaml
kubectl get pv nfs-provisioner -nrbd-system -oyaml > nfs-pv-bak.yaml
```

2. 执行以下命令，将 StatefulSet 的实例数减少到 0，以便于清理 Node 1 上的 PV 和 PVC

```bash
kubectl edit sts nfs-provisioner -nrbd-system
```

3. 删除原有的 PV 和 PVC

```bash
kubectl delete pvc data-nfs-provisioner-0 -nrbd-system
kubectl delete pv nfs-provisioner
```

4. 重新创建新的 PV 和 PVC，以下是 PV 和 PVC 的示例 yaml，你需要更改 PV 示例中的 nodeAffinity 字段，使该 PV 与你的新节点 Node 2 绑定。

<details>
<summary>PV 示例</summary>

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: nfs-provisioner
  name: nfs-provisioner
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  hostPath:
    path: /opt/rainbond/data/nfs
    type: DirectoryOrCreate
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - 59.110.14.219
      - matchExpressions:
        - key: k3s.io/hostname
          operator: In
          values:
          - 59.110.14.219
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  volumeMode: Filesystem
```

</details>

<details>
<summary>PVC 示例</summary>

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: nfs-provisioner
  name: data-nfs-provisioner-0
  namespace: rbd-system
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  storageClassName: manual
  volumeMode: Filesystem
  volumeName: nfs-provisioner
```

</details>

### StatefulSet 迁移

1. 检查新创建的 PV 和 PVC 是否绑定成功，如果状态为 Bound 即为成功

```bash
kubectl get pvc data-nfs-provisioner-0 -nrbd-system
```

2. 将 StatefulSet 实例数恢复为 1 即可

```bash
kubectl edit sts nfs-provisioner -nrbd-system
```

3. 当 nfs-provisioner-0 的 Pod 正常运行以后，平台即可恢复。如果发现 rbd-monitor 的状态不正常，则进入 rbd-monitor 的容器，清除 `/prometheusdata/chunks_head/` 的数据即可。rbd-monitor 没有 bash 命令，使用如下命令进入容器后清理数据。

```bash
kubectl exec -it rbd-monitor-0 -nrbd-system sh
```

4. 由于存储更换，所以会导致之前挂载了共享存储的业务组件，此时无法访问共享存储的内容。因此需要在控制台重启对应组件。
