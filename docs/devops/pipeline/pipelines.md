---
title: 流水线
description: 介绍 Pipeline 应用插件的流水线
keywords:
- 介绍 Pipeline 应用插件的流水线
- Intro GitLab Pipeline Plugin Pipeline
---

流水线是提供自定义流程编排的工具，通过构建，部署，测试，管控等组件化能力，把从开发到交付的各项工作串联起来，从而让企业轻松的实现持续交付 。

## 前提

* 已经创建了应用服务。
* 可用的 GitLab Runner。

## 操作步骤

进入 Rainbond 控制台的团队内，选择左侧菜单栏的 **流水线**，进入流水线页面。

### 创建流水线

提供了多种语言的模板，可直接使用模板创建流水线。包含了常用的语言模板，如：Node.js、Maven单模块、Maven多模块、Java War、Gradle、Go、Python等。

语言模版默认提供了两个步骤:

1. 打包项目，产出构建物。
2. 构建容器镜像，并推送到镜像仓库。

#### 全局变量

全局变量是流水线中的变量，可以在流水线中的任何步骤中使用。全局变量可以在流水线的设置中进行配置。

默认提供了以下全局变量：

* **REPOSITORY_URL：**镜像仓库地址
* **ORG：**镜像仓库组织
* **REPOSITORY_USERNAME：**镜像仓库用户名
* **REPOSITORY_PASSWORD：**镜像仓库密码

### 流水线步骤配置

流水线步骤配置是流水线的核心，可以通过配置流水线步骤来实现自定义的流程编排。

流水线的步骤对应了 GitLab CI，[GitLab CI/CD](https://docs.gitlab.com/ee/ci/yaml/) 文档了解更多。

:::caution
通过 UI 创建的每个选项都对应到 `gitlab-ci.yml` 文件中的一个配置项，不可自行修改 `gitlab-ci.yml` 文件，当通过 UI 修改流水线配置时，会覆盖 `gitlab-ci.yml` 文件。
:::

#### 阶段名称

阶段名称是流水线步骤的名称，可以自定义。

#### 阶段编码

阶段编码是流水线步骤的唯一编码，对应到 `gitlab-ci.yml` 文件中的 `stage` 配置项。可参考 [GitLab CI/CD Stages](https://docs.gitlab.com/ee/ci/yaml/#stages) 文档了解更多。

#### 镜像环境

镜像环境是流水线步骤的运行环境，对应到 `gitlab-ci.yml` 文件中的 `image` 配置项。可参考 [GitLab CI/CD Image](https://docs.gitlab.com/ee/ci/yaml/#image) 文档了解更多。

#### 脚本命令

脚本命令是流水线步骤的执行命令，对应到 `gitlab-ci.yml` 文件中的 `script` 配置项。可参考 [GitLab CI/CD Script](https://docs.gitlab.com/ee/ci/yaml/#script) 文档了解更多。

#### Runner

Runner 是流水线步骤的执行环境，对应到 `gitlab-ci.yml` 文件中的 `tags` 配置项。可参考 [GitLab CI/CD Tags](https://docs.gitlab.com/ee/ci/yaml/#tags) 文档了解更多。

#### 执行条件

执行条件是流水线步骤的执行条件，对应到 `gitlab-ci.yml` 文件中的 `only/except` 配置项。可参考 [GitLab CI/CD Only/Except](https://docs.gitlab.com/ee/ci/yaml/#only--except) 文档了解更多。

可以仅使用 **仅当/排除** 来控制何时向管道添加作业。

* 仅当：用于定义作业何时运行。
* 排除：使用except定义作业何时不运行。

目前可配置的执行条件有：

* **分支：** 仅当分支匹配时/排除分支，才执行该步骤。
* **变量：** 仅当变量匹配时/排除变量，才执行该步骤。

#### 制品产物

制品产物是流水线步骤的产物，对应到 `gitlab-ci.yml` 文件中的 `artifacts` 配置项。可参考 [GitLab CI/CD Artifacts](https://docs.gitlab.com/ee/ci/yaml/#artifacts) 文档了解更多。

例如：定义制品产物为 `target/*.jar`，则在该步骤执行完成后，会将 `target` 目录下的所有 `jar` 文件作为制品产物。

#### 保存时间

保存时间是流水线步骤的制品产物的保存时间，对应到 `gitlab-ci.yml` 文件中的 `ArtifactsExpire_in` 配置项。可参考 [GitLab CI/CD ArtifactsExpire_in](https://docs.gitlab.com/ee/ci/yaml/#artifactsexpire_in) 文档了解更多。

以秒为单位，指定制品产物的保存时间。

#### 缓存

缓存是流水线步骤的缓存配置，对应到 `gitlab-ci.yml` 文件中的 `cache` 配置项。可参考 [GitLab CI/CD Cache](https://docs.gitlab.com/ee/ci/yaml/#cache) 文档了解更多。

例如：定义缓存为 `target`，则在该步骤执行完成后，会将 `target` 目录下的所有文件作为缓存。