---
title: 7. Deliver the application to the customer
description: In offline production environments, delivered through the App Market.
---

### Purpose

Learn from the documentation how Rainbond delivers applications to customers through the application market and subsequent upgrades in the actual production environment if it encounters a completely offline situation.

### significance

交付的最终环境完全离线是一种很常见的情况。在这种情况下如何进行软件开发产品的交付就是一个很现实而且很难解决的问题。针对这种情况，可以使用 Rainbond 的离线交付体系来应对。

### Preconditions

- In an offline production environment, install Rainbond offline.

- It is a very common situation that the final environment delivered is completely offline.In this case, how to deliver software development products is a very realistic and difficult problem to solve.In response to this situation, Rainbond's offline delivery system can be used to deal with it.The development environment installs Rainbond for online development, and publishes the developed business system as an application template.This document uses [to publish the application as the application template published in Application Template](/docs/use-manual/get-start/release-to-market/) as an example.

### Export application template

Published application templates can be directly exported into two forms of offline application packages, which can be delivered in a completely offline environment.

- **RainbondApp specification** Offline application package, which can be used to import application templates in other Rainbond platforms. Once imported, it can be deployed from the application market.

- **DockerComposeApp Specification** Offline application package, which can be deployed in an offline environment with Docker Compose, this package will contain the component base image and the corresponding **docker-compose.yaml** file.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-6.png" title="导出应用模版" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-7.png" title="导出应用模版" width="50%" />

- Select **to export version**.
- Click **RainbondApp Specification** in **Export**, after a period of time, the export will be automatically completed.
- Click **to download**to download the offline application package.

> Note that version 5.3 tweaks the exported app package specification and is therefore not backward compatible.Can only be imported into 5.3 and later platforms.只能导入到 5.3 及后续版本平台中。
>
> But the application package exported by the 5.2 version can be imported into the 5.3 platform.

### Import application template

The exported application template exists as an offline application package.This package can be transferred to an offline production environment using other media (CD-ROM, removable hard disk, etc.).Next, we need to import this package into offline Rainbond.这个包可以用其他介质（光盘、移动硬盘等）转移到离线生产环境中。接下来，我们需要将这个包导入离线 Rainbond 中去。

- Enter the **application market** page, click **+** ,**to import the application template**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/offline-delivery-with-market/offline-delivery-with-market-1.png" title="导入应用模版" width="100%" />

- Upload offline application packages.

- Select the application template and import it.

After the above operations, the application template is imported into Rainbond in the offline production environment.

Next, referring to the operation of deploying
the application market, you can install the application template into the production environment.

### Application template upgrade in offline environment

If you use the **export application template** function, and import the exported offline application package conforming to **RainbondApp Specification** into the offline Rainbond cluster.So how to apply the upgraded application template to the offline Rainbond cluster?那么如何将升级后的应用模版应用到离线的 Rainbond 集群中去呢？

- Export the new version of the application template, pay attention to specify the new version.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-8.png" title="导出新版本应用模版" width="50%" />

- Import the exported application template into the offline Rainbond environment.

- To upgrade an existing application, refer to [Application Template Upgrade](/docs/use-manual/get-start/upgrade-from-market/).
