---
title: 组件版本管理
description: Rainbond组件版本的管理和版本回滚文档
hidden: true
weight: 5018
---

### 组件版本管理

组件每次成功部署后，都会生成一个组件版本，每个版本对应一次代码提交（基于源码创建），或者一个镜像版本（Docker 镜像创建）

通过 `构建版本管理` 功能，可以将组件回滚到指定版本，Rainbond 默认保留组件构建成功的版本。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-rollback/Historical%20version.png" width="100%" />


版本管理中可以查询当前运行的版本，构建的历史版本和版本构建成功率。每一个版本都可以追溯代码提交记录或源镜像记录。

> 注意，Rainbond 默认会自动清理历史版本，对于一个月前的版本, 只保留5个。


### 版本回滚

组件可以随时回滚到历史构建成功的版本，直接点击回滚按钮即可，Rainbond回滚操作与升级类似，采用滚动的方式进行。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-rollback/Exhibition.png" width="100%" />

- 多节点组件回滚操作采用滚动升级方式，因此时不会影响组件，但会有较短的时间同时存在 2 种版本的情况。
- Rainbond 5.X版本中对于组件回滚只会回滚代码和镜像运行环境，对组件配置（端口、环境变量、内存设置等）不会回滚到历史状态。
- 若你需要将应用整体回滚到历史的状态，包括持久化数据，请使用[应用备份与恢复机制](/docs/user-manual/app-manage/app-backup/)

