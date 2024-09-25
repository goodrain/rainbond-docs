---
title: Microservice link tracing
description: This paper introduces the concept, principle, implementation and application scenarios of microservice link tracing.
keywords:
  - 链路追踪
  - tracing
  - PinPoint
  - SkyWalking
  - Jaeger
---

## 什么是链路追踪

链路追踪是一种分布式追踪技术，它可以记录一个请求在分布式系统中的调用过程，从而让开发者可以清楚地了解到一个请求在系统中的执行路径，以及每个服务节点的执行情况。链路追踪技术可以帮助开发者快速定位系统中的问题，提高系统的可用性和稳定性。

## 如何使用链路追踪

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
