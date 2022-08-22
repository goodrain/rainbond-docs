---
title: Cluster Basic Management
description: This chapter documents the basic management of Rainbond clusters.
weight: 103
---

## Node expansion

the host supports node expansion operations.On the cluster page, click `node expansion` to enter the node configuration management page. Add additional nodes and select their properties as you would orchestrate nodes when adding a cluster.It should be noted that existing nodes cannot be changed, only new nodes can be added.The newly added nodes need to meet the same requirements as the nodes when they are installed for the first time.After the arrangement is complete, click Expand to enter the expansion process.

![image-20210220114604988](https://static.goodrain.com/images/5.3/node-append.png)



> It should be noted that the expansion of nodes, especially the expansion of management nodes and ETCD nodes, may have a certain impact on cluster services, and it is necessary to choose an appropriate time to carry out.The expansion of computing nodes has no impact on existing services.



## Cluster offload



### Rainbond Region Service Uninstall

The cluster that has been initialized but not connected can be uninstalled by clicking the uninstall button in the Kubernetes cluster list.If the connected cluster needs to be uninstalled, you need to delete the connected cluster first in the enterprise view cluster management. After the Rainbond Region service is uninstalled, the Kubernetes cluster will be in an uninitialized state.

![image-20210220110539235](https://static.goodrain.com/images/5.3/cluster-uninstall.png)



> Note that cluster uninstallation is a dangerous operation and data cannot be recovered after uninstallation.



### Uninstall from a host-installed Kubernetes cluster

If you really need to uninstall the Kubernetes cluster installed from the host, you only need to do the following：

1. Delete kubernetes related containers for all nodes.
2. Delete the `/etc/kubernetes`directory for all nodes.
3. Delete the `/var/lib/etcd`directory for all nodes.
4. Delete the `/opt/rke/`directory for all nodes.
5. Delete the cluster record from the platform.



### Modify cluster metadata

![image-20210220114719945](https://static.goodrain.com/images/5.3/change-cluster.png)

Cluster metadata includes the following：

Cluster name：The cluster name displayed on the platform generally needs to be set to a name that is easy to recognize.

API address：The control API address of the cluster. This address is bound to the certificate and cannot be changed arbitrarily.

WebSocket address：The websocket communication address, facing the browser, is mainly used for log push and file download.

The HTTP application default domain name suffix：is used to assign the default domain name, which needs to be parsed to the cluster gateway IP address.

TCP application access IP：cluster gateway IP address or VIP address.



> The certificate is used for two-way authentication during communication. If it needs to be modified, it needs to be modified synchronously with the API service on the cluster side.
