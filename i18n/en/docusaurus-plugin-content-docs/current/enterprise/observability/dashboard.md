---
title: Observation Centre
description: Describe the functionality and use of the observatory panel.
keywords:
  - Observation Centre
  - Observation center
---

The observatory is a set of tools and data visualization panels for surveillance, debugging and analysing infrastructure and application services operating on the Kubernetes cluster and rainbond platforms.It provides a number of key features, such as：resource monitoring, traffic analysis, cluster management, cluster patrols, surveillance alerts, etc., which allow for more effective management and optimization of applications deployed in clusters.

## Main features

Resource monitoring of clusters and nodes enables the collection and analysis of logs, the tracking and diagnosis of performance indicators for applications and infrastructure, the provision of a wide range of tools to identify clustering issues, better manage and optimize clusters, and improve system stability.
This is mainly divided into clusters of overview information and cluster details.

### ClusterIntegration|Cluster overview

Resource monitoring data in clusters and platforms, traffic maps and access to large screens and cluster management features are shown.

![description](https://static.goodrain.com/docs/enterprise-app/observability/observability-all.png)

#### Resource Monitor

- The total usage of CPU, memory and disk in the Kubernetes cluster makes it easier to monitor cluster performance, prevent problems from occurring, plan resources, save costs and improve cluster reliability and availability.
- The number of teams, applications and instances in the statistical rainbond platform is intended to understand the current resource usage of the platform and to provide a reasonable estimate and allocation of resources.

#### Traffic profile

- Identify hotspot：service traffic maps to help us identify service hotspots, the most commonly used.These hot spots may lead to performance problems that require special attention.
- Optimizing performance：by analysing service flow profiles, we can find out the bottlenecks of the service and understand the bottlenecks in the service so as to optimize its performance in a targeted manner.
- Planned capacity：service traffic map helps us understand the usage of the service and helps us plan capacity to ensure that the service can withstand future load pressures.

#### Other features

- The provision of large and system screens is mainly intended to view the real-time usage of clusters and platforms, to clarify the use and distribution of resources and to help sort out performance issues, while cluster management can operate directly on target clusters, including cluster information editing and some movement of nodes, labels, spoils, etc.

### ClusterIntegration|Cluster details

Demonstrate the details of the cluster, such as health indicators, component health, resource use, cluster networks, nodes, etc.

![description](https://static.goodrain.com/docs/enterprise-app/observability/observability-one.png)

#### Health indicators

- Health indicators reflect the integrated health status of the cluster by checking k8s cluster, rainbond services, operating components, configuration issues, and mirror gaps.

#### Component Health

- If cluster performance problems occur in relation to networks, memory, disks, etc. they may affect many of the components operating in the cluster and can be observed through the total component health.

#### Resource Usage

- Resource display of CPU and usage of memory can affect the performance and stability of the cluster, and applications deployed in the cluster may experience a decline in performance and may cause clusters to collapse.

#### Network

- The stability of cluster networks is also important and has a significant impact on service communications, nodal communications and cluster communications, reflecting usage through network routes.

#### Node Status

- The performance of each node is also critical in the cluster, by monitoring the use of resources for each node, including CPU, memory, storage and status.A better understanding of the load at the nodes would optimize resource movement and management and increase resource utilization and efficiency and allow each node to function properly.

## Manual

The analysis is carried out through indicators and data on the health status and use of resources by clusters and platforms, the rational allocation of resources and the use of multiple tools to ensure the stability of clusters and operations.

### ClusterIntegration|Cluster overview

1. Counted the number of clusters and the total resources used; e.g. CPU, memory, disk.

2. Shows the current usage of the platform, such as the number of teams created, the number of apps deployed, the number of instances running.

3. Some other feature entrances are provided, such as large application screens, large system screens, cluster management, etc.

- The application of large screens and system large screens integrates visualization monitoring systems and mainly provides real-time statistics of resource data from clusters and platforms.
- The cluster management entrance can operate directly on the target cluster, such as the movement of nodes, nodes, or the addition or deletion of labels.

4. The traffic structure map is mainly used to display the traffic and distribution of the traffic in access, with a link to \`domain name->app->team->cluster.

### ClusterIntegration|Cluster details

1. Show detailed resource usage for each cluster, such as nodes, components, component health, network, CPU and memory usage ratio.

- High CPU and memory ratios affect cluster performance and stability, and applications deployed in clusters are less performing and may cause nodes to collapse;
- The number of component anomalies is generally related to the services and configuration deployed and, if the number of anomalies is high, it is not excluded that there is a problem with the cluster;
- Health indicator data are derived from cluster inspections and are broken down into normal, warning and anomalies based on the results of the inspection; the percentage of normal data is displayed here.If you want to get detailed inspection information, you can click on the right cluster check to view.
- The network compromise maps reflect the bandwidth of the cluster network and vary according to work load and cluster size. It is important to note that network bandwidth is not the only factor affecting cluster performance.Other factors, such as delays, loss of data packages, and congestion, also affect the performance of clusters.If you need to optimize the network performance of clusters, you should consider using high-performance network infrastructure, such as dedicated network interface cards (NIC) or network switches with high-speed backboard.In addition, you should configure your network to prioritize traffic between nodes and minimize congestion.

2. Shows resource usage of all nodes in a cluster, e.g. CPU, memory, partitions, disks, connections, TCP_tw, bandwidth, etc.

3. A number of other feature portals are provided, such as link tracking, global logs, cluster monitoring, node monitoring, component monitoring, service monitoring, surveillance alert, cluster inspections, etc.

- Cluster data are visualized mainly through Grafana.
- Cluster tours are primarily conducted for K8s cluster inspections, Rainbond service inspections, operating inspections, configuration inspections, and safety patrols.