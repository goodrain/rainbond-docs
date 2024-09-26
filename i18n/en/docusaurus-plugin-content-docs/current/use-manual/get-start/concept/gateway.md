---
title: gateway
description: Introduce the concepts and design thinking of Rainbond gateways
---

在百度百科中, 网关的定义是这样子的: 网关(Gateway)就是一个网络连接到另一个网络的"关口"。类似的, 应用网关是 Rainbond 中外部流量  流入应用的关口。也可以说是南北向流量中, 北向流量流向南向流量的一个"关口"。部署到 Rainbond 的所有组件需要被外部访问的话都需要通过应用网关。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/gateway/what-is-gateway/north-to-south.png" title="网关拓扑图" />

### The role of application gateway

In Baidu Encyclopedia, the definition of gateway is like this: Gateway is the "gateway" that connects one network to another network.Similarly, the application gateway is the gateway through which external traffic flows into the application in Rainbond.It can also be said to be a "gateway" for north-south traffic to flow from north to south.All components deployed to Rainbond need to pass through the application gateway if they need to be accessed externally.Before introducing the role of the application gateway, we first need to mention [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#terminology).Ingress is one of the Kubernetes resource types that defines the specification of routing policies from outside the cluster to services within the cluster. Note that Kubernetes does not provide an implementation of these policy routes.

The role of the application gateway is to implement various policies defined in Ingress. In addition to HTTP and HTTPs routing, the application gateway also provides other rich functions. The currently supported functions are:

- HTTP and HTTPs Policies
- TCP/UDP policy
- Pan-domain policy
- Multiple load balancing algorithms
- Advanced routing: access control based on access paths, request headers, cookies, and weights
- Service and domain name access monitoring

### Policy Definition

The strategy is mainly divided into two parts, routing rules and routing targets. The routing target can be every port of all components. The routing rules have the following categories according to different：.

- **HTTP policy** According to the HTTP protocol specification, the routing conditions supported by the HTTP policy include`domain names` `request paths` `Cookie` `Header` `HTTPS`, and the same routing conditions support the definition of different weight values.The open source version of the load balancing algorithm supports the round-robin algorithm, and the enterprise version supports the expansion of multiple load balancing algorithms.负载均衡算法开源版本支持轮询算法，企业版本支持扩展多种负载均衡算法。

- **TCP/UDP strategy** According to the TCP/UDP protocol specification, the routing conditions supported by the TCP/UDP strategy include`IP`and`port`, and the open source version of the load balancing algorithm supports the polling algorithm.
