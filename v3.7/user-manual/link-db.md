---
title: 连接数据库
summary: 连接数据库
toc: false
---

<div id="toc"></div>


## 一、连接MySQL

通过 `新建应用` --- `从应用市场安装` 安装MySQL应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-mysql.gif" width="100%" />

### 1.1 关联MySQL应用

进入需要关联MySQL的应用页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-mysql.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 关联MySQL应用后，需要重启该应用
- 关联MySQL应用后，可以通过环境变量名，或者变量值连接MySQL

{{site.data.alerts.end}}


## 二、连接CockroachDB
CockroachDB 是云原生的分布式支持PostgreSQL协议，通过 `新建应用` --- `从应用市场安装` 安装CockroachDB应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-cockroachdb.gif" width="100%" />

### 2.1 关联CockroachDB应用

进入需要关联CockroachDB的应用页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-cockroachdb.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 关联CockroachDB应用后，需要重启该应用
- 关联CockroachDB应用后，可以通过环境变量名，或者变量值连接CockroachDB

{{site.data.alerts.end}}


## 三、创建Redis应用

通过 `新建应用` --- `从应用市场安装` 安装Redis应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-redis.gif" width="100%" />

### 3.1 关联Redis应用

进入需要关联Redis的应用页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-redis.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 关联Redis应用后，需要重启该应用
- 关联Redis应用后，可以通过环境变量名，或者变量值连接Redis

{{site.data.alerts.end}}