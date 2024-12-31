---
title: '网关'
description: 介绍Rainbond网关的概念和设计思考
---

在百度百科中, 网关的定义是这样子的: 网关(Gateway)就是一个网络连接到另一个网络的"关口"。类似的, 应用网关是 Rainbond 中外部流量  流入应用的关口。也可以说是南北向流量中, 北向流量流向南向流量的一个"关口"。部署到 Rainbond 的所有组件需要被外部访问的话都需要通过应用网关。

<img src="https://static.goodrain.com/images/docs/5.0/user-manual/gateway/what-is-gateway/north-to-south.png" title="网关拓扑图" />

### 应用网关的作用

在介绍应用网关的作用前, 首先  需要提一下 [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#terminology)。Ingress 是 Kubernetes 资源类型之一，定义了从集群外部到集群内服务的路由策略的规范, 注意的是 Kubernetes 并不提供  这些策略路由的实现。

应用网关的作用就是实现 Ingress 中定义的各种策略. 除了 HTTP 和 HTTPs 路由外, 应用网关还提供了其他丰富的功能. 目前支持的功能有:

- HTTP 和 HTTPs 策略
- TCP/UDP 策略
- 泛域名策略
- 多种负载均衡算法
- 高级路由: 根据访问路径, 请求头, Cookie, 权重的访问控制
- 服务与域名访问情况监控

### 策略定义

策略主要是两部分，路由规则和路由目标，路由目标可以是所有组件的每一个端口，路由规则根据协议的不同有以下类别：

- **HTTP 策略** 根据 HTTP 协议规范，HTTP 策略支持的路由条件有`域名` `请求路径` `Cookie` `Header` `HTTPS`，相同的路由条件支持定义不同的权重值。负载均衡算法开源版本支持轮询算法，企业版本支持扩展多种负载均衡算法。

- **TCP/UDP 策略** 根据 TCP/UDP 协议规范，TCP/UDP 策略支持的路由条件包括`IP`和`端口`，负载均衡算法开源版本支持轮询算法。
