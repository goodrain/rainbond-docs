---
title: 服务版本管理
description: Rainbond服务版本的管理和版本回滚文档
hidden: true
---

### 服务版本管理

服务每次成功部署后，都会生成一个服务版本，每个版本对应一次代码提交（基于源码创建），或者一个镜像版本（Docker 镜像创建）

通过 `构建版本管理` 功能，可以将服务回滚到指定版本，Rainbond 默认保留服务构建成功的版本。

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback01.png" width="100%" />

版本管理中可以查询当前运行的版本，构建的历史版本和版本构建成功率。每一个版本都可以追溯代码提交记录或源镜像记录。



### 版本回滚

### <img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback02.png" width="100%" />

服务可以随时回滚到历史构建成功的版本，Rainbond回滚操作与升级类似，采用滚动的方式进行。

{{% notice info %}}

- 多节点服务回滚操作采用滚动升级方式，因此时不会影响服务，但会有较短的时间同时存在 2 种版本的情况。
- Rainbond 5.X版本中对于服务回滚只会回滚代码和镜像运行环境，对服务配置（端口、环境变量、内存设置等）不会回滚到历史状态。
- 若你需要将应用整体回滚到历史的状态，包括持久化数据，请使用[应用备份与恢复机制](/user-manual/app-manage/app-backup/)

{{% /notice %}}