---
title: 一体化开发测试环境
description: GitLab 擅长源代码管理，Rainbond 擅长应用自动化管理，整合 Gitlab 和 Rainbond 就能各取所长，本文详细讲述如何整合 Gitlab 和 Rainbond，并通过整合实现一体化开发环境。
slug: IntegrationDev
images: /img/usescene/一体化开发测试.png
# authors: QiZhang
---

:::info
GitLab 擅长源代码管理，Rainbond 擅长应用自动化管理，整合 Gitlab 和 Rainbond 就能各取所长，本文详细讲述如何整合 Gitlab 和 Rainbond，并通过整合实现一体化开发环境。
:::

<!--truncate-->

### 通过 Rainbond 一键安装 Gitlab

Rainbond 作为应用运行环境，Gitlab 可以运行在 Rainbond 之上，为了便于 Gitlab 安装，我们制作了 Gitlab 安装包放到了 Rainbond 的应用市场，实现 Gitlab 的一键安装。

1. 安装 Rainbond，[安装步骤](https://www.rainbond.com/docs/quick-start/quick-install/)。

2. 从应用市场搜索“Gitlab”，点击安装，一键完成 Gitlab 所有安装和配置工作，包括数据安装和初始化。
   ![WechatIMG71](https://i.loli.net/2021/11/05/z6bwP4WMA7f1BSh.jpg)

3. 安装完成，通过 Rainbond 管理和运维 Gitlab。
   <img src="https://i.loli.net/2021/11/05/NbUJTPYLSCIF7Rj.png" width="50%"/>

### Rainbond 源码构建对接 Gitlab Oauth，实现一键代码部署

使用过[Rainbond](https://www.rainbond.com/)的小伙伴一定知道，在[Rainbond](https://www.rainbond.com/)上创建组件有三种方式：源代码创建、镜像创建、应用市场创建。

源码构建方式通过配置源码地址实现代码构建，Gitlab 虽然可以提供源码地址，但构建新应用需要拷贝源码地址及设置用户名密码，这个过程很麻烦，也容易犯错。

为了与 GitLab 配合有更好的体验，Rainbond 做了产品化的支持，通过 OAuth2.0 协议与 GitLab 进行对接。

**配置 GitLab Applications**

进入 User Settings → Applications

| 选项名       | 填写内容                               | 说明                                                        |
| :----------- | :------------------------------------- | :---------------------------------------------------------- |
| Name         | Rainbond                               | 填写自定义的 Application 名称                               |
| Redirect URI | https://IP:7070/console/oauth/redirect | 回跳路径，用于接收第三方平台返回的凭证                      |
| Scopes       | api、read_user、read_repository        | GitLab 的权限设置，需要开启 api、read_user、read_repository |

创建后请保存 Application ID 和 Secret，后面会用到。

> 使用私有化部署 Rainbond 时，需配置 GItLab 允许向本地网络发送 Webhook 请求
>
> 进入 Admin area → settings → NetWork → Outbound requests
>
> 勾选 Allow requests to the local network from hooks and services 选项即可

**配置 Rainbond OAuth**

进入 Rainbond 首页企业视图 → 设置 → Oauth 第三方服务集成 → 开启并查看配置 → 添加

| 选项名       | 填写内容                        | 说明                              |
| :----------- | :------------------------------ | :-------------------------------- |
| OAuth 类型   | gitlab                          | 认证的 Oauth 类型                 |
| OAuth 名称   | 自定义（GitLab-Demo）           | 填写自定义的 Oauth 服务名称       |
| 服务地址     | http://xx.gitlab.com            | GitLab 服务访问地址               |
| 客户端 ID    | 上一步获取的 Application ID     | GitLab 生成的 Application ID      |
| 客户端密钥   | 上一步获取的 Application Secret | GitLab 生成的 Application Secret  |
| 平台访问域名 | 使用默认填写内容                | 用于 OAuth 认证完回跳时的访问地址 |

**Rainbond OAuth 认证**

进入 Rainbond 首页企业视图 → 个人中心 → OAuth 账户绑定 → 对应账号 → 去认证

**对接后效果**

接下来展示 Rainbond 与 Gitlab 对接后平台的效果图。

当我们对接成功后，进入基于源码构建的页面会展示下图中的效果，展示所有的仓库列表。

![image-20211026142406668](https://i.loli.net/2021/10/26/P4rgnCYRo57WimD.png)

通过 Rainbond OAuth2 与 GitLab 进行对接后，在 Rainbond 平台登录不同的账号时，需进入个人中心认证，认证后 Rainbond 会根据账号不同的权限展示不同的代码仓库。

### Rainbond 对接 Gitlab WebHook，自动触发构建

当我们完成整合 Rainbond 和 Gitlab Oauth ，选择指定仓库，点击创建组件，可选择代码版本（自动获取代码分支以及 tag）和 开启自动构建。

![image-20211026171232215](https://i.loli.net/2021/10/26/hI4AQrT9SBfLDat.png)

创建完成后在组件中配置 WebHook 自动构建，提交代码，Commit 信息包含“@deploy”关键字，就可以触发 WebHook 自动构建。

> Commit 信息关键字触发 GitLab WebHook 原生是不支持的，在这之前有社区用户提出在提交代码触发构建时，每一次提交都会触发构建，用户并不想这样做，所以 Rainbond 研发团队研发了根据提交的 Commit 信息包含关键字去触发自动构建。

下图中展示了用户从创建组件到持续开发的整个流程。

<img src="https://i.loli.net/2021/10/27/ZR95TefQzABVU72.png" />

### 总结

**一体化开发环境的能力：**

- 代码管理：代码相关的所有管理功能，提供 web 界面的管理（Gitlab）
- wiki ：在线编辑文档，提供版本管理功能（Gitlab）
- 问题管理：Issue 管理（Gitlab）
- 持续集成：代码自动编译和构建（Rainbond）
- 环境管理：快速搭建开发或测试环境，保证开发、测试、生产环境一致性（Rainbond）
- 架构编排：无侵入的 Service Mesh 架构编排（Rainbond）
- 模块复用：通过组件库 实现公司内部模块、应用、服务积累和复用，同时实现了软件资产管理（Rainbond）
- 持续交付：开发、测试、生产环境持续交付流程（Rainbond）
- 应用管理：应用监控和运维面板（Rainbond）
- 团队管理： 多团队管理，成员、角色管理（Rainbond）

**一体化开发环境的价值：**

1. 开箱即用
1. 让开发团队专注在写业务代码，不要在环境上浪费时间。
1. 应用粒度抽象，使用简单，上手快。
1. 过程自动化，提高操作效率（持续集成、环境管理、持续交付等）。
