---
title: Enterprise Level Gateway
description: API gateway enhancement description and use
keywords:
  - Clustering test
  - Description and use of cluster inspection function
---

Rainbod enterprise API gateway is enhanced to provide abundant features such as visualization, matching strategies, retrial mechanisms, traffic control, service discovery, load balance, multiprotocol support, and certificate management.Support flexible monitoring displays including QPS, error rates and average response time.There are strong routing controls and retrial mechanisms that support multiple matching strategies.Implementation of flow control and restriction of flows, supporting multiple service discovery mechanisms, including K8s and Nacos.Provides a flexible load equilibrium strategy, supports HTTP, TCP, and WebSocket.The certificate management system facilitates the management and application of certificates and automatically applies them to all routes under the domain name.

## Traffic Visualizations

Monitoring and visualization are important features in the API gateway, particularly with regard to key performance indicators such as QPS (query rate per second), error rate and average response time.Rainbond provides a more intuitive monitoring and management tool as an open source cloud application platform that displays these functions through refined sub-routes, teams and sub-applications.

1. **QPS Monitor：** Rainbond provides monitoring of QPS and allows you to learn about the frequency of API requests in real time.Using graphs, you can observe changes in QPS over time in order to adjust system resources or to optimize API design in a timely manner.

2. **Error rate monitoring：** Rainbond also includes an error rate display that helps to quickly locate and solve potential problems.Charts show changes in error rates to help you find exceptions in the services provided by the API.

3. **Average response time monitoring：** understands that average response time is one of the key indicators for assessing API performance.Rainbond can show changes in average response time to help you identify and solve potential performance bottlenecks.

4. **Distinguished：** Rainbond allows you to monitor different routes separately.This means that you can better optimize and manage different API endpoints by understanding the performance of each API route.

5. **Sub-teams and sub-apps showcase：** by displaying monitoring data for sub-teams and sub-applications, Rainbond provides a more meticulous monitoring view.This allows teams to focus on what they are responsible and not flooded with data from monitoring systems as a whole.
   ![流量纵览](https://static.goodrain.com/docs/enterprise-app/api-gateway/1.png)

## API Gateway Basic Capabilities

The powerful features of the Rainbond API gateway include a variety of matching strategies and retrial mechanisms that provide more meticulous routing control and greater stability of the system.

### Match Policy

1. **Matching：** Rainbod allows matching according to the requested path, which allows you to map different paths to different backend services or different handling.

2. **Methods match：** can be matched by the requested HTTP method (GET, POST, etc.) in order to apply different processing logic to different request methods.

3. **Headers match：** supports matching specific HTTP header information in the request, which is useful for situations where requests need to be routed according to the header.

4. **Cookie matching：** Rainbod allows matching of the requested Cookie information, which allows you to make more sophisticated routing controls based on Cookie's content.
   ![流量纵览](https://static.goodrain.com/docs/enterprise-app/api-gateway/4.png)

## Traffic Control and Limit

In Rainbond, the system is provided with more flexible and customizable traffic management mechanisms by enabling the API gateway through plugins to implement traffic control and restricted flow functions.

1. **Request limit：** Rainbond allows requests to be restricted by plugins to limit the number of requests contained in a request.This helps to prevent a user or application from sending large numbers of requests within a short period of time to protect the system from abuse.

2. **Connections Limit：** Plugins can also configure the number of connections to ensure that the system is not overwhelmed by too many connections.This helps to maintain the stability and availability of the system.

3. **Time period limit：** the Rainbond plugin provides the ability to set the number of requests within a certain time period.This allows you to adjust the flow control strategy to the system's peak and low turnaround time to better adapt to the system's load changes.

## Service discovery

Rainbond API gateway supports access to service information from different service discovery mechanisms, including Kubernetes (K8s), Nacos and others, as well as the introduction of third-party nodes.This has allowed for more flexibility in the management and use of services on the Rainbond platform.

### Service Discovery Mechanisms

1. **Kubernetes (K8s) support：** \*\* Rainbond integrated with Kubernetes and can access service information through K8s service discovery mechanisms.This allows applications running in the Kubernetes cluster to be found and proxy by Rainbond API gateway dynamics.

2. **Nacos supports：** Nacos as an open source service discovery and configuration management system, Rainbond provides support to Nacos and allows access to service information from Nacos for integrated management in Rainbond environments.

3. **Third Party nodes support：** Rainbond API gateway that allows the introduction of third party node, i.e. external service.This means you can introduce services that are not running on the Rainbond platform into Rainbond for uniform management and proxy.

4. **Retry Mechanism** Rainbond API gateway supports an automatic request retry if a request fails.This helps to increase the system's tolerance for error, especially in cases of network instability.

![服务发现](https://static.goodrain.com/docs/enterprise-app/api-gateway/7.png)

## Load Balancer

Load equilibrium is a key technology used in distributed systems to balance network traffic and request burdens.In Rainbond, the load balance is achieved to ensure high availability, stability and performance of services.Rainbond provided multiple load equilibrium strategies to suit different application scenarios and needs.

1. **Round Robin：** is one of the simplest payload equilibrium policies that will make requests rotating to backend servers to ensure that each server receives equal access to requests.

2. **Weighted Round Robin：** allows different weights to be assigned to each backend server in order to take into account the performance and resources of each server when loading equilibrium.

3. **Minimum Connections (Least Connections)：** will send requests to servers with minimal connections to ensure that lighter servers are selected when loading is balanced.

4. **Weighted Least Connections：** is similar to weighted polls but assigned weights based on connections to take account of server performance.

5. **IP Hash：** Calculates hashes based on client IP addresses and distributes requests to backend servers.This ensures that the same IP requests are always routed to the same server, helping to keep the session consistent.

## Support multiple protocols

Support for multiple protocols means that the API gateway has the capacity to handle different communication protocols to suit various applications scenarios and needs.In Rainbond or other similar cloud native platforms, this multi-protocol support is designed to meet communications needs between different types of services and applications.

1. **HTTP protocol supports：** HTTP is the most common application protocol for communication between web applications.The API gateway can process and route HTTP requests, perform access control, authentication, authorization, etc.

2. **TCP protocols support：** Rainbond's API gateway to handle TCP, which is important for applications that require lower-level communication in the transmission layer.For example, TCP may need to be used in scenarios such as database connections.

3. **WebSocket protocol supports：** WebSocket protocol supports real-time two-way communications, usually for applications that require persistent connections, such as online chat, real-time notifications, etc.The API gateway in Rainbod can effectively handle and proxy WebSocket communications.

4. **The Flexible Protocol extension：** supports flexible protocol extensions to adapt to emerging communications protocols in the future.This flexibility is important for the evolving architecture of applications.

5. **Protocol conversion：** allows the API gateway to execute protocol conversions if required, converting one protocol request to another protocol.For example, convert HTTP requests to TCP requests, or vice versa.

By supporting multiple protocols, the API gateway can serve as a common access point, connecting different types of services and making the system more flexible and scalable.In this way, different applications can choose the protocol best suited to their communications needs, without fear of mismatches with other services.This has been very useful in building complex micro-service structures and diverse application scenarios.

## Certificate Management

Certificate management is one of the important features in the API gateway, especially in scenarios where secure communication is needed.Rainbond provides a well-developed certificate management system that enables users to manage and apply certificates to all routes under their domain names.

1. **Certificate Overview：** Rainbrond's Certificate Management System allows users to view all installed certificates' overview, including certificate name, issuer, expiration date, etc.This enables users to obtain a complete picture of the credentials used in the system.

2. **Automated Applications：** Rainbond offers the ability to apply certificates to all routes under a given domain name.This means that once a user adds or updates a certificate, the system automatically applies the new certificate to all routes associated with the certificate, without manual intervention.

3. **Certificate expiry time is presented in：** \*\* The certificate management system of Rainbond usually includes certificate expiry time displays that allow users to know which certificates are about to expire so that users can update or replace the certificate in a timely manner to ensure the security and proper functioning of the system.

4. **Certificate upload and import：** users can upload or import certificates via UI or command line tools.This allows users to use self-signed certificates or those obtained from other licensing agencies and to centralize the management of these certificates.

5. **Certificate binding：** Rainbond allows users to bind a given certificate to a specific domain, ensuring that only routing of associated domain names can use the certificate.This increases security and flexibility.

![证书](https://static.goodrain.com/docs/enterprise-app/api-gateway/9.png)
