---
title: 应用总览
description: 应用总览
---

## 应用总览介绍

应用总览视图包含了整个应用的基本信息，使应用管理人员更方便的查阅应用内的状态等。

![](https://static.goodrain.com/docs/5.6/use-manual/app-manage/overview/overview.png)

应用总览详细信息如下：

|                                                              | 介绍                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [应用名称](#应用名称修改)                                    | 展示应用名称                                                 |
| 应用资源监控                                                 | 展示应用内所有组件使用的 CPU、内存、磁盘                     |
| [应用生命周期](/docs/use-manual/app-manage/overview/operation) | 应用生命周期管理，批量启动、停用、更新、构建等               |
| [应用拓扑图](/docs/use-manual/app-manage/overview/app-topology) | 应用拓扑图管理，管理组件之间的依赖，添加、删除               |
| [添加组件](/docs/use-manual/app-manage/overview/add-service) | 在应用内添加组件，与团队视图添加组件效果一致                 |
| [治理模式](/docs/use-manual/app-manage/overview/model/governance-model) | 应用治理模式切换，可切换 内置ServiceMesh模式、Kubernetes原生Service模式、Istio治理模式 |
| [快速复制](/docs/use-manual/app-manage/overview/app-copy)    | 将已部署的组件快速复制出新的组件，可批量复制。               |
| [操作组件](/docs/use-manual/app-manage/overview/app-topology#拓扑图组件操作)    | 通过拓扑图对组件进行基础操作以及展示基本信息等。               |




```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```



## 应用名称修改

点击应用名称即可修改，英文名称不可修改。