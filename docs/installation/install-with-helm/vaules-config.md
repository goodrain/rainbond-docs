---
title: 'values.yaml 详解'
weight: 203
description: '详细介绍 helm 安装过程中的 values 参数设置及如何变更已安装集群配置'
---

本文档对基于 Helm 安装 Rainbond 集群支持的所有参数进行说明，并说明如何变更已安装 Rainbond 集群配置

### 变更配置项

对于支持动态变更的配置项，可通过以下命令进行动态变更，变更文件内需要指定创建时的所有配置项，如不指定则会被默认值覆盖，对于不支持变更的配置项请勿随意修改，避免造成数据丢失等问题

```bash
helm upgrade rainbond ./rainbond-chart -f value_change.yaml -n rbd-system
```

### Operator 配置

以下配置项均支持动态变更

- name：operator 的 deployment 资源名称
- image：
    - name：operator 的镜像下载地址，默认为 registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    - tag：operator 的镜像 tag ，默认为 v2.0.0
    - pullPolicy：operator 镜像拉取策略，默认为 IfNotPresent
- logLevel：operator 的日志输出级别，默认为 4

示例文件：
```yaml
operator:
  name: rainbond-operator
  image:
    name: registry.cn-hangzhou.aliyuncs.com/yangkaa/rainbond-operator
    tag: v2.2.0-dev
    pullPolicy: IfNotPresent
  logLevel: 4
```

### Cluster 配置

- enableHA：是否启用高可用模式，默认为 false ，设置为 true 则启用高可用安装，高可用模式下必须提供外部数据库、外部 Etcd 、外部共享存储（RWX）
- imageHub：此配置项不支持动态变更
    - enable：是否启用外部镜像仓库，默认为 false ，设置为 true 则启用
    - domain：外部镜像仓库的访问地址
    - namespace：外部镜像仓库的名称空间
    - password：外部镜像仓库的访问密码
    - username：外部镜像仓库的访问用户
- etcd：此配置项不支持动态变更
    - enable：是否启用外部ETCD，默认为 false ，设置为 true 则启用
    - endpoints：外部 ETCD 集群访问列表
    - secretName：访问 ETCD 集群的证书 secret 文件，创建时需要指定和 rainbond 集群相同的 namespace 
- RWX：搭建外部存储请参考 [Glusterfs分布式存储文档](/docs/ops-guide/storage/deploy-glusterfs)，此配置项不支持动态变更
    - enable：是否开启外部共享存储，默认为 false ，设置为 true 则启用
    - storageClassName：外部共享存储的 storageClass 名称
- RWO：此配置项不支持动态变更
    - enable：是否开启外部块存储，默认为 false ，设置为 true 则启用
    - storageClassName：外部块存储的 storageClass 名称
- regionDatabase：此配置项不支持动态变更
    - enable：是否启用外部集群数据库，默认为 false ，设置为 true 则启用
    - host：外部集群数据库访问地址
    - name：外部集群数据库库名称
    - password：外部集群数据库访问密码
    - port：外部集群数据库访问端口
    - username：外部集群数据库访问用户
- uiDatabase：此配置项不支持动态变更
    - enable：是否启用外部控制台数据库，默认为 false ，设置为 true 则启用
    - host：外部控制台数据库访问地址
    - name：外部控制台数据库库名称
    - password：外部控制台数据库访问密码
    - port：外部控制台数据库访问端口
    - username：外部控制台数据库访问用户
- gatewayIngressIPs：集群对外IP，必须填写
- nodesForChaos：此配置项支持动态变更
    - name：运行集群构建服务的 Kubernetes 节点名称
- nodesForGateway：此配置项支持动态变更
    - externalIP：运行网关服务的 Kubernetes 节点外部 IP
    - internalIP：运行网关服务的 Kubernetes 节点内部 IP
    - name：运行网关服务的 Kubernetes 节点名称
- rainbondImageRepository：集群服务镜像拉取地址，默认为 registry.cn-hangzhou.aliyuncs.com/goodrain，此配置项不支持动态变更
- installVersion：集群服务镜像拉取 tag，默认为 v5.6.0-release，此配置项不支持动态变更
- imagePullPolicy：集群服务镜像拉取策略，默认为 IfNotPresent，此配置项不支持动态变更
- replicas：集群服务组件副本数，启用高可用的情况下生效，默认为2，此配置项不支持动态变更

### 示例配置

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
    config:
      storageClassName: glusterfs-simple

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
