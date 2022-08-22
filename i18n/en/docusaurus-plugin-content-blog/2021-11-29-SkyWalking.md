---
title: Rainbond integrates SkyWalking through plug-ins to achieve APM plug-and-play
description: Rainbond integrates SkyWalking through plug-ins to achieve APM plug-and-play
slug: SkyWalking
---

:::info
SkyWalking is an open source observability platform for collecting, analyzing, aggregating and visualizing data from services and cloud-native infrastructure.Supports distributed tracing, performance metrics analysis, application and service dependency analysis, etc.; it is a modern APM designed for cloud-native, container-based distributed systems.
:::

<!--truncate-->

## 1. Introduction

SkyWalking is an open source observability platform for collecting, analyzing, aggregating and visualizing data from services and cloud-native infrastructure.Supports distributed tracing, performance metrics analysis, application and service dependency analysis, etc.; it is a modern APM designed for cloud-native, container-based distributed systems.

Rainbond is an open source cloud-native application management platform. It is easy to use and does not need to understand containers and Kubernetes. It supports the management of multiple Kubernetes clusters and provides full life cycle management of enterprise-level applications. Its functions include application development environment, application market, and microservice architecture. , application continuous delivery, application operation and maintenance, application-level multi-cloud management, etc.

To achieve the goal of integration in this article, applications running on Rainbond can automatically connect to SkyWalking Server by opening the SkyWalking plug-in of Rainbond, flexibly enable APM, and close the plug-in when not needed to achieve plug-and-play APM.


## 2. Integrated Architecture


When SkyWalking monitors the service, the agent service needs to be enabled in the monitored service, and the SkyWalking agent needs to be configured with the startup command of the application. Although there is no intrusion to the application code, the configuration process needs to invade the application.Rainbond realizes non-intrusion to the application through plug-ins. The SkyWalking agent is made into Rainbond's [initialization type plug-in](https://www.rainbond.com/docs/get-start/concept/plugin/)Before the application container starts, the jar package of the agent is copied to the application container, and the application container can load the agent and connect to SkyWalking Server. The whole process is non-invasive to the application container and has strong scalability.Connecting to other APMs can also be done in a similar way, allowing users to connect to different APM tools by replacing plug-ins.

The following figure shows the structure of monitoring the application using SkyWalking in Rainbond

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/SkyWalking-Rainbond.png)


## 3. The realization principle of Agent plug-in

The Rainbond plug-in system is a part of the Rainbond application model. The plug-in is mainly used to realize the extended operation and maintenance capabilities of the application container.Because the implementation of operation and maintenance tools has a large commonality, the plug-in itself can be reused.Plugins have runtime status only when they are bound to the application container to implement an operation and maintenance capability, such as performance analysis plugins, network governance plugins, and initialization type plugins.

The runtime environment of a plug-in with runtime is consistent with the bound components in the following aspects：

- **Cyberspace** is a crucial feature. Consistent cyberspace enables plug-ins to bypass monitoring and interception of component network traffic, set component local domain name resolution, and so on.
- **Storage Persistence Space** This feature enables file exchange between plugins and components through the persistence directory.
- **environment variables** This feature enables plugins to read the component's environment variables.



During the integration of SkyWalking and Rainbond, we used the**initialization type**plug-in. As the name suggests, this is a plug-in that can perform initialization actions before the application container is started. The basic principle is to use the Kubernetes [init container](https://kubernetes.io/zh/docs/concepts/workloads/pods/init-containers/) . Contains multiple containers, the application runs in these containers, and the Pod can also have one or more init containers that are started before the application container. Only after the init container runs successfully will the application container run. This type of plug-in is enabled in Rainbond 's component runs tasks defined in the plugin until completion before the app container starts.Therefore, it is only necessary to define that before the application container is started, use the initialization type container to copy the data required by the agent to the corresponding directory, so that subsequent services can directly use the data.

## 4. One-click installation of SkyWalking through Rainbond

We have made SkyWalking as an application and released it to the application market, users can install it with one click based on the open source application store.

1. Install [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install/);
2. Search for SkyWalking in the open source app store, click Install to install it with one click;

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/install.jpg)


3. After the installation is complete, you can manage and maintain SkyWalking through Rainbond.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/topology.jpg)

The SkyWalking server is divided into four parts in terms of architecture：probe service, backend service, storage service and UI：

- **Platform backend (oap-server)** Supports data aggregation, analysis, and stream processing, including tracking, metrics, and logs.
- **Storage (elasticsearch-7.13.4)** Storage SkyWalking data via open/pluggable interface.Support ElasticSearch, H2, MySQL, TiDB, InfluxDB.
- **UI (skywalking-ui)** is a highly customizable web-based interface that allows SkyWalking end users to visualize and manage SkyWalking data.
- **probe (agent)** collect data and reformat data according to SkyWalking requirements (different probes support different sources).

## 5. Use SkyWalking to monitor microservices

### Prepare the environment in advance

 - With a set of monitored services, the sample application in this article is[Spring Cloud microservice framework Pig](https://gitee.com/log4j/pig?_from=gitee_search)We have made[Spring Cloud-pig](https://store.goodrain.com/markets/rainbond/apps/c6c8cafc79f740c38ffad3264ea10c4a)as an application and released it to the application market. Users can install it with one click based on the application market.


### Configure service to support SkyWalking monitoring


- Deploy plugin

On the Rainbond team interface, click Plug-in to enter the Plug-in interface, click New Plug-in, and create an initialization type plug-in

Source address：https://github.com/goodrain/skywalking-agent.git

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/plugin.jpg)

After the plug-in is successfully built, it can be used, and this plug-in can be activated for each component of the pig service.


- mount storage

Mount storage for each component of the pig service to share it with plugins.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/storage.jpg)

The mount path is`/tmp/agent`, and the mount type is**shared storage**; this storage provides shared storage for the initialization plug-in and this component, sharing the same data.

- add environment variable

Add environment variables for each component of pig.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/env.jpg)

Variable Interpretation：

|                     variable                     | Introduction                                                                       |
|:------------------------------------------------:|:---------------------------------------------------------------------------------- |
|        -Dskywalking.agent.service_name=**        | Service name displayed in SkyWalking UI                                            |
| -Dskywalking.collector.backend_service=Host:Port | The access address of SkyWalking oap-server, used to receive skywalking trace data |
|    -javaagent:/tmp/agent/skywalking-agent.jar    | Specify the address of the jar package to be injected                              |

After adding the environment variable, updating the component will take effect.

- build dependencies

Establish a dependency relationship with the SkyWalking oap-server service for each component that needs to be monitored, so that it can connect to the oap-server through the address of 127.0.0.1. For the specific principle, please refer to[Inter-service communication](https://www.rainbond.com/docs/user-manual/component-connection/regist_and_discover/); or open the external address of the oap-server, If this address is filled in the monitored end, there is no need to establish a dependency relationship.

### Visit SkyWalking

Visit the external port of skywalking-ui to enter the visual interface.

- dash board

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/skywalking-page.png)

- Service call topology

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/Service-Topology.jpg)



## 6. Summary

The Rainbond-based plug-in mechanism is combined with SkyWalking, without changing the operating environment of the software itself, without adding logic to the project build script, and realizing the plug-and-play capability of SkyWalking.In addition, Rainbond's plug-in mechanism is open, and application governance functions can be extended through the plug-in mechanism, such as network governance, log collection, and data backup plug-ins. Network management plug-ins analyze the performance of services, collect service logs through log plug-ins, and connect to log collection systems such as ELK; for components such as databases, use backup plug-ins to back up data.




