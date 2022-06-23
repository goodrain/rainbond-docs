---
title: 代码贡献指南
description: Rainbond 项目介绍
---

## Rainbond 相关项目介绍

Rainbond 主要由以下三个项目组成。点击查看[技术架构](/docs/quick-start/architecture)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/quick-start/rainbond-compile-architecture.png" width="50%" />

[Rainbond-UI](https://github.com/goodrain/rainbond-ui)  
[Rainbond-Console](https://github.com/goodrain/rainbond-console)

* Rainbond-UI 和 Rainbond-Console 合起来构成了业务层。业务层是前后端分离模式。UI 是业务层的前端代码，Console 是业务层的后端代码。

[Rainbond](https://github.com/goodrain/rainbond-console)

* Rainbond 是平台数据中心端的实现，主要与 Kubernetes 集群进行交互。

## 了解 Rainbond 项目的源码编译

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```