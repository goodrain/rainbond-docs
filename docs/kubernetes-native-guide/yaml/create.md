---
title: YAML 转换与创建
description: 本文档介绍 YAML 的识别策略和如何通过上传 YAML 文件创建组件。
keywords:
- Rainbond YAML
- Rainbond YAML 创建组件
---

本篇文档介绍了 Rainbond 识别 YAML 的策略和如何通过上传 YAML 文件创建组件。

## YAML 转换策略

Rainbond 通过识别 YAML 文件中的资源类型，将其转换为 Rainbond 中的组件类型，以及对特定的资源转化为 Rainbond 抽象层，以下便是按照类型划分的详细的支持资源清单：   

### 组件类型资源

该类型资源导入完成后会转换成 Rainbond 中的组件。

| k8s资源                      | Rainbond模型                |
| ------------------------- | ------------------------------|
| Deployment     | 无状态组件             |
| StatefulSet    | 有状态组件             |
| CronJob        | 定时任务组件            |
| Job            | 任务组件               |

### 组件属性资源

组件类型资源自身携带的一些属性值，如Port、ConfigMap、volume等

| 组件属性                      | Rainbond模型                |
| ------------------------- | ------------------------------|
| nodeSelector              | 组件特殊属性 |
| labels                    | 组件特殊属性 |
| tolerations               | 组件特殊属性 |
| volumes                   | 组件特殊属性 |
| serviceAccountName        | 组件特殊属性 |
| affinity                  | 组件特殊属性 |
| volumeMount               | 组件特殊属性/配置文件 |
| privileged                | 组件特殊属性 |
| port                      | 组件端口    |    
| HorizontalPodAutoscalers  | 组件伸缩策略 |
| env                       | 环境变量/组件特殊属性   |
| HealthyCheckManagement    | 组件健康检测 |

* 如果组件的 volumeMount 挂载了 ConfigMap 类型的 volume ，则会转化为组件的配置文件。
* 如果 env 是引用类型，则不会被识别到 Rainbond 的环境变量。  
* 其他的资源全部放在应用视图下的 k8s 资源当中。

## 使用 YAML 创建组件

### 前提条件

1. 对 Kubernetes 资源的 YAML 文件非常熟悉，准备一个或多个 Kubernetes 资源的 YAML 文件。  
2. 检查当前团队和应用是否是期望创建的位置。


### 上传 YAML 文件

1. **在团队视图 -> 新增 -> Kubernetes YAML Helm -> YAML 文件上传** 或者 **应用视图 -> 添加组件 -> 基于 YAML 创建**
2. 上传 YAML 文件
3. 在确认无误后，点击创建。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_push.jpg" title="上传yaml"/>

### Kubernetes 资源名称

1. 这一部分可以识别全部的k8s资源，部分资源可转换为 Rainbond 资源的，其他资源全部存放在应用下的k8s资源当中。
2. 检查无误后点击下一步

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/yaml_resource_name.jpg" title="yaml资源名称"/>

### 高级资源识别

1. 在这个页面你能看到你部署在集群中的资源对应到 Rainbond 各个模块后的体现。其中Deployment、Job、Cronjob、StatefulSet会识别为组件，其他Service、HPA等资源会对应解析为应用视图下的k8s资源中。
2. 在确认无误后，点击部署。
3. 部署需要数据存储、拉取镜像等操作所以时间会比较长，稍加等待后便会跳到应用视图下

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/advanced_resources.jpg" title="高级资源识别"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/package-support/team.jpg" title="跳转团队视图"/>
