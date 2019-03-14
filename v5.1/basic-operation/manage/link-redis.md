---
title: 配置连接Redis
summary: 配置连接Redis
toc: false

---

<div id="toc"></div>

## 创建Redis应用

通过 `新建应用` --- `从应用市场安装` 安装Redis应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-redis.gif" width="100%" />

## 关联Redis应用

进入需要关联Redis的应用页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-redis.gif" width="100%" />

{{site.data.alerts.callout_info}}

- 关联Redis应用后，需要重启该应用
- 关联Redis应用后，可以通过环境变量名，或者变量值连接Redis

{{site.data.alerts.end}}