---
title: 组件日志
description: Rainbond组件日志的查询和管理
---

Rainbond 平台对组件日志采用实时推送的形式进行展示，便于用户快速查询日志定位软件故障。也可以通过查询历史日志文件查询历史日志。

## 组件运行日志

组件运行后输出到 [标准输出(stdout)](https://baike.baidu.com/item/stdout) [标准错误输出(stderr)](https://baike.baidu.com/item/stderr)的日志将被 Rainbond 捕获并进行汇聚存储。Rainbond 处理组件运行日志的方式是将多个实例的日志统一汇聚到组件级别，推送到浏览器实时展示，同时进行落盘存储。

- 运行日志输出界面

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Operation%20log2.png)

- 暂停推送：暂停日志的推送，便于看到关键信息时暂停分析
- 历史日志下载：Rainbond 会收集最近 7 天内的日志进行保存，用户可以通过点击日志界面的`历史日志下载`下载最近 7 天的日志到本机进行分析
- 最近 1000 条日志：输出的最近 1000 条日志

在日志显示框中用户可以选择`容器ID`后只查询某个实例的运行日志；我们尽量追求将日志实时推送到控制台，但由于中间处理的原因会有一定的延时。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Instance%20log.png)

我们推荐用户将组件运行日志区分为访问日志和程序 Debug 日志，访问日志一般希望被统计分析，因此需要更多的处理。建议将其输出到持久化文件，然后对接其他日志分析组件进行日志分析。 程序 Debug 日志直接输出，快速的呈现给开发者及时发现和定位问题。

## 容器日志

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-log/%E7%BB%84%E4%BB%B6%E5%AE%B9%E5%99%A8%E6%97%A5%E5%BF%97.png)

我们也可以只查看指定实例容器的日志, 容器日志的实时性会比较高. 默认情况下, 每 5 秒刷新一次.

在 Rainbond 中也可将日志收集对接`ELASTICSEARCH`等日志分析系统，将日志直接传输到分析系统中进行分析；详情参阅 [日志对接ELK体系](https://www.rainbond.com/blog/elk)。
