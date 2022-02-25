---
title: 为 JAVA 应用自定义监控
weight: 4000
---

### 基于 Prometheus 的自定义监控

Rainbond 自 V5.3 版本开始，加入了自定义业务监控功能，支持用户通过自定义的 Exporter 插件，实现基于 Prometheus 的自定义业务监控。这一操作需要用户对于 Prometheus 监控体系有比较系统的了解。

而对于主力开发语言为 JAVA 的用户而言，我们已经将 [jmx_exporter](https://github.com/prometheus/jmx_exporter) 集成进了源码构建过程中，通过后文中的几步简单操作，即可实现自定义 JVM 监控。


### 前提条件

- Rainbond 版本在 V5.3 及以上

- 来自于 JAVA 源码构建的项目

### 开启 jmx_exporter 自定义监控

#### 开启监控

jmx_exporter 开启的开关，是为 JAVA 服务组件添加一个指定的环境变量 `ES_ENABLE_JMX_EXPORTER = true`

为 JAVA 服务组件添加一个 `5556` 端口，这是 jmx_exporter 默认监听的端口。

#### 添加监控点

通过点击业务监控面板右上方的 **管理监控点** ，可以定义监控点信息，这些信息定义了监控指标的来源。

点击 **添加配置** 这组配置包含以下几个元素，这些元素都是必填项：

- 配置名称：自定义这组配置的名字

- 收集任务名称：自定义

- 路径：/metrics

- 端口：5556

- 收集时间间隔：10s

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-exporter-1.png" width="100%" title="添加监控点" />

做完这些操作后，更新 JAVA 服务组件使之生效。

### 添加监控图表

接下来就可以添加一个监控图表，来展示 JAVA 服务组件中 JVM 的指标行：

点击业务监控面板上方的 **添加图表**

输入新的标题，以及对应的查询条件 `jvm_memory_bytes_used` 后，点击 **查询**。如果正常返回图表，则说明查询条件是正确的。标题的定义尽量清晰明了，并在有必要的情况下明确单位。

<img src="https://static.goodrain.com/docs/5.3/practices/app-dev/java-exporter/java-exporter-2.png" width="100%" title="添加监控图表" />

### 更多高级操作

通过下面一组环境变量的设置，可以为 jmx_exporter 定义更多高级设置：

|环境变量名称|可选值|说明|
|:---:|:---:|:---:|
|JMX_EXPORTER_AGENT_VERSION|0.15.0|jmx_exporter版本，当前为最新稳定版本|
|JMX_EXPORTER_HTTP_PORT|5556（默认）|jmx_exporter监听端口，可自定义|
|JMX_EXPORTER_CONFIG|/app/.jmx-exporter/config.yaml（默认）|jmx_exporter配置文件路径，可自定义路径后，将自定义配置文件挂载后生效|

