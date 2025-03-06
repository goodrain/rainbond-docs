---
title: Design Concept
description: The origin and philosophy of Rainbond design
---

## The Essence and Ultimate Effect of Cloud-Native

**Cloud computing fundamentally addresses the problem of automated resource management. However, the key to digitization and informatization lies in applications. Cloud computing does not solve the management problem of applications, and application management and operation are challenging and highly dependent on humans. The emergence of cloud-native is to address the management problem of applications.**\*\*

Application management is much more complex than resource management and involves application development, application architecture, application delivery, and application operation, among other application-level management aspects. It also needs to work in conjunction with solving the problem of automated resource management. The essence of cloud-native is to address the problem of automated application management.

![cloud-native](https://static.goodrain.com/docs/5.8/docs/architecture/cloud-native.png)

In terms of its effect, the ultimate goal of cloud-native is to allow developers to focus on their business. They shouldn't have to worry about things outside of their business, such as infrastructure, application architecture, and application operations. They should just need to understand the business and be able to create the applications they want and deliver them on-demand to customers.

## The Application Abstraction Model is Key to Implementing Cloud-Native (Implementation Approach)

The challenge of implementing cloud-native lies in its use. If complex underlying technologies of cloud-native can be encapsulated into familiar application-level attributes and actions for developers, they won't need to learn new concepts and technologies. If business capabilities can be decoupled from operations, and from microservices frameworks, developers can extend operational capabilities and switch microservices frameworks as needed, enabling business empowerment on-demand. If customized delivery processes and automated delivery can be achieved based on different customer types, it can significantly reduce delivery costs and improve customer satisfaction.

When these three points are addressed, developers can focus on their business, and they don't need to worry about things outside of their business. They can focus more on delivering customer value.

**Based on these considerations, an application abstraction model is a solution. It wraps and abstracts the entire application, including all the runtime definitions needed for running the application. It isolates the application from the underlying technologies and concepts.** Upward-facing users don't need to learn and understand system-level concepts and technologies anymore. Internally, the application decouples business and extension capabilities, using application-level concepts for development and management. When there's a need to extend service governance, operations, security, and other capabilities, plugins can be activated as needed. Downward, it wraps Kubernetes concepts and abstractions, shielding the differences in underlying infrastructure, allowing the application abstraction model to run on various types of infrastructure.\*\* Upward users are no longer required to learn and understand system-level concepts and technologies, to apply internal coupling of business and extension capabilities, to develop and manage applications concept and to enable plugins when expanding service governance, operational maintenance, security, etc.Bottom down packaging Kubernetes concepts and abstracts, block differences in underlying infrastructure and make it possible to apply abstract models to all types of infrastructure.

![app-template](https://static.goodrain.com/docs/5.8/docs/architecture/app-template.png)

The core design of the application abstraction template includes three aspects:

1. Application-level Abstraction

2. Architecture fully disintegrates sex

3. Delivery using Application Templates

### Application-level Abstraction Simplifies Understanding and Usage

Application-level abstraction is an "application-centric" abstraction model that exposes application-level concepts, attributes, and actions to users. System-level concepts and technologies, whether completely automated or packaged as application-level attributes and actions, are implemented. The essence is to provide a user-friendly operational experience for ordinary developers who do not need to learn and use system-level concepts.

In order to achieve flexible programming and automation, Kubernetes defined a number of concepts, offered a rich extension mechanism and interacted with it in YAML, these programmable experiences of Kubernetes were very good features for those who manage and expand Kubernetes, but for ordinary developers, the threshold was too high and many concepts and technologies were not directly related to the business they developed, so that a more friendly experience was needed for ordinary developers without learning to use.

![app-template-1](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-1.png)

Coarse-grained correspondence between application-level abstraction and Kubernetes concepts:

| Application-level Property              | Kubernetes Concept |
| --------------------------------------- | ------------------ |
| Application Runtime Environment         | Containers         |
| Application Runtime Properties          | Workload           |
| Application Network Properties          | SDN                |
| Application Storage Properties          | SDS                |
| Application External Service Properties | Progress           |
| Application Internal Service Properties | Service            |
| Application Plugins                     | Pod                |
| Application Configuration               | ConfigMap          |

Application-level abstraction is not about hiding all Kubernetes concepts but presenting different interaction interfaces for different users with different responsibilities. Ordinary developers are responsible for business development and only need to care about application-level concepts, providing an operational interface at that level.The responsibility for the development of the common developer is a business that requires only attention to the application grade concept and the provision of an operational interface.

However, for cloud-native platform administrators, in addition to application-level concepts, they also need to be concerned with the management and maintenance of Kubernetes and, if capable, can extend the platform's capabilities. Therefore, for platform administrators, providing advanced interfaces that expose Kubernetes concepts or directly operating Kubernetes can manage applications on the platform. This approach also avoids the lack of observability and control over the platform due to the "black box" created by packaging concepts.

### Structures fully decouple and use scene combinations

Based on application-level abstraction, the application model decouples from underlying infrastructure using standard Kubernetes APIs. All infrastructure that conforms to the standard Kubernetes API can be integrated and deployed. This includes Kubernetes implementations from various cloud providers, K3s, KubeEdge, etc. By decoupling in this way, developers only need to focus on business and the extension of capabilities, without worrying about the differences in underlying infrastructure. Applications that integrate with the application model can be transparently deployed on public clouds, private clouds, and edge devices, achieving multi-cloud management at the application level.

**In an application, there may also be some functionality that is unrelated to the business but is essential for the application to run smoothly.** For example: service governance, microservices frameworks, operational tools, security tools, etc. These capabilities are tightly coupled with the application and require code extensions. By decoupling these capabilities, the application only needs to focus on business, and the extensibility has strong reusability for other applications.Self-sufficiency: They can be independently installed, upgraded, and managed, ensuring flexibility in combination.

The decoupling of extension capabilities in the application uses Kubernetes Pods. Pods contain one or more containers, and all containers share the same network and storage. The application runs in one container, and the extension capabilities run by extending containers. By sharing the same network and storage, the decoupling of the application and extension capabilities is achieved. This decoupling method is non-invasive to the business, and extension capabilities are packaged in the form of plugins. This allows applications to be installed and plugins to be started as needed, and several types of plugins can be defined based on network flow and container startup order:

| Plugin Type                   | Description                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ingress Network Plugin        | Network traffic goes to the entrance network plugin and then to the business container.Network traffic first goes to the Ingress Network Plugin, then to the business container. Examples: gateway, WAF, security tools, rate limiting |
| Egress Network Plugin         | Network traffic first goes to the business container, then to the plugin container. Examples: load balancing, circuit breaker, encrypted accesse.g.：load balance, circuit breaker, encrypted access                    |
| Ingress-Egress Network Plugin | Network traffic first goes to the plugin container, then to the business container, and then back to the plugin container. Examples: Service Mesh proxye.g.：Service Mesh proxy                                         |
| Bypass Plugin                 | Run by bypass road on the network.Runs on the network bypass. Examples: performance analysis, monitoring, call chain analysis, log management                                                                                          |
| Initialization Plugin         | Pod's Init container, starts before the Pod. Examples: database initializatione.g.：database initialization                                                                                                             |

![app-template-2](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-2.png)

Implementing plugins based on the Pod mechanism can only extend the capabilities of individual business containers. To extend the service governance capabilities of the entire application, plugins for each business container need to be extended. This is consistent with the implementation mechanism of Service Mesh.

Service Mesh's Data Plane needs to inject a Proxy for each business container, which extends the capabilities of the complete application. When the application is decoupled from the microservices framework, each business container is no longer restricted by the microservices framework and programming language, and each business container only needs to focus on its business, achieving decoupling between business containers.**When coupling the app with the microservice architecture, each business container is no longer restricted by the microservice framework and the development language. Each business container needs to focus exclusively on the business itself and synchronize the business containers to understand it.**

By fully decoupling architecture, the decoupled capabilities of business, plugins, and multi-cloud capabilities can be freely combined. Developers can choose their preferred programming language to develop business components, define dependencies based on business contracts, enable Service Mesh plugins, and other operational plugins as needed. The infrastructure environment is also automatically integrated based on actual needs.

### Application Templates as a Carrier for Reusable Capabilities and Application Delivery

The application model is embodied and stored in the form of application templates. Applications are assembled from source code, container images, and plugins, and then exported as application templates. Application templates are designed mainly around users, enabling users to use them and deliver applications that drive iteration and development.

\*\*From using experience, app templates can install and upgrade by one click and by dragging down the business.\*\*Application templates are flexible enough to support different particle sizes, templates and templates can amortize new templates, new templates can be continuously patched, particle size is determined by the user and meaningful by the user.**From a user experience perspective, application templates can be installed and upgraded with a single click, achieved through "drag and drop" business assembly.** Application templates are highly flexible, supporting different granularities. Templates can be combined with other templates, and new templates can be continuously assembled. The granularity is determined by the user and given meaning by the user. Application templates can be delivered to branch versions that are compatible with the Kubernetes API, achieving one-click installation and upgrade or storing the application template in an application marketplace for instant use.

![app-template-3](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-3.png)

Application templates need to have four characteristics:

1. Modular to form reusable capability units that use scenes as required.

2. Self-government, self-sufficiency, can be installed, upgraded and managed independently, ensuring flexibility in combinations.

3. Orchestratability: Templates and templates can be combined to create new templates, with infinite assembly capabilities.

4. Discoverability: Through internal and external services, they can be accessed by both business and technical personnel, developers, and other applications.

\*\*Reusable modules and capabilities are implemented through application templates.**Through application templates, modular capabilities and functions are packaged.** After full decoupling of the application, business components and extension plugins can theoretically be copied to other applications. However, directly copying code or images is inefficient, and many configuration details related to the runtime environment need to be considered. By packaging business components and extension plugins as application templates and publishing them in an application marketplace for others to use, maximum modularity and capability reuse are achieved, reducing redundant work.

Full Decoupling of Architecture and On-Demand Composition for Different Scenarios**Through application templates, automated delivery in SaaS, on-premises, and offline environments is achieved, along with personalized scenario module assembly.** Application templates contain all the resources needed for the application's runtime state. When the customer's environment is connected to the internet, it can be installed and run with one click, shielding the differences in customer environments. For offline environments, application templates can be exported as files and then imported and installed in the customer environment.

For scenarios that require personalized functionality, application templates can be used to package modular capabilities, then customized development can be performed. If the newly developed functionality is reusable, it can also be released as an application template for future reuse.

## Achieving the Cloud-Native Experience on Rainbond

Based on the design thinking above, the developers are allowed to focus on the business itself and return to the point of origin of user effectiveness and value, without concern for the complex techniques and unrelated concepts at the bottom and fully automate the application.Based on the above design principles, Rainbond allows developers to focus on their business, eliminating the need to understand complex underlying technologies and irrelevant concepts. Rainbond provides an out-of-the-box experience that is easy to use and does not require knowledge of containers and Kubernetes. It supports the management of various Kubernetes clusters and provides full lifecycle management for enterprise applications. Its main functions include application development environment, application marketplace, microservices architecture, application delivery, application operation and maintenance, and application-level multi-cloud management.The main functions include the application development environment, the application market, the micro-service architecture, the application delivery, the application workload, and the application of cloud management.

Experience for Application Development:

1. **Code can become a cloud-native application without modification.** For new or existing businesses, the code can be containerized without modification. You don't need to understand Docker, Kubernetes, and other technologies to deploy applications. It provides all the features of a cloud-native application without needing to understand the underlying complexity.\*\*For new or existing business, the code does not need to be changed to make it container.Modularity: They can form reusable capability units, assembled as needed for use cases.

2. \*\*Business Brick Spelling.**Business block-style assembly orchestration.** Reusable business modules are accumulated in the application marketplace. When new business needs to be developed, it can be assembled based on the already existing business modules in the application marketplace, using a "drag-and-drop" approach. Then, develop any missing business capabilities. As more business modules accumulate, the speed of developing new business accelerates.

3. ![service_mesh_decoupling_en](/img/architecture/service_mesh_decoupling_en.svg)**Out-of-the-box Service Mesh microservices architecture with the ability to switch Service Mesh frameworks with one click.** Without needing to learn the SDK of microservices frameworks, Service Mesh microservices architecture can be implemented in a non-invasive manner. Leading Service Mesh frameworks exist as plugins, which can be activated when needed. If one framework is deemed inadequate, it can be replaced at any time.

User Experience for Using Applications:

1. \*\*Install cloud native apps like mobile apps.**Install cloud-native applications like installing mobile apps.** Cloud-native applications are stored in the form of application templates in the application marketplace. When integrating with various infrastructures or cloud resources, cloud-native applications can be installed instantly with one click or one-click installation/upgrade.

2. \*\*Generic developers will be able to perform app delivery without learning to learn.**Ordinary developers can perform application operations without learning.** Through application-level abstraction, ordinary developers can understand application-level properties to perform application operations. They can also extend monitoring, performance analysis, logging, security, and other operational capabilities through plugins. Application operations no longer require specialized SREs.

3. \*\*Complex apps delivering customer environment.**One-click delivery of complex applications to customer environments.** Complex applications can be published as application templates. When the customer's environment is connected to the internet, it can be integrated with the customer's environment and installed and run with one click. If the customer's environment cannot connect to the internet, export the offline application template, import it into the customer's environment, and install and run it with one click.
