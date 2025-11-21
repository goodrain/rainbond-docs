---
title: 使用 GitOps 实现应用持续部署
description: 通过 Rainbond 的 GitOps 功能，实现应用的持续部署，包括代码仓库对接、自动构建配置及部署流程
keywords:
- GitOps
- 持续部署
- 自动化部署
- Webhook
- CI/CD
---

GitOps 是一种通过 Git 仓库作为应用配置和部署的唯一真实来源的持续交付方法。本文将详细介绍如何在 Rainbond 平台上实现 GitOps 持续部署流程，包括代码仓库对接、自动构建配置及完整部署流程。

Rainbond 支持两种 GitOps 持续部署方式：

1. 通过 OAuth 对接 Git 仓库，基于源码创建组件是通过打开自动构建按钮，Rainbond 会自动在对应的仓库中配置 WebHook。
2. 手动配置 WebHook，在代码仓库中配置 WebHook 地址，并设置触发条件。

## 前提条件

- 已安装并配置 Rainbond 平台
- 拥有 GitHub、GitLab、Gitee、Gitea 等代码仓库的管理员权限
- 拥有 Rainbond 平台的团队管理员或平台管理员权限
- 确保网络连接畅通，代码仓库和 Rainbond 平台可以相互访问

## 一、对接代码仓库并配置自动构建

Rainbond 支持对接多种 Git 代码仓库，通过 OAuth 协议实现授权认证，目前支持 GitHub、GitLab、Gitee、Gitea 四种代码仓库。

<details>
  <summary>对接 GitHub</summary>
  <div>

**创建 GitHub OAuth Apps**

1. 登录 GitHub 账号，进入 **Settings → Developer settings → OAuth Apps → New OAuth App**
2. 填写以下信息：
   - **Application name**：自定义应用名称，例如 "Rainbond GitOps"
   - **Homepage URL**：Rainbond 访问地址，例如 `https://rainbond.com`
   - **Authorization callback URL**：回调地址，格式为 `{Rainbond地址}/console/oauth/redirect`，例如 `https://rainbond.com/console/oauth/redirect`
3. 点击 **Register application** 完成创建
4. 创建完成后，记录生成的 **Client ID** 和 **Client Secret**

**在 Rainbond 中配置 OAuth**

1. 登录 Rainbond 平台，
   - 全局配置：进入 **平台管理 → 设置 → 基础设置 → OAuth 第三方服务集成 → 添加**
   - 个人配置：进入 **个人中心 → Git私有仓库 → 添加**
2. 填写以下信息：
   - **OAuth 类型**：选择 github
   - **名称**：自定义名称，例如 "GitHub"
   - **客户端 ID**：填写 GitHub OAuth Apps 中的 Client ID
   - **客户端密钥**：填写 GitHub OAuth Apps 中的 Client Secret
   - **回调地址**：默认为当前 Rainbond 访问地址
3. 点击 **确认** 完成配置

  </div>
</details>

<details>
  <summary>对接 GitLab</summary>
  <div>

**创建 GitLab Applications**

1. 登录 GitLab 账号，进入 **User Settings → Applications**
2. 填写以下信息：
   - **Name**：自定义名称，例如 "Rainbond GitOps"
   - **Redirect URL**：回调地址，格式为 `{Rainbond地址}/console/oauth/redirect`，例如 `https://rainbond.com/console/oauth/redirect`
   - **Scopes**：勾选 `api` `read_user` `read_repository`
3. 点击 **Save application** 完成创建
4. 记录生成的 **Application ID** 和 **Secret**

> **注意**：如果使用的是 GitLab 10.6 及以上版本，需要允许向本地网络发送 Webhook 请求。进入 **Admin area → settings → OutBound Request**，勾选 `Allow requests to the local network from hooks and services`。

**在 Rainbond 中配置 OAuth**

1. 登录 Rainbond 平台，
   - 全局配置：进入 **平台管理 → 设置 → 基础设置 → OAuth 第三方服务集成 → 添加**
   - 个人配置：进入 **个人中心 → Git私有仓库 → 添加**
2. 填写以下信息：
   - **OAuth 类型**：选择 gitlab
   - **名称**：自定义名称，例如 "GitLab"
   - **服务地址**：GitLab 访问地址，例如 `https://gitlab.example.com`
   - **客户端 ID**：填写 GitLab Applications 中的 Application ID
   - **客户端密钥**：填写 GitLab Applications 中的 Secret
   - **回调地址**：默认为当前 Rainbond 访问地址
3. 点击 **确认** 完成配置

  </div>
</details>

<details>
  <summary>对接 Gitee</summary>
  <div>

**创建 Gitee 第三方应用**

1. 登录 Gitee 账号，进入 **设置 → 第三方应用 → 创建应用**
2. 填写以下信息：
   - **应用名称**：自定义名称，例如 "Rainbond GitOps"
   - **应用主页**：Rainbond 访问地址，例如 `https://rainbond.com`
   - **应用回调地址**：回调地址，格式为 `{Rainbond地址}/console/oauth/redirect`，例如 `https://rainbond.com/console/oauth/redirect`
   - **权限**：勾选 `user_info` `projects` `hook`
3. 点击 **创建应用** 完成创建
4. 记录生成的 **Client ID** 和 **Client Secret**

**在 Rainbond 中配置 OAuth**

1. 登录 Rainbond 平台，
   - 全局配置：进入 **平台管理 → 设置 → 基础设置 → OAuth 第三方服务集成 → 添加**
   - 个人配置：进入 **个人中心 → Git私有仓库 → 添加**
2. 填写以下信息：
   - **OAuth 类型**：选择 gitee
   - **名称**：自定义名称，例如 "Gitee"
   - **服务地址**：填写 `https://gitee.com`
   - **客户端 ID**：填写 Gitee 第三方应用中的 Client ID
   - **客户端密钥**：填写 Gitee 第三方应用中的 Client Secret
   - **回调地址**：默认为当前 Rainbond 访问地址
3. 点击 **确认** 完成配置

  </div>
</details>

<details>
  <summary>对接 Gitea</summary>
  <div>

**创建 Gitea 应用**

1. 登录 Gitea 账号，进入 **设置 → 应用 → 创建应用**
2. 填写以下信息：
   - **应用名称**：自定义名称，例如 "Rainbond GitOps"
   - **应用回调地址**：回调地址，格式为 `{Rainbond地址}/console/oauth/redirect`，例如 `https://rainbond.com/console/oauth/redirect`
3. 点击 **创建应用** 完成创建
4. 记录生成的 **Client ID** 和 **Client Secret**

**在 Rainbond 中配置 OAuth**

1. 登录 Rainbond 平台，
   - 全局配置：进入 **平台管理 → 设置 → 基础设置 → OAuth 第三方服务集成 → 添加**
   - 个人配置：进入 **个人中心 → Git私有仓库 → 添加**
2. 填写以下信息：
   - **OAuth 类型**：选择 gitea
   - **名称**：自定义名称，例如 "Gitea"
   - **服务地址**：填写 `https://gitea.com`
   - **客户端 ID**：填写 Gitea 第三方应用中的 Client ID
   - **客户端密钥**：填写 Gitea 第三方应用中的 Client Secret
   - **回调地址**：默认为当前 Rainbond 访问地址
3. 点击 **确认** 完成配置

  </div>
</details>

### OAuth 账号认证

在完成 OAuth 配置后，需要进行账号认证与第三方平台互联：

1. 点击 Rainbond 页面右上角的用户头像
2. 选择 **个人中心 → OAuth 账号绑定**
3. 在对应的代码仓库平台（GitHub/GitLab/Gitee）点击 **去认证**
4. 按照页面引导完成授权认证过程

### 基于源码仓库创建应用并配置自动部署

- 完成代码仓库对接后，可以基于源码创建应用并配置自动部署。

1. 进入 Rainbond 团队视图，点击 **新增 → 基于源码创建组件**
2. 选择已对接的代码仓库（GitHub/GitLab/Gitee）
3. 浏览并选择要部署的代码项目
4. 填写组件名称、应用名称等基本信息
5. 打开**自动构建**开关。
6. 点击 **创建组件** 开始构建


- 在组件创建完成后，可以配置自动构建实现代码提交后的自动部署：

1. 进入组件详情页，点击 **构建源**
2. 设置触发关键字，例如 `@deploy`（可自定义）

> **说明**：触发关键字是 Git commit 信息中包含的特定字符串，只有当提交信息中包含该关键字时，才会触发自动构建。

## 二、手动配置 Webhook 实现自动构建

### 开启 Rainbond Git Webhook

开启组件 Git Webhook 在 **组件 → 构建源** 中打开 Git-Webhook 自动构建功能，复制生成的 hook 地址。

### 配置 Git 仓库 Webhooks

<details>
  <summary>GitHub 配置</summary>

进入 GitHub 项目内，**Settings → Webhooks → Add webhooks**
* Payload URL：复制 Rainbond 中的 Webhook 地址
* Content type：`application/json`
* Just the push event：选择 `push` 触发事件
* Active：勾选 `Active`

</details>

<details>
  <summary>GitLab 配置</summary>

进入 GitLab 项目内，**Settings → Integrations → Add webhooks**
* URL：复制 Rainbond 中的 Webhook 地址
* Trigger：勾选 **Push events**

</details>

<details>
  <summary>Gitee 配置</summary>

进入 Gitee 项目内，**管理 → WebHooks → 添加WebHooks**
* URL：复制 Rainbond 中的 Webhook 地址
* Trigger：勾选 **Push events**

</details>

<details>
  <summary>Gitea 配置</summary>

进入 Gitee 项目内，**设置 → 添加 Web 钩子**
* 目标URL：复制 Rainbond 中的 Webhook 地址
* HTTP 方法：选择 `POST`
* POST 内容类型：选择 `application/json`
* 勾选 `激活`
* 分支过滤：填写 `*`（表示所有分支均触发）
* 自定义事件：勾选 `推送`

</details>

其他代码仓库配置方式类似，需要说明的是目前 Rainbond hook 触发暂不支持安全请求校验。

## 三、GitOps 持续部署实践

### 3.1 完整的 GitOps 工作流

一个完整的 GitOps 工作流包括以下步骤：

1. 开发者在本地开发环境修改代码
2. 提交代码到 Git 仓库，在 commit 信息中包含触发关键字（如 `@deploy`）
3. Git 仓库通过 Webhook 通知 Rainbond 平台
4. Rainbond 检测到提交信息中包含触发关键字，自动拉取最新代码
5. Rainbond 自动构建应用并部署
6. 应用更新完成，开发者可以立即看到最新变更

### 3.2 最佳实践

推荐为不同环境配置不同的分支和自动构建策略：

- **开发环境**：配置 `develop` 分支的自动构建，可以使用较宽松的触发条件
- **测试环境**：配置 `test` 或 `staging` 分支的自动构建，使用明确的触发关键字
- **生产环境**：配置 `master` 或 `main` 分支的自动构建，建议增加人工审核步骤

## 常见问题

### Webhook 未触发自动构建

**可能原因**：
- Commit 信息中没有包含触发关键字
- Webhook 配置不正确或 URL 错误
- 网络连接问题导致 Webhook 请求未到达 Rainbond
- GitLab 版本较高，未允许本地网络 Webhook 请求

**解决方法**：
1. 检查 commit 信息是否包含正确的触发关键字
2. 在代码仓库的 Webhook 配置页面检查 Webhook 的送达状态
3. 对于私有化部署的 GitLab，检查是否开启了「允许向本地网络发送 Webhook 请求」的选项

