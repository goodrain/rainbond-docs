---
title: Deploy the Job CronJob component
description: This article covers the essentials of deploying Job and CronJob-type components and is intended for developers and operations personnel.
---

### General description

The task primarily contains terrain：

- Job is responsible for the batch task, that is, only once, and it guarantees the successful completion of one or more Pods.
- CronJob is managing the job, creating jobs periodically.

For more information refer to k8s official documentation

- Job https://kubernetes.io/en-cn/docs/concepts/workloads/controllers/job/
- CronJob https://kubernetes.io/en-cn/docs/concepts/workloads/controllers/cron-jobs/

### Use process

在创建组件的时候，可以在高级设置中选择job、cronjob类型. <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/ComponentType.png" title="高级设置"/> <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CreatJob.png" title="设置job"/>

如果选择cronjob，需要填写调度策略 <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CreatCronJob.png" title="设置cronjob"/>

创建成功开始执行任务，待job任务执行完毕时，标识已完成. <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/JobRuning.png" title="job任务运行"/> <img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/JobOK.png" title="job任务完成"/>

Job performed completely. Click on the reboot button. You can also redo the job or close it.

The deployment type and task policy can be modified in other settings of the component.

#### Deployment Type

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/ChangeType.png" title="组件部署类型"/>
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/DeploymentType.png" title="修改组件部署类型"/>

#### Task Policy

- If the cronjob type is used, the scheduled configuration is required such as `**/1****` to perform once in one minute.
- Maximum number of retries：times can be restarted by configuration failure if the task fails. Default failure determines the number of reboot times to 6.
- Number of parallel tasks：can run simultaneously, 3 tasks are created and executed simultaneously.
- The maximum running time：will stop running all Pod automatically if the Job runs longer than the specified seconds.
- Completed：completion of the Job requires successful Pod.

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/TaskStrategy.png" title="任务策略编辑"/>

#### cronjob status display

<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-manage/other/CronJob.png" title="cronjob任务执行"/>
