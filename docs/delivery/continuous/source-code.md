---
title: 源码持续交付
description: 本节将会介绍如何在 Rainbond 上实现源码持续交付
keywords:
- 源码
- 持续交付
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005289623&page=2" />

## Rainbond 源码持续交付流程图

如下图所示，要实现持续交付，通常需要以下流程。

1. 用户提交代码到源码仓库，此时在开发环境中构建和进行自动化测试流程，测试完成后，如果不通过则反馈到开发人员进行调整，从而保证代码质量。

2. 当开发人员功能基本开发完成后，此时代码需要从 dev 分支合并到 testing 分支，并部署测试环境用于测试人员进行测试。这样开发者还可以基于 dev 分支继续开发，而测试人员则进行完整功能测试。如果功能测试失败，则继续反馈给开发人员。

3. 当某个版本测试通过以后，我们就可以认为已经有了高质量可交付的版本。接下来需要人工审核，将代码从 testing 分支合并到 master 分支，用于生产环境的部署上线。

<!-- ![source-delivery](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/delivery/source-delivery.jpg) -->
![](https://static.goodrain.com/docs/5.11/delivery/continuous/source-code/code-delivery.png)

## 操作步骤

### 准备工作

1. 拥有一套 Rainbond 集群，参考[快速安装](/docs/quick-start/quick-install)，多个团队/项目(用于模拟开发环境、测试环境、生产环境)。

2. 项目源代码拥有三个分支，dev、testing、master。

### 部署开发环境

1. 参考[基于源代码创建组件](/docs/devops/app-deploy/)，根据你的代码语言使用 dev 分支部署你的各个业务模块。

2. 各个业务部署完成后，参考[微服务架构指南](/docs/micro-service/overview)进行服务编排，此时你就得到了一个在 Rainbond 上完整运行的应用。

3. 在你的 Git 仓库配置[自动部署](/docs/devops/continuous-deploy/gitops)，完成该步骤后，可以通过提交代码触发开发环境的自动构建以及自动化测试，再根据构建结果完成代码调整。

### 部署测试环境

在开发人员功能基本开发完成，完成自测以后，此时需要将代码交付给测试人员部署测试环境，并进行完整的功能测试。

1. 将代码从 dev 分支合并到 testing 分支。

2. 在`应用页面->快速复制`，在`测试团队`中新建一个应用，将`开发环境`下所有应用的构建源信息全部修改为 testing 分支，即可一键复制出一套测试环境。

3. 测试人员在测试环境验证完成后，将问题反馈到开发人员，开发人员完成修复和代码合并后，测试人员只需在测试环境的`应用页面->列表`，选择全部组件进行批量构建即可快速更新测试环境。

### 交付生产环境

1. 在测试完全通过以后，需要将代码从 testing 分支合并到 master 分支。此时，由具有上线权限的用户完成审核，并合并代码。

2. 代码合并到 master 分支后，仍然通过`应用页面->快速复制`，在`生产团队`中新建一个应用，将`测试环境`下所有应用的构建源信息全部修改为 master 分支，即可一键复制出一套生产环境。

3. 如果生产出现问题。仍然需要开发者在 dev 分支上完成自测，测试团队在 testing 分支上测试通过，最后由具有生产环境上线的用户来完成代码合并和上线。

