---
title: 6.应用模版的升级
description: 应用模版如何升级，升级的内容如何应用到基于应用模版安装出来的已有应用。
# keywords: ['应用模版 应用市场 升级']
---

### 目的

通过文档学习如何将应用模版进行升级，并将升级的内容应用到已经基于该应用模版安装的应用。

### 意义

应用的开发是不断迭代的，每次版本的更迭需要应用模版也具备相应的版本控制能力。基于低版本的应用模版安装的应用，需要具备基于应用模版新版本进行升级的功能。

### 前提条件

- 完成 [将应用发布为应用模版](../get-start/release-to-market/) ，拥有基于示例应用模版安装的应用 **复制出的应用**。

- **源应用**（发布应用模版所使用的应用）有了新的变动，在本文档中，以添加服务组件 **Redis**，为例。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-1.png" title="源应用的变动" width="100%" />

### 应用模版的版本控制

将源应用重新进行发布，在版本处，填入比原始版本更大的版本号，如 1.1。Rainbond 通过版本号数字的比较来区分版本的新旧。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-2.png" title="重新发布与版本控制" width="100%" />

点击 **发布** 后，进入应用同步页面，可以在同步记录中发现新增的 Redis 组件。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-3.png" title="应用同步" width="100%" />

在 **发布记录** 列表中，可以发现新版本的应用模版。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-4.png" title="版本列表" width="100%" />

### 已有应用的升级

已有应用特指基于 1.0 版本的示例应用模版安装的应用 **复制出的应用** 。这个应用代表了基于低版本应用模版安装的正在运行中的已有应用，我们需要将新版本 1.1 中升级的内容，应用到低版本的应用中去。

- 在 **复制的应用** 拓扑图页面左边栏中点击 **升级**，进入 **升级管理** 页面，在这里可以明确 **当前版本**、**可升级版本**。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-5.png" title="升级管理页面" width="100%" />

- 在升级管理页面点击 **升级**。进入升级的详情页面，Rainbond 会自动比对版本差异并显示出来。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-6.png" title="升级管理页面" width="100%" />

- 继续点击 **升级**、**升级完成**，即可完成整个升级过程。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-7.png" title="升级结果展示" width="100%" />

### 下一步

从下一个任务开始，我们将开始探索一些高阶使用场景。
