# Microservice governance

## Why it is difficult to say how to do something good

To do a microservice, we need a lot of knowledge that we need to understand and learn from a few dimensions in Administrative：

- Basic functional level
  1. Parallel control & limit flow, avoid sudden traffic knocking out services
  2. Service registration and service discovery to ensure dynamic detection of nodes
  3. Load Balancer, need to distribute traffic according to the capacity of the node
  4. Timeout control, avoid wasting requests for timeout
  5. Melt off design, fast failure, secure troubleshooter ability

- Advanced Function Level
  1. Ask for authentication, make sure that each user can only access their own data
  2. Link tracking, used to understand the whole system and quickly locate specific requests
  3. Logs, for data collection and problem positioning
  4. Observability, no tweaks without measurement

For each of these points, it is very difficult for our back-end developers to capture and implement these points of knowledge into the business system.However, we can simplify this complex task by relying on frameworks already validated by mass flows, such as the **Rainbond Microservice Mode**.

## Use Rainbond to switch micro-service governance mode

### One click to switch governance mode

![img.png](https://static.goodrain.com/docs/enterprise-app/microservices/QQ20231108-101133%402x.png)

### Micro-service governance capacity

Rainbond Microservice Mode provides you with an easy way to achieve the above-mentioned complex microservice governance features.By using Rainbond, you can easily implement the settlement：

1. **Parallel Controls & Limits**：Rainbond provides built-in limit flow and concurrent control mechanisms that can be configured according to your needs to ensure that services are not hit by sudden traffic shocks.

2. **Registration and discovery of services**：Rainbond integrated service registration and discovery features to enable your microservice to automatically register and discover without manual configuration.

3. **Load Balancer**：Rainbond provides load equilibrium features that can be dynamically distributed to ensure high availability and performance based on the absorptive capacity of the node.

4. **Melting Device**：Rainbond integrated a breaker mode that can quickly fail and safeguard the resilience of the failure node.

5. **Request Authentication**：Rainbond supports authentication and authorization mechanisms, ensuring that each user can only access data with which they have permissions.

6. **Link Tracks and Logs**：Rainbond provides full link tracking and log collection to understand the system and quickly locate specific request issues.

7. **Observability**：Rainbond provides rich monitoring and measurement tools to help you monitor the performance of microservices in real time, identify problems and optimize them.

Through Rainbond Microservice Mode, you can easily apply these microservice governance functions that significantly reduce the complexity of microservice development and management, while improving the reliability and performance of applications.This model simplifies governance tasks and makes them more friendly to developers.
