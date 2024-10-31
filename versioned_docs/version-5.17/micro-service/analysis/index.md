---
title: 微服务性能分析
description: 本文介绍了微服务性能分析的概念、原理、实现方式、应用场景等内容。
keywords:
- 性能分析
- profiling
- Pyroscope
- Arthas
---

随着微服务体系在生产环境落地，也会伴随着一些问题出现，比如流量过大造成某个微服务应用程序的性能瓶颈、CPU利用率高、或内存泄漏等问题。要找到问题的根本原因，我们通常都会通过日志、进程再结合代码去判断根本原因。对于微服务庞大的业务，这必定会很耗时，而且也很难及时找到关键问题点。

本系列将介绍 **持续性能分析平台**，它能够帮助我们快速找到内存泄漏、CPU利用率高的代码。

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```