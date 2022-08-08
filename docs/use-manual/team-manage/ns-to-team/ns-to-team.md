---
title: 资源导入
description: 识别命名空间资源导入 Rainbond
---

本篇文档介绍了如何从集群中识别非 Rainbond 所管理的命名空间及命名空间以下资源导入 Rainbond。需要注意的是资源识别导入支持的资源有
- **Deployment**
- **StatefulSet**
- **CronJob**
- **Job**
- **Service**
- **PersistentVolumeClaim**
- **Ingress**
- **NetworkPolicy**
- **ConfigMap**
- **Secret**
- **ServiceAccount**
- **RoleBinding**
- **HorizontalPodAutoscaler**
- **Role**

## 前提条件

1. 已了解 Rainbond 的团队、应用、组件等所有模块的概念
2. 存在一个不是 Rainbond 所管理的命名空间并且命名空间下有k8s资源。
3. 把想要放在同一应用下的k8s资源添加上统一的label标签，格式为 `app.kubernetes.io/name:xxx`或`app:xxx`。
4. 了解资源导入的入口(在集群视图下的操作栏里点击导入按钮)。

下面将会以 Linkerd 命名空间为例, 介绍在 Rainbond 上导入Linkerd命名空间及其内部的资源。

## 选择命名空间

1. 从下拉框中选择你要导入的命名空间。

2. 等待页面识别完毕后，你会看到页面会按照应用/资源类型/名称 逐级划分，应用是按照标签`app.kubernetes.io/name:xxx`或`app:xxx`划分的请检查是否有遗漏或排列位置不对的资源，不含划分应用标签的资源会全部放到默认的未分组应用下。

3. 在检测过程中如果有资源位置不对需要调整，或者不想导入了，可点击上一步后进去集群中去调整，调整完成后再重新进入识别页面，识别页面是可以反复查看的。

4. 在查看资源类型及名称并选择命名空间后，确认无误点击下一步进入到高级识别。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/resource_name.jpg" title="资源识别页面"/>

## 高级资源识别

1. 在这个页面你能看到你部署在集群中的资源对应到 Rainbond 各个模块后的体现。其中Deployment、Job、Cronjob、StatefulSet会识别为组件，其他Service、HPA等资源会对应解析为应用视图下的k8s资源中。

2. 在确认无误后，点击确认导入。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/advanced_resources.jpg" title="高级资源识别页面"/>
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/k8s_resources.jpg" title="k8s资源页面"/>


## 资源导入

1. 在经过前两轮的检查后，点击确认导入，Rainbond将开始导入并接管资源，过程需要经过拉取镜像、数据入库等一系列操作，所以需要等待一些时间，等待时间长短取决于命名空间下资源的数量。

2. 导入完成后会跳转到团队视图下，便可以看到 Rainbond 接管后的资源。

3. unclassified应用则是上面所说的默认未分组应用。

Rainbond在接管后不会立刻重启用户在集群中的资源，当用户点击重启或更新等操作后，才会生产出一个完全由 Rainbond 接管的资源。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/team-manage/ns-to-team/import.jpg" title="团队页面"/>
