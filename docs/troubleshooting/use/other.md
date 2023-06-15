---
title: 其他问题
descrition: 介绍 Rainbond 使用过程中的其他问题排查思路
keywords:
- Rainbond 使用问题排查
---

本文介绍 Rainbond 在使用过程中遇到的问题以及解决方法。

## 磁盘空间不足

### 磁盘空间超 80% 时，应用无法正常部署

当磁盘根分区空间超过 80% 时，Kubernetes 会自动进入驱逐状态，所有的 Pod 都会被驱逐，届时 Rainbond 将无法正常工作，需要清理磁盘空间。

清理 Docker 不再使用的资源：

```bash
docker system prune
```

清理 Rainbond 镜像仓库存储的镜像，如果你采用的是 Rainbond 默认提供的镜像仓库，可参阅 [清理 rbd-hub 镜像](https://t.goodrain.com/d/21-rbd-hub)。

### 磁盘有空间，存储不足

服务器系统磁盘还有足够的空间，而在 Rainbond 上查看存储时，磁盘已经不足。这是因为 Rainbond 会默认创建一个 `nfs-provisioner`，用于动态创建 PVC，而这个 `nfs-provisioner` 会固定在某一个节点上，默认的存储目录是 `/opt/rainbond`。

查询 `nfs-provisioner` 所在的节点：

```bash
$ kubectl get pod -l name=nfs-provisioner -n rbd-system -o wide
NAME                READY   STATUS    RESTARTS      AGE     IP            NODE            NOMINATED NODE   READINESS GATES
nfs-provisioner-0   1/1     Running   1 (13h ago)   6d21h   10.42.0.228   192.168.3.33   <none>           <none>
```

查看 `nfs-provisioner` 的存储目录：

```bash
du -sh /opt/rainbond
```

你可以为 `/opt/rainbond` 目录增加磁盘空间，或者通过软链接的方式将 `/opt/rainbond` 挂载到其他磁盘上。