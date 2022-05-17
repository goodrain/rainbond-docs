---
title: 整合 Git 仓库快速部署组件
description: 本篇最佳实践讲解 Rainbond 整合 Git 仓库快速部署组件，适用于开发者和应用运维人员。
---

本文档适合同时使用 Rainbond、GitLab 体系企业的 **应用运维人员** 阅读。

本文档适合的场景是：通过演示用例，了解 rainbond 如何和 GitLab 进行OAuth 对接，并实现对 GitLab 中项目的快速部署和利用 Webhook 实现自动构建

### 前提条件

- 已有的 GItLab 私有仓库，若还未部署，可参考下文 **GitLab 快速部署**一节进行部署

### 操作步骤

通过应用市场一键安装的方式，可以将 GitLab 直接部署到你的 Rainbond 环境中。

#### GitLab 快速部署

- 安装 GitLab 应用

  ![image-20200515143803028](https://tva1.sinaimg.cn/large/007S8ZIlly1get4lviy8jj30zl0hg78d.jpg)

- 运行效果

  ![image-20200515164633334](https://tva1.sinaimg.cn/large/007S8ZIlly1get8bkft3jj31ml0u0q5u.jpg)

#### 对接 GitLab 类型的 OAuth

本环节将配置 Rainbond 对接 GitLab 类型的 OAuth

- **配置 Applications**

  进入 User Settings → Applications

| 选项名       | 填写内容                                             | 说明                                                         |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------ |
| Name         | Rainbond                                             | 填写自定义的 Application 名称                                |
| Redirect URI | https://goodrain.goodrain.com/console/oauth/redirect | 回跳路径，用于接收第三方平台返回的凭证使用公有云格式为 https://xxx.goodrain.com/console/oauth/redirect使用私有化部署格式为 https://IP:7070/console/oauth/redirect |
| Scopes       | api、read_user、read_repository              | GitLab的权限设置，需要开启 api、read_user、read_repository |

- Rainbond 平台认证

  进入 Rainbond 首页企业视图 → 设置 → OAuth 互联服务 → 查看设置 → 添加

| 选项名       | 填写内容                | 说明                             |
| ------------ | ----------------------- | -------------------------------- |
| OAuth类型    | gitlab                  | 认证的 Oauth 类型                |
| OAuth类型    | 自定义（GitLab-Demo）   | 填写自定义的 Oauth 服务名称      |
| 服务地址     | https://rainbond.gitlab/ | GitLab 服务访问地址              |
| 客户端ID     | 依据具体信息填写        | GitLab 生成的 Application ID     |
| 客户端密钥   | 依据具体信息填写        | GitLab 生成的 Application Secret |
| 平台访问域名 | 使用默认填写内容        | 用于OAuth认证完回跳时的访问地址  |

- OAuth 认证

  进入 Rainbond 首页企业视图 → 个人中心 → OAuth 账户绑定 → 对应账号 → 去认证

#### 对接 GitLab 仓库并完成自动构建

- 创建 GitLab 项目，内容如下

  ![image-20200518113119649](https://tva1.sinaimg.cn/large/007S8ZIlly1gewg2hhicxj31le080dgp.jpg)

- 使用私有化部署 Rainbond 时，需配置 GItLab 允许向本地网络发送 Webhook 请求

  进入 Admin area → settings → NetWork → Outbound requests

  勾选 Allow requests to the local network from hooks and services 选项即可

- 通过 Rainbond 进行源码构建

  进入 Rainbond 团队视图 → 新增 → 基于源码创建组件 → 对应 Gitlab 项目 → 对应源码项目 → 创建组件

  ![image-20200518112657470](https://tva1.sinaimg.cn/large/007S8ZIlly1gewfxy3sbrj30xn08ujta.jpg)

  进入构建页面，选择配置

  ![image-20200519142235426](https://tva1.sinaimg.cn/large/007S8ZIlly1gexqn1b7laj30wc09wdi4.jpg)

  访问效果展示

  ![image-20200518114603719](https://tva1.sinaimg.cn/large/007S8ZIlly1gewghtmy3uj30xc044dge.jpg)

- Webhook 自动构建展示

  修改 GitLab rainbond-test 项目的 index.html 文件，提交时 Commit 信息添加关键字 @deploy

  ![image-20200518132824057](https://tva1.sinaimg.cn/large/007S8ZIlly1gewjgawobgj31l208oaaz.jpg)

  自动更新效果展示

  ![image-20200518133118625](https://tva1.sinaimg.cn/large/007S8ZIlly1gewjjc0vngj30zh0giwgt.jpg)

  访问效果展示

  ![image-20200518132745969](https://tva1.sinaimg.cn/large/007S8ZIlly1gewjfn43hwj30v804adgx.jpg)
