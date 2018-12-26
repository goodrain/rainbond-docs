---
title: 创建一个微服务架构
summary: 创建一个微服务架构
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、 概述

说到微服务架构，无法回避的一个话题就是服务注册与服务发现。每种微服务架构都会有自己的服务注册与发现的机制，比如 `Spring Cloud` 的 `Eurka`注册中心，`Dubbo` 则使用 `zookeeper`来实现。

`Rainbond` 深度整合 `ServiceMesh` 微服务架构，也自然具备一套完整的服务注册与发现机制。利用 `Rainbond`创建一个微服务架构，可以认为是将已经细化分割的各个服务组件，按照平台提供的服务注册与发现机制关联起来的过程。

从广义上来说，只要是部署在 `Rainbond`上的应用，并在服务组件之间建立了依赖关系，就可以认为是一个基于 `ServiceMesh`的微服务架构。

## 二、 流程

### 2.1 服务组件的部署

部署于`Rainbond`上的一个完整的应用，多数情况下会包含数个服务组件。比如一个WEB服务，除了暴露给用户访问的WEB应用外，都还会搭配 `MySQL`等数据库用于数据的存储，还会部署 `REDIS` 等中间件实现缓存功能。

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/whatisapp.png" width="80%" />

​	那么如何将这些服务组件部署到 `Rainbond` 呢？我们提供以下方式：

- [源码构建](/docs/v5.0/user-manual/app-creation/way-of-creation.html#1) 适用的场景很广泛，尤其适用于还没有容器化的服务以及用户自己开发的业务。我们提供一个[示例](/docs/dev/user-manual/app-creation/creation-process.html#1)供用户参考。
- [docker镜像构建](/docs/dev/user-manual/app-creation/way-of-creation.html#2-docker) 支持由docker镜像进行部署，适用于已经容器化的服务，比如 [Docker Hub](hub.docker.com) 可以获取到的各种开发完备的镜像。
- [从应用市场安装](/docs/dev/user-manual/app-creation/way-of-creation.html#3) 我们为用户提供了应用市场的概念。区别于镜像市场，应用市场中的应用，经过好雨科技技术人员的精心制作，可以通过一键部署的方式，快速将一个完整的应用部署起来，快速应用于使用场景。



### 2.2  创建依赖关系

在 `Rainbond`平台中，服务注册与服务发现的具体体现，就是依赖关系。通过依赖关系的建立，可以将需要相互通信的组件连接起来，并通过新版rbd-gateway组件实现 [访问控制](/docs/dev/user-manual/gateway/traffic-control.html) 与 [证书管理](/docs/dev/user-manual/gateway/cert-management.html) 等高级功能。

建立依赖关系，请参考 [添加服务依赖](/docs/dev/user-manual/app-manage/service-manage/service-rely.html)。

## 三、 成果

在将一套完整的业务，完全拆分微服务组件部署于Rainbond后 ，我们将相应的依赖关系一一建立起来，我们就得到了基于 `ServiceMesh` 的微服务架构。效果如下：

<center>
<img src="https://static.goodrain.com/images/docs/3.7/microservice/service-mesh/sockshop.gif" style="border:1px solid #eee;width:85%">
</center>

希望了解这个示例，请参考[ServiceMesh微服务架构电商案例
](/docs/dev/microservice/service-mesh/use-case.html)

##四、 兼容其他微服务架构

支持 [Spring Cloud](/docs/dev/microservice/spring-cloud/spring-cloud.html) 

支持 [Dubbo](/docs/dev/microservice/dubbo/dubbo-overview.html)

支持 [Kong](/docs/dev/microservice/kong/kong.html)