---
title: Node administration
description: Rainbond Cluster node Management Guide
keywords:
  - Nodes Manage
  - Rainbond Cluster Nodes Manage
---

Kubernetes executes your work load by placing the container in the Pod running on Node. The node can be a virtual machine or a physical machine, depending on the cluster configuration. Each node contains the services needed to run the Pod; these nodes are managed by the controllers.

Normally there are several nodes in the cluster; in an environment where learning is used or resources are limited, your cluster may have only one node.

Components on the node include kubelet, when the container is running, and kube-proxy.

For more information on nodes, see [Kubernetes Notes] (https://kubernetes.io/docs/concepts/archive/notes/).

Go to **Platform Manager -> Cluster -> Node**. Tap any node to jump to the node management details.

## Node Details

The node details page contains the following information：

- **Name:** Node's IP or hostname
- **Status:** Node's status, ady indicates the node is normal, NotReady indicates an exception
- **IP Address:** The internal IP address of the node
- **Container runs:** Container running, including docker, containerd and running version
- **System Architecture:** Node Architecture, including amd64, arm64 etc.
- **Node Type:** Node type, including master, worker, etcd
- **OS Version:** Node's OS version
- **Operating System Type:** Node's operating system type, including Linux, Windows etc
- **Kernel Version:** Node's kernel version
- **Create:** Time of nodes creation

## Resource usage

The resource usage of the node details page contains the following information：

- **CPU:** CPU usage for nodes, including total, used, available and usage
- **Memorial:** Memory usage of nodes, including total, used, available and usage
- **Disk root partition:** Disk root partition, including total, used, available, usage
- **Disk Containers Volume :** Freenet data volume for the node, including total, used, available, usage

## Label management

Manage tabs for nodes, click the **Edit Label** button, eject the tab dialog to add, delete, or modify the node's tabs.

## Spreadsheet management

Manage hooks. Click **Edit Snoots** to add, delete, or modify nodes.

Currently supporting blot：

- **NoSchedule:** The new Pod scheduling is not allowed to this node, but the Pod that has been scheduled to continue running on this node.
- **PreferNoSchedule:** does not allow new Pod scheduling to this node, but allows the Pod already scheduled to continue running on this node.However, the Scheduler will try to avoid moving the Pod to a node with that badge.
- **NoExecute:** No new Pod scheduling is allowed to this node, nor does Pod already scheduled to continue running on this node.However, if the Pod is already running on this node, allow the Pod to run on the node until it is deleted.

For more information on nodal spots, see [Taints and Tolers] (https://kubernetes.io/docs/concepts/schedule-event/taint-and-tolation/).

## Node Dismiss Schedule

Disallow dispatching nodes, click the **Dispatch** button, eject the Dispatch dialog and add a staging point \`node.kubernetes.io/unscheduble:Noscheduled to be seen in the list of spots.

## Node Range

Node soring is actually a ban on the node and then forcibly evicts the Pod on the node with a `kubectl drain`.

Click the **vacancy** button to empty the node.

See [Drain Node] (https://kubernetes.io/docs/tasks/admin-cluster/safely-drain-node/) for more information on node ranking.
