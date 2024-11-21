---
title: 7.把应用交付给客户
description: 在离线生产环境中，通过应用市场交付。
# keywords: ['应用模版 应用市场 交付']
---

### 目的

通过文档学习在实际生产环境中，如果遇到完全离线的情况下 Rainbond 如何通过应用市场将应用交付给客户，以及后续的升级。

### 意义

交付的最终环境完全离线是一种很常见的情况。在这种情况下如何进行软件开发产品的交付就是一个很现实而且很难解决的问题。针对这种情况，可以使用 Rainbond 的离线交付体系来应对。

### 前提条件

- 在离线生产环境中，离线安装 Rainbond。

- 开发环境安装 Rainbond 进行在线开发，并且将开发的业务系统发布成为应用模版。本文档以 [将应用发布为应用模版](../get-start/release-to-market/) 中发布出来的应用模版为例。

### 导出应用模版

已发布的应用模版，可以直接导出为两种形式的离线应用包，这种离线应用包，可以在完全离线的环境下进行交付。

- **RainbondApp 规范** 离线应用包，可以在其他 Rainbond 平台进行应用模版导入，一旦导入，就可以从应用市场进行部署。

- **DockerComposeApp 规范** 离线应用包，可以在具备 Docker Compose 的离线环境中进行部署，这个包中会包含组件基础镜像以及相应的 **docker-compose.yaml** 文件。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-6.png" title="导出应用模版" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-7.png" title="导出应用模版" width="50%" />

- 选择 **导出版本**。
- 点击 **RainbondApp 规范** 中 **导出**，等待一段时间后，导出会自动完成。
- 点击 **下载**，即可下载离线应用包。

> 请注意，5.3 版本对导出的应用包规范进行了调整，因此无法向下兼容。只能导入到 5.3 及后续版本平台中。
>
> 但 5.2 版本导出的应用包可以导入到 5.3 平台中。

### 导入应用模版

导出的应用模版，以离线应用包的模式存在。这个包可以用其他介质（光盘、移动硬盘等）转移到离线生产环境中。接下来，我们需要将这个包导入离线 Rainbond 中去。

- 进入 **应用市场** 页面，点击 **+** 、**导入应用模版**。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/offline-delivery-with-market/offline-delivery-with-market-1.png" title="导入应用模版" width="100%" />

- 上传离线应用包。

- 选择应用模版，导入即可。

经过上述操作，应用模版就被导入离线生产环境的 Rainbond 中去了。

接下来，参照 [从应用市场部署一个应用](../get-start/create-app-from-market/) 的操作，即可将应用模版安装到生产环境中。

### 离线环境下的应用模版升级

如果你使用了 **导出应用模版** 功能，并将导出的符合 **RainbondApp 规范** 的离线应用包，导入到了离线的 Rainbond 集群中。那么如何将升级后的应用模版应用到离线的 Rainbond 集群中去呢？

- 导出新版本的应用模版，注意指定新的版本。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/upgrade-from-market/upgrade-from-market-8.png" title="导出新版本应用模版" width="50%" />

- 将导出的应用模版导入到离线 Rainbond 环境中去即可。

- 已有应用的升级，参考 [应用模版的升级](../get-start/upgrade-from-market/)。
