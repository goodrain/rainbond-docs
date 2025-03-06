---
title: Pyroscope use
description: Pyroscope analyzes performance issues for microservice applications on Rainbond.
keywords:
  - Performance Analysis
  - Pyroscope
  - Analyze microservice performance using Pyroscope
---

[Pyroscope](https://pyroscope.io/) is an open source continuous performance analysis platform.It can help you with：

- Find performance issues in code
- Resolve high CPU usage
- Locate and fix memory leak
- Learn about the app call tree
- Track changes over time

Pyroscope stores long-term analytic data from multiple applications; can view multiple years of data at a time or view specific events individually; lower CPU usage; high data compression efficiency; low disk space requirement; quick UI interface;

## Pyroscope architecture

Pyroscope is supported by two main components running：**Pyroscope Server** and **Pyroscope Agent**.

**Pyroscope Agent**：records and compiles the actions your application has been performing and then sends the data to Pyroscope Server.Support multiple languages, GO, Python, Ruby, eBPF, JAVA, Rust, PHP, NodeJS, .NET

**Pyroscope Server**： handling, aggregating and storing data from proxies for quick queries at any time.It will be possible to view the analytics data and make queries within any time frame.

![](https://static.goodrain.com/wechat/pyroscope/1.png)

## Integrated with Rainbond

![](https://static.goodrain.com/wechat/pyroscope/2.png)

**1.Integration Pyroscope Agent:**

Install the Pyroscope Agent plugin in the microservice component using the mechanism of the Rainbond plugin, which will launch `java-javaagent:pyroscope.jar -jar app.jar` through javaagent

**2.Depends on Pyroscope Server:**

The Pyroscope Agent plugin microservice component will be installed on Pyroscope Server.

## Practical steps

This paper will be based on micro-service framework Pig for practice, step：

1. Deployment Microservice [Spring Cloud Pig](/docs/microservice/example/pig)
2. Deploy Pyroscope Server
3. Install and configure the Pyroscope Java Agent plugin
4. Create dependency between micro-service and Pyroscope
5. Pyroscope Basic Usage

### 1) Deployment of microservices Spring Cloud Pig

Install `Spring Cloud Pig` from the Open Source App Store, add -> Create Component -> Search `SpringCloud-Pig` in the Open Source Store and install it to the specified app.

### Deployment of Pyroscope Server

Install `Pyroscope Server`, add -> Create Component -> Search in Open Source Store and install `Pyroscope` to the specified app.

### 3. Install and configure the Pyroscope Java Agent plugin

1. Plugins -> Install Plugins from App Store to search for `Pyroscope-Java-Agent` for installation.
2. Open plugins for each microservice component, enter the microservice component -> Plugin -> Open plugin `Pyroscope-Java-Agent` and update the component.
3. Set the following environment variables for each micro-service component to add variables in the component -> Environment Variables -> .You can also configure the `JAVA_OPTS` environment variable for all components by applying the config group. The `PYROSCOPE_APPLICATION_NAME` environment variable is unique and cannot be configured uniformly.

| Variable Name                                                     | Variable value                                                  | Note                          |
| ----------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------- |
| JAVA_OPTS                                    | -javaagent:/agent/pyroscope.jar | Java agent startup parameters |
| PYROSCOPE_PLAYLIST_NAME | pig.auth                                        | Microservice Module Name      |

### Establishing dependency between microservices and Pyroscope

Connect all microservice components to Pyroscope, switch to layout mode for dependency building, and update or restart all microservice components to take effect.

![](https://static.goodrain.com/wechat/pyroscope/8.png)

### Basic uses of Pyroscope

Access Pyroscope UI to the 4040 external service port of Pyroscope

In the Single View view, the service can be selected by application.It can show flame maps for a certain period of time or can be displayed in tables or at the same time, and the flame map can see performance indicators called by the microservice.

![](https://static.goodrain.com/wechat/pyroscope/9.png)

Compare different time slots in the Comparison View view. Drag through the timeline

![](https://static.goodrain.com/wechat/pyroscope/10.png)

In Diff View you can make a difference between two periods of time, which is usually effective when sorting out the microservice's CPU and memory leaks.

![](https://static.goodrain.com/wechat/pyroscope/11.png)

## Last

Pyroscope can also be used together with Jaeger and integrated in Jaeger UI and see [Jaeger UI integration](https://github.com/pyroscope-io/jaeger-ui)