---
title: Helm Chart Options
description: Detailed introduction to the values parameter settings during helm installation and how to change the configuration of an installed cluster
keywords:
  - rainbond helm values configuration installation cluster
  - rainbond helm values config install cluster
---

This article provides a configuration reference for Rainbond Helm Chart.

## Example Configuration

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
  # https://github.com/goodrain/rainbond/releases
  installVersion: <version>
  imagePullPolicy: IfNotPresent
  replicas: 1
```

## Common Options

### Cluster External IP

The unified external access `IP` of the Rainbond platform, the load balancer `IP` on the gateway node, if not, fill in the internal/external network `IP` of any gateway node.

| Configuration Item          | Default Value | Type  | illustrate                           |
| --------------------------- | ------------- | ----- | ------------------------------------ |
| `Cluster.gatewayIngressIPs` |               | Array | Configure gateway load balancer `IP` |

### Gateway Node

Select which `K8s` nodes the Rainbond gateway service runs on.

| Configuration Item                   | Default Value | Type  | illustrate                       |
| ------------------------------------ | ------------- | ----- | -------------------------------- |
| `Cluster.nodesForGateway.externalIP` |               | Array | `K8s` node external network `IP` |
| `Cluster.nodesForGateway.internalIP` |               | Array | `K8s` node internal network `IP` |
| `Cluster.nodesForGateway.name`       |               | Array | `K8s` node name                  |

### Build Node

| Configuration Item           | Default Value | Type  | illustrate      |
| ---------------------------- | ------------- | ----- | --------------- |
| `Cluster.nodesForChaos.name` |               | Array | `K8s` node name |

### Containerd Directory

| Configuration Item              | Default Value     | Type   | illustrate                                                                                                               |
| ------------------------------- | ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| `Cluster.containerdRuntimePath` | `/run/containerd` | String | Define the `containerd` runtime directory path.If using `k3s` or `RKE2`, it is `/var/run/k3s/containerd` |

## Advanced Options

### External Image Repository

| Configuration Item           | Default Value | Type   | illustrate                       |
| ---------------------------- | ------------- | ------ | -------------------------------- |
| `Cluster.imageHub.enable`    | false         | Bool   | Enable external image repository |
| `Cluster.imageHub.domain`    |               | String | Image repository address         |
| `Cluster.imageHub.namespace` |               | String | Image repository namespace       |
| `Cluster.imageHub.password`  |               | String | Image repository password        |
| `Cluster.imageHub.username`  |               | String | Image repository username        |

### Rainbond Cluster Database

| Configuration Item                | Default Value | Type   | illustrate                       |
| --------------------------------- | ------------- | ------ | -------------------------------- |
| `Cluster.regionDatabase.enable`   | false         | Bool   | Enable external cluster database |
| `Cluster.regionDatabase.host`     |               | String | database address                 |
| `Cluster.regionDatabase.name`     |               | String | data storage name                |
| `Cluster.regionDatabase.password` |               | String | database password                |
| `Cluster.regionDatabase.port`     |               | String | database port                    |
| `Cluster.regionDatabase.username` |               | String | database username                |

### Rainbond console database

MySQL 8.0 and above requires `default_authentication_plugin` to be set to `mysql_native_password`.

| Configuration item            | Default value | Type   | illustrate                       |
| ----------------------------- | ------------- | ------ | -------------------------------- |
| `Cluster.uiDatabase.enable`   | false         | Bool   | Enable external console database |
| `Cluster.uiDatabase.host`     |               | String | database address                 |
| `Cluster.uiDatabase.name`     |               | String | data storage name                |
| `Cluster.uiDatabase.password` |               | String | database password                |
| `Cluster.uiDatabase.port`     |               | String | database port                    |
| `Cluster.uiDatabase.username` |               | String | database username                |

### Image source address

| Configuration item                | Default value                                | Type   | illustrate                                       |
| --------------------------------- | -------------------------------------------- | ------ | ------------------------------------------------ |
| `Cluster.rainbondImageRepository` | `registry.cn-hangzhou.aliyuncs.com/goodrain` | String | Installation to get the image repository address |

### Installation version

| Configuration item       | Default value | Type   | illustrate  |
| ------------------------ | ------------- | ------ | ----------- |
| `Cluster.installVersion` | latest        | String | Image `tag` |

### Image pull policy

| Configuration item        | Default value | Type   | illustrate        |
| ------------------------- | ------------- | ------ | ----------------- |
| `Cluster.imagePullPolicy` | IfNotPresent  | String | Image pull policy |

### Number of replicas

| Configuration item               | Default value | Type | illustrate         |
| -------------------------------- | ------------- | ---- | ------------------ |
| Cluster.replicas | 2             | int  | Number of replicas |