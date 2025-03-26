---
title: Design Philosophy
description: The origin and concept of Rainbond design
---

## The essence and ultimate effect of cloud native

**Cloud computing essentially solves the problem of automated resource management, but the key to digitalization and informatization lies in applications. Cloud computing does not solve the problem of application management. Application management and operation and maintenance are difficult problems, with a high degree of dependence on people. The emergence of cloud native is to solve the problem of application management.**

Application management is much more complex than resource management, involving management at the application level such as application development, application architecture, application delivery, and application operation and maintenance, as well as solving the problem of automated resource management in coordination with the application. The essence of cloud native is to solve the problem of automated application management.

![cloud-native](https://static.goodrain.com/docs/5.8/docs/architecture/cloud-native.png)

From the effect point of view, the ultimate goal of cloud native is to allow developers to focus on their own business, without having to worry about things outside the business (infrastructure, application architecture, application operation and maintenance), and only need to understand the business to create the applications they want, and deliver them to customers on demand.

## The application abstraction model is the key to the implementation of cloud native (implementation ideas)

The difficulty in implementing cloud native lies in its use. If the complex underlying technologies of cloud native can be packaged into application-level attributes and actions familiar to developers, developers will not need to learn new concepts and technologies; if business can be decoupled from operation and maintenance capabilities, and from microservice frameworks, developers can expand operation and maintenance capabilities and switch microservice frameworks on demand, achieving on-demand empowerment for business; if different customer types can be customized for delivery processes and automated delivery, delivery costs can be greatly reduced, and customer satisfaction can be improved.

When the above three points can be solved, developers can focus on the business itself, without having to worry about things outside the business, and have more energy to focus on customer value output.

\*\*Based on the above thinking, the application abstraction model is a solution idea, packaging and abstracting the application as a whole, including all operational definitions required for the application to run, isolated from underlying technologies and concepts.\*\*Upward users no longer need to learn and understand system-level concepts and technologies. Inside the application, business and extension capabilities are decoupled, using application-level concepts for development and management. When it is necessary to extend service governance, operation and maintenance, security and other capabilities, plugins can be enabled on demand.Downward, it packages the concepts and abstractions of Kubernetes, shielding the differences in underlying infrastructure, so that the application abstraction model can run on various infrastructures.

![app-template](https://static.goodrain.com/docs/5.8/docs/architecture/app-template.png)

The core design of the application abstraction template lies in three aspects:

1. Application-level abstraction

2. Fully decoupled architecture

3. Delivery using application templates

### Application-level abstraction can simplify understanding and use

Application-level abstraction is an "application-centric" abstraction model, exposing application-level concepts, attributes, and actions to users. Underlying Kubernetes and system-level concepts and technologies are either fully automated or packaged into application-level attributes and actions.

To achieve flexible application orchestration and automated scheduling, Kubernetes defines many concepts, provides rich extension mechanisms, and interacts with it in YAML. These programmable experiences of Kubernetes are very good features for those who manage and extend Kubernetes, but for ordinary developers, the threshold is too high, and many concepts and technologies are not directly related to the business they develop, so ordinary developers need a more friendly operation experience, which can be used without learning.

![app-template-1](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-1.png)

The coarse-grained correspondence between application-level abstraction and Kubernetes concepts:

| Application-level attributes            | Kubernetes concepts |
| --------------------------------------- | ------------------- |
| Application runtime environment         | Containers          |
| Application runtime attributes          | Workload            |
| Application network attributes          | SDN                 |
| Application storage attributes          | SDS                 |
| Application external service attributes | Ingress             |
| Application internal service attributes | Service             |
| Application plugins                     | Pod                 |
| Application configuration               | ConfigMap           |

Application-level abstraction does not mean to hide all Kubernetes concepts, but for different users, different responsibilities show different interaction interfaces.For ordinary developers, the responsibility is to develop business, only need to care about application-level concepts, and provide application-level operation interfaces.

But for cloud native platform managers, in addition to caring about application-level concepts, they also need to care about the management and maintenance of Kubernetes, and if they have the ability, they can also extend the capabilities of the platform. Therefore, for platform managers, advanced operation interfaces that expose Kubernetes concepts are provided, or directly operating Kubernetes can also manage applications on the platform. In this way, it also avoids the insufficient observability and controllability of the platform due to the "black box" generated by packaging concepts.

### Fully decoupled architecture, combined on demand according to usage scenarios

Based on application-level abstraction, the application model achieves decoupling from infrastructure through standard Kubernetes APIs. All infrastructures that comply with standard Kubernetes APIs can be connected and deployed, such as Kubernetes implementations by various public cloud vendors, K3s, KubeEdge, etc. Through such decoupling, developers only need to care about business and capability expansion, without worrying about the differences in infrastructure. Applications connected to the application model can be transparently deployed to public clouds, private clouds, and edge devices without modification, achieving application-level multi-cloud.

\*\*Usually in applications, there are also some functions unrelated to business, whose role is to make the application run better.\*\*For example: service governance, microservice frameworks, operation and maintenance tools, security tools, etc. These capabilities are strongly coupled with the application, requiring code changes to extend capabilities. Decoupling these capabilities allows the application to focus only on the business, and the extended capabilities have strong reusability, which other applications also need.

The decoupling of extended capabilities in applications uses Kubernetes' Pod. A Pod contains one or more containers, all containers share network and storage, the application runs in one container, and extended capabilities run by extending containers. Through shared network and storage, the decoupling of applications and extended capabilities is achieved. This decoupling method is completely non-invasive to the business. Extended capabilities are packaged in the form of plugins, so that applications can install and start plugins on demand. According to the network flow direction and container startup sequence, several types of plugins can be defined:

| Plugin type                         | illustrate                                                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry network plugin                | Network traffic first goes to the entry network plugin, then to the business container.For example: gateway, WAF, security tools, current limiting        |
| Exit network plugin                 | Network traffic first goes to the business container, then to the plugin container.For example: load balancing, circuit breaker, encrypted access         |
| Inbound and outbound network plugin | Network traffic first goes to the plugin container, then to the business container, and then back to the plugin container.For example: Service Mesh proxy |
| Bypass plugin                       | Runs bypass on the network.For example: performance analysis, monitoring, call chain analysis, log management                                             |
| Initialization plugin               | Pod's Init container, Pod starts by starting the Init container first.For example: database initialization                                                |

![app-template-2](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-2.png)

Plugins implemented according to the Pod mechanism can only extend the capabilities of a single business container. To extend the microservice architecture capabilities for an application, it is necessary to extend service governance plugins for each business container, which is consistent with the implementation mechanism of Service Mesh.

The Data Plane of Service Mesh needs to inject a Proxy into each business container. For a complete application, it is to extend the Service Mesh capability. The capability extended for the complete application is an application-level plugin. According to the differences in the injected Proxy, it can support various types of Service Mesh implementations, such as: Istio, Linkerd, Dapr. The application can turn on the Service Mesh capability on demand, or change the implementation framework.**When the application is decoupled from the microservice architecture, each business container is no longer limited by the microservice framework and development language. Each business container only needs to focus on the business itself, and the business containers also achieve decoupling synchronously.**

By fully decoupling the architecture, the decoupled business, plugins, and the ability to connect to multi-cloud can be combined at will. Developers choose their favorite development language to develop business components, arrange dependencies according to business contracts, and turn on Service Mesh plugins and other operation and maintenance plugins on demand according to service governance and operational stability requirements. The operating infrastructure environment is also automatically connected according to actual needs.

### Application template becomes the carrier of capability reuse and application delivery

The application model is concretely displayed and stored in the form of an application template. The application is assembled from source code, container images, and plugins, and then exported as an application template with one click. The design of the application template mainly revolves around the user, allowing the user to use it, deliver the application and produce value, thereby driving the iteration and development of the application.

\*\*From the user experience, the application template can be installed and upgraded with one click, and business assembly can be achieved through "drag and drop".\*\*The application template has great flexibility. The application template supports different granularity sizes. Templates and templates can be assembled into new templates, and new templates can continue to be assembled. The size of the granularity is determined by the user and given meaning by the user.The application template can be delivered to a branch version compatible with the Kubernetes API, realizing one-click installation and upgrade, or the application template can be stored in the application market to achieve the effect of point-and-use.

![app-template-3](https://static.goodrain.com/docs/5.8/docs/architecture/app-template-3.png)

The application template needs to have four characteristics:

1. Modular, can form reusable capability units, and assemble usage scenarios on demand.

2. Autonomous, self-sufficient, can be installed, upgraded and managed independently, ensuring the flexibility of combination.

3. Orchestrable, templates and templates can be assembled into new templates, with unlimited assembly capabilities.

4. Discoverable, reflected through internal services and external services, accessible to business and technology, developers and other applications.

\*\*Packaging reusable modules and capabilities through application templates.\*\*After the application architecture is fully decoupled, business components and extension plugins can theoretically be copied to other applications, but directly copying code or images is very inefficient, and there are many runtime environment-related configurations to consider. Packaging business components and extension plugins into application templates and publishing the application templates to the application market for others to use can maximize the reuse of modules and capabilities and reduce reinventing the wheel.

\*\*Through application templates, automated delivery of SaaS, privatization and offline environments, and personalized scenario module assembly are achieved.\*\*The application template contains all the resources required for the application runtime. By connecting to the customer's runtime environment, one-click installation and operation can be achieved, shielding the differences in customer environments. A set of product templates can be delivered to all types of customers. For offline environments, the application template is exported in the form of a file and then imported into the customer's offline environment to run.

For scenarios where functions need to be personalized, use the ability of application templates to package business templates, first assemble modularized capabilities, and then customize development. Newly developed functions, if reusable, can continue to be published as application templates for subsequent reuse.

## Achieving a cloud-native experience on Rainbond

Based on the above design ideas, developers can focus on the business itself, return to the origin of user effect and value embodiment, without having to care about the underlying complex technology and unrelated concepts, and fully realize application automation.Rainbond provides an out-of-the-box experience, is simple to use, does not require knowledge of containers and Kubernetes, supports the management of multiple Kubernetes clusters, and provides enterprise-level application lifecycle management.Main functions include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, application-level multi-cloud management, etc.

Experience of developing applications:

1. \*\*The code does not need to be modified to become a cloud-native application.\*\*For new or existing businesses, the code does not need to be modified to containerize it.Without understanding Docker, Kubernetes and other technologies, the application can be deployed and have all the characteristics of a cloud-native application.

2. \*\*Business building block assembly and orchestration.\*\*Reusable business modules are accumulated in the application market. When new businesses need to be developed, based on the existing business modules in the application market, they are assembled by "drag and drop", and then the non-existent business capabilities are developed. The more business modules are accumulated, the faster the development of new businesses.

3. \*\*Out-of-the-box Service Mesh microservice architecture, and the Service Mesh framework can be changed with one click.\*\*Without learning the SDK of the microservice framework, the Service Mesh microservice architecture is implemented in a non-invasive way. The mainstream Service Mesh framework exists in the form of plugins, which can be turned on when needed, and can be replaced at any time if it is not good.

Experience of using applications:

1. \*\*Install cloud-native applications like installing mobile apps.\*\*Cloud-native applications are stored in the application market in the form of application templates. When connecting to various infrastructures or cloud resources, the application can be used with a click or installed/upgraded with one click.

2. \*\*Ordinary developers can achieve application operation and maintenance without learning.\*\*Through application-level abstraction, ordinary developers can achieve application operation and maintenance by understanding application-level attributes, and extend operation and maintenance capabilities such as monitoring, performance analysis, logs, and security through plugins. Application operation and maintenance no longer requires dedicated SRE.

3. \*\*Complex applications can be delivered to the customer environment with one click.\*\*Complex applications are published as application templates. When the customer environment can be connected to the network, connect to the customer environment to install and run with one click. When the customer environment cannot be connected to the network, export the offline application template, import it into the customer environment and install and run it with one click.
