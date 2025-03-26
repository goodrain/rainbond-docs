---
title: What is Rainbond?
description: Rainbond is a cloud-native application management platform that is easy to use, does not require knowledge of containers, Kubernetes, or underlying complex technologies, supports the management of multiple Kubernetes clusters, and manages the entire lifecycle of enterprise applications.
slug: /
---

<!-- ## Rainbond是什么？ -->

`Rainbond` is a cloud-native application management platform that is easy to use, does not require knowledge of containers, Kubernetes, or underlying complex technologies, supports the management of multiple Kubernetes clusters, and manages the entire lifecycle of enterprise applications.Main features include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, and application-level multi-cloud management.

## Why choose Rainbond?

### 1.Easy to use

`Rainbond` follows the **application-centric** design philosophy, uniformly encapsulating container, Kubernetes, and underlying infrastructure-related technologies, allowing users to focus on the business itself, avoiding spending a lot of learning and management effort on non-business technologies.At the same time, Rainbond deeply integrates application development, microservice architecture, application delivery, application operation and maintenance, and resource management, with highly automated management, achieving unified management of all applications, all infrastructure, and all IT processes.

### 2.Turn traditional applications into cloud-native applications in one step

Rainbond uses "non-invasive" technology to quickly turn traditional applications into cloud-native applications without or with minimal changes.
Ways to convert traditional applications into cloud-native applications:

- For applications with source code and software packages, the platform automatically identifies the development language type and package type, does not change developer habits, and directly compiles and builds the code into applications that support cloud-native features.
- For traditional applications that want to implement a microservice architecture, Rainbond provides a Service Mesh microservice architecture, allowing applications to become microservice architectures without changing code.
- Traditional applications that want to expand operation and maintenance and governance functions, Rainbond provides "non-invasive" plugins, loading plugins on demand, enabling operation and maintenance and service governance capabilities.

### 3.Achieve digital capability accumulation and reuse

Rainbond can publish various digital capabilities within the enterprise into components with one click, and has complete management processes such as component installation and use, component orchestration, component version management, component upgrade and continuous iteration, accumulating reusable capabilities within the enterprise into the component library, avoiding duplicate construction, and turning these components into digital assets, providing power for enterprise innovation.

### 4.Solve the delivery problems of the 2B industry and automate various delivery processes

Rainbond provides capabilities such as business integration, multi-cloud delivery, private delivery, SaaS delivery, offline delivery, personalized delivery, and application market for enterprise applications, automating the delivery process to the greatest extent, improving the efficiency of enterprise application delivery, and reducing delivery costs.

## Rainbond's functions and architecture

![](https://static.goodrain.com/case/2022/03/17/16474283190784.jpg)

### Application-level multi-cloud management

Application-level emphasizes being "application"-centric, exposing technical concepts related to applications externally, uniformly packaging technical concepts not directly related to applications, and automating underlying infrastructure through software-defined series technologies (SDN, SDS, SD-WAN, docker, LB), supporting application development, architecture, delivery, and operation and maintenance on top of application abstraction. This level of abstraction can simplify application management and meet business flexibility.

The core of multi-cloud management is to decouple applications and computing resources, allowing any combination according to scenarios, enabling hybrid cloud, edge cloud, and application-level multi-cloud. The lifecycle management of applications is not directly related to computing resources, meaning that application development can be done on any type of computing resource, developed applications can be directly installed and run on any type of computing resource, and can be migrated from one cloud to another at any time without any changes to the application.

### Application full lifecycle management

Application full lifecycle management includes application development, microservice architecture, application delivery, and application operation and maintenance.

- In the development phase, Rainbond provides out-of-the-box development and testing environments, connects to various source code repositories, automatically identifies development languages, compiles, builds, and packages, and installs various development tools through the application market.
- In the architecture phase, it supports various common microservice architectures, business services can be modularly orchestrated, the structure and dependencies of the business can be visually understood through service topology, and various service governance capabilities can be extended through plugins.
- In the delivery phase, it supports the continuous delivery process of applications, developed applications are stored in the application market in the form of application templates, applications are displayed and categorized through the application market, for connected users, remotely connect to the application market, one-click installation and upgrade.For offline users, export offline application packages from the application market, import offline application packages into the user environment, one-click installation and run.
- In the operation and maintenance phase, all application operation and maintenance work is presented through the web interface, in addition to basic application management (start, stop, restart, delete) operations, the main operation and maintenance processes are automated, providing observability to deeply understand the execution process of automation.Facing big data and large user application scenarios, it supports rapid scaling of business, timely responding to business changes.

### Capability reuse and sharing

Components are independent, reusable, extensible, and integrable units, supporting different granularity sizes, supporting version management, components can be reused in different application scenarios, components themselves can be iteratively upgraded, accumulated components are uniformly stored in the component library, when an application needs to use a component, it can be quickly assembled by "drag and drop", the more components accumulated, the faster the delivery speed of applications.

## How does Rainbond work?

![](https://static.goodrain.com/case/2022/03/17/16474282867950.jpg)

Rainbond mainly consists of two parts, one is the Rainbond console that provides a web interface, and the other is the Rainbond cluster management end installed inside the K8s cluster.

The Rainbond console provides control plane monitoring and management, mainly serving developers and administrators, the console manages the K8s cluster and applications running on the K8s cluster through the API provided by the Rainbond cluster management end, and stores metadata locally, the console shutdown does not affect the operation of the K8s cluster and business services.One console can monitor and manage multiple K8s clusters.

The Rainbond cluster management end is installed into one or more K8s clusters through the console or Helm, it connects to the standard K8s API, the monitoring and management instructions of the console are implemented by calling the K8s API, applications deployed through the console can also be viewed and managed using K8s commands.
