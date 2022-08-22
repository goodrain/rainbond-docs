---
title: 'Advantages of Spring Cloud Microservice Deployment in Rainbond'
description: 'Explain why traditional springcloud microservices are deployed in Rainbond'
---

### Overview

At present, many companies already have business systems developed based on the Spring Cloud microservice framework.As a well-established and mature microservice architecture, the Spring Cloud microservice framework provides many benefits for enterprise business development. We don't need to discuss what these benefits are, Spring Cloud's huge market application base has pointed its value.But is it flawless, with nothing to add?There is no perfect product in the world, so is Spring Cloud. The following shortcomings need to be improved：

- Individual components are not well managed
- Difficulty finding solutions for performance monitoring
- Difficult to flexibly scale to accommodate business concurrency
- It is cumbersome to deploy, including the microservice components themselves and related databases and middleware

For the above 4 points, the Rainbond platform can make a natural complement.

### Supports full lifecycle management of individual components

Rainbond will treat each microservice component of Spring Cloud separately, and can perform in-depth management for each component, such as：

- On, off, restart, build, delete, rolling update, version rollback
- performance monitoring
- log management
- Vertical/horizontal telescopic
- Dependency-based service discovery and registration
- Persistent storage and shared storage between service components
- Port settings and domain name configuration
- Plugin extension
- Build source settings, including setting of various detailed parameters of MAVEN, configuring automatic triggering of the build mechanism
- Custom environment variable configuration, health detection mechanism, permission management

> For details on service management, see document： [Service Component Management](/docs/use-manual/component-manage/overview/basic-operation)

### performance monitoring

Rainbond supports the performance monitoring scheme of plug-in expansion, and supports the monitoring of `average response time, throughput rate, and` online number of applications based on Http and Mysql protocols.And detect the ranking of urls that took more time in the last：minutes, which has a guiding role in debugging system performance0

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-1.png" title="performance monitoring" width="100%" />

> For details on performance monitoring, see document： [Performance monitoring](/docs/use-manual/team-manage/plugin-manage/tcm-plugin/)

### Vertical/horizontal telescopic

：supports one-click scaling, which includes two levels of scaling.

- Vertical scaling：The memory size used for scaling a single service component
- Horizontal scaling：starts multiple backend instances for service components and automatically configures load balancing

The Spring Cloud microservice design has separated the program from the data, so the service component is regarded as a stateless service and directly scales horizontally for rapid expansion. The effect is as follows：

- One-click scaling of a single service component

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-2.png" title="Horizontally scaling multiple instances" width="100%" />

- Multi-instance service components behave accordingly in the topology diagram

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-3.png" title="Horizontally scaling multiple instances" width="100%" />

- The registration center is registered normally

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-advantage/spring-cloud-advantage-4.png" title="Registry Service Discovery" width="100%" />

### Rapid deployment based on shared libraries

Thanks to Rainbond's unique shared library mechanism, after the first deployment, we can package the entire set of Spring Cloud microservices (including all microservice components and middleware such as databases) as application templates and publish them to the shared library.After the release is complete, re-installation only requires one-click installation from the shared library, which greatly simplifies the deployment process.

In the process of deploying Spring Cloud for the first time, for middleware such as Mysql Redis Rabbit used, Rainbond Public Cloud Market provides a pre-made market application, which can be pulled and installed with one click.It eliminates the trouble of building various middleware in traditional deployment.

> For details of the application market, please refer to document：[Shared library](/docs/use-manual/enterprise-manage/appcenter/add-app)
