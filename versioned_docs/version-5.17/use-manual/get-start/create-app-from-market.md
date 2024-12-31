---
title: 3.部署一个 Mysql 服务
description: 基于应用市场一键构建并部署一个应用
# keywords: ['应用 业务组件 应用市场 构建 部署]
---

### 目的

通过文档学习如何通过 Rainbond 特有的应用市场机制一键部署应用。

### 意义

这是一种非常快捷的部署方式，相对于部署一个单个的服务组件，这种部署方式可以快速部署包含多个服务组件的完整业务系统。基于 Rainbond 实现的多种高级场景都以应用市场为基础。

### 前提条件

- 完成 [团队管理与多租户](../get-start/team-management-and-multi-tenancy/)。完成第一个团队的创建。

- 已经安装好的 Rainbond 集群，或者已经对接好 Rainbond Cloud 公有云服务。

- 完成 **应用市场** —— **云端同步** 的认证。

### 基于应用市场创建组件

- 在指定团队页面下，依次点击 **新增**、**基于应用市场创建组件**。

- 选择希望安装的应用模版，在文档的示例中，以 **MYSQL-Percona 分支单机版 v5.7.23** 为例。

- 点击 **安装**，选择 **版本** 以及 **应用**。

- **确认安装**

<img src="https://static.goodrain.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-1.png" title="从应用市场安装" width="100%" />

<img src="https://static.goodrain.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-2.png" title="从应用市场安装" width="100%" />

### 安装完成

经过一小段时间的等待，这个 Mysql5.7（单机版）就安装完成了。

到这里，**我的第一个应用** 中已经有了两个服务组件。

<img src="https://static.goodrain.com/docs/5.2/get-start/create-app-from-market/create-app-from-market-3.png" title="从应用市场安装" width="100%" />

### 下一步

接下来，我们会探索如何将 **Java 演示示例**、 **Mysql5.7（单机版）** 连接起来，形成一个 **应用**，在 Rainbond 中，我们称由一个或多个服务组件组成，彼此间有相互连接关系的整个业务系统为一个 **应用**。
