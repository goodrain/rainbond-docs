---
title: Use GitOps for continuous application deployment
description: Continuous application deployment with Rainbond's GitOps capability
keywords:
  - GitOps
  - Continuous deployment
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=7" />

This paper describes how Rainbond connects with GitLab to OAuth and enables rapid deployment and automatic construction of the GitLab project using Webhook.

## Prerequisite

See the [Git repository pair](/docs/devops/code-repository/) document, completing the GitLab repository pair.

:::tip
使用私有化部署 Rainbond 时，需配置 GItLab 允许向本地网络发送 Webhook 请求。

Go to **Admin area -> settings -> NetWork -> Outbound requests**,Check **low requests to the local network from hooks and services**
::

## Build and configure auto-deployment via Rainbond source

Go to \*\*Rainbow Team View -> Add -> Create Component -> Gitlab Project -> Corner Source Item -> Create Component -> Create Component \*\*On Build Page, Open **AutoBuild Button**

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gexqn1b7laj30wc09wdi4.jpg)

When we submit the code, GitLab will send Webhook requests to Rainbond, and Rainbond will automatically build and deploy components if the Commit message contains `@deemploy`.
