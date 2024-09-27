---
title: rainbod-operator
description: Parameter description of the rainbond-operator component
---

## Runs

Run inside Kubernetes cluster, POD runs

## Brief description

:::tip

rainbond-operator controls the configuration and operating status of all components of Rainbond, continuously monitors the status of individual components, and performs different actions. For example, rbd-db pod instances have been deleted or parameters modified. Operator will immediately provide feedback.

:::

[rainbond-operator](https://github.com/goodrain/rainbond-operator) is based on [kubebuilder](https://book.kubebuilder.io/).

When installing the cluster end, rainbond-operator will first be installed, and some CRD resources will be created as follows,：

- rainbondclusters.rainbond.io
- rbdcomponents.rainbond.io

### rainbondclusters.rainbond.io

`rainbondclusters.rainbond.io` is a cluster configuration file such as setting a gateway node, building node, etc.

Once the cluster is installed, we can modify gateway node, build node, database connection information and so on through this CRD resource.

```yaml title="kubectl edit rainbondclusters.rainbond.io -n rbd-system"
spec:
  configCompleted: true
  enableHA: true # can be installed at
  gatewayInressIPs: # gatewayIngressIPs: # gateway external IP
  - xxx
  imageHub:
    domain: goodrain. e
    password: xxx
    username: admin  
  installVersion: v5. .0-release # Cluster Installation Version
  nodesForChaos: # Building Node
  - internalIP: 192.168.3.161
    name: 192.168.3.
  - internalIP: 192.168.3.161
    name: 192.168. .161
  nodesForgateway: # Gateway Node
  - internalIP: 192. 68.3.161
    name: 192.168.3.161
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs. om/goodrain
  regionDatabase: # cluster database
    host: xx
    password: xx
    port: 3306
    username: region
  suffixHTTPHost: xx rapps. n # Platform pan-domain
  uiDatabase: # Console Database
    host: xxx
    password: xx
    port: 3306
    username: console
  version: v5. 2-release # cluster version
```

### rbdcomponents.rainbond.io

`rbdcomponents.rainbond.io` is a CRD resource for the console cluster that creates all controllers and POD and can modify the configuration of the corresponding component after installation.

```shell
# Query component
kubectl get rbdcomponents.rainbond.io -n rbd-system

# Edit rbdcomponents all components configuration
kubectl edit rbdcomponents. ainbon.io -n rbd-system

# Edit rbdcomponents rbd-api configuration
kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system
```
