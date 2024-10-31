---
title: 使用 GitOps 实现应用持续部署
description: 通过 Rainbond 的 GitOps 功能，实现应用的持续部署
keywords:
- GitOps
- 持续部署
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=7" />

本文介绍 Rainbond 如何和 GitLab 进行 OAuth 对接，并实现对 GitLab 中项目的快速部署和利用 Webhook 实现自动构建。

## 前提条件

参阅 [Git 仓库对接](/docs/devops/code-repository/) 文档，完成 GitLab 仓库对接。

:::tip
使用私有化部署 Rainbond 时，需配置 GItLab 允许向本地网络发送 Webhook 请求。

进入 **Admin area -> settings -> NetWork -> Outbound requests**，勾选 **Allow requests to the local network from hooks and services**
:::

## 通过 Rainbond 源码构建并配置自动部署

进入 **Rainbond 团队视图 -> 新增 -> 基于源码创建组件 -> 对应 Gitlab 项目 -> 对应源码项目 -> 创建组件**，在构建页面，打开 **自动构建按钮**

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gexqn1b7laj30wc09wdi4.jpg)

当我们在提交代码时，GitLab 会向 Rainbond 发送 Webhook 请求，Rainbond 检测 Commit 信息包含 `@deploy` 会自动构建并部署组件。