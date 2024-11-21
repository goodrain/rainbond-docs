# Spring Cloud Microservice Governance Mode

In constructing and managing distribution systems, Spring Cloud is a widely used microservice framework that provides a powerful set of tools and libraries for the development, deployment and management of cloud origin applications.

The construction and maintenance of distribution systems has become more complex with the emergence of micro-service structures.In order to meet this challenge, **Rainbond launched a Spring Cloud governance model** that provides developers with a powerful set of tools that make it easier to build, deploy and manage microservices and make it easier for developers to construct stable, scalable and high-performance microservice applications.

## Main features

### Registration and discovery of services

With Rainbond Spring Cloud governance mode, components can automatically register themselves with the registration center, without developer configuring the registration center address.This mode enables microservices to dynamically identify and communicate without requiring hard-coded service addresses.When a new microservice instance starts or when old instance is offline, the registered centre automatically updates the list of available instances of service to ensure that available services are always found.

### Data control

In order to prevent malfunctioning microservices from having an impact on the system, we allow the developer to define circuit breakers, which can quickly melt downgrade when a microservice fails, or delays, in order to maintain system availability.This is a powerful mechanism for tolerance and helps to prevent the proliferation of failures.

- **Limit**：controls every microservice instance with **max QPS** or **Maximum threads**. ： prevents too many requests from reducing performance or failing.

- **Melting breaking**：melting breakers automatically support multiple smelting strategies based on **abnormal proportions,** \*\*\*/ or **response time**, early discovery, smelting service and avoiding the collapse of the entire business system by a service provider.

![限流](https://static.goodrain.com/docs/enterprise-app/microservices/11.png)

- **Observability**

![可观测](https://static.goodrain.com/docs/enterprise-app/microservices/12.png)

### Configuration management

Allows you to configure centralize management in order to easily modify and deploy configurations.It supports distribution configuration and version control, ensuring that microservices are properly configured in different settings.This makes maintenance and update of the application configuration easier.

### API Gateway

Rainbond provides a powerful API gateway, allowing developers to define routing rules, request forwarding, and filters.This helps to centralize the management of microservice entry points and provides security, surveillance and traffic control.The API gateway can serve as the front end of the microservice, implementing the requested route, load balance and security validation.

- **Visualization**：simplifies the administration with visualizable interface configuration routing rules.

![可视化配置](https://static.goodrain.com/docs/enterprise-app/microservices/9.png)

- **Profile Configuration**：meets more complex routing requirements through custom routing rules for configuration files.

![配置文件配置](https://static.goodrain.com/docs/enterprise-app/microservices/10.png)

### Monitoring and tracking

Rainbond provides a link tracking capability that enables developers to monitor microservices performance in real time, identify problems and troubleshooting.This is essential for maintaining and optimizing microservice applications.By tracking the request path and performance data, you can better understand the interactions between microservices and thus improve the reliability of the system.

![追踪](https://static.goodrain.com/docs/enterprise-app/microservices/13.png)

### Warnings

Rainbond provides a strong warning capability to trigger alerts based on performance indicators, log data and anomalies.This has made it possible to identify and address problems in a timely manner and has helped to ensure the stability and high availability of the system.

- **Warning Configuration**：By configuring warning rules, you can define when a warning is triggered.Support multiple conditions such as total requests, average response time, successful requests, unusual requests, passages, rejections, etc.And you can configure trigger alert messengers, warn recipients, warn receiving groups and warn receiving channels.

- **Warning List**：views and manages triggering warnings to take appropriate measures.

![告警列表](https://static.goodrain.com/docs/enterprise-app/microservices/31.png)

With Rainbond Spring Cloud governance mode, you can build, manage, and monitor microservice structures easily, improving the availability and performance of applications.This governance model provides strong support for modern, cloud-born application development, ensuring that applications maintain a high level of reliability in different contexts.

## Manual

### 1. Determine your spring cloud version consistency

您必须确定您的项目的版本一致性，否则将可能部分功能失效，例如熔断限流等，如果您不清楚你的版本，您可以查看：https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E
如果不确定，您可以使用如下版本。

```yaml
<spring-cloud-version>Hoxton.SR12</spring-cloud-version>
<spring-cloud-alibaba-version>2.2.7.RELEASE</spring-cloud-alibaba-version>
<spring-boot-version>2.3.12.RELEASE</spring-boot-version>
```

### 2. Add your gateway project to dependencies as follows.

- sentinel-gateway limit dependency

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
  </dependency>
```

- nacos Remote Configuration Dependencies

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-naco-config</artifactId>
  </dependency>
```

- sentinel limit rules perpetuate nacos-based dependence

```yaml
  <dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-database-nacos</artifactId>
  </dependency>
```

- Nacos Registration Center Dependencies

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacs-discovery</artifactId>
  </dependency>
```

### Increased reliance on generic projects as follows

- Nacos Profile Dependencies

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-naco-config</artifactId>
  </dependency>
```

- sentinel limit rules perpetuate nacos-based dependence

```yaml
  <dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-database-nacos</artifactId>
  </dependency>
```

- Sentinel Limit Client Dependencies

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
  </dependency>
```

- Nacos Registration Center Dependencies

```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacs-discovery</artifactId>
  </dependency>
```

### 4. Switch governance mode

Go to app view, find governance mode, tap to toggle.Then select the spring cloud governance model.

![img.png](https://static.goodrain.com/docs/enterprise-app/microservices/QQ20231108-101133%402x.png)

Tap OK to toggle and rebuild all java projects under this application.

Verify that the
click on the service to govern, you can see that the traffic chart was generated.Proof that you have successfully switched to spring cloud mode of governance.

![流量图](https://static.goodrain.com/docs/enterprise-app/microservices/20.png)

### Configuration parameters

We have provided a rich configuration of parameters to support a limited flow strategy under different scenarios.Below are some common flow configuration parameters.

1. **Stream Rule Parameters**：
   - **resource(resource)**：Resource name that can be any string, generally protected resource path or method.
   - **grade(Limit Threshold)**：Flow Rule Type, including QPS Direct Limit, Constant Thread Direct Stream etc.
   - **count(limit flow threshold)**：limit flow threshold type is QPS threshold; limit flow threshold type is a combined thread threshold.
2. **Downgraded rule parameter**：
   - **resource(resource)**：Name of the downgraded resource, corresponding to the resource in the streaming rule.
   - **grade (downgrade threshold type)**：The type of rule to downgrade, including slow call ratio, abnormal ratio, etc. The following primary：`average response time downgrade`, `abnormal scale downgrade`,\`abnormal number downgrade\`\`
   - **count(downgrading threshold)**：The downgrade threshold type is RT and indicates the average response time threshold; grade is an abnormal proportion threshold; and the downgrade threshold type is an exception value.
   - **timeWindow（降级的时间窗口，单位为秒，默认值为 60）**：降级的时间窗口，表示滑动窗口的长度。
