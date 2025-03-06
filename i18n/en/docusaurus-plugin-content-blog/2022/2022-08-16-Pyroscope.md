---
title: Microservice Performance Analysis|Pyroscope Practice Sharing on Rainbond
description: As micro-service systems fall into productive environments, problems arise such as excessive flows that cause performance bottlenecks for a micro-service application, high CPU utilization, or leakage from memory.
slug: pyroscope
image: https://static.goodrain.com/wechat/pyroscope/Pyroscope.png
---

As micro-service systems fall into productive environments, problems arise such as excessive flows that cause performance bottlenecks for a micro-service application, high CPU utilization, or leakage from memory.To find out the root causes of the problem, we usually judge the root causes by logs, processes, and codes.This is bound to be time-consuming and difficult to identify key problem points in a timely manner for operations with large microservices.

This will introduce a **Continuous Performance Analysis Platform Pyroscope** that will help us quickly find code for memory leaks and high CPU utilization.

<!--truncate-->

## 什么是 Pyroscope？

[Pyroscope](https://pyroscope.io/) 是一个开源的持续性能分析平台。它能够帮你：

- 查找代码中的性能问题
- 解决 CPU 利用率高的问题
- 定位并修复内存泄漏
- 了解应用程序的调用树
- 跟踪随时间的变化

Pyroscope 可以存储来自多个应用程序长期的分析数据；可以一次查看多年的数据或单独查看特定的事件；较低的 CPU 使用；数据压缩效率高，磁盘空间要求低；快捷的 UI 界面；

## Pyroscope 架构

Pyroscope 由两个主要组件支撑运行：**Pyroscope Server** 和 **Pyroscope Agent**。

**Pyroscope Agent**：记录并汇总您的应用程序一直在执行的操作，然后将该数据发送到 Pyroscope Server。支持多种语言，GO、Python、Ruby、eBPF、JAVA、Rust、PHP、NodeJS、.NET

**Pyroscope Server**： 处理、聚合和存储来自代理的数据，以便在任何时间范围内快速查询。片刻后可以查看分析数据，并在任何时间范围内进行查询。

![](https://static.goodrain.com/wechat/pyroscope/1.png)

## 与 Rainbond 集成架构

![](https://static.goodrain.com/wechat/pyroscope/2.png)

**1.集成 Pyroscope Agent:**

使用 Rainbond 插件的机制在微服务组件内安装 Pyroscope Agent 插件，该插件会将 `pyroscope.jar` 通过 javaagent 方式启动 `java -javaagent:pyroscope.jar -jar app.jar`

**2.依赖 Pyroscope Server:**

将安装了 Pyroscope Agent 插件微服务组件都依赖至 Pyroscope Server。

## 实践步骤

本文将基于微服务框架 Pig 进行实践，步骤为：

1. 部署微服务 Spring Cloud Pig，Gitee：https://gitee.com/log4j/pig
2. 部署 Pyroscope Server
3. 安装 Pyroscope Java Agent 插件并配置
4. 建立微服务与 Pyroscope 之间的依赖关系
5. Pyroscope 基本使用

Rainbond 部署请参阅文档 [快速安装](https://www.rainbond.com/docs/quick-start/quick-install/)

### 1. 部署微服务 Spring Cloud Pig

通过开源应用商店一键安装 Spring Cloud Pig，新增 -> 基于应用商店创建组件 -> 在开源应用商店中搜索 `SpringCloud-Pig` 并安装到指定应用中。

![](https://static.goodrain.com/wechat/pyroscope/3.png)

### 2. 部署 Pyroscope Server

通过开源应用商店一键安装Pyroscope Server，新增 -> 基于应用商店创建组件 -> 在开源应用商店中搜索 `Pyroscope` 并安装到指定应用中。

![](https://static.goodrain.com/wechat/pyroscope/4.png)

### 3. 安装 Pyroscope Java Agent 插件并配置

1. 插件 -> 从应用商店安装插件，搜索 `Pyroscope-Java-Agent` 进行安装。

![](https://static.goodrain.com/wechat/pyroscope/5.png)

2. 为每个微服务组件都开通插件，进入微服务组件 -> 插件 -> 开通插件 `Pyroscope-Java-Agent` 并更新组件。

![](https://static.goodrain.com/wechat/pyroscope/6.png)

3. 为每个微服务组件都设置以下环境变量，可在组件内 -> 环境变量 -> 添加变量。也可以通过应用配置组为所有组件统一配置 `JAVA_OPTS` 环境变量，而 `PYROSCOPE_APPLICATION_NAME` 环境变量是唯一的，不可统一配置。

| 变量名                                                                  | 变量值                                                             | 说明              |
| -------------------------------------------------------------------- | --------------------------------------------------------------- | --------------- |
| JAVA_OPTS                                       | -javaagent:/agent/pyroscope.jar | Java agent 启动参数 |
| PYROSCOPE_APPLICATION_NAME | pig.auth                                        | 微服务模块名称         |

![](https://static.goodrain.com/wechat/pyroscope/7.png)

### 4. 建立微服务与Pyroscope之间的依赖关系

将所有微服务组件添加依赖连接到 Pyroscope，切换到编排模式进行依赖关系建立，并更新或重启所有微服务组件使依赖关系生效。

![](https://static.goodrain.com/wechat/pyroscope/8.png)

### 5. Pyroscope 基本使用

访问 Pyroscope 的 4040 对外服务端口，即可访问 Pyroscope UI。

在 Single View 视图中，可以通过 Application 选择服务。它可以显示某一段时间内的火焰图，也可以使用表格展示或者同时展示，火焰图可以看到微服务方法调用的性能指标。

![](https://static.goodrain.com/wechat/pyroscope/9.png)

在 Comparison View 视图中，可以选择不同的时间段进行比较，通过时间线拖拽即可。

![](https://static.goodrain.com/wechat/pyroscope/10.png)

在 Diff View 视图中，可以进行两个时间段的差异比对，这通常在排查微服务的CPU、内存泄漏时很有效。

![](https://static.goodrain.com/wechat/pyroscope/11.png)

## 最后

Pyroscope 还可以结合 Jaeger 一起使用，可以集成在 Jaeger UI 中，可参阅 [Jaeger UI 集成](https://github.com/pyroscope-io/jaeger-ui)

---

[Rainbond](https://www.rainbond.com/) 是一个云原生应用管理平台，核心100%开源、使用简单、不需要懂容器和Kubernetes，支持管理多种Kubernetes集群，提供企业级应用的全生命周期管理。