---
title: 安装应用
description: 从开源应用商店安装你的应用
---

## 从应用市场安装

Rainbond 提出了一种应用模型 Rainbond Application Model（RAM），这是标准的 Rainbond 应用规范。基于该模型以及 Rainbond 的应用市场机制，最终实现了一键安装/升级。高度自动化的交付体验，提升了企业应用交付效率，降低交付成本。

Rainbond 提供的应用市场分为两类: 

**1. 本地组件库**

:::info

本地组件库是 Rainbond 自带的应用市场，你在这个企业下发布的所有应用模版都可以保存在此。企业内部的其他用户可以通过从本地组件库安装应用模版来快速复制这个应用。

:::

**2. 开源应用商店**

:::info

开源应用商店是由好雨科技官方支持的应用市场，所有 Rainbond 都可以对接该市场，并一键安装上面的应用。

:::

本地组件库与云应用市场的区别主要在于: 你在本地组件库中发布的应用，只能在部署的这套 Rainbond 环境中流转。而发布到云应用市场的应用，可以在多套 Rainbond 环境中一键安装。

### 从开源应用商店在线安装

当你部署完 Rainbond 时，点击左侧的应用市场按钮，选择开源应用商店，你将会看到如下页面。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/appstore.jpg" title="云端应用市场授权示意图"/>

获取授权后，你将可以点击应用右侧的安装，如下图所示:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app.png" title="云端应用市场安装示意图"/>

选择你要安装到的团队和应用，将会跳转到应用下，你可以看到应用拓扑图，它将会自动启动。接下来你就可以访问应用了

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app-topological.png" title="云端应用市场安装应用拓扑图"/>

### 从开源应用商店离线安装

当你在[应用商店](https://hub.grapps.cn/marketplace)浏览应用时, 部分应用有可下载的离线包，此时，你可以登录并下载该离线包。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/offline-package-app.jpg" title="离线包示意图"/>

下载完成后，我们可以在 Rainbond 中，选择应用市场，点击旁边的离线导入。如下图所示。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/import-app.jpg" title="离线包导入示意图"/>

导入完成后，就可以在本地组件库看见导入的应用，此时点击应用模版右侧的安装。等待构建完成，基于 Rainbond 应用市场的离线安装就完成了。
