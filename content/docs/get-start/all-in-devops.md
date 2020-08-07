---
title: 8.多环境下持续构建与持续交付
description: 通过 Rainbond 实现企业的开发、测试、生产持续交付体系，快速搭建 DevOps 体系。 
weight: 208
hidden: ture
---

### 目的

通过 Rainbond 实现企业的开发、测试、生产持续交付体系，快速搭建 DevOps 体系。

### 意义

Rainbond 可以在企业的开发、测试、生产各个环节体现价值。本文档的内容会帮助用户基于 Rainbond 体系，快速搭建整个 DevOps 体系。

###  前提条件

- 遵循文档安装好的联机的开发测试用 Rainbond 环境，如果存在最终生产环境，那么需要生产环境也安装好 Rainbond。

- 业务应用的源代码。

- 已有的 Jenkins CI/CD 体系。（可选）

- 已有的镜像仓库，如 Harbor。（可选）

- 已有的代码托管平台，如 Gitlab。（可选）

### 环境分割与打通

一般的 IT 公司会将自己的环境划分为：开发环境、测试环境、生产环境。在 Rainbond 中，可以通过团队（租户级隔离）或者集群（部署在不同集群中）来进行环境分割。不同分割方式的环境之间，交互的方式有所差别。其中，多集群的分割方式，需要 Rainbond 企业版本或公有云版本的支持。

推荐的方式:

- 通过创建团队来分割 开发、 测试环境，参见 [团队管理与多租户](/docs/get-start/team-management-and-multi-tenancy/)。 

- 通过集群来区别开发测试集群和生产集群。

- 对于企业用户，可以通过 Rainbond 的多集群管理功能打通开发测试集群和生产集群。

- 对于开源用户，可以 [通过共享库实现离线交付](/docs/get-start/offline-delivery-with-market/) 来完成最终的交付。

### 整合

实操从开发环境的搭建开始，在这个过程中，我们提供了相关方案快速整合各种开发工具，来实现代码托管、自动的 CI/CD 、 代码静态检测等常用场景。即使企业内部还没有相关的工具，也可以 Rainbond 共享库，快速从云端同步到本地共享库进行安装。

#### 整合 Gitlab

参考 [整合 Git 仓库快速部署组件](/docs/get-start/best-practices/work_with_git/) 来整合已有的 Gitlab 。如果还没有自己的代码仓库，建议通过云端同步到本地共享库安装。

#### 整合 Jenkins CI/CD 体系

参考 [对接 Jenkins CI/CD 体系](/docs/get-start/best-practices/work_with_jenkins/) 来接入企业已有的 Jenkins CI/CD 体系。如果还没有自己的 Jenkins ，还希望能够快速使用，建议通过云端同步到本地共享库安装。

#### 整合 SonarQube 

参考 [对接 SonarQube 完成静态代码检测](/docs/get-start/best-practices/work_with_sonar/) ,如果还没有自己的 SonarQube ，建议通过云端同步到本地共享库安装。

### 持续集成/持续构建

在这一个环节，将以实例的演示操作，来体现如何进行持续集成与持续构建。

#### 演示业务准备

串通整个DevOps的全过程，将会以一个实际的用例来进行演示。选取的演示用例是开源 GVP 项目[ NiceFish 美人鱼博客建站系统](https://gitee.com/mumu-osc/NiceFish?_from=gitee_search) 感谢开源精神，感谢作者[**大漠穷秋**](https://gitee.com/mumu-osc)。

整个业务系统可以细分为下面的四个服务组件：

- 前端项目：[NiceFish-UI](https://gitee.com/dazuimao1990/NiceFish) 项目会基于[镜像部署](/docs/user-manual/component-create/image-support/)，整个 CI/CD 流程是：提交代码后，Jenkins 调度远端服务器拉取最新代码并制作镜像，制作完成后推送到开发环境中的 HarBor 镜像仓库。推送完成后触发测试环境中的 NiceFish-UI 服务组件自动拉取镜像持续构建。

- 后端项目：[NiceFish-cms](https://gitee.com/dazuimao1990/nicefish-spring-boot) 项目基于源码部署，整个 Ci/CD 流程是：提交代码后，Jenkins 调度 SonarQube 进行静态代码质量检测，检测通过后触发测试环境中的 NiceFish-cms 服务组件自动拉取源代码持续构建。

- Mysql 数据库：[NiceFish-DB](https://gitee.com/dazuimao1990/nicefish-db) 项目基于 Dockerfile 部署。

- Redis：直接由共享库一键安装部署。

按照上述说明，将测试业务部署在 **测试环境** 中。

对于 NiceFish-UI、NiceFish-cms、NiceFish-DB 这三个项目，开启基于[ API 触发自动构建](/docs/user-manual/component-dev/auto_build/) 功能：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-1.png" title="自定义 API 构建" width="100%">}}

#### 配置 CI/CD

以 [NiceFish-cms](https://gitee.com/dazuimao1990/nicefish-spring-boot) 项目为例，演示整个持续集成/持续构建（CI/CD）流程。

前文已经提到，如何将该项目，通过Gitlab拉取代码，部署在Rainbond上的测试环境中，并开启自动构建的OpenAPI。

接下来，会描述在Jenkins中创建的自由风格任务的主要流程，通过该流任务，来将整个持续集成/持续构建（CI/CD）流程落地。



#### 任务描述

这个示例，是利用 Free-Style 风格创建的 Jenkins 任务：



1. 完成代码 push 事件触发 Jenkins 任务

2. Jenkins 获取最新代码后，结合 sonarqube 进行代码分析

3. 分析完毕后，调用API使Rainbond项目开始构建



#### 定义代码仓库地址并通过GitLab WebHooks触发

这个环节的设置，可以在 NiceFish-cms 项目的代码仓库接收到 Push 事件后，触发整个任务的开始。

- **指定代码仓库地址**

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-2.png" title="指定代码仓库地址" width="100%">}}

- **定义WebHooks**

Jenkins中的设置：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-3.png" title="Jenkin设置" width="100%">}}

GitLab中的设置：

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-4.png" title="Gitlab设置" width="100%">}}


#### 代码静态检测

通过这个环节的设置，可以定义当前项目的代码静态检测，作为持续集成过程中的一环。其他的持续集成过程，按照Jenkins体系的方式对接即可。

增加构建步骤：调用顶层 Maven 目标

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-5.png" title="执行代码检测" width="100%">}}

这个环节结束后，持续集成阶段结束，紧接着进行持续构建。

#### 持续构建

上述的环节全部成功通过后 ，接下来这个环节的设置，即可完成持续构建的设置。该步骤触发已部署的 NiceFish-cms 进行自动构建。自动构建过程会触发Rainbond上运行的服务组件，从构建源（本示例中是源码）拉取最新的代码进行构建，将最新的改动上线。

增加构建步骤：执行 shell

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/all-in-devops/all-in-devops-6.png" title="触发自动构建" width="100%">}}

### 持续交付

基于 Rainbond 实现持续交付体系，推荐使用 [共享库](/docs/enterprise-manager/enterprise/appcenter/) 实现。

经过上文中的 **持续集成/持续构建** 后，产生的业务可以不断的发布到共享库中形成不同的版本。重复执行 [应用模版的升级])(/docs/get-start/upgrade-from-market/)，即可完成应用的持续交付。

如果最终生产环境是离线的情况，那么请参考 [通过共享库实现离线交付](/docs/get-start/offline-delivery-with-market/)。

### 生产环境运维

对于部署于 Rainbond 的应用，我们提供了全方位的自动化运维赋能：

- 应用拓扑图：服务组件关系图形化展示，依赖关系拖拉拽式拼接组装。

- 应用级备份/恢复：整个应用一键带数据备份，自由在不同集群、不同团队间迁移、恢复。

- 网关策略：功能强大的自定义网关策略设置、证书管理，[实现滚动升级、A/B 测试、灰度发布、蓝绿发布]()。

- 生命周期管理：可以管理应用以及服务组件的开启、关闭、重启、更新、构建全生命周期。

- 版本管理：Rainbond 自带的版本管理系统，可以快速进行 [基于版本号一键上线/回滚](/docs/get-start/best-practices/update-rollback/)。

- 操作记录审计：明确每个服务组件的关键操作的执行人与执行时间。

- 操作日志：服务组件的每个操作，都会有对应的操作日志。如构建、升级等。

- 监控：针对 WEB 类和 Mysql 提供实时性能分析，提供可视化的平均响应时间、吞吐率、在线人数等信息，实时监控服务状态。

- 日志：提供服务组件日志实时推送功能，支持日志分割与下载，并可以[通过插件支持 ELK 日志收集](/docs/get-start/best-practices/work_with_elk/)

- 伸缩：支持内存、实例数量实时伸缩，并可以配置自动伸缩，以及自动负载均衡。保证线上业务弹性应对流量。

- 环境配置：支持自定义环境变量输入，配置文件挂载并在多个服务组件间共享。

- 依赖：原生 Service Mesh 微服务支持，组件间根据依赖关系快速拼接组装，基于环境变量的连接信息配置灵活。

- 存储：支持多种存储类型（块设备、共享文件存储、内存存储等），多组件存储共享。

- 插件体系：针对服务组件的插件扩展，原生提供多种插件，快速实现性能实时分析、微服务网络治理功能、[Mysql 数据备份与恢复](https://t.goodrain.com/t/topic/1387)。

- 构建源：各类开发语言构建环境图形化灵活设置。自动构建配置，为 CD/CD 提供入口。

- 部署类型配置：多部署类型选择，应对不同类型的服务组件。

- 健康检测：有效监控服务组件当前健康状态，自动化的不健康处理策略。

- 权限管理：不同用户对服务组件拥有不同操作权限。



