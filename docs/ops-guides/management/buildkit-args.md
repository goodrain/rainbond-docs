---
title: 配置私有镜像仓库与镜像加速
description: 本文介绍如何在 Rainbond 中配置私有镜像仓库和配置镜像加速，以解决镜像拉取失败的问题
keywords:
- Rainbond 私有镜像仓库配置
- Rainbond 镜像加速配置
- 解决镜像拉取失败
---

## 概述

在使用 Rainbond 过程中，您可能会遇到以下场景：

1. 需要使用私有镜像仓库中的镜像
2. 从 DockerHub 拉取镜像速度慢或失败
3. 使用源码构建时，基础镜像拉取失败

本文将帮助您解决这些问题。

## 配置私有镜像仓库

### 场景一：通过镜像创建组件

当您需要使用私有镜像仓库中的镜像来创建组件时，需要配置 Containerd。具体配置方法根据您的安装方式有所不同：

#### 方式一：快速安装用户

如果您是使用快速安装方式部署的 Rainbond，请按以下步骤操作：

1. 进入 Rainbond 容器
```bash
docker exec -it rainbond bash
```

2. 编辑配置文件
```bash
vim /etc/rancher/k3s/registries.yaml
```

3. 添加私有仓库配置
```yaml
mirrors:
  "your-registry.com:5000":
    endpoint:
      - "http://your-registry.com:5000"
configs:
  "your-registry.com:5000":
    auth:
      username: your-username
      password: your-password
```

4. 重启容器使配置生效
```bash
docker restart rainbond
```

#### 方式二：主机安装用户

如果您是使用主机安装方式部署的 Rainbond，请按以下步骤操作：

1. 编辑配置文件
```bash
vim /etc/rancher/rke2/registries.yaml
```

2. 添加私有仓库配置（格式同上）

3. 重启服务使配置生效
```bash
# 主节点执行
systemctl restart rke2-server
# 工作节点执行
systemctl restart rke2-agent
```

### 场景二：源码构建使用私有镜像

当您在源码构建过程中需要使用私有镜像仓库的基础镜像时，需要配置 BuildKit：
> [BuildKit](https://github.com/moby/buildkit) 是一种在 K8S 集群中构建镜像的工具，Rainbond 采用它作为源码构建的镜像构建工具。
1. 首先执行一次源码构建（无论成功与否），以生成配置文件
2. 编辑 BuildKit 配置：
```bash
kubectl edit cm goodrain.me -n rbd-system
```

3. 添加私有仓库配置：
```yaml
data:
  buildkittoml: |-
    debug = true
    [registry."goodrain.me"]
      http = false
      insecure = true
    # 添加您的私有仓库配置
    [registry."your-registry.com:5000"]
      http = true
      # Use HTTPS with self-signed certificates. Do not enable this together with http.
      insecure = false
      # 如果需要认证，添加以下配置
      username = "your-username"
      password = "your-password"
```

## 配置镜像加速

### 场景一：加速 DockerHub 镜像拉取

如果您在通过镜像创建组件时，从 DockerHub 拉取镜像较慢，可以配置镜像加速：

#### 快速安装用户

1. 进入 Rainbond 容器并编辑配置：
```yaml
# vim /etc/rancher/k3s/registries.yaml
mirrors:
  "docker.io":
    endpoint:
      - "https://your-mirror-address"
```

2. 重启容器：
```bash
docker restart rainbond
```

#### 主机安装用户

1. 编辑配置文件：
```yaml
# vim /etc/rancher/rke2/registries.yaml
mirrors:
  "docker.io":
    endpoint:
      - "https://your-mirror-address"
```

2. 重启服务：
```bash
# 主节点执行
systemctl restart rke2-server
# 工作节点执行
systemctl restart rke2-agent
```

### 场景二：加速源码构建基础镜像拉取

如果在源码构建过程中，基础镜像拉取速度较慢，可以配置 BuildKit 镜像加速：

1. 编辑配置：
```bash
kubectl edit cm goodrain.me -n rbd-system
```

2. 添加镜像加速配置：
```yaml
data:
  buildkittoml: |-
    debug = true
    [registry."goodrain.me"]
      http = false
      insecure = true
    [registry."docker.io"]
      mirrors = ["https://your-mirror-address"]
      http = true
      # Use HTTPS with self-signed certificates. Do not enable this together with http.
      insecure = false
```

## 常见问题

1. **配置没有生效？**
   - 检查配置文件格式是否正确
   - 确认是否已经重启相关服务
   - 检查日志是否有错误信息

2. **配置了加速但仍然很慢？**
   - 尝试使用其他镜像加速地址
   - 检查网络连接是否正常
   - 考虑使用私有镜像仓库

3. **找不到 goodrain.me 配置？**
   - 需要先执行一次源码构建，配置文件会自动创建
   - 构建任务可以失败，但必须要执行过构建操作
