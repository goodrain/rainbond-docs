---
title: High available cluster installation instructions
description: A description of the Rainbond high available cluster starting with Linux based on the graphical interface
keywords:
  - High-available Kubernetes cluster based on host installation
  - Install High Available Rainbond Cluster based on Host
---

:::tip
The key to deploying a high available cluster is planning, e.g.：the entire cluster plans how many servers to use, what the role of each server is, the server resources, how disk, etc.
:::

## Deployment architecture

![](https://static.goodrain.com/docs/5.17.0/high-availability.png)

If Figure：uses the minimum number of nodes (3 nodes) to ensure high availability, K8 uses multiple Master + multi-ETCD clusters to ensure high availability, Rainbond uses external balance + multi-gateway nodes + distributed file storage + MySQL high availability cluster security.

## High Available Kubernetes Cluster

[Installing Kubernetes clusters](/docs/installation/installation-with-ui/#Installing -kubernetes-cluster) which requires at least 3 nodes to be deployed, all properties of 3 nodes can be reused, e.g.：3 managing node, 3 computing node, 3 ETCD nodes.

> See[集群配置](/docs/installation/installation-with-ui/rke-config) to customize the Kubernetes cluster configuration based on host installation.

## High Available Rainbond Cluster

High deployment available to Rainbond cluster：1 high available to Kubernetes clusters; both base configuration and advanced configuration options for external high-availability services.

The external services required by Rainbond are described below, including the high availability of those services.

### Load Balancer

Rainbond cluster gateways need to be deployed on high-available load balancers to ensure high availability of cluster gateways.

#### Use existing load equalizer

若已有高可用的负载均衡器，可直接使用，需满足以下条件：

- Proxy to all gateway nodes
- Open 80,443,6060,700,8443 ports

#### Deployment Keepalied

If there is no load equilibrium service available, it is possible to ensure the high availability of gateways by deploying Keepalived on gateways nodes (https://t.goodrain.com/d/8334-keeped) services.

### Gateway Node

Specify the node at which Rainbond gateway service is deployed and runned, and gateway services on each node can work independently, and other gateway nodes are working even if one gateway node is handed.

### Build Node

Specify the node at which Rainbond build services are deployed and running, the more the number of building nodes represents the more tasks that can be built in parallel.

> Build more disk consumes building and it is recommended to run construction services on nodes with SSD disk.

### Storage

Rainbond needs to use file storage, store platforms, and apply data on platforms, provide built-in `NFS` storage by default, run in the `rbd-system` namespace and bind a node randomly and store metadata in the `/opt/rainbond/data/nfs` directory of that node.

If high available file storage is available, the following condition： is required

- Support NFS v3,v4 protocol
- See how to ensure consistency in NFS file locks for supporting file locks?
- Support common NFS parameters, make no_root_squash

If file storage is not installed, please refer to [NFS Server Single Deployment](https://t.goodrain.com/d/8325-linux-nfs-server), [NFS Main Synchronization Deployment](https://t.foodrain.com/d/8323-nfs-rsyncinotify), then install it by [deploying NFS Client Provisioner](https://t.foodrain.com/d/8326-kubernetes-nfs-client-provisioner) on NFS Server to Kubernetes when creating the Rainbond Cluster `nacs-client`nfs-client\`.

Also available [deploy Rook-Ceph](https://t.foodrain.com/d/8324-rook-ceph-v18).

### ETCD

Rainbond clusters need to use ETCD to store cluster metadata information such as cluster status and network configuration.By default the built-in `ETCD`, run in the `rbd-system` namespace by Pod will bind a node randomly and store metadata under the `/opt/rainbond/data/etcdxx` folder on that node.

There is no need for new ETCDs for high available clusters, and use ETCD again for Kubernetes

> ETCD requires high performance on disk, strongly recommends storage using SSD disk.

Based on the host installed Kubernetes cluster, ETCD certificate files are located in the `/etc/kubernetes/ssl` directory, `kube-node.pen` `kube-node-key.pem`, using [Kubectl](/docs/ops-guide/tools/#kubectl-cli) command to create a Secretariat and specify the key name `rbd-etcd-secret` when installed.

- CA certificate：/etc/kubernetes/ssl/kube-ca.pem
- Client certificate：/etc/etcd/ssl/kube-node.pem
- Client key：/etc/etcd/ssl/kube-node-key.pem

```bash
kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```

### Mirror Repository

Specify Rainbond mirror repository, all components on the platform will be picked up and pushed from this warehouse.By default built-in mirror repository, run in the `rbd-system` namespace in Pod mode and stored by `rbd-hub` pvc.

If a mirror repository is available directly, the following condition： needs to be fulfilled

- It is recommended to use URLs and trustworthy certificates, and if you use http:/cker or Containerd, you need to modify the configuration associated with Docker, Containerd.

### MySQL

Rainbond requires MySQL storage console and cluster data.By default provide a built-in MySQL database, running in `rbd-system` namespace using the Pod method, binds a node randomly and stores metadata under the `/opt/rainbond/data/dbxx` directory of that node.

The following conditions are fulfilled for： if a high available database is available.

- MySQL version 5.7.8.0;
- Create a pool of console in advance;
- Database character encoding is utf8mb4;
- Recommended databases and Rainbond cluster networks are within the same intranet.

If the database has not yet been installed, please refer to the document installation [deployment of MySQL main cluster from Docker] (https://t.goodrain.com/d/8335-docker-mysql), [deployment of MySQL main cluster from cluster to cluster in Centos 7 (https://t.goodrain.com/d/8304-centos-7-mysql)

### Console height available

A console based on the host installation of the console is enabled by Docker and is unable to implement the high available deployments, and will need to migrate the dock-enabled console to the cluster, see document[控制台高可用](/docs/installation/installation-with-ui/console-recover)
