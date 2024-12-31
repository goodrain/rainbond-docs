# Istio Microservice Governance Model

## Traffic Graph

When your application switches to Istio Microservice Governance mode, you will be able to easily access clear traffic maps to observe more clearly the distribution and direction of traffic.This allows you to learn more easily about internal traffic within the application in order to better optimize performance and troubleshooting.

![流量图](https://static.goodrain.com/docs/enterprise-app/microservices/2.png)

## Component Overview

You can clearly view the component overview of the protocol, request speed, response time, and error rates to provide you with a detailed insight into the performance and health status of the application.This information helps you better understand the behavior of your app, especially in high-load or unusual circumstances.

![组件概览](https://static.goodrain.com/docs/enterprise-app/microservices/3.png)

Information on traffic size, throughput rates and response times is also available, leading to a more comprehensive understanding of the application's performance.This helps you identify bottlenecks and bottlenecks in order to optimize targeting.

## Traffic Control

The Istio Microservice governance model provides good parallel control to avoid sudden traffic disruptions.Below are some key traffic control features：

### Limit Stream

With a limited flow strategy, you can control the maximum number of requests per micro-service instance to prevent too many requests from causing performance declines or system crashes.This helps to maintain the stability of the system.

We support HTTP stream below：

1. **1MaxPendingRequests** (TTP/1 max waiting requests)：controls the max number of requests pending connectivity in queue for HTTP/1.1 and HTTP2.Default value is 1024.

2. **2MaxRequests** (TRTP/2 max requests)：limits the maximum number of active requests sent to a destination, applicable to HTTP/1.1 and HTTP2.Default value is 1024.

3. **maxRequestsPerConnection** (maximum number of requests per connection)：determines the maximum number of requests that each connection can handle.Setting it to 1 will disable HTTP Keepalive, while default value is 0 for unlimited maximum 2^29.

4. **maxRetries** (maximum number of retrips)：specifies the maximum number of retries for all hosts in a cluster at a given time, default is 2^32-1.

5. **idleTimeout** (idle timeout time)：defines the upstream connection pool when idle timeout when no active request exists.If not set, this will be 1 hour by default.The connection will be closed after reaching this idle timeout, especially for HTTP/2 connections, and will be sent to ensure that the connection is safely closed.

6. **h2UpgradePolicy** (TRTP/2 Upgrading Policy)：specifies whether HTTP 1.1 is upgraded to HTTP 2 connections, operating according to the specified policy.

7. **useClientProtocol** (using client protocol)：, if set to true, will keep the protocol used by the client, rendering H2UpgradePolicy invalid, so client connection will not be upgraded to HTTP2.

Our limit flow for the TCP is below

1. **maxConnections** (max connections)：controls the maximum HTTP1 or TCP connections to the target host.Default value is 2^32-1, allowing large numbers of connections.

2. **connectTimeout** (long connection time)：defines the timeout of TCP connection to make sure the connection is established.You can use different time units (e.g. 1 hour, 1 min, 1 seconds, 1 milliseconds) to set timeout length, default to 10 seconds.

3. **tcpKeepalive** (TCP Keepalive)：If this option is enabled, TCP Keepalive will be enabled on Socket to ensure that idle connections remain active for long periods of time.

4. **maxConnectionDuration** (maximum connection duration)：This rule is used to set the maximum duration of the connection, i.e. the time interval between the connection starting from creation.If not set, there will be no maximum duration.When the maximum duration is reached, the connection will be closed.The duration must be at least 1 m2.

These configurations help you to fine-tune your network connection and request processing in order to meet your needs.

![限流](https://static.goodrain.com/docs/enterprise-app/microservices/32.png)

### Melt

A melting breaker is a mechanism used to protect the system from continuous error requests

1. **Separating error type**：deals with local failures and upstream service errors, respectively.This is useful for calculating unusual state based on local failures and upstream service errors.

2. **Continuous error count**：you can set the continuous error count required to trigger exclusion action.For example, when a certain type of error occurs five times in a row, the exclusion triggers.

3. **Exclude times**：defines the minimum time to exclude hosts, in order to prevent the system from frequently excluding hosts.

4. **Maximum exclusion percentage**：provides for the maximum percentage of upstream service hosts to be excluded from the load equilibrium pool.

5. **Minimum Health Perpercent**：only enables exception detection if the health host percentage in the load equilibrium pool is below the specified threshold.

These settings help to protect the system from incorrect requests and enhance the system's availability and stability.

A melting breaker allows you to quickly fail, and when a microservice has a malfunction or a decline in performance, it can automatically cut off requests for the service, thereby preventing the malfunction from spreading.This is a powerful miscarriage mechanism that increases the system's availability.

## Security

The Istio Microservice governance model provides powerful security features including authentication, authorization, and encryption to ensure secure communications between your microservices.This helps to prevent unauthorized access and data leakage, and enhances the security and credibility of the system.

![安全性](https://static.goodrain.com/docs/enterprise-app/microservices/7.png)

The Istio Microservice governance model provides you with greater control, observability, and security, which helps to better manage and optimize your microservice architecture.It simplifies the governance task and provides a wealth of functionality and insights that will make it easier for you to cope with the complex micro-service environment and improve the stability and performance of the application.Switch to Istio mode to make governance simpler so you can better monitor and control your microservice applications.
