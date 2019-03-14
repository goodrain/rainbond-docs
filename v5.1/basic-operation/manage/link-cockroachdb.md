---
title: 配置连接CockroachDB
summary: 配置连接CockroachDB
toc: false

---

<div id="toc"></div>

## 创建 CockroachDB
CockroachDB 是云原生的分布式支持PostgreSQL协议，通过 `新建应用` --- `从应用市场安装` 安装CockroachDB应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-cockroachdb.gif" width="100%" />

## 关联CockroachDB应用

进入需要关联CockroachDB的应用页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-cockroachdb.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 关联CockroachDB应用后，需要重启该应用
- 关联CockroachDB应用后，可以通过环境变量名，或者变量值连接CockroachDB

{{site.data.alerts.end}}