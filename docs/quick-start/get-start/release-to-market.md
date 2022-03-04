---
title: 5.制作可复用的应用模版
description: 将组件、应用、解决方案发布成为可复用的应用模版
# keywords: ['应用模版 应用市场 发布']
---

### 目的

通过文档学习如何将用户自己部署的业务系统，发布到 Rainbond 提供的 **应用市场** 中，成为可复用的 **应用模版**。

这么做的意义在于，将用户自己的业务系统作为解决方案发布之后：

- 企业内部的其他用户可以通过从应用市场安装应用模版来快速复制这个解决方案。

- **应用模版** 支持 **在线交付** 和 **离线导出/导入**，可以通过这两种方式，进行软件交付。

### 意义

通过实操，学习如何自己制作可复用的应用模版，应用市场最终为企业提供了复制的能力。

### 前提条件

- 完成 [从源码部署一个服务组件](../get-start/create-app-from-source/) 获得 **Java 演示示例**。

- 完成 [从应用市场部署一个应用](../get-start/create-app-from-market/) 获得 **Mysql5.7（单机版）**。

- 完成 [建立依赖关系](../get-start/create-dependency/) 获得完整的解决方案示例。

接下来，我们来将 **Java 演示示例** + **Mysql5.7（单机版）** 组合而成的应用 （业务层面可视为一套完整的解决方案）发布为一个应用模版。

### 发布应用模版

- 在应用拓扑图页面左边栏点击 **发布** 进入 **发布记录管理** 页面。

- 点击 **发布到应用市场** 进入 **应用模版及发布版本设置** 页面。

- 选择或创建 **应用模版**，如创建，则必须定义 **应用模版名称**，**分享范围**（定义该应用模版的可见范围，仅当前团队可见或企业均可见）。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-1.png" title="应用模版及发布版本设置" width="100%" />

- 定义 **版本号**，使用如 1.0 这样的数字定义，后续会根据版本号的大小判断版本的新旧。

- 如有必要，填写 **版本别名**（如生产版本、预发布版本等）、 **版本说明**（简要说明）。

- 在 **发布组件模型配置** 中定义模版中各个组件的详细设置，包括 **连接信息**、**环境变量**、**伸缩规则**。

- 点击 **提交**，进入应用同步页面。

### 应用同步

在这个页面里，Rainbond 会自动进行应用同步，包括镜像的打包与推送。用户只需要静待同步完成，看到下面的情况，即同步完成。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-2.png" title="同步完成" width="100%" />

- 点击 **确认分享**，就完成了 **应用模版** 的发布。

### 应用模版展示

应用模版一旦被成功发布，就会出现在应用市场的页面中，根据创建应用模版时 **发布范围** 选择的不同，应用模版的可见范围也不一样。

- 发布范围选择 **团队** 的情况下，我们仅可以在发布该应用模版的团队分页下找到应用模版。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-3.png" title="应用市场团队分页" width="100%" />

- 发布范围仅在选择 **企业** 的情况下，才可以在企业分页下找到应用模版，否则不可见。示例应用模版发布时选择发布范围为 **团队**，所以无法在企业分页展示。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-4.png" title="应用市场企业分页" width="100%" />

与可见范围相对应的，当前应用模版，只可以在 **发布时使用的团队** 中安装。仅有发布范围为 **企业** 时，应用模版才可以在当前企业下的所有团队里安装使用。

### 编辑应用模板

已创建的应用模版，可以进行编辑。编辑的入口如下图所示：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-5.png" title="编辑应用模版" width="100%" />

可编辑的内容包括：

- 名称，应用模版的名字。

- 发布范围，可以修改到 **指定团队** 或 **当前企业**。

- 分类标签，添加标签可以将应用模版进行快速的归类和过滤。

- 描述，简要的介绍当前应用模版。

- LOGO，可以上传一个图片，作为应用模版的 logo。

- 是否 release，特殊标签，指示当前应用模版的开发状态。

### 安装应用模版

这个步骤，和 [从应用市场部署一个应用](../get-start/create-app-from-market/) 是一致的，目的就是验证所发布的示例应用模版，是否可以安装成功。

具体操作，可以复习 [从应用市场部署一个应用](../get-start/create-app-from-market/) 中的操作，这里不再赘述。

最终的效果，是基于应用市场复制出一个新的应用。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/get-start/release-to-market/release-to-market-8.png" title="复制出的应用" width="100%" />

### 下一步

接下来，我们将探索示例应用模版如何进行升级，并且将升级的内容，应用到基于应用市场复制出的新应用中去。
