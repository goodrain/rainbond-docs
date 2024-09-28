---
title: Traffic routing management
description: This section describes how to manage microservice traffic routing based on Rainbond
---

Traffic router management includes gateway edge traffic routing and inter-component traffic routes.The purpose of the traffic routing management is to adjust the flow direction to the business needs of the country, achieve a grey release scenario for advanced services such as A/B tests.

### Gateway Edge Traffic Routes

Gateway Edge Traffic Route please refer to [components providing HTTP services via domain name](/docs/use-manual/team-manage/gateway/rules/domain)

### Communication route between components

By default communication between Rainbond Central components is used as TCP 4 layers of communication, so no route parameters need to be set by default.You need to install [出口网络治理插件](/docs/use-manual/team-manage/plugin-manage/) when we want to control traffic from the application layer.Upgrade the communications governance between services to 7 layers of communications governance.Only Restful protocol routing is currently supported. The following route parameter： is supported

1. Until version <b>of domain name</b> 5.2.0, this domain only supports custom top level domain, such as `user`.Version 5.2.0 supports the definition of multiple domain names such as `user.domian`.Rainbond will automatically complete the domain name parsing for the domain name.The Mesh layer is routed according to the name of the traffic access.

2. <b>Request Path</b> to match routing policy based on the requested path.

3. <b>Request Header</b> matches the request header information.

In the plugin configuration, routing needs to be matched by a developer for each communication link.For example, component A depends on the B\C\D component, communications using the domain name `domain.b` `domain.c` or `domain.d` respectively.The domain name of the B\C\D components is then configured separately in the plugin configuration.

![组件间路由参数配置](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/plugin.png)
