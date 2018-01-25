---
title: Spring Cloud 微服务架构
summary: 讲解如何搭建spring cloud微服务架构
toc: false
asciicast: true
---
<div class="filters filters-big clearfix">
    <a href="spring-cloud.html"><button class="filter-button current"><strong>1. 概述</strong></button></a>
    <a href="spring-cloud-Eureka.html"><button class="filter-button">2. Eureka组件</button></a>
    <a href="spring-cloud-Hystrix.html"><button class="filter-button">3. Hystrix组件</button></a>
    <a href="spring-cloud-Config.html"><button class="filter-button">4. Config组件</button></a>
    <a href="spring-cloud-Zull.html"><button class="filter-button">5. Zull组件</button></a>
</div>

<div id="toc"></div>

##概述

Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器等，都可以用Spring Boot的开发风格做到一键启动和部署。Spring并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。

微服务是可以独立部署、水平扩展、独立访问（或者有独立的数据库）的服务单元，springcloud就是用来管理这些微服务的，使用了微服务架构，项目的数量会非常多，而springcloud需要管理好这些微服务，自然需要很多的组件来帮忙。

| 核心组件有：              |               |
| :---------------------- | :-------------|
|    Spring Cloud Eureka  |    注册中心     |
|    Spring Cloud Config  |	配置中心        |
|    Spring Cloud Hystrix | 	断路器      |
|    Spring Cloud Zuul    |	代理、网关       |
|    Spring Cloud Feign   |	web服务客户端    |
|    ...                                   |

   
    接下来就通过几个demo来了解 Spring Cloud如何一步步构建起来

本篇最佳实践示例源码：
[源码](https://github.com/goodrain-apps/spring-cloud-demo.git)












