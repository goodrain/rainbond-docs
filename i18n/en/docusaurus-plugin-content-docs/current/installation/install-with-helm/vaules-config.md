---
title: Chart installation options
description: 'How to set values during helm installation and how to change the installed cluster configuration'
keywords:
- rainbond helm values 配置 安装 集群
- rainbond helm values config install cluster
---

本文档描述 Rainbond Helm Chart 的安装配置选项

## Operator 配置

| 配置项                    | 默认值                                                          | 说明                            |
| ------------------------- |--------------------------------------------------------------| ------------------------------- |
| operator.name             | rainbond-operator                                            | operator 的 deployment 资源名称 |
| operator.image.name       | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator | operator 镜像名称               |
| operator.image.tag        | v5.17.1-release                                              | operator 镜像tag                |
| operator.image.pullPolicy | IfNotPresent                                                 | operator 镜像拉取策略           |
| operator.logLevel         | 4                                                            | operator 的日志输出级别         |
| operator.env[0].name         | CONTAINER_RUNTIME                                            | 选择集群容器运行时         |
| operator.env[0].value         | 自动选择 docker / containerd                                     | docker / containerd |
### Values.yaml 示例配置

```yaml
operator:
  name: rainbond-operator
  image:
    name: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    tag: v5.17.1-release
    pullPolicy: IfNotPresent
  logLevel: 4
  env:
  - name: CONTAINER_RUNTIME
    value: docker
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

如果使用阿里云 NAS 存储，需要配置 `Cluster.RWX.type=aliyun` `Cluster.RWX.config.server=<SERVER>:/`，Rainbond 会自动安装阿里云 NAS CSI 并对接使用。

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

### 配置集群环境检测

| 配置项                 | 默认值 | 类型 | 说明             |
| ---------------------- | ------ | ---- | ---------------- |
| Cluster.enableEnvCheck | true   | Bool | 是否开启环境检测 |

### 配置 rbd-api 参数

| 配置项                 | 默认值 | 类型 | 说明                      |
| ---------------------- | ------ | ---- | ------------------------- |
| Component.rbd_api.args |        | list | `rbd-api`  Component 参数 |

### 配置 rbd-gateway 参数

| 配置项                     | 默认值 | 类型 | 说明                     |
| -------------------------- | ------ | ---- | ------------------------ |
| Component.rbd_gateway.args |        | list | `rbd-api` Component 参数 |

## 使用 K3s Containerd

| 配置项           | 默认值 | 类型 | 说明          |
| ---------------- | ------ | ---- | ------------- |
| useK3sContainerd | false      | bool  | 使用 K3s Containerd |

## Values.yaml 示例配置


<details>
  <summary>Helm Chart value.yaml 完整示例</summary>
  <div>

```yaml title="values.yaml"
#############################################
# 
# Copyright 2023 Goodrain Co., Ltd.
# 
# This version of the GNU Lesser General Public License incorporates
# the terms and conditions of version 3 of the GNU General Public License.
# 
#############################################


# Default values for mychart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## Install Default RBAC roles and bindings
rbac:
  create: true
  apiVersion: v1

## Service account name and whether to create it
serviceAccount:
  create: true
  name: rainbond-operator

# Use K3s Containerd
useK3sContainerd: false

# rainbondOperator
operator:
  name: rainbond-operator
##    env:
##      variable_name: variable
  image:
    name: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    tag: v5.12.0-release
    pullPolicy: IfNotPresent
  logLevel: 4

#############################################
# Rainbondcluster install Configuration
#############################################
Cluster:

  # Enable the HA installation
  enableHA: false
  
  # Enable cluster environment detectio
  enableEnvCheck: true

  # Use an external image repository
  imageHub:
    enable: false
    domain: registry.cn-hangzhou.aliyuncs.com
    namespace: rainbond
    password: admin
    username: admin

  # external ETCD, ref: https://www.rainbond.com/docs/installation/ha-deployment/overview/#%E5%85%AB%E5%A4%8D%E7%94%A8-kubernetes-etcd
  etcd:
    enable: false
    endpoints: 
    - 192.168.0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

  # External storage, fill storageClassName, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config#%E9%85%8D%E7%BD%AE%E5%A4%96%E9%83%A8%E5%AD%98%E5%82%A8
  RWX:
    enable: false
    type: none
    config:
      storageClassName: glusterfs-simple
      server: 
  
  # External storage, fill storageClassName, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config#%E9%85%8D%E7%BD%AE%E5%A4%96%E9%83%A8%E5%AD%98%E5%82%A8
  RWO:
    enable: false
    storageClassName: glusterfs-simple

  # Rainbond region database, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE-rainbond-%E9%9B%86%E7%BE%A4%E7%AB%AF%E6%95%B0%E6%8D%AE%E5%BA%93
  regionDatabase:
    enable: false
    host: 192.168.0.1
    name: region
    password: password
    port: 3306
    username: admin

  # Rainbond Console database, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE-rainbond-%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%95%B0%E6%8D%AE%E5%BA%93
  uiDatabase:
    enable: false
    host: 192.168.0.1
    name: console
    password: password
    port: 3306
    username: admin 

  # External gateway IP address
  # gatewayIngressIPs: 192.168.0.1

  # rbd-chaos configuration，ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E6%9E%84%E5%BB%BA%E8%8A%82%E7%82%B9
  # nodesForChaos:
  # - name: node1
  # - name: node2

  # rbd-gateway configuration, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E7%BD%91%E5%85%B3%E8%8A%82%E7%82%B9
  # nodesForGateway:
  # - externalIP: 192.168.0.1
  #   internalIP: 192.168.0.1
  #   name: node1
  # - externalIP: 192.168.0.2
  #   internalIP: 192.168.0.2
  #   name: node2

  # Component unified image repository and namespace, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E9%9B%86%E7%BE%A4%E7%AB%AF%E9%95%9C%E5%83%8F%E8%8E%B7%E5%8F%96%E5%9C%B0%E5%9D%80
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  
  # Component image version, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E5%AE%89%E8%A3%85%E7%89%88%E6%9C%AC
  installVersion: v5.12.0-release

  # Component image pull policy, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E9%9B%86%E7%BE%A4%E7%AB%AF%E9%95%9C%E5%83%8F%E6%8B%89%E5%8F%96%E7%AD%96%E7%95%A5
  imagePullPolicy: IfNotPresent

  # Number of component copies, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config/#%E9%85%8D%E7%BD%AE%E9%9B%86%E7%BE%A4%E5%89%AF%E6%9C%AC
  replicas: 2
 


############################################
# Rainbond Component Configuration
############################################
Component:

  # rbd-api component configuration, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config#%E9%85%8D%E7%BD%AE-rbd-api-%E5%8F%82%E6%95%B0
  rbd_api:
    args:
    # - --api-addr-ssl 0.0.0.0:8443
    # - --ws-addr 0.0.0.0:6060
    
  # rbd-gateway component configuration, ref: https://www.rainbond.com/docs/installation/install-with-helm/vaules-config#%E9%85%8D%E7%BD%AE-rbd-gateway-%E5%8F%82%E6%95%B0
  rbd_gateway:
    args:
    # - --service-http-port 80
    # - --service-https-port 443
  
  # rbd-node component configuration
  rbd_node:
    args:

  # rbd-hub component configuration
  rbd_hub:
    args:
  
  # rbd-mq component configuration
  rbd_mq:
    args:

  # rbd-resource-proxy component configuration  
  rbd_resource_proxy:
    args:
  
  # rbd-webcli component configuration  
  rbd_webcli:
    args:

  # rbd-monitor component configuration    
  rbd_monitor:
    args:
  
  # rbd-db component configuration
  rbd_db:
    args:

  # rbd-chaos component configuration
  rbd_chaos:
    args:

  # rbd-worker component configuration
  rbd_worker:
    args:

  # rbd-eventlog component configuration
  rbd_eventlog:
    args:
  
  # rbd-app-ui component configuration
  rbd_app_ui:
    enable: true
    args:

  # nfs-provisioner component configuration
  nfs_provisioner:
    image:

  # rbd-etcd component configuration
  rbd_etcd:
    image:

  # metrics-server component configuration
  metrics_server:
    image:

  # dashboard-metrics-scraper component configuration
  dashboard_metrics_scraper:
    image:


  # kubernetes-dashboard component configuration
  kubernetes_dashboard:
    image:

## Enable nfs chart, default is false
nfs-client-provisioner:
  childChart:
    enable: false
  nfs:
    server: 
    path: 
```
</div>
</details>

