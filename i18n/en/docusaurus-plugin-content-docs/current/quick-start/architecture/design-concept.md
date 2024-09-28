---
title: Design Concept
description: The origin and philosophy of Rainbond design
---

## The Essence and Ultimate Effect of Cloud-Native

**Cloud computing fundamentally addresses the problem of automated resource management. However, the key to digitization and informatization lies in applications. Cloud computing does not solve the management problem of applications, and application management and operation are challenging and highly dependent on humans. The emergence of cloud-native is to address the management problem of applications.**\*\*

Application management is much more complex than resource management and involves application development, application architecture, application delivery, and application operation, among other application-level management aspects. It also needs to work in conjunction with solving the problem of automated resource management. The essence of cloud-native is to address the problem of automated application management.

![cloud-native](/img/architecture/cloud_to_native.svg)

In terms of its effect, the ultimate goal of cloud-native is to allow developers to focus on their business. They shouldn't have to worry about things outside of their business, such as infrastructure, application architecture, and application operations. They should just need to understand the business and be able to create the applications they want and deliver them on-demand to customers.

## The Application Abstraction Model is Key to Implementing Cloud-Native (Implementation Approach)

The challenge of implementing cloud-native lies in its use. If complex underlying technologies of cloud-native can be encapsulated into familiar application-level attributes and actions for developers, they won't need to learn new concepts and technologies. If business capabilities can be decoupled from operations, and from microservices frameworks, developers can extend operational capabilities and switch microservices frameworks as needed, enabling business empowerment on-demand. If customized delivery processes and automated delivery can be achieved based on different customer types, it can significantly reduce delivery costs and improve customer satisfaction.

When these three points are addressed, developers can focus on their business, and they don't need to worry about things outside of their business. They can focus more on delivering customer value.

**Based on these considerations, an application abstraction model is a solution. It wraps and abstracts the entire application, including all the runtime definitions needed for running the application. It isolates the application from the underlying technologies and concepts.** Upward-facing users don't need to learn and understand system-level concepts and technologies anymore. Internally, the application decouples business and extension capabilities, using application-level concepts for development and management. When there's a need to extend service governance, operations, security, and other capabilities, plugins can be activated as needed. Downward, it wraps Kubernetes concepts and abstractions, shielding the differences in underlying infrastructure, allowing the application abstraction model to run on various types of infrastructure.\*\*向上用户不需要再学习和了解系统级概念和技术，应用内部把业务和扩展能力解耦，使用应用级概念开发和管理，需要扩展服务治理、运维、安全等能力时按需开启插件。向下则包装Kubernetes的概念和抽象，屏蔽掉底层基础设施的差异，实现应用抽象模型可以运行在各类基础设施上。

![export\_template](/img/architecture/export_template.svg)

The core design of the application abstraction template includes three aspects:

1. Application-level Abstraction

2. 架构充分解耦

3. Delivery using Application Templates

### Application-level Abstraction Simplifies Understanding and Usage

Application-level abstraction is an "application-centric" abstraction model that exposes application-level concepts, attributes, and actions to users. System-level concepts and technologies, whether completely automated or packaged as application-level attributes and actions, are implemented. The essence is to provide a user-friendly operational experience for ordinary developers who do not need to learn and use system-level concepts.

为了实现灵活的应用编排和自动化调度，Kubernetes定义了很多概念，提供丰富的扩展机制，并以YAML的方式跟它交互，Kubernetes的这些可编程的体验，对管理和扩展Kubernetes的人来说，是非常好的特性，但对于普通开发者，门槛太高，并且很多概念和技术跟自己开发的业务并没有直接关系，所以对于普通开发者来说需要更加友好的操作体验，不需要学习就能使用。

Decoupling of Architecture

Coarse-grained correspondence between application-level abstraction and Kubernetes concepts:

| Application-level Property              | Kubernetes Concept |
| --------------------------------------- | ------------------ |
| Application Runtime Environment         | Containers         |
| Application Runtime Properties          | Workload           |
| Application Network Properties          | SDN                |
| Application Storage Properties          | SDS                |
| Application External Service Properties | Ingress            |
| Application Internal Service Properties | Service            |
| Application Plugins                     | Pod                |
| Application Configuration               | ConfigMap          |

Application-level abstraction is not about hiding all Kubernetes concepts but presenting different interaction interfaces for different users with different responsibilities. Ordinary developers are responsible for business development and only need to care about application-level concepts, providing an operational interface at that level.对普通开发者职责是开发业务，只需要关心应用级的概念，提供应用级的操作界面。

However, for cloud-native platform administrators, in addition to application-level concepts, they also need to be concerned with the management and maintenance of Kubernetes and, if capable, can extend the platform's capabilities. Therefore, for platform administrators, providing advanced interfaces that expose Kubernetes concepts or directly operating Kubernetes can manage applications on the platform. This approach also avoids the lack of observability and control over the platform due to the "black box" created by packaging concepts.

### 架构充分解耦，根据使用场景按需组合

Based on application-level abstraction, the application model decouples from underlying infrastructure using standard Kubernetes APIs. All infrastructure that conforms to the standard Kubernetes API can be integrated and deployed. This includes Kubernetes implementations from various cloud providers, K3s, KubeEdge, etc. By decoupling in this way, developers only need to focus on business and the extension of capabilities, without worrying about the differences in underlying infrastructure. Applications that integrate with the application model can be transparently deployed on public clouds, private clouds, and edge devices, achieving multi-cloud management at the application level.

**In an application, there may also be some functionality that is unrelated to the business but is essential for the application to run smoothly.** For example: service governance, microservices frameworks, operational tools, security tools, etc. These capabilities are tightly coupled with the application and require code extensions. By decoupling these capabilities, the application only needs to focus on business, and the extensibility has strong reusability for other applications.Self-sufficiency: They can be independently installed, upgraded, and managed, ensuring flexibility in combination.

The decoupling of extension capabilities in the application uses Kubernetes Pods. Pods contain one or more containers, and all containers share the same network and storage. The application runs in one container, and the extension capabilities run by extending containers. By sharing the same network and storage, the decoupling of the application and extension capabilities is achieved. This decoupling method is non-invasive to the business, and extension capabilities are packaged in the form of plugins. This allows applications to be installed and plugins to be started as needed, and several types of plugins can be defined based on network flow and container startup order:

| Plugin Type                   | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ingress Network Plugin        | 网络流量先到入口网络插件，然后到业务容器。Network traffic first goes to the Ingress Network Plugin, then to the business container. Examples: gateway, WAF, security tools, rate limiting         |
| Egress Network Plugin         | Network traffic first goes to the business container, then to the plugin container. Examples: load balancing, circuit breaker, encrypted access例如：负载均衡、断路器、加密访问              |
| Ingress-Egress Network Plugin | Network traffic first goes to the plugin container, then to the business container, and then back to the plugin container. Examples: Service Mesh proxy例如：Service Mesh proxy |
| Bypass Plugin                 | 网络上旁路运行。Runs on the network bypass. Examples: performance analysis, monitoring, call chain analysis, log management                                                          |
| Initialization Plugin         | Pod's Init container, starts before the Pod. Examples: database initialization例如：数据库初始化                                                                                      |

![app\_model\_en](/img/architecture/app_model_en.png)

Implementing plugins based on the Pod mechanism can only extend the capabilities of individual business containers. To extend the service governance capabilities of the entire application, plugins for each business container need to be extended. This is consistent with the implementation mechanism of Service Mesh.

Service Mesh's Data Plane needs to inject a Proxy for each business container, which extends the capabilities of the complete application. When the application is decoupled from the microservices framework, each business container is no longer restricted by the microservices framework and programming language, and each business container only needs to focus on its business, achieving decoupling between business containers.**当应用跟微服务架构解耦，每一个业务容器不再受微服务框架和开发语言限制，每个业务容器只需要专注业务本身，业务容器之间也同步实现了解耦。**

By fully decoupling architecture, the decoupled capabilities of business, plugins, and multi-cloud capabilities can be freely combined. Developers can choose their preferred programming language to develop business components, define dependencies based on business contracts, enable Service Mesh plugins, and other operational plugins as needed. The infrastructure environment is also automatically integrated based on actual needs.

### Application Templates as a Carrier for Reusable Capabilities and Application Delivery

The application model is embodied and stored in the form of application templates. Applications are assembled from source code, container images, and plugins, and then exported as application templates. Application templates are designed mainly around users, enabling users to use them and deliver applications that drive iteration and development.

\*\*从使用体验上，应用模版可以一键安装和一键升级，通过“拖拉拽”的方式实现业务拼装。\*\*应用模版有很强灵活性，应用模版支持不同颗粒度大小，模版和模版能拼装出新的模版，新的模版还可以持续拼装，颗粒的大小由使用者决定，由使用者赋予它意义。**From a user experience perspective, application templates can be installed and upgraded with a single click, achieved through "drag and drop" business assembly.** Application templates are highly flexible, supporting different granularities. Templates can be combined with other templates, and new templates can be continuously assembled. The granularity is determined by the user and given meaning by the user. Application templates can be delivered to branch versions that are compatible with the Kubernetes API, achieving one-click installation and upgrade or storing the application template in an application marketplace for instant use.

![app\_abstract\_model\_en](/img/architecture/app_abstract_model_en.svg)

Application templates need to have four characteristics:

1. 模块化，可以形成可复用的能力单元，按需拼装使用场景。

2. 自治，自给自足，可以独立安装、升级和管理，确保组合的灵活性。

3. Orchestratability: Templates and templates can be combined to create new templates, with infinite assembly capabilities.

4. Discoverability: Through internal and external services, they can be accessed by both business and technical personnel, developers, and other applications.

\*\*通过应用模版实现可复用模块和能力的打包。**Through application templates, modular capabilities and functions are packaged.** After full decoupling of the application, business components and extension plugins can theoretically be copied to other applications. However, directly copying code or images is inefficient, and many configuration details related to the runtime environment need to be considered. By packaging business components and extension plugins as application templates and publishing them in an application marketplace for others to use, maximum modularity and capability reuse are achieved, reducing redundant work.

Full Decoupling of Architecture and On-Demand Composition for Different Scenarios**Through application templates, automated delivery in SaaS, on-premises, and offline environments is achieved, along with personalized scenario module assembly.** Application templates contain all the resources needed for the application's runtime state. When the customer's environment is connected to the internet, it can be installed and run with one click, shielding the differences in customer environments. For offline environments, application templates can be exported as files and then imported and installed in the customer environment.

For scenarios that require personalized functionality, application templates can be used to package modular capabilities, then customized development can be performed. If the newly developed functionality is reusable, it can also be released as an application template for future reuse.

## Achieving the Cloud-Native Experience on Rainbond

基于以上的设计思路，让开发者专注于业务本身，回到用户效果和价值体现的原点上，不用关心底层复杂的技术和不相关的概念，全面实现应用自动化。Based on the above design principles, Rainbond allows developers to focus on their business, eliminating the need to understand complex underlying technologies and irrelevant concepts. Rainbond provides an out-of-the-box experience that is easy to use and does not require knowledge of containers and Kubernetes. It supports the management of various Kubernetes clusters and provides full lifecycle management for enterprise applications. Its main functions include application development environment, application marketplace, microservices architecture, application delivery, application operation and maintenance, and application-level multi-cloud management.主要功能包括应用开发环境、应用市场、微服务架构、应用交付、应用运维、应用级多云管理等。

Experience for Application Development:

1. **Code can become a cloud-native application without modification.** For new or existing businesses, the code can be containerized without modification. You don't need to understand Docker, Kubernetes, and other technologies to deploy applications. It provides all the features of a cloud-native application without needing to understand the underlying complexity.\*\*对于新业务或已有业务，代码不需要改动就能将其容器化。Modularity: They can form reusable capability units, assembled as needed for use cases.

2. \*\*业务积木式拼装编排。**Business block-style assembly orchestration.** Reusable business modules are accumulated in the application marketplace. When new business needs to be developed, it can be assembled based on the already existing business modules in the application marketplace, using a "drag-and-drop" approach. Then, develop any missing business capabilities. As more business modules accumulate, the speed of developing new business accelerates.

3. ![service\_mesh\_decoupling\_en](/img/architecture/service_mesh_decoupling_en.svg)**Out-of-the-box Service Mesh microservices architecture with the ability to switch Service Mesh frameworks with one click.** Without needing to learn the SDK of microservices frameworks, Service Mesh microservices architecture can be implemented in a non-invasive manner. Leading Service Mesh frameworks exist as plugins, which can be activated when needed. If one framework is deemed inadequate, it can be replaced at any time.

User Experience for Using Applications:

1. \*\*像安装手机App一样安装云原生应用。**Install cloud-native applications like installing mobile apps.** Cloud-native applications are stored in the form of application templates in the application marketplace. When integrating with various infrastructures or cloud resources, cloud-native applications can be installed instantly with one click or one-click installation/upgrade.

2. \*\*普通开发者不需要学习就能实现应用运维。**Ordinary developers can perform application operations without learning.** Through application-level abstraction, ordinary developers can understand application-level properties to perform application operations. They can also extend monitoring, performance analysis, logging, security, and other operational capabilities through plugins. Application operations no longer require specialized SREs.

3. \*\*复杂应用一键交付客户环境。**One-click delivery of complex applications to customer environments.** Complex applications can be published as application templates. When the customer's environment is connected to the internet, it can be integrated with the customer's environment and installed and run with one click. If the customer's environment cannot connect to the internet, export the offline application template, import it into the customer's environment, and install and run it with one click.
