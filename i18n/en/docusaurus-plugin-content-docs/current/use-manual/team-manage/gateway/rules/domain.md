---
title: Access components that provide HTTP services through domain names
description: Introduce how Rainbond accesses the components that provide HTTP-like protocol services by configuring the domain name
---

> This article is for application developers and operators

<b>Weight</b>: When the above routing parameters of multiple policies are all the same, the weight can take effect.Setting different weights to access different components (generally, different versions of the same business deploy multiple components at the same time), which is suitable for grayscale publishing scenarios.How the components deployed to Rainbond that provide HTTP protocol services are accessed is the focus of this description.Rainbond's gateway service is designed to be directly oriented to the public network environment, so using the Rainbond gateway can directly manage the flow of public network traffic for all businesses of the enterprise.In the scenario of providing external services, the most common way to access HTTP services is to use domain names.Enterprises usually have only one external network IP address to the outside world, and port resources, especially 80/443 port resources, are very limited. The use of domain names can effectively reuse ports.在对外提供服务的场景中，访问 HTTP 服务最常见的方式是使用域名。企业通常对外只有一个外网 IP 地址，端口资源特别 80/443 端口资源非常有限，使用域名的方式可以很好的复用端口。

Next we start to bind a domain name to the Rainbond gateway and access the deployed components.

### Preconditions

1. Accessible components that provide HTTP services have been successfully deployed, such as deploying any Demo based on source code.
2. Prepare a usable domain name and do a good job of DNS resolution (local resolution can be done in the test case, please configure the correct DNS resolution for official use)

### Operating procedures

1. <b>Confirm that the prerequisites are ready</b> Assume that the prepared domain name is www.example.com

2. <b>Configure the gateway policy</b> In order to facilitate the user to configure the gateway policy, there are three entrances for managing and adding policies, namely：team view/gateway/access policy management page; application view/gateway policy management page; component management panel, port management Below; different management pages mainly manage different policy scopes, and the way of adding them is the same.Adding a policy is mainly divided into two parts: configuration：`routing rules`and`access target`.We fill in the domain name `www.example.com` in the routing rule, and select the deployed Demo component in the access target to confirm and save.添加策略主要分为两部分配置：`路由规则`和`访问目标`。我们在路由规则中填写 `www.example.com` 这个域名，在访问目标中选择已经部署的 Demo 组件确认保存即可。

3. <b>Verify whether the policy takes effect</b> Directly click the added policy to initiate access, and the component page is opened normally, and the configuration is successful.

### Understand the principle and more configuration parameters

Rainbond 网关实现可以认为是一个 ingress-controller，基于 openresty `1.19.3.2`版本实现。用户配置的策略会被翻译成 Kubernetes Ingress 资源，然后自动在 Rainbond 网关中生效。Rainbond gateway implementation can be considered as an ingress-controller, based on openresty `1.19.3.2`version implementation.User-configured policies are translated into Kubernetes Ingress resources, and then automatically take effect in the Rainbond gateway.How to generate Kubernetes Ingress resources is that Rainbond's internal implementation is transparent to users, so I will not explain it in detail here. Here, I will mainly explain the parameters supported by the configuration policy except the domain name.

#### route parameter

- <b>Domain name</b>: The most important routing parameter. In the above example, we only set this parameter. The same domain name can be set repeatedly to route access to different component targets to serve the grayscale publishing scenario.
- <b>Request path</b>: In the case of the same domain name, different component services can be requested according to different request paths.
- <b>Path Rewrite</b>: You can use variables, combine regular expressions and flags to implement URL rewriting and redirection.
- <b>request header</b>: Use request headers to distinguish different request routes, mainly used in grayscale publishing scenarios.
- <b>HTTPs 证书</b>: 选择配置了 HTTPs 证书即将当前策略升级为 HTTPS，同时支持配置 HTTP 转移策略，包括 HTTPS/HTTP 共存和 HTTP 强转 HTTPS。HTTPs 证书需要在证书管理中提前上传添加。 <b>HTTPs certificate</b>: Select to configure the HTTPs certificate to upgrade the current policy to HTTPS, and support the configuration of HTTP transfer policy, including HTTPS/HTTP coexistence and HTTP forced to HTTPS.The HTTPs certificate needs to be uploaded and added in the certificate management in advance. The Rainbond Cloud version currently supports automatic certificate issuance, that is, the existing certificate is automatically matched according to the configured domain name. If it does not exist, the third-party platform is called to automatically complete the issuance, and then complete the certificate binding.
- <b>权重</b>: 当多条策略的上述路由参数全部一致时，权重即可生效。设置不同的权重访问到不同的组件（一般情况下是同一个业务的不同版本同时部署多个组件），适用于灰度发布场景。

#### Proxy parameter settings

> The proxy parameters need to be changed by clicking the parameter settings in the management list after the policy is added, which supports dynamic effect.

- <b>connection timeout</b>
  defines the timeout for establishing a connection with the upstream server (upstream). The unit is seconds, default: 75.

- <b>request timeout</b>
  Set the timeout for transferring requests to the upstream server (upstream). The unit is seconds, default: 60. Set the timeout only between two consecutive write operations, not for the transfer of the entire request. If the upstream server server does not receive anything within this time, the connection is closed.

- <b>response timeout</b>
  defines the timeout for reading responses from the upstream server (upstream). The unit is seconds, default: 60. Set the timeout only between two consecutive read operations, not for the transmission of the entire response. If If the upstream server does not transmit anything within this time, the connection is closed.

- <b>limit</b>
  the maximum limit of the upload content (or request body), set the size to 0, there will be no limit. The unit is Mb, default: 1.

- <b>request headers</b>
  setting custom request headers, each request sent to the upstream server (upstream) will bring these request headers.

- <b>The backend response buffer</b>
  corresponds to the proxy_buffering parameter of Nginx, which is disabled by default. If the backend response buffer is closed, Nginx will immediately send the response content received from the backend to the client; if the backend is enabled Response buffer, then Nignx will put the content returned by the backend into the buffer first, and then return it to the client; and this process is to transmit while receiving, not all received and then transmitted to the client.

- <b>Websoket</b>
  The WebSocket supported by the gateway is different from the pure WebSocket. It uses the HTTP Upgrade mechanism to upgrade the connection from HTTP to WebSocket on the basis of HTTP. This HTTP Upgrade mechanism adds two custom request headers to the request. They are 'Upgrade \$http_upgrade' and 'Connection "Upgrade"', when Websoket is checked, the gateway will automatically add these two request headers for the current policy.

#### Default Domain Name Mechanism

When the component of the HTTP protocol opens the external access permission of the port, if no access is configured, a default domain name is automatically assigned to it.The default domain name generation strategy is as follows：默认域名的生成策略如下：

```
{port}.{service-alias}.{team-alias}.{default_domain_suffix}
# eg. http://5000.gr6f1ac7.64q1jlfb.17f4cc.grapps.cn
```

The default_domain_suffix can be specified by the user or automatically assigned by Rainbond during each cluster installation.

### Reference video

Use the domain name to access the component operation reference video: https://www.bilibili.com/video/BV1Wz411q7Rm/

### common problem

- Why can't I access after the domain name is configured?

  > There may be several reasons for the inaccessibility：DNS resolution error; the component is not in normal operation; the component port configuration is inconsistent with the actual listening port; the component is not an HTTP service provided.You can follow the above priorities to troubleshoot faults in sequence.可跟随上述优先级依次排查故障。

- Can the default assigned domain name be modified?

  > The domain name assigned by default can be deleted first, and then the suffix assigned by the default domain name can be modified by modifying the cluster properties. The allocation policy does not currently support modification.

- Whether to support the pan-domain policy

  > Yes, the domain name configuration can directly use the generic domain name, such as`*.example.com`, then no matter accessing `a.example.com`or`b.example.com`, it can be routed to the specified component.
