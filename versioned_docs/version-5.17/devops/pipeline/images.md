---
title: 镜像仓库
description: 介绍 Pipeline 应用插件的镜像仓库
keywords:
- 介绍 Pipeline 应用插件的镜像仓库
- Intro GitLab Pipeline Plugin image repository
---

镜像仓库展示应用服务构建后生成的镜像制品，该镜像可直接部署到 Rainbond 平台。

Pipeline 应用插件不管理镜像，只针对镜像的版本作为部署使用。

## 前提

* 已经创建了应用服务。
* 流水线成功运行并且已经推送了镜像

## 操作步骤

进入 Rainbond 控制台的团队内，选择左侧菜单栏的 **流水线**，进入 **镜像仓库** 页面。

可选择应用服务，查看该应用服务的镜像版本信息。可选择镜像版本直接部署到 Rainbond 应用内。

:::tip
已经部署过的镜像版本，再次部署不会展示选择应用。只有没再 Rainbond 上部署过的镜像版本，第一次部署会提示选择哪个应用进行部署。
:::

