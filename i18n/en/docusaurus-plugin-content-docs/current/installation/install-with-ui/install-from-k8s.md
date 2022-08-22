---
title: "Access the installed Kubernetes cluster"
description: "Access the installed Kubernetes cluster"
---

This method is suitable for the Kubernetes cluster that has been installed and wants to connect to the Rainbond platform. This process will initialize the installation platform and access it. The initialization and access process will not affect the existing business form of the cluster.

### Preconditions

- The cluster network and the console network are kept unblocked;
- Kubernetes cluster version is between`1.16.0-1.21.0`;
- `80, 443, 6060, 6100, 6101, 6102, 7070, 8443, 9125, 10254`ports of the Kubernetes cluster are not occupied;
- The Kubernetes cluster`KubeConfig`file can be obtained normally.


## Install and deploy

- On the cluster page, select `to access the Kubernetes cluster`

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/install-fromk8s.png" title="Access to Kubernetes cluster" />

- Fill in the cluster name and content of the KubeConfig file

You can customize the cluster name. The KubeConfig file is usually located in the`~/.kube/config`path of the master node of the Kubernetes cluster.

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/docking-k8s.png" title="Docking with Kubernetes cluster" />

- Initialize Rainbond

After adding the Kubernetes cluster, the health status shows that it is running. At this time, the installation of Rainbond can be completed according to the guidance. After the platform cluster is initialized, the connection is completed.

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/state.png" title="health status" />

- complete docking

After the addition is complete, the cluster is in the running state and the connection is completed and can be used.

<img src="https://static.goodrain.com/docs/5.4/user-operations/install/install-from-k8s/verify.png" title="complete docking" width="100%" />

## console migration

The console deployed in this way is not available for production. If you want to continue to use it after the experience is complete, it is recommended to migrate the console to Rainbond Management  [Reference Document](./console-recover/).

## Next step

Refer to[Quick Start](/docs/quick-start/getting-started/)to deploy your first application.
