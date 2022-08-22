---
title: 'values.yaml details'
weight: 203
description: 'Introduce in detail the values parameter settings in the helm installation process and how to change the installed cluster configuration'
---

This document describes all the parameters supported by the Rainbond cluster installation based on Helm, and explains how to change the configuration of the installed Rainbond cluster

### Change configuration items

For configuration items that support dynamic change, you can use the following commands to make dynamic changes. All configuration items at the time of creation need to be specified in the change file. If they are not specified, they will be overwritten by default values. Do not modify the configuration items that do not support change. Avoid problems such as data loss

```bash
helm upgrade rainbond ./rainbond-chart -f value_change.yaml -n rbd-system
```

### Operator configuration

The following configuration items support dynamic changes

- name：operator's deployment resource name
- image：
    - name：The mirror download address of the operator, the default is registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond-operator
    - Mirror tag of tag：operator, default is v2.0.0
    - pullPolicy：operator Image pull policy, the default is IfNotPresent
- logLevel：operator's log output level, defaults to 4

example file：
```yaml
operator:
  name: rainbond-operator
  image:
    name: registry.cn-hangzhou.aliyuncs.com/yangkaa/rainbond-operator
    tag: v2.2.0-dev
    pullPolicy: IfNotPresent
  logLevel: 4
```

### Cluster configuration

- enableHA：Whether to enable high availability mode, the default is false, if set to true, high availability installation is enabled. In high availability mode, external database, external Etcd, and external shared storage (RWX) must be provided.
- imageHub：This configuration item does not support dynamic changes
    - enable：Whether to enable the external mirror warehouse, the default is false, set to true to enable
    - domain：The access address of the external mirror warehouse
    - namespace：The namespace of the external mirror repository
    - password：The access password of the external mirror repository
    - username：The access user of the external mirror repository
- etcd：This configuration item does not support dynamic changes
    - enable：whether to enable external ETCD, the default is false, set to true to enable
    - endpoint：External ETCD cluster access list
    - secretName：accesses the certificate secret file of the ETCD cluster. When creating it, you need to specify the same namespace as the rainbond cluster.
- For RWX：to build external storage, please refer to [Glusterfs Distributed Storage Document](/docs/ops-guide/storage/deploy-glusterfs), this configuration item does not support dynamic changes
    - enable：whether to enable external shared storage, the default is false, set to true to enable
    - storageClassName：The storageClass name of the external shared storage
- RWO：This configuration item does not support dynamic changes
    - enable：whether to enable external block storage, the default is false, set to true to enable
    - storageClassName：storageClass name of external block storage
- regionDatabase：This configuration item does not support dynamic changes
    - enable：Whether to enable the external cluster database, the default is false, set to true to enable
    - host：External cluster database access address
    - name：External cluster database database name
    - password：External cluster database access password
    - port：External cluster database access port
    - username：external cluster database access user
- uiDatabase：This configuration item does not support dynamic changes
    - enable：whether to enable the external console database, the default is false, set to true to enable
    - host：External console database access address
    - name：External console database library name
    - password：external console database access password
    - port：External console database access port
    - username：external console database access user
- gatewayIngressIPs：The external IP of the cluster, which must be filled in
- nodesForChaos：This configuration item supports dynamic changes
    - name：The name of the Kubernetes node running the cluster build service
- nodesForGateway：This configuration item supports dynamic changes
    - externalIP：The external IP of the Kubernetes node running the gateway service
    - internalIP：The internal IP of the Kubernetes node running the gateway service
    - name：The name of the Kubernetes node running the gateway service
- rainbondImageRepository：Cluster service image pull address, the default is registry.cn-hangzhou.aliyuncs.com/goodrain, this configuration item does not support dynamic change
- installVersion：cluster service image pull tag, the default is v5.6.0-release, this configuration item does not support dynamic changes
- imagePullPolicy：cluster service image pull policy, the default is IfNotPresent, this configuration item does not support dynamic changes
- replicas：The number of replicas of cluster service components. It takes effect when high availability is enabled. The default value is 2. This configuration item does not support dynamic changes.

### Example configuration

```yaml
#Rainbondcluster
Cluster:
## Define whether to enable high availability, true is on, false is off  
  enableHA: false

## Define whether to use external mirror image warehouse, true is on, false is off
  imageHub:
    enable: false
    domain: registry.cn-hangzhou.aliyuncs.com
    namespace: rainbond
    password: admin
    username: admin

## External ETCD, corresponding to fill in IP, certificate, true is on, false is off
  etcd:
    enable: false
    endpoints: 
    - 192.168.0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## External storage, fill in storageClassName directly, true is open, false is off
  RWX:
    enable: false
    config:
      storageClassName: glusterfs-simple

## External storage, fill in storageClassName directly, true is on, false is off
  RWO:
    enable: false
    storageClassName: glusterfs-simple

## region database, true is on, false is off
  regionDatabase:
    enable: false
    host: 192.168.0.1
    name: region
    password: password
    port: 3306
    username: admin

## ui database, true is on, false
  uiDatabase:
    enable: false
    host: 192.168.0.1
    name: console
    password: password
    port: 3306
    username: admin 

## External gateway, fill in IP
  gatewayIngressIPs: 192.168.0 .1

## Chaos corresponding configuration, name is Chaos node node name
  nodesForChaos:
  - name: node1
  - name: node2

## Gateway node corresponding configuration, externalIP is the external IP of the gateway node, internalIP is the internal IP of the gateway node, name is the name of the gateway node node
  nodesForGateway:
  - externalIP: 192.168.0.1
    internalIP: 192.168.0.1
    name: node1
  - externalIP: 192.168.0.2
    internalIP: 192.168.0.2
    name: node2

## Unified image of system components Warehouse pull address and namespace
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
## System component unified image version
  installVersion: v5.6.0-release
## System component unified image pull policy
  imagePullPolicy: IfNotPresent
## In high availability installation mode, the number of replicas of system components is
  replicas: 2
```
