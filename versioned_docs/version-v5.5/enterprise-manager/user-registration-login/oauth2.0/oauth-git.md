---
title: OAuth2.0代码仓库对接
description: 提供第三方平台认证登录（Github、Gitlab、Gitee）
---

平台内置了 github,gitlab,gitee 三个常用的代码仓库

#### 1. Github

Github 目前支持的 api 版本为 v3 版本

#### 2. Gitlab

Gitlab 目前支持的 api 版本为 v4 版本

#### 3. Gitee(码云)

Gitee 目前支持的 api 版本为 v5 版本

#### 代码仓库实现的接口

- 获取用户信息
- 获取用户的项目列表
- 查询项目
- 获取项目的 branches 和 tags
- 创建 webhook

**注意：** gitlab 10.6 版本以后为了安全,不允许向本地网络发送 webhook 请求

解决方法：进入 Admin area，在 Admin area 中，在 settings 标签下面，找到 OutBound Request，勾选上 Allow requests to the local network from hooks and services ，保存更改即可解决问题

#### 4. Git 扩展

详情可参照
https://github.com/goodrain/rainbond-console/tree/master/console/utils/git_api/README.md
