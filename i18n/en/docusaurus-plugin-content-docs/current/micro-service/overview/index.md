---
title: Overview
description: This chapter describes the complex application of microservice architecture based on Rainbond
keywords:
  - Microservice deployment
  - Spring Cloud Deployment
  - Build Microservice Architecture
---

Microservice structures (commonly referred to as microservices) are a form of architecture used to develop applications.Through microservices, large applications can be split into multiple separate components, each of which has its own area of responsibility.When processing a user's request, microservices-based applications may call many internal microservices to jointly generate their responses.

## Organization of services

A key topic for chatting the service is “Split of Services”.The separation of services generally refers to a complete business system for which we need to form independent service components based on a number of factors and mechanisms for their separate development, independent management and external delivery of standard services.In Rainbond we often say that “the components deployed to Rainbond are a microservice”.If the operation is a legacy system, an integrated architecture.You do not think about how to split it, first deploy it to Rainbond and manage it first by using a microservice system.None of this is the type of service that provides multiple operations and the share attributes are less favourable.If your business has already been developed in a microservice model, for example based on the SpringCloud Microservice Framework framework.So you may have no trouble with splitting for now.However, all service components need to be managed efficiently and continuously developed.

This article is therefore the main chat to assemble the business system in Rainbrond.It is possible that your business currently uses a variety of technical structures, a legacy integration structure, a SpringCloud structure, a Dubbo architecture, etc.We have deployed them uniformly to the Rainbond platform for assembly.

### Based on the ServiceMesh assembly

The key to service assembly is to clarify the direct communication dependency of the service.Component dependencies are built based on communication relationships. Operational components can be increased or reduced at any time in the app as needed. Dependencies between components can be increased and removed dynamically.Controls communications between components via ServiceMesh [流量路由管理](#Webvisualization).

The relationship between components can only be seen in the Applets pop through the ServiceMesh microservice architecture.

### Based on SpringCloud Architecture

If your app is based on SpringCloud development, the same is a service component deployed to Rainbond for assembly.Unlike ServiceMesh based communications, service registration and direct communication is provided by SpringCloud services registry centre as a bridge.Rainbond does not have a direct communication dependency to access the services and therefore is not shown in the top.But the key is the integration of Rainbond ServiceMosesh with SpringCloud.As shown in the graph below, communications between all services and registration centres and databases are made through ServiceMosh, and communications from UI to Gateway are completed by ServiceMesh

![SpringCloud部署示意图](https://static.goodrain.com/docs/5.2/SpringCloud.png)

## Web Visualization

Web Visualizations are made in Rainbond app topography.Show the dimensions below： in the app pop

1. Business outreach relationships between services.
2. Communication dependency between services.
3. The service provides access to the external network.
4. Service is running in real time.

![ServiceMesh架构拓扑图](https://static.goodrain.com/docs/5.2/servicemesh.png)
