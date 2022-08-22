---
title: Traffic routing management
description: Explain microservice traffic routing management based on Rainbond
---

Traffic routing management includes gateway edge traffic routing and inter-component communication traffic routing.The purpose of traffic routing management is to flexibly adjust the traffic direction according to business needs, and realize grayscale publishing, A/B testing and other advanced service publishing scenarios.

### Gateway Edge Traffic Routing

For gateway edge traffic routing, please refer to [Accessing components that provide HTTP services through domain names](/docs/use-manual/team-manage/gateway/rules/domain)

### Communication routing between components

Communication between components in Rainbond uses TCP layer 4 communication by default, so there is no need to set routing parameters by default.When we want to control traffic from application layer communication, we need to install [exit network governance plugin](/docs/use-manual/team-manage/plugin-manage/).Upgrade communication governance between services to Layer 7 communication governance.Currently, only Restful protocol routing management is supported, and the following routing parameters are supported:：

1. <b>Domain Name</b> Before version 5.2.0, this domain name only supports custom top-level domains, such as `user`.After version 5.2.0, it supports the definition of multi-level domain names, such as`user.domian`.Rainbond will automatically complete the domain name resolution to fill in the domain name.The Mesh layer performs routing based on the domain name accessed by the traffic.

2. <b>The request path</b> matches the routing policy according to the request path.

3. <b>request header</b> Route matching is performed based on the request header information.

In the plugin configuration, the developer needs to match the route for each communication link.For example, component A depends on components B\C\D, and uses `domain.b` `domain.c` `domain.d` domain names for communication.Then you need to configure the domain names of information on the links of the three components B\C\D respectively in the plug-in configuration.

![Routing parameter configuration between components](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/plugin.png)
