---
title: Change build type
description: This article explains how to replace different build source types based on Rainbond
---

### Overview

No matter how your component is created, the build source can be replaced with source code or mirror image, which improves the flexibility of component construction

Here, the components installed in the app store are used as templates, and the build source is replaced with a source code build

### 使用流程

Enter the component build source, the current application creation method is cloud application store <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/build_source_appstore.png" title="Build source for cloud app store" />

Click Change, select the source code, fill in the warehouse address and code version <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/build_source_code.png" title="Replacing the source build" />

After the replacement, the build source information will be updated, and the language needs to be re-detected here. <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/check_language.png" title="recheck language" />

After checking, click Build again <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/deploy.png" title="Construct" />

As an application installed in the application market, the version can be upgraded <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade.png" title="Upgrade options" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade_service.png" title="升级"/>

The components of the build source have been replaced. If you choose to upgrade, the higher version will cover the components we replaced; you can choose other required components to upgrade

If you want to use a higher version of the component, you can install it in a new application and use it

Here we have replaced the build source for the jar-t component, you can only choose to upgrade mysql

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/choose_upgrade_service.png" title="选择升级组件"/>

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-manage/build-source/upgrade_result.png" title="升级结果"/>

In this way, the jar-t component is still built based on source code, and mysql is installed by upgrading
