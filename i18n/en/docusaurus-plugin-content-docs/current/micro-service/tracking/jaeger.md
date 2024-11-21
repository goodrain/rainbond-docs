---
title: Jaeger uses
description: Distributed link tracking Jaeger + microservice Pig practice sharing on Rainbond
keywords:
  - Jaeger distributed link tracking
  - APM
  - Link Tracking
---

Jaeger is an open source distribution tracking system issued by the Uber Technical Team for monitoring and troubleshooting microservices-based distribution system：

- Distributed Context Transmission and Transaction Monitor
- Analysis of root causes, service dependency
- Performance / Delay Optimization
- Data-inspired model [OpenTracing](http://opentring.io/)
- Multiple storage backend：Cassandra, Elasticsearch, memori.
- System topography
- Service Performance Monitor (SPM)
- Adaptive sample

## Jaeger architecture

![](https://static.goodrain.com/wechat/jaeger/1.png)

| Component                                     | Description                                                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Jaeger Client                                 | Jaeger Client SDK                                                                                                                  |
| Jaeger Agent                                  | Collect Client Data                                                                                                                |
| Jaeger Collector                              | Collecting data from Jaeger Agent, in both ways                                                                                    |
| DB Store                                      | Collector needs to store the backend, and the data obtained by collector will exist in Elasticsearch or Cassandra. |
| Spark jobs                                    | Used to generate topographic UI data                                                                                               |
| Jaeger Query Service & UI | Responsible for searching data from Storage and providing API and UI                                                               |

## How do I integrate on Rainbon?

![](https://static.goodrain.com/wechat/jaeger/2.png)

**1.Integrate OpenTelemetry Client：**

v1.36 The previous version of Jaeger Client is a client library based on the `OpenTracing API`. Jaeger Client combined with Jaeger Agent and sent to Jaeger Collector.

v1.36 is deactivated later.Use [OpenTelemetry](https://opentelemetry.io/) instead of Jaeger Client and Jaeger Agent, see [Jaeger and OpenTelemetry](https://medium.com/jaegertracing/jaeger-and-opentelemetry-1846f701d9f2).

`OpenTelemetry` is invalid, just add `javaagent` when Java process starts, for example：`java -javaagent:path/to/opentelemetry-javaagent.jar -jar myapp.jar`.

On Rainbond then you can download `OpenTelemetry javaagent` to the component and modify the launch command.

**2.Connect to Jaeger-Collector：**

All microservice components that install the `OpenTelemetry javaagent` plugin are connected to `Jaeger Collector`.

## Practical steps

### Spring Cloud Pig Source Deployment

Deploy via source [Spring Cloud Pig Microservice Frame](/docs/microservice/example/pig)

### OpenTelemetry Plugin Installation

Install the `opentelemetry-java-agent` initialization plugin from the App Store. The function of this plugin is to download `opentelemetry-javaagent.jar` to the microservice component, which can be specified in the Java startup item.

- Team View -> Plugin -> Install Plugins from App Store -> Search for `opentelemetry-java-agent` and install.

### Deployment of Jaeger

Search for `Jaeger` in the open source store and install it to the specified app.

### OpenTelemetry Agent Plugin Configuration

**1. Go to OpenTelemetry Agent plugin**

For example `pig-gateway`, open `opentelemetry-java-agent` in the component -> plugin and update the component to take effect. Other components within the microservice need to open the plugin and update or restart the component to take effect.

![](https://static.goodrain.com/wechat/jaeger/5.png)

**2. Configure environment variables**

Configure environment variables for all microservice components.

| Variable Name                                                                                | Variable value                                                                                                           | Note                                      |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| OTH_NOTIF_POPUP_TITLE         | jaeger                                                                                                                   | Select Jaeger exporter                    |
| OTEL_EXPORTER_JAEGER_ENDPOINT | http://127.0.0.0.1:14250 | Jaeger Collector gRPC endpoint            |
| OTH_EXPORTER_JAEGER_TIMEOUT   | 10000                                                                                                                    | Timeout (milliseconds) |
| VIP_POPUP_TITLE                                    | none                                                                                                                     | Metrics Exporter                          |
| JAVA_OPTS                                                               | -javaagent:/agent/opentelemetry-javaagent.jar                                            | Java Start Parameters                     |

Allows you to configure the app -> Configuration, use the `App Config Group` to apply to all components.

**3. Configure component service name**

Configure the environment variable `OTEL_SERVICE_NAME` for all microservice components, configuration the component Jaeger service name, e.g.：`OTEL_SERVICE_NAME=pig-gateway` \`\`OTEL_SERVICE_NAME=pig-auth\`

### Create Dependencies

Connect all microservice components to `Jaeger Collector`.

The `Jaeger` component can be seen in the current app's sketch and the remaining components can be connected by the topographic mode of the top.Update or restart all microservice components for dependencies to take effect.

![](https://static.goodrain.com/wechat/jaeger/7.png)

### Jaeger Quick Use

1. Visit the `16686` port of `Jaegeer-Query` to `Jaeger UI` by opening the external service.
2. Search trackers for pig-gateway on the Jadeger Search page

- Service：Select a Microservice Component
- Operation：Select Operation Type, Example：GET POST, Interface, class...
- Tags：filtered by response header, Example：http.status_code=200 error=true
- Lookback：Select Time
- Max Duration：max;Min Duration：minimum duration.
- Limit Results：limits the number of returned results.

![](https://static.goodrain.com/wechat/jaeger/10.png)

4. Find Pig-gateway HTTP POST Traces and include pig-auth Span and enter, see a clear display of a layer of calls between services and response time for interface, so we can find out which service calls are slow or wrong calls.

![](https://static.goodrain.com/wechat/jaeger/11.png)

**Jaeger topography generation**

The plot will not be generated by default. Use the `spark-dependencies` component to generate the topographic data, a Spark job that collects span from storage, analyzes links between services and stores them for later display in the UI.See [Jaeger Spark dependencies] (https://github.com/jaegertracing/spark-dependencies).

The `spark-dependencies` component takes up a larger resource, can be turned off when it is not used, and starts when the topographic data is generated.

![](https://static.goodrain.com/wechat/jaeger/9.png)
