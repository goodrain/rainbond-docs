---
title: SkyWalking use
description: Rainbond integrates SkyWalking with plug-ins to implement APM plug and play
keywords:
  - SkyWalking
  - APM
  - SkyWalking Link Tracking
---

SkyWalking is an open-source observable platform for the collection, analysis, aggregation and visualization of data from services and cloud-origin infrastructure.Supporting distributive tracking, performance indicator analysis, application and service dependence, etc. It is a modern APM designed for cloud based and container-based distribution systems.

Rainbond, an open source endogenous application management platform that uses simple and no knowledge of containers and Kubernetes, supports the management of multiple Kubernetes clusters and provides life-cycle management for enterprise-level applications, including applications to develop the environment, application markets, micro-service architecture, application continuum delivery, application vization, application multicloud management, etc.

The purpose of this integration is to achieve, run on Rainbond, automatically switch over SkyWalking Server by opening the SkyWalking plugin for Rainbond, flexible opening of the APM, closing plugins when you do not need to do it.

## Integrate architecture

SkyWalking's service needs to be enabled in the monitored service while SkyWalking agent needs to be configured to the app launch command, although there is no intrusion on the application code, the configuration process needs to invade the application.Rainbod implements no-intrusion into the app by making SkyWalking's agent into Rainbond [初始化类型插件](https://www.rainbond.com/docs/get-start/concept/plugin/) and copying agent’s jar package to the app container before the application container starts so that it can load agent and connect to SkyWalking Server, the process is free and extensive.Other APMs can be used in a similar way, using users to implement different APM tools by replacing plugins.

The graph below shows the structure of using SkyWalking's app monitoring in Rainbond

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/SkyWalking-Rainbond.png)

## How Agent plugin works

The Rainbod plugin system is part of the application model relative to Rainbond, which is primarily used to support the extension of the application container.Since there is greater commonality in the delivery of the tools, the plugin itself can be reused.Plugins must be bound to the application container in order to be operational in order to achieve a performance capability such as performance analysis plugin, network governance plugin, initialization type plugin.

Running environments with running plugins match the bound components with： in the following

- **Cyberspace** is a critical feature that allows plugins to listen and intercept component network traffic, set component local domain name parsing etc.
- **Storage Persistent Space** this feature allows file exchange between plugins and components via persistent directory.
- **Environment variables** this feature allows the plugin to read the environment variable of the component.

SkyWalking's integration with Rainbond, we use **Initialization Type** plugins which, by definition, are a plugin capable of initializing before the application starts and whose rationale is based on [init容器](https://kubernetes.io/en/docs/concepts/workloads/init-containers/) that Pod can contain multiple containers where the application can run and Pod can also have one or more init containers that can be activated only when init runs successfully, and components of that type will run the application until the task is defined in the plugin before the application starts.So simply define the use of initialization type containers to copy agent-specific data to the corresponding directory before the application can start, so that the data can be used directly by the follow-up service.

## Install SkyWalking via Rainbond one click

We have made SkyWalking app and posted to the Marketplace. Users can install it on the open source store by one button.

1. Install [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install/);
2. Searching for SkyWalking, in the open source shop, by clicking on the installation;
   3. Installation is complete and can be followed by Rainbod management and shipping SkyWalking.

SkyWalking server is divided into four parts of：exploration service, backend service, storage service and UI：

- **Platform backend (oap-server)** supports data aggregation, analysis and flow processing, including tracking, indicators and logs.
- **Storage (elasticsearch-7.13.4)** Store SkyWalking data through open/plug interfaces.Support ElasticSearch, H2, MySQL, TiDB, InfluxDB.
- **UI(Skywalking-ui)** is a highly customizable Web-based interface, allowing SkyWalking end-user visualization and management of SkyWalking data.
- **Agent** collect data and reformat data based on SkyWalking (different propositions support different sources).

## Monitor services using SkyWalking

### Preparing environment

Have a monitored service with reference to [deploy Spring Cloud Pig](/docs/microservice/example/pig)

### Configure SkyWalking Agent plugin

**Install Plugins**

- Installing `skywalking-agent` on Rainbond team interfaces -> Plugins -> Install from Marketplace

**Open Plugins**

- In each component -> Plugins -> Open Plugin.

**Add Environment Variable**

Adds environment variables for each component

```bash
JAVA_OPTS=-Dskywalking.agent.service_name=backend -javaagent:/tmp/agent/skywalking-agent.jar -Dskywalking.collector.backend_service=${OAP_HOST}:11800
```

|                                                     Variable value                                                    | Introduction                                                       |
| :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------- |
|               -Dskywalking.agent.service_name=\*\*               | Name of service displayed in SkyWalking UI                         |
| -Dskywalking.collector.backend_service=Host:Port | SkyWalking oap-server's access address to receive skywalkback data |
|                       -javaagent:/tmp/agent/skywalking-agent.jar                      | Specify the jar package address to inject                          |

- Create Dependencies

A dependency of the `SkyWalking oap-server` service will be established for each component to be monitored so that it can connect to `oap-server` via the address `127.0.0.1` or enable `oap-server` to fill that address at the controlled end without creating dependency.

### Visit SkyWalking

Visit the external port `skywalking-ui` to enter the visualization interface.

- Dashboard

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/skywalking-page.png)

- Service call topography

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/practices/skywalking/Service-Topology.jpg)
