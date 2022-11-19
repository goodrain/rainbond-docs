---
title: Application overview
description: Application overview
---

## Application overview introduction

The application overview view contains the basic information of the entire application, making it easier for application managers to check the status of the application.

![](https://static.goodrain.com/docs/5.6/use-manual/app-manage/overview/overview.png)

The application overview details are as：

|                                                                                   | introduce                                                                                                                                      |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Application Name](#应用名称修改)                                                       | Show app name                                                                                                                                  |
| Application resource monitoring                                                   | Show the CPU, memory, and disk used by all components in the application                                                                       |
| [application life cycle](/docs/use-manual/app-manage/overview/operation)          | Application lifecycle management, batch activation, deactivation, update, build, etc.                                                          |
| [Application topology](/docs/use-manual/app-manage/overview/app-topology)         | Apply topology map management, manage dependencies between components, add and delete                                                          |
| [add components](/docs/use-manual/app-manage/overview/add-service)                | Adding components in the app has the same effect as adding components in the team view                                                         |
| [Quick copy](/docs/use-manual/app-manage/overview/app-copy)                       | Quickly copy the deployed components to new components, which can be copied in batches.                                                        |
| [Operating components](/docs/use-manual/app-manage/overview/app-topology#拓扑图组件操作) | Perform basic operations on components and display basic information through topology diagrams.                                                |


```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```



## App name modification

Click the application name to modify it, but the English name cannot be modified.