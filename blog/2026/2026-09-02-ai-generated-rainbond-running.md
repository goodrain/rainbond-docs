---
title: AI 生成，Rainbond 运行：Rainbond 面向 AI 编程时代的一次升级
description: RainSkills、Rainbond 与 RainAgent 共同打通 AI 生成项目从识别、部署、排障到持续运维的完整链路，让应用可靠运行在 Rainbond Cloud、私有服务器或 Kubernetes 上。
slug: ai-generated-rainbond-running
date: 2026-09-02
keywords:
  - Rainbond
  - RainSkills
  - RainAgent
  - AI 编程
  - AI 应用部署
  - Codex 部署
  - Claude Code 部署
  - Kubernetes
  - 私有化部署
  - 应用运维
tags:
  - Rainbond
  - RainSkills
  - RainAgent
  - AI 编程
  - AI 应用部署
---

过去，我们发布过 RainSkills 和 RainAgent，尝试让 AI 参与应用部署与运维。

但当时，它们更多是能力探索。用户仍需手动准备 Rainbond，Agent 的连接路径不够统一，从项目识别、部署到交付验证，也没有完全形成闭环。

经过持续优化，现在 **RainSkills、Rainbond 和 RainAgent 已经可以共同进入真实应用的生产流程。**

<!--truncate-->

基于这些变化，我们重新明确了 Rainbond 的定位：

> **Rainbond 是面向 AI 编程时代的开源应用运行平台。**

让 AI 生成的项目、AI 应用和企业业务系统，可靠运行在 Rainbond Cloud、自己的服务器或 Kubernetes 上。

> **AI 生成，Rainbond 运行。**<br />
> **始终由你掌控。**

![Agent、RainSkills、Rainbond 与 RainAgent 的完整关系](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/agent-rainskills-rainbond-rainagent.png)

## 从一个本地项目开始

Rainskills 已经适配了 **Codex、Claude Code、Pi Agent、DeepSeek Harness 等 AI 编程工具**

在 Agent 中安装 RainSkills：

```
帮我通过 npx 安装rainskills
```

或终端执行命令：

```
npx --yes rainskills
```

![RainSkills 安装完成后下一条消息即可直接使用](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-install.png)

安装完成后，你可以直接对 AI 说：

```
帮我部署当前项目
```

RainSkills 会先理解你的目标，再检查是否已经有可用的应用运行环境。RainSkills 会结合当前项目文件和 Rainbond 平台状态，继续完成：

- 识别项目结构
- 生成部署计划
- 创建 Rainbond 应用
- 完成构建和部署
- 验证页面和 API
- 给出项目访问地址

**用户不需要先离开 Agent，再重新学习一套部署流程。**

例如，一个同时包含 Web 前端、API、MySQL 和 Redis 的项目，RainSkills 不会只触发一次构建就结束。它会继续确认组件关系、连接变量、端口、存储和访问入口。遇到环境变量不匹配或服务启动异常时，它会结合事件与日志定位问题。

这让“帮我部署”不再只是执行一条命令，而是对应一个可以被检查、被修复、被验收的完整交付目标。

![RainSkills 部署应用](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png)

## 没有 Rainbond，也可以从 Skill 直接开始

这是 RainSkills 本次最重要的变化之一。

当 RainSkills 检测到还没有可用的 Rainbond 时，会提供三种路径：

```text
1. 连接 Rainbond Cloud，快速完成体验
2. 通过 Skill 把 Rainbond 安装到自己的服务器
3. 连接已有的私有 Rainbond
```

选择私有化路径后，Skill 会继续检查服务器和环境，引导完成 Rainbond 安装。安装成功后，它会自动回到原来的项目，继续完成应用部署。

**不必先退出 Agent、查找安装文档、手动安装平台，再回来重新开始。**

![没有 Rainbond 时可以选择的三种运行环境路径](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainbond-runtime-paths.png)

## Rainbond 负责让应用真正运行

应用进入 Rainbond 后，平台负责持续管理：

- 组件及依赖关系
- 构建和运行状态
- 网关、存储和环境配置
- 日志、事件和监控
- 版本、升级和回滚

最终结果不只是“资源已经创建”，而是应用已经稳定运行，并且页面和 API 可以被验证。

**AI 可以完成一次部署，Rainbond 负责让应用持续运行。**

![Rainbond 统一管理应用拓扑和运行状态](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/app-topolog.png)

## RainAgent 继续完成平台内运维

应用运行以后，可以通过 Rainbond 右上角的 AI 助手进入 RainAgent：

```text
检查当前应用是否健康。
```

```text
页面可以打开，但接口不通，帮我分析原因。
```

```text
查看 api 组件最近一次构建失败的原因。
```

RainAgent 能理解当前企业、团队、应用和组件上下文，读取实例、事件及日志，辅助完成排障、配置和运维操作。

涉及变更时，操作仍然受 Rainbond 用户权限控制，并需要用户确认。**AI 在查看什么、准备做什么、应用发生了什么变化，都可以在平台里实时看到。**

> **RainSkills 把项目送进 Rainbond，RainAgent 在 Rainbond 中继续管理它。**

![RainAgent 在 Rainbond 中分析日志并等待操作确认](https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/agent-topolog.png)

## 对现有 Rainbond 用户意味着什么？

- 现有应用不需要迁移
- 原有控制台和部署方式继续保留
- RainSkills 可以直接连接已有 Rainbond
- RainAgent 可以管理已有应用
- 私有化、离线、信创和应用交付能力没有改变

**变化的是用户入口和使用门槛，不是 Rainbond 的运行底座。**

对于已经在使用 Rainbond 的团队，这次升级不是推倒重来，而是在熟悉的平台和应用之上，增加一条更自然的 AI 使用路径。

最直观的变化，是开发者不必先在多个页面之间寻找入口。可以直接留在 Codex、Claude Code 等 Agent 中描述目标，由 RainSkills 把动作映射到原有的企业、团队、应用和组件模型。部署完成后，应用拓扑、构建记录、运行日志、网关和存储仍然可以在 Rainbond 控制台中继续查看。

运维人员也不需要接手一段脱离平台的 AI 对话。进入已有应用后，可以直接通过 RainAgent 继续查询状态、分析故障和执行受控操作。**个人使用 AI 的效率，最终仍然沉淀为团队可以共同查看和管理的平台状态。**

## 现在开始体验

在 Agent 中安装 RainSkills：

```
帮我通过 npx 安装rainskills
```

或终端执行命令：

```
npx --yes rainskills
```

这一次，我们更希望你使用一个真实项目，而不只是 Hello World。

**AI 生成，Rainbond 运行。**<br />
**始终由你掌控。**

## RainSkills 其他变更

优化事项：

- 支持 Codex、Claude Code、Pi Agent、DeepSeek Harness、WorkBuddy 和 Hermes Agent；
- 统一不同客户端使用的 Skills、CLI 和 Rainbond 运行环境；
- 支持源码、Git 仓库、镜像、软件包和应用模板等部署来源；
- 支持连接 Rainbond Cloud 和已有私有 Rainbond；
- 支持在本机、Linux 服务器或已有 Kubernetes 中安装私有 Rainbond；
- 增强多服务项目和 Docker Compose 项目的识别能力；
- 可直接通过联网搜索部署开源应用；
- 支持正式版本后台检查和更新。

> 如已有 Rainbond，需要升级到 v6.9.9-release 及以上版本才适配最新 RainSkills。

平台升级：

- 在线环境：`平台管理 → 企业设置 → 升级`，执行一键升级。
- 离线环境：请阅读[离线升级文档](https://www.rainbond.com/docs/upgrade/latest-version)。

## 加入 Rainbond 微信交流群

扫描下方二维码，加入 Rainbond 微信交流群。

<img src="/wechat/rainbond-xzs.png" alt="Rainbond 微信交流群二维码" width="240" />
