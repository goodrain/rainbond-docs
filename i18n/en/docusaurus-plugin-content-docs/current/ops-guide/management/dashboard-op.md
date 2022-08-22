---
title: Dashboard-based operation and maintenance
weight: 1005
description: View cluster resources based on the Dashboard interface, fast operation and maintenance
---

### Overview

This chapter mainly describes the related functions of cluster Dashboard, view cluster resources, and help users to operate and maintain Rainbond more quickly and efficiently based on Dashboard.


The Dashboard graph panel has the following：

- View various resources
 - Cluster-level resources, such as ClusterRole, namespace, node, PV, StorageClass, etc.;
 - Workloads, including Cron Jobs, DaemonSets, Deployments, Stateful Sets, Jobs, Replica Sets, RC, etc.;
 - Service discovery and load balancing, including Ingresses and Services;
 - Configuration and storage include Config Maps, PVCs and Secrets;
 - Define custom resources.
- Resource monitoring：Monitoring of cluster nodes, workloads, storage and other resources
- Manage resource objects：Create resources, edit component configurations, view and edit service discovery load balancing policies, etc.


### interview method

The Dashboard component has been installed in the cluster installation stage. After the cluster is installed, users can access and use the Dashboard by clicking `cluster name` in the enterprise view -->cluster.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/ds.jpg" width="100%" />


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/overview.jpg" title="Interface overview" width="100%" />


### View resources

#### View node node information

- Resource usage and node health


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/node.jpg" title="cluster node" width="100%" />

Related explanation：

 ready：true is ready state    
CPU minimum demand：cpu minimum usage    
CPU maximum demand：cpu maximum usage    
Memory minimum demand：memory minimum usage    
Memory maximum demand：memory maximum usage    
Create Time：Node Creation Time

- Click on the Node name to view the specific information of a Node

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/nodespecific.jpg" title="resource usage" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/resource.jpg" title="resource allocation" width="100%" />

#### Component information

All components of Rainbond are located in the rbd-system namespace, and you can view the information of each component according to the component deployment type.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/information.jpg" title="Component information" width="100%" />

#### storage

Example:

View rbd-db component storage mount path

Find the PV named rbd-db and click View Details to get the component storage details

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/storage.jpg"  width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/view.jpg" title="Storage details page" width="100%" />


### Manage resource objects

#### Remote login container

Example:

Enter the rbd-app-ui container to view the console error log

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/entercontainer.jpg" title="into the container" width="100%" />

Enter the container to execute shell commands

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/Insidecontainer.jpg" title="container command line" width="100%" />

#### View container running logs

Example:

View the rbd-chaos container running log

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/logs.jpg" title="Container running log" width="100%" />

#### Modify component configuration

Example：

Take updating the node component image as an example

Click **on the left to define custom resources** -->select **RbdComponent** -->Find the component whose configuration needs to be modified in **Objects** , click **Edit** to modify the configuration of the component, and click Update after the modification is complete. Can.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/component.jpg" title="Edit resources" width="100%" />

After modifying the image field, click Update

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/image.jpg" title="Update takes effect" width="100%" />
