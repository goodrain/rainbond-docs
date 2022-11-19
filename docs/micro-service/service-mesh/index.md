---
title: Service Mesh 使用指南
description: 本章文档介绍 Rainbond 的 Service Mesh 功能，包括 Service Mesh 的概念、功能、使用方法等。
keywords:
- Service Mesh
- 服务网格
- Istio
- Envoy
---

Service Mesh 既服务网格，作为服务间通信的基础设施层。轻量级高性能网络代理，提供安全的、快速的、可靠地服务间通讯，与实际应用部署一起，但对应用透明。应用作为服务的发起方，只需要用最简单的方式将请求发送给本地的服务网格代理，然后网格代理会进行后续的操作，如服务发现，负载均衡，最后将请求转发给目标服务。

## Service Mesh 支持

Rainbond 支持三种 Service Mesh 方案：

1. 内置 Service Mesh：Rainbond 内置了一个 Service Mesh，基于 Istio 和 Envoy 实现，无需额外安装，直接使用。
2. 原生 Service：Rainbond 支持使用 Kubernetes 原生 Service 作为 Service Mesh，无需额外安装，直接使用。
3. Istio：Rainbond 支持使用 Istio 作为 Service Mesh，支持 Istio 1.11.4 及以上版本。

## Service Mesh 服务间通信与治理模式

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```