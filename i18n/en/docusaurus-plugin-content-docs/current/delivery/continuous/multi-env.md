---
title: Continuous delivery in multiple environments
description: This section explains how to implement multi-environment continuous delivery on Rainbond
keywords:
  - Multi-environment
  - Continuous delivery
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005328921&page=4" />

## Flow chart of environmental delivery on Rainbond

As shown in the figure below, we use the Rainbond application template as an example for the ongoing delivery of the cloudy environment, usually requiring the following process.

<!-- ![multi-env-delivery](https://static.goodrain.com/docs/5.10/delivery/multi-env-delivery.jpg) -->

![](https://static.goodrain.com/docs/5.11/delivery/continuous/source-code/multi-env-delivery.png)

1. Contains multiple clusters with Rainbond and can connect to private and public clouds, etc.

2. When the app tests developed by the developer are passed, they are posted to the local app market and finally deployed to various public cloud settings via the app template in the application market.

## Action step

### Preparatory work

1. Have a set of Rainbond clusters, refer to[快速安装](/docs/quick-start/quick-install).

### Rainbond multiple clusters

1. After completing installation of the Rainbond Console Console console, enter the Rainbond Console `Platform Management -> Cluster -> Add Cluster`, and install the Rainbond cluster on the server of the public or private clouds, as directed, to add and connect multiple clusters.Multi cluster sequential impact map:point_down:

<img src="https://pic.imgdb.cn/item/61a5d0802ab3f51d91d5afc2.png" alt="image-20211118142459214"  />

2. We assume that three clusters have been interfaced in this environment, namely, `intranet', `Aliyun — Qinga`, and `Aliyun — Shanghai, at which time three teams were created on `Platform Managers->Teams`, `Production_Qing`, and `Production_Shanghai`, and the group selected `intranet`, `Aliyun — Teen` and \`Aliyun — Shanghai, respectively.

### Set Mirror Repository

1. In `Platform Management>Settings->Internal Component Repository Mirror Repository`, a mirror repository that can be accessed by multiple environments will be pushed to the Marketplace, so that this repository is the key to the app running in multiple environments.

### Deploying Development Test Environment

1. 首先可以在`测试-内网`团队内，参考[基于源代码创建组件](/docs/devops/app-deploy/)，根据你的代码语言部署你的各个业务模块。

2. After each operation has been deployed, you get a fully running app on Rainbond by reference to[微服务架构指南](/docs/microservice/overview) to organize your services.

### Make Application Template

1. On the left side of the App Popup page, you can enter the template settings page by selecting `Post->Publish to the component library`.Details for each parameter [Appendix 1: Template Settings Parameters](/docs/delivery/app-model-parameters)

2. Create a new application template`. Optionally publish in a corporate domain, set the release version `1.0`, click `Subred`, then synchronize the images of all components and push them to the mirror repository we have just set up.Once syncing is finished, click `Confirm Posting`.Then you can see the published app template in `Platform Manager-> App Marketplace -> Local Component Library'.

:::caution
Note：Only company administrators can see platform management buttons.
:::

### Multi-environment delivery

1. After the test has passed the `test-intranet` installation, the test will mark the version as Status of Release, and the final person will be able to deploy and deliver it to other publicly available cloud environments.

2. Deliveries can be delivered in `Platform Admin -> App Marketplace -> Local Component Library`, see the state of the app's Release, and can be assured with that version.

3. By clicking on the right side of the `Background Management System` template, the team chooses `Product-Qingy` and the app and version to be installed, you can deploy the production environment in the `Aliyun - Qinga` cluster.

4. The `Aliyun - Shanghai` cluster is deployed as above.

### Continuous upgrade and rollback

1. If there is a problem, it will still be a new version released by the developer, and the test will be released to the application market once the test has passed.

2. Vehicle personnel will be available online by selecting `Update` in the `production environment` where they are deployed.

3. If you have problems online, you can use the app in the app page by selecting `Upgrade -> Update Records->Roll`.
