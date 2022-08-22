---
title: rainbond-operator
description: "rainbond-operator component parameter description"
---


## Operation mode

Running inside the Kubernetes cluster, POD running

## brief introduction

:::tip

rainbond-operator controls the configuration and running status of all components of Rainbond, continuously monitors the status of each component, and makes different actions. For example, if the pod instance of rbd-db is deleted or the parameters are modified, the operator will give feedback immediately.

:::

[rainbond-operator](https://github.com/goodrain/rainbond-operator) is based on [kubebuilder](https://book.kubebuilder.io/) implementation.

When installing the cluster side, the rainbond-operator will be installed first, and then some CRD resources will be created, as follows：

* rainbondclusters.rainbond.io
* rbdcomponents.rainbond.io

### rainbondclusters.rainbond.io

`rainbondclusters.rainbond.io` is the configuration file on the cluster side, such as setting gateway nodes, building nodes, etc.

After the cluster is installed, we can modify gateway nodes, build nodes, database connection information, etc. through this CRD resource.

```yaml title="kubectl edit rainbondclusters.rainbond.io -n rbd-system"
spec:
  configCompleted: true
  enableHA: true # Enable high availability installation
  gatewayIngressIPs: # Gateway external IP
  - xxxx
  imageHub:
    domain: goodrain.me
    password: xxx
    username: admin  
  installVersion: v5.6.0-release # Cluster installation version
  nodesForChaos: # Build node
  - internalIP: 192.168.3.161
    name: 192.168.3.161
  - internalIP: 192.168.3.161
    name: 192.168.3.161
  nodesForGateway: # Gateway node

    internalIP: 192.168.3.161 name: 192.168.3.161
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  regionDatabase: # Cluster database
    host: xxx
    password: xxx
    port: 3306
    username: region
  suffixHTTPHost: xxx.grapps.cn # Platform generic domain name
  uiDatabase: # Console database
    host: xxx
    password: xxx
    port: 3306
    username: console
  version: v5.2.2-release # Cluster version
```

### rbdcomponents.rainbond.io

`rbdcomponents.rainbond.io` is the CRD resource of all PODs on the console cluster side. All controllers and PODs will be created. You can also modify the configuration of the corresponding components after the installation is complete.

```shell
# Query components
kubectl get rbdcomponents.rainbond.io -n rbd-system

# Edit rbdcomponents all components configuration
kubectl edit rbdcomponents.rainbond.io -n rbd-system

# Edit rbdcomponents rbd-api configuration
kubectl edit rbdcomponents.rainbond .io rbd-api -n rbd-system
```



