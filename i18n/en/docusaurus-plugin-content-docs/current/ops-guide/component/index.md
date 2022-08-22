---
title: "Platform Component Architecture"
description: This article mainly introduces all the service components required for the complete deployment of Rainbond to help users understand the Rainbond technology stack and component architecture.
---

This article mainly introduces all the service components required for the complete deployment of Rainbond to help users understand the Rainbond technology stack and component architecture.

In the current version, the system component lifecycle is jointly maintained and managed by `Kubernetes` and `Rainbond-Operator`.

Rainbond consists of Console (console) + Region (cluster side) + Kubernetes (RKE).

## Overview of Console components

Console deployment is currently divided into three types：

1. Allinone
2. Highly available console, deployed in Rainbond (based on app store installation)
3. Helm deployment, running in Kubernetes as a POD.

## Overview of Region Cluster-side Components

:::tip

The advanced usage of Region cluster-side components can be read by clicking the link of the component

:::

The following is the Rainbond service components and their version information that will be installed on the server through one-click deployment.

| components                                 | Version | illustrate                                                                                                  | Controller type |
| ------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------- | --------------- |
| [rainbond-operator](./rainbond-operator)   | v2.3.0  | Maintain the configuration and running status of rainbond components                                        | Deployment      |
| [rbd-api](./rbd-api)                       | 5.x     | rainbond regional center API service, providing the underlying service interface                            | Deployment      |
| [rbd-chaos](./rbd-chaos)                   | 5.x     | Application building service, providing source code, Docker image, etc. to create applications              | Daemonset       |
| [rbd-db](./rbd-db)                         | 5.x     | Cloud help database service, support MySQL`5.6``5.7``8.0`                                                   | Statefulset     |
| [rbd-etcd](./etcd)                         | v3.3.18 | `etcd`stores metadata information of the cluster, cluster state and network configuration                   | Statefulset     |
| [rbd-eventlog](./rbd-eventlog)             | 5.x     | rainbond event processing and log aggregation service                                                       | Statefulset     |
| [rbd-gateway](./rbd-gateway)               | 5.x     | A global gateway to applications, providing advanced functions such as A/B testing and grayscale publishing | Daemonset       |
| [rbd-hub](./rbd-hub)                       | v2.6.2  | Based on[Docker Registry](https://docs.docker.com/registry/)package, providing docker image storage service | Deployment      |
| [rbd-mq](./rbd-mq)                         | 5.x     | message queue service                                                                                       | Deployment      |
| [nfs-provisioner](./rbd-nfs)               | v2.2.1  | storage service                                                                                             | Statefulset     |
| [rbd-node](./rbd-node)                     | 5.x     | Cluster monitoring and control, docker certificate distribution                                             | Daemonset       |
| [rbd-resource-proxy](./rbd-resource-proxy) | 1.19    | Source code build warehouse service                                                                         | Deployment      |
| [rbd-webcli](./rbd-webcli)                 | 5.x     | Provides a service for entering the container command line in the web mode                                  | Deployment      |
| [rbd-worker](./rbd-worker)                 | 5.x     | Cloud help application operation and processing services                                                    | Deployment      |


## Kubernetes (RKE)
The following Kubernetes components are installed through RKE. For details, please refer to [RKE](https://docs.rancher.cn/rke/) documentation.

| components              | Version | illustrate                                                             |
| ----------------------- | ------- | ---------------------------------------------------------------------- |
| kubelet                 | v1.19.6 | is the main node agent that runs on each Node node                     |
| kube-apiserver          | v1.19.6 | Validate and configure data for API objects                            |
| kube-controller-manager | v1.19.6 | The management control center inside the Kubernetes cluster            |
| kube-scheduler          | v1.19.6 | Responsible for allocating and scheduling Pods to nodes in the cluster |
| kube-proxy              | v1.19.6 | A network proxy for Kubernetes, running on each node                   |

## Docker

| components         | Version | illustrate                   |
| ------------------ | ------- | ---------------------------- |
| [docker](./docker) | 19.03.5 | Application Container Engine |


## Component Port Description

> Public network access: If deployed in a public cloud environment, public network access requires security group release

| The port number         | illustrate                                                                     | public network access                                                            | service component |
| ----------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------- |
| 80/443                  | Global Load Balancing Service                                                  | Security group release required                                                  | rbd-gateway       |
| 6060                    | Websocket service, providing real-time push of logs and performance monitoring | Security group release required                                                  | rbd-api           |
| 7070                    | application console web                                                        | Security group release required                                                  | rbd-app-ui        |
| 8443                    | Rainbond API Service                                                           | Security group release required                                                  | rbd-api           |
| 30008                   | Cluster installation operation and maintenance console web                     | Security group release is required, and the cluster is closed after installation | rainbond-operator |
| 10248/10250/10255/42645 | kubelet service                                                                |                                                                                  | kubelet           |
| 10251                   | kube-scheduler service                                                         |                                                                                  | kube-scheduler    |
| 6443/8080               | kube-apiserver service                                                         |                                                                                  | kube-apiserver    |
| 2379,2380,4001          | etcd service                                                                   |                                                                                  | etcd/etcd-proxy   |
| 10252/10257             | kube-controller service                                                        |                                                                                  | kube-controller   |
| 53                      | Cluster internal dns service                                                   |                                                                                  | rbd-dns           |
| 8089                    | Cluster DNS service listening port                                             |                                                                                  | kube-dns          |
| 6362/6363/6365/6366     | Cluster Event Service                                                          |                                                                                  | rbd-eventlog      |
| 8443                    | Rainbond API Service                                                           |                                                                                  | rbd-api           |
| 6100/6101/6102/9125     | rbd-node service                                                               |                                                                                  | rainbond-node     |
| 10254/18080/18081       | Cluster load balancing listening port                                          |                                                                                  | rbd-gateway       |
| 10249/10256/30008       | kube-proxy service                                                             |                                                                                  | kube-proxy        |
| 10259                   | kube-scheduler service                                                         |                                                                                  | kube-scheduler    |
| 53                      | Cluster internal dns service                                                   |                                                                                  | rbd-dns           |
| 8089                    | Cluster DNS service listening port                                             |                                                                                  | kube-dns          |
| 9999                    | Cluster monitoring                                                             |                                                                                  | rbd-monitor       |
| 3306                    | Cluster database                                                               |                                                                                  | rbd-db            |


- 4001 of etcd is a non-secure port, and 2379 is a secure port
- The rainbond API port does not need to be opened when there is only one data center. When there are multiple data centers and different networks, it needs to be opened to the outside world. 8888 is a non-secure port and 8443 is a secure port.
- Ports 80 and 443 provided by rbd-gateway are provided for HTTP protocol applications, and 10001~65535 are provided for TCP protocol applications.

For more specific port information, please refer to [component port](./required_ports)
