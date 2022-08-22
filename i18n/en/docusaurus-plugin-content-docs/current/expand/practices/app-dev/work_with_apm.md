---
title: Implement non-intrusive monitoring and link tracking of microservices based on PinPoint
description: Based on PinPoint to realize non-intrusive monitoring and link tracking of microservices, it is suitable for developers and application operation and maintenance personnel.
---

Application Performance Management (APM) refers to monitoring and optimizing key business applications of enterprises, improving the reliability and quality of enterprise applications, ensuring that users receive good services, and reducing overall IT operation and maintenance. cost, and bring more commercial benefits to the enterprise.

Pinpoint is an APM (Application Performance Management) tool for large distributed systems written in Java/PHP.Trying to be simple and efficient in use, by installing the agent at startup, there is no need to modify even a single line of code, minimizing performance loss (3%).


- Advantage：

   1) Distributed transaction tracking, which tracks messages across distributed applications;  
  2) Automatically detects application topology to help you figure out the application's architecture;  
  3) Horizontally scales to support large-scale server clusters;  
  4) Provides Code-level visibility to easily locate failure points and bottlenecks;  
  5) Use bytecode enhancement techniques to add new functionality without modifying the code.


- This document is suitable for enterprise development, testing, and operation and maintenance personnel who need to implement microservice monitoring and link tracking through PinPoint.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/pinpoint/pinpoint.jpeg" title="PinPoint Components" width="80%" />

| components         | Component function                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Pinpoint-Collector | Collect various performance data                                                               |
| Pinpoint-Agent     | The probe is associated with an application server (eg tomcat) and deployed on the same server |
| HBase Storage      | The collected data is stored in HBase                                                          |
| Pinpoint-Web       | The collected data layer is now displayed on the web                                           |

This document is suitable for enterprise development, testing, and operation and maintenance personnel who need to implement microservice monitoring and link tracking through PinPoint.

The preset scenario of this document is to learn how to deploy PinPoint in the Rainbond environment through demonstration use cases, monitor the test business, and trace its links.

### Preconditions

* It must be a Java project based on source code, and pinpoint-agent will be integrated by default.

### Steps


You can deploy PinPoint to your Rainbond environment through one-click deployment from the official app market.

- **Install Pinpoint**

  ​ 1) Enter the team view > to add > to create a component based on the application market.

  ​ 2) Search for **pinpoint** > installation in the Rainbond community open source store and install the latest version **2.1.0**.

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/install-pinpoint.jpg" title="Installation example" width="100%" />

- **configure websocket**

  PinPoint supports real-time display of link tracking data, which requires the access address of pinpoint to support the websocket protocol.

  Find the domain name of **pinpoint-web 8080 port**in **gateway** , click **parameter setting**, and enable websocket support.

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/port-websocket.jpg" title="Enable WebSocket" width="100%" />

- **running result**

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/pinpoint.jpg" title="running result" width="100%" />

- **Demo Pinpoint-agent using the official DEMO**

  ​ 1) Refer to [Quick Start](/docs/use-manual/get-start/team-management-and-multi-tenancy) to install components based on source code

  ​ 2) Enter the component view created in the first step > Dependency > Add dependent component name**Pinpoint-collector**.

  ​ 3) Enter component monitoring > and enable link tracking >.

  ​ 4) Update components.

  **Effect display：**

  ​ Visit **Pinpoint-web**and you will see the app name from the previous step.At this point, complete.

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/java-pinpoint.png" title="running result" width="100%" />

  **Spring Cloud Pig** effect display：

  <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/get-start/best-practices/work_with_apm/springcloud_pig-pinpoint.png" title="Spring Cloud Pig running effect" width="100%" />

- **Pinpoint Description**

  | Pinpoint version | 2.1.0                                                                                                                                                |
  | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
  | applicationName  | Default value component application name (note that Chinese name cannot be used)                                                                     |
  |                  | If you do not want to change the component name, you can modify the component environment variable ES_TRACE_APP_NAME to change the applicationName |
  | agentId          | Take the value POD variable HOSTNAME                                                                                                                 |

### common problem

  - **pinpoint-hbase**component keeps initializing or unhealthy

    > Try changing the storage of the **pinpoint-hbase**  component to local storage.If it still can't get up, it is recommended to replace the hard drive of 2008.

* Dependency has been added, and monitoring > link tracking is turned on. Why does the Pinpoint web page APP_LIST not have my application?

  > Please check if the components are updated.If the component is updated, please check whether the log has **pinpoint-agent**startup log.

* After a period of time,**pinpoint**suddenly cannot be accessed

  > Check the memory usage of the instance at**scaling** > and try to increase the memory, which is 1G by default.
* Why is my source build not integrating**pinpoint-agent**by default

  Please update builder image：

  ```shell
  #Pull the latest builder image
  docker pull registry.cn-hangzhou.aliyuncs.com/goodrain/builder:5.2.0
  #Re-tag and push to the default image warehouse
  docker tag registry.cn-hangzhou.aliyuncs.com/ goodrain/builder:5.2.0 goodrain.me/builder:latest
  docker push goodrain.me/builder:latest
  #Newly installed does not need to update the image.
  ```

