---
title: 服务相互通信（以服务连接数据库为例）
description: 讲述Rainbond服务之间相互通信的文档
hidden: true
---

本文介绍一种最基础的`服务发现`与`服务注册`用例：连接平台内数据库。首先需要在平台内安装数据库服务，并开启服务端口的`对内服务`属性（云市安装的数据库默认已开启），表示注册当前服务到租户可用范围内。这时在需要连接数据库的服务（Web）上设置依赖属性，依赖已安装的数据库，表示当前服务需要发现数据库服务。这时平台将自动的完成服务发现工作并为Web服务注入数据库连接方式（主机地址，端口，账号密码等）。Web通过获取变量信息得到数据库地址进行连接请求，这个过程可以类比于JavaSpring的依赖注入。下面将详细介绍操作方式：

## 一、连接MySQL

通过 `新建应用` --- `从应用市场安装` 安装MySQL应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-mysql.gif" width="100%" />

### 1.1 关联MySQL服务

进入需要关联MySQL的服务页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-mysql.gif" width="100%" />

{{% notice note %}}

- 关联MySQL服务后，需要重启该服务
- 关联MySQL服务后，可以通过环境变量名，或者变量值连接MySQL

{{% /notice %}}


## 二、连接CockroachDB
CockroachDB 是云原生的分布式支持PostgreSQL协议，通过 `新建应用` --- `从应用市场安装` 安装CockroachDB应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-cockroachdb.gif" width="100%" />

### 2.1 关联CockroachDB服务

进入需要关联CockroachDB的服务页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-cockroachdb.gif" width="100%" />

{{% notice note %}}

- 关联CockroachDB服务后，需要重启该服务
- 关联CockroachDB服务后，可以通过环境变量名，或者变量值连接CockroachDB

{{% /notice %}}


## 三、创建Redis服务

通过 `新建应用` --- `从应用市场安装` 安装Redis应用
<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/create-redis.gif" width="100%" />

### 3.1 关联Redis服务

进入需要关联Redis的服务页面，点击 `依赖` 标签页，选择 `添加依赖` 按钮

<img src="https://static.goodrain.com/images/docs/3.6/basic-operation/manage/link-redis.gif" width="100%" />

{{% notice note %}}

- 关联Redis服务后，需要重启该服务
- 关联Redis服务后，可以通过环境变量名，或者变量值连接Redis

{{% /notice %}}
 No newline at end of file
