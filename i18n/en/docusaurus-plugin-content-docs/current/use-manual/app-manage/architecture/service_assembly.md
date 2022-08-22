---
title: service assembly
description: This article describes the assembly of microservice architecture applications based on the Rainbond platform
---

A key topic when everyone talks about microservices is "service splitting".Service splitting generally means that for a complete business system, we need to segment its business based on some factors and mechanisms to form some independent service components. These service components are independently developed, independently managed, and provide standard services to the outside world.In Rainbond, we often say "a component deployed to Rainbond is a microservice".If the business is a legacy system, an integrated architecture.Then you don't need to think about how to split it, just deploy it to Rainbond first, and use the microservice system to manage it first.It is nothing more than a service type that provides a variety of businesses, with poor shared attributes.If your business has been developed according to the microservice model, for example, it is developed based on the SpringCloud microservice architecture framework.Then you may not have the trouble of splitting for the time being.However, all service components need to be efficiently managed and developed continuously.

Therefore, this article mainly talks about the service-oriented assembly of the business system in Rainbond.Maybe your business currently adopts various technical architectures, including legacy integrated architecture, SpringCloud architecture, Dubbo architecture, and so on.We uniformly deploy it to the Rainbond platform for assembly.

### Preconditions

1. Have mastered the creation methods of various components of Rainbond [Reference Document](/docs/use-manual//component-create/creation-process)
2. Have mastered the principle and usage of communication between Rainbond components [Reference Document](/docs/use-manual/component-manage/component-connection/regist_and_discover)
3. Have mastered the usage of Rainbond service network management plug-in [reference document](/docs/use-manual/team-manage/plugin-manage/new-plugin)

### Assembly based on ServiceMesh

The key to service assembly is to understand the direct communication dependencies of services.The dependencies of components are established based on the communication relationship. In the application, business components can be added or removed at any time as needed, and the dependencies between components can be dynamically added and removed.Communication between components is managed and controlled through ServiceMesh [Traffic Routing Management](./network-visualization).

Only the microservice architecture assembled through ServiceMesh can view the relationship between components in the application topology.

### Assembly based on SpringCloud architecture

If your application is developed based on SpringCloud, the same is the deployment of a service and a component to Rainbond for assembly.Different from ServiceMesh-based, the communication relationship between services is bridged by the service registration center of Spring Cloud, which performs service registration and direct communication.That is to say, Rainbond cannot obtain the direct communication dependencies of the service, so it is not displayed in the topology diagram.But the key is that Rainbond ServiceMesh and SpringCloud are merging.As shown in the figure below, the communication between all services and the registry and database is done through ServiceMesh, and the communication from UI to Gateway is done by ServiceMesh.

![SpringCloud deployment diagram](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/SpringCloud.png)

### common problem

- Whether to support mixed assembly of multiple architectures

> The key to service assembly is how the two communicating parties perform service discovery and what protocol they use to communicate.In Rainbond, by supporting the 7-layer Restful protocol and the 4-layer TCP/UDP protocol, it can support various architectures for mixed assembly.
