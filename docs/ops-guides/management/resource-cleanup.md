---
title: 集群资源清理
description: 本文介绍如何定位并安全清理 Rainbond 集群中的无用镜像、构建缓存、应用模板包和本地存储
keywords:
- Rainbond 资源清理
- 镜像清理
- 存储清理
- 磁盘空间不足
---

## 概述

Rainbond 集群运行一段时间后，节点上的容器镜像、构建缓存、上传的软件包和应用数据会持续占用磁盘空间。本文按照风险从低到高，介绍如何定位占用空间的资源并完成清理。

本文中的命令适用于使用默认目录的 Linux 节点。执行命令前，请注意：

- 通过主机安装的集群通常使用 Containerd，Rainbond 数据默认位于 `/opt/rainbond`。
- 如果集群使用 Docker、外部镜像仓库、NFS 或其他存储，实际命令和数据目录可能不同，不要直接套用本文中的删除命令。
- 多节点集群中的镜像和本地存储分散在各个节点上，需要登录对应节点操作。

:::danger 开始前必读

- 不要清理仍在使用的组件存储和镜像仓库数据，否则可能造成业务数据丢失，或者无法回滚到历史构建版本。
- 删除操作无法撤销。重要数据必须先备份，并在业务低峰期操作。
- 如果无法判断某个目录是否仍在使用，请停止操作并联系 Rainbond 技术支持。

:::

## 一、清理前检查

### 1. 登录节点

使用 SSH 登录 Rainbond 集群的管理节点，然后切换到 `root` 用户：

```bash
sudo -i
```

如果当前已经是 `root` 用户，可以跳过这条命令。

### 2. 确认集群状态正常

```bash
# 查看节点状态
kubectl get nodes

# 查看 Rainbond 系统组件状态
kubectl get pods -n rbd-system
```

确认结果：

- 节点的 `STATUS` 应为 `Ready`。
- Rainbond 系统组件的 `STATUS` 通常应为 `Running` 或 `Completed`。
- 如果节点为 `NotReady`，或者有大量系统组件异常，请先排查集群故障，不要继续清理。

### 3. 找出占用空间的目录

```bash
# 查看磁盘整体使用情况
df -h

# 查看 Rainbond 和 RKE2 一级目录的占用情况
du -xhd1 /opt/rainbond 2>/dev/null | sort -h
du -xhd1 /var/lib/rancher/rke2 2>/dev/null | sort -h

# 检查 inode 是否耗尽
df -ih
```

`Use%` 表示磁盘使用率。通常需要重点检查使用率较高的挂载点，以及 `du` 结果中占用最大的目录。

常见资源与目录的对应关系如下：

| 资源 | 常见位置 | 删除后的影响 | 风险 |
| --- | --- | --- | --- |
| 节点上的容器镜像 | `/var/lib/rancher/rke2/agent/containerd` | 后续启动组件时可能重新拉取镜像 | 低 |
| 源码构建缓存 | `/opt/rainbond/cache` | 下次源码构建耗时可能增加 | 低 |
| 导出的应用模板压缩包 | `/opt/rainbond/grdata/app` | 已删除的导出文件无法再次下载 | 中 |
| 上传的软件包 | `/opt/rainbond/grdata/package_build/components` | 对应组件可能无法再次构建 | 高 |
| 内置镜像仓库数据 | `rbd-hub` 使用的持久化存储 | 历史版本可能无法启动或回滚 | 高 |
| 组件本地存储 | `/opt/rainbond/local-path-provisioner` | 可能直接丢失业务数据 | 极高 |

:::tip 推荐清理顺序

先清理节点上的无用镜像和源码构建缓存。空间仍不足时，再处理应用模板包、上传的软件包和镜像仓库。组件本地存储应当最后处理。

:::

## 二、清理节点上的无用镜像

节点镜像是 Kubernetes 为运行容器而下载到本机的镜像副本，与 `rbd-hub` 镜像仓库中的镜像不是同一份数据。清理节点镜像不会删除镜像仓库中的原始镜像。

### 1. 查看节点列表

在管理节点执行：

```bash
kubectl get nodes -o wide
```

记录需要清理的节点名称和 `INTERNAL-IP`。多节点集群需要逐台登录并执行后续操作，建议一次只处理一个节点。

### 2. 登录需要清理的节点并检查镜像占用

```bash
# 确认 nerdctl 已安装
command -v nerdctl

# 查看 k8s.io 命名空间中的镜像和可回收空间
nerdctl -n k8s.io images
nerdctl -n k8s.io system df
```

如果提示 `nerdctl: command not found`，说明该节点没有安装 `nerdctl` 或命令不在 `PATH` 中。不要改用不熟悉的命令强行清理，请先确认集群使用的容器运行时。

### 3. 清理未被容器使用的镜像

```bash
nerdctl -n k8s.io image prune -a
```

命令会列出提示并等待确认。确认当前节点能够正常访问镜像仓库后，输入 `y` 继续。

:::warning

`-a` 会清理当前没有被容器使用的镜像，包括可能很快还会用到的镜像。正在运行的容器不会被删除，但组件下次启动时可能需要重新拉取镜像，因此不要在镜像仓库不可用或网络异常时执行。

不要把命令改为带有 `--volumes` 参数的 `system prune`，以免误删数据卷。

:::

### 4. 验证清理结果

```bash
nerdctl -n k8s.io system df
df -h /var/lib/rancher/rke2
kubectl get pods -A -o wide
```

确认磁盘可用空间增加，并且该节点上的 Pod 仍正常运行。多节点集群确认无异常后，再处理下一台节点。

## 三、清理源码构建缓存

源码构建缓存用于加快重复构建。清理后不会影响正在运行的组件，但下一次源码构建可能变慢。

### 1. 查看缓存大小

在存在 `/opt/rainbond/cache` 目录的节点上执行：

```bash
du -sh /opt/rainbond/cache
du -sh /opt/rainbond/cache/* 2>/dev/null | sort -h
```

如果提示目录不存在，说明当前节点没有使用该目录，跳过本节即可。

### 2. 确认当前没有正在执行的构建任务

进入 Rainbond 控制台，检查各组件的构建状态。确认没有组件正在构建后再继续，避免清理过程与构建任务冲突。

### 3. 清理缓存目录中的内容

以下命令保留 `/opt/rainbond/cache` 目录本身，只删除它下面的内容，包括隐藏文件：

```bash
find /opt/rainbond/cache -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
```

执行后检查结果：

```bash
du -sh /opt/rainbond/cache
df -h /opt/rainbond
```

## 四、清理应用模板包和上传的软件包

### 清理导出的应用模板压缩包

应用导入、导出过程中产生的文件通常位于 `/opt/rainbond/grdata/app`。先查看目录占用：

```bash
du -xhd2 /opt/rainbond/grdata/app 2>/dev/null | sort -h
```

先预览 7 天以前生成的 ZIP 文件：

```bash
find /opt/rainbond/grdata/app -maxdepth 1 -type f -name '*.zip' -mtime +7 -print
```

逐项确认这些文件已经不再需要下载后，再执行删除：

```bash
find /opt/rainbond/grdata/app -maxdepth 1 -type f -name '*.zip' -mtime +7 -delete
```

其中 `-mtime +7` 表示只处理最后修改时间超过 7 天的文件。如果预览没有输出，则没有符合条件的文件。

### 清理上传的软件包

通过 Jar、War、Zip 等软件包创建组件时，源文件可能保存在以下目录：

```text
/opt/rainbond/grdata/package_build/components
```

这些文件可能在组件重新构建时继续使用，因此**禁止直接清空整个目录**。

先查看各子目录占用：

```bash
du -sh /opt/rainbond/grdata/package_build/components/* 2>/dev/null | sort -h
```

每个一级子目录通常对应一个组件。只有同时满足以下条件时，才能删除单个子目录：

1. 对应组件已从 Rainbond 控制台删除。
2. 已确认不再需要使用原软件包重新构建组件。
3. 已将该子目录备份到其他磁盘。

删除时必须复制并使用 `du` 输出中的**完整子目录路径**，不要删除 `components` 目录本身。例如：

```bash
rm -rf -- /opt/rainbond/grdata/package_build/components/<已确认删除的组件目录>
```

将 `<已确认删除的组件目录>` 替换为真实目录名。如果无法确认目录对应哪个组件，不要删除。

## 五、清理内置镜像仓库

只有使用 Rainbond 默认 `rbd-hub` 镜像仓库时，才需要执行本节。使用外部镜像仓库时，请按照外部镜像仓库的清理策略操作。

### 1. 确认是否使用 rbd-hub

```bash
kubectl get rbdcomponent rbd-hub -n rbd-system
kubectl get pods -n rbd-system -l name=rbd-hub
```

能够查询到 `rbd-hub` 资源和 Pod，说明集群中部署了默认镜像仓库。

### 2. 确认清理影响

镜像仓库中的镜像用于部署、升级和回滚组件。清理前应在 Rainbond 控制台中确认：

- 当前正在运行的构建版本必须保留。
- 计划回滚到的历史构建版本必须保留。
- 镜像可以从其他仓库重新拉取，或者已有离线备份。

:::warning 版本注意事项

如果使用 `v6.1.1-release` 和默认 `rbd-hub`，请先参考 [v6.1.2-release 发布说明](https://github.com/goodrain/rainbond/releases/tag/v6.1.2-release) 完成升级，否则可能清理失败。

:::

### 3. 按 rbd-hub 指南清理

按照 [默认镜像仓库 rbd-hub 镜像清理](https://t.goodrain.com/d/21-rbd-hub) 中与当前 Rainbond 大版本一致的步骤操作。完整清理包含两个阶段：

1. 删除确认不再需要的镜像标签。
2. 在 `rbd-hub` 中执行垃圾回收，真正释放存储空间。

只删除标签而不执行垃圾回收，磁盘空间可能不会立即释放。不要直接进入 `rbd-hub` 的持久化目录删除文件，这会损坏镜像仓库数据。

完成后检查：

```bash
kubectl get pods -n rbd-system -l name=rbd-hub
kubectl logs -n rbd-system -l name=rbd-hub --tail=100
```

确认 `rbd-hub` Pod 正常运行且日志中没有持续报错，再在控制台重新部署一个非关键组件，验证镜像可以正常拉取。

## 六、清理组件本地存储

组件本地存储默认位于 `/opt/rainbond/local-path-provisioner`，其中可能包含数据库、上传文件等业务数据。即使目录很大，也不能仅凭目录大小判断它是无用数据。

### 1. 优先从 Rainbond 控制台删除

如果应用或组件仍然存在，请先在 Rainbond 控制台确认数据不再需要，然后从组件的 **存储** 页面卸载并删除对应存储。不要直接在节点上删除目录。

### 2. 查看 Kubernetes 中的存储关系

在管理节点执行：

```bash
# 查看 PVC：STATUS 为 Bound 表示正在绑定使用
kubectl get pvc -A

# 查看 PV 与 PVC 的对应关系及回收策略
kubectl get pv -o custom-columns='PV:.metadata.name,STATUS:.status.phase,NAMESPACE:.spec.claimRef.namespace,PVC:.spec.claimRef.name,RECLAIM-POLICY:.spec.persistentVolumeReclaimPolicy,STORAGECLASS:.spec.storageClassName'
```

重点关注以下字段：

- `PV`：持久卷名称，通常以 `pvc-` 开头。
- `STATUS`：`Bound` 表示正在使用；`Released` 表示原 PVC 已删除，但数据可能仍被保留。
- `NAMESPACE` 和 `PVC`：可以帮助定位对应的应用或组件。
- `RECLAIM-POLICY`：值为 `Retain` 时，删除 PVC 后数据仍会保留，需要人工确认后处理。

:::danger

任何状态为 `Bound` 的 PV 都不得手工删除其宿主机目录。`Released` 也不等于数据可以直接删除，必须先确认业务数据不再需要。

:::

### 3. 定位存储所在节点和目录

先查看本地存储目录大小：

```bash
du -sh /opt/rainbond/local-path-provisioner/* 2>/dev/null | sort -h
```

目录名通常包含 PV 名称、命名空间和 PVC 名称。例如：

```text
pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_<命名空间>_<PVC名称>
```

使用目录中的 PV 名称查询详细信息：

```bash
kubectl get pv <PV名称> -o wide
kubectl describe pv <PV名称>
```

如果查询不到 PV，说明该目录可能是未被 Kubernetes 管理的遗留目录，但仍需在 Rainbond 控制台中确认对应应用和组件已经删除。

### 4. 备份并删除单个遗留目录

确认某个目录不再使用后，先将它备份到**另一块磁盘**。以下示例中的占位符必须替换为真实值：

```bash
tar -C /opt/rainbond/local-path-provisioner \
  -czf /mnt/backup/<目录名称>.tar.gz \
  <目录名称>
```

确认备份文件已经生成：

```bash
ls -lh /mnt/backup/<目录名称>.tar.gz
```

最后仅删除已确认的单个目录：

```bash
rm -rf --one-file-system -- /opt/rainbond/local-path-provisioner/<目录名称>
```

禁止执行 `rm -rf /opt/rainbond/local-path-provisioner/*`，这会删除所有组件的本地存储。

## 七、清理后验证

### 1. 检查释放的空间

```bash
df -h
df -ih
du -xhd1 /opt/rainbond 2>/dev/null | sort -h
```

将结果与清理前的记录对比，确认磁盘空间或 inode 已释放。

### 2. 检查集群和 Rainbond

```bash
kubectl get nodes
kubectl get pods -n rbd-system
kubectl get pods -A --field-selector='status.phase!=Running,status.phase!=Succeeded'
```

还需要在 Rainbond 控制台完成以下检查：

1. 打开应用和组件页面，确认页面可以正常加载。
2. 访问一个正在运行的业务组件。
3. 如果清理了构建缓存，选择一个非关键组件执行一次构建。
4. 如果清理了节点镜像或镜像仓库，重启一个非关键组件，确认镜像可以正常拉取并启动。

## 常见问题

### 清理后磁盘空间没有变化

先确认清理的目录和 `df -h` 中空间不足的目录位于同一个挂载点。然后检查是否有进程仍占用已经删除的文件：

```bash
lsof +L1
```

如果有输出，应先确认占用文件的进程属于哪个服务，再在维护窗口重启对应服务。不要直接重启整个集群。

### `du` 显示不大，但 `df` 显示磁盘已满

常见原因是文件已删除但仍被进程占用，或者容器运行时数据占用了空间。依次检查：

```bash
lsof +L1
nerdctl -n k8s.io system df
```

### 清理镜像后组件启动变慢

这是正常现象。节点需要从镜像仓库重新下载已清理的镜像。等待镜像拉取完成，并确保节点到镜像仓库的网络正常。

### 本地存储目录删除后又出现

该目录很可能仍被 PVC 使用，`local-path-provisioner` 会重新创建它。立即停止继续删除，并通过 `kubectl get pvc -A` 和 `kubectl get pv` 查找对应的应用或组件。

### 命令提示 `Permission denied`

使用 `sudo -i` 切换到 `root` 用户后重试。如果仍然失败，检查目录是否来自 NFS、Ceph 等外部存储，并按照对应存储系统的权限和回收方式处理。
