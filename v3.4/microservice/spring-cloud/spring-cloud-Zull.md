---
title: Zull组件
summary: 讲解如何搭建Zull
toc: false
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="spring-cloud.html"><button class="filter-button ">1. 概述</button></a>
    <a href="spring-cloud-Eureka.html"><button class="filter-button">2. Eureka组件</button></a>
    <a href="spring-cloud-Hystrix.html"><button class="filter-button">3. Hystrix组件</button></a>
    <a href="spring-cloud-Config.html"><button class="filter-button">4. Config组件</button></a>
    <a href="spring-cloud-Zull.html"><button class="filter-button current"><strong>5. Zull组件</strong></button></a>
</div>

<div id="toc"></div>

## 组件介绍

​	在微服务架构中，后端服务往往不直接开放给调用端，而是通过一个API网关根据请求的url，路由到相应的服务。当添加API网关后，在第三方调用端和服务提供方之间就创建了一面墙，这面墙直接与调用方通信进行权限控制，后将请求均衡分发给后台服务端。而用来进行代理调度的组件就是Zull。

## 项目描述

​	在项目中，只有Zull提供对外访问，Gateway通过请求的url的不同，将请求调度到不同的后端服务

<div align=center>
    <img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/acp/docs/bestpractice/microservice/zull-1.png" width="75%" height="75%">
</div>

## 部署到云帮

### Gateway

1、添加依赖

```
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-zuul</artifactId>
</dependency>

```

引入`spring-cloud-starter-zuul`包

2、配置文件

```
spring.application.name=gateway-service-zuul
server.port=8888

#这里的配置表示，访问/producer/** 直接重定向到http://域名/**
zuul.routes.baidu.path=/producer/**
zuul.routes.baidu.url=http://域名/

```

3、启动类

```
@SpringBootApplication
@EnableZuulProxy
public class GatewayServiceZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceZuulApplication.class, args);
	}
}

```

启动类添加`@EnableZuulProxy`，支持网关路由。	

4、测试

启动`gateway-service-zuul-simple`项目，先输入：`http://localhost:8888/producer/hello?name=neo`

返回：`hello neo，this is first messge`

说明调度成功。