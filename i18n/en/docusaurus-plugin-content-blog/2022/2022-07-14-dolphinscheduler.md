---
title: Deployment of DolphinScheduler High Available Cluster in Rainbond
description: Apache DolphinScheduler is a distributable and scalable visualization DAG workflow task movement open source system that addresses data development ETL intricate dependencies and does not allow visual monitoring of mission health
slug: dolphinscheduler
image: https://static.goodrain.com/wechat/dolphinscheduler/dolp.png
---

This paper describes the deployment of a high available DolphinScheduler cluster through [Rainbond](https://www.rainbond.com/) cloud application management platform, which is suitable for users who do not understand the complex technologies of Kubernetes, containers, etc. and reduces the threshold for DolphinScheduler to be deployed in Kubernetes.

Apache DolphinScheduler is a scalable visualization DAG workflow task scheduling open source system.Resolve data development ETL complex dependencies and cannot visualize the health status of the mission.DolphinScheduler assembles Task as DAG stream, allows real-time monitoring of the operation status of the task while supporting retrying, recovery from the specified node, pause and Kill tasks

**Easy to use**：DAG monitoring interface, all processes defined as visualizable, using drag and drop tasks customizing DAG, interfacing with third party systems via API, one-click deployment

**High reliability**：Decentralized multiple Master and multi-Worker, own HA features and use task queue to avoid overloading, do not cause machine card death

**Rich usage scenario**：supports pausing recovery operations. More tenants and better response to big data usage scenarios. Support more task types, such as spark, hive, mr, python, sub_process, shell

**High extension**：supports custom task types, dispatcher use distribution,movement capacity increases with cluster linearity, Master and Worker support dynamic offline

## Prerequisite

- Available Rainbond Cloud Application Management Platform, please refer to the documentation [Rainbond Quick Installation](https://www.rainbond.com/docs/quick-start/quick-install)

## DolphinScheduler Cluster 1 click to deploy

- The DolphinScheduler app can be found by searching for the keyword `dolp` and accessing the built-in open source store.

![](https://static.goodrain.com/wechat/dolphinscheduler/1.png)

- Click DolphinScheduler right to `installation` to enter the installation page, fill in the corresponding information. Click OK to start installing and automatically jump to the app view.

| Select Item  | Note                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| Team Name    | Workspace created by the user to name space isolation                                                           |
| Cluster name | Select which K8s cluster DolphinScheduler is deployed to                                                        |
| Select app   | Select which app DolphinScheduler is deployed to which app contains several related components. |
| App Version  | Select DolphinScheduler version, currently optionally 3.0.0-beta                |

![](https://static.goodrain.com/wechat/dolphinscheduler/2.png)

- The Dolphin Scheduler cluster will be installed and run in a few minutes.

![](https://static.goodrain.com/wechat/dolphinscheduler/3.png)

- Click to access Dolphin Scheduler - API components, you need to add access suffix `/dolphinscheduler/ui`. The default user password is `admin` / `dolphinscheduler 123`

![](https://static.goodrain.com/wechat/dolphinscheduler/4.png)

## API Master Walker Node Stack

DolphinScheduler API, Master, and Worker all support scaling-up multiple instances that ensure high availability of the entire cluster.

Use Worker as an example, enter the component -> Scale, set the number of instances.

![](https://static.goodrain.com/wechat/dolphinscheduler/5.png)

Verify Worker Node, enter DolphinScheduler UI -> Monitor -> Worker to view node information.

![](https://static.goodrain.com/wechat/dolphinscheduler/6.png)

## Profile

API and Worker services share the `/opt/dolphinschedule/conf/common.properties` and only modify the API service configuration when changing the configuration.

## How to support Python 3?

The Worker Service installed Python3 by default to add an environment variable `PYTHON_HOME=/usr/bin/python3`

## How do I support Hadoop, Spark, DataX etc?

Example Datax：

1. Install a plugin.Rainbond Team View -> Plugins -> Install Plugins -> From App Store -> Search for `Universal Data Initialization Plugins` and install it.
2. Open plugin.Enter the worker's component -> Plugins -> Navigate to `Universal Data Initialization` and modify the configuration
   - FILE_URL：http://datax-opensource.oss-cn-hangzhou.aliyuncs.com/datax.tar.gz
   - FILE_PATH：/opt/soft
   - LOCK_PATH：/opt/soft
3. Updating components, initialization plugins automatically download `Datax` and unpress `/opt/soft` to the `/opt/soft` folder.

![](https://static.goodrain.com/wechat/dolphinscheduler/7.png)
