---
title: 集群资源清理
description: 本文介绍如何清理 Rainbond 集群中的各类资源，帮助您释放磁盘空间
keywords:
- Rainbond 资源清理
- 镜像清理
- 存储清理
---

## 概述

在 Rainbond 的使用过程中，各类资源会占用系统存储空间，主要包括：

* 容器镜像
* 构建缓存
* 组件数据
* 应用模版

本文将指导您如何清理这些资源，释放磁盘空间。

## 镜像资源清理

### 清理未使用的镜像

在 Kubernetes 节点上执行以下命令，可以清理未使用的镜像：

```bash
# 清理未使用的镜像、容器和网络资源
nerdctl -n k8s.io system prune -a

# 查看清理后的效果
nerdctl -n k8s.io images
```

### 清理镜像仓库

:::warning
如您是 v6.1.1-release 版本且使用默认的 rbd-hub 镜像仓库，请参阅 [v6.1.2-release](https://github.com/goodrain/rainbond/releases/tag/v6.1.2-release) 发布文档升级，否则会导致清理失败。
:::

请参阅 [rbd-hub 镜像仓库清理](https://t.goodrain.com/d/21-rbd-hub) 文档。

## 本地存储清理

### 组件本地存储

**存储位置**：`/opt/rainbond/local-path-provisioner`

清理建议：
1. 确认组件是否仍在使用该存储
2. 使用以下命令查看存储使用情况：
```bash
du -sh /opt/rainbond/local-path-provisioner/*
```
3. 删除确认不再使用的存储目录

### 构建资源清理

1. **源码构建缓存**：源码构建缓存依赖包
```bash
# 清理构建缓存
rm -rf /opt/rainbond/cache/*
```

2. **上传的软件包**：构建组件时上传的软件包，如 `Jar、War、Zip` 等
```bash
# 清理位置
/opt/rainbond/grdata/package_build/components
```

3. **应用模版包**：导入导出的应用模版包
```bash
# 清理位置
/opt/rainbond/grdata/app
```

:::warning
在进行资源清理时请注意：
1. 确保清理的资源确实不再使用
2. 重要数据建议提前备份
:::

## 常见问题

**清理后空间未释放**
- 检查是否有进程占用文件
- 使用 `lsof` 命令查看文件占用
- 可能需要重启相关服务释放文件
