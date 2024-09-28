---
title: Continuous source code delivery
description: This section describes how to implement continuous source code delivery on Rainbond
keywords:
  - Source
  - Continuous delivery
---

Import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005289623&page=2" />

## Flow chart for ongoing delivery of Rainbond source code

As shown in the graph below, the process below is usually required to achieve continued delivery.

1. The user submits the code to the repository when the automated test process is built and performed in the development environment and after the test is completed, if not fed back to the developer to adjust the code quality.

2. When the developer function is largely developed, then the code needs to be merged from dev branch into a testing branch and the test environment is deployed for testers.This allows developers to continue their development based on dev branch, while testers perform full functionality tests.If the feature test fails, then continue to feed the developer.

3. When a version is tested, we can believe that a high-quality deliverable version already exists.This is followed by manual review, merging the code from the testing branch to the master branch for deployment of the production environment online.

<!-- ![source-delivery](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/delivery/source-delivery.jpg) -->

![](https://static.goodrain.com/docs/5.11/delivery/continuous/source-code/code-delivery.png)

## Action step

### Preparatory work

1. Have a set of Rainbond clusters, refer to[快速安装](/docs/quick-start/quick-install), multiple teams/projects (for simulated development environment, test environment, production environment).

2. The project source code has three branches, dev, testing, master.

### Deploying the development environment

1. Reference to[基于源代码创建组件](/docs/use-manual/component-create/language-support), where you deploy your business modules using dev branch in your code language.

2. After each operation has been deployed, you get a fully running app on Rainbond by reference to[微服务架构指南](/docs/microservice/overview) to organize your services.

3. Once your Git repository is configured for[自动部署](/docs/devops/continuous-employ/gitops) you can complete this step by submitting code to trigger the auto-build of the development environment and automated tests and then adjust the code based on the build.

### Deployment test environment

When the developer function is largely developed, and when self-testing is completed, the code needs to be delivered to the testers to deploy the testing environment and complete functional testing.

1. Merge code from dev branch to test branch.

2. On the `App Pages->Quick Copy `, create a new app in the `Test Team`, change all build source information for all apps under the `Development Environment` to a testing branch, and copy a test set by one button.

3. After the test environment has been validated, the question has been sent to the developer. Once the developer has completed repair and code merge, the testers will simply be able to quickly update the test environment on the `App Page->List` of the test environment by selecting all components for bulk construction.

### Delivery of the production environment

1. Once the test is fully passed, the code needs to be merged from toting branch to master branch.At this time, review is done by users with access to online and merge code.

2. When the code is merged into the master branch, it continues to create a new app in the `App Page->Quick Replication`, creating a new app in the `Production Team`, and changing all building source information from the `Test Environment` to the master branch, then copy a production environment by one key.

3. If there is a problem with production.There is still a need for the developer to complete self-measurement on the dev branch, test team to pass on the toting branch, and finally merge and get online by users with a production environment.
