---
Title: '基于源码的自动CI流程创建'
Hidden: true
Description: 'Rainbond基于Git仓库源码构建的服务进行自动CI实践'
Weight: 22001
---

### 概述

对于从 Github、Gitlab、Gogs、Gitee 仓库源码构建的应用， `Rainbond` 提供基于`WEBHOOKS`的自动部署功能。

### 实践场景

Rainbond 官方文档系统部署在我们的公有云环境中。现在以此场景为例，演示如何实现源码的自动部署。

项目源码地址： [rainbond-docs](https://github.com/goodrain/rainbond-docs)

### 操作配置方式

1. 基于源码创建组件，参考文档 [从源码创建组件](/user-manual/component-create/language-support/)
2. 进入组件管理-构建源管理-打开 Git-Webhook 功能，可以获取到 hook 地址。 参考文档 [组件自动构建设置](/docs/user-manual/component-dev/auto_build/)
3. 前往 Github 或其他 Git server 配置 Webhooks.

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs3.png" style="border:1px solid #eee;width:85%">

值得注意的是：

`Content type` 选项务必选择 `application/json`

#### 触发方式

webhook 配置完成后，再次提交代码，当 Commmit 信息包含“@deploy”时将自动触发应用自动部署

**触发测试**

提交信息

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs4.png" style="border:1px solid #eee;width:85%">

成果

这篇文档在提交代码后无需任何其他操作即可上线，即是触发自动部署的成果。
