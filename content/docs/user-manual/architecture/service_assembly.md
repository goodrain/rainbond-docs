---
title: 服务组装
description: 本文描述基于 Rainbond 平台组装微服务架构应用
keywords: 微服务架构 服务组装 服务拆分
---

大家聊微服务的一个关键话题是“服务拆分”。服务拆分一般是指对于一个完整的业务系统，我们需要基于一些因素和机制对其进行业务切分形成一些独立服务组件，这些服务组件独立开发、独立管理、对外提供标准服务。在 Rainbond 中，我们经常说的一句话“部署到 Rainbond 的组件即是一个微服务”。如果的业务是一个遗留系统、一体化架构。那么你先不用考虑如何拆分它，直接先将其部署到 Rainbond 中，先使用微服务的体系将其管理起来。无非它就是提供了多种业务的服务类型，共享属性差一些。如果你的业务已经按照微服务模式开发，比如基于 SpringCloud 微服务架构框架开发的。那么你暂时可能没有拆分的烦恼。但需要将所有服务组件高效的管理起来，持续开发。

因此本篇文章主要聊，将业务系统在 Rainbond 中进行服务化组装。可能你的业务目前采用各种技术架构，有遗留一体化架构，有 SpringCloud 架构，有 Dubbo 架构等等。我们将其统一部署到 Rainbond 平台进行组装。本文将以一个简化的 Demo 用例来说明服务组装机制。

### 前提条件

1. 已掌握 Rainbond 各种组件创建方式 [参考文档](/docs/user-manual/component-create/)
2. 已掌握 Rainbond 组件间通信的原理和用法 [参考文档](/docs/user-manual/component-connection/)
3. 已掌握 Rainbond 服务网络治理插件用法 [参考文档](/docs/user-manual/plugin-manage/mesh-plugin/)
4. 准备一个具有多个组件服务的简单 Demo [参考用例](https://github.com/barnettZQG/Demo-RestAPI-Servlet)
