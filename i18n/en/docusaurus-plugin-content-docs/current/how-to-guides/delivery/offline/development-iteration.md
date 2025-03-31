---
title: Custom development and continuous iteration in offline environments
description: Using Rainbond to achieve custom development and continuous iteration in offline environments
keywords:
  - Offline delivery
  - toB offline delivery
  - toB offline delivery
  - Custom development in offline environments
  - Continuous iteration in offline environments
---

## The pain points of custom development in offline environments

After the application is delivered to the customer, the customer will provide feedback after seeing the effect, and then iterate continuously until the customer is satisfied. The process requires frequent product upgrades.In this scenario, the following problems will be encountered.

**Low efficiency of customized delivery iteration**

In the scenario of customized delivery, if developers customize development in the company for problems fed back by customers, the upgrade process is complex and communication is inefficient.If developers are stationed at the customer site for development, without good development tools and environment, the development efficiency is low and the manpower investment is large;

**High difficulty in later maintenance**

After the application is delivered, it is necessary to ensure the stability of the application operation in the later stage. The offline environment cannot be maintained remotely, and alarms cannot be sent out, making maintenance difficult; when the product has bugs, some expected changes or product upgrades require business trips to the customer site, and the support cost is relatively high.

## Using Rainbond to achieve custom development and continuous iteration

### Custom development

As shown in the figure below.Developers can develop in the development environment, and can assemble the business through source code, images, and general modules deposited in the application market.After being verified by the testers, version 1.0 can be released.With the capability of the application market, the capability of the application can be deposited.The delivery personnel export the application template, and after importing it into the customer environment.It can be deployed with one click in the customer environment.Rainbond shields the underlying differences for you, eliminates environmental inconsistencies, and makes your application exactly the same as the application in the development and test environment.This solves the problem of low efficiency of developers stationed at the site for development and subsequent upgrade difficulties.

### Continuous iteration

After the application is delivered to the customer environment, customers often put forward some personalized requirements after experiencing it. After developers get these feedbacks, they only need to continue to create a new `business module D` in the development environment and assemble it with the original application.Finally, release version 2.0 to the application market again.After the delivery personnel import it into the customer environment, the user can decide when to upgrade.During the upgrade, all changes will be displayed and rolling upgrades will be implemented.Avoid business interruption and ensure the consistency of business applications.

Among them, Rainbond's application template has a version control mechanism, which means that between different versions of the same application template, you can quickly upgrade and roll back.

- For developers, making the required changes on the source application side, whether it is code modification and construction, or adding other components, will be superimposed into the new version of the application template in the next application template release process.Developers must pay attention to the version number defined at the time of release, Rainbond uses it to determine whether to upgrade.

- For delivery personnel, just import different versions of the application template into the delivery environment, Rainbond will automatically identify different versions of the same application template, and can perform one-click upgrade operations.

![offline-continuous-delivery](https://static.goodrain.com/docs/5.11/delivery/offline/offline-continuous-delivery.png)

## Operation steps

### Preparation work

1. Have two sets of Rainbond clusters to simulate the development environment and delivery environment (the development environment is online, and the delivery environment is offline).

2. For the installation of the development environment, refer to [Quick Installation](/docs/quick-start/quick-install), for the installation of the delivery environment, refer to [Offline Installation](/docs/installation/offline/).

3. The first delivery of the application has been completed, refer to [Offline Delivery of Microservice Architecture](./micro-service.md).

### Make a new application template

1. After the first application delivery is completed, you can continue to develop in the development environment according to customer requirements.As shown in the figure above, add `business module D`, assemble the business with the original application, and when the development and testing are completed, it can be released again.

2. On the left side of the application topology page, select `Release`, at this time the release history will be displayed in the release record, continue to select `Release to component library`, and you can enter the template setting page.At this time, you only need to select the previously released template, enter the new version number, and confirm the release.For detailed descriptions of each parameter, refer to [Appendix 1: Template Setting Page Parameter Description](../app-model-parameters.md)

3. Next, in `Platform Management -> Application Market -> Local Component Library`, you can see the released application template.Click to enter, you can see all versions under this template, as shown in the figure below.

![one-key-deploy-update-6.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-6.png)

:::caution
Note: Only enterprise administrators can see the platform management button.
:::

### Export application template

1. In `Platform Management -> Application Market -> Local Component Library`, on the far right of the application template just released, select `Export Application Template`, you can choose the version to be exported and the type of package to export.Here we choose `Application Model Specification`, and the version just released, click `Export`.This package will include the complete operation and maintenance characteristics of the application, for continuous delivery and upgrade.

2. After the export is completed, download the application template to the local, save it to mobile storage devices such as USB flash drive/CD, and bring it to the offline delivery environment.

### Upgrade the application in the offline environment

1. In the offline environment where Rainbond has been deployed, we first open `Platform Management -> Application Market`, select `Offline Import`, and upload the application template just downloaded.After the upload is completed, click `Confirm Import`.

2. After the import is completed, it will automatically jump back to `Application Market`.

3. At this time, we return to the application page that has been delivered and is running in [Offline Delivery of Microservice Architecture](./micro-service.md), in the left sidebar `Upgrade` option.You can see that Rainbond has identified the latest version, and the upgrade operation is also triggered with one click, which is very easy to use.

![one-key-deploy-update-7.png](https://static.goodrain.com/wechat/one-key-deploy-upgrade/one-key-deploy-update-7.png)

:::caution
Note: During the upgrade process, environment configuration information will not be changed, the value of environment variables, the content of configuration files, and persistent storage need to be manually changed to take effect.
:::

### One-click rollback

1. In case of abnormal situations after the release of an upgraded version that require a rollback, the platform provides a one-click rollback feature. In the `Upgrade->Upgrade Records` interface, select the corresponding record and click the `Rollback` button to roll back the upgrade operation.

:::caution
Note: During the rollback process, newly added components will not be deleted. If changes are needed, manual operation is required.
:::
