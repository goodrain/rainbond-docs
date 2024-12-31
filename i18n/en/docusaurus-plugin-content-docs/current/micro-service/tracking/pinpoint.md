---
title: PinPoint use
description: PinPoint based on the realization of microservice non-intrusive monitoring and link tracking, suitable for developers and application operation and maintenance personnel.
keywords:
  - PinPoint implements non-intrusive monitoring and link tracking
  - Link Tracking
  - APM
  - Tracing
---

Application Performance Management (APM) means monitoring, optimizing business critical business applications, improving the reliability and quality of enterprise applications, ensuring that users are well served, reducing the overall cost of IT operations and bringing more commercial benefits to the enterprise.

Pinpoint is an APM (Application Performance Management) tool for large distribution systems written with Java/PHP.Use attempts to be simple and efficient, by installing agent on startup, you do not need to modify even one row code to minimize performance losses (3 per cent).

**Advantages:**

- Distributed transaction tracking, tracking messages across distribution applications;
- Automatically detect app pools to help you understand the architecture of the app;
- Horizontal extension to support large server clusters;
- Provide visibility at code level to easily locate failed points and bottlenecks;
- Use byte to boost technology, add new features without changing code.

<img src="https://static.goodrain.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint.jpeg" title="PinPoint组件" width="80%" />

| Component          | Component Features                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinpoint-Collector | Collect various performance data                                                                                                                    |
| Pinpoint-Agent     | Probe is associated with the application server (e.g. tomcat) and is deployed to the same server |
| HBase Store        | Collect data in HBase                                                                                                                               |
| Pinpoint-Web       | Show collected layers now on the web                                                                                                                |

## Prerequisite

- Must be a source based Java project. Default will integrate pinpoint-agent.

## Deploy PinPoint Server

Deploy `PinPoint`, platform management > App Store > Search for `PinPoint` through the Open Source Marketplace.

**Configure websocket**

PinPoint supports real time showing link tracking. This requires PinPoint access to support Websocket protocol.

Find the domain name **pinpoint-web 8080 ports** in **gate** and click **Parameters** to open websocket support.

## Use Pinpoint

**Deployment Example Java Application**

1. Team -> Add -> Create Component -> Official DEMO, Select Java Maven DEMO, Create Component Based on Source Code.
2. Enter the Java component > Dependencies > Add Dependencies to **Pinpoint-collector**
3. Enter Java Component Monitor > Link Tracking > On
4. Update component to see data in link tracking.

### Effect Display

Visits to the site **Pinpoint-web**, you will see the name of the last step

![](https://static.goodrain.com/images/docs/5.2/get-start/best-practices/work_with_apm/java-pinpoint.png)

### Microservice Sample Graph

![](https://static.goodrain.com/images/docs/5.2/get-start/best-practices/work_with_apm/springcloud_pig-pinpoint.png)

### Pinpoint Description

| Pinpoint version | 2.1.0                                                                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApplicationName  | Default value component application name (note that Chinese name cannot be used)                                                                                                                  |
|                  | If you do not want to change the name of the component, you can modify the component environment variable ES_TRACE_APP_NAME to change applicationName |
| agentId          | Value POD variable HOSTNAME                                                                                                                                                                                          |
