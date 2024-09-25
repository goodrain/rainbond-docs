---
title: Example Modify a cluster mirror vault
descrition: How do I change the default mirror warehouse of the cluster
keywords:
  - Rainbond 集群镜像仓库修改
---

:::tip
如果在安装时没有配置镜像仓库相关信息，那么 Rainbond 默认会安装一个私有镜像仓库 rbd-hub，用于存储构建镜像。如果在安装时配置了镜像仓库相关信息，那么 Rainbond 将使用配置的镜像仓库。
:::

本文将介绍在安装集群后修改镜像仓库的两种场景：

1. 已安装集群，默认使用 rbd-hub 镜像仓库，想切换到外部镜像仓库
2. 已安装集群，配置使用外部镜像仓库，想切换到默认的 rbd-hub 镜像仓库

## 切换到外部镜像仓库

如果在安装集群时采用了默认的 rbd-hub 镜像仓库，此时想切换到外部镜像仓库，可以通过以下命令进行切换：

1. 编辑 `rainbondcluster` 资源，修改 `imageHub` 字段。

```yaml
$ kubectl edit rainbondcluster -n rbd-system
spec:
  imageHub: # 修改此字段
    domain: 172.31.112.97:5000
    namespace: rainbond
    password: admin
    username: admin
```

2. 删除 `rbd-hub` CRD资源。

```yaml
kubectl delete rbdcomponent rbd-hub -n rbd-system 
```

3. 重启 `rainbond-operator` 组件。

```bash
kubectl delete pod -l release=rainbond-operator -n rbd-system
```

4. 重启 `rbd-chaos` 和 `rbd-node` 组件。

```bash
kubectl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-node -n rbd-system
```

## 切换到默认镜像仓库

如果在安装集群时采用了外部镜像仓库，此时不想使用外部镜像仓库了，想切换到默认的 rbd-hub 镜像仓库，可以通过以下命令进行切换：

1. 编辑 `rainbondcluster` 资源，将自定义的 `imageHub` 字段删除。

```yaml
$ kubectl edit rainbondcluster -n rbd-system

spec:
  imageHub: # 删除此字段
    domain: 172.31.112.97:5000
    password: admin
    username: admin
```

2. 重启 `rainbond-operator` 组件。

```bash
kubectl delete pod -l release=rainbond-operator -n rbd-system
```

3. 创建 `rbd-hub` CRD 资源。

```yaml
$ kubectl apply -f rbd-hub.yaml

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
    persistentVolumeClaimAccessModes: ReadWriteOnce
spec:
  replicas: 1
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/registry:2.6.2
  imagePullPolicy: IfNotPresent
  priorityComponent: true
```

4. 重启 `rbd-chaos` 和 `rbd-node` 组件即可。

```bash
kubectl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-node -n rbd-system
```
