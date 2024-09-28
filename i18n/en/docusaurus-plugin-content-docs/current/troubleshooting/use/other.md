---
title: Other problems
descrition: 介绍 Rainbond 使用过程中的其他问题排查思路
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
du -sh /opt/rainbond
```

You can increase the disk space for the `/opt/rainbond` directory, or mount `/opt/rainbond` to other disks through soft links.

## Nacos 获取不到配置

在使用 Nacos 作为配置中心时，如果遇到获取不到配置的情况，即得到的配置为 null，则可能是因为 RainBond 和 Nacos 都使用了租户的概念，共用了环境变量 [TENANT_ID](https://www.rainbond.com/docs/use-manual/component-manage/env/advanced-env) 导致的。
可通过如下方式来解决：

- 首选方案：设置 `isUseCloudNamespaceParsing` 为 false 。`isUseCloudNamespaceParsing` 可以是配置项、JVM 参数或环境变量。
- 其次方案：设置 `nacos.use.cloud.namespace.parsing` 为 false 。`nacos.use.cloud.namespace.parsing` 可以是配置项、JVM 参数或环境变量。

如果你使用 Spring Cloud Alibaba Nacos，则可以使用如下配置方式：

```yaml
spring:
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      discovery:
        # 禁用云命名空间解析，防止和 RainBond 提供 TENANT_ID 环境变量冲突
        isUseCloudNamespaceParsing: false
      config:
        # 禁用云命名空间解析，防止和 RainBond 提供 TENANT_ID 环境变量冲突
        isUseCloudNamespaceParsing: false
```

更多分析细节，详见 [RainBond 中获取不到 Nacos 配置 - 深度分析](https://blog.csdn.net/u012383839/article/details/135115269?spm=1001.2014.3001.5501)。

### 历史日志存储不足

默认情况下，每个组件默认只会保存 10M 大小的历史日志，如果你需要保存更多的历史日志，可以通过修改组件的环境变量 `LOG_MAX_SIZE` 来设置，默认单位为 MB。

```yaml title='kubectl edit rbdcomponent rbd-eventlog -n rbd-system'
spec:
  env:
  - name: LOG_MAX_SIZE
    value: 20
```
