---
title: Rainbod plugin extension：Mysql based on Mysql-Export
description: The MySQLD Exporter plugin is based on standard MySQLD Exporter.Rainbond Prometheus Monitor rbd-monitor will collect data in Exporter and show them through the dashboard
slug: mysql-exporter
image: https://static.goodrain.com/wechat/mysql-exporter/mysql-exporter.png
---

The MySQLD Exporter plugin is based on standard MySQLD Exporter.Rainbond self-bound Prometheus Monitor rbd-monitor will collect data in Exporter and display it through the dashboard.Users can customize which indicators to display which key performance data will be selected to monitor the Mysql database service.

<!--truncate-->

## 安装 Mysql-Exporter 插件

在团队视图点击左侧的 **插件** 选项卡，进入我的插件页面。选择从应用商店安装/新建插件。

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDExportor-2.png)

在开源应用商店中搜索 Mysql-exportor ，点击安装即可将插件安装到当前团队中。

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDExportor-3.png)

在已有的 Mysql 服务组件的插件页面可以 **开通** MySQLD Exporter 插件。

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-1.png)

开通该插件后，**查看配置** ，确认 DATA_SOURCE_NAME (MySQL 连接信息)是否正确。同时，也要确认时区的设置和被监控的 Mysql 服务组件是否一致。图中的配置代表使用 `Asia/Shanghai` 时区，Mysql 服务组件可以使用同样的环境变量配置来声明时区。

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDExportor-1.png)

确认无误后，根据提示 **更新** Mysql 服务组件，即可开始收集 MySQLD Exporter 提供的指标。

## 管理监控点

通过点击业务监控面板右上方的 **管理监控点** ，可以定义监控点信息，这些信息定义了监控指标的来源。

MySQLD Exporter 插件已经定义好了一组监控点的配置，这组配置包含以下几个元素，这些元素都是必填项：

- 配置名称：自定义这组配置的名字
- 收集任务名称：自定义
- 路径：指标的来源路径，根据 Exporter 设计的不同，需要填写合适的路径
- 端口：Exporter 监听的端口，默认监听 9104，用户需要为 Mysql 主服务开启 9104 端口的对内服务。
- 收集时间间隔： 多久收集一次指标

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDExportor-4.png)

## 查看监控

这一插件已经默认配置好了常用的监控图表，点击一键导入，使用 `mysqld-exportor` 方案即可生成图表。

依次点击 **监控** —— **业务监控** 便可以看到相应的监控图表：

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-3.png)

默认的监控图表展示的 MySQLD 业务监控数据项包括：

|          监控项         |
| :------------------: |
|          慢查询         |
|          OPS         |
|         磁盘读速率        |
|         磁盘写速率        |
|        字节接收速率        |
|        字节发送速率        |
|      InnoDB缓存池大小     |
|        连接线程峰值        |
|        运行线程峰值        |
|        平均运行线程        |
| Table Lock lmmediate |
|   Table Lock Waited  |

## 添加自定义监控图表

如果我们希望添加一个监控图表，来展示数据库当前连接数，那么请按照以下操作进行：

点击业务监控面板上方的 **添加图表**

输入新的标题，以及对应的查询条件 `mysql_global_status_threads_connected` 后，点击 **查询**。如果正常返回图表，则说明查询条件是正确的。标题的定义尽量清晰明了，并在有必要的情况下明确单位。

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-4.png)

点击 **添加** 后，即可将新的监控图表加入业务监控面板。新添加的监控图表将会置于最后。

访问 Mysql 服务组件的 9104 端口，可以在 /metrics 路径下，查看所有可供成图的监控项。

