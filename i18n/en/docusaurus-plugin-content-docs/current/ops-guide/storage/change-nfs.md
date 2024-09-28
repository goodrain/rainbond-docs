---
title: Replace an NFS storage node
description: This article explains how to replace the default NFS storage to another large storage node.
---

When hosting or Helm is installed, Rainbond will provide a NFS provisioner by default to serve as shared storage and component storage for the entire platform.This store data is saved by default in the /opt/rainbond/data/nfs directory of this Pod node in nfs-provisioner-0.But in some scenarios, this Pod dispatches node is not necessarily the largest node stored in the cluster.

This paper will describe how to switch the default NFS service to other large storage nodes.

:::warning
Note that：is dangerous to replace NFS storage node, please backup data.In the process of changing nodes, there is a risk that business will not be available, please choose the appropriate time to replace.
:::

## How to do it

The general operating principles are shown in the graph below, Node 1 below is the default NFS running node.Node 2 is a node to migrate.Action steps are divided mainly into the following three moves：

1. Storage migration：by default, built-in NFS services will save data to the nfs-provisioner-0 directory of this Pod node /opt/rainbond/data/nfs so you need to copy business data from this directory to the store node you are about to switch to.

2. When PVC, PV migrated：data is copied, we need to create new PVC and PV to bind to the new Node 2 data directory.

3. StatefulSet migration：PVC and PV needs to migrate StatefulSet to new Node 2 after recreation.

![change-nfs](https://static.goodrain.com/docs/5.14.2/change-nfs.png)

## Operating processes

### Storage data migration

1. Create directory on new Node 2

```bash
mkdir /opt/rainbond/data/nfs/
```

2. Copy the data of the old Node 1, here needs to be done on Node 2. You should replace the following IP with your real node's IPs when you actually do it.

```bash
scp - r root@112.126.81.128:/opt/rainbond/data/nfs /opt/rainbond/data
```

After the above two steps, migration of stored data has been achieved.

### PVC, PV Migration

1. Backup old PV and PVC (optional)

```bash
kubectl get pvc data-nfs-provisioner-0 -nrbd-system -yaml > nfs-pvc-bak.yaml
kubectl get pv nfs-provisioner -nrbd-system -yaml > nfs-pv-bak.yaml
```

2. Execute the following commands to reduce the number of StatefulSet instances to 0 in order to clean up PV and PVC on Node 1

```bash
kubtl edit costs nfs-provisioner -nrbd-system
```

3. Remove old PV and PVC

```bash
kubtl delete pvc data-nfs-provisioner-0 -nrbd-system
kubectl delete pv nfs-provisioner
```

4. Recreate new PV and PVC, below is a PV and PVC sample yaml, you need to change the nodeAffinity field in PV example to bind this PV to your new Node 2.

<details>
<summary>PV Example</summary>

```yaml
apiVersion: v1
ind: PersistVolume
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: nfs-provisioner
  name: nfs-provisioner
spec:
  accessMode:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  hostPath:
    path: /opt/rainbon/data/nfs
    type: DirectoryOrate
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernets. o/hostname
          operator: In
          values:
          - 59. 10.14.219
      - matchExpressions:
        - key: k3. o/hostname
          operator: In
          values:
          - 59. 10.14 19
  PersistentVolumeReclaim Policy: Retain
  storageClassName: manual
  volumeMode: Filesome
```

</details>

<details>
<summary>PVC Example</summary>

```yaml
apiVersion: v1
ind: PersistentVolumeClaim
metata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: nfs-provisioner
  name: data-nfs-provisioner-0
  nameace: rbd-system
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  storageClassName: manual
  volumeMode: Filesyset
  volume: nfs-provisioner
```

</details>

### StatefulSet Migration

1. Check if newly created PV and PVC are bound successfully, if status is Bound

```bash
kubtl get pvc data-nfs-provisioner-0 -nrbd-system
```

2. Restore StatefulSet Instances to 1

```bash
kubtl edit costs nfs-provisioner -nrbd-system
```

3. The platform can be restored when the nfs-provisionioner-0 Pod is running.If rbd-monitor is found to be in an irregular state, enter the rbd-monitor container and clear the `/prometheusdata/chunks_head/` data.rbd-monitor does not have a bash command, use the command below to clean the data after entering the container.

```bash
kubtl exec -it rbd-monitor-0 -nrbd-system sh
```

4. Storage replacements will result in shared stored business components mounted before, and shared stored content cannot be accessed at this time.Therefore, the corresponding component needs to be restarted in the console.
