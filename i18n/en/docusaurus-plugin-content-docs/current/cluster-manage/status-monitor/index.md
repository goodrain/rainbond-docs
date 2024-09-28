---
title: Rainbond cluster status monitoring
description: Rainbond cluster status monitoring
keywords:
  - Cluster status monitoring
  - Rainbond cluster status monitoring
---

Rainbond cluster status monitoring supports the monitoring of resources such as CPU, memory, disks, etc. for all nodes in the cluster, as well as the operational status of Rainbond components in the cluster.

Go to **Platform Management -> Cluster**,jump to the cluster management page to see status monitor information in the cluster.

## Cluster information

Shows the basic information about the cluster, including:

- **Name:** Cluster name
- **Rainbond cluster version:** Rainbond cluster version
- **Kubernetes cluster version:** Kubernetes cluster version
- **Running status:** Cluster status
- **Nodes:** Number of nodes in cluster
- **Installation methods:** ClusterIntegration,including from host, Helm installation, etc.
- **Create time:** Cluster creation time

## Node List

Shows a list of all nodes in the cluster and the status of the node.Click on a node to jump to the node management page, see [节点管理](../nodes).

- **Name:** Node's IP or hostname
- **Status:** Node Status
- **Role:** Node's role, including master, worker, etcd
- **Memorial:** Memory usage of node, including total memory, used memory, available memory and usage
- **CPU:** CPU usage of nodes, including total CPU, CPU, available CPU usage

## Cluster resource usage

Shows the amount of resources used by all nodes in the cluster, including CPU, memory, disk, number of nodes, number of components running.

- **CPU:** CPU usage for all nodes in the cluster, including general CPU, used CPU rate.
- **Memorial:** Memory usage of all nodes in the cluster, including total memory and used memory rates.
- **Disk:** Disk usage of all nodes in the cluster, including total disk, used disk rate.
- **Number of notes:** Number of nodes in clusters, including master, worker, etcd nodes.
- **Component Running:** Number of components in cluster, only count active components, not stops

## Rainbond Component List

Shows information about all Rainbond components in the cluster as well as the component status.

- **Name:** Rainbond cluster component name
- **Status:** Rainbond cluster component state, healthy/unhealthy
- **Number of copies:** Number of copies of Rainbond cluster components
- **View:** View the details of the Rainbond cluster component, including the name of the component, POD IP, status, number of copies, number of reboots, run time.
