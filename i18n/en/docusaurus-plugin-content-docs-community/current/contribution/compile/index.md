---
title: Code Contribution Guidelines
description: Rainbond Project Introduction
---

## Introduction to Rainbond related projects

Rainbond mainly consists of the following three projects.Click to view点击查看[技术架构](/docs/quick-start/architecture)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.5/quick-start/rainbond-compile-architecture.png" width="50%" />

[Rainbond-UI](https://github.com/goodrain/rainbond-ui)\
[Rainbond-Console](https://github.com/goodrain/rainbond-console)

- Rainbond-UI and Rainbond-Console together form the business layer.The business layer is a front-end and back-end separation model.UI is the front-end code of the business layer, and Console is the back-end code of the business layer.业务层是前后端分离模式。UI 是业务层的前端代码，Console 是业务层的后端代码。

[Rainbond](https://github.com/goodrain/rainbond-console)

- Rainbond is the implementation of the data center side of the platform, which mainly interacts with the Kubernetes cluster.

## Learn about source code compilation for the Rainbond project

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
