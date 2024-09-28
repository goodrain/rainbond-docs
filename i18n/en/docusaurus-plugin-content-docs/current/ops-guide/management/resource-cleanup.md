---
title: Component resource cleanup
description: Delete unnecessary data on the disk to relieve disk pressure
weight: 1003
---

The purpose of the resource cleanup is to clean up unused data on disk, lighten pressure on disk. The objects cleaned are, inter alia, mirrors that are no longer used, and data from components have been deleted.
Cleaning up data includes: source code, slug package, database metadata, logs, storage and images.

### Source code

During the code detection phase, the source code will be cleaned up as soon as the detection is complete.

### slug package

源码构建的组件, 在构建成镜像前, 都根据源码会生成一个 slug 包, 这个 slug 包在镜像构建完后就不再需要了, 会马上被清理.
该 slug 包位于 `/grdata/build/tenant/{tenant_id}/slug/{service_id}`, `tenant_id` 和 `service_id` 分别为 租户ID 和 组件ID.

### Database Metadata

Component metadata is stored in two databases, either region or console. They save information about component environment variables, ports, health checks, resource allocations, and gateway strategies. The corresponding data in these two databases will also be deleted when you take the initiative to delete components.

### Logs

Logs include the `Event Logs` and `Container Logs`, the build, start, update, stop and so on; the `Container Log` is the log output to the standard output when the component is running.

The cleanup strategy for the event log is to keep the most recent `30` and the last `30 days` log. The container log strategy is to keep the last 7 days.

> These log files are in the `/grdata/download/log/` folder.

### Storage

存储分为 `本地存储`, `共享存储` 和 `内存文件存储`, 会持久化到磁盘的是本地存储和共享存储, 当在控制台删除他们的时候, 并不会删除他们在磁盘上相应的数据, 仅仅删除其在数据库
中的元数据. 你在控制台中已经看不到该存储了, 其实它还在磁盘上. 对于无状态的组件, 它的持久化文件位于 `/gradata/tenant/{tenant_id}/service/{service_id}/{volume name}` 下;
而对于有状态组件, 它的持久化文件则位于 `/gradata/tenant/{tenant_id}/service/{service_id}/{pod name}/{volume name}` 下.

When will these stored persistent data be deleted? The answer is that \`delete components', when you remove a component and all its stored persistent data will be deleted.

### Mirror

The clean-up of the mirror was done by kubelet in Kubernetes. The trash recovery function in Kubelet cleanup containers and mirrors that are no longer in use. The trash recovery rate for kubelet is done every minute and the spam recovery rate for the mirror is every five minutes.See [Kubernetes官方文档]for more information (https://kubernetes.io/en/docs/reference/command-line-tools-reference/kubelet/)
