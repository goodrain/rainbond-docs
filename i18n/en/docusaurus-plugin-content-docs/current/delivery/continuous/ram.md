---
title: Continuous delivery of application templates
description: This section describes how to implement continuous delivery of application templates on Rainbond
keywords:
  - Application template
  - Continuous delivery
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005311597&page=3" />

## Rainbond Application Models for Continuous Delivery Flow

As shown in the graph below, in the case of \`back-office management system', the following processes are usually required using Rainbond application templates for continued delivery.

1. The user submits the code to the repository when the automated test process is built and performed in the development environment and after the test is completed, if not fed back to the developer to adjust the code quality.

2. When the developer function is largely developed, the developed `back-office management system` will be released to the Marketplace as version `1.0` and then the testers will install version `1.0` from the Marketplace. The full test environment will be deployed for the test.The developer continues to develop based on the development environment, while the testers conduct full functional tests.If the feature test fails, then continue to feed the developer.

3. After the developer has modified the code to republish the version of `2.0` from the background management system when the tester can upgrade to the test environment by one click and continue the test after the upgrade has been completed.

4. When the `3.0` version of the test passes, we can assume that there is a high-quality deliverable version.This version can then be marked on the Marketplace as it has been Release, and then on the production of environmental deployments, the `3.0` version can be deployed directly from the Marketplace.

<!-- ![ram-delivery](https://static.goodrain.com/docs/5.10/delivery/ram-delivery.jpg) -->

![](https://static.goodrain.com/docs/5.11/delivery/continuous/source-code/template-delivery.png)

## Action step

### Preparatory work

1. Have a set of Rainbond clusters, refer to[快速安装](/docs/quick-start/quick-install), multiple teams/projects (for simulated development environment, test environment, production environment).

### Deploying the development environment

1. 参考[基于源代码创建组件](/docs/devops/app-deploy/)，根据你的代码语言部署你的各个业务模块。

2. After each operation has been deployed, you get a fully running app on Rainbond by reference to[微服务架构指南](/docs/microservice/overview) to organize your services.

3. Once your Git repository is configured for[自动部署](/docs/devops/continuous-employ/gitops) you can complete this step by submitting code to trigger the auto-build of the development environment and automated tests and then adjust the code based on the build.

### Make Application Template

1. On the left side of the App Popup page, you can enter the template settings page by selecting `Post->Publish to the component library`.Details for each parameter [Appendix 1: Template Settings Parameters](/docs/delivery/app-model-parameters)

2. Create a new application template `back-office management system`. Optionally publish the release range `1.0`, make the release version `1.0`, click `submit` and then synchronize the image of all components to the local mirror repository.Once syncing is finished, click `Confirm Posting`.Then you can see the published app template in \`Platform Manager-> App Marketplace -> Local Component Library'.

:::caution
Note：Only company administrators can see platform management buttons.
:::

###

### Deployment test environment

1. Create a new `Test Environment` team that will create the application `Background Management System`. On the app page, click `Add Component -> Local Component Library`, select the template you have just published for the `Background Management System` and select version `1.0` to complete the deployment of the test environment.

2. The testers test in this environment and then send the question back to the developer when the test is completed.Release version `2.0` again after the developer has made changes to yourself.

3. At this point, the tester will be able to use the `Update` in the `Background Management System` app for the test environment, choose `Update`, see the difference between version `2.0` and version `1.0`. The tester will be able to perform the test again after the app is upgraded.

4. Eventually, the developer's release of `3.0` passed the full test when we can see all versions in the template by going to `platform manage->App Marketplace->Local Component Library,` and we can click `Release status`, make it a high-quality deliverable version.

### Deployment of production environments

1. Users with the production environment deployment permissions can see the status of the application in `Platform manage->App Marketplace->Local Component Library'.At this point, it can be seen that version 3.0` of the `Background Management System` is a Release Status that users can be assured to deliver with that version.

2. Click on the `Background Management System` to install the right side of the template, the team chooses \`Production Environment', and the apps and versions to be installed, to deploy the production environment one click on the one.

3. If there is a problem, the developer still publishes version `3.1`. Once the tester has passed the test, the carrier will be able to use `upgrade` in the `production environment` app.
