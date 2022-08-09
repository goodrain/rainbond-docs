---
title: 组件其他设置
description: 组件其他设置功能模块介绍
---
## 组件部署类型

- 无状态服务(Deployment类型)
 一般用于Web类、API类等组件

- 有状态服务(Statefulset类型)
 一般用于DB类、消息中间件类、数据类组件

- 任务(Job类型)
一般用于一次性任务,完成后容器就退出
- 周期性任务(Cronjob类型)
一般用于处理周期性的、需反复执行的定时任务

## 组件健康检测

健康检测是为了真实的反应组件业务的运行状态。在不配置健康检测的情况下，组件的运行状态由容器（进程）状态决定，即容器启动成功则认为组件已经进入 Ready 状态。Ready 状态的组件实例将立即加入到流量处理中去。然而我们都清楚大部分程序业务都是需要启动时间的，从开始启动到准备好处理业务是一段时间的，一般越复杂的组件时间越长。还没有准备好的组件去接受了业务请求将导致部分请求失败。特别是在组件进行滚动升级过程中，对于无状态组件，平台进行了先启动新实例接受流量，再关闭旧实例的机制，如果组件健康状态未精确体现。滚动升级的效果将大打折扣。启动因此我们需要通过一种机制来尽可能的验证组件的真实状态，这就是组件健康检测。

目前组件健康检测支持以下两种机制：

- <b>TCP 端口检测</b> 这种检测的方式是尝试与组件配置的端口建立 TCP 连接，若正常建立认为其处于健康状态。
- <b>HTTP 业务检测</b> 端口建立监听也不能完全代表业务正常，因此对于 HTTP 类的服务，能够请求到指定的路由来根据状态码进行组件健康状态判断。这种模式更加精确。

组件启动后必须经过健康检测来表示组件状态，当组件处于不健康时，有两种处理方式：

- 设置组件为不健康

> 当组件实例被设置成不健康，其将从应用网关和 ServiceMesh 网络下线。等待其工作正常后重新自动上线。但如果组件只有一个实例，Rainbond 不会将其下线。

- 重启组件实例

> 有些组件可能由于代码阻塞等原因形成死锁进程，无法提供组件但进程依然运行。处理这类组件的不健康状态只能通过重启实例的方式。

因此用户可以根据业务状态来判断选择合适的处理方式。

### 操作流程

组件健康检测的配置在 _组件控制面板/其他设置_ 页面中。

1.点击健康检测的编辑按钮，弹窗显示健康检测的配置项目。

- 端口：选择组件进行健康检测的端口，若选项中不存在组件实际的检测端口，请到端口管理页面中进行添加。
- 探针协议： 根据上文所述，协议选择支持 TCP 和 HTTP，选择不同的协议后续的设置项目有些不同。
- 不健康处理方式： 默认为“下线”，可以选择“重启”。
- HTTP 协议对应的设置项： 选择 HTTP 协议后可设置检测的路径和请求头（比如需要 Token 请求），注意该路由请求必须返回状态码小于 400 则认为为健康。
- 初始化等候时间：是指开始检测前等待组件实例启动的时间，默认为 4 秒。
- 检测间隔时间：是指连续两次检测任务的时间间隔。
- 检测超时时间：如果检测请求时遇到问题请求被阻塞，超时时间将生效。
- 连续成功次数：是指标记组件实例为健康状态时的连续检测成功的次数。

上述信息根据实际情况填写，保存后需要更新组件健康检测机制将生效。

2.启用/禁用健康检测

特殊情况下开发者可能需要临时禁用健康检测使组件一直处于健康状态。可以使用启用/禁用健康检测功能。修改后需要更新组件即可生效。

## 使用 Job、CronJob 部署组件
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

job任务执行完成，可点击重启按钮，重新执行该任务；也可以点击关闭任务

在组件其他设置中可修改部署类型和任务策略

部署类型
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/ChangeType.png" title="组件部署类型"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/DeploymentType.png" title="修改组件部署类型"/>

任务策略

- 如果是cronjob类型，定时配置必填，如 `*/1 * * * *` 一分钟执行一次
- 最大重试次数：如果任务失败，默认失败认定重启次数为6，可以通过配置调整失败重启次数
- 并行任务数：能够同时运行的Pod数，如设置3个，则有3个任务同时创建并执行
- 最大运行时间：如果Job运行的时间超过了设定的秒数，那么此Job就自动停止运行所有的Pod
- 完成数：完成该Job需要执行成功的Pod数

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/TaskStrategy.png" title="任务策略编辑"/>

cronjob任务执行状态
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/other/CronJob.png" title="cronjob任务执行"/>



## kubernetes属性
### 属性介绍
- nodeSelector   `key: value`

  用于将Pod调度到匹配Label的Node上，如果没有匹配的标签会调度失败
    
- labels `key: value`

  是附加到k8s对象上的键值对标识，支持高效的查找和监听。作用就是字面意思，给k8s对象打上标签，我们可以使用标签来选择对象
    
- volumes
  
  持久化存储
  
  volumes在k8s中定义时的格式为
    ```yaml
    volumes:
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level
    ```
  
  在平台添加属性时不需要在开头定义volumes，如以下格式：
    ```yaml
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level
    ```


- volumeMounts
    
    挂载volumes

    volumeMounts在k8s中定义时的格式为
    ```yaml
    volumeMounts:        #容器内挂载点
        - mountPath: /data
          name: redis-data        #必须有名称
    ```

    在平台添加属性时不需要在开头定义volumeMounts，如以下格式：
    ```yaml
     - mountPath: /data
          name: redis-data
    ```
- affinity

    亲和性调度
    
    详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/

    affinity在k8s中定义时的格式为
    ```yaml
    affinity:
        nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
            - key: disktype
                operator: In
                values:
                - ssd
    ```

    在平台添加属性时不需要在开头定义affinity，如以下格式：
    ```yaml
    nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd
    ```
- tolerations
  
  容忍度
  
  详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/
  
  tolerations在k8s中定义时的格式为
    ```yaml
    tolerations:
      - key: "key1"
        operator: "Equal"
        value: "value1"
        effect: "NoSchedule"
        tolerationSeconds: 3600
      - key: "key1"
        operator: "Equal"
        value: "value1"
        effect: "NoExecute"
    ```

    在平台添加属性时不需要在开头定义tolerations，如以下格式：
    ```yaml
    - key: "key1"
      operator: "Equal"
      value: "value1"
      effect: "NoSchedule"
      tolerationSeconds: 3600
    - key: "key1"
      operator: "Equal"
      value: "value1"
      effect: "NoExecute"
    ```   
- serviceAccountName  `key: value`

- privileged 

    决定是否 Pod 中的某容器可以启用特权模式。 默认情况下，容器是不可以访问宿主上的任何设备的，不过一个“privileged（特权的）” 容器则被授权访问宿主上所有设备。 这种容器几乎享有宿主上运行的进程的所有访问权限。 对于需要使用 Linux 权能字（如操控网络堆栈和访问设备）的容器而言是有用的
    
    privileged: false  `不允许提权的 Pod！`

- env

  环境变量

  详细信息可参考k8s官方文档 https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/define-environment-variable-container/

  env在k8s中定义时的格式为

    ```yaml
    env:
    - name: DEMO_GREETING
      value: "Hello from the environment"
    - name: DEMO_FAREWELL
      value: "Such a sweet sorrow"
    ```
  在平台添加属性时不需要在开头定义env，如以下格式：
  ```yaml
   - name: DEMO_GREETING
     value: "Hello from the environment"
   - name: DEMO_FAREWELL
     value: "Such a sweet sorrow"
  ```


## 常见问题

- 组件滚动更新过程中出现请求故障

> 出现此问题强烈建议设置更加精确的健康检测规则，比如选用 HTTP 模式。

- 其他协议的组件如何设置健康检测

> Mysql,Redis 等更多的应用层协议目前不支持精确检测，请选用 TCP 模式。后续我们将增加使用 `cmd` 的方式进行检测，可以对不同类型的组件进行较好的支持。


## 组件特性管理

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```