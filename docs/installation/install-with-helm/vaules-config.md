---
title: Chart 安装选项
description: '详细介绍 helm 安装过程中的 values 参数设置及如何变更已安装集群配置'
---

本文档描述 Rainbond Helm Chart 的安装配置选项

## Operator 配置

| 配置项                    | 默认值                                                       | 说明                            |
| ------------------------- | ------------------------------------------------------------ | ------------------------------- |
| operator.name             | rainbond-operator                                            | operator 的 deployment 资源名称 |
| operator.image.name       | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator | operator 镜像名称               |
| operator.image.tag        | v2.2.0                                                       | operator 镜像tag                |
| operator.image.pullPolicy | IfNotPresent                                                 | operator 镜像拉取策略           |
| operator.logLevel         | 4                                                            | operator 的日志输出级别         |

### Values.yaml 示例配置

```yaml
operator:
  name: rainbond-operator
  image:
    name: registry.cn-hangzhou.aliyuncs.com/yangkaa/rainbond-operator
    tag: v2.2.0-dev
    pullPolicy: IfNotPresent
  logLevel: 4
```

## Cluster 配置

### 高可用安装

高可用模式下必须提供外部数据库、外部 Etcd 、外部共享存储(RWX)

| 配置项           | 默认值 | 说明           |
| ---------------- | ------ | -------------- |
| Cluster.enableHA | false  | 启用高可用模式 |

### 配置外部镜像仓库

| 配置项                     | 默认值 | 类型   | 说明             |
| -------------------------- | ------ | ------ | ---------------- |
| Cluster.imageHub.enable    | false  | Bool   | 启用外部镜像仓库 |
| Cluster.imageHub.domain    | ""     | String | 镜像仓库地址     |
| Cluster.imageHub.namespace | ""     | String | 镜像仓库命名空间 |
| Cluster.imageHub.password  | ""     | String | 镜像仓库密码     |
| Cluster.imageHub.username  | ""     | String | 镜像仓库用户名   |

### 配置外部ETCD

| 配置项                  | 默认值 | 类型   | 说明                                                        |
| ----------------------- | ------ | ------ | ----------------------------------------------------------- |
| Cluster.etcd.enable     | false  | Bool   | 启用外部ETCD                                                |
| Cluster.etcd.endpoints  | ""     | Array  | ETCD 集群列表                                               |
| Cluster.etcd.secretName | ""     | String | ETCD 集群的证书 secret 文件，需在 rbd-system 命名空间下创建 |

### 配置外部存储

如果使用阿里云 NAS 存储，需要配置 `Cluster.RWX.type=aliyun` `Cluster.RWX.config.server=<SERVER>`，Rainbond 会自动安装阿里云 NAS CSI 并对接使用。

| 配置项                              | 默认值 | 类型   | 说明                           |
| ----------------------------------- | ------ | ------ | ------------------------------ |
| Cluster.RWX.enable                  | false  | Bool   | 开启外部共享存储RWX            |
| Cluster.RWX.type                    | none   | String | 公有云存储类型，目前支持aliyun |
| Cluster.RWX.config.storageClassName | ""     | String | StorageClass 名称              |
| Cluster.RWX.config.server           | ""     | String | 阿里云NAS存储地址              |
| Cluster.RWO.enable                  | false  | Bool   | 开启外部共享存储RWO            |
| Cluster.RWO.storageClassName        | ""     | String | StorageClass 名称              |

### 配置 Rainbond 集群端数据库

| 配置项                          | 默认值 | 类型   | 说明                 |
| ------------------------------- | ------ | ------ | -------------------- |
| Cluster.regionDatabase.enable   | false  | Bool   | 启用外部集群端数据库 |
| Cluster.regionDatabase.host     | ""     | String | 数据库地址           |
| Cluster.regionDatabase.name     | ""     | String | 数据库名称           |
| Cluster.regionDatabase.password | ""     | String | 数据库密码           |
| Cluster.regionDatabase.port     | ""     | String | 数据库端口           |
| Cluster.regionDatabase.username | ""     | String | 数据库用户           |

### 配置 Rainbond 控制台数据库

| 配置项                      | 默认值 | 类型   | 说明                 |
| --------------------------- | ------ | ------ | -------------------- |
| Cluster.uiDatabase.enable   | false  | Bool   | 启用外部控制台数据库 |
| Cluster.uiDatabase.host     | ""     | String | 数据库地址           |
| Cluster.uiDatabase.name     | ""     | String | 数据库名称           |
| Cluster.uiDatabase.password | ""     | String | 数据库密码           |
| Cluster.uiDatabase.port     | ""     | String | 数据库端口           |
| Cluster.uiDatabase.username | ""     | String | 数据库用户           |



### 配置集群对外 IP

设置 SLB 或 VIP 来保障 Rainbond 网关的高可用

| 配置项                    | 默认值 | 类型  | 说明               |
| ------------------------- | ------ | ----- | ------------------ |
| Cluster.gatewayIngressIPs | ""     | Array | 配置网关负责均衡IP |

### 配置网关节点

| 配置项                             | 默认值 | 类型  | 说明                                  |
| ---------------------------------- | ------ | ----- | ------------------------------------- |
| Cluster.nodesForGateway.externalIP | ""     | Array | 运行网关服务的 Kubernetes 节点外部 IP |
| Cluster.nodesForGateway.internalIP | ""     | Array | 运行网关服务的 Kubernetes 节点内部 IP |
| Cluster.nodesForGateway.name       | ""     | Array | 运行网关服务的 Kubernetes 节点名称    |

### 配置构建节点

| 配置项                     | 默认值 | 类型  | 说明                                   |
| -------------------------- | ------ | ----- | -------------------------------------- |
| Cluster.nodesForChaos.name | ""     | Array | 运行集群构建服务的 Kubernetes 节点名称 |

### 配置集群端镜像获取地址

| 配置项                          | 默认值                                     | 类型   | 说明                     |
| ------------------------------- | ------------------------------------------ | ------ | ------------------------ |
| Cluster.rainbondImageRepository | registry.cn-hangzhou.aliyuncs.com/goodrain | String | 集群端安装拉取的镜像地址 |

### 配置安装版本

| 配置项                 | 默认值 | 类型   | 说明                 |
| ---------------------- | ------ | ------ | -------------------- |
| Cluster.installVersion | latest | String | 集群安装拉取镜像 tag |

### 配置集群端镜像拉取策略

| 配置项                  | 默认值       | 类型   | 说明             |
| ----------------------- | ------------ | ------ | ---------------- |
| Cluster.imagePullPolicy | IfNotPresent | String | 集群镜像拉取策略 |

### 配置集群副本

| 配置项           | 默认值 | 类型 | 说明          |
| ---------------- | ------ | ---- | ------------- |
| Cluster.replicas | 2      | int  | 集群POD副本数 |

## Values.yaml 示例配置


<details>
  <summary>Helm Chart value.yaml 完整示例</summary>
  <div>

```yaml
#Rainbondcluster
Cluster:
## 定义是否开启高可用，true为开，false为关  
  enableHA: false

## 定义是否使用外部镜像镜像仓库，true为开，false为关
  imageHub:
    enable: false
    domain: registry.cn-hangzhou.aliyuncs.com
    namespace: rainbond
    password: admin
    username: admin

## 外部ETCD，对应填写IP，证书，true为开，false为关
  etcd:
    enable: false
    endpoints: 
    - 192.168.0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## 外部存储，直接填写storageClassName，true为开，false为关
  RWX:
    enable: false
    type: none
    config:
      storageClassName: glusterfs-simple
      server: 

## 外部存储，直接填写storageClassName，true为开，false为关
  RWO:
    enable: false
    storageClassName: glusterfs-simple

## region数据库，true为开，false为关
  regionDatabase:
    enable: false
    host: 192.168.0.1
    name: region
    password: password
    port: 3306
    username: admin

## ui数据库，true为开，false为关
  uiDatabase:
    enable: false
    host: 192.168.0.1
    name: console
    password: password
    port: 3306
    username: admin 

## 对外网关，填写IP
  gatewayIngressIPs: 192.168.0.1

## chaos对应配置，name为Chaos节点node名称
  nodesForChaos:
  - name: node1
  - name: node2

## 网关节点对应配置，externalIP为网关节点外部IP，internalIP为网关节点内部IP，name为网关节点node名称
  nodesForGateway:
  - externalIP: 192.168.0.1
    internalIP: 192.168.0.1
    name: node1
  - externalIP: 192.168.0.2
    internalIP: 192.168.0.2
    name: node2
    
## 系统组件统一镜像仓库拉取地址及名称空间
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
## 系统组件统一镜像版本
  installVersion: v5.6.0-release
## 系统组件统一镜像拉取策略
  imagePullPolicy: IfNotPresent
## 高可用安装模式下，系统组件副本数
  replicas: 2
```
</div>
</details>