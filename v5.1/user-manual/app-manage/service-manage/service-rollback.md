---
title: 服务操作
summary: 服务回滚
toc: true
asciicast: true
---

## 回滚服务到指定版本

服务每次成功部署后，都会生成一个服务版本，每个版本对应一次代码提交（基于源码创建），或者一个镜像（Docker 镜像创建）。

通过 `构建版本管理` 功能，可以将服务回滚到指定版本。

- 构建版本管理

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback01.png" width="100%" />

- 回滚到指定版本
  <img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-rollback02.png" width="100%" />

{{site.data.alerts.callout_danger}}

- 回滚操作是关闭现有版本服务，再启动其他版本服务的过程，本质上是一个服务重启的操作，因此针对单节点服务会中断服务。
- 多节点服务回滚操作采用滚动升级方式，因此时不会影响服务，但会有较短的时间同时存在 2 种版本的情况。

{{site.data.alerts.end}}