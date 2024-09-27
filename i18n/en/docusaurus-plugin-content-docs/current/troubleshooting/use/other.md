---
title: Other problems
descrition: Description of other issues in the use of Rainbond
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

The server system disk still has enough space, but when looking at the storage on Rainbond, the disk is not enough. This is because Rainbond will create an `nfs-provisioner` by default to dynamically create PVCs, and this `nfs-provisioner` will be fixed on a certain node, and the default storage directory is `/opt/rainbond`.This topic describes troubleshooting guidelines for Rainbond faults

Query the node where `nfs-provisioner` is located:

```bash
$ kubectl get pod -l name=nfs-provisioner -n rbd-system -o wide
NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES
nfs-provisioner-0 1/1 Running 1 (13h ago) 6d21h 10.42.0.228 192.168.3.33 <none> <none>
```

View the storage directory of `nfs-provisioner`:

```bash
du -sh/opt/rainbond
```

You can increase the disk space for the `/opt/rainbond` directory, or mount `/opt/rainbond` to other disks through soft links.

## Nacos is not configured

When using Nacos as a config centre, it is possible to obtain null, because RainBond and Nacos both use the tenant concept and share the environmental variable [TENANT_ID](https://www.rainbond.com/docs/use-manual/component-manage/env/advanced-env).
Solve： by

- Preferred option：sets `isUseCloudNamespaceParsing` to false.`isUseCloudNameParsing` can be a configuration, a JVM parameter or an environment variable.
- Its sub-scenario：sets `nacos.use.cloud.namespace.parsing` to false.`nacos.use.cloud.namespace.parsing` can be a configuration, a JVM parameter or an environment variable.

If you use Spring Cloud Alibaba Nacos, you can use the following configuration method：

```yaml
spring:
  cloud:
    nacos:
      server-addr: 127.0.0. :8848
      discovery:
        # Disable cloud namespace parsing, Stop and RainBond provide TENANT_ID environment variable conflict
        isUseCloudNamespaceParsing: false
      config:
        # Disable cloud namespace parsing; Stop and RainBond provide TENANT_ID environmental variable conflict
        isUseCloudNamespaceParsing: false
```

For more analysis, see [Not Nacos Configuration - Deep Analysis in RainBond [https://blog.csdn.net/u0123839/article/details/135115269?spm=1001.2014.3001.5501).

### Logs are not stored

By default, each component will only save the 10M size history log. If you need to save more history logs, it can be set by modifying the component environment variable `LOG_MAX_SIZE`, default unit is MB.

```yaml title='kubectl edit rbdcomponent rbd-eventlog -n rbd-system'
speci:
  env:
  - name: LOG_MAX_SIZE
    value: 20
```
