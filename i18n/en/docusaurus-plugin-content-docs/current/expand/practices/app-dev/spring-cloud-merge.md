---
title: "Integration of Spring Cloud Microservices and Service Mesh"
description: "Explain how Spring Cloud microservices and Rainbond native Service Mesh microservices integrate"
---

### Overview

This document focuses on solving a problem：What is the correct posture for Spring Cloud to integrate with Rainbond's native Service Mesh.

Rainbond natively supports the Service Mesh microservice architecture.That is to say, no matter what it is, as long as it is deployed on Rainbond, it will naturally become a Service Mesh microservice.This is also a major feature of the Service Mesh：architecture, which is non-intrusive to the original application.

After Spring Cloud is deployed on Rainbond, the entire business is a complete Spring Cloud microservice and a set of Service Mesh microservices.So how to make the business system not only retain the characteristics of the original Spring Cloud microservice architecture, but also enjoy the various benefits brought by Service Mesh?This involves the integration of Spring Cloud microservices and Service Mesh.

The core idea of integration is that the functions maintained by the Spring Cloud framework remain unchanged; the functions that cannot be maintained by the Spring Cloud framework are handed over to Service Mesh and Rainbond.

### What Spring Cloud does not maintain

I won't go into depth about what the Spring Cloud microservices framework maintains, there are plenty of posts like this on the web.

Here, I want to explain what tasks should be done by Rainbond when readers choose to deploy their original Spring Cloud microservices on Rainbond.

#### registration with eureka

The eureka registry is the standard registry solution in the Spring Cloud microservice framework.`Service provider (service provider)` in the microservice framework registers its service address in eureka for `Service consumer (service consumer)` to call remotely.This service registration and discovery mechanism is designed in the microservice architecture to disassemble the original one-stop service into several independent services and decouple them from each other, but they can interact with each other.Based on this mechanism, all Spring Cloud microservice components can dynamically learn the service address of `Service Provider` they need; they can also change themselves and register themselves as `Service Provider` to provide services to other components.

However, such a flexible service registration/discovery mechanism does not maintain the action of other service components registering with eureka itself.The address registered with eureka is often configured in the configuration file. For example, in the code cloud 6K+star Spring Cloud project [PIG background management framework](https://gitee.com/log4j/pig) , the eureka registration method is set as follows：

https://gitee.com/log4j/pig/blob/master/pig-auth/src/main/resources/bootstrap.yml

```bash
# Registry configuration
eureka:
  instance:
    prefer-ip-address: true
  client:
    service-url:
      defaultZone: http://pig:pig@pig-eureka:8761/eureka/
```



In Rainbond, the domain name `pig-eureka` needs to be resolved to `127.0.0.1`, and this operation can be done with the help of the **-exit network management plug-in** that comes with Rainbond：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-merge/spring-cloud-merge-3.png" title="Implement domain name resolution" width="100%" />


In：, you can use dependencies to connect microservice components and eureka to help Spring Cloud complete the registration.

- eureka itself opens the port inbound service, and completes the service registration of its own Service Mesh layer with the Rainbond platform

- Other microservice components connect to eureka through dependencies, which can complete service registration and service subscription to eureka without making any changes

> **The egress network management plug-in** resolves the domain name specified in **Domains** of the downstream application to `127.0.0.1`by default.

#### Interfacing with various middleware

In a complete Spring Cloud microservice system, a variety of data middleware will inevitably be used.Take PIG as an example, use MySQL as data storage and REDIS as cache.In Spring Cloud, the connection method of such middleware is also configured through configuration files.There is no other registration mechanism in the microservice framework.In the same way, Rainbond's dependencies can be used to connect microservices with service middleware.

We recommend using **environment variable** to define connection information for **pig-db** **redis**.In [profile](https://gitee.com/liu_shuai2573/pig/blob/master/pig-config/src/main/resources/config/application-dev.yml) , the following statement needs to be made:

```yaml
#Mysql related
jdbc:
  name: ${MYSQL_USER}
  passwd: ${MYSQL_PASSWORD}
  host: ${MYSQL_HOST}
  port: ${MYSQL_PORT}
  database: ${MYSQL_DATABASE}

# Spring related
spring:
  redis:
    password: ${REDIS_PASS}
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/micro/spring_cloud/spring-cloud-merge/spring-cloud-merge-1.png" title="Docking middleware" width="100%" />

#### Service Component Startup Sequence

The startup sequence of Spring Cloud microservice components is more important. A component starts by itself before the service it depends on is started, which may cause errors.The Spring Cloud microservice framework itself does not maintain the startup order of service components, which can be solved by Rainbond.

Rainbond supports dependency-based boot order control.The startup sequence logic is that the dependent services are started first, and the startup process will only start after the services that the current service depends on are all started normally.



### Spring Cloud adapts to Rainbond

In order to better integrate Spring Cloud into the Rainbond system, it is recommended to use the following configuration for adaptation：

#### Register IP

On the premise of retaining the Spring Cloud's native service registration discovery mechanism, eureka, we need all microservice components to register their own real IPs as service addresses.The networking strategy between microservice components, Rainbond will solve it by itself, and the key configuration types are as follows：

https://gitee.com/log4j/pig/blob/master/pig-auth/src/main/resources/bootstrap.yml

```bash

# Registry configuration
eureka:
  instance:
    prefer-ip-address: true

```

#### Heartbeat detection and fast offline

Rainbond supports full lifecycle management of each microservice component.After we configure a component and click update, we hope that in eureka, after the new instance goes online, the old instance that has been shut down and destroyed can be quickly offline to ensure that the service registration address in the registry has no unavailable items.The key configuration is as follows：

```bash
# eureka server configuration
eureka:
  server:
    enable-self-preservation: false #Turn off self-protection
    eviction-interval-timer-in-ms: 4000 #Cleanup interval (in milliseconds, the default is 60*1000)
```

```bash
# eureka client configuration
eureka:
  instance:
    lease-expiration-duration-in-seconds: 30 #Service expiration time configuration, if no heartbeat is received after this time, EurekaServer will remove this instance
    lease-renewal-interval-in -seconds: 10 #Service refresh time configuration, heartbeat will be active every time
```


The above configuration is suitable for testing scenarios as well as debugging scenarios.If the service has stabilized and decided to apply it to the production environment, it is recommended to set up a suitable configuration scheme by yourself.
