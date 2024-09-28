---
title: 熔断与限流
description: This chapter describes how to use Rainbond to implement service circuit breaker and traffic limiting
keywords:
  - 熔断与限流
  - Envoy
---

Envoy 可以作为 Sevice Mesh 微服务框架中的代理实现方案，Rainbond 内置的微服务框架同样基于 Envoy 实现。本章所描述的熔断实践基于 Rainbond 特有的插件机制实现。

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
