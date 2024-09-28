---
title: Third Party Service Definition
description: Rainbond's instructions for third-party service support
---

### Third Party Service Definition

Services that run outside the Rainbond cluster, whose runtime is not managed by Rainbond, and that can communicate with the Rainbond cluster on the network are called third-party services.For example, an Oracle service running separately, or a .net service running on a Windows server.Example Oracle service that runs individually, or .net service that runs on Windows servers.

### The original intention of Rainbond to support third-party service management

As an open source product of cloud application operating system,：has two common problems in the process of being used in many enterprises.

- <b>A step-by-step migration strategy, already on how Rainbond's services communicate and unified management with legacy services.</b></b>

The key to the application is that services are at the centre of the application and Rainbond provides a systematic system of service registration and discovery mechanisms to maintain configuration sharing and communication between services.But the services that have not migrated to Rainbond are too long in previous versions.Whether users move from traditional application structures to microservice structures, or from traditional transport to Rainbond we recommend that users move in a step-by-step manner.In this process, there is an inevitable coexistence of both internal and external services within the cluster. For example,：I have a traditional service architecture, using the same Oracle database, Oracle database running on a particular server, and we do not change it.First, some services have been migrated to Rainbond platforms, which require access to Oracle services and other unmigrated services.In Rainbond we recommend how to define configurations using environmental variables, we have had to repeat the same variable information for each service in the past, and have to rewrite all of it if it has changed later.In addition, services require access to other services, which in the past have only been able to define directly the IP address of the service and cannot use the communication governance function provided by Rainbon.Once again, observation service outreach and communications can be visualized on the Rainbond platform, but services outside the cluster cannot be managed uniformly in Rainbon.

- <b>Rainbond Application Gateway works well, but legacy services cannot share external ports or domain names with services on Rainbond.</b></b>

​ Rainbond provides the ability to allow applications and services to provide services to the external network. More and more users hope that the Rainbond application gateway can directly face the external network, that is, the external network IP is bound to the Rainbond gateway node, and the service gateway occupies 80 and 443 port.But this brings a problem immediately. There may be other services in the enterprise that need to be accessed by the same domain name. Therefore, in the past, we had no choice but to continue to add a layer of nginx service in front of the Rainbond gateway. Huge complexity of configuration.At the same time, services that have not been migrated to Rainbond cannot use the many out-of-the-box functions provided by the Rainbond gateway, such as domain name access monitoring.But this brings with it a problem that there may be other services in the enterprise that need to be visited by the same domain name, so we have not been able in the past to continue adding nginx services in front of the Rainbond gateway, thus creating a great complexity of the configuration.At the same time, services that do not migrate to Rainbond do not have the means to use the numerous open box features offered by the Rainbond gateway, such as domain name access surveillance.

According to the above-mentioned user demands, we put forward a new idea to support third-party service integration management according to Rainbond's service abstraction definition.

### Differences between third-party services and built-in services

| Contrast                     | Built-in service | Third Party Services                                                                                               |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Docking Application Gateway  | support          | support                                                                                                            |
| Dependent on other services  | support          | support                                                                                                            |
| ServiceMesh Governance       | support          | Support upstream communication governance                                                                          |
| Service properties           | all properties   | Support port, connection information, health check, permission<br />Support static or dynamic addition of Endpoint |
| Service Lifecycle Management | All support      | Only supports health checks                                                                                        |
| share app market             | support          | Not currently supported                                                                                            |
| backup, restore              | support          | Not currently supported                                                                                            |
