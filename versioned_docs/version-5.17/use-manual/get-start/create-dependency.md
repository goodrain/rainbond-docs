---
title: 4.拼装一个 Service Mesh 微服务架构
# keywords: ['依赖关系 SrviceMesh 微服务']
description: 不修改代码实现 Service Mesh 微服务架构
---

### 目的

通过文档学习如何快速建立服务组件的依赖关系。

Rainbond 支持原生的 Service Mesh 微服务架构，应用一旦部署到 Rainbond 平台上，就已经接入了这一微服务架构。

经过了 [从源码部署一个服务组件](./create-app-from-source/) 以及 [从应用市场部署一个应用](./create-app-from-market/)，我们已经成功的部署了两个服务组件，现在，我们来创建他们之间的依赖关系。

这么做的意义，是让 **Java 演示示例** 可以和 **Mysql5.7（单机版）** 通信，业务层面可以正常调用数据库。

### 意义

通过实操，用户可以初步体会到服务组件在 Rainbond 中如何通信。用户需要阅读 [组件间通信](../../micro-service/service-mesh/connection_env) 来了解其中的原理。

### 前提条件

- 完成 [从源码部署一个服务组件](./create-app-from-source/) 获得 **Java 演示示例**。

- 完成 [从应用市场部署一个应用](./create-app-from-market/) 获得 **Mysql5.7（单机版）**。

### 建立依赖关系

- 在应用拓扑图界面，点击 **切换到编辑模式**。

- 通过拖拽完成依赖关系的建立。

- 根据提示完成下游服务组件（Java 演示示例）的更新操作

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-depdendency/create-dependency-1.png" title="建立依赖关系" width="100%" />

依赖关系建立完成后， **Java 演示示例** 就可以与 **Mysql5.7（单机版）** 正常通信了。

连接信息由 **Mysql5.7（单机版）** 的 **依赖** 页面中的连接信息定义。

这是一组环境变量，会在 **Mysql5.7（单机版）** 以及依赖了它的 **Java 演示示例** 中同时生效。

**Java 演示示例** 中通过读取对应环境变量的值，就可以在代码中引用 **Mysql5.7（单机版）** 的连接信息，包括 **Mysql5.7（单机版）** 的连接地址、端口、用户名、密码。

### 下一步

接下来，我们会探索如何将当前这组用户自己制作的应用，发布到 Rainbond 提供的应用市场中，形成自己的应用模版。
