---
title: 团队资源配额
description: Team Resource Quota
keywords:
- 团队资源配额
- Team Resource Quota
---

## 概述
在 rainbond 平台使用中，为了更好的管理和分配资源，在团队层面增加了资源配额功能，设置团队可以使用的 CPU 或者内存大小。

### 功能使用
控制资源使用：命名空间资源配额可以帮助管理员控制在特定命名空间中使用的资源量，以避免过度使用导致应用程序或系统出现故障或崩溃。

分配资源：命名空间资源配额可以确保每个命名空间中的应用程序都有足够的资源来运行，并在资源不足时限制使用。

限制资源泄漏：在多租户环境中，命名空间资源配额可以限制租户对系统资源的访问，并减少由于应用程序故障或恶意行为导致的资源泄漏。

优化资源使用：通过配置适当的资源配额，可以使管理员和开发人员更好地了解应用程序的资源使用情况，并更好地优化应用程序的资源使用。

以下介绍如何配置以及配置后的效果

#### 配置
1. `平台管理 -> 项目/团队`，选择需要资源配额的团队

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/team-resource/team-resource.png)

2. 设置 CPU 或则内存，默认值是0代表不限制。
![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/team-resource/quota.png)


#### 效果
当对组件进行创建、构建、启动、安装等操作的时候，如果内存或者 CPU超出团队剩余资源量，则会提示资源不足。

