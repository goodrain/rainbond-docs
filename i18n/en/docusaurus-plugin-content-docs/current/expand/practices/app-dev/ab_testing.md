---
title: Component A/B testing based on Rainbond
Description: Detailed explanation of component A/B testing scheme based on Rainbond
weight: 40
---

## I. Overview

AB testing is to make two (A/B) or more (A/B/n) versions of the application, and in the same time dimension, let the same (similar) visitor groups (target groups) randomly visit these version, collect user experience data and business data of each group, and finally analyze and evaluate the best version, which is officially adopted; in software development, product requirements are realized through a variety of technical means, and A/B testing experiments provide a comprehensive value approach to assessing the impact of new features on customer behavior.

Implemented into the technology itself, A/B testing pays attention to providing different services for different clients, and the two differences here are very critical.

* different clients

  Generally, clients are classified in some way, such as HTTP protocol, which usually sets Header request headers and cookies according to user information to distinguish different clients.

* different services

  Generally refers to different versions of the application, which are different components in the Rainbond platform.

**Rainbond currently supports the A/B testing practice of the HTTP protocol, which is currently the most widely used protocol.**

Services need to be A/B tested, and it is necessary to distinguish whether they belong to internal services or external services.The A/B testing features of internal services are provided by the ServiceMesh layer, and external services are provided by [application gateway](/docs/use-manual/get-start/concept/gateway/).


## 2. A/B testing of external services

A/B testing of external services is the most commonly used scenario, because external services are services directly facing users; business programs need to inject user identification information into cookies through certain business strategies or into Header through mobile APPs In the request header; the Rainbond application gateway can identify these identifiers and match the corresponding service to the user according to the policy configured by the user.


### Preconditions

1. The two versions of the test component in operation are simulated as two versions of the same business program. Refer to [source code to build](/docs/use-manual/component-create/language-support/html) to directly build [of the project](https://github.com/Aaron-23/teststatic) (here use branches master and devel to distinguish different versions),
2. Have a test domain name to which both components are bound.

### Steps

- Method one：identifies the client through the Header request header

Via **Gateway -> Access Policy Management** Add the following two HTTP Access Policies：

| domain name           | request header | Serve              |
| --------------------- | -------------- | ------------------ |
| www.test.goodrain.com | none           | External service 1 |
| www.test.goodrain.com | user:test      | External service 2 |

This method is suitable for the server under the C/S architecture, such as the interaction between the mobile APP and the API.

- Method：Identifying the client through a cookie

Via **Gateway -> Access Policy Management** Add the following two HTTP Access Policies：

| domain name           | cookies   | Serve              |
| --------------------- | --------- | ------------------ |
| www.test.goodrain.com | none      | External service 1 |
| www.test.goodrain.com | user=test | External service 2 |

This method is suitable for web services and other HTTP request services.

### Show results

Simulate requests for external services, please note that the domain name should be correctly set to DNS resolution or local HOST file settings

- When identifying the client through the Header request header


```bash
# Simulate request to external service 1
$ curl www.test.goodrain.com
<h1>hello ~ this is V1</h1>
# Simulate request to external service 2
$ curl -H user:test www.test.goodrain.com
<h1>hello ~ this is V2</h1>
```


- When the client is identified by a cookie

```bash
# Simulate request to external service 1
$ curl www.test.goodrain.com
<h1>hello ~ this is V1</h1>
# Simulate request to external service 2
$ curl --cookie "user=test" www.test.goodrain.com
<h1>hello ~ this is V2</h1>
```


## 3. A/B testing of internal services

Internal services do not directly serve users, but generally provide API support for other services. Its communication path does not pass through the application gateway, so A/B control cannot be performed through the application gateway. All services running on Rainbond are service-oriented by default. It is managed in a way, and the service communication governance is carried out with the governance idea of ServiceMesh. A/B testing is one of the functions of service governance.

### Preconditions

1. Have two versions of the test components used in the A/B test of the above external service;
2. Simulation`External service` Request `Internal service` The communication address must be the host name (top-level domain name), such as requesting the user service API, the request address: `http://user/***`, the Rainbond environment will resolve the host by default Name (top-level domain name), we usually recommend the way to read the communication address and port environment variables, only need to set [connection information](/docs/micro-service/service-mesh/connection_env) variables on the internal service.


### Steps

Above, we have created `internal services 1` and `internal services 2` components in advance. The communication between internal services of the Rainbond platform needs to establish dependencies to complete internal service registration and service discovery. In the current state, `internal services 2` It is still in an independent state. Before adding it to the subordinate dependencies of `external services 1` , we need to know such a problem：

The two internal services are essentially the same service and use the same service port. If there is a port conflict by default, they cannot be relied on at the same time. At this time, we need to open the network working on layer 7 for`external service 1` . Governance plug-in (provided by the platform by default), the working principle of the plug-in will reuse port 80, and implement advanced routing through HTTP elements such as different domain names to select the lower-level dependent services to be used.

1. `External service 1` Depends on `Internal service 2` , the operation mode refers to [Service communication](/docs/micro-service/service-mesh/regist_and_discover),
2. Open the export network management plug-in for `external services 1`,

3. Configuring routing policies is similar to the application gateway-based configuration method, except that only header-based processing is supported.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/best-practices/ab_testing/ab.png)

### Show results

After the above configuration is completed, the internal service also has the ability of A/B testing, and the interface processed by the header will present different content when called.



## data feedback

The most critical link in the A/B testing process is data feedback and timely adjustment of strategies; the business-level [performance analysis monitoring](/docs/use-manual/team-manage/plugin-manage/tcm-plugin/) provided by Rainbond can provide you with real-time request analysis to assist your decision-making; in addition, If you have your own monitoring method, please adjust the strategy reasonably according to your monitoring results. All the above control strategies can be modified and take effect dynamically.

## Defects and improvement plans

1. At present, the A/B test of internal services needs to configure each service, and global configuration is not supported for the time being. Subsequent versions will support global configuration of ServiceMesh.
2. At present, there is no process control for A/B testing, and the process will highlight iteration in subsequent versions.
3. Automatic coordination of monitoring data and testing process to realize automated A/B testing

**You may also want to read：**

[Rainbond-based rolling release, grayscale release and blue-green release practice](./app_publishing)
