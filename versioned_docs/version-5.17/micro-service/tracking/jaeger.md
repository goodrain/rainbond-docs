---
title: Jaeger 使用
description: 分布式链路追踪Jaeger + 微服务Pig在Rainbond上的实践分享
keywords:
- Jaeger 分布式链路追踪
- APM
- 链路追踪
---

Jaeger 是 Uber 技术团队发布的开源分布式跟踪系统，它用于监控和故障排查基于微服务的分布式系统：

* 分布式上下文传播、事务监控
* 根本原因、服务依赖分析
* 性能/延迟优化
* [OpenTracing](http://opentracing.io/) 启发的数据模型
* 多个存储后端：Cassandra, Elasticsearch, memory.
* 系统拓扑图
* 服务性能监控（SPM）
* 自适应采样

## Jaeger 架构

![](https://static.goodrain.com/wechat/jaeger/1.png)

| Component                 | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Jaeger Client             | Jaeger Client SDK                                            |
| Jaeger Agent              | 收集 Client 数据                                             |
| Jaeger Collector          | 收集 Jaeger Agent 数据，有 pull/push 两种方式                |
| DB Storage                | Collector 需要存储后端，Collector 拿到的数据将存在 Elasticsearch 或 Cassandra。 |
| Spark jobs                | 用于生成拓扑图 UI 数据                                       |
| Jaeger Query Service & UI | 负责从 Storage 查询数据并提供 API 和 UI                      |

## 如何在Rainbond上集成？

![](https://static.goodrain.com/wechat/jaeger/2.png)

**1.集成 OpenTelemetry Client：**

v1.36 版本以前 Jaeger Client 是基于 `OpenTracing API` 实现的客户端库，Jaeger Client 结合 Jaeger Agent 一起使用，发送 span 到 Jaeger Collector。

v1.36 版本以后被弃用。使用 [OpenTelemetry](https://opentelemetry.io/) 替代  Jaeger Client and Jaeger Agent，详情见 [Jaeger and OpenTelemetry](https://medium.com/jaegertracing/jaeger-and-opentelemetry-1846f701d9f2)。

`OpenTelemetry` 是无侵入的，只需在 Java 进程启动时添加 `javaagent`，例：`java -javaagent:path/to/opentelemetry-javaagent.jar -jar myapp.jar` 。

那么在 Rainbond 上就可以通过插件将 `OpenTelemetry javaagent` 下载到组件中并修改启动命令。

**2.连接到 Jaeger-Collector：**

将所有安装了 `OpenTelemetry javaagent` 插件的微服务组件都通过依赖连接到 `Jaeger Collector`。

## 实践步骤

### Spring Cloud Pig 源码部署

通过源码部署 [Spring Cloud Pig 微服务框架](/docs/micro-service/example/pig)

### OpenTelemetry 插件安装

从应用商店安装 `opentelemetry-java-agent` 初始化插件，该插件的作用是下载 `opentelemetry-javaagent.jar` 到微服务组件内，可以在 Java 启动项中指定。

* 团队视图 -> 插件 -> 从应用商店安装插件 -> 搜索 `opentelemetry-java-agent` 并安装。

### 部署 Jaeger

在开源应用商店中搜索 `Jaeger` 并安装到指定应用中。

### OpenTelemetry Agent 插件配置

**1. 开通 OpenTelemetry Agent 插件**

以 `pig-gateway` 为例，在组件 -> 插件中开通 `opentelemetry-java-agent` 插件并更新组件生效，微服务内的其他组件均需要开通插件并更新或重启组件生效。

![](https://static.goodrain.com/wechat/jaeger/5.png)

**2. 配置环境变量**

为所有微服务组件配置环境变量。

| 变量名                        | 变量值                                        | 说明                           |
| ----------------------------- | --------------------------------------------- | ------------------------------ |
| OTEL_TRACES_EXPORTER          | jaeger                                        | 选择 Jaeger exporter           |
| OTEL_EXPORTER_JAEGER_ENDPOINT | http://127.0.0.1:14250                        | Jaeger Collector gRPC endpoint |
| OTEL_EXPORTER_JAEGER_TIMEOUT  | 10000                                         | 超时时间（毫秒）               |
| OTEL_METRICS_EXPORTER         | none                                          | Metrics 导出器                 |
| JAVA_OPTS                     | -javaagent:/agent/opentelemetry-javaagent.jar | Java 启动参数                  |

可在应用 -> 配置，使用 `应用配置组` 统一配置并应用到所有组件中。

**3. 配置组件服务名称**

为所有微服务组件配置环境变量 `OTEL_SERVICE_NAME` ，配置组件的 Jaeger 服务名称，如：`OTEL_SERVICE_NAME=pig-gateway` `OTEL_SERVICE_NAME=pig-auth` 

### 建立依赖关系

将所有微服务组件添加依赖连接到 `Jaeger Collector` 。

因 `Jaeger` 部署在另外一个应用，需要进入 组件 -> 依赖 -> 添加 `Jaeger Collector` 依赖，就可以在当前应用的拓扑图看到 `Jaeger Collector` 组件，剩下的组件都可通过拓扑图编辑模式进行依赖连接。更新或重启所有微服务组件使依赖关系生效。

![](https://static.goodrain.com/wechat/jaeger/7.png)

### Jaeger 快速使用

1. 访问 ` Jaeger-Query` 的 `16686` 端口，打开对外服务即可访问 `Jaeger UI` 。
2. 在 Jaeger Search 页面中搜索微服务 pig-gateway 的 Traces
* Service：选择微服务的组件
* Operation：选择操作类型，例：GET POST、接口、类.....
* Tags：根据响应头筛选，例：http.status_code=200 error=true
* Lookback：选择时间
* Max Duration：最大持续时间；Min Duration：最小持续时间。
* Limit Results：限制返回结果数量。

![](https://static.goodrain.com/wechat/jaeger/10.png)

4. 找到 Pig-gateway HTTP POST 的 Traces 并包含了 pig-auth Span并进入，可看到很清晰的展示了服务之间一层一层的调用以及接口的响应时间，这样我们就可以排查到底是哪个服务调用的慢或者调用有问题。

![](https://static.goodrain.com/wechat/jaeger/11.png)

**Jaeger 拓扑图生成**

拓扑图默认不会生成，使用 `spark-dependencies` 组件生成拓扑图数据，这是一个 Spark 作业，它从存储中收集 span，分析服务之间的链接，并将它们存储起来以供以后在 UI 中展示。请参阅 [Jaeger Spark dependencies](https://github.com/jaegertracing/spark-dependencies)。

`spark-dependencies` 组件占用资源较大，不使用时可关闭，需要生成拓扑图数据时将其启动即可。

![](https://static.goodrain.com/wechat/jaeger/9.png)

