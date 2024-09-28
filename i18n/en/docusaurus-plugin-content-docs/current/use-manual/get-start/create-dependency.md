---
title: 4. Assemble a Service Mesh Microservice Architecture
description: Implement Service Mesh microservice architecture without modifying the code
---

### Purpose

Learn how to quickly establish service component dependencies through documentation.

Rainbond supports the native Service Mesh micro-service architecture. Once the application is deployed on the Rainbond platform, it has been connected to this micro-service architecture.

After [deploying a service component from the source code](/docs/use-manual/get-start/create-app-from-source/) and [deploying an application](/docs/use-manual/get-start/create-app-from-market/)from the application market, we have successfully deployed two service components, now, let's create the dependencies between them.

The meaning of this is to allow **Java demonstration example** to communicate with **Mysql5.7 (stand-alone version)** , and the business level can call the database normally.

### significance

通过实操，用户可以初步体会到服务组件在 Rainbond 中如何通信。Through practical operation, users can get a preliminary understanding of how service components communicate in Rainbond.Users need to read [Inter-Component Communication](/docs/micro-service/service-mesh/connection_env) to understand the principle.

### Preconditions

- Done [Deploy a service component from source](/docs/use-manual/get-start/create-app-from-source/) Get **Java demo example**.

- Complete [Deploy an application from the application market](/docs/use-manual/get-start/create-app-from-market/) Obtain **Mysql5.7 (stand-alone version)**.

### build dependencies

- On the application topology map interface, click **to switch to edit mode**.

- 通过拖拽完成依赖关系的建立。

- Follow the prompts to complete the update operation of the downstream service component (Java demo example)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-depdendency/create-dependency-1.png" title="建立依赖关系" width="100%" />

After the dependency is established, **Java demo example** can communicate with **Mysql5.7 (stand-alone version)** normally.

The connection information is defined by the connection information in the **Mysql5.7 (stand-alone version)** of the **dependent** pages.

This is a set of environment variables that will take effect in **Mysql5.7 (stand-alone version)** and **Java demo examples** that depend on it.

**In the Java demo example** , by reading the value of the corresponding environment variable, you can reference the connection information of \*\* **(stand** alone version)\*\* in the code, including the connection address, port, Username Password.

### Next step

Next, we will explore how to publish the applications made by the current group of users to the application market provided by Rainbond to form their own application templates.
