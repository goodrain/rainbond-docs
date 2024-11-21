---
title: 业务监控
description: 如何为每一个服务组件定制自己的监控项
---


### 基于 Prometheus 的自定义监控

Rainbond 自 V5.3 版本开始，加入了自定义业务监控功能，支持用户通过自定义的 Exporter 插件，实现基于 Prometheus 的自定义业务监控。这一操作需要用户对于 Prometheus 监控体系有比较系统的了解。

### MySQLD Exporter

作为示例，Rainbond V5.3 版本安装后自带 MySQLD Exporter 插件，该插件基于标准的 MySQLD Exporter 实现。Rainbond 自带的 Prometheus 监控系统 rbd-monitor 会收集 Exporter 中的数据，并通过监控面板展示出来。

#### 插件的安装

点击 **插件** 选项卡，即可 **开通** MySQLD Exporter 插件。

![安装 MySQLD Exporter 插件](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-1.png)

开通该插件后，**查看配置** ，确认 DATA_SOURCE_NAME (MySQL 连接信息)是否正确。

![确认配置](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-2.png)

确认无误后，根据提示 **更新** Mysql 服务组件，即可开始收集 MySQLD Exporter 提供的指标。

#### 查看监控

这一插件已经默认配置好了常用的监控图表，直接查看即可。

依次点击 **监控** —— **业务监控** 便可以看到相应的监控图表：

![监控图表](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-3.png)
默认的监控图表展示的 MySQLD 业务监控数据项包括：

|监控项|
|:---:|
|慢查询|
|OPS|
|磁盘读速率|
|磁盘写速率|
|字节接收速率|
|字节发送速率|
|InnoDB缓存池大小|
|连接线程峰值|
|运行线程峰值|
|平均运行线程|
|Table Lock lmmediate|
|Table Lock Waited|

#### 管理监控点

通过点击业务监控面板右上方的 **管理监控点** ，可以定义监控点信息，这些信息定义了监控指标的来源。

MySQLD Exporter 插件已经定义好了一组监控点的配置，这组配置包含以下几个元素，这些元素都是必填项：

- 配置名称：自定义这组配置的名字

- 收集任务名称：自定义

- 路径：指标的来源路径，根据 Exporter 设计的不同，需要填写合适的路径

- 端口：Exporter 监听的端口

- 收集时间间隔： 多久收集一次指标

监控点可以添加多组配置，用户需要根据自己设计的 Exporter 自行配置。


#### 添加监控图表

如果我们希望添加一个监控图表，来展示数据库当前连接数，那么请按照以下操作进行：

点击业务监控面板上方的 **添加图表**

输入新的标题，以及对应的查询条件 `mysql_global_status_threads_connected` 后，点击 **查询**。如果正常返回图表，则说明查询条件是正确的。标题的定义尽量清晰明了，并在有必要的情况下明确单位。

![添加监控图表](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-4.png)

点击 **添加** 后，即可将新的监控图表加入业务监控面板。新添加的监控图表将会置于最后。

访问 Mysql 服务组件的 9104 端口，可以在 /metrics 路径下，查看所有可供成图的监控项。


### 其他类型业务的自定义监控

对于来自于源码构建的 JAVA 类应用，我们将 exporter 集成在构建过程中，其使用方式参考最佳实践： [为 JAVA 应用自定义监控](https://www.rainbond.com/blog/JmxExporter)


