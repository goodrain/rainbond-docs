---
title: 使用JMX Exporter监控Rainbond上的Java应用
description: Prometheus 社区开发了 JMX Exporter 用于导出 JVM 的监控指标，以便使用 Prometheus 来采集监控数据
slug: JmxExporter
image: https://static.goodrain.com/wechat/jmx-exporter/jmx-exporter.png
---

Prometheus 社区开发了 JMX Exporter 用于导出 JVM 的监控指标，以便使用 Prometheus 来采集监控数据。当您的 Java 应用部署在Rainbond上后

可通过本文了解部署在 Rainbond 上的 Java 应用如何使用  JMX Exporter 暴露 JVM 监控指标。

<!--truncate-->

## JMX Exporter 简介

Java Management Extensions，JMX 是管理 Java 的一种扩展框架，JMX Exporter 基于此框架读取 JVM 的运行时状态。JMX Exporter 利用 Java 的 JMX 机制来读取 JVM 运行时的监控数据，然后将其转换为 Prometheus 可辨识的 metrics 格式，让 Prometheus 对其进行监控采集。

JMX Exporter 提供 `启动独立进程` 及 `JVM 进程内启动（in-process)`两种方式暴露 JVM 监控指标：

**启动独立进程**

JVM 启动时指定参数，暴露 JMX 的 RMI 接口。JMX Exporter 调用 RMI 获取 JVM 运行时状态数据，转换为 Prometheus metrics 格式，并暴露端口让 Prometheus 采集。

**JVM 进程内启动（in-process)**

JVM 启动时指定参数，通过 javaagent 的形式运行 JMX Exporter 的 jar 包，进程内读取 JVM 运行时状态数据，转换为 Prometheus metrics 格式，并暴露端口让 Prometheus 采集。

> 官方不建议使用 `启动独立进程` 方式，该方式配置复杂且需单独的进程，进程本身的监控又引发了新的问题。本文以 `JVM 进程内启动（in-process)`方式为例，在 Rainbond 中使用 JMX Exporter 暴露 JVM 监控指标。



## 在 Rainbond 上使用 JMX Exporter

在[Rainbond](https://www.rainbond.com?channel=k8s)上对于构建类型不同的组件有不同的处理方式，如下



**通过源码构建的Java应用**

自V5.3版本后通过 Rainbond 源码构建的 JAVA 应用，默认都会将 `JMX Exporter` 打包，用户使用时只需添加环境变量开启即可。

1. 为 JAVA 服务组件添加一个指定的环境变量 `ES_ENABLE_JMX_EXPORTER = true` ，即可开启 `jmx_exporter`。

2. 在 JAVA 服务组件的端口管理处添加一个 `5556` 端口，这是 jmx_exporter 默认监听的端口。



**通过镜像构建的Java应用**

对于镜像或应用市场构建的应用，可以使用初始化类型的插件实现注入 `jmx_agent`。

往期文章中详细讲解过其实现原理，可以参考：[Rainbond通过插件整合SkyWalking，实现APM即插即用](https://mp.weixin.qq.com/s/cqZsy2TEYStoRaDDOdSbcQ) *Agent插件实现原理部分*。

* 构建 jmx_exporter 插件

进入团队 -> 插件 -> 新建插件，创建初始化类型插件，源码地址：https://github.com/goodrain-apps/jmx_exporter.git

![](https://static.goodrain.com/wechat/app-monitor/create_jmx.png)

插件构建成功后即可使用，为 JAVA 服务组件开通此插件即可。

* 挂载存储

为 JAVA 服务组件挂载存储 `/tmp/agent`，使其可以与插件共享存储。

通过共享存储，初始化插件将所需的配置文件以及 `Agent` 放在共享存储中供主服务使用，实现服务无侵入。

* 添加环境变量

为 JAVA 服务组件添加环境变量 `JAVA_OPTS = -javaagent:/tmp/agent/jmx_prometheus_javaagent-0.16.1.jar=5556:/tmp/agent/prometheus-jmx-config.yaml`

可挂载配置文件 `/tmp/agent/prometheus-jmx-config.yaml` 替换现有的配置文件。

* 添加端口

在组件的端口管理处，添加新的端口 `5556` 

最后更新组件即可生效。



## 添加应用监控点

应用监控是基于 `rbd-monitor` 实现，当我们添加了监控点后就相当于创建了一个 `servicemonitor`。



进入组件内 -> 监控 -> 业务监控 -> 管理监控点，新增监控点，填写以下信息：

* 配置名：自定义

* 收集任务名称：自定义

* 收集间隔时间：10秒

* 指标路径：/metrics

* 端口号：选择 `jmx_exporter` 端口

添加完后更新组件使其生效。



## 添加监控图表

接下来就可以添加一个监控图表，来展示 JAVA 服务组件中 JVM 的指标行：

点击业务监控面板上方的 **添加图表**

输入新的标题，以及对应的查询条件 `jvm_memory_bytes_used` 后，点击 **查询**。如果正常返回图表，则说明查询条件是正确的。标题的定义尽量清晰明了，并在有必要的情况下明确单位。

更多指标可参考 [官方文档](https://github.com/prometheus/jmx_exporter)

![](https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-exporter-2.png)



## 扩展Grafana

可通过`grafana` 展示，以下简述操作步骤：

1. 获取 `rbd-monitor` 服务 `CLUSTER IP`。

```shell
$ kubectl get svc -l name=rbd-monitor -n rbd-system

NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
rbd-monitor   ClusterIP   10.43.112.131   <none>        9999/TCP   13d
```

2. 在平台上添加第三方服务，填写 `rbd-monitor` 服务的 `CLUSTER IP`。
3. 从开源应用商店安装 `Grafana`并添加依赖。
4. 进入Grafana，Configuration -> Add Data Source -> URL为 `http://127.0.0.1:9999` ，导入 *JVM dashboard ID 8878* ，通过Grafana面板展示应用监控信息。

![](https://static.goodrain.com/wechat/app-monitor/grafana-dashboard.png)



## References Link

**jmx_export 插件Github**  https://github.com/goodrain-apps/jmx_exporter.git

**jmx_export 官方**  https://github.com/prometheus/jmx_exporter.git

**jvm dashboard**  https://grafana.com/grafana/dashboards/8878

