---
title: Third Party Service Definition
description: Rainbond's instructions for third-party service support
---

### Third Party Service Definition

Services that run outside the Rainbond cluster, whose runtime is not managed by Rainbond, and that can communicate with the Rainbond cluster on the network are called third-party services.For example, an Oracle service running separately, or a .net service running on a Windows server.例如单独运行的 Oracle 服务，或运行于 Windows 服务器的.net 服务等。

### The original intention of Rainbond to support third-party service management

As an open source product of cloud application operating system,：has two common problems in the process of being used in many enterprises.

- <b>A step-by-step migration strategy, already on how Rainbond's services communicate and unified management with legacy services.</b></b>

​ Rainbond 以应用为核心，应用的关键是服务，Rainbond 提供了一套成体系的服务注册和发现机制来维护服务之间的配置共享和通信。但是过去的版本中对于未迁移到 Rainbond 的服务却鞭长莫及。用户不管是在传统应用架构向微服务架构转化过程，还是从传统运维向 Rainbond 迁移的过程，我们都非常推荐用户循序渐进的进行。那么在这个过程必然出现集群内外服务共存的现象，举个例子：我有一个传统服务化架构，都使用同一个 Oracle 数据库，Oracle 数据库运行于一台特定的服务器中，第一阶段我们不改变它。首先将部分服务迁移到了 Rainbond 平台，这些服务即需要访问 Oracle 服务，还需要访问其他未迁移的服务。在 Rainbond 中我们推荐使用环境变量的方式定义配置，过去我们就需要重复的为每个服务定义相同的变量信息，如果后期有变化，又得全部重新改一遍。另外，服务需要访问其他服务，过去只能直接定义服务的 IP 地址，无法使用 Rainbond 提供的服务通信治理功能。再者在 Rainbond 平台可以可视化的观察服务拓扑关系和通信状态，然而对于处于集群外的服务无法在 Rainbond 中统一管理。

- <b>Rainbond Application Gateway works well, but legacy services cannot share external ports or domain names with services on Rainbond.</b></b>

​ Rainbond provides the ability to allow applications and services to provide services to the external network. More and more users hope that the Rainbond application gateway can directly face the external network, that is, the external network IP is bound to the Rainbond gateway node, and the service gateway occupies 80 and 443 port.But this brings a problem immediately. There may be other services in the enterprise that need to be accessed by the same domain name. Therefore, in the past, we had no choice but to continue to add a layer of nginx service in front of the Rainbond gateway. Huge complexity of configuration.At the same time, services that have not been migrated to Rainbond cannot use the many out-of-the-box functions provided by the Rainbond gateway, such as domain name access monitoring.但是这里马上就带来了问题，企业中可能还存在其他的服务需要被同一个域名访问到，因此过去我们没有办法，只能在 Rainbond 网关的前面继续添加一层 nginx 服务，这样带来的就是配置的巨大复杂性。同时未迁移到 Rainbond 的服务也没办法使用 Rainbond 网关提供的众多开箱即用的功能，比如域名访问监控。

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
