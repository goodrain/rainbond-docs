---
title: AI 能力概览：RainAgent、RainSkills 与 Rainbond 大模型
description: 了解 Rainbond 面向 AI 时代提供的三类能力：控制台 AI 助手 RainAgent、AI 编码工作流 RainSkills，以及用于私有化部署和管理文本大模型服务的 Rainbond 大模型。
keywords:
- Rainbond AI
- RainAgent
- RainSkills
- Rainbond 大模型
- AI 应用部署
- 大模型私有化部署
- AI 运维助手
- AI 编码部署
---

# Rainbond AI 能力概览

Rainbond 是面向 AI 时代的开源容器平台。它基于 Kubernetes，但屏蔽底层复杂度，帮助团队部署、运行、排障和交付业务应用、AI 应用与私有化大模型服务。

Rainbond 的 AI 能力主要由三部分组成：

- **RainAgent**：控制台里的 AI 助手，用自然语言辅助应用部署、排障、运维和授权执行。
- **RainSkills**：面向 Claude Code、Codex 等 AI 编码工具的工作流技能，让 AI 能把本地项目部署到 Rainbond，并继续参与排障和交付验证。
- **Rainbond 大模型**：大模型服务插件，用于准备模型、创建推理实例、管理 API 密钥、调试模型服务和查看运行监控。

这三类能力不是独立的 AI 产品，而是围绕 Rainbond 的应用交付和运维流程展开。

它们共同解决一个问题：

> 从 AI 写出代码，到应用上线运行，再到模型服务接入和异常排查，Rainbond 希望把这些环节接成一条完整链路。

## 三类 AI 能力分别解决什么问题？

| 能力 | 使用入口 | 主要解决的问题 | 适合谁 |
| --- | --- | --- | --- |
| RainAgent | Rainbond 控制台 | 在页面上下文中部署、排错、查看日志、调整配置和执行运维动作 | 平台用户、开发者、运维人员 |
| RainSkills | Claude Code、Codex 等 AI 编码工具 | 让 AI 编码工具把当前项目部署到 Rainbond，并结合日志继续修复 | AI 编码用户、开发者 |
| Rainbond 大模型 | Rainbond 插件页面 | 部署和管理文本大模型服务，并通过 OpenAI 兼容接口对外提供推理能力 | AI 应用团队、平台团队、企业 IT |

## RainAgent：控制台里的 AI 助手

RainAgent 是 Rainbond 控制台内置的 AI 助手。它可以结合当前企业、团队、应用、组件、日志、事件、资源状态和用户权限，通过自然语言帮助用户完成部署、排错和运维操作。

你可以在控制台中直接问：

```text
帮我检查当前应用状态。
```

```text
查看 frontend 组件最近 100 行日志，并判断是否有异常。
```

```text
当前组件访问不通，帮我检查端口、网关访问和组件状态。
```

RainAgent 适合处理：

- 应用或组件状态检查
- 启动失败、访问异常、实例不健康排查
- 构建、部署、运行日志分析
- 环境变量、端口、资源、健康检查等配置查看
- 启动、停止、重启、重新部署等运维动作

涉及运行状态变更时，RainAgent 不会静默执行。它会展示审批确认，由用户授权后再继续操作。

继续阅读：[RainAgent：控制台 AI 助手](/docs/ai/rainagent)

## RainSkills：让 AI 编码工具接入部署闭环

RainSkills 是一组面向 Rainbond 的开源 AI 工作流技能，用于增强 Claude Code、Codex 等 AI 编码工具的部署、排障和交付能力。

当你在本地项目中使用 AI 编码工具时，可以直接说：

```text
帮我把当前项目部署到 Rainbond。
```

RainSkills 会结合本地项目文件、Rainbond MCP 工具和平台状态，完成这些工作：

- 识别本地项目结构
- 建立本地项目与 Rainbond 应用的绑定关系
- 辅助补齐端口、依赖、连接变量和存储配置
- 部署源码、镜像、软件包或应用模板
- 读取构建日志、运行日志、Pod 状态和平台事件
- 判断应用是否真正交付成功

快速安装：

```bash
bash <(curl -fsSL https://get.rainbond.com/rainskills/install.sh)
```

继续阅读：[RainSkills：AI 编码工作流技能](/docs/ai/rainskills)

## Rainbond 大模型：部署和管理文本大模型服务

Rainbond 大模型是 Rainbond 的大模型服务插件，面向团队提供模型管理、模型部署、推理服务接入和运行监控能力。

它适合这些场景：

- 将文本大模型部署为在线推理服务
- 管理团队可部署的模型资产
- 创建 CPU 或 GPU 推理实例
- 使用 OpenAI 兼容接口接入外部应用
- 创建和吊销 API 密钥
- 在线调试模型对话
- 查看模型服务和 GPU 资源监控

Rainbond 大模型的能力主要分为四部分：

| 模块 | 作用 |
| --- | --- |
| 仓库模型 | 查看内置模型，准备外部模型，管理团队模型资产 |
| 实例 | 创建、启动、停止、删除模型推理实例，并查看日志和运行状态 |
| 密钥 | 创建 API Key，并提供 OpenAI 兼容调用示例 |
| 监控 | 查看服务健康、请求量、失败数、响应时间和 GPU 资源情况 |

当模型实例运行后，外部应用可以通过 OpenAI 兼容接口调用模型服务。这样，Dify、知识库应用、自研 AI 应用或业务系统都可以接入 Rainbond 中运行的模型服务。

继续阅读：[Rainbond 大模型：部署和管理大模型服务](/docs/ai/rainbond-llm)

## 应该从哪里开始？

| 你的目标 | 建议入口 |
| --- | --- |
| 我想在控制台里用自然语言排错和运维 | 先看 [RainAgent](/docs/ai/rainagent) |
| 我正在用 Claude Code 或 Codex 写代码，想部署当前项目 | 先安装 [RainSkills](/docs/ai/rainskills) |
| 我想部署一个文本大模型服务，并提供 API 调用 | 先看 [Rainbond 大模型](/docs/ai/rainbond-llm) |
| 我想部署 Dify、知识库应用或 AI 应用 | 先部署 Rainbond，再结合 Rainbond 大模型和应用市场 |
| 我只是第一次体验 Rainbond | 先完成 [快速安装](/docs/quick-start/quick-install) 和 [第一个应用部署](/docs/quick-start/getting-started) |

## 三者如何配合？

在完整的 AI 应用交付流程中，三者可以配合使用：

1. 使用 **RainSkills** 将 AI 编码工具生成的应用部署到 Rainbond。
2. 使用 **RainAgent** 在控制台中查看部署进度、排查失败原因和处理运行异常。
3. 使用 **Rainbond 大模型** 部署文本大模型服务，并通过 OpenAI 兼容接口接入应用。
4. 应用上线后，继续通过 RainAgent 和 RainSkills 完成排障、修复和重新部署。

这条链路可以概括为：

```text
代码生成 → 应用部署 → 模型服务接入 → 运行监控 → 排错修复 → 再次交付
```

Rainbond 的 AI 能力不是替代原有应用管理能力，而是让应用交付、模型服务和运维排障更适合 AI 时代的工作方式。

## 常见问题

### Rainbond 现在是 AI 平台吗？

Rainbond 不是单独的大模型平台，也不是单独的 Agent 平台。Rainbond 仍然是开源容器平台和应用交付平台，AI 能力用于增强部署、排障、运维和大模型服务管理。

### RainAgent 和 RainSkills 有什么区别？

RainAgent 在 Rainbond 控制台中使用，适合结合当前应用上下文进行排障和运维。RainSkills 在 Claude Code、Codex 等 AI 编码工具中使用，适合从本地项目发起部署、排障和交付验证。

### Rainbond 大模型和 RainAgent 是一回事吗？

不是。Rainbond 大模型用于部署和管理文本大模型服务；RainAgent 是控制台里的 AI 助手。RainAgent 可以调用配置好的模型能力，但它本身不是模型部署工具。

### 使用 RainAgent 是否会自动修改资源？

不会静默修改。RainAgent 继承当前用户权限。涉及启动、停止、重启、删除、配置修改等变更类操作时，会展示审批确认，用户授权后才会执行。

### Rainbond 大模型 支持什么类型的模型？

当前 Rainbond 大模型主要面向文本大模型服务，支持模型准备、推理实例、API 密钥、OpenAI 兼容接口调用和模型监控。具体可用模型和 GPU 能力取决于当前平台环境和插件版本。

## 下一步

- 如果你想先体验 Rainbond：阅读 [快速安装](/docs/quick-start/quick-install)
- 如果你想用 AI 编码工具部署项目：阅读 [RainSkills](/docs/ai/rainskills)
- 如果你想在控制台中使用 AI 排障：阅读 [RainAgent](/docs/ai/rainagent)
- 如果你想部署大模型服务：阅读 [Rainbond 大模型](/docs/ai/rainbond-llm)
