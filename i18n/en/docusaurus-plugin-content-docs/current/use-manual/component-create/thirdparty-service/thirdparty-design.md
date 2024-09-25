---
title: Principles of third-party service support
description: Explain the support principle of Rainbond supporting third-party services
---

### Classification of third-party services

The most important part of the third-party service is the service communication address provided by the user, so we divide the third-party service into two：according to the way the user provides the service communication address.

- Static registration of third-party services

As the name implies, such third-party services are users who provide one or more fixed service communication addresses when they are created, which we call Endpoints.Communication request traffic will be fixed to these targets.通信请求流量将固定的被负载到这些目标上去。

- Dynamically register third-party services

Compared with static registration, our service may also be a dynamic communication address, so we support APIs provided by third-party service registration centers (etcd, zookeeper, consul) or Rainbond, allowing users to dynamically change the communication address of the service .We call this category dynamically registered third-party services.这一类我们称为动态注册第三方服务。

### working principle

After the third-party service is created in Rainbond, the Rainbond application runtime service will automatically start to maintain the endpoints of the service. After obtaining the communication address list of the service through the above two methods, Rainbond will create a model for each service to store the service's Endpoints information.After this model works, it will perform a health check on the service according to the health check policy configured by the user, thereby presenting the health status of the service endpoints.此模型工作后将根据用户配置的健康检查策略来对服务进行健康检查，从而呈现服务 Endpoints 的健康状态。

- health examination

健康检查的方式分为 TCP 检查和 HTTP 检查，分别对应不同的服务类型。The health check methods are divided into TCP check and HTTP check, which correspond to different service types.If the instance is in an unhealthy state, there will be two processing methods：offline or no processing. The current default setting is no processing. When the user is set to offline, the instance is unhealthy and will be offline from the cluster, so that the gateway or other services will Unhealthy instances are not accessed.

- Rainbond's Service Access Security Control

The Rainbond service performs internal service registration by setting the internal and external opening properties of the port, which is actually similar to the concept of a firewall.[Refer to document](/docs/use-manual/component-manage/service-port-domain/#端口访问控制) For third-party services, you can control whether the current service opens access rights to gateways or other services by setting the internal and external open attributes of the port.[参考文档](/docs/use-manual/component-manage/service-port-domain/#端口访问控制) ，对于第三方服务一样，通过设置端口的对内、对外开启属性来管控当前服务是否向网关或其他服务开启访问权限。

- Third-party service port settings

与内置服务一样，第三方服务也需要设置端口，不同的是第三方服务更加灵活。Like the built-in service, the third-party service also needs to set the port, the difference is that the third-party service is more flexible.In the current version, we stipulate that third-party services can only add one port, so what is the relationship between this port and the port that the service actually listens on?

通常情况下我们推荐设置端口与监听端口一致，便于理解。用户添加服务 Endpoints 时只需要提供服务的 IP 地址，服务多个实例就填写多个 IP 地址。Usually, we recommend setting the port to be the same as the listening port, which is easy to understand.When adding service endpoints, users only need to provide the IP address of the service, and fill in multiple IP addresses for multiple instances of the service.For these services, we default to the same listening port, so Rainbond will use the IP defined by Endpoint and the port defined by the service to form the communication address when communicating with these services.

- Docking service gateway

After the third-party service configures the port, opening the external service will generate the same default access domain name as the built-in service for the HTTP type. After receiving the service request, the application gateway will load balance to the Endpoints endpoint of the service.This principle is consistent with the built-in service, refer to [Application Gateway](/docs/use-manual/team-manage/gateway/rules/domain)此原理与内置服务一致，参考 [应用网关](/docs/use-manual/team-manage/gateway/rules/domain)

- Access to other services

Like built-in services, other services need to rely on third-party services when they need to access third-party services. At this time, the Rainbond ServiceMesh mechanism will work. According to the service port configured by the user, a local monitor will be established in the network space of the access-side service, and the endpoints of the service will be monitored. Load balancing and other service governance.
