---
title: Spring Cloud microservice deployment example
keywords:
  - Advantages of Spring Cloud Microservice deployed in Rainbond
  - Spring Cloud Microservice Integration with Rainbond
  - Deployment of Spring Cloud Microservice Pig
---

This series of documents describes how best to deploy Spring Cloud microservices on Rainbond and how to integrate, including the deployment of examples of tutorials.

## Advantages of Spring Cloud Microservice deployed in Rainbond

### General description

Many companies now have business systems based on the Spring Cloud Microservice Framework.As an established microservice architecture, Spring Cloud Microservice provides many benefits for business development.
We do not need to explore what these benefits are, and Spring Cloud has already demonstrated its value by its huge market base of applications.But is it perfect, and there is nothing to make?There are no perfect products in the world, as do Spring Cloud. The following shortcomings need to be improved with：

- There is no good management for individual components
- Difficulty in finding performance monitoring solutions
- Difficulty in flexible scalability to adapt to business congestion
- Deploying into troubleshooting, including microservice components themselves, as well as related databases, intermediates

For more than 4 points, the Rainbond platform can make natural replenishments.

### Supports the full life cycle management of a single component

Rainbond sees each microservice component of Spring Cloud separately and can be deeply managed for each component, such as：

- Turn on, off, reboot, build, delete, scroll up, version back
- Performance monitoring
- Log Manager
- Vertical/Horizontal stretch
- Dependency based service discovery and registration
- Persistent storage and shared storage between service components
- Port settings and domain configuration
- Plugin Extension
- Build source settings, including MAVEN settings for various detailed parameters, configuration auto-trigger build mechanisms
- Custom environment variable configuration, health detection mechanism, permissions management

### Performance monitoring

Rainbond supports the performance monitoring program for plugins extension, and supports the monitoring of the `average response time, throughput, online population` application based on the Http, Mysql protocol.and detect url slots that take more time in the last 5 minutes to guide the performance of the debug system.

### Vertical/Horizontal stretch

Rainbond supports one-click scaling. This scaling consists of two dimensions：

- Vertically stretch：to scale up memory size used by a single service component
- Horizontal stretch：starts multiple backend instances for service components and automatically configure load balance

Spring Cloud Microservice Design has separated the program from the data, so the service component is seen as a direct horizontal scaling-up of the statelessness service.

### Market-based Rapid Deployment

Once the first deployment has been completed, we can publish as an application template packages to the shared pool for both the Sprint Spring Cloud microservices (including all microservice components and intermediaries, such as databases).Once published, the installation will only require a one-click installation from the shared library, greatly simplifying the deployment process.

During the first deployment of Spring Cloud the intermediate used such as Mysql Redis Rabbit, Rainbond was provided by the cloud city to pull out a built-in market application.The traditional deployment was relieved of the trouble of creating a variety of intermediaries.

## Spring Cloud Microservice Integration with Service Mesh

### General description

Rainbond original supports the Service Mesh Microservice Architecture.This means that whatever is originally used, as long as it is deployed on Rainbond it is naturally made up of Service Mesh microservices.This is also a feature of the Service Mesh Microservice Architecture：without intrusion into the original app.

When Spring Cloud is deployed on Rainbond, the entire set of business is a full Spring Cloud Microservice and a single Service Mesh Microservice.How can the business system then preserve the features of the first Spring Cloud Microservice Architecture and be able to benefit from the services Mres?This involves the integration of Spring Cloud microservices with Service Mosh.

The core idea of integration is the function maintained by Spring Cloud frames, which remains the same; the function that Spring Cloud Framework cannot be maintained and is submitted to Service Mesh and Rainbond.

### What Spring Cloud does not maintain

I am not going to discuss in depth what the Spring Cloud Microservice Framework maintains and has a lot of posts on the web site.

Here I would like to explain what should be done by Rainbond when the reader chooses to deploy its original Spring Cloud microservice in Rainbrond.

#### Sign up with Nacos

Nacos Registration Center, a standard registration center solution in Spring Cloud Microservice Framework.`Service provider (service provider)` in the microservice framework registers its service address in Nacos for remote calls by `Service consumer`.This service registration and discovery mechanism is designed in the micro-service architecture to decouple and decouple a number of separate services and to interact with each other.Based on this mechanism, all Spring Cloud micro-service components can be dynamically informed of the `Service Provider` service address; they can also shake up and register themselves as `Service Provider` to serve other components.

In Rainbond you can link the microservice component to eureka by relying on dependence, helping Spring Cloud to complete this action：

- Nacos itself opens port to internal service, registration with Rainbond platform to complete its service Mesh layer
- Other microservice components connect to Nacos via dependencies and can complete the service registration with Nacos without making any changes

#### Interface to various types of intermediate

A full Spring Cloud microservice system is bound to use multiple data intermediaries.Example PIG, use MySQL as data storage, REDIS as cache.In Spring Cloud, this type of intermediate interface is configured by configuration file.There are no other registration mechanisms in the microservice framework.The same can be used by Rainbond to link microservices to service intermediaries.

We recommend using **environmental variables** to define **pig-db** connection information.In the configuration file definition, the following:

```yaml
#Mysql相关
jdbc:
  name: ${MYSQL_USER}
  passwd: ${MYSQL_PASSWORD}
  host: ${MYSQL_HOST}
  port: ${MYSQL_PORT}
  database: ${MYSQL_DATABASE}

# Spring 相关
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```

#### Service Component Start Order

The starting order of the Spring Cloud Microservice component is more important, and it may cause errors when a component starts on its own before the service on which it depends.Spring Cloud Microservice Framework itself does not maintain the start order of the service component. The problem can be resolved by Rainbond

Rainbond supports kick-order controls based on dependency.The startup logic is that the service that is relied upon starts first, and only when the service on which the current service is relied is fully started.

## Spring Cloud Deployment Example

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
