--- 
title: 部署 Job CronJob 类型组件
description: 本文讲述部署Job、CronJob类型组件的要点，适用于开发者和运维人员。
---

### 概述

任务主要包含两种：

- Job负责批处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个Pod成功结束.
- CronJob是管理调度job，周期性的创建job去执行任务.

详细信息参考k8s官方文档
- Job  https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/
- CronJob  https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/

### 使用流程

在创建组件的时候，可以在高级设置中选择job、cronjob类型.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/ComponentType.png" title="高级设置"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CreatJob.png" title="设置job"/>

如果选择cronjob，需要填写调度策略
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CreatCronJob.png" title="设置cronjob"/>

创建成功开始执行任务，待job任务执行完毕时，标识已完成.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/JobRuning.png" title="job任务运行"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/JobOK.png" title="job任务完成"/>

job任务执行完成，可点击重启按钮，重新执行该任务，也可以点击关闭任务.

在组件其他设置中可修改部署类型和任务策略.

#### 部署类型
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/ChangeType.png" title="组件部署类型"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/DeploymentType.png" title="修改组件部署类型"/>

#### 任务策略

- 如果是cronjob类型，定时配置必填，如 `*/1 * * * *` 一分钟执行一次.
- 最大重试次数：如果任务失败，默认失败认定重启次数为6，可以通过配置调整失败重启次数.
- 并行任务数：能够同时运行的Pod数，如设置3个，则有3个任务同时创建并执行.
- 最大运行时间：如果Job运行的时间超过了设定的秒数，那么此Job就自动停止运行所有的Pod.
- 完成数：完成该Job需要执行成功的Pod数.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/TaskStrategy.png" title="任务策略编辑"/>

#### cronjob任务状态展示
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CronJob.png" title="cronjob任务执行"/>
