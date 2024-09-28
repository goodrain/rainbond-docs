---
title: component log
description: Query and management of Rainbond component logs
---

The Rainbond platform displays component logs in the form of real-time push, which is convenient for users to quickly query logs and locate software faults.You can also query the history log by querying the history log file.也可以通过查询历史日志文件查询历史日志。

## Component operation log

组件运行后输出到 [标准输出(stdout)](https://baike.baidu.com/item/stdout) [标准错误输出(stderr)](https://baike.baidu.com/item/stderr)的日志将被 Rainbond 捕获并进行汇聚存储。After the component runs, the log output to [standard output (stdout)](https://baike.baidu.com/item/stdout) [standard error output (stderr)](https://baike.baidu.com/item/stderr)will be captured by Rainbond and stored in aggregate.The way Rainbond handles component operation logs is to aggregate the logs of multiple instances to the component level, push them to the browser for real-time display, and store them on disk at the same time.

- Running log output interface

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Operation%20log2.png)

- Pause push：Pause log push, easy to pause analysis when key information is seen
- History log download：Rainbond will collect the logs in the last 7 days and save them. Users can click`History log download`in the log interface to download the logs of the last 7 days to the local machine for analysis.
- The last 1000 logs：The last 1000 logs output

In the log display box, users can select`container ID`to query only the running log of an instance; we try to push the log to the console in real time, but there will be a certain delay due to intermediate processing.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-log/Instance%20log.png)

We recommend users to separate component running logs into access logs and program debug logs. Access logs generally want to be analyzed statistically, so more processing is required.It is recommended to output it to a persistent file, and then connect to other log analysis components for log analysis. The program Debug log is directly output, and it is quickly presented to developers to find and locate problems in time.建议将其输出到持久化文件，然后对接其他日志分析组件进行日志分析。 程序 Debug 日志直接输出，快速的呈现给开发者及时发现和定位问题。

## container log

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-manual/component-log/%E7%BB%84%E4%BB%B6%E5%AE%B9%E5%99%A8%E6%97%A5%E5%BF%97.png)

We can also only view the logs of the specified instance container, and the real-time performance of the container log will be relatively high. By default, it is refreshed every 5 seconds.

In Rainbond, log collection can also be connected to log analysis systems such as`ELASTICSEARCH`, and the logs can be directly transmitted to the analysis system for analysis; for details, see [Logs connected to ELK system](https://www.rainbond.com/blog/elk).
