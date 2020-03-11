---
title: 日志管理
description: Rainbond组件日志的查询和管理
weight: 20
---


Rainbond平台对组件日志采用实时推送的形式展示，用户也可以通过查询历史日志文件查询历史日志。

### 组件操作日志

在组件总览页面中呈现组件的操作历史情况以及每次操作的日志记录，特别是构建操作的日志需要注意，当出现构建失败时请查看日志输出的提醒内容以指导用户对代码的不规范性进行改进。

组件的操作日志也是对组件进行操作的记录，便于多个用户之间的协作和操作审查。

* 运行记录日志界面

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Operation%20log.png" width="100%" />


### 组件运行日志

组件运行后输出到<a href="https://baike.baidu.com/item/stdout" target="_blank">标准输出(stdout)</a>和<a href="https://baike.baidu.com/item/stderr" target="_blank">标准错误输出(stderr)</a>的日志将被Rainbond捕获并进行汇聚存储，多个实例的日志将统一汇聚到组件级别进行实时展示和存储。

* 运行日志输出界面

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Operation%20log2.png" width="100%" />

* 暂停推送：暂停日志的推送，便于看到关键信息时暂停分析
* 历史日志下载：Rainbond会收集最近7天内的日志进行保存，用户可以通过点击日志界面的`历史日志下载`下载最近7天的日志到本机进行分析
* 最近1000条日志：输出的最近1000条日志


在日志显示框中用户可以选择容器ID后只查询某个实例的运行日志。我们尽量追求将日志实时推送到控制台，但由于中间处理的原因会有一定的延时。

我们推荐用户将组件运行日志区分为访问日志和程序Debug日志，访问日志一般具备被统计分析的任务，将其输出到持久化文件，然后对接其他日志分析组件进行日志分析。 程序Debug日志最主要的功能是呈现给开发者快速发现问题。

在Rainbond中也可将日志收集对接`ELASTICSEARCH`等日志分析系统，将日志直接传输到分析系统中进行分析；详情参阅[Rainbond服务⽇志管理](docs/advanced-scenarios/devops/service-log/)。




