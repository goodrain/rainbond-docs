---
title: 多环境持续交付
description: 本节将会介绍如何在 Rainbond 上实现多环境持续交付
keywords:
- 多环境
- 持续交付
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005328921&page=4" />

## Rainbond 上多环境交付流程图

如下图所示，我们以后台管理系统为例，利用 Rainbond 应用模版实现多云多环境的持续交付，通常需要以下流程。

<!-- ![multi-env-delivery](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/delivery/multi-env-delivery.jpg) -->
![](https://static.goodrain.com/docs/5.11/delivery/continuous/source-code/multi-env-delivery.png)

1. 通过 Rainbond 对接多集群，可以对接私有云、公有云等。

2. 当开发者开发的应用测试通过后，发布到本地应用市场，最后通过应用市场中的应用模版实现各个公有云环境的应用部署。

## 操作步骤

### 准备工作

1. 拥有一套 Rainbond 集群，参考[快速安装](/docs/quick-start/quick-install)。

### Rainbond 对接多集群

1. 在完成 Rainbond 控制台的安装后，进入 Rainbond 控制台`平台管理->集群->添加集群`，按照指引在公有云或私有云的服务器上安装 Rainbond 集群端，可添加并对接多个集群。多集群对接后效果图:point_down:

<img src="https://pic.imgdb.cn/item/61a5d0802ab3f51d91d5afc2.png" alt="image-20211118142459214"  />

2. 我们假设在该环境中已经对接了三个集群，分别是`内网集群`、`阿里云-青岛`和`阿里云-上海`，此时在`平台管理->团队->创建团队`，分别创建三个团队，`测试-内网`、`生产-青岛`和`生产-上海`，集群分别选择`内网集群`、`阿里云-青岛`和`阿里云-上海`。

### 设置镜像仓库

1. 在`平台管理->设置->内部组件库镜像仓库`中，配置一个可以被多个环境访问到的镜像仓库，发布到应用市场的应用对应的镜像将会推送到该仓库上，因此该镜像仓库是在多环境上应用运行起来的关键。参考[本地组件库镜像仓库配置](/docs/use-manual/enterprise-manage/enterprise-settings/base/component-registry/)

### 部署开发测试环境

1. 首先可以在`测试-内网`团队内，参考[基于源代码创建组件](/docs/use-manual/component-create/language-support)，根据你的代码语言部署你的各个业务模块。

2. 各个业务部署完成后，参考[微服务架构指南](/docs/micro-service/overview)进行服务编排，此时你就得到了一个在 Rainbond 上完整运行的应用。

### 制作应用模版

1. 在应用拓扑图页面左侧，选择`发布->发布到组件库`， 即可进入模版设置页面。各个参数详细说明参考[附录1: 模版设置页面参数说明](/docs/delivery/app-model-parameters)

2. 新建一个应用模版`后台管理系统`，可选择发布范围为企业，设定好发布的版本 `1.0`，点击`提交`，接下来将会同步所有组件的镜像，推送到我们刚开始设置的镜像仓库中。同步完成后，点击`确认发布`，即发布完成。接下来在 `平台管理->应用市场->本地组件库`，即可看到发布好的应用模版。

:::caution
注：仅有企业管理员可以看到平台管理按钮。
:::

### 多环境交付

1. 测试人员在`测试-内网`安装测试通过后，标记该版本为 Release 状态，最终交付人员可以拿该版本去其他公有云环境进行部署和交付。

2. 交付人员可以在`平台管理->应用市场->本地组件库`，看到应用的 Release 状态，可以放心的用该版本进行交付。

3. 点击`后台管理系统`模版右侧的安装，团队选择`生产-青岛`，以及要安装的应用和版本，即可在`阿里云-青岛`集群中一键部署出生产环境。

4. `阿里云-上海` 集群中部署同上。

### 持续升级和回滚

1. 后续如果有问题，仍然是开发人员发布新的版本，测试人员测试通过后，发布到应用市场。

2. 运维人员在`生产环境`已部署好的应用中，选择`升级`，即可完成上线。

3. 如果上线遇到问题，可以在应用页面，选择`升级->升级记录->回滚`，即可一键回滚应用到上个版本。
