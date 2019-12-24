---
title: OAuth2.0代码仓库对接
description: 提供第三方平台认证登录（Github、Gitlab、Gitee）
hidden: true
weight: 6010
---

### 平台内置了github,gitlab,gitee三个常用的代码仓库

#### 1. Github
Github目前支持的api版本为v3版本

#### 2. Gitlab
Gitlab目前支持的api版本为v4版本

#### 3. Gitee(码云)
Gitee目前支持的api版本为v5版本

#### 代码仓库实现的接口

- 获取用户信息
- 获取用户的项目列表
- 查询项目
- 获取项目的branches和tags
- 创建webhook

> **注意：** gitlab 10.6 版本以后为了安全,不允许向本地网络发送webhook请求

>解决方法：进入Admin area，在Admin area中，在settings标签下面，找到OutBound Request，勾选上Allow requests to the local network from hooks and services ，保存更改即可解决问题


#### 4. Git扩展
详情可参照
https://github.com/goodrain/rainbond-console/tree/master/console/utils/git_api/README.md


