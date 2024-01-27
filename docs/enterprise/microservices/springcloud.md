# Spring Cloud 微服务治理模式

在构建和管理分布式系统时，Spring Cloud 是一种广泛使用的微服务框架，它提供了一套强大的工具和库，用于开发、部署和管理云原生应用程序。

随着微服务架构的兴起，构建和维护分布式系统变得更加复杂。为了应对这一挑战，**Rainbond 推出了 Spring Cloud 治理模式**，为开发者提供了一组强大的工具，使微服务的构建、部署和管理变得更容易，使开发者能够更轻松地构建稳定、可伸缩和高性能的微服务应用程序。

## 主要功能
### 1. 服务注册与发现

通过 Rainbond 的 Spring Cloud 治理模式，组件可以自动向注册中心注册自己，无需开发者配置注册中心地址。这种模式使微服务能够动态地发现和通信，无需硬编码的服务地址。当新的微服务实例启动或旧的实例下线时，注册中心会自动更新服务的可用实例列表，确保始终能找到可用的服务。

### 2. 流量控制

为了防止故障的微服务对整个系统产生影响，我们允许开发者定义断路器，当某个微服务出现故障或延迟时，它可以快速熔断降级，从而保持系统的可用性。这是一种强大的容错机制，有助于防止故障扩散。

- **限流**：通过限流策略，可以控制每个微服务实例的**最大QPS**或者**最大线程数**，避免过多请求导致性能下降或故障。

- **熔断**：熔断器可自动支持多种熔断策略，按**异常比例**，**异常次数**或**响应时间**，提前发现，熔断服务，避免一个服务宕机拖垮整个业务体系。


![限流](https://static.goodrain.com/docs/enterprise-app/microservices/11.png)


- **可观测性** 实时监视微服务通过QPS和拒绝QPS，识别问题并进行故障排除。

![可观测](https://static.goodrain.com/docs/enterprise-app/microservices/12.png)

### 3. 配置管理

允许您将配置中心化管理，以便更轻松地修改和部署配置。它支持分布式配置和版本控制，确保微服务在不同环境中都能获得正确的配置。这使得应用程序配置的维护和更新变得更加便捷。

### 4. API 网关

Rainbond 提供了强大的 API 网关，允许开发者定义路由规则、请求转发和过滤器。这有助于集中管理微服务的入口点，提供安全性、监控和流量控制。API 网关可以充当微服务的前端，实现请求的路由、负载均衡以及安全验证。

- **可视化配置**：通过可视化界面配置路由规则，简化了管理工作。

![可视化配置](https://static.goodrain.com/docs/enterprise-app/microservices/9.png)

- **配置文件配置**：通过配置文件自定义路由规则，满足更复杂的路由需求。

![配置文件配置](https://static.goodrain.com/docs/enterprise-app/microservices/10.png)

### 5. 监控与追踪

Rainbond 提供了全链路追踪能力，使开发者能够实时监视微服务的性能、识别问题并进行故障排除。这对于维护和优化微服务应用程序至关重要。通过追踪请求的路径和性能数据，您可以更好地了解微服务之间的相互作用，从而提高系统的可靠性。

![追踪](https://static.goodrain.com/docs/enterprise-app/microservices/13.png)

### 6. 告警

Rainbond 提供了强大的告警能力，可根据性能指标、日志数据和异常情况来触发警报。这使得问题的及时发现和处理成为可能，有助于确保系统的稳定性和高可用性。

- **告警配置**：通过配置告警规则，可以定义何时触发告警。支持多种条件，比如总请求次数，平均响应时间，成功请求数，异常请求数，通过数，拒绝数等。并且可以配置触发告警发信人，告警接收人，告警接收组，告警接收渠道。

- **告警列表**：查看和管理触发的告警，以采取适当的措施。

![告警列表](https://static.goodrain.com/docs/enterprise-app/microservices/31.png)

通过 Rainbond 的 Spring Cloud 治理模式，您可以更轻松地构建、管理和监控微服务架构，提高应用程序的可用性和性能。这个治理模式为现代、云原生的应用程序开发提供了强大的支持，确保应用程序在不同情况下都能保持高度的可靠性。

## 使用手册
### 1. 确定您的spring cloud版本一致性
您必须确定您的项目的版本一致性，否则将可能部分功能失效，例如熔断限流等，如果您不清楚你的版本，您可以查看：https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E
如果不确定，您可以使用如下版本。
```yaml
<spring-cloud-version>Hoxton.SR12</spring-cloud-version>
<spring-cloud-alibaba-version>2.2.7.RELEASE</spring-cloud-alibaba-version>
<spring-boot-version>2.3.12.RELEASE</spring-boot-version>
```

### 2. 将您的网关项目增加如下依赖
- sentinel-gateway 限流依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
  </dependency>
```
- nacos远程配置依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
  </dependency>
  ```
- sentinel限流规则持久化nacos依赖
```yaml
  <dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-datasource-nacos</artifactId>
  </dependency>
  ```
- nacos注册中心依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>
  ```
### 3. 普通项目增加如下依赖

- Nacos 配置文件依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
  </dependency>
  ```
- sentinel限流规则持久化nacos依赖
```yaml
  <dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-datasource-nacos</artifactId>
  </dependency>
  ```
- Sentinel 限流客户端依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
  </dependency>
  ```
- nacos注册中心依赖
```yaml
  <dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>
  ```
### 4. 切换治理模式

前往应用视图，找到治理模式，点击切换。然后选择spring cloud治理模式。

![img.png](https://static.goodrain.com/docs/enterprise-app/microservices/QQ20231108-101133%402x.png)

切换完毕点击确定，然后将此应用下所有java项目全部重新构建。

验证是否生效
点击服务治理，您可以看到生成了流量图。证明您已经成功切换到spring cloud 治理模式。

![流量图](https://static.goodrain.com/docs/enterprise-app/microservices/20.png)

### 5. 配置参数
我们 提供了丰富的参数配置，以支持不同场景下的限流策略。以下是一些常见的 限流配置参数。

1. **流控规则参数**：
    - **resource（资源名）**：限流的资源名称，可以是任意字符串，一般为受保护的资源路径或方法名。
    - **grade（限流阈值类型）**：流控规则类型，包括 QPS 直接限流、并发线程数直接限流等
    - **count（限流阈值）**：限流阈值类型 为 QPS 时，表示 QPS 阈值；限流阈值类型 为并发线程数时，表示并发线程数阈值。
2. **降级规则参数**：
    - **resource（资源名）**：降级的资源名称，与流控规则中的 resource 相对应。
    - **grade（降级阈值类型）**：降级的规则类型，包括慢调用比例、异常比例等，有以下几种：`平均响应时间降级`, `异常比例降级`,`异常数降级`
    - **count（降级阈值）**：降级阈值类型 为 RT 时，表示平均响应时间阈值；grade 为异常比例时，表示异常比例阈值；降级阈值类型 为异常数时，表示异常数阈值。
    - **timeWindow（降级的时间窗口，单位为秒，默认值为 60）**：降级的时间窗口，表示滑动窗口的长度。