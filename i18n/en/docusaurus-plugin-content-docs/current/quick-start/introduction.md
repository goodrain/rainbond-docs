---
title: What is Rainbond?
description: Rainbond is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and the underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the entire lifecycle of enterprise applications.
slug: /
---

<!-- ## Rainbond是什么？ -->

`Rainbond` is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the full life cycle of enterprise applications.The main functions include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, application-level multi-cloud management, etc.


## Why choose Rainbond?

### 1. Simple to use

`Rainbond` follows the **application** centric design concept, and unifies the packaging of containers, Kubernetes, and underlying infrastructure-related technologies, allowing users to focus on the business itself and avoid spending a lot of learning and management effort on technologies other than business.At the same time, Rainbond deeply integrates application development, microservice architecture, application delivery, application operation and maintenance, resource management, and highly automated management to achieve unified management of all applications, all infrastructure and all IT processes.

### 2. Turn traditional applications into cloud-native applications in one step

Through "non-invasive" technology, Rainbond enables traditional applications to quickly become cloud-native applications with little or no changes. ：to transform traditional applications into cloud-native applications0

* For applications with source code and software packages, the platform automatically identifies the development language type and package type, without changing the developer's habits, the code is directly compiled and built into applications that support cloud-native features.
* For traditional applications that want to implement a microservice architecture, Rainbond provides a Service Mesh microservice architecture, and the application can become a microservice architecture without changing the code.
* For traditional applications that want to expand their O&M and governance functions, Rainbond provides "non-intrusive" plug-ins, which can be loaded on demand to enable O&M and service governance capabilities.

### 3. Realize the accumulation and reuse of digital capabilities

Rainbond can release various digital capabilities within the enterprise into components with one click, and has complete management processes such as component installation and use, component arrangement, component version management, component upgrade and continuous iteration, and accumulates the reusable capabilities within the enterprise into components. Libraries not only avoid duplication of construction, but also turn these components into digital assets to power enterprise innovation.

### 4. Solve the delivery problems of the 2B industry and realize the automation of various delivery processes

Rainbond provides business integration, multi-cloud delivery, private delivery, SaaS delivery, offline delivery, personalized delivery, and application marketplace capabilities for enterprise applications. It automates the delivery process to the maximum extent, improves enterprise application delivery efficiency, and reduces delivery costs.


## Rainbond's function and architecture
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/03/17/16474283190784.jpg)


### Application-level multi-cloud management
The application level emphasizes the "application" as the center, exposes the technical concepts related to the application, and packages the technical concepts not directly related to the application. The underlying infrastructure is defined by a series of technologies (SDN, SDS, SD-WAN, docker, LB). ) packaging, automates the underlying repetitive work, and supports application development, architecture, delivery, and operation and maintenance on top of application abstraction. This abstract granularity can simplify application management and meet business flexibility.

The core of multi-cloud management is to decouple applications and computing resources. According to any combination of scenarios, hybrid clouds, edge clouds, and application-level multi-clouds can be realized. Application lifecycle management is not directly related to computing resources. On any type of computing resources, developed applications can be directly installed and run on any type of computing resources, and can be migrated from one cloud to another at any time without any changes to the application.

### Application lifecycle management
Application lifecycle management includes application development, microservice architecture, application delivery, and application operation and maintenance.
* During the development phase, Rainbond provides an out-of-the-box development and testing environment, connects to various source code repositories, automatically identifies development languages, compiles, builds, and packages, and installs various development tools through the application market.
* In the architecture stage, various common microservice architectures are supported, business services can be arranged in modules, the business structure and dependencies can be understood through service topology visualization, and various service governance capabilities can be extended through plug-ins.
* In the delivery stage, the continuous application delivery process is supported. The developed applications are stored in the application market in the form of application templates, and the applications are displayed and classified through the application market. For networked users, remote connection to the application market enables one-click installation and upgrade.For offline users, export the offline application package from the application market, import the offline application package into the user environment, and install and run it with one click.
* In the operation and maintenance phase, all application operation and maintenance work is presented through the web interface. Except for the basic application management (start, close, restart, delete) operations, the main operation and maintenance processes are automated, providing observability and in-depth understanding of automation. Implementation process.Facing the application scenarios of big data and large users, it supports the rapid expansion of business and responds to business changes in a timely manner.

### Capability reuse and sharing

Components are independent, reusable, extensible, and integratable units that support different granularity and version management. Components can be reused in different application scenarios. Components themselves can be iteratively upgraded. The accumulated components are stored in the components. Libraries, when there are applications that need to use components, they only need to be quickly assembled by "drag and drop". The more components accumulated, the faster the delivery of applications.


## How does Rainbond work?

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/03/17/16474282867950.jpg)

Rainbond mainly consists of two parts, one is the Rainbond console that provides a web interface, and the other is the Rainbond cluster management terminal installed inside the K8s cluster.

The Rainbond console provides monitoring and management of the control plane, mainly serving developers and managers. The console manages the K8s cluster and applications running on the K8s cluster through the API provided by the Rainbond cluster management terminal, and stores metadata locally. The shutdown of the console does not affect the operation of the K8s cluster and business services.One console can monitor and manage multiple K8s clusters.

The Rainbond cluster management terminal is installed into one or more K8s clusters through the console or Helm, which connects to the standard K8s API. The monitoring and management instructions of the console are implemented by calling the K8s API. Applications deployed through the console can also use K8s command viewing and management.


## Rainbond compared to other products


|                       | Contrast                                                                                                                      | Rainbond                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| vs IaaS               | Manage infrastructure                                                                                                         | Manage applications                                                                                                                            |
| vs MSP                | Multi-cloud management based on "virtual machine", the main value is unified management of resources, cost optimization, etc. | Multi-cloud management based on "application", the main value is that applications can be transparently run and migrated to any cloud platform |
| vs kubernetes         | Container running and scheduling environment                                                                                  | Application life cycle management, running on K8s, and managing any K8s cluster through API docking                                            |
| vs container platform | Container-level abstraction, you need to understand containers and K8s                                                        | Application-level abstraction, no need to understand the underlying technology                                                                 |




