---
title: Monitor Large Screen
description: Describe the monitoring and use of the monitoring screen.
keywords:
  - Monitor Large Screen
  - Rainbond large screen monitor
---

Large-screen monitoring is a resource data analysis tool that is primarily used for real-time monitoring of cluster and platform resources and visualization of data.The main elements include cluster information, peer-to-peer information and platform information to help us identify problems more efficiently and to maintain the stability of clusters and platforms.

## Main features

Large-screen monitoring applications are divided into two main modules for resource monitoring and application monitoring. Tap the header title to toggle.

It is important to monitor resources in the Kubernetes cluster because it can help people to understand the use of resources across clusters and nodes or containers.Focusing on the use of resources, such as CPU, memory and other resources, can better manage and optimize the performance, availability, efficiency and cost of clusters and improve the stability and sustainability of the system.

For application monitoring, there is a better understanding of the use of resources in each app, the development of better management services for unusual services, quick positioning of which nodes are running in clusters, and the teams and applications in the platform.

### Resource Monitor

![description](https://static.goodrain.com/docs/enterprise-app/large-screen/resource-monitor.png)

#### Use of cluster resources

- Improved system performance and stability：if nodes or container resources in the Kubernetes cluster are overoccupied, this may cause system performance to decline or container crash.By monitoring the use of resources, these bottlenecks can be identified in a timely manner and measures taken to avoid system failures and failures caused by inadequate resources.
- Optimize resource movement and distribution of：Kubernetes to deploy and allocate resources through the Resource Manager, ensuring that sufficient resources are available for each container or node.By monitoring the use of resources, such as CPU, memory and others, a better understanding of resource requirements for each container or node, and thus more efficient resource movement and allocation.
- Avoidance of resource waste：can lead to waste of resources and affect the efficiency and scalability of the system.By monitoring the use of resources, it is timely to identify which nodes or containers are wasting resources and to take measures to optimize their use and avoid unnecessary waste of resources.
- Cost-saving：monitoring of resources can help you better understand the system's use of resources and thus plan and expand them according to actual needs.This helps you avoid unnecessary waste of resources while saving costs.

#### Node Status

- There are multiple types of nodes available in Kubernetes and each node type has specific uses and functions.For different clusters, the type and number of nodes will vary, and here we are primarily concerned about the normal state of the nodes.

#### Network

- Containers and services in the Kubernetes cluster often need to communicate through the network, and bandwidth is a key factor influencing the speed and delay of communication.Monitoring network bandwidth allows timely identification of network bottlenecks and network performance problems and measures to optimize network performance to ensure network stability and rapid response.

#### Use Node Resource

- Incident detection and exclusion of：each node plays a very important role in the Kubernetes cluster, which may affect the stability and availability of the entire cluster if a node fails.By monitoring the status of each node, troubleshooter can be identified in a timely manner and measures are taken to repair or replace nodes to avoid the proliferation of failures and to affect the stability of clusters.
- Resource planning and management：each node assumes some resource responsibility in the Kubernetes cluster, including CPU, memory, storage, and status.Monitoring the use of resources at each node allows for a better understanding of the load of nodes, thereby optimizing resource planning and management and improving resource utilization and efficiency.
- Incident prediction and optimization of：, by monitoring the state of each node and the use of resources, provides a better understanding of the health status and performance performance of the node, thereby predicting potential failures and performance bottlenecks, taking timely measures to avoid failures, or optimizing performance of nodes and improving the reliability and performance of the system.

#### Run instance

- Watch the example running on each node provides insight into the use of its own resources, the status of the node in which it stands, quickly locate the platform's team and applications, perform troubleshoot analysis and performance adjustment, and maintain the stability of operations on the platform.

### App monitoring

![description](https://static.goodrain.com/docs/enterprise-app/large-screen/app-monitor.jpg)

#### Traffic profile

- Identify hotspot：service traffic maps to help us identify service hotspots, the most commonly used.These hot spots may lead to performance problems that require special attention.
- Optimizing performance：by analysing service flow profiles, we can find out the bottlenecks of the service and understand the bottlenecks in the service so as to optimize its performance in a targeted manner.
- Planned capacity：service traffic map helps us understand the usage of the service and helps us plan capacity to ensure that the service can withstand future load pressures.

#### Apply resource sorting

- It is easy to find out which services consume excessive memory resources so that we can detect and address excessive memory usage in a timely manner.
- We can better understand the use of resources for each service in the cluster so that we can better use cluster resources by making better decisions on resource allocation.
- The memory of services can be found in time to exceed their limits so that we can take measures to avoid service failures due to insufficient memory.

#### Sort team resources

- Better understanding of team memory usage and whether team resource limits are met or exceeded.
- The strength of the team and the number of applications and components operated by the team are higher, and the use of resources should be rationalized.

## Manual

Access to large screens to show groups and platforms in real time can be used to analyse their performance, health and resource use according to indicators.

### Resource Monitor

1. At the top of the page, the total number of clusters and the total usage of all cluster resources are showcased with the total number of components deployed in the platform, while the total number of anomalies is the number of problems common to the cluster, such as insufficient memory disk, unserviceable network and excessive number of processes, with a focus on the total number of exceptions.

2. The cluster information overview shows details of a particular cluster, mainly nodes, services, resource profiles, resource allocations, networks, nodes information, instance information, etc.

- Nodes focus on the number of unusual nodes.
- The number of services is the number of components deployed in the platform, differentiated by operation, closure and anomaly, which is usually due to problems or problems with the deployment of services. If there is a sudden increase in the volume, it is likely to be the result of clustering issues, with a focus on the number of exceptions.
- The resource profile shows the total CPU, memory, and storage for this cluster.
- Allocation of resources to showcase the distribution rate of CPU, memory and storage, overweight CPU and memory shares affect the performance and stability of the cluster, and application performance is reduced for deployment in the cluster, which may also cause nodes to collapse;
- The network compromise maps reflect the bandwidth of the cluster network and vary according to work load and cluster size. It is important to note that network bandwidth is not the only factor affecting cluster performance.Other factors, such as delays, loss of data packages, and congestion, also affect the performance of clusters.If you need to optimize the network performance of clusters, you should consider using high-performance network infrastructure, such as dedicated network interface cards (NIC) or network switches with high-speed backboard.In addition, you should configure your network to prioritize traffic between nodes and minimize congestion.
- The following nodes show all the nodes in this cluster, including the use of resources per node, such as CPU nuclei, CPU usage, total memory, memory usage, root partition, docker partition, state; where excessive use of resources affects the performance and stability of the current node, attention needs to be paid to closing and releasing unnecessary resources.
- The instance section shows the number of instances running under a particular node, including the use of resources for each instance and the team and application to which the instance belongs on the platform.

### App monitoring

1. The total number of platform resources is summarized at the top of the page, such as number of examples, number of components, applications, number of teams and nodes.

2. The traffic structure diagram is mainly used to display traffic flow and distribution of access traffic, with links to \`domain -> app -> team -> cluster.

3. Top left corner selects the team to view app information, default show all team：

- Apply the number of accesses and real time memory in the top：statistical platform;
- The number of people per team and the number of applications in the queue：statistical platform;
- Team activity：shows the action log in the platform.
