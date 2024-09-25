---
title: Install the app
description: Install your app from open source app stores
---

## Install from the market

Rainbond proposes an application model, the Rainbond Application Model (RAM), which is the standard Rainbond application specification.Based on this model and Rainbond's application market mechanism, one-click installation/upgrade is finally realized.The highly automated delivery experience improves enterprise application delivery efficiency and reduces delivery costs.基于该模型以及 Rainbond 的应用市场机制，最终实现了一键安装/升级。高度自动化的交付体验，提升了企业应用交付效率，降低交付成本。

The application marketplaces provided by Rainbond are divided into two categories:

**1. Local component library**

:::info

The local component library is the application market that comes with Rainbond, and all the application templates you publish under this enterprise can be saved here.Other users within the enterprise can quickly replicate the application by installing the application template from the local component repository.Publishing to the local component library can refer to: [a reusable application template](/use-manual/get-start/release-to-market.md).企业内部的其他用户可以通过从本地组件库安装应用模版来快速复制这个应用。发布到本地组件库可以参考: [制作可复用的应用模版](/docs/use-manual/get-start/release-to-market.md)。

:::

**2. Open source app store**

:::info

The open source application store is an application market officially supported by Haoyu Technology. All Rainbonds can connect to this market and install the above applications with one click.

:::

The main difference between the local component library and the cloud application market is that the applications you publish in the local component library can only be circulated in the deployed Rainbond environment.Applications published to the cloud application market can be installed in multiple Rainbond environments with one click.而发布到云应用市场的应用，可以在多套 Rainbond 环境中一键安装。

### Install online from open source app stores

When you have deployed Rainbond, click the App Market button on the left, select Open Source App Store, and you will see the following page.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/appstore.jpg" title="云端应用市场授权示意图"/>

After obtaining authorization, you will be able to click Install on the right side of the app, as shown below:

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app.png" title="云端应用市场安装示意图"/>

Select the team and application you want to install, it will jump to the application, you can see the application topology, it will start automatically.Then you can access the app接下来你就可以访问应用了

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/install-app-topological.png" title="云端应用市场安装应用拓扑图"/>

### Install offline from open source app stores

When you browse apps in[App Store](https://hub.grapps.cn/marketplace), some apps have offline packages that can be downloaded. At this time, you can log in and download the offline packages.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/offline-package-app.jpg" title="离线包示意图"/>

After the download is complete, we can select the application market in Rainbond, and click the offline import next to it.As shown below.如下图所示。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.6/use-manual/component-create/import-app.jpg" title="离线包导入示意图"/>

After the import is complete, you can see the imported application in the local component library. At this time, click Install on the right side of the application template.Waiting for the build to complete, the offline installation based on the Rainbond application market is completed.等待构建完成，基于 Rainbond 应用市场的离线安装就完成了。
