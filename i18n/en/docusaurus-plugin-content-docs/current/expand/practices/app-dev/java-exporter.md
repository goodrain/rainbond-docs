---
title: Custom monitoring for JAVA applications
weight: 4000
---

### Prometheus-based custom monitoring

Since the V5.3 version, Rainbond has added the custom business monitoring function, which supports users to realize the custom business monitoring based on Prometheus through the custom Exporter plug-in.This operation requires users to have a relatively systematic understanding of the Prometheus monitoring system.

For users whose main development language is JAVA, we have integrated [jmx_exporter](https://github.com/prometheus/jmx_exporter) into the source code construction process, and you can implement custom JVM monitoring through a few simple operations in the following sections.


### Preconditions

- Rainbond version is V5.3 and above

- A project built from JAVA source code

### Enable jmx_exporter custom monitoring

#### Enable monitoring

The switch enabled by jmx_exporter is to add a specified environment variable `for the JAVA service component ES_ENABLE_JMX_EXPORTER = true`

Add a port `5556` for the JAVA service component, which is the default listening port for jmx_exporter.

#### Add monitoring point

By clicking the **management monitoring point** in the upper right of the business monitoring panel, you can define monitoring point information, which defines the source of monitoring indicators.

Click **to add configuration** This group of configurations contains the following elements, all of which are required：

- Configuration name：Customize the name of this group of configurations

- Collect task name：custom

- path：/metrics

- port：5556

- Collection time interval：10s

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-exporter-1.png" width="100%" title="Add monitoring point" />

After doing these operations, update the JAVA service components to take effect.

### Add monitoring chart

Next, you can add a monitoring chart to display the JVM indicator line：in the JAVA service component

Click **above the business monitoring panel to add chart**

After entering a new title and the corresponding query condition `jvm_memory_bytes_used` , click **to query**.If the chart is returned normally, the query conditions are correct.The definition of the title should be as clear and concise as possible, and the unit should be specified where necessary.

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-exporter-2.png" width="100%" title="Add monitoring chart" />

### More advanced operations

More advanced settings can be defined for：by setting the following set of environment variables

|  environment variable name   |              optional value              |                                                         illustrate                                                         |
|:----------------------------:|:----------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------:|
| JMX_EXPORTER_AGENT_VERSION |                  0.15.0                  |                                 jmx_exporter version, currently the latest stable version                                  |
|   JMX_EXPORTER_HTTP_PORT   |              5556 (default)              |                                         jmx_exporter listening port, customizable                                          |
|    JMX_EXPORTER_CONFIG     | /app/.jmx-exporter/config.yaml (default) | jmx_exporter configuration file path, after you can customize the path, mount the custom configuration file to take effect |

