---
title: Overview of Microservices Deployment
description: Detailed introduction to the methods and advantages of building and managing microservices architecture applications based on Rainbond
keywords:
  - Microservices Deployment
  - Spring Cloud Deployment
  - Service Mesh
  - Microservices Architecture
---

This document comprehensively introduces the methods, advantages, and best practices of deploying and managing microservices architecture applications based on Rainbond, helping users deeply understand how to use Rainbond to build modern microservices systems.

## Overview of Microservices Architecture

Microservices architecture is a form of architecture that decomposes large applications into multiple independent components, each responsible for specific business functions, collaborating with each other through standard interfaces.This architecture has the following characteristics:

- **Service Decoupling**: Each service can be independently developed, deployed, and scaled
- **Technology Diversity**: Different services can be developed using different technology stacks
- **Elastic Scaling**: Specific services can be independently scaled according to business needs
- **Continuous Delivery**: Supports more flexible release strategies and faster iteration speeds

## Microservices Assembly Strategy

### Assembly Based on Rainbond Native Service Mode

Rainbond native Service mode assembly is suitable for any type of application, including traditional monolithic applications, existing microservices applications, or newly developed services:

1. **Componentized Deployment**: Deploy applications as independent components by function
2. **Establish Dependency Relationships**: Create communication dependency relationships between components
3. **Automatic Service Discovery**: Components automatically obtain access information through dependencies
4. **Topology Visualization**: Intuitively present communication relationships between services in the application topology diagram

The advantage of this method is that it is **completely non-invasive to the application**, suitable for rapid microservices transformation of legacy systems and mixed deployment of various technology stacks.

### Assembly Based on Spring Cloud Architecture

For applications developed based on Spring Cloud, the assembly method is slightly different:

1. **Registry Deployment**: First deploy registries such as Nacos/Eureka
2. **Componentized Deployment**: Deploy each microservice component
3. **Establish Key Dependencies**: Establish dependency relationships between services and registries, databases, etc
4. **Maintain Internal Communication**: Communication between services still goes through the registry

<!-- ![SpringCloud部署示意图](https://static.goodrain.com/docs/5.2/SpringCloud.png) -->

In this mode, the Spring Cloud service registration and discovery mechanism and Rainbond complement each other, forming a complementary advantage.

## Advantages of Spring Cloud and Rainbond Integration

Deploying Spring Cloud microservices on the Rainbond platform can obtain enhanced capabilities in many aspects:

### Component Lifecycle Management

Rainbond provides comprehensive management for each microservice component of Spring Cloud:

- **Operation Status Control**: Start, stop, restart, build, rolling update, version rollback
- **Performance Monitoring**: Multi-dimensional monitoring of resource usage, request response time, throughput rate, etc
- **Log Management**: Centralized log collection, viewing, and analysis
- **Elastic Scaling**: Supports vertical and horizontal scaling to adapt to business load changes
- **Plugin Extension**: Enhance service capabilities through the plugin mechanism

### Simplified Service Communication Configuration

Rainbond simplifies service communication configuration through dependency relationships and environment variable mechanisms:

- **Automatic Service Discovery**: No need to hardcode service addresses
- **Environment Variable Injection**: Automatically injects connection information for upstream and downstream services
- **Automatic Domain Name Resolution**: Internal service domain names are automatically generated and resolved

It is recommended to use environment variables to define connection information in configuration files, for example:

```yaml
#Mysql related
jdbc:
  name: ${MYSQL_USER}
  passwd: ${MYSQL_PASSWORD}
  host: ${MYSQL_HOST}
  port: ${MYSQL_PORT}
  database: ${MYSQL_DATABASE}

# Spring related
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```

### Service Startup Sequence Control

Rainbond automatically controls the service startup sequence based on dependency relationships:

- Dependent services are started first
- The current service will only start after all dependent services are running normally
- Automatic retry mechanism ensures the service starts correctly

This solves the problems caused by improper service startup sequence in microservices architecture without the need to write additional scripts.

### Quick Deployment from Application Market

Based on the Rainbond application market, one-click deployment of microservices applications can be achieved:

- **Application Template Release**: Package and release the entire set of microservices along with middleware
- **One-click Installation**: Install the complete application with one click from the application market
- **Out-of-the-box Middleware**: Commonly used middleware such as MySQL, Redis, RabbitMQ can be directly installed and used

## Reference Cases

To learn more about Spring Cloud microservices deployment examples on Rainbond, refer to the following cases:

- [Spring Cloud Pig Microservices Deployment](./pig-example.md)
- [Spring Cloud Blade Microservices Deployment](./blade-example.md)
