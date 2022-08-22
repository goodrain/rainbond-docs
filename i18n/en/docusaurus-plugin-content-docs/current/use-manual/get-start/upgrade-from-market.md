---
title: 6. Application template upgrade
description: How to upgrade the application template, and how to apply the upgraded content to the existing application installed based on the application template.
---

### Purpose

Learn how to upgrade the application template through the documentation, and apply the upgraded content to the applications that have been installed based on the application template.

### significance

Application development is iterative, and each version change requires the application template to have corresponding version control capabilities.An application installed based on a lower version of the application template needs to have the function of upgrading based on the new version of the application template.

### Preconditions

- Complete [to publish the app as app template](/docs/use-manual/get-start/release-to-market/) and have app copied from app **installed based on the example app template.

- **The source application**(the application used to publish the application template) has new changes. In this document, the service component **Redis**is added as an example.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-1.png" title="Changes to the source application" width="100%" />

### Version control of application templates

Republish the source application, and fill in the version number larger than the original version, such as 1.1.Rainbond distinguishes old and new versions by comparing the version number numbers.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-2.png" title="Republishing and Version Control" width="100%" />

After clicking **to publish** , enter the application synchronization page, and you can find the newly added Redis component in the synchronization record.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-3.png" title="App sync" width="100%" />

In the **release record** list, the new version of the application template can be found.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-4.png" title="Version list" width="100%" />

### Upgrading of existing applications

The existing application specifically refers to the application copied from the application **installed based on the sample application template of version 1.0.This application represents an existing running application installed based on the low-version application template. We need to apply the upgraded content in the new version 1.1 to the low-version application.

- Click **to upgrade**in the left column of the application topology map page of **copy, enter **upgrade management** page, here you can specify **current version**,**can be upgraded to version**.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-5.png" title="Upgrade management page" width="100%" />

- Click **to upgrade**on the upgrade management page.Enter the upgrade details page, Rainbond will automatically compare the version differences and display them.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-6.png" title="Upgrade management page" width="100%" />

- Continue to click **to upgrade**,**to upgrade to complete**to complete the entire upgrade process.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-7.png" title="Display of upgrade results" width="100%" />

### Next step

Starting with the next task, we'll start exploring some advanced usage scenarios.
