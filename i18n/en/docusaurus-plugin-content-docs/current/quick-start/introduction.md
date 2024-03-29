---
title: What is Rainbond?
description: Rainbond is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and the underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the entire lifecycle of enterprise applications.
slug: /
---

<!-- ## Rainbond是什么？ -->

`Rainbond` is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the full life cycle of enterprise applications.The main functions include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, application-level multi-cloud management, etc.

## Why Choose Rainbond?

### 1. Simplicity in Usage

Rainbond follows a **"Application-Centric"** design philosophy, unifying container, Kubernetes, and underlying infrastructure-related technologies. This allows users to focus on their business without the need to invest significant time and effort in learning and managing technologies outside of their business domain. Rainbond deeply integrates application development, microservices architecture, application delivery, application operation, and resource management, achieving unified management of all applications, infrastructure, and IT processes.

### 2. Transform Traditional Applications into Cloud-Native with Ease

Rainbond employs "Non-Invasive" technology to enable traditional applications to become cloud-native with minimal or no code changes. The transformation of traditional applications into cloud-native applications can be achieved in the following ways:

- For applications with source code and software packages, Rainbond automatically recognizes the programming language and package type, allowing code to be compiled and built into cloud-native applications without altering developers' habits.

- Rainbond provides a Service Mesh microservices architecture for traditional applications seeking to adopt a microservices architecture. This transformation does not require any code changes.

- To enhance operational and governance capabilities for traditional applications, Rainbond offers "Non-Invasive" plugins that can be loaded on-demand, enabling operational and governance capabilities as needed.

### 3. Accumulation and Reuse of Digital Capabilities

Rainbond allows various internal digital capabilities within an enterprise to be published as components with a single click. It offers comprehensive management processes, including component installation and usage, component orchestration, component version management, component upgrades, and continuous iteration. This enables enterprises to accumulate reusable capabilities in a component library, avoiding redundant development and transforming these components into digital assets that drive innovation within the enterprise.

### 4. Automated Delivery of Solutions for B2B Industries

Rainbond provides capabilities for business integration, multi-cloud delivery, private delivery, SaaS delivery, offline delivery, personalized delivery, and application marketplace. It maximizes the automation of the delivery process, improving the efficiency of enterprise application delivery and reducing delivery costs.

## Rainbond's Features and Architecture

![Rainbond Architecture](/img/architecture/arch_en.png)

For more detailed information about the Rainbond architecture, please refer to the Rainbond Design Concept.

### Application-Level Multi-Cloud Management

Rainbond emphasizes being "Application-Centric" by exposing technology concepts related to applications while unifying concepts not directly related to applications. Underlying infrastructure is abstracted using software-defined technologies (SDN, SDS, SD-WAN, Docker, LB). This automation streamlines repetitive tasks at the infrastructure level while supporting application development, architecture, delivery, and operation on top of the application abstraction. This level of abstraction simplifies application management while ensuring business flexibility.

The core of multi-cloud management is the decoupling of applications and compute resources, enabling arbitrary combinations based on scenarios. This can achieve hybrid cloud, edge cloud, and application-level multi-cloud capabilities. Application lifecycle management is decoupled from compute resources. In other words, application development can take place on any type of compute resource, and applications can be deployed and run on any type of compute resource without modification. Migration between different cloud providers can also be done seamlessly without changes to the application.

### Application Full Lifecycle Management

Application full lifecycle management includes application development, microservices architecture, application delivery, and application operation:

- During the development stage, Rainbond provides an out-of-the-box development and testing environment. It integrates with various source code repositories, automatically identifies programming languages, compiles, builds, and packages applications. Various development tools can be installed through the application marketplace.

- In the architecture phase, Rainbond supports various common microservices architectures. Business services can be modularly orchestrated, and the service topology visualization helps understand the structure and dependencies of the business. Various service governance capabilities can be extended through plugins.

- During the delivery phase, Rainbond supports continuous delivery processes. Developed applications are stored in the form of application templates in the application marketplace. For connected users, remote access to the application marketplace allows one-click installation and upgrades. For offline users, applications can be exported from the application marketplace, imported into the user environment, and installed and run with a single click.

- In the operation phase, all application operations are presented through a web interface. Besides basic application management operations (start, stop, restart, delete), most of the operational processes are automated. It provides observability to deeply understand the automated execution process. In scenarios with big data and a large number of users, it supports rapid scaling of business and timely responses to business changes.

### Capability Reuse and Sharing

Components are independent, reusable, extensible, and integrable units. They support different granularity sizes and version management. Components can be reused in different application scenarios, and they can be iteratively upgraded. Accumulated components are stored in a unified component library. When an application needs to use components, they can be quickly assembled using a "drag and drop" approach. As more components accumulate, the speed of delivering applications accelerates.

## How Does Rainbond Work?

![How Rainbond Works](/img/architecture/rainbond_work_en.svg)

Rainbond consists mainly of two parts: the Rainbond Control Console, which provides a web interface, and the Rainbond Cluster Management End, which is installed within Kubernetes (K8s) clusters.

The Rainbond Control Console offers monitoring and management of the control plane. It mainly serves developers and administrators. The console manages K8s clusters and applications running on those clusters through the API provided by the Rainbond Cluster Management End. Metadata is stored locally, and the console's operation does not affect the operation of K8s clusters and business services. One console can monitor and manage multiple K8s clusters.

The Rainbond Cluster Management End is installed within one or more K8s clusters either through the console or via Helm. It interfaces with the standard K8s API. The console's monitoring and management commands are implemented by invoking the K8s API. Applications deployed through the console can also be viewed and managed using K8s commands.

## Rainbond compared to other products

|                       | Contrast                                                                                                                      | Rainbond                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| vs IaaS               | Manage infrastructure                                                                                                         | Manage applications                                                                                                                            |
| vs MSP                | Multi-cloud management based on "virtual machine", the main value is unified management of resources, cost optimization, etc. | Multi-cloud management based on "application", the main value is that applications can be transparently run and migrated to any cloud platform |
| vs kubernetes         | Container running and scheduling environment                                                                                  | Application life cycle management, running on K8s, and managing any K8s cluster through API docking                                            |
| vs container platform | Container-level abstraction, you need to understand containers and K8s                                                        | Application-level abstraction, no need to understand the underlying technology                                                                 |
