---
title: 升级
Description: Describes the Rainbond upgrade via host installation and Helm installation
keywords:
  - Rainbond version upgrade
---

## 概述

Rainbond 支持界面化的在线升级，通过界面化的在线升级可以快速升级 Rainbond 版本。所有安装方式都支持在线升级。

## 升级流程

:::tip
如存在多个集群，将会全部都升级。
:::

在 **平台管理 -> 企业设置 -> 版本升级** 中，可以查看到当前 Rainbond 版本和最新版本，点击 **去更新** 按钮即可开始升级。

升级过程中 Rainbond 会做如下操作：

1. 滚动升级 Rainbond 组件镜像
2. 如有 SQL 变更，会自动执行 SQL 变更

## Version Change Log

您可以在 [历史版本变更日志](https://github.com/goodrain/rainbond/releases) 中查看每个版本的具体变更内容。
