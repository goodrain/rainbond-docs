---
title: Kubernetes Gateway API in-depth reading and landing guides
description: The Kubernetes Gateway API is a new API norm introduced in Kubernetes version 1.18. It is a new API that Kubernetes official is being developed, and Progress is an existing API for Kubernetes.
slug: gateway-api-intro
image: https://static.goodrain.com/wechat/gateway-api-indexpth/1.png
---

The Kubernetes Gateway API is a new API norm introduced in Kubernetes version 1.18. It is a new API that Kubernetes official is being developed, and Progress is an existing API for Kubernetes.The Gateway API will become a next generation alternative to progress.The Gateway API provides more functionality, supports TCP , UDP, TLS etc. and not just HTTP.Progress is mainly for HTTP traffic. The Gateway API is more extensive, with CRD you can easily add specific Gateway types, such as AWS Gateway etc.Expansion of Progress is relatively difficult.The Gateway API supports more meticulous traffic routing rules that can be accurate to service level.The minimum route cell for Progress is the path.

Meaning and value of the Gateway API:

- As an official Kubernetes project, the Gateway API is better integrated with Kubernetes itself, with greater reliability and stability.

- Support for more abundant traffic protocols for more complex scenarios such as service grids, and not only HTTP.Can be unified as the traffic entry API for Kubernetes.

- Better extension, using CRD to easily support various types of custom types of Gateway's and more flexible.

- Flow control of fine particles, precision to service level routing and provide a stronger flow management capability.

On the whole, the Gateway API is a new generation of Kubernetes entry API, with wider application scenes, stronger features, and better reliability and extension.The Gateway API is a better option for the production level Kubernetes environment.This article will deepen the interpretation of the Kubernetes Gateway API concepts, features, and usages to help readers understand and actually apply Kubernetes Gateway API, taking advantage of Kubernetes network traffic management.

## Current state of development

### Current version status

The Gateway API is currently under development and has not yet been published in its official version.The current state of development is as follows:

- v1beta1: The current main iterative version, the Gateway API is in the beta version, which means that we can use Gateway API capability in production. Currently beta versions only support HTTP protocols and TCP protocols, UDP protocols, GRPC protocols and TLS are all alpha versions.

- v1.0: First official version of the GA, API is stable and can be used in the production environment.But the functionality will continue to improve.

### Available Scenes

下面简单整理了一下 HTTPRoute 的一些可用场景：

- Multiple versions deploy：if your app has multiple versions, you can use HTTPRoute to route traffic to different versions to test and gradually upgrade.For example, you can route some traffic to a new version for testing while keeping the old version running.

- A/B Test：HTTPRoute can implement A/B test by weighting.You can route traffic to different backend services and assign a weight to each service in order to test different versions of functionality and performance.

- Dynamic route：HTTPRoute supports dynamic routes based on conditions such as path, request header, request parameter and request body.This allows you to route traffic to different backend services according to the requested properties to meet different needs.

- Redirect：HTTPRoute support redirect. You can redirect some requests to another URL, e.g. redirect old URL to a new URL.

### Ecology around

Although the Gateway API is still under development, there are already some projects that support or plan to support the Gateway API.The main ones are:

- Istio is one of the most popular service grid projects, version Istio 1.9 plans to introduce experimental Gateway API support.Users can configure the Envoy proxy for Isto via Gateway and HTTPRoute resources.

- Linkerd is another popular service grid project, with Gateway API support added in version 2.10.Users can use Gateway API resources to configure Linkerd proxies.

- Contour is a Kubernetes Congress Controller, Version 1.14.0 that adds Gateway API support, using Gateway and HTTPRoute to configure Contour.

- Flagger is a blue green deployment and A/B test tool for Kubernetes, and version 0.25 of Flagger adds support to the Gateway API. Gateway and HTTPRoute can be used to build Flagger traffic routes.

- HAProxy InCongress Controller supports Gateway API, using Gateway and HTTPRoute to build HAProxy.

- Traefik is a famous open-source edge router and version 2.5 of Traefik has started to support Gateway API and phase out Ingress.

In addition, open source projects such as Apisix, Envoy Gateway, Higress, etc. also support or intend to support the Gateway API, all major cloud service providers are actively following Gateway API progress and are expected to provide Gateway API support in their respective services in the future.As can be seen, although the Gateway API is not yet mature and stable, it has been supported and compatible with a large number of projects because of its strong functions and its influence as an official Kubernetes project.The service grid, the API gateway, and the cloud service providers will be the preferred ecology of the Gateway API.

### Future planning

- Improved functionality and stability：continues to improve the functionality and stability of the Gateway API to ensure that it responds to the needs of different scenarios.

- Manage size：for Kubernetes clusters, optimize Gateway API performance and extension to enable it to manage more gateways and routing rules.

- Enhanced security：enhances the security of the Gateway API, including encryption, authentication and so on during transfer to ensure the security of network traffic.

- Improved documentation and community support for：developing Gateway API documentation and community support to help users better use and understand the project.

## Gateway API Admin

### Basic concepts

Kubernetes Gateway API defines three basic resource types：GatewayClasss, Gateway, Route.

- **Gatewayclass:** A set of Gateway collections that share common configurations and behaviours, similar to IngresCass and StorageClasss, needs to know that the Gateway API does not create a real gateway. The real gateway is created by a controller provided by communities that support the Gateway API (infrastructure providers), such as Envoy, Istio, Nginx.GatewayClasss, Gatewayclass's function is to bind a controller to define a gateway type.
- **Gateway:** can be said to be the concrete implementation of GatewayClass after which a specific Pod, provided by the infrastructure provider of GatewayClasss, serves as an entry point to the Kubernetes cluster, is responsible for traffic access and forward forwarding and has an initial filtering effect.
- **Route:** The real routing defines the rules of the specific protocol for mapping the request from Gateway to the Kubernetes service.Only HTTPRoute currently enters v1beta version, which is a more stable version, followed by TCPRoute, UDPRoute, GRPCRoute, TLSRoute etc. will enter the beta version, where only HTTPRoute will be presented.

With regard to the relationship between them, the official document also gives a very clear structural. As shown in the graph below, it is my view that the pictures mainly emphasize role-oriented features. The official wishes to express the idea that GatewayClass is provided by infrastructure providers, Gateway resources are created by cluster engineers and the basic environment is being built. The developers can easily create HTTPRoute to bring out their own business agents.

![](https://static.goodrain.com/wechat/gateway-api-indexpth/1.png)

### How to Work

#### Chart

![](https://static.goodrain.com/wechat/gateway-api-indexpth/2.png)

#### GatewayClass

Controller by deploying GatewayClass downstream binding, provides a gateway capability for clusters, which can be seen as a registration statement to register you downstream for Gateway binding use.The Controller can be seen as an Operator who listens to Gateway resources.

```Bash
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller #bound Controller name
```

#### Gateway

Gateway resources are an intermediate layer that need to define the portal, protocol, TLS configuration information to be listened, so that management and control of network traffic can be pooled in a centralised location that increases cluster availability and security.Once the configuration is completed, the Controller bound by GatewayClass provides us with a specific Pod as a traffic entry. Note that there is still a slight difference between your implementation here. Envoy Controller creates an employment resource that provides you access to the Pod, while Nginx is itself a traffic entry Pod that will not create a new one.

```YAML
spec:
  gatewayClassName: envoy #bound GatewayClass name.
  listeners: # Defined some listening items, Route binding
  - allowedRoutes: #Defining traffic forwarding range
      namespaces:
        from: All #Allow Gateway to all Namespace Pod forwarding traffic.
    name: FTP # Listening Item Name.
    port: 8088 #listener port
    host： www.. ateway.*. om # Defines a domain, typically a generic domain, matching traffic from that domain.
    protocol: HTTP #Definition, TTP or HTTPS 
  - allowedRoutes:
      namespaces:
        from: All
    name: https
    port: 8443
    protocol: HTTPS
    tls: #Configure encryption protocol for HTTPS
      mode: Terminate #encryption protocol type, erminate or Passed through
      certificateRefs:
      - kind: Secret
        name: cafe-secret
        name: default
```

**Protocol Type：**

- **Terminate**：decrypts encrypted traffic and forward the text traffic to the backend service.This mode requires that certificates and keys be configured at gateways to encrypt and decrypt traffic between clients and servers and ensure data security.
- **Passthrough：** forward encrypted traffic samples to backend service.This mode does not need to configure certificates and keys at gateway, as TLS connection is terminated only at the backend service.This pattern applies to scenarios where TLS traffic needs to be passed directly to the backend service, such as access control or traffic monitoring for the backend service.

#### HTTPRoute

HTTPRoute is closely related to your business and defines detailed rules here to proxy traffic to corresponding business services.

```YAML
#HTTPRoute A
spec:
  parentRefs: #binding Gateway listener
  - name: gateway #Gateway Resource Name
    namespace: envoy #Gateway namespace
    sectionName: HTML #listener name
  hostnames: #Configure domain name
  - www.. ateway.example. om" #Can configure a generic domain, multiple
  rules: #Configure detailed routing rules, multiple configurations, Faced with detailed parsing
  - matches: #matching conditions
    - path: #path matching
        type: PathPrefix #path type：Exact fully matches / PathPrefix regular match
        value: /gateway 
    filters: #Advanced Settings
    - type: requestHeadeer Modifier #Processing Head
      requestHeader Modifier: #set up/add add/remove
        set:
        - name: service
          value: goodrain
    - type: RequestRedirect #Request
      requestRedirect: 
        scheme: https# redirect the protocol used, ttp/https
        hostname: www.. aidu.com#Redirected domain name
        port: 8443 #Redirection used on port
        statusCode: 301 #Redirected status code：301 Permanent redirect/302 Temporary redirection
-------------------
#HTTPRoute B
spec:
  parentRefs: 
  - name: gateway 
    namespace: envoy 
    sectionName: https
  hostnames:  
  - "www.. ateway.example. om" 
  rules: 
  - matches: 
    - headers: #request matching
      - name: service 
        value: goodrain
    backendRefs: #backend route
    - name: goodrain-v1 # service name
      port: 80 #service port
      weht: 80 #weight
    - name: Goodrain-v2
      port: 80
      Weight: 20
```

**Rule type：**

- **matches:** consists of one or more matching conditions that can be matched on the properties of HTTP requests (such as request method, path, head, query parameters, etc.) to determine which requests should be routed to the backend service corresponding to the rule.
- **filters:** Control of incoming requests with more fine particles, such as modifying the head of request, forwarding requests to other services, redirecting requests to different URLs, etc.They consist of a set of rules, each containing one or more filters.These filters can be processed before or after the request is routed to the backend service to perform a variety of features.
- **backendRefs:** Specifies the reference to the backend service, which contains a list of backend services each with a name and port number that can be routed to one of the instances of the backend service and achieve a load balance using a different load balance method.

When we understand it, we can see how the HTTPRoute uses are very flexible and can create a route suitable for our business by combining different rules combinations. Take the yaml above as an example. The overall traffic moves to the graph shown below when the requested traffic in the application of the HTTPRoute agreement is matched by the rules, the traffic is forwarded downwards to HTTPRoute A route, the HTTPRoute A process first requests in the order of the rules, then redirect the request to HTTPRoute B and then route the traffic to the corresponding backend service by HTTPRoute in proportion to weight.

It should be noted that the set of rules has priority and when there are multiple rules at the same time, traffic is matched up to the bottom, as long as the matching traffic is directly proxy to its backend or redirect to the corresponding route.

## Gateway API Quick Start

To sort out where we need to do what to do if we use the Gateway API in our business.

- Kubernetes Gateway API base CRD.[Installing Gateway API CRD addresses](https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api).
- The Gateway API downstream is the basic equipment provider.(Contains GatewayClass Resources)[下游实现地址](https://gateway-api.sigs.k8s.io/implementations/).
- Create Gateway, define the basic routing method for HTTPRoute.Write yourself based on the fields above.
- Create HTTPRoute settings rules to bind your business.Write yourself based on the fields above.

Below is the example of demo provided by Envoy, a series of overall processes

### Install Gateway API CRD and Envoy Controller

```Bash
kubtl apply -f https://github.com/envoyproxy/gateway/releases/download/v0.3.0/install.yaml
```

**View Installation Effects**

```Bash
# See installed CRD resource
kubectl get card |grep networking.k8s.io

# See installed envoy controller
kubectl get pod -n envoy-gateway-system
```

### Install Gateway, HTTPRoute and example apps

```Bash
kubtl apply -f https://github.com/envoyproxy/gateway/releases/download/v0.3.0/quickstart.yaml
```

#### Internal GatewayClass Resource

The controller of the resource's controlerName attribute field is configured to bind envoy's controller

```Bash
apiVersion: gateway.networking.k8s.io/v1beta1
kind: GatewayClass
metadata:
  name: eg
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
```

#### Internal Gateway Resource

The resource gatewayClassName field configuration binds a gatewayclass resource name eg and provides a listener for an internal listen port of 80, protocol type for an overview.

```Bash
apiVersion: gateway.networking.k8s.io/v1beta1
kind: Gateway
metadata:
  name: eg
spec:
  gatewayClassName: eg
  listeners:
    - name: http
      protocol: HTTP
      port: 80
```

#### Internal HTTPRoute Resource

The parentRefs attribute field configuration for the resource binds the gateway resource name.The domain named www.example.com, the proxy backend service has chosen service, called backend and the service port is 3000.

```SQL
apiVersion: gateway.networking.k8s. o/v1beta1
kind: HTTPRoute
metata:
  name: backend
spec:
  parentRefs:
    - name: eg
  hostnames:
    - "www.. xample. om"
  rules:
    - backendRefs:
        - group: ""
          kind: Service
          name: backend
          port: 3000
          weight: 1
      matches:
        - path:
            type: PathPrefix
            value: /
```

**View Installation Effects**

```Bash
# See installed gatewayclass
kubectl get gatewayclass

# See installed gateway resource
kubectl get gateway

# See installed httpt resource
kubectl get httpt

#View the traffic entry provided by the Controller.
kubtl get pod n envoy-gateway-system

#View rout parsing address, The medium nodeport type svc is your parse address.
kubectl get svc -n envoy-gateway-system|grep LoadBalancer

#Visit
curl --resolution www.. xample.com:31830:xx.xx.xxx.xxxx --header "Host: www.example.com" http://www. xample. om:31830/get                                           
```

## Gateway API Production Guide

Gateway API for production requires consideration of usability, manageability and stability factors：

- **Accessibility**：Gateway API expands many configurations and needs a UI-based management tool if it's difficult to write directly to yaml and it is easy to go wrong.
- **Administrative**：Gateway API supports role management and use, consistent with platform engineering, but requires a platform with decentralized permissions and roles to be used for production.
- **Stability**：Gateway API is currently being implemented, Envoy and Nginx can be used in the production environment.

Based on the above, the production environment requires Gateway API management tools, currently relatively sophisticated tools can select Rainbond, which runs Kubernetes and provides a design idea for the platform project, providing web-interface to manage Kubernetes resources, including the Gateway API, no need for users to write Yaml files, no distinction between administrator and normal developer roles. Administrators can install compatible Gateway API implementation via the management interface, such as Envoy and Nginx, where good gateways are installed, and the normal developer can use only routing needs to configure operations without concern about which of them.

**Specific Landing Process：**

### Install Rainbond on Kubernetes

Reference install document： [based on Kubernetes install Rainbond ](https://www.rainbond.com/docs/installation/install-with-helm/)

### Administrator install Gateway API gateway implementation

Through the Marketplace provided by Rainbond, the GatewayAPI will come out of three apps, first with GatewayAPI-Base, and then with GatewayAPI-Envoy or Gateway-Nginx, both of which can be installed.

![](https://static.goodrain.com/wechat/gateway-api-indexpth/3.png)

### Administrators configure Gateway API resources

Click on the editor of the `Platform Administration/Extension/Capability` to configure Gateway and GatewayClass resources.

![](https://static.goodrain.com/wechat/gateway-api-indexpth/4.png)

### Developer Configure Business Routes

The developer configures the gateway in its own development app. If multiple gateways are installed at the same time, you can first select the gateway type and then configure the HTTPRoute field via the interface.

![](https://static.goodrain.com/wechat/gateway-api-indexpth/5.png)

**Supplemental：**

- The current version of Rainbod only supports HTTPRoute, other types of Route are temporarily unsupported;

- Only Envoy and Nginx gateways can be installed from the Rainbow Marketplace. Rainbod is required to support more gateway;

- Reference to：[Gateway API plugin production practice for Rainbond (https://www.rainbond.com/blog/gatewayapi).
