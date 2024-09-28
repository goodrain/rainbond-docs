---
title: 6. Application template upgrade
description: How to upgrade the application template, and how to apply the upgraded content to the existing application installed based on the application template.
---

### Purpose

Learn how to upgrade the application template through the documentation, and apply the upgraded content to the applications that have been installed based on the application template.

### significance

The development of the app is iterated, and changes to each version require the application template to have the same version control capability.Application development is iterative, and each version change requires the application template to have corresponding version control capabilities.An application installed based on a lower version of the application template needs to have the function of upgrading based on the new version of the application template.

### Preconditions

- Complete [to publish the app as app template](/docs/use-manual/get-start/release-to-market/) and have app copied from app \*\*installed based on the example app template.

- **The source application**(the application used to publish the application template) has new changes. In this document, the service component **Redis**is added as an example.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-1.png" title="源应用的变动" width="100%" />

### Version control of application templates

Republish the source application, and fill in the version number larger than the original version, such as 1.1.Rainbond distinguishes old and new versions by comparing the version number numbers.Rainbond distinguishes old and new versions by comparing version numbers.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-2.png" title="重新发布与版本控制" width="100%" />

After clicking **to publish** , enter the application synchronization page, and you can find the newly added Redis component in the synchronization record.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-3.png" title="应用同步" width="100%" />

In the **release record** list, the new version of the application template can be found.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-4.png" title="版本列表" width="100%" />

### Upgrading of existing applications

The existing application specifically refers to the application copied from the application \*\*installed based on the sample application template of version 1.0.This application represents an existing running application installed based on the low-version application template. We need to apply the upgraded content in the new version 1.1 to the low-version application.This app represents an existing app installed based on the low version of the app template. We need to upgrade the content in the new version 1.1 to the lower version of the application.

- Click **to upgrade**in the left column of the application topology map page of \*\*copy, enter **upgrade management** page, here you can specify **current version**,**can be upgraded to version**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-5.png" title="升级管理页面" width="100%" />

- **Update** on the upgrade admin page.Click **to upgrade**on the upgrade management page.Enter the upgrade details page, Rainbond will automatically compare the version differences and display them.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-6.png" title="升级管理页面" width="100%" />

- Continue to click **to upgrade**,**to upgrade to complete**to complete the entire upgrade process.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-7.png" title="升级结果展示" width="100%" />

### Next step

Starting with the next task, we'll start exploring some advanced usage scenarios.
