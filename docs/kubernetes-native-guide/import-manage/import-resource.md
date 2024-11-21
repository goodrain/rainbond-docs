---
title: 导入已有资源
description: 导入 Kubernetes 命名空间下的已有资源到 Rainbond 中管理。
keywords:
- 导入 Kubernetes 已有资源
---

本篇文档介绍了如何将集群中命名空间下的资源导入 Rainbond 。  

:::caution
* 治理模式默认为 k8s 原生 service 模式
* Rainbond 创建或导入过的命名空间以及 'kube-' 开头的命名空间不会被识别。
* 仅支持部分类型的转换，详细支持转换资源类型如下。
* 导入过程中，如果组件类型资源的 pod 模版内有多个容器， Rainbond 默认只会识别第一个容器，其他容器会丢失，如果想启动多个容器，可以了解一下 Rainbond 的[插件制作](../../use-manual/app-sidecar)。
:::

## 导入转换策略

以下便是按照类型划分的详细的支持资源清单。  

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

如果组件的 volumeMount 挂载了 ConfigMap 类型的 volume ，则会转化为组件的配置文件。  
如果 env 是引用类型，则不会被识别到 Rainbond 的环境变量。  

### k8s资源类型

供应用下的组件调用的资源（暂只支持导入以下几种资源）

|       k8s资源类型                |
| ------------------------- | 
| Service              | 
| PersistentVolumeClaim                    |
| Ingress               |
| NetworkPolicy                   |
| ConfigMap        |
| Secret                  |
| ServiceAccount               |
| RoleBinding                |
| HorizontalPodAutoscaler   |
| Role  | 
该类型资源导入完成后会存储到对应应用下的 k8s 资源中供组件特殊属性使用，特殊属性中volume可以绑定 ConfigMap 、 Secret

## 开始导入

资源导入有两个入口：

1. 平台管理 -> 集群 -> 导入。
2. 团队视图内 -> 新增 -> Kubernetes YAML Helm -> 导入 Kubernetes 已有资源。

### 前提条件

1. 已了解 Rainbond 的团队、应用、组件等所有模块的概念
2. 存在一个不是 Rainbond 所管理的命名空间并且命名空间下有k8s资源。
3. 把想要放在同一应用下的 k8s 资源添加上统一的label标签，格式为 `app.kubernetes.io/name:xxx`或`app:xxx`。
4. 了解资源导入的入口(在集群视图下的操作栏里点击导入按钮)。

下面将会以 Linkerd 命名空间为例, 介绍在 Rainbond 上导入Linkerd命名空间及其内部的资源。

### 选择命名空间

1. 从下拉框中选择你要导入的命名空间。

2. 等待页面识别完毕后，你会看到页面会按照应用/资源类型/名称 逐级划分，应用是按照标签`app.kubernetes.io/name:xxx`或`app:xxx`划分的请检查是否有遗漏或排列位置不对的资源，不含划分应用标签的资源会全部放到默认的未分组应用下。

3. 在检测过程中如果有资源位置不对需要调整，或者不想导入了，可点击上一步后进去集群中去调整，调整完成后再重新进入识别页面，识别页面是可以反复查看的。

4. 在查看资源类型及名称并选择命名空间后，确认无误点击下一步进入到高级识别。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/resource_name.jpg" title="资源识别页面"/>

### 高级资源识别

1. 在这个页面你能看到你部署在集群中的资源对应到 Rainbond 各个模块后的体现。其中Deployment、Job、Cronjob、StatefulSet会识别为组件，其他Service、HPA等资源会对应解析为应用视图下的k8s资源中。

2. 在确认无误后，点击确认导入。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/advanced_resources.jpg" title="高级资源识别页面"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/k8s_resources.jpg" title="k8s资源页面"/>


### 资源导入

1. 在经过前两轮的检查后，点击确认导入，Rainbond将开始导入并接管资源，过程需要经过拉取镜像、数据入库等一系列操作，所以需要等待一些时间，等待时间长短取决于命名空间下资源的数量。

2. 导入完成后会跳转到团队视图下，便可以看到 Rainbond 接管后的资源。

3. unclassified应用则是上面所说的默认未分组应用。

Rainbond在接管后不会立刻重启用户在集群中的资源，当用户点击重启或更新等操作后，才会生产出一个完全由 Rainbond 接管的资源。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/import.jpg" title="团队页面"/>
