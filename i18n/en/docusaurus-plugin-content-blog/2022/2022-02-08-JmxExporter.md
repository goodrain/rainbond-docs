---
title: Use JMX Export to monitor Java apps on Rainbond.
description: Prometheus community has developed JMX Exporter for the export of JVM monitoring indicators in order to use Prometheus to collect monitored data
slug: JmxExporter
image: https://static.goodrain.com/wechat/jmx-exporter/jmx-exporter.png
---

The Prometheus community has developed JMX Exporter for the export of JVM monitoring indicators in order to use Prometheus to collect monitoring data.When your Java app is deployed on Rainbond

It is available here to see how Java apps deployed on Rainbond use JMX Exporter Exposure JVM monitoring indicators.

## JMX Export Introduction

Java Management Extensions,JMX is an extension to manage Java based on which JMX Exporter reads JVM runtime status.JMX Exporter uses Java JMX mechanism to read monitoring data when JVM is running, and then convert it to Prometheus recognizable metrics format to enable Prometheus to monitor and collect them.

JMX Exporter offers `start independent process` and `JVM in-process)` both ways of exposing JVM monitoring indicator：

**Start independent process**

Specifies the parameter at JVM startup, which exposes JMX RMI interfaces.JMX Exporter calls RMI to get JVM runtime data, convert to Prometheus metrics format and exposes Prometheus to gain.

**JVM process in-process**

JVM starts with parameters that run JMX Exporter jars in javaagent, read JVM running state data, converted to Prometheus metrics format and exposes the port to get Prometheus collection.

> The official does not recommend the `start independent process` method, which configure complex and separate processes, and monitoring the process itself raises new questions.This paper uses JMX Export Exporter Exposure JVM for example in the `JVM process)` process.

## Use JMX Export on Rainbond

Different components of the build type are treated differently on[Rainbond](https://www.rainbond.com?channel=k8s).

**Java apps built through source code**

The JAVA app built through Rainbond source code after version V5.3 will be packaged by default for `JMX Exporter` and will only be opened when users add environment variables.

1. Adds a specified environment variable to the JAVA service component `ES_ENABLE_JMX_EXPORTER = true`, to enable `jmx_exporter`.

2. Add a `5556` port to the port management of the JAVA service component, which is the default port for which jmx_exporter listen.

**JavaScript Apps built by mirror**

For applications built on the mirror or the Marketplace, the `jmx_agent` can be injected using plugins of initialization type.

The principles of their implementation have been detailed in previous articles and can be found in：[Rainbod integrates SkyWalking with plugins to make APM plugin](https://mp.weixin.qq.com/s/cqZsy2TEYStoRaDDDODdSbcQ) \*Agent plugin implements the rationale.

- Build jmx_exporter plugin

Go to team -> Plugins -> Create new plugin, create initialization type plugin, source address：https://github.com/goodrain-apps/jmx_exporter.git

![](https://static.goodrain.com/wechat/app-monitor/create_jmx.png)

Plugins can be used when they are successfully built. Open this plugin for the JAVA service component.

- Mount Storage

Mount storage `/tmp/agent` for JAVA service components so that they can be stored with plugins.

By sharing storage, initialize the required configuration file and `Agent` on the shared store for the main service, making the service inviolable.

- Add Environment Variables

Add environment variable `JAVA_OPTS = -javaagent:/tmp/agent/jmx_prometheus_javaagent-0.16.jar=5556:/tmp/agent/prometheus-jmx-config.yaml`

The configuration file `/tmp/agent/prometheus-jmx-config.yaml` can be mounted to replace the existing configuration file.

- Add Port

Add the new port `5556` in the port management section of the component

The last update of the component will take effect.

## Add App Watchpoint

App monitoring is based on `rbd-monitor` and when you add a monitoring point, you create a `servicemonitor`.

Enter the component -> Monitor -> Monitor -> Manage Watchpoint, add the control point, fill in the following message：

- Configuration name：Custom

- Collect Task Name：Custom

- Collect time for：10 seconds

- Indicator path：/metrics

- Port：Select `jmx_exporter` port

Update component after adding to take effect.

## Add Monitoring Chart

Next, you can add a monitoring chart to display the JVM indicator line： in the JAVA service component

Click on **Add Graph above the Operations Watchboard**

Enter a new title and the corresponding query condition `jvm_memory_bytes_used`, click **query**.If the chart is returned normally, then the search terms are correct.The definitions of titles are as clear as possible and, where necessary, unicated.

More indicators can be found in [官方文档](https://github.com/prometheus/jmx_exporter)

![](https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-export-2.png)

## Expansion of grafana

Displays via `grafana`. Brief action step：

1. Get the `rbd-monitor` service `CLUSTER IP`.

```shell
$ kubectl get svc -l name=rbd-monitor -n rbd-system

NAME TYPE CLUSTEER-IP EXTERNAL-IP PORT(S) AGE
rbd-monitor ClusterIP 10.43.112.131   <none>        99/TCP 13d
```

2. Add a third party service on the platform to fill in the `CLUSTER IP` of the `rbd-monitor` service.
3. Install `Grafana` from the Open Source Store and add dependency.
4. Enter Grafana, Configuration -> Add Data Source -> URL to `http://127.0.0.1:9999`, import _JVM dashboard ID 8878_, display app monitoring information via Grafana panel.

![](https://static.goodrain.com/wechat/app-monitor/grafana-dashboard.png)

## References Link

**jmx_export plugin Github** https://github.com/goodrain-apps/jmx_exporter.git

**jmx_export official** https://github.com/prometheus/jmx_exporter.git

**jvm dashboard** https://grafana.com/grafana/dashboards/8878
