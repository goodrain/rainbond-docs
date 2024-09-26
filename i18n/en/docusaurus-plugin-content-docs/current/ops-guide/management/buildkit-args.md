---
title: 调整 BuildKit 构建参数
descrition: 该章节文档适用于运维人员了解如何指定集群构建
keywords:
  - Rainbond 集群构建参数
  - 调整 BuildKit 构建参数
---

:::info
v5.12.2 版本后，Rainbond 默认使用 BuildKit 进行构建，如果是该版本之前的版本，请参考 [调整 Kaniko 构建参数](https://v5.14-docs.rainbond.com/docs/ops-guide/management/kaniko-args)。
:::

## 使用自定义私有镜像仓库

默认情况下无需调整 BuildKit 构建参数，如使用了 http 私有镜像仓库，需要调整 Kaniko 构建参数。

### 修改容器配置

Docker 配置 `/etc/docker/daemon.json`，添加私有镜像仓库地址：

```json
{
  "insecure-registries": ["http://xxx.xxx.xxx.xxx:5000"]
}
```

Containerd 配置 `/etc/containerd/config.toml`，添加私有镜像仓库地址：

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."http://xxx.xxx.xxx.xxx:5000"]
    endpoint = ["http://xxx.xxx.xxx.xxx:5000"]
```

### 修改 BuildKit 构建参数

修改 BuildKit 构建参数，添加私有镜像仓库地址：

```diff title="kubectl edit cm goodrain.me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."xxx.xxx.xxx.xxx:5000"]
      http = true
      insecure = true
kind: ConfigMap
metadata:
  creationTimestamp: "2023-07-23T13:11:26Z"
  name: goodrain.me
  namespace: rbd-system
```

## 镜像加速

通过 Dockerfile 构建时，遇到基础镜像无法拉取的问题时，可以通过配置镜像加速服务解决。示例如下：

```diff title="kubectl edit cm goodrain-me -n rbd-system"
apiVersion: v1
data:
  buildkittoml: |-
    debug = true
    [registry."docker.io"]
      mirrors = ["dockerproxy.com"]
kind: ConfigMap
metadata:
  creationTimestamp: "2023-07-23T13:11:26Z"
  name: goodrain.me
  namespace: rbd-system
```

## 更多参数

更多参数参考 [BuildKit 官方文档](https://github.com/moby/buildkit)
