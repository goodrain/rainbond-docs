---
title: "Spring Cloud 微服务与 Service Mesh 的融合"
description: "讲解Spring Cloud微服务与Rainbond原生Service Mesh微服务如何融合" 
---

### 概述

这篇文档，着重解决一个问题：Spring Cloud 融合于 Rainbond 原生 Service Mesh 的正确姿势是什么样子的。

Rainbond 原生支持 Service Mesh 微服务架构。也就是说，无论原来是什么，只要部署在 Rainbond 上，那么就天然的成为了 Service Mesh 微服务。这也是 Service Mesh 微服务架构的一大特点：对原应用无侵入。

Spring Cloud 部署在 Rainbond 上后，整套业务即是完整的 Spring Cloud 微服务，又是一套 Service Mesh 微服务。那么如何使业务系统即保留了原有 Spring Cloud 微服务架构的特点，又能享受到 Service Mesh 带来的种种好处呢？这就涉及到了Spring Cloud 微服务与 Service Mesh 的融合。

融合的核心思想，就是 Spring Cloud 框架维护的功能，保持不变； Spring Cloud 框架无法维护的功能，交给 Service Mesh 和 Rainbond。

### Spring Cloud 不维护什么

我不会去深入讨论 Spring Cloud 微服务框架都维护了什么，这样的帖子网上有很多。

在这里，我想说明的是，当读者选择将自己原有的 Spring Cloud 微服务部署在 Rainbond 时，有哪些工作应该由 Rainbond 来完成。

#### 向 eureka 的注册

eureka 注册中心，是 Spring Cloud 微服务框架中，标准的注册中心解决方案。微服务框架中的 `Service provider(服务提供者)` 将自己的服务地址注册于 eureka 中，供 `Service consumer（服务消费者）` 远程调用。这种服务注册与发现的机制，是微服务架构中为了将原来的一站式服务拆解为若干个独立的服务并相互解耦，却又能相互交互所设计的。基于这种机制，所有的 Spring Cloud 微服务组件，可以动态的获悉自己需要的 `Service Provider` 的服务地址；也可以摇身一变，将自己注册为 `Service Provider` 对其他组件提供服务。

然而，就是这么一种灵活的服务注册/发现机制，却不会维护其它服务组件向 eureka 自身注册这一动作。向 eureka 注册的地址，往往是在配置文件里配置的，例如码云6K+星Spring Cloud项目 [PIG后台管理框架](https://gitee.com/log4j/pig) 中，设定的 eureka 注册方式如下：

https://gitee.com/log4j/pig/blob/master/pig-auth/src/main/resources/bootstrap.yml

```bash
# 注册中心配置
eureka:
  instance:
    prefer-ip-address: true
  client:
    service-url:
      defaultZone: http://pig:pig@pig-eureka:8761/eureka/
```



Rainbond 中需要将域名 `pig-eureka` 解析为 `127.0.0.1`，借助 Rainbond 自带的 **出口网络治理插件** ，即可完成这个操作：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-merge/spring-cloud-merge-3.png" title="实现域名解析" width="100%" />


在 Rainbond 中，可以借助于依赖关系，将微服务组件和 eureka 连接起来，帮助 Spring Cloud 完成注册这一动作：

- eureka 本身开启端口对内服务，向 Rainbond 平台完成自身 Service Mesh 层的服务注册

- 其它微服务组件通过依赖关系连接 eureka ，即可在不做任何变更的情况下，完成向 eureka 的服务注册以及服务订阅

> **出口网络治理插件** 默认将下游应用的 **Domains** 中指定的域名，解析到 `127.0.0.1`。

#### 对接各类中间件

一套完整的 Spring Cloud 微服务体系中，必然会采用多种数据中间件。以 PIG 为例，搭配使用 MySQL 作为数据存储、 REDIS 作为缓存。而在 Spring Cloud 中，这类中间件的对接方式也是通过配置文件配置的。并不会在微服务框架中有其它的注册机制。那么同理可以由 Rainbond 的依赖关系来将微服务与服务中间件连接起来。

我们推荐使用 **环境变量** 来定义 **pig-db** **redis** 的连接信息。在 [配置文件](https://gitee.com/liu_shuai2573/pig/blob/master/pig-config/src/main/resources/config/application-dev.yml) 中，需要作出如下声明:

```yaml
#Mysql相关
jdbc:
  name: ${MYSQL_USER}
  passwd: ${MYSQL_PASSWORD}
  host: ${MYSQL_HOST}
  port: ${MYSQL_PORT}
  database: ${MYSQL_DATABASE}

# Spring 相关
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-merge/spring-cloud-merge-1.png" title="对接中间件" width="100%" />

#### 服务组件启动顺序

Spring Cloud 微服务组件的启动顺序是比较重要的，一个组件在所依赖的服务没有启动前自行启动，是可能引起错误的。Spring Cloud 微服务框架本身不会维护服务组件的启动顺序，这一问题可以由 Rainbond 来解决。

Rainbond 支持了基于依赖关系的启动顺序控制。启动先后逻辑为被依赖的服务先启动，只有当前服务所依赖的服务全部正常启动后，才会开始启动流程。



### Spring Cloud 适配 Rainbond

为了将 Spring Cloud 更好的融入到 Rainbond 的体系中来，建议使用下面的配置来进行适配：

#### 注册IP

在保留了 eureka 这种 Spring Cloud 原生的服务注册发现机制的前提下，我们需要所有的微服务组件组册自己的真实IP作为服务地址。微服务组件间的组网策略，Rainbond 会自行解决，关键配置类比如下：

https://gitee.com/log4j/pig/blob/master/pig-auth/src/main/resources/bootstrap.yml

```bash

# 注册中心配置
eureka:
  instance:
    prefer-ip-address: true

```

#### 心跳检测与快速下线

Rainbond 支持每个微服务组件的全生命周期管理。在我们对某个组件进行配置并点击更新后，我们希望在 eureka 中，在新实例上线后，已经被关闭销毁的旧实例可以快速下线，确保注册中心中的服务注册地址没有不可用项。关键配置如下：

```bash
# eureka server配置
eureka:
  server:
    enable-self-preservation: false #关闭自我保护
    eviction-interval-timer-in-ms: 4000 #清理间隔（单位毫秒，默认是60*1000）
```

```bash
# eureka client配置
eureka:
  instance:
    lease-expiration-duration-in-seconds: 30 #服务过期时间配置,超过这个时间没有接收到心跳EurekaServer就会将这个实例剔除
    lease-renewal-interval-in-seconds: 10 #服务刷新时间配置，每隔这个时间会主动心跳一次
```


上述配置适用于于测试场景以及调试场景。如果服务已经趋于稳定，并决定应用于生产环境，则建议自行设置合适的配置方案。
