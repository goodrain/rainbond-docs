---
title: Helm Chart 选项
description: How to set values during helm installation and how to change the installed cluster configuration
keywords:
  - rainbond help values configuration installation cluster
  - rainbond help values config install cluster
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
    password: admin
    username: admin

  regionDatabase:
    enable: true
    host: 192.168.8.8
    name: region
    password: root
    port: 3306
    username: root

  uiDatabase:
    enable: true
    host: 192.168.8.8
    name: console
    password: root
    port: 3306
    username: root

  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  installVersion: v6.0.0-release
  imagePullPolicy: IfNotPresent
  replicas: 2
```

## 常用选项

### 集群对外 IP

Rainbond 平台统一对外访问`IP`，位于网关节点之上的负载均衡`IP`，如无则填写任意网关节点的内/外网`IP`。

| Configuration Item          | Default value | Type  | Note         |
| --------------------------- | ------------- | ----- | ------------ |
| `Cluster.gatewayIngressIPs` |               | Array | 配置网关负责均衡`IP` |

### 网关节点

选择 Rainbond 网关服务运行在哪些`K8s`节点上。

| Configuration Item                   | Default value | Type  | Note          |
| ------------------------------------ | ------------- | ----- | ------------- |
| `Cluster.nodesForGateway.externalIP` |               | Array | `K8s`节点外网`IP` |
| `Cluster.nodesForGateway.internalIP` |               | Array | `K8s`节点内网`IP` |
| `Cluster.nodesForGateway.name`       |               | Array | `K8s`节点名称     |

### 构建节点

| Configuration Item           | Default value | Type  | Note      |
| ---------------------------- | ------------- | ----- | --------- |
| `Cluster.nodesForChaos.name` |               | Array | `K8s`节点名称 |

### Containerd 目录

| Configuration Item              | Default value     | Type   | Note                                                              |
| ------------------------------- | ----------------- | ------ | ----------------------------------------------------------------- |
| `Cluster.containerdRuntimePath` | `/run/containerd` | String | 定义`containerd`运行时目录路径。如使用`k3s`或`RKE2`，则为`/var/run/k3s/containerd` |

## 高级选项

### 外部镜像仓库

| 配置项                          | 默认值   | 类型     | 说明                          |
| ---------------------------- | ----- | ------ | --------------------------- |
| `Cluster.imageHub.enable`    | false | Bool   | 启用外部镜像仓库                    |
| `Cluster.imageHub.domain`    |       | String | Image repository address    |
| `Cluster.imageHub.namespace` |       | String | Mirror repository namespace |
| `Cluster.imageHub.password`  |       | String | Image repository password   |
| `Cluster.imageHub.username`  |       | String | Mirror repository username  |

### Rainbond 集群端数据库

| Configuration Item                | Default value | Type   | Note                             |
| --------------------------------- | ------------- | ------ | -------------------------------- |
| `Cluster.regionDatabase.enable`   | false         | Bool   | Enable external cluster database |
| `Cluster.regionDatabase.host`     |               | String | Database address                 |
| `Cluster.regionDatabase.name`     |               | String | Database name                    |
| `Cluster.regionDatabase.password` |               | String | Database password                |
| `Cluster.regionDatabase.port`     |               | String | Database Port                    |
| `Cluster.regionDatabase.username` |               | String | Database User                    |

### Rainbond 控制台数据库

MySQL 8.0 以上版本需要配置 `default_authentication_plugin` 为 `mysql_native_password`。

| Configuration Item            | Default value | Type   | Note                             |
| ----------------------------- | ------------- | ------ | -------------------------------- |
| `Cluster.uiDatabase.enable`   | false         | Bool   | Enable external console database |
| `Cluster.uiDatabase.host`     |               | String | Database address                 |
| `Cluster.uiDatabase.name`     |               | String | Database name                    |
| `Cluster.uiDatabase.password` |               | String | Database password                |
| `Cluster.uiDatabase.port`     |               | String | Database Port                    |
| `Cluster.uiDatabase.username` |               | String | Database User                    |

### 镜像源地址

| Configuration Item                | Default value                                | Type   | Note        |
| --------------------------------- | -------------------------------------------- | ------ | ----------- |
| `Cluster.rainbondImageRepository` | `registry.cn-hangzhou.aliyuncs.com/goodrain` | String | 安装获取镜像的仓库地址 |

### 安装版本

| Configuration Item       | Default value | Type   | Note    |
| ------------------------ | ------------- | ------ | ------- |
| `Cluster.installVersion` | Late          | String | 镜像`tag` |

### 镜像拉取策略

| Configuration Item        | Default value | Type   | Note   |
| ------------------------- | ------------- | ------ | ------ |
| `Cluster.imagePullPolicy` | IfNotPresent  | String | 镜像拉取策略 |

### 副本数

| Configuration Item               | Default value | Type     | Note |
| -------------------------------- | ------------- | -------- | ---- |
| Cluster.replicas | 2             | Annex II | 副本数  |
