---
title: Clustering test
description: Cluster Patrol Description and Use
keywords:
  - Clustering test
  - Description and use of cluster inspection function
---

Platform tours are a tool to monitor and assess the performance of the underlying system and help you quickly identify potential risks in the system and recommend appropriate fixes.This tool can be used to scan all aspects of the cluster, including system performance bottlenecks, operating state of the business component, configuration issues and mirror security gaps, to improve the performance, stability and availability of the system.

## Main features

Inspections mainly support the K8s cluster inspections, Rainbond service inspections, operating inspections, configuring inspections and safety inspections.These five types of inspections are described in detail below.

### K8s Cluster Inspection

When inspecting the K8s cluster, check the status of the node, the state of the core component, and some resource usage.

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/cluster-scan1.png)

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/cluster-scan2.png)

#### Node Health Status

- Check the health status of all nodes in the cluster, including the operation status of the node, the availability of the node, the status of the nodes filesystem, etc.In addition, there is a need to check if the kernel in the node has a dead lock, or if the docker is normal to ensure the stability and availability of the entire cluster.

#### K8s Core Component Status

- Core components in K8s include kube-apiserver, kube-controller - manager, kube-scheduler and etcd.Check the status of these core components to ensure that the core functions of the Kubernetes cluster function properly.In addition, there is a need to check the expiry date of the K8s cluster certificate in order to avoid the expiry of the certificate leading to cluster problems.

#### Node Resource Status

- K8s is a highly dynamic system that needs to ensure the availability of node resources to support the proper functioning of the application.Therefore, when inspecting clusters, there is a need to check the use of resources for nodes, including CPU, memory and disk.By checking the use of resources, the availability and scalability of nodes resources can be ensured and timely identification of problems that may affect the performance of applications.

### Rainbond Service Patrol

When inspecting Rainbond bottom services, check the state of each core component and reboot.

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/rbd-server.png)

#### Run Status

- Check the state of operation of the core components at the bottom of Rainbond such as api services, gateway services, build services, app running services, etc. to ensure the proper functioning of Rainbond

#### Restart Status

- Inspecting the restarting of the underlying components of Rainbond, such as the number of restarts, reasons for restarting, etc., will ensure that the problems of Rainbond own components are identified and repaired in a timely manner.

### Run Cruise Check

The running inspection is primarily directed at operations running on the platform, and when the inspection is carried out, the main component pod is checked for performance and restart.

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/running.png)

#### Run Status

- Checks how low Pod works in the cluster, e.g. if Pod is in Running state, Pod is in CrashLoopBackOff state, Pod is in Pending state, etc. to ensure that an exception is found in time.

#### Restart Status

- Check for reboot of the Pod in the cluster, such as number of reboots, reasons for restarts, to ensure that Pod problems are identified and repaired in a timely manner.

### Configure Patrol

Configure the inspection primarily for business resource configuration, health test configuration, etc. running on the platform.Primary check container mirror labels, parameters while the container is running, resource restriction settings, storage mount settings, container health detection settings.

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/config.png)

#### Container Image Label

- Check that the labels of the container mirror are compliant and include whether the latest tag is used, whether a clear version number is used.

#### Container Runtime Parameters

- Check if the parameters are safe while the container is running, including whether the use of privileges is prohibited, whether security policies are enabled, etc.

#### Resource Limit Settings

- Check if the container resource limits are reasonable, including CPU and memory limits set reasonable.

#### Storage volume mount settings

- Check if the container storage volume mount settings are reasonable, including if mounted on the host filesystem is prohibited, and if ReadOnlyRootFilesystem is used.

#### Container Health Detection Settings

- Check if the container's health detection setting is reasonable, including whether libility is set and readiness probe and whether the probe interval is set correctly.
- By scanning and analysing these configurations, the generated configuration cruise report provides configuration advice and optimization options for each component to help users improve the security and reliability of the system.

### Safety Patrol

The safety cruise is primarily aimed at scanning business mirrors running on the platform and providing links to detailed information to allow users to repair the various security gaps in the mirrors.In particular, safety inspections consist mainly of scanned mirrors security gaps, bug reports, recommendations and solutions, and automated periodic tests.

![description](https://static.goodrain.com/docs/enterprise-app/rainbond-scanner/leak.png)

#### Scan mirror security gaps

- Gets the security gap information that exists by scanning deployed business mirrors within the cluster.

#### Analyze bugs

- The identified security gaps are analysed, the extent of their impact on operations is assessed and risk ratings are given accordingly.

#### Provide advice and solutions

- Based on the scanned security gaps and the results of the assessments, the corresponding recommendations and details are given to help users fix the gaps and improve the safety of their operations.

#### Regular Detection and Automation

- Security inspections need to be conducted on a regular basis in order to maintain the security of operations.At present, security inspections support automation and are automatically monitored for each newly deployed operational component and reports are generated.

## Manual

In the case of specific use, it is possible to select inspection items for scanning, based on the results of the scan, to fix the problem.

### Clustering test

After entering the platform's inspection page, click on the cruise button at the bottom, the platform will start the auto-inspection and give the inspection results.The inspection results in K8s cluster inspections, Rainbond service inspections, operating inspections, configuration inspections, and safety inspections, each displayed in errors, warnings, normal numbers depending on the level of risk.Click on the right to view the report will list detailed information.

### Issue Fix

The results of the inspections require screening and repair of existing problems, such as unhealthy nodes, abnormal cluster core components, unusual and restarting rainbod components, abnormal or restarted business components, configuration of business components, mirror loopholes, etc.

#### Node unhealthy

- If the node is unhealthy, find the kernel log or nodes Events information for repair.
- If there is insufficient disk space on the node, you can free disk space by removing unnecessary files or moving files to another storage location.

#### K8s Core Component Exceptions

- If kube-apiserver, kubelet, kube-controller or kube-scheduler is in an exception to the state of the component, you can view the log or try restarting the service to fix it.
- If the certificate is about to expire, please update the cluster certificate in time.

#### Rainbond Component Running Exceptions

- Look at the log, Events and other ways to view Rainbond components, troubleshooting component failed to start, unable to access issues, etc.

#### Rainbond Component Restart Exception

- Fix by sorting last component exit logs.

#### Abnormality of operation of business component on platform

- In Rainbond Component Views, view business logs, Events info, and more, troubleshoot components failed to start, cannot access and so on.

#### Business Component Restart Exceptionally on Platform

- Fix by sorting the last operation component out logs.

#### Business Configuration Issues on Platform

- Check that the labels of the container mirror are compliant and include whether the latest tag is used, whether a clear version number is used, etc.
- Check if the parameters are safe while the container is running, including whether the use of privileges is prohibited, whether security policies are enabled, etc.Unset to set in component view - security.
- Check if the container resource limits are reasonable, including CPU and memory limits set reasonable.
- Check if the container storage volume mount settings are reasonable, including if mounted on the host filesystem is prohibited, and if ReadOnlyRootFilesystem is used.
- Check if the container's health detection setting is reasonable, including whether libility is set and readiness probe and whether the probe interval is set correctly.

#### Problem with mirror security on the platform

- Resolve by upgrading the base base image version.
