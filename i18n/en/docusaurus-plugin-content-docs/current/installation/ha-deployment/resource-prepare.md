---
title: "Software and Hardware Environment Requirements"
description: "Software and Hardware Environment Requirements"
hidden: true
---

This configuration requirement applies to deploying highly available Rainbond clusters based on private servers.


## 1. Operating system requirements

| system |   Version   | kernel version | OpenSSH version |
|:------:|:-----------:|:--------------:|:---------------:|
| Ubuntu | 16.04/18.04 |      4.0+      |      7.0+       |
| CentOS |     7.*     |      4.0+      |      7.0+       |

Rainbond supports deployment based on various Linux distributions. If you use the CentOS 7 operating system, be sure to upgrade the operating system kernel; please refer to [CentOS System Kernel Upgrade Guide](https://t.goodrain.com/t/topic/1305)for the operation steps.



## 2. Overview of Node Properties

The node type attribute description is as follows：

| property category | Attributes      | Overview                                                                                          |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| Kubernetes        | management node | Hybrid deployment of Kubernetes management nodes and Rainbond management services                 |
| Kubernetes        | calculate node  | Provide computing resources for workloads                                                         |
| Kubernetes        | ETCD node       | Used to save all network configuration and object state information of the Kubernetes cluster     |
| Rainbond          | gateway node    | Entrance for application access on the cloud|At least 2 units                                     |
| Rainbond          | build node      | Rainbond platform executes source code construction task node                                     |
| Rainbond          | database node   | Build a database outside the cluster for the platform to store metadata                           |
| Rainbond          | storage node    | Deploy an open source version of the GlusterFS cluster to provide shared storage for the platform |


## 3. Details of hardware requirements


> Production server configuration requirements

| Node properties | CPU    | Memory | Number of servers | Remark                                                                             |
| --------------- | ------ | ------ | ----------------- | ---------------------------------------------------------------------------------- |
| management node | 4vCPU  | 8G     | at least 2        |                                                                                    |
| calculate node  | 16vCPU | 64G    | at least 2        | Allocate resources according to business conditions, and follow-up can be expanded |
| gateway node    | 4vCPU  | 16G    | at least 2        |                                                                                    |
| build node      | 4vCPU  | 16G    | at least 2        |                                                                                    |
| ETCD node       | 4vCPU  | 8G     | at least 3        |                                                                                    |
| database node   | 2vCPU  | 4G     | at least 2        |                                                                                    |
| storage node    | 4vCPU  | 8G     | at least 3        |                                                                                    |

In the production environment, all roles can be separated to achieve a completely split, each function-specific architecture; the role attributes can also be reused to build a reusable cluster with the fewest servers.

## Fourth, the disk partition

It is recommended to use the logical volume lvm for disk partitioning, which is convenient for later expansion.

- The disk partition details of each node are as follows：

### management node

| disk        | partition       | Size | illustrate            |
| ----------- | --------------- | ---- | --------------------- |
| system disk | /               | 100G | system root partition |
| data disk   | /var/lib/docker | 100G | docker partition      |


### calculate node

| disk        | partition       | Size | illustrate            |
| ----------- | --------------- | ---- | --------------------- |
| system disk | /               | 100G | system root partition |
| data disk   | /var/lib/docker | 300G | docker partition      |

### ETCD node

| disk        | partition     | Size | illustrate                              |
| ----------- | ------------- | ---- | --------------------------------------- |
| system disk | /             | 100G | system root partition                   |
| data disk   | /var/lib/etcd | 100G | etcd data partition, ssd is recommended |

### gateway node

| disk        | partition       | Size | illustrate            |
| ----------- | --------------- | ---- | --------------------- |
| system disk | /               | 100G | system root partition |
| data disk   | /var/lib/docker | 100G | docker partition      |


### build node

| disk        | partition       | Size | illustrate                                                                                                                                              |
| ----------- | --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| system disk | /               | 100G | system root partition                                                                                                                                   |
| data disk   | /var/lib/docker | 300G | docker partition                                                                                                                                        |
| data disk   | /cache          | 300G | (On-demand) source code build cache data partition, such as when the platform uses more source code build functions, the disk capacity can be increased |


### database node

| disk        | partition      | Size | illustrate            |
| ----------- | -------------- | ---- | --------------------- |
| system disk | /              | 100G | system root partition |
| data disk   | /var/lib/mysql | 100G | MySQL data partition  |


### storage node

| disk        | partition       | Size | illustrate                    |
| ----------- | --------------- | ---- | ----------------------------- |
| system disk | /               | 100G | system root partition         |
| data disk   | /var/lib/docker | 100G | docker partition              |
| data disk   | /data           | 1T+  | Shared storage data partition |

## V. Other resources and requirements


### Gateway high availability

The Rainbond gateway node needs to use **Keepalived** or **load balancing** to ensure high availability. If the server network does not support the Keepalived service, you need to know whether other load balancing services are available, such as Alibaba Cloud SLB load balancing.

The following resources need to be prepared when using the Keepalived：

|  Node type   |                resource                | quantity |
|:------------:|:--------------------------------------:|:--------:|
| gateway node | Virtual IP on the same network segment |    1     |


When using an existing load balancing service, the load balancing service requires ports`80, 443, 6060, 6443, 7070, and 8443` of the proxy gateway node.


### public network open

All nodes require access to the public network.


### Pan resolution domain name

The platform will provide a pan-analytic domain name for HTTP type applications. The domain name of `*.grapps.cn`is used by default. The domain name can be customized during installation. If a custom domain name is used, the resolution of the custom pan-domain name needs to be configured.


**After the cluster resources are prepared, please refer to the [High Availability Installation Rainbond Cluster](/docs/installation/install-with-ui/ha-installation) document for cluster deployment.**
