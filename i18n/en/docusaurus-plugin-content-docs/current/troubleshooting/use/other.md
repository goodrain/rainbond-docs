---
title: Other problems
descrition: This topic describes troubleshooting guidelines for Rainbond faults
keywords:
- Rainbond Troubleshooting
---

This article introduces the problems and solutions encountered during the use of Rainbond.

## Insufficient disk space

### When the disk space exceeds 80%, the application cannot be deployed normally

When the disk root partition space exceeds 80%, Kubernetes will automatically enter the eviction state, and all Pods will be evicted. At that time, Rainbond will not work normally and the disk space needs to be cleaned up.

Clean up resources no longer used by Docker:

```bash
docker system prune
```

Clean up the images stored in the Rainbond mirror warehouse. If you use the default mirror warehouse provided by Rainbond, please refer to [Clean up the rbd-hub mirror](https://t.goodrain.com/d/21-rbd-hub).

### Disk has space, not enough storage

The server system disk still has enough space, but when looking at the storage on Rainbond, the disk is not enough. This is because Rainbond will create an `nfs-provisioner` by default to dynamically create PVCs, and this `nfs-provisioner` will be fixed on a certain node, and the default storage directory is `/opt/rainbond`.

Query the node where `nfs-provisioner` is located:

```bash
$ kubectl get pod -l name=nfs-provisioner -n rbd-system -o wide
NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES
nfs-provisioner-0 1/1 Running 1 (13h ago) 6d21h 10.42.0.228 192.168.3.33 <none> <none>
```

View the storage directory of `nfs-provisioner`:

```bash
du -sh /opt/rainbond
```

You can increase the disk space for the `/opt/rainbond` directory, or mount `/opt/rainbond` to other disks through soft links.