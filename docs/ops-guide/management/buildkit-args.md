---
title: 调整 Buildkit 构建参数
descrition: 该章节文档适用于运维人员了解如何指定集群构建
keywords:
- Rainbond 集群构建参数
- 调整 BuildKit 构建参数
---

## 使用自定义私有镜像仓库

自v5.15后Kaniko替换成Buildkit，之前版本参考 [调整 Kaniko 构建参数](/docs/ops-guide/management/kaniko-args.md)，默认情况下无需调整 BuildKit 构建参数，如使用了 http 私有镜像仓库，需要调整 BuildKit 构建参数。

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

### 修改 Buidkit 构建参数

修改 Kaniko 构建参数，添加私有镜像仓库地址：

```bash title="kubectl edit rbdcomponent rbd-chaos -n rbd-system"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
......
spec:
  args:
  - --buildkit-args=http=true&insecure=true
......
```

## 更多参数

更多参数参考 [buildkit 官方文档](https://github.com/moby/buildkit)