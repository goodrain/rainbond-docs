---
title: Third Party Service Definition
description: Rainbond's instructions for third-party service support
---

### Third Party Service Definition

Services that run outside the Rainbond cluster, whose runtime is not managed by Rainbond, and that can communicate with the Rainbond cluster on the network are called third-party services.For example, an Oracle service running separately, or a .net service running on a Windows server.

### The original intention of Rainbond to support third-party service management

As an open source product of cloud application operating system,：has two common problems in the process of being used in many enterprises.

- <b>A step-by-step migration strategy, already on how Rainbond's services communicate and unified management with legacy services.</b>

​ Rainbond takes application as the core, and the key of application is service. Rainbond provides a systematic service registration and discovery mechanism to maintain configuration sharing and communication between services.But services that haven't been migrated to Rainbond have been left behind in past releases.Whether users are in the process of converting traditional application architecture to microservice architecture, or migrating from traditional operation and maintenance to Rainbond, we highly recommend users to proceed step by step.Then in this process, the phenomenon of coexistence of services inside and outside the cluster will inevitably occur. For example：I have a traditional service-oriented architecture, and both use the same Oracle database. The Oracle database runs on a specific server, and we do not change it in the first stage. .First, some services were migrated to the Rainbond platform. These services need to access Oracle services and other services that were not migrated.In Rainbond, we recommend using environment variables to define the configuration. In the past, we needed to repeatedly define the same variable information for each service. If there were changes later, we had to change them all again.In addition, services need to access other services. In the past, only the IP address of the service could be directly defined, and the service communication management function provided by Rainbond could not be used.Furthermore, on the Rainbond platform, the service topology relationship and communication status can be visually observed, but the services outside the cluster cannot be managed uniformly in Rainbond.

- <b>Rainbond Application Gateway works well, but legacy services cannot share external ports or domain names with services on Rainbond.</b>

​ Rainbond provides the ability to allow applications and services to provide services to the external network. More and more users hope that the Rainbond application gateway can directly face the external network, that is, the external network IP is bound to the Rainbond gateway node, and the service gateway occupies 80 and 443 port.But this brings a problem immediately. There may be other services in the enterprise that need to be accessed by the same domain name. Therefore, in the past, we had no choice but to continue to add a layer of nginx service in front of the Rainbond gateway. Huge complexity of configuration.At the same time, services that have not been migrated to Rainbond cannot use the many out-of-the-box functions provided by the Rainbond gateway, such as domain name access monitoring.

According to the above-mentioned user demands, we put forward a new idea to support third-party service integration management according to Rainbond's service abstraction definition.

### Differences between third-party services and built-in services

| Contrast                     | Built-in service | Third Party Services                                                                                                     |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Docking Application Gateway  | support          | support                                                                                                                  |
| Dependent on other services  | support          | support                                                                                                                  |
| ServiceMesh Governance       | support          | Support upstream communication governance                                                                                |
| Service properties           | all properties   | Support port, connection information, health check, permission<br />Support static or dynamic addition of Endpoint |
| Service Lifecycle Management | All support      | Only supports health checks                                                                                              |
| share app market             | support          | Not currently supported                                                                                                  |
| backup, restore              | support          | Not currently supported                                                                                                  |
