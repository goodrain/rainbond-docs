---
title: Platform component architecture
description: This article describes all the service components required to fully deploy Rainbond and helps users understand the Rainbond technology stack and component architecture.
keywords:
  - Rainbond Platform Component Architecture
---

This paper focuses on all service components required for the full deployment of Rainbond, and helps users understand the Rainbond Technical Stack and Component Architecture.

Current version, the system component life cycle is maintained and managed jointly by `Kubernetes` and `Rainbond-Operator`.

Rainbond consists of Console(Console) + Region(cluster) + Kubernetes (RKE).

## Docker

Default Docker version with Rainbond script is `20.10.9`

## Kubernetes (RKE)

Use Rainbond to install version `v1.23.10` from your host. See [RKE](https://docs.rancher.cn/rke/) for more details.

## Rainbond

### Console console component overview

The console deployment currently has 2 deployment methods：

1. Allinone, run on the server as Docker Run
2. Helm deployed, run in Kubernetes as POD.

### Region cluster component overview

Introduction of version information for Rainbond components and the role of components.

The following are deployed in the Kubernetes cluster, run by POD and can be viewed through the `kubectl get pod -n rbd-system` command.

| Component                                | Version                                | Note                                                                                                                                                                       | Controller Type | Required | Remarks                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [rainbond-operator](./rainbond-operator) | 5.x                    | Maintain the configuration and running status of all components of Rainbond with resources from [CRD](/docs/ops-guide/component/rainbond-operator#rbdcomponentsrainbondio) | Employment      | Yes      |                                                                                                                                                                                                  |
| rbd-api                                  | 5.x                    | API service providing Region interface                                                                                                                                     | Employment      | Yes      |                                                                                                                                                                                                  |
| rbd-chaos                                | 5.x                    | 应用构建服务，提供源码，Docker镜像等方式创建应用                                                                                                                                                | Daemonset       | Yes      |                                                                                                                                                                                                  |
| rbd-db                                   | 8.0                    | Database service, MySQL `5.6` `5.7` \`\`8.0\`                                                                                                              | Statefulset     | Yes      | Configure using[外置数据库](/docs/installation/install-with-helm/vaules-config#Config#Configuration-rainbond-cluster database) |
| rbd-etcd                                 | 3.3.18 | `etcd` stores cluster metadata information, cluster status and network configuration                                                                                       | Statefulset     | Yes      | 可复用 [K8s ETCD](/docs/installation/install-with-helm/vaules-config#%E9%85%8D%E7%BD%AE%E5%A4%96%E9%83%A8etcd)                                                                                      |
| rbd-eventlog                             | 5.x                    | Event Handling & Logging Service                                                                                                                       | Statefulset     | Yes      |                                                                                                                                                                                                  |
| rbd-gateway                              | 5.x                    | Application Global Gateway                                                                                                                                                 | Daemonset       | Yes      |                                                                                                                                                                                                  |
| [rbd-hub](./rbd-hub)                     | v2.6.2 | Based on [Docker Registry](https://docs.docker.com/registry/) envelope providing mirror storage services                                                                   | Employment      | Yes      | Configure[外部镜像仓库](/docs/installation/install-with-helm/vaules-config#Configure external mirror repository)                |
| rbd-mq                                   | 5.x                    | Message Queue Service                                                                                                                                                      | Employment      | Yes      |                                                                                                                                                                                                  |
| nfs-provisioner                          | v.2.1  | NFS Storage Service                                                                                                                                                        | Statefulset     | Yes      | Default installation, touching[外部存储](/docs/installation/install-with-helm/vaules-config#Configure external storage)       |
| rbd-node                                 | 5.x                    | Cluster monitoring and control                                                                                                                                             | Daemonset       | Yes      |                                                                                                                                                                                                  |
| rbd-resource-proxy                       | 1.19                   | Source Build Repository Service                                                                                                                                            | Employment      | No       |                                                                                                                                                                                                  |
| rbd-webcli                               | 5.x                    | Provide access to the web method to enter the Container Command Line                                                                                                       | Employment      | Yes      |                                                                                                                                                                                                  |
| rbd-walker                               | 5.x                    | 应用操作与服务处理                                                                                                                                                                  | Employment      | Yes      |                                                                                                                                                                                                  |
