---
title: 2.从源码部署一个Java服务
description: 基于源代码一键构建并部署业务组件
# keywords: ['服务组件 业务组件 源代码 构建 部署']
---

### 目的

通过文档学习如何快速的将自己业务的源代码构建并部署到 Rainbond 上。整个过程不需要修改代码，不需要制作镜像。

### 意义

创建服务组件，是使用 Rainbond 的开始。Rainbond 支持从多种方式创建服务组件，而使用源码进行部署，不需要更改用户的代码。是一种无侵入的构建方式，用户不必学习容器技术来制作镜像，降低了使用 Rainbond 的门槛。

### 前提条件

- 完成 [团队管理与多租户](/docs/use-manual/get-start/team-management-and-multi-tenancy/)。完成第一个团队的创建。

- 一份托管于代码仓库（Git、Svn）的源代码。在文档的示例中，以一份基于 Maven 构建的 Java 语言代码为例。[源码地址](https://gitee.com/rainbond/java-maven-demo)

### 创建服务组件

- 在指定团队页面下，依次点击 **新增**、**基于源码创建组件**。

- 在 **自定义源码** 界面选择已有应用或 **新建应用**。

- 在 **自定义源码** 界面输入 **组件名称**、**仓库地址**、**代码分支**。

- 如果需要指定用户名、密码，或者所需要的代码位于仓库中的某个子目录下，也可以在这个页面中进行设置。

- **确认创建**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-1.png" title="创建服务组件" width="100%" />

### 代码语言识别

Rainbond 会自动拉取相应的代码，并进行相应的代码检测。用户可以根据检测的结果，初步判断这个流程工作是否正常。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-2.png" title="代码识别" width="100%" />

### 开始构建

点击 **创建** 即可进入构建阶段。如果需要在构建前定义当前服务组件的 **构建源设置（针对不同语言，构建源可选设置不同，对于 Java 语言，会包含构建命令、镜像私服地址等）**、**端口**、**环境变量**、**持久化**、**分配内存** 等配置，则点击 **高级设置**。

构建一旦开始，用户可以点击查看构建日志，根据日志了解构建的过程，并在构建失败的情况下进行错误排查。一般情况下，用户本地可以构建的项目，在 Rainbond 都可以正常构建，如果遇到问题，请随时联系好雨科技技术人员寻求帮助。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-3.png" title="构建日志输出" width="100%" />

构建完成后，该服务组件将自动启动，并提供服务。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/create-app-from-source/build-from-source-4.png" title="启动完成" width="100%" />

### 下一步

- 尝试将自己的源代码部署在 Rainbond。

- 下一篇文档，我们会探索基于 Rainbond 特有的共享库机制部署一个应用。
