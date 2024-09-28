---
title: Chart installation options
description: How to set values during helm installation and how to change the installed cluster configuration
keywords:
  - rainbond help values configuration installation cluster
  - rainbond help values config install cluster
---

This document describes the installation configuration options for Rainbond Helm Chart

## Install Rainbond

You can configure values.yaml files to personalize installation of Rainbond

### 1: First you want to add and update repository

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
help repo update
kubectl create name rbd-system
```

### 2: Edit Profile

Write `values.yaml` below

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

  # external ETCD, ref: https://www.rainbond.com/docs/installation/install-with-ui/ha#etcd
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

### 3: Execute Command Installation

```bash
help install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

## Operator Configuration

| Configuration Item                                                                                        | Default value                                                                                                | Note                                    |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| operator.name                                                                             | rainbod-operator                                                                                             | Operator's employment resource name     |
| operator.image.name                                                       | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator | Operator Mirror Name                    |
| operator.image.tag                                                        | v5.17.3-release                                                              | operator mirror tag                     |
| operator.image.pullPolicy                                                 | IfNotPresent                                                                                                 | Operator Mirror Pull Policy             |
| operator.logLevel                                                                         | 4                                                                                                            | Log output level for operator           |
| operator.env[0].name  | CONTAINER_RONGE_TIME                                               | When selecting cluster container to run |
| operator.env[0].value | Auto-select docker / containerd                                                                              | docker / containerd                     |

### Values.yaml sample configuration

```yaml
Operator:
  name: rainbond-operator
  image:
    name: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    tag: v5. 7.3-release
    pullPolicy: IfNotPresent
  logLevel: 4
  env:
  - name: CONTAINER_RUNTIME
    value: docker
```

## Cluster configuration

### High Installation

External database, external Etcd, external shared storage (RWX) must be provided in high available mode

| Configuration Item               | Default value | Note                       |
| -------------------------------- | ------------- | -------------------------- |
| Cluster.enableHA | false         | Enable High Available Mode |

### Configure external mirror repository

| Configuration Item                                         | Default value | Type   | Note                              |
| ---------------------------------------------------------- | ------------- | ------ | --------------------------------- |
| Cluster.imageHub.enable    | false         | Bool   | Enable external mirror repository |
| Cluster.imageHub.domain    | ""            | String | Image repository address          |
| Cluster.imageHub.namespace | ""            | String | Mirror repository namespace       |
| Cluster.imageHub.password  | ""            | String | Image repository password         |
| Cluster.imageHub.username  | ""            | String | Mirror repository username        |

### Configure External ETCD

| Configuration Item                                           | Default value | Type   | Note                                                                             |
| ------------------------------------------------------------ | ------------- | ------ | -------------------------------------------------------------------------------- |
| Cluster.etcd.enabled         | false         | Bool   | Enable External ETCD                                                             |
| Cluster.etcd.endpoints       | ""            | Array  | ETCD Cluster List                                                                |
| Cluster.etcd.secretariatName | ""            | String | ETCD cluster certificate secret file needs to be created in rbd-system namespace |

### Configure external storage

If you use Ali-cloud NAS storage, you need to configure `Cluster.RWX.type=aliyun` `Cluster.RWX.config.server=<SERVER>:/`, Rainbond will automatically install the Alias NAS CSI and use it back-to-back.

| Configuration Item                                                                  | Default value | Type   | Note                                                                 |
| ----------------------------------------------------------------------------------- | ------------- | ------ | -------------------------------------------------------------------- |
| Cluster.RWX.enabled                                 | false         | Bool   | Enable external shared storage RWX                                   |
| Cluster.RWX.type                                    | none          | String | Publicly available cloud storage type, aliyun is currently supported |
| Cluster.RWX.config.storageClassName | ""            | String | StorageClass Name                                                    |
| Cluster.RWX.config.server           | ""            | String | Aliyun NASS Store Address                                            |
| Cluster.RWO.enabled                                 | false         | Bool   | Enable external shared RWO storage                                   |
| Cluster.RWO.storageClassName                        | ""            | String | StorageClass Name                                                    |

### Configure Rainbond cluster database

| Configuration Item                                              | Default value | Type   | Note                             |
| --------------------------------------------------------------- | ------------- | ------ | -------------------------------- |
| Cluster.regionDatabase.enabling | false         | Bool   | Enable external cluster database |
| Cluster.regionDatabase.host     | ""            | String | Database address                 |
| Cluster.regionDatabase.name     | ""            | String | Database name                    |
| Cluster.regionDatabase.password | ""            | String | Database password                |
| Cluster.regionDatabase.port     | ""            | String | Database Port                    |
| Cluster.regionDatabase.username | ""            | String | Database User                    |

### Configure Rainbond Console Database

| Configuration Item                                          | Default value | Type   | Note                             |
| ----------------------------------------------------------- | ------------- | ------ | -------------------------------- |
| Cluster.uiDatabase.enabling | false         | Bool   | Enable external console database |
| Cluster.uiDatabase.host     | ""            | String | Database address                 |
| Cluster.uiDatabase.name     | ""            | String | Database name                    |
| Cluster.uiDatabase.password | ""            | String | Database password                |
| Cluster.uiDatabase.port     | ""            | String | Database Port                    |
| Cluster.uiDatabase.username | ""            | String | Database User                    |

### Configure clusters out of IP

Set SLB or VIP to ensure high availability of Rainbond gateways

| Configuration Item                        | Default value | Type  | Note                              |
| ----------------------------------------- | ------------- | ----- | --------------------------------- |
| Cluster.gatewayIngressIPs | ""            | Array | Configure Gateway for balanced IP |

### Configure Gateway Node

| Configuration Item                                                 | Default value | Type  | Note                                                   |
| ------------------------------------------------------------------ | ------------- | ----- | ------------------------------------------------------ |
| Cluster.nodesForGateway.externalIP | ""            | Array | External IP of Kubernetes node running gateway service |
| Cluster.nodesForGateway.internalIP | ""            | Array | IP within Kubernetes node running gateway service      |
| Cluster.nodesForGateway.name       | ""            | Array | Name of Kubernetes node running gateway service        |

### Configure Building Nodes

| Configuration Item                                         | Default value | Type  | Note                                                  |
| ---------------------------------------------------------- | ------------- | ----- | ----------------------------------------------------- |
| Cluster.nodesForChaos.name | ""            | Array | Name of Kubernetes node running cluster build service |

### Configure cluster mirrors to get addresses

| Configuration Item                              | Default value                                                                              | Type   | Note                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------- |
| Cluster.rainbondImageRepository | registry.cn-hangzhou.aliyuncs.com/goodrain | String | ClusterIntegration\|Cluster installation pulled mirror addresses |

### Configure Installation Version

| Configuration Item                     | Default value | Type   | Note                            |
| -------------------------------------- | ------------- | ------ | ------------------------------- |
| Cluster.installVersion | Late          | String | Cluster install pulse image tag |

### Configure cluster mirror pull policy

| Configuration Item                      | Default value | Type   | Note                       |
| --------------------------------------- | ------------- | ------ | -------------------------- |
| Cluster.imageFullPolicy | IfNotPresent  | String | Cluster mirror pull policy |

### Configure Group Copy

| Configuration Item               | Default value | Type     | Note                            |
| -------------------------------- | ------------- | -------- | ------------------------------- |
| Cluster.replicas | 2             | Annex II | Number of copies of cluster POD |

### Configure cluster environment detection

| Configuration Item                     | Default value | Type | Note                         |
| -------------------------------------- | ------------- | ---- | ---------------------------- |
| Cluster.enableEnvCheck | true          | Bool | Enable Environment Detection |

### Configure rbd-api parameters

| Configuration Item                                                          | Default value | Type | Note                          |
| --------------------------------------------------------------------------- | ------------- | ---- | ----------------------------- |
| Component.rbd_api.args |               | list | `rbd-api` Component parameter |

### Configure rbd-gateway parameters

| Configuration Item                                                              | Default value | Type | Note                          |
| ------------------------------------------------------------------------------- | ------------- | ---- | ----------------------------- |
| Component.rbd_gateway.args |               | list | `rbd-api` Component parameter |

## Use K3s Containerd

| Configuration Item | Default value | Type | Note               |
| ------------------ | ------------- | ---- | ------------------ |
| useK3sContainerd   | false         | Bool | Use K3s Containerd |
