---
title: 概述
description: 原生 Kubernetes 指南概述
keywords:
- Yaml Helm 指南概述
- Rainbond Yaml Helm
---

Rainbond 自 V5.8 版本起面向已经熟练使用 Kubernetes 的用户推出利用 Yaml 或 Helm 部署应用的能力。当前指南指导用户如何将已经可以在原生 Kubernetes 中部署的 Yaml 或 Helm Chart 部署到 Rainbond 中，这个过程会自动完成应用模型的转化，后续的管理可以通过 Rainbond 完成。

## 转化原理

Rainbond 扩展了原有的 RAM （Rainbond Application Model） 模型边界，除了最常用的各种运维属性之外，以  `其他设置 > Kubernetes属性` 的形式设置更多属性。保持易用性的同时兼顾了灵活性。为自动化的将原生 Kubernetes 定义转化为 RAM 模型提供了前提条件。

Rainbond 可以从 Yaml 或 Helm Chart 中获取指定类型的 Workload 定义，并转化成为 Rainbond 界面中可管理的组件，目前支持的 Workload 类型包括 Deployment、StatefulSet、Job 和 CronJob。对一些非 Workload 类型的资源，如 Service、Sercet 等资源则进行了额外的处理。

以 Yaml 定义的 Wordpress 建站系统为例，下图展示了对各种不同资源的处理方式。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/wechat/import-exist-resource-to-rainbond/import-exist-resource-to-rainbond-2.png"/>

Rainbond 在设计上并未完全继承原生 Kubernetes 的设计思想，由于以下设计上的差异，Rainbond 在接受 Yaml 或 Helm 应用部署时，需要进行一系列转化，了解这些差异对部署 Yaml 或 Helm 类应用很有帮助。

### 非Workload资源转化至应用

区别于原生 Kubernetes 的使用方式，Rainbond 更加凸显应用这一核心概念的使用。应用这一概念，并非是 Kubernetes 中的某种资源，它是对一组具有关联关系的 Workload 的组合，就像一个网站类的业务系统，往往具有一个由 Deployment 部署的 Web 站点服务，以及一个由 StatefulSet 部署的数据库服务组成。对于 Kubernetes 而言，这是两个可以分开管理的 Workload ，而在 Rainbond 世界里，除了能够精细化的独立管理每个 Workload 之外，更注重将其作为一个完整的应用统一管理。

在原生 Kubernetes 中没有概念与 Rainbond 中的应用概念对应，但用户可以指定将 Yaml 中所有的资源定义都部署到 Rainbond 中的应用中去。当用户在 Yaml 中定义了非 Workload 类的资源（如 Service 、Sercet 等）时，Rainbond 会将其转化后保存在 `应用 > k8s资源` 列表中，并提供编辑入口供用户后续管理。管理方式参见 [非 Workload 类资源管理](/docs/kubernetes-native-guide/import-manage/non-workload)

### Workload资源单独转化

原生 Kubernetes 体系中注重对所有资源的精细化管理，一切皆可定义的使用方式提供了足够高的自由度，却也大幅度提升了入门的门槛。而对于单一 Workload 的管理，Rainbond 在产品设计时着重提升产品的易用性，将最常用的资源规格定义(Spec)转化成为用户易于使用的图形化功能。对于大多数应用而言，Rainbond 提供的功能已经足够。对于额外的资源定义，Rainbond 会在组件的 `其他设置 > Kubernetes属性` 中提供配置入口。

Rainbond 会从用户所提供 Yaml 定义的所有资源中抽取 Workload 相关的定义，并在应用中转化生成 Rainbond 可管理的组件实例。转化的过程中，Rainbond 会自动识别所有可以被管理的规格定义(Spec)，将不同的属性，交由扩展后的 RAM 模型管理，大部分属性延续了 Rainbond 一贯的易用使用体验，而另一部分，则交由 `其他设置 > Kubernetes属性` 页面进行管理。管理方式参见 [组件 kubernetes 属性管理](../../use-manual/k8s-attribute)


## 使用方法

当用户拥有一份可以在 Kubernetes 中使用的 Yaml 文件时，通过 Yaml 部署应用是最简单的方式。请参考 [yaml文件识别创建](/docs/kubernetes-native-guide/yaml/create)。

当用户已经将业务系统制作成为 Helm Chart 包时，通过 Helm 部署应用也是一种很好的选择。请参考 [基于 Helm 命令部署 Helm 应用](/docs/kubernetes-native-guide/helm/helm-cmd-install)，或者在完成 [对接Helm仓库](/docs/kubernetes-native-guide/helm/docking_helm_store) 后， [基于应用市场部署 Helm 应用](/docs/kubernetes-native-guide/helm/creation-process) 。

## 导出 Helm 包

Rainbond 能够接受各种原生 Kubernetes 的输入，也可以将已部署好的应用打包输出成为 Kubernetes 体系可以接受的 Helm Chart 包。这种使用体验和 Rainbond 导出自身生成的 RAM 应用包非常相似。

参见 [导出 Helm Chart 包](/docs/kubernetes-native-guide/helm/export-chart)

## 演示示例

以下文档链接提供了通过 Yaml 或 Helm Chart 的方式在 Rainbond 中部署 Wordpress 建站系统的示例。

[使用 Yaml 部署 Wordpress 和 Mysql](/docs/kubernetes-native-guide/yaml/example)

[使用 Helm 部署 Wordpress 和 Mysql](/docs/kubernetes-native-guide/helm/example)


