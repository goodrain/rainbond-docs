---
title: Helm Chart 选项
description: '详细介绍 helm 安装过程中的 values 参数设置及如何变更已安装集群配置'
keywords:
- rainbond helm values 配置 安装 集群
- rainbond helm values config install cluster
---

本文提供了 Rainbond Helm Chart 的配置参考。

## 示例配置

```yaml title="vi values.yaml"
Cluster:
  gatewayIngressIPs: 192.168.8.8

  nodesForGateway:
  - externalIP: 192.168.8.8
    internalIP: 192.168.8.8
    name: k8s1
# - More nodes for gateway

  nodesForChaos:
  - name: k8s1
# - More nodes for chaos

  containerdRuntimePath: /run/containerd
  
  imageHub:
    enable: true
    domain: image.image.com
    namespace: admin
    username: admin
    password: admin

  regionDatabase:
    enable: true
    host: 192.168.8.8
    port: 3306
    name: region
    username: root
    password: root

  uiDatabase:
    enable: true
    host: 192.168.8.8
    port: 3306
    name: console
    username: root
    password: root

  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  installVersion: <version>-release
  imagePullPolicy: IfNotPresent
  replicas: 2
```

## 常用选项

### 集群对外 IP

Rainbond 平台统一对外访问`IP`，位于网关节点之上的负载均衡`IP`，如无则填写任意网关节点的内/外网`IP`。

| 配置项                    | 默认值 | 类型  | 说明               |
| ------------------------- | ------ | ----- | ------------------ |
| `Cluster.gatewayIngressIPs` |      | Array | 配置网关负责均衡`IP` |

### 网关节点

选择 Rainbond 网关服务运行在哪些`K8s`节点上。

| 配置项                             | 默认值 | 类型  | 说明                                  |
| ---------------------------------- | ------ | ----- | ----------------- |
| `Cluster.nodesForGateway.externalIP` |      | Array | `K8s`节点外网`IP` |
| `Cluster.nodesForGateway.internalIP` |      | Array | `K8s`节点内网`IP` |
| `Cluster.nodesForGateway.name`       |      | Array | `K8s`节点名称    |

### 构建节点

| 配置项                     | 默认值 | 类型  | 说明                                   |
| -------------------------- | ------ | ----- | -------------------------------------- |
| `Cluster.nodesForChaos.name` |      | Array | `K8s`节点名称 |

### Containerd 目录

| 配置项                     | 默认值 | 类型  | 说明                                   |
| -------------------------- | ------ | ----- | -------------------------------------- |
| `Cluster.containerdRuntimePath` | `/run/containerd` | String | 定义`containerd`运行时目录路径。如使用`k3s`或`RKE2`，则为`/var/run/k3s/containerd` |


## 高级选项

### 外部镜像仓库

| 配置项                       | 默认值 | 类型   | 说明             |
| ---------------------------- | ------ | ------ | ---------------- |
| `Cluster.imageHub.enable`    | false  | Bool   | 启用外部镜像仓库 |
| `Cluster.imageHub.domain`    |        | String | 镜像仓库地址     |
| `Cluster.imageHub.namespace` |        | String | 镜像仓库命名空间 |
| `Cluster.imageHub.password`  |        | String | 镜像仓库密码     |
| `Cluster.imageHub.username`  |        | String | 镜像仓库用户名   |


### Rainbond 集群端数据库

| 配置项                            | 默认值 | 类型   | 说明                 |
| --------------------------------- | ------ | ------ | -------------------- |
| `Cluster.regionDatabase.enable`   | false  | Bool   | 启用外部集群端数据库 |
| `Cluster.regionDatabase.host`     |        | String | 数据库地址           |
| `Cluster.regionDatabase.name`     |        | String | 数据库名称           |
| `Cluster.regionDatabase.password` |        | String | 数据库密码           |
| `Cluster.regionDatabase.port`     |        | String | 数据库端口           |
| `Cluster.regionDatabase.username` |        | String | 数据库用户           |

### Rainbond 控制台数据库

MySQL 8.0 以上版本需要配置 `default_authentication_plugin` 为 `mysql_native_password`。

| 配置项                        | 默认值 | 类型   | 说明                 |
| ----------------------------- | ------ | ------ | -------------------- |
| `Cluster.uiDatabase.enable`   | false  | Bool   | 启用外部控制台数据库 |
| `Cluster.uiDatabase.host`     |        | String | 数据库地址           |
| `Cluster.uiDatabase.name`     |        | String | 数据库名称           |
| `Cluster.uiDatabase.password` |        | String | 数据库密码           |
| `Cluster.uiDatabase.port`     |        | String | 数据库端口           |
| `Cluster.uiDatabase.username` |        | String | 数据库用户           |

### 镜像源地址

| 配置项                            | 默认值                                       | 类型   | 说明                   |
| --------------------------------- | -------------------------------------------- | ------ | ---------------------- |
| `Cluster.rainbondImageRepository` | `registry.cn-hangzhou.aliyuncs.com/goodrain` | String | 安装获取镜像的仓库地址 |

### 安装版本

| 配置项                   | 默认值 | 类型   | 说明      |
| ------------------------ | ------ | ------ | --------- |
| `Cluster.installVersion` | latest | String | 镜像`tag` |

### 镜像拉取策略

| 配置项                    | 默认值       | 类型   | 说明         |
| ------------------------- | ------------ | ------ | ------------ |
| `Cluster.imagePullPolicy` | IfNotPresent | String | 镜像拉取策略 |

### 副本数

| 配置项           | 默认值 | 类型 | 说明   |
| ---------------- | ------ | ---- | ------ |
| Cluster.replicas | 2      | int  | 副本数 |