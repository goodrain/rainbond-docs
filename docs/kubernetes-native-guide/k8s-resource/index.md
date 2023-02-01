---
title: 非 Workload 类资源管理
description: 直接通过编写yaml创建k8s资源
---

本篇文档介绍了如何通过yaml文件创建k8s资源，k8s资源是为了满足用户通过手写 yaml 形式 创建 k8s 集群资源的，这里可以创建 k8s 中的所有资源，像 Secret ， PV 等在平台中没有对应的模型的资源便可以通过这种方式创建。此功能模块仅支持创建、编辑修改、删除功能，无法将对应资源转化为 Rainbond 的模型层，如果需要通过yaml文件部署业务，请在应用下选择添加组件->yaml文件部署组件

## 前提条件

1. 对 k8s 资源的 yaml 文件非常熟悉，准备一个k8s资源的yaml文件。  

2. 检查当前团队、应用是否是期望创建的位置。  

3. 检查在同级应用下 k8s 资源里是否已存在同类型且同名的资源，减少资源创建的过程中遇到的问题。  

下面将会以 Linkerd 命名空间为例, 介绍在 Rainbond 上对k8s资源的处理。

## 添加

1. 点击添加按钮

2. 编写yaml文件内容

3. 在确认无误后，点击确定。

4. 查看是否有创建失败的资源，点击查看详情可以查看具体失败原因。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_add.jpg" title="k8s资源添加"/>

:::caution
* 创建失败的资源是查看不到资源类型和资源名称的且不支持修改的，需要删除重新创建。  
* 创建所编写的yaml文件可支持编写多个k8s资源，资源之前用`---`分割，创建完毕后会拆开展示。
:::

## 修改

1. 点击编辑按钮。

2. 修改yaml文件内容。

3. 在确认无误后，点击确定。

4. 查看是否有修改失败的资源，点击查看详情可以查看具体失败原因。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_update.jpg" title="k8s资源修改"/>

:::caution
* 需要注意的是，创建成功后yaml文件会多出一行内容：`resourceVersion:xxxxxx`,这个在修改过程中是不可以删除的。
* 修改yaml文件内容时只支持对当前资源修改，不支持在yaml文件内再次添加新的资源，如想创建资源请走创建逻辑。
:::

## 删除

1. 确认资源不需要后，点击删除按钮。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/app-manage/k8s-resource/k8s_resources_delete.jpg" title="k8s资源删除"/>
