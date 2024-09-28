---
title: Microservice performance analysis
description: This paper introduces the concept, principle, implementation and application scenario of microservice performance analysis.
keywords:
  - Performance Analysis
  - profile
  - Pyroscope
  - Arthas
---

As micro-service systems fall into productive environments, problems arise such as excessive flows that cause performance bottlenecks for a micro-service application, high CPU utilization, or leakage from memory.To find out the root causes of the problem, we usually judge the root causes by logs, processes, and codes.This is bound to be time-consuming and difficult to identify key problem points in a timely manner for operations with large microservices.

This series will introduce the **Continuous Performance Analysis Platform** which will help us quickly find code for memory leaks and high CPU usage.

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
