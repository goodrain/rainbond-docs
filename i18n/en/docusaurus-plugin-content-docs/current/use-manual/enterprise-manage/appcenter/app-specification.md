---
title: Rainbond application market application production specification
description: Rainbond application market application production specification with SaaS delivery capability
---

> This document is continuously improving...

### normative purpose

The formulation of this specification is to guide users how to create SaaS-delivered applications in the Rainbond application market.

### requirements

* Support one-click installation

  One-click installation refers to the one-click automatic installation of a complete business system through the application market. To have this ability, you need to do：

  * The complete business system supports the ability to automatically initialize and upgrade persistent data.
  * Optimal configuration of services based on environment variables.

* Strong fault tolerance

  Strong fault tolerance means that in the cloud environment, all components in the business system can have a certain degree of chaotic fault tolerance, especially the following points：

  * When the service starts, it will retry the dependent communication of other services.
  * A service cannot be in a deadlock state, such as a service stuck due to an error communicating with other services.

* multi-user delivery

  Applications can be installed and deployed multiple times.

### The key factor

##### data initialization

Data initialization is generally mainly database data initialization and static data initialization. The recommended processing methods are as follows：

* Database data initialization

  In the microservice scenario, if each service has its own database service, you can directly use the database such as Mysql as a service for coded maintenance, and continuously upgrade its corresponding service SQL initialization code and upgrade code.

  The second is that the service maintains the SQL itself, and executes the SQL according to the version characteristics after each startup.This kind of method generally carries out the upgrade method of*only increasing but not decreasing*.

* static data initialization

  This type of service mainly needs to persist some directories, but the directory already contains some initialization data.The operation method is to store the initialization data in other directories first, and then determine whether the persistent directory contains data after the service is started. If not, synchronize the initialization data to realize initialization.

##### Service configuration

When the application is delivered as a SaaS standard, it is recommended to completely change the environment in the customized configuration part, and define different parameter types in the form of environment variables.In particular, the connection information between services must be completely variable according to Rainbond's specification environment to ensure that it works properly after each installation data change.



