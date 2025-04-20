---
title: 镜像仓库管理
description: 本文介绍如何在 Rainbond 中切换和管理镜像仓库
keywords:
- Rainbond 镜像仓库
- 切换镜像仓库
- 私有镜像仓库配置
---

## 概述

Rainbond 支持两种镜像仓库方案：

1. **内置镜像仓库**：默认安装的 `rbd-hub`，基于 Docker Registry 实现
2. **外部镜像仓库**：如企业自建的私有镜像仓库、云厂商提供的镜像仓库服务

:::tip
如果您在安装 Rainbond 时：
* 未指定镜像仓库 - 将自动部署内置的 rbd-hub
* 已指定外部镜像仓库 - 将直接使用您配置的外部镜像仓库
:::

## 切换镜像仓库

### 场景一：切换到外部镜像仓库

如果您正在使用默认的 rbd-hub，想要切换到外部镜像仓库，请按以下步骤操作：

1. **配置外部镜像仓库信息**

```bash
# 编辑集群配置
kubectl edit rainbondcluster -n rbd-system
```

添加或修改以下配置：
```yaml
spec:
  imageHub:
    domain: <仓库地址>        # 例如：registry.example.com:5000
    namespace: <命名空间>     # 例如：rainbond（可选）
    username: <用户名>       # 例如：admin
    password: <密码>         # 例如：password
```

2. **删除内置镜像仓库**
```bash
# 删除 rbd-hub 组件
kubectl delete rbdcomponent rbd-hub -n rbd-system 
```

3. **重启相关服务**
```bash
# 重启 operator 使配置生效
kubectl delete pod -l name=rainbond-operator -n rbd-system

# 重启构建服务使配置生效
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

### 场景二：切换回内置镜像仓库

如果您想从外部镜像仓库切换回默认的 rbd-hub，请按以下步骤操作：

1. **移除外部镜像仓库配置**

编辑集群配置，删除以下配置：
```yaml title="kubectl edit rainbondcluster -n rbd-system"
spec:
  imageHub:    # 删除整个 imageHub 配置块
    domain: xxx
    username: xxx
    password: xxx
```

2. **部署内置镜像仓库**

创建 `rbd-hub.yaml` 文件：
```yaml title="kubectl apply -f rbd-hub.yaml"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
metadata:
  name: rbd-hub
  namespace: rbd-system
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: rbd-hub
    priorityComponent: "true"
spec:
  replicas: 1
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/registry:2.6.2
  imagePullPolicy: IfNotPresent
  priorityComponent: true
```

3. **重启相关服务**
```bash
# 重启 operator
kubectl delete pod -l name=rainbond-operator -n rbd-system

# 重启构建服务
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## 验证配置

完成切换后，您可以通过以下方式验证配置是否生效：

1. **检查镜像仓库状态**
```bash
# 查看镜像仓库组件状态
kubectl get pod -n rbd-system | grep hub
```

2. **测试镜像推送**
```bash
# 如果使用内置仓库
docker login goodrain.me -u admin -p admin1234

# 如果使用外部仓库
docker login <您的仓库地址> -u <用户名> -p <密码>

# 推送测试镜像
docker tag nginx:latest <仓库地址>/nginx:test
docker push <仓库地址>/nginx:test
```

:::warning
切换镜像仓库前，请确保：
1. 已备份重要的镜像
2. 了解切换过程中可能的影响
3. 选择合适的时间进行切换
:::

