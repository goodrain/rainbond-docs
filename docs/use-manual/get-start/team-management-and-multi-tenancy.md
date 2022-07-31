---
title: 1.团队管理与多租户
description: 创建多个团队，通过多租户技术隔离资源
# keywords: ['团队 多租户 资源隔离']
---

### 目的

通过文档学习 Rainbond 中团队、角色、用户如何管理。什么是多租户技术，通过多租户技术实现什么效果。

### 意义

- 按照企业既有的人员组织架构，创建不同的团队，为企业员工创建用户并通过角色分配合适的权限，是使用 Rainbond 的第一步。

- 理解 Rainbond 如何通过 **多租户** 技术，实现资源的隔离。

### 前提条件

#### 私有部署用户

对于将 Rainbond 私有化部署在自己的服务器（物理机、虚拟机、阿里云 ECS 等）的用户，需要满足如下条件：

- 安装好的 Rainbond 集群。

- 完成了 [企业管理员注册](/docs/use-manual/enterprise-manage/enterprise-settings/base/user-register)。

### 创建团队

团队的概念，详见 [团队](/docs/use-manual/get-start/concept/team/)，用户需要了解如何用好团队。

同一个团队可以开通多个数据中心，并统一管理该团队在不同数据中心下的资源。

创建团队的方法参见 [创建团队](/docs/use-manual/enterprise-manage/teams/create-team)。

尝试在默认数据中心创建 **开发团队**、**测试团队**。

### 创建用户

通过 [普通用户注册](/docs/use-manual/enterprise-manage/enterprise-settings/base/user-register) 注册公司其他人员的用户，并根据企业的组织架构将用户分配到上一步所创建的各个团队中，并赋予合适的角色。

单个用户可以在多个团队中扮演不同的角色，如果用户不属于某个团队，那么他将无法访问该团队下的所有资源，甚至无法在团队列表中看到这个团队。

### 多租户

Rainbond 通过多租户技术来完成资源的隔离。每个团队在指定的数据中心，都有一个租户与之对应。不同团队之间的应用互不可见。

### 下一步

接下来，我们将开始探索如何在 Rainbond 创建第一个应用、第一个服务组件。
