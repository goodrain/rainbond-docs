---
title: Adjust Kaniko build parameters
descrition: This section of documentation is intended for operation and maintenance personnel. Learn how to specify cluster builds
keywords:
- Rainbond 集群构建参数
- 调整 Kaniko 构建参数
---

## 使用自定义私有镜像仓库

默认情况下无需调整 Kaniko 构建参数，如使用了 http 私有镜像仓库，需要调整 Kaniko 构建参数。

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

### 修改 Kaniko 构建参数

修改 Kaniko 构建参数，添加私有镜像仓库地址：

```bash title="kubectl edit rbdcomponent rbd-chaos -n rbd-system"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
......
spec:
  args:
  - --kaniko-args=--insecure=true,--insecure-pull=true
......
```

## 镜像加速

通过 Dockerfile 构建时，遇到基础镜像无法拉取的问题时，可以通过配置镜像加速服务解决。以下是一个示例，通过配置
--registry-mirror 参数为对应加速服务即可。

```bash title="kubectl edit rbdcomponent rbd-chaos -n rbd-system"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
......
spec:
  args:
  - --kaniko-args=--registry-mirror=dockerproxy.com
......
```

## 使用镜像层缓存

Kaniko 默认不使用镜像层缓存，如需使用镜像层缓存，需要调整 Kaniko 构建参数。

```bash title="kubectl edit rbdcomponent rbd-chaos -n rbd-system"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
......
spec:
  args:
  - --kaniko-args=--cache=true
......
```

## 更多参数

更多参数参考 [Kaniko 官方文档](https://github.com/GoogleContainerTools/kaniko)