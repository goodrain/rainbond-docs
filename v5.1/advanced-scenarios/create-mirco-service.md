---
title: 创建一个微服务架构
summary: 创建一个微服务架构
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、 概述

本文档讲述如何从头开始构建一个微服务架构。在开始阅读这篇文档之前，请移步 [电商业务微服务架构示例](https://console.goodrain.com/#/team/a5qw69mz/region/ali-hz/groups/4178)预先了解这个基于ServiceMesh的微服务架构演示用例。

在本文中，将从该架构中摘取  `edge-router` `front-end` `carts` 三个服务组件从头进行部署，使用的方式是镜像构建。

> 各组件镜像地址如下：

- edge-router： weaveworksdemos/edge-router:0.1.1

- front-end：  weaveworksdemos/front-end:0.3.12

- carts： weaveworksdemos/carts:0.4.8

## 二、 组件部署

首先，使用镜像对三个服务组件逐个部署

### 2.1 edge-router

- 部署流程

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/edge-router.gif" style="border:1px solid #eee;width:85%">

### 2.2 front-end

- 部署流程

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/front-end.gif" style="border:1px solid #eee;width:85%">

### 2.3 carts

- 部署流程

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/carts.gif" style="border:1px solid #eee;width:85%">

## 三、其余配置

这一阶段，对已部署好的各个服务组件进行定制化的设置。这一阶段建立在对各个服务组件的特性比较熟悉的前提下：

|服务组件|开放端口及协议|依赖|插件|
|-------|-----------|----|---|
|edge-router|80(对内、对外)http</br>8080(对外)http|front-end||
|front-end|8079（对内）http</br>9001(对内)http|carts|服务网络治理|
|carts|80（对内）http|||

- 以front-end为例，演示这个过程

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/front-end-config.gif" style="border:1px solid #eee;width:85%">

> 按上述过程设置其余的服务组件，并建立依赖关系

## 四、 最终成果

至此，三个服务组件已经部署配置完成。以此类推，使用同样的思路处理其他服务组件，最终会获得完整的微服务架构。

<img src="https://static.goodrain.com/images/docs/5.0/advanced-scenarios/3services.png" style="border:1px solid #eee;width:85%">

> 其余服务组件镜像地址参见 [ServiceMesh微服务架构电商案例](../microservice/service-mesh/use-case.html) 中的 `docker-compose` 文件