---
title: Custom development and continuous iteration for offline environments
description: Use Rainbond for offline environment custom development and continuous iteration
keywords:
  - Offline delivery
  - toB offline delivery
  - toB offline delivery
  - Offline environment customization
  - Continuous iteration of offline environments
---

## Customize pain points for offline environments

After the application has been delivered to the customer, the client will see the effect and will continue to iterate until the client is satisfied and the product will need to be frequently upgraded.In this scenario, the following problems will be encountered.

**Custom delivery iterations are less efficient**

In the customized delivery scenario, for client feedback, the upgrade process is complex and inefficient if developers are customized in the company.If the developer develops on the site of the client, it does not have a good development tool and environment, and it is inefficient and has a high level of human input;

**Post-maintenance is more difficult**

After the delivery of the application has been completed, it will be necessary to guarantee the stability of the application's operation, the offline environment will not be viable, alerts will not be sent and delivery will be difficult, and the support costs will be higher when the product has bugs, some expected changes or upgrades will require a client site.

## Use Rainbond to achieve customization development and continuous iterations

### Custom Development

As shown in the graph below.Developers are developing in the development environment and can put the business together through the source code, mirrors, and generic modules of the application market sediment.Version 1.0 can be published after the tester has verified it.The capacity of the application market can be subsidised.Deliveries export the application template after the customer environment imports.You can be deployed on the customer environment button.Rainbond blocks differences for you, eliminates environmental inconsistencies, and makes your app fully compatible with the development test environment.This has resolved the inefficiencies in the development of the developer field and the difficulty of subsequent upgrading.

### Continuous iteration

When the application is delivered to the client environment, the client experiences tend to present some customized needs, and when the developer receives these feedback, it will only be necessary to continue to create new `business module D` and original apps in the development environment.Last released version 2.0 to the Marketplace.After the person is imported into the customer environment, it is up to the user to decide when to upgrade.All changes will be displayed and scroll upgrades will be implemented.Business disruptions were avoided, while consistency was ensured in business applications.

Of these, Rainbond has a version control system, which means quick upgrades and rolls between different versions of the same application.

- For developers, make the required changes on the source side of the application, whether built after changes to the code or new components will be added to the new version of the application template during the next release process.The developer must be aware of the version number defined when published, Rainbond uses it to determine if you want to upgrade or not.

- For deliverers, it is only necessary to import different versions of the application template into the delivery environment, Rainbond automatically identifies different versions of the same application template and can perform one click upgrade.

![offline-continuous-delivery](https://static.goodrain.com/docs/5.11/delivery/offline/offline-continuous-delivery.png)

## Action step

### Preparatory work

1. Having a cluster of ammunition Rainbond that simulates the development environment and the delivery environment (developing environment as online and delivering as offline).

2. Development environment installation, reference[快速安装](/docs/quick-start/quick-install), delivery for environmental installation, reference[离线安装](/docs/installation/offline/).

3. 已完成应用的第一次交付，可参考[微服务架构离线交付](./micro-service.md)。

### Make New Application Template

1. Once the first app delivery has been completed, it can continue to be developed in the development environment according to the needs of customers.As shown in the graph above, add `Business Module D`, continuing to spell the business with the original application and rerelease when development tests are completed.

2. On the left side of the Apps Topic page, select `Posting`, at this point the release history will be shown, and continue with the `Publish to the Component Library` will enter the template settings page.You can only select a previously published template at this time, enter a new version number and confirm the release.各个参数详细说明参考[附录1: 模版设置页面参数说明](../app-model-parameters.md)

3. Then you can see the published app template in \`Platform Manager-> App Marketplace -> Local Component Library'.Tap into to see all versions of this template, as shown in the graph below.

![one-key-deploy-update-6.png](https://static.goodrain.com/wechat/one-key-de-employ-upgrade/one-key-de-update-6.png)

:::caution
Note：Only company administrators can see platform management buttons.
:::

### Export Application Template

1. `Platform manage->Marketplace->Local Component Library', selects `Export App Template`. You can select the version to export and the type of package to export.Here we choose `Apply Model Norms`, and just released version, click `Export\`.This package will contain complete shipping features for continued delivery and upgrading.

2. After the export is completed, download the app template to local and save it to mobile storage devices such as UDs/CD-ROMs and take it to offline delivery environments.

### Upgrade app in offline environment

1. In an offline environment where Rainbond has been deployed, we open the `Platform Manager -> App Marketplace`, choose `Offline Import` and upload the just downloaded app template.After uploading, click `confirm import`.

2. Once the import is completed, you will automatically jump back to the \`App Marketplace'.

3. 此时我们回到[微服务架构离线交付](./micro-service.md)中已经交付完成，正在运行的应用页面中，在左侧边栏`升级`选项中。It can be seen that Rainbond recognized the latest version, and the upgrade operation was very useful as a one-click trigger.

![one-key-deploy-update-7.png](https://static.goodrain.com/wechat/one-key-de-employ-upgrade/one-key-de-update-7.png)

:::caution
Note：does not change environmental configuration class information during upgrading. The value of the environment variable, the content of the configuration file, and the persistent storage will require artificial changes to take effect.
:::

### Rollback

1. When an exception is required to roll back after an upgrade version is online, the platform provides a one-click rollback. In the `Upgrade - >Update Records`, select the corresponding record to roll back the upgrade action by clicking the `Roll` button.

:::caution
Note：does not delete the new component during rollover and needs to be manipulated for changes.
:::
