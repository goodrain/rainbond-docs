---
title: Deployment of DolphinScheduler High Available Cluster in Rainbond
description: Apache DolphinScheduler is a distributable and scalable visualization DAG workflow task movement open source system that addresses data development ETL intricate dependencies and does not allow visual monitoring of mission health
slug: dolphinscheduler
image: https://static.goodrain.com/wechat/dolphinscheduler/dolp.png
---

This paper describes the deployment of a high available DolphinScheduler cluster through [Rainbond](https://www.rainbond.com/) cloud application management platform, which is suitable for users who do not understand the complex technologies of Kubernetes, containers, etc. and reduces the threshold for DolphinScheduler to be deployed in Kubernetes.

Apache DolphinScheduler is a scalable visualization DAG workflow task scheduling open source system.Resolve data development ETL complex dependencies and cannot visualize the health status of the mission.DolphinScheduler assembles Task as DAG stream, allows real-time monitoring of the operation status of the task while supporting retrying, recovery from the specified node, pause and Kill tasks

**Easy to use**：DAG monitoring interface, all processes defined as visualizable, using drag and drop tasks customizing DAG, interfacing with third party systems via API, one-click deployment

**High reliability**：Decentralized multiple Master and multi-Worker, own HA features and use task queue to avoid overloading, do not cause machine card death

**Rich usage scenario**：supports pausing recovery operations. More tenants and better response to big data usage scenarios. Support more task types, such as spark, hive, mr, python, sub_process, shell

**High extension**：supports custom task types, dispatcher use distribution,movement capacity increases with cluster linearity, Master and Worker support dynamic offline

<!--truncate-->

## 前提条件

- 可用的 Rainbond 云原生应用管理平台，请参阅文档 [Rainbond 快速安装](https://www.rainbond.com/docs/quick-start/quick-install)

## DolphinScheduler 集群一键部署

- 对接并访问内置的开源应用商店，搜索关键词 `dolp` 即可找到 DolphinScheduler 应用。

![](https://static.goodrain.com/wechat/dolphinscheduler/1.png)

- 点击 DolphinScheduler 右侧的 `安装` 进入安装页面，填写对应的信息，点击确定即可开始安装，自动跳转至应用视图。

| 选择项  | 说明                                                                          |
| ---- | --------------------------------------------------------------------------- |
| 团队名称 | 用户自建的工作空间，以命名空间隔离                                                           |
| 集群名称 | 选择 DolphinScheduler 被部署到哪一个 K8s 集群                                          |
| 选择应用 | 选择 DolphinScheduler 被部署到哪一个应用，应用中包含有若干有关联的组件                                |
| 应用版本 | 选择 DolphinScheduler 的版本，目前可选版本为 3.0.0-beta2 |

![](https://static.goodrain.com/wechat/dolphinscheduler/2.png)

- 等待几分钟后，DolphinScheduler 集群就会安装完成，并运行起来。

![](https://static.goodrain.com/wechat/dolphinscheduler/3.png)

- 点击访问，将访问 DolphinScheduler-API 组件，需要添加访问后缀 `/dolphinscheduler/ui`，默认的用户密码是`admin` / `dolphinscheduler123`

![](https://static.goodrain.com/wechat/dolphinscheduler/4.png)

## API Master Worker 节点伸缩

DolphinScheduler API、Master、Worker 都支持伸缩多个实例，多个实例可以保证整个集群的高可用性。

以 Worker 为例，进入组件内 -> 伸缩，设置实例数量。

![](https://static.goodrain.com/wechat/dolphinscheduler/5.png)

验证 Worker 节点，进入 DolphinScheduler UI -> 监控中心 -> Worker 查看节点信息。

![](https://static.goodrain.com/wechat/dolphinscheduler/6.png)

## 配置文件

API 和 Worker 服务共用 `/opt/dolphinscheduler/conf/common.properties` ，修改配置时只需修改 API 服务的配置文件。

## 如何支持 Python 3？

Worker 服务默认安装了 Python3，使用时可以添加环境变量  `PYTHON_HOME=/usr/bin/python3`

## 如何支持 Hadoop, Spark, DataX 等？

以 Datax 为例：

1. 安装插件。Rainbond 团队视图 -> 插件 -> 从应用商店安装插件 -> 搜索 `通用数据初始化插件` 并安装。
2. 开通插件。进入 Worker 组件内 -> 插件 -> 开通  `通用数据初始化插件` ，并修改配置
   - FILE_URL：http://datax-opensource.oss-cn-hangzhou.aliyuncs.com/datax.tar.gz
   - FILE_PATH：/opt/soft
   - LOCK_PATH：/opt/soft
3. 更新组件，初始化插件会自动下载 `Datax` 并解压到 `/opt/soft`目录下。

![](https://static.goodrain.com/wechat/dolphinscheduler/7.png)
