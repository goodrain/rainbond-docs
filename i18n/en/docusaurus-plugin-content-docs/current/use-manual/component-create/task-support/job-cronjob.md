---
title: Deploying Job, CronJob Type Components
description: This article describes the main points of deploying Job and CronJob type components, suitable for developers and operation and maintenance personnel.
---

### Overview

The task mainly includes two kinds of：

- Job is responsible for batch tasks, i.e. tasks that are executed only once, and it guarantees that one or more Pods of the batch task end successfully.
- CronJob is a management scheduling job that periodically creates jobs to execute tasks.

For details, refer to the official documentation of k8s
- Job https://kubernetes.io/en-us/docs/concepts/workloads/controllers/job/
- CronJob https://kubernetes.io/en-us/docs/concepts/workloads/controllers/cron-jobs/

### manual

When creating a component, you can choose the type of job and cronjob in the advanced settings.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/ComponentType.png" title="advanced settings" />
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CreatJob.png" title="set job" />

If you choose cronjob, you need to fill in the scheduling policy
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CreatCronJob.png" title="setup cronjob" />

The task is successfully created and started, and when the job task is completed, the flag is completed.
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/JobRuning.png" title="job task running" />
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/JobOK.png" title="job task completed" />

After the job task is executed, you can click the restart button to re-execute the task, or click the close task.

The deployment type and task strategy can be modified in the component other settings.

#### Deployment type
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/ChangeType.png" title="Component deployment type" />
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/DeploymentType.png" title="Modify the component deployment type" />

#### mission strategy

- If it is a cronjob type, the timing configuration is required, such as `*/1 * * * *` to execute once a minute.
- The maximum number of retries is：If the task fails, the default number of restarts for failure is 6, and the number of failed restarts can be adjusted by configuration.
- The number of parallel tasks：is the number of Pods that can run at the same time. If set to 3, then 3 tasks will be created and executed at the same time.
- Maximum running time：If the job running time exceeds the set number of seconds, then the job will automatically stop running all pods.
- Completion number：The number of Pods that need to be successfully executed to complete the Job.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/TaskStrategy.png" title="Mission StrategyEdit" />

#### cronjob task status display
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CronJob.png" title="cronjob task execution" />
