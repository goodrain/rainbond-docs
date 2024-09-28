---
title: Rainbod plugin extension：Mysql based on Mysql-Export
description: The MySQLD Exporter plugin is based on standard MySQLD Exporter.Rainbond Prometheus Monitor rbd-monitor will collect data in Exporter and show them through the dashboard
slug: mysql-exporter
image: https://static.goodrain.com/wechat/mysql-exporter/mysql-exporter.png
---

The MySQLD Exporter plugin is based on standard MySQLD Exporter.Rainbond self-bound Prometheus Monitor rbd-monitor will collect data in Exporter and display it through the dashboard.Users can customize which indicators to display which key performance data will be selected to monitor the Mysql database service.

## Install Mysql-Export Plugin

Click the **Plugins** tab on the left side of the team view to go to my plugin page.Select to install/create a plugin from the App Store.

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDDExportor-2.png)

Search Mysql-exportor in the Open Source Store and install the plugin into the current team by clicking on installation.

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDDExportor-3.png)

The plugin can **open** MySQLD Exporter plugin on the existing Mysql service component.

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-1.png)

When this plugin is enabled, **view the configuration** and verify that DATA_SOURCE_NAME is correct.Also check if the time zone is configured and the monitored Mysql service component is consistent.The configuration representative in the graph uses the `Asia/Shanghai` timezone, the Mysql service component can use the same environment variable configuration to declare the time zone.

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDDExportor-1.png)

Once confirmed, collection of indicators provided by MySQLD Exporter can start based on the hint **update** Mysql service component.

## Manage monitoring points

By clicking **Manage Watchpoints** above the right of the Operations Control Panel you can define the control point information, which defines the source of the monitoring indicators.

The MySQLD Exporter plugin has defined a set of control points that contain the following elements, all of which are required to fill in：

- Configure the name：custom name for this configuration
- Collect Task Name：Custom
- Path to：indicator source path that needs to be filled out depending on Exporter design
- Port：Exporter listen, listener by default 9104, user is required to turn on 9104 port for Mysql master service.
- How often the collection time interval： collects an indicator

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/MySQLDDExportor-4.png)

## View Monitor

This plugin is already configured by default for regular monitoring charts. Use the `mysqld-exportor` option to generate graphs.

Click **Watch** then — **Business Watch** to see the monitoring chart：

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-3.png)

The default MySQLD monitoring data item displayed in the monitoring chart includes：

|      Monitor Items     |
| :--------------------: |
|       Slow Query       |
|           OPS          |
|     Disk Read Rate     |
|       Disk Speed       |
|    Byte Receive Rate   |
|     Byte Send Rate     |
|   InnoDB Buffer Size   |
|   Connect Thread Peak  |
|     Run Thread Peak    |
| Run threads on average |
| Table Lock lmimmediate |
|    Table Lock Waited   |

## Add Custom Monitoring Chart

If we want to add a monitoring chart to show the current number of connections to the database, please do：

Click on **Add Graph above the Operations Watchboard**

Enter a new title and the corresponding query condition `mysql_global_status_threads_connected`, click **query**.If the chart is returned normally, then the search terms are correct.The definitions of titles are as clear as possible and, where necessary, unicated.

![](https://static.goodrain.com/docs/5.3/component-op/custom-monitor/custom-monitor-4.png)

Click **Add** to add new monitoring charts to the operations dashboard.The newly added monitoring chart will be placed at the end.

Access the port of 9104 of the Mysql service component, which can be seen in /metrics paths.
