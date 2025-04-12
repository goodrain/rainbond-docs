---
title: Deploy Job CronJob type component
description: This article describes the key points of deploying Job and CronJob type components, applicable to developers and operations personnel.
---

### Overview

Tasks mainly include two types:

- Job is responsible for batch processing tasks, that is, tasks that are executed only once. It ensures that one or more Pods of the batch processing task successfully complete.
- CronJob manages scheduled jobs, periodically creating jobs to execute tasks.

For more details, refer to the official k<b>8</b>s documentation

- Job  https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/
- CronJob  https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/

### Usage Process

When creating a component, you can select the job or cronjob type in the advanced settings. <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/ComponentType.png" title="Advanced Settings"/> <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CreatJob.png" title="Set Job"/>

If you select cronjob, you need to fill in the scheduling strategy <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CreatCronJob.png" title="Set CronJob"/>

After successful creation, the task starts executing. When the job task is completed, it is marked as completed. <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/JobRuning.png" title="Job Task Running"/> <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/JobOK.png" title="Job Task Completed"/>

After the job task is completed, you can click the restart button to re-execute the task, or click to close the task.

You can modify the deployment type and task strategy in the component's other settings.

#### Deployment Type

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/ChangeType.png" title="组件部署类型"/>
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/DeploymentType.png" title="修改组件部署类型"/>

#### Task Strategy

- If it is a cronjob type, the timing configuration is mandatory, such as `*/1 * * * *` to execute once a minute.
- Maximum retry count: If the task fails, the default failure restart count is 6, which can be adjusted through configuration.
- Parallel task count: The number of Pods that can run simultaneously. If set to 3, then 3 tasks are created and executed simultaneously.
- Maximum runtime: If the Job runs longer than the set number of seconds, then this Job automatically stops running all Pods.
- Completion count: The number of Pods that need to successfully execute to complete the Job.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/TaskStrategy.png" title="任务策略编辑"/>

#### cronjob task status display

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CronJob.png" title="cronjob任务执行"/>
