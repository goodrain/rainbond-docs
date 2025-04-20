---
title: 概述
description: 本文介绍 Rainbond 运维的主要内容和关注点，帮助运维人员快速了解平台运维要点。
keywords:
- Rainbond 运维
- 平台运维
- 运维指南
---

## 概述

本运维指南旨在帮助运维人员更好地管理和维护 Rainbond 平台。Rainbond 是一个云原生应用管理平台，由 Console(控制台)、Region(集群端) 和 Kubernetes 三大核心部分组成。作为运维人员，需要关注以下几个主要方面：

## 核心组件

Rainbond 的核心组件包括：

### 控制台组件（Console）

- 负责平台的 Web 界面展示和用户交互
- 负责跟多个 Region 端交互
- 仅支持在 K8S 中以 Pod 方式部署（rbd-app-ui）

### 集群端组件（Region）

<details>
  <summary>rbd-api 接口服务</summary>
  <div>

Region 端 API 服务，提供 Region 端接口。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-api | v6.x | Deployment |

  </div>
</details>

<details>
  <summary>rbd-chaos 应用构建服务</summary>
  <div>

rbd-chaos 是应用构建服务，提供源码，Docker镜像等方式创建应用以及导入导出应用包。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-chaos | v6.x | Daemonset |

  </div>
</details>

<details>
  <summary>rbd-db 数据库服务</summary>
  <div>

rbd-db 是数据库服务，支持MySQL `5.7` `8.0`。可对接[外置数据库](/docs/installation/install-with-helm/vaules-config)。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-db | 8.0 | Statefulset |

  </div>
</details>

<details>
  <summary>rbd-gateway 应用全局网关</summary>
  <div>

rbd-gateway 是应用的全局网关，它是基于 APISIX 封装，提供应用的统一入口。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| apisix | 3.9.1-debian | Deployment |
| apisix-ingress-controller | v1.8.3 | Deployment |

  </div>
</details>

<details>
  <summary>rbd-hub 镜像存储服务</summary>
  <div>

rbd-hub 是基于 [Docker Registry ](https://docs.docker.com/registry/)封装，提供镜像存储服务。可配置[外部镜像仓库](/docs/installation/install-with-helm/vaules-config)。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-hub | v6.x | Deployment |

**推送镜像到 rbd-hub 仓库**

1. 登录私有镜像仓库

```bash
docker login goodrain.me -uadmin -padmin1234
```

2. 推送镜像

```bash
# 修改镜像名字
docker tag nginx goodrain.me/nginx:v1
# push镜像
docker push  goodrain.me/nginx:v1
```

  </div>
</details>

<details>
  <summary>rbd-mq 消息队列服务</summary>
  <div>

rbd-mq 是消息队列服务，提供消息队列功能。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-mq | v6.x | Deployment |

  </div>
</details>

<details>
  <summary>rbd-monitor 监控服务</summary>
  <div>

rbd-monitor 是监控服务，基于 Prometheus 封装，提供平台与组件的资源监控。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-monitor | v2.20.0 | Deployment |

  </div>
</details>

<details>
  <summary>rbd-worker 应用操作与服务处理</summary>
  <div>

rbd-worker 是应用操作与服务处理（跟组件、应用相关的操作都是由该组件执行）。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| rbd-worker | v6.x | Deployment |

  </div>
</details>

<details>
  <summary>local-path-provisioner 本地存储服务</summary>
  <div>

[local-path-provisioner](https://github.com/rancher/local-path-provisioner) 是本地存储服务，提供组件的本地存储功能。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| local-path-provisioner | v0.0.30 | Deployment |

  </div>
</details>

<details>
  <summary>minio 对象存储服务</summary>
  <div>

minio 是对象存储服务，是离线导入导出应用包的存储服务。

| 组件    | 版本 | 控制器类型 |
| ------- | ---- | ---------- |
| minio | RELEASE.2023-10-24T04-42-36Z | Deployment |

  </div>
</details>

<details>
  <summary>rainbond-operator 集群维护服务</summary>
  <div>

rainbond-operator 控制着 Rainbond 所有组件的配置与运行状态，持续的监控各个组件的状态，做出不同的动作，比如，rbd-api 的 pod 实例被删除或者参数修改了，operator立即会做出反馈。

> [rainbond-operator](https://github.com/goodrain/rainbond-operator) 是基于 [kubebuilder](https://book.kubebuilder.io/) 实现。

在安装集群端时，首先会安装 rainbond-operator，接下来会创建一些 CRD 资源，如下：

* rainbondclusters.rainbond.io
* rbdcomponents.rainbond.io

**rainbondclusters.rainbond.io**

`rainbondclusters.rainbond.io` 是集群端的配置文件，例如设置网关节点、构建节点等。

在安装了集群后，我们可以通过此 CRD 资源来修改网关节点、构建节点、数据库连接信息等。

```yaml title="kubectl edit rainbondclusters.rainbond.io -n rbd-system"
spec:
  gatewayIngressIPs: # 网关对外IP
  - xxxx
  imageHub:
    domain: goodrain.me
    password: xxx
    username: admin  
  nodesForChaos: # 构建节点
    name: 192.168.3.161
    name: 192.168.3.162
  nodesForGateway: # 网关节点
  - externalIP: 192.168.3.161
    internalIP: 192.168.3.161
    name: 192.168.3.161
  - externalIP: 192.168.3.162
    internalIP: 192.168.3.162
    name: 192.168.3.162
  rainbondImageRepository: registry.cn-hangzhou.aliyuncs.com/goodrain
  regionDatabase: # 集群端数据库
    host: xxx
    password: xxx
    port: 3306
    username: region
  uiDatabase: # 控制台数据库
    host: xxx
    password: xxx
    port: 3306
    username: console
  installVersion: v6.x.x-release # 集群安装版本
  suffixHTTPHost: xxx.nip.io # 平台泛域名
```

**rbdcomponents.rainbond.io**

`rbdcomponents.rainbond.io` 是控制台集群端所有 POD 的 CRD 资源，会创建出所有控制器以及POD，也可以在安装完成后修改对应组件的配置。

```shell
# 查询组件
kubectl get rbdcomponents.rainbond.io -n rbd-system

# 编辑 rbdcomponents 所有组件配置
kubectl edit rbdcomponents.rainbond.io -n rbd-system

# 编辑 rbdcomponents rbd-api 配置
kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system
```

  </div>
</details>

