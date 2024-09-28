---
title: What do Kubernetes experience do you have in your cloud?
description: In order to understand what is a cloud, it is necessary to understand what is wrong with cloud calculations, which will calculate the integrated management of resources, networks, storage, etc. infrastructure to achieve reduced resource costs and improved management of resources through resource scaling-up and automated management
slug: nounderstandk8s
image: https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/1662308874185.jpg
---

## The nature and final effect of cloud origin

In order to understand what is a cloud, it is necessary to understand what the cloud calculation is problematic; it will calculate the integrated management of the infrastructure, such as resources, networks, storage, etc. through resource scaling-up and automation, reduce the cost of resources and improve the efficiency of their management. The cloud calculation will essentially solve the problem of resource automation, but the key applications of digitization and informatization, cloud computing will not solve the problem of the management of applications, the management and mobility of applications will be difficult to solve the problem of dependence on people,**The birth of clouds is to solve the problem of managing applications, which is much more complex than resource management and involves the management of applications, such as the development of applications, the application architecture, the delivery of applications and the application of shipment, and, in conjunction with the application of automation, the management of resources, which is inherently a solution to the management of applications.**
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/1662308874185.jpg)

**In terms of effectiveness, the ultimate objective of the cloud is to focus the developers on their own business, out of business (infrastructure, application architecture, application dimension), and to create the kind of application they want and deliver their clients on demand.**

## Weather difficulty using Kubernetes

The most critical of the technologies associated with the clouds are containers, microservice structures, and Kubernetes which have subverted the automation of application management.

- **The packaging technology addresses the automation of applications and ensures consistency in the basic environment of the application through packaging, achieving one package and running everywhere.At the same time, containers can define an application running resource, which will be deployed on a as-needed basis to automate resource management from an application perspective.**

- **The microservice architecture addresses the decoupling and governance of complex applications, and when operations become more complex, the microservice architecture decoupled and decoupled operations into multiple modules and automated microservice operation and management through service governance.**

- **Kubernetes solve the problem of automating application organization and movement control, which is the most critical puzzle of application automation management, and which is based on containers, SDN and SDS at the bottom to automate all types of applications and microservice deployment and delivery processes.**

In order to automate the application management, there are many cloud-derived technologies, such as SDN (web automation management), SDS (storage automation management), Helm (automated delivery for complex applications), Service Mesh (management capacity for no-intrusion extension services), Monitoring (automated monitoring and automation), Logging (log automation), Tracing (automation of performance analysis), Chaos engineering (tolerance for error automation), Gateway (gateways automation), SPIFFE (application access security automation), etc. that can be used in conjunction with Kubernetes to address management automation of applications features.

These technologies are mainly centred around Kubernetes and therefore the landings process is mainly that of Kubernetes and Kubernetes is generally divided into two parts, Kubernetes and Kubernetes.The creation of a complete Kubernetes cluster based on the above technical autonomy is a complex one that learns these technologies and understands their rationale, and it is most difficult to assemble them organically.However, most companies have dedicated maintenance engineers that can take a lot of time to learn and try.Alternatively, the Kubernetes commercial service provided by the publicly owned cloud manufacturer was chosen, so there was a route to build Kubernetes.

The use of Kubernetes is generally a developer in comparison with the establishment of Kubernetes and the large number of developers, the use of habits and learning thresholds determines the acceptability of developers, while the use of cloud-origin platforms requires not only a change in development habits but also a great number of new technologies and difficulties in the landing process.

1. **Many new concepts and technologies need to be learned.** There is a great deal of technology and concepts associated with clouds, and there are many new concepts and abstracts in light Kubernetes such as Workload, Pod, Service, Ingress, ConfigMap, PV, etc. For good use to learn many of the concepts and techniques around Kubernetes.

2. **Existing apps need to be adapted, development habits need to change.** In order to run on Kubernetes, dockerfile and YAML will need to be written to make changes to the microservice architecture, along with the framework SDK change code to the previous development habits.

3. **How to deliver applications efficiently to customers, Kubernetes and these technologies are not resolved.** The value of the output can only be achieved if the application is delivered to the client, the current level of automation for the client is low and Kubernetes does not solve the problem of automating the delivery process.In the To C scenario, business frequency, high delivery frequency, need to be preserved.In the To B scenario, delivery is more complex and different clients have different requirements, and different delivery patterns need to be tailored to different clients, such as SaaS, private delivery, offline delivery, personalized delivery, etc., which is also the bulk of cost.

## Application of abstract models is a key to cloud origin (think operational)

The difficulty of using cloud-origin is that if the complex technology of cloud origin is packaged into an application layer in which developers are familiar with them, developers will not learn new concepts and technologies; if they are coupled with operational capabilities and decoupled with the microservice framework, they will be able to expand and switch microservice frameworks on demand and achieve business on demand; if customized delivery processes and automated delivery are achieved according to different client types, they will significantly reduce delivery costs and improve client satisfaction; when all three of these can be addressed, they will allow developers to focus on business per se, do not care beyond business and devote more attention to client value output.

**Based on the above reflection, the application of abstract models is a solutionist idea, packaging and abstract the application as a whole, including all operational definitions required for the operation of the application, separate from the underlying techniques and concepts.Upward users are no longer required to learn and understand system-level concepts and technologies, apply internal coupling of operations and extension capabilities, develop and manage applications of application concepts and enable plugins when expanding the capacity of services to govern, operate, security etc.Bottom down packaging Kubernetes concepts and abstracts, block differences in underlying infrastructure and make it possible to apply abstract models to all types of infrastructure.**

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/1662159240760.jpg)

Apply abstract template core design in three areas：

1. Apply Abstraction
2. Architecture fully disintegrates sex
3. Use app template delivery

### The abstraction can simplify understanding and use

**The application abstraction is an abstract model based on application, which exposes users to the concepts, attributes and actions of the application, the concepts and techniques of Kubernetes and the systems level, either fully automated or packaged into the properties and actions of the application level.** In order to achieve flexible programming and automation, Kubernetes define a number of concepts, provide rich extension mechanisms and interact with it in YAML, these programmable experiences of Kubernetes are very good features for those who manage and expand Kubernetes, but too high a threshold for ordinary developers, and many concepts and technologies are not directly related to their own development, so they need a more friendly operational experience and can be used without learning for ordinary developers.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/16625298435470.jpg)

Application abstraction and Kubernetes concepts correspondence of crude particle size：

| App Level Properties              | Kubernetes Concept |
| --------------------------------- | ------------------ |
| App Run Environment               | Containers         |
| App Run Properties                | Workload           |
| App network properties            | SDN                |
| Apply Storage Properties          | SDS                |
| Apply external service properties | Progress           |
| App internal service properties   | Service            |
| App plugin                        | Pod                |
| App configuration                 | ConfigMap          |

**The application abstraction is not intended to hide the Kubernetes concept altogether, but rather to display different interfaces for different users.** The normal developer function is to develop business and needs only attention to the concept of application grade and to provide the operational interface for the application level.However, in the case of the managers of the Yun Native Platform, the management and maintenance of Kubernetes can be expanded if they are able to do so, so they can also manage the applications on the platform by providing an operational interface that exposes the Kubernetes concept or directly operates Kubernetes in a manner that also avoids the fact that the “black box” created by the packing concept leads to insufficient observability and control over the platform.

### Structures fully decouple and use scene combinations

Based on the abstract of the application level, the application model is coupled with the infrastructure through the standard Kubernetes API, and all infrastructure compliant with the standard Kubernetes API, such as Kubernetes implementation, K3s, KubeEdge and others, through such decoupling the developers need only care for business and capacity expansion, not for infrastructure differences, and for applications models that can be deployed transparently to public, private clouds, and peripheral devices without change.

Usually in the app there are non-business-related features whose role is to make the app work better, such as：Service Governance, Microservice Framework, Operation Tools, Security Tools, etc. These capabilities are strongly coupled, need to be re-coded to the app, and to decouple the ability to decouple this part of the app. Apps need only focus on the business and the ability to expand it is highly versatile, as do other applications.

应用中扩展能力的解耦使用 Kubernetes 的 Pod，Pod中包含一个或多个容器，所有容器共享网络、存储，应用运行在一个容器，扩展的能力通过扩展容器的方式运行，通过共享的网络和存储实现了应用和扩展能力的解耦，这种解耦方式对业务完全无侵入，扩展的能力用插件的形式包装，就可以实现应用按需安装和启动插件，根据网络流向和容器启动顺序可以定义几种类型插件：

| Plugin Type               | Note                                                                                                                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incoming Web Plugin       | Network traffic goes to the entrance network plugin and then to the business container.e.g.：Gateway, WAF, Security Tools, Limit Stream  |
| Export Network Plugin     | Network traffic reaches the business container, then the plugin container.e.g.：load balance, circuit breaker, encrypted access          |
| Access to network plugins | Network traffic goes to the plugin container, then to the business container, then back to the plugin container.e.g.：Service Mesh proxy |
| Bypass Plugin             | Run by bypass road on the network.e.g.：performance analysis, monitoring, call chain, log management                                     |
| Initialize Plugins        | Pod's Init Container, Pod Start Init Container.e.g.：database initialization                                                             |

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/16629874136151.jpg)

Plugins implemented under the Pod mechanism can only expand the capacity of individual business packagings, while extension of microservice architecture capacity requires a plugin to govern each business container extension service, which is consistent with the service Mesh's delivery mechanism. Data Plane of Service Mesh's needs to inject Proxy into each business container. For a full application is the Mesh capability, for a full application extension is an application plugin for a full application extension. Depending on the injection of Proxy, multiple types of service Mesh can be supported, such as：Istio, Linker, Dapr, etc. an application can be activated as required or a replacement of the implementation framework.When the app is decoupled from the microservice architecture, each business container is no longer restricted by the microservice framework and development language. Each business container needs to focus solely on the business itself, and the business containers synchronized to get coupled.

**The free mix of decoupled operations, plugins and multi-cloud capabilities is achieved by fully structured decoupling. Developers choose to develop language development business modules, tailor dependency relationships according to business compacts, enable service Mesh plugins and other operational wires as required by service governance and operational stability, and run infrastructure environments as well as automatic interfaces based on actual needs.**

### Application template becomes a carrier of capability reuse and app delivery

Application models are presented and stored in the form of an application template, made up of source code, container image and plugin, and then exported as an application template, where the application template is designed primarily around the user and can be used by the user, allowing the app to deliver and produce value, thus pulling the iterations and development of the app.From using experience, app templates can install and upgrade by one click and by dragging down the business.The application template is highly flexible and supports different particle sizes, templates and templates can spell new templates, new templates can be continuously patched, particle size is determined by the user and gives meaning to them.App templates can be delivered to versions compatible with the Kubernetes API, install and upgrade one click or store the application template in the Marketplace to achieve the immediate effect.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/case/2022/09/13/166299854408.jpg)

**Application template requires four features：**

- **Modulated to form reusable capability units, using scenes as required.**
- \*\* Autonomy, self-sufficiency, independent installation, upgrading and management to ensure flexibility in combination.\*\*
- **Configurable, templates and templates can be patched out of new templates with unlimited spelling.**
- \*\* It can be found that both internal and external services are available for access to business and technology, developers and other applications.\*\*

**Reusable modules and capabilities are implemented through application templates.** When the application's architecture is fully decoupled, business components and extension plugins can theoretically be copied to other applications, but the direct reproduction of codes or mirrors is very inefficient and there are many operational settings that need to be considered, including business components and extension plugins to be packaged into application templates, and distribution of the application template to the application market for others to maximize the replication of modules and capabilities and reduce duplicate rotations.

**Automated delivery for SaaS, privatization and offline environments and personalized scene modules are implemented through application templates.** The application template contains all the resources needed to run the app, which allows you to install and run a single click for a client operating environment. This blocks the customer's environment difference, a product template can be delivered to all types of customers. For an offline environment, an application template can be exported as a document and then imported into the customer's offline environment.Features require personalized scenarios, the ability of the application template to package the business template, the ability to collate the modular capability before customizing, the newly developed functionality can be customized, and the application template can continue to be republished for subsequent reuse.

## Kubernetes do the cloud experience

Based on the design thinking above, the developers are allowed to focus on the business itself and return to the point of origin of user effectiveness and value, without concern for the complex techniques and unrelated concepts at the bottom and fully automate the application.

Development Apps Experience：

1. **Code can be turned into cloud native app without changing it.** For new business or existing business, the code does not need to be changed in order to render it container.Technologies such as docker and Kubernetes are not needed to deploy applications with all the attributes of cloud native applications.
2. **Business Brick Spelling.** Recyclable business modules accumulate to the Marketplace where new business needs to be developed, based on the Marketplace already operating modules, are packaged through “drag and drop” and then develop no business capabilities, the faster the business modules accumulate.
3. **The service Mesh microservice structure used to open the box and replace the Service Mesh framework with a single key.** Without learning the SDK of the Microservice Framework, the Service Mesh Microservice Architecture is implemented in an intrusive manner. The mainstream Service Mesh framework exists in the form of plugins and is open when needed, and can be replaced at any time if it is not considered desirable.

Use app experience：

1. **Install cloud native apps like mobile apps.** The cloud native app is stored in the app market in the form of an application template, installing or upgrading an app by one click or one click when it comes to an infrastructure or cloud resource.
2. **Generic developers will be able to perform app delivery without learning to learn.** By using the abstract, the normal developer knows the application level properties to achieve the app wire, and extends the ability to monitor and monitor performance, logs, security, etc. through plugins that require no longer a dedicated SRE.
3. **Complex apps delivering customer environment.** Complex apps are published as an application template, when the customer environment is connectable, installing on the customer environment, when the client environment is not connected, exporting offline application templates, importing and installing one click on the installation.

## Realization Programme

Based on the design thinking above, we have implemented[Rainbond](https://www.rainbond.com/) and will use it[开源](https://github.com/goodrain/rainbond).Rainbond, which provides an open-box experience, is simple and does not require knowledge of containers and Kubernetes, supports the management of multiple Kubernetes clusters, and provides life-cycle management for enterprise-level applications.The main functions include the application development environment, the application market, the micro-service architecture, the application delivery, the application workload, and the application of cloud management.
