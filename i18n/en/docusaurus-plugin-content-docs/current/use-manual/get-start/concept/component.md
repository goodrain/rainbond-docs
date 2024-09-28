---
title: components
description: Introduce the concept and design thinking of Rainbond components
---

The role of a component is to enable developers to define the deployment pattern of a business unit without paying attention to the underlying infrastructure, and a component describes a functional unit that can be instantiated as part of a larger distributed application.For example, each microservice in an application is described as a component.Another example is Wordpress+Mysql business system Wordpress and Mysql are described as components respectively.例如，应用程序中的每个微服务都被描述为一个组件。再例如 Wordpress+Mysql 的业务系统 Wordpress 和 Mysql 被分别描述为组件。

The component model has the following main properties：

- <b>Build source</b> defines the construction method of components, mainly including source code class, image class and application model class.

- <b>Component type</b> defines the deployment mode of the component. Currently, Rainbond supports single-instance stateless, multi-instance stateless, single-instance stateful, and multi-instance stateful types, and later supports Operator-based mode for component type expansion.

- <b>Environment configuration</b> Define the component running environment configuration, including environment variables and configuration files.

- <b>storage</b> defines the persistent storage requirements of the component.

- <b>Port</b> defines the ability of the component to provide services to the outside world.

- <b>Resource assignment and number of instances</b> Define the scale of the component deployment.

- <b>Dependencies</b> Define inter-component communication dependencies and variable injection configuration.

### How to make good use of "components"

The division of components is a crucial thing, and developers need to master the following principles：

- One component and one service;

- One component and one main process;

- A component has a clear business boundary;

- Stateful and stateless separation;

在 Rainbond 中，一个组件一个容器，因此如果是自定义镜像场景中，镜像的制作思想也应该与组件划分思想一致。在 Kubernetes 原生场景中经常有同一个 Pod 中多个容器的模式。In Rainbond, one component is one container, so if it is a custom image scene, the idea of image creation should be consistent with the idea of component division.In Kubernetes-native scenarios, there is often a pattern of multiple containers in the same Pod.In general, it is composed of a main business container plus some operation and maintenance feature containers, such as Mysql+Mysql monitoring container, API service plus log collection container, etc. There are main and secondary containers. The main container is for business, and the secondary container is for general operation and maintenance. Therefore, in Rainbond, the Pod multi-container capability is used as a component +[plug-in](./plugin/)mode.The component defines the main business, and the plug-in defines the operation and maintenance characteristics and is general.组件定义主要业务，插件定义运维特征且通用。

### Make external services a Rainbond component

The Rainbond platform manages the business system of the enterprise in a unified manner. It is inevitable that some businesses may not be able or necessary to migrate to the Rainbond cluster, but the existing components in the cluster may need to communicate with it or want to manage the external network traffic through the Rainbond gateway.For such scenarios Rainbond extends a special "component" type,<b>third party components</b>.By specifying the communication address of the third-party component, it is brought into the scope of Rainbond unified management.对于此类场景 Rainbond 扩充了一个特殊的“组件”类型，<b>第三方组件</b>。通过指定第三方组件通信地址的方式将其纳入 Rainbond 统一管理范畴。
