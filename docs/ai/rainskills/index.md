---
title: RainSkills：让 AI Agent 部署、排障和交付 Rainbond 应用
description: RainSkills 是 Rainbond 官方开源 Agent Skills，帮助 Codex、Claude Code 等 AI 编码工具完成项目接入、应用部署、运行排障、交付验证和版本管理。
sidebar_label: RainSkills
keywords:
- RainSkills
- Rainbond Skills
- AI Agent 部署
- Codex 部署应用
- Claude Code 部署应用
- Agent Skills
- 应用部署
- 应用排障
- 交付验证
- MCP
image: /img/video/rainskills-ai-deploy-cover.jpg
---

import Head from '@docusaurus/Head';
import VideoDocCallout from '@site/src/components/Docs/VideoDocCallout';
import styles from './styles.module.css';

export const rainskillsUrl = 'https://www.rainbond.com/docs/ai/rainskills';
export const rainskillsImageUrl = 'https://www.rainbond.com/img/video/rainskills-ai-deploy-cover.jpg';
export const rainskillsSoftwareId = 'https://www.rainbond.com/docs/ai/rainskills#software';

export const rainskillsFaqs = [
  {
    question: 'RainSkills 是什么？',
    answer: 'RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Codex、Claude Code 等 AI 编码工具中，通过 Rainbond MCP 完成项目接入、应用部署、运行排障、交付验证和版本管理。',
  },
  {
    question: 'RainSkills 和 RainAgent 有什么区别？',
    answer: 'RainSkills 从本地项目和 AI 编码工具出发，适合接入、部署、排障和交付；RainAgent 运行在 Rainbond 控制台中，更适合结合当前企业、应用和组件上下文进行平台内运维。',
  },
  {
    question: '没有 Rainbond 可以使用 RainSkills 吗？',
    answer: '可以先安装 RainSkills。选择私有化且没有可用 Rainbond 时，RainSkills 可以引导安装单机版、多节点集群版，或在已有 Kubernetes 集群中安装并接入 Rainbond。',
  },
  {
    question: 'RainSkills 会自动执行高风险操作吗？',
    answer: '不会静默执行删除应用、删除组件、修改业务代码等高风险操作。遇到需要用户选择、平台安装或高风险变更时，RainSkills 会暂停并请求明确确认。',
  },
  {
    question: 'RainSkills 会上传本地项目或凭据吗？',
    answer: 'RainSkills 只读取完成当前任务所需的项目和 Rainbond 上下文，不会把 JWT、密码或本地源码写入公开文档与统计事件；敏感信息应继续通过受保护的本地文件或环境变量管理。',
  },
];

export const rainskillsWorkflowSteps = [
  {
    title: '当前项目',
    description: '提供当前目录中的代码、配置和项目上下文。',
    emphasis: false,
  },
  {
    title: 'AI Agent',
    description: 'Codex、Claude Code 等 Agent 接收你的自然语言目标。',
    emphasis: false,
  },
  {
    title: 'RainSkills',
    description: '识别项目与任务，选择对应的部署、排障或交付流程。',
    emphasis: true,
  },
  {
    title: 'Rainbond MCP',
    description: '以受控接口读取平台状态，并把确认后的操作发送给 Rainbond。',
    emphasis: false,
  },
  {
    title: 'Rainbond 应用运行平台',
    description: '统一处理应用构建、部署、依赖、访问、运维和版本。',
    emphasis: true,
  },
  {
    title: '目标运行环境',
    description: '让应用运行在公有云、私有云、Kubernetes、服务器或离线环境。',
    emphasis: false,
  },
];

export const rainskillsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': rainskillsSoftwareId,
      name: 'RainSkills',
      alternateName: 'Rainbond Skills',
      description: 'Rainbond 官方开源 Agent Skills，帮助 AI 编码工具完成项目接入、应用部署、运行排障、交付验证和版本管理。',
      url: rainskillsUrl,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'CNY',
      },
      creator: {
        '@type': 'Organization',
        name: 'Rainbond',
        url: 'https://www.rainbond.com',
      },
      softwareHelp: rainskillsUrl,
      sameAs: [
        'https://github.com/goodrain/rainskills',
        'https://www.npmjs.com/package/rainskills',
      ],
    },
    {
      '@type': 'TechArticle',
      headline: 'RainSkills：让 AI 帮你部署应用',
      description: 'RainSkills 产品说明、安装方式、工作流程、能力边界和使用指南。',
      url: rainskillsUrl,
      image: rainskillsImageUrl,
      inLanguage: 'zh-CN',
      dateModified: '2026-08-31',
      about: { '@id': rainskillsSoftwareId },
      author: {
        '@type': 'Organization',
        name: 'Rainbond',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Rainbond',
        url: 'https://www.rainbond.com',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: rainskillsFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://www.rainbond.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI 能力',
          item: 'https://www.rainbond.com/docs/ai',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'RainSkills',
          item: rainskillsUrl,
        },
      ],
    },
  ],
};

<Head>
  <link rel="canonical" href={rainskillsUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="RainSkills：让 AI Agent 部署、排障和交付 Rainbond 应用 | Rainbond" />
  <meta property="og:description" content="RainSkills 是 Rainbond 官方开源 Agent Skills，帮助 AI 编码工具完成项目接入、部署、排障和交付。" />
  <meta property="og:url" content={rainskillsUrl} />
  <meta property="og:image" content={rainskillsImageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">
    {JSON.stringify(rainskillsJsonLd)}
  </script>
</Head>

# RainSkills：让 AI 帮你部署应用

RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Codex、Claude Code 等 AI 编码工具中，通过 Rainbond MCP 将当前项目接入 Rainbond，完成应用部署、运行排障、交付验证和版本管理。

它解决的不是“让 AI 多写一段部署脚本”，而是让 AI 能理解项目、应用、组件和运行状态，把一次部署继续推进到可以访问、可以排障、可以升级和可以交付。

> 最后更新：2026-08-31 ｜ 当前安装器 npm 版本：0.1.34 ｜ [查看 RainSkills GitHub](https://github.com/goodrain/rainskills)

<VideoDocCallout
  title="RainSkills 安装使用视频教程"
  description="按照视频中的关键步骤完成 RainSkills 安装、Agent 接入、Rainbond 授权和一句话部署。"
  href="/videos/rainskills-ai-deploy"
  cover="/img/video/rainskills-ai-deploy-cover.jpg"
  coverAlt="RainSkills 安装使用视频封面"
/>

## 安装 RainSkills

如果你正在使用 Codex 或 Claude Code，可以先把下面这句话发送给当前 Agent：

```text
帮我安装 RainSkills，并连接到我要使用的 Rainbond。
```

Agent 会启动官方安装器。安装过程中需要选择 Rainbond Cloud、已有私有化 Rainbond、新建单机版或多节点集群版 Rainbond，或在已有 Kubernetes 集群中安装 Rainbond 时，安装器会暂停并让你确认，不会替你做环境选择。

如果你希望直接运行安装器：

```bash
npx --yes rainskills
```

更多安装方式和高级参数请查看 [RainSkills GitHub](https://github.com/goodrain/rainskills#readme)。

## 为什么不直接让 Agent 操作服务器？

Agent 直接通过 SSH、终端命令或临时脚本操作服务器，可以完成简单的文件复制和进程启动，但难以稳定处理数据库、依赖关系、域名、证书、存储、日志、升级、回滚和最终访问验证。

| 直接操作服务器 | RainSkills + Rainbond |
| --- | --- |
| 依赖当前对话、SSH 和临时脚本 | 通过稳定的 Rainbond 应用对象和 MCP 操作 |
| 容易把进程启动当作部署完成 | 检查组件、Pod、事件、访问入口和存储状态 |
| 数据库、缓存和服务依赖需要人工拼装 | 使用应用拓扑表达组件与依赖关系 |
| 升级和回滚依赖额外脚本 | 通过快照、版本和发布流程持续管理 |
| 难以判断应用是否真正可访问 | 通过交付验证输出访问地址和交付结论 |

RainSkills 不会绕过 Rainbond 直接接管服务器。Rainbond 负责应用运行和管理，RainSkills 负责让 Agent 正确理解并使用这些平台能力。

## RainSkills 如何工作？

<ol className={styles.workflowList} aria-label="RainSkills 从项目到运行环境的工作流程">
  {rainskillsWorkflowSteps.map((step, index) => (
    <li
      key={step.title}
      className={step.emphasis ? `${styles.workflowStep} ${styles.workflowStepEmphasis}` : styles.workflowStep}
    >
      <span className={styles.workflowMarker} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className={styles.workflowCard}>
        <strong>{step.title}</strong>
        <p>{step.description}</p>
      </div>
    </li>
  ))}
</ol>

RainSkills 会结合当前项目文件、项目与 Rainbond 的绑定信息、Rainbond MCP 返回的平台状态，以及用户在关键节点的确认继续工作。

## RainSkills 能做什么？

### 项目接入与初始化

- 识别源码、镜像、软件包和应用模板等输入方式。
- 生成或复用 `rainbond.app.json` 和 `.rainbond/local.json`。
- 建立本地项目与 Rainbond 应用的明确绑定关系。
- 识别前端、后端、数据库、缓存等组件边界。

### 应用部署

- 创建或复用 Rainbond 应用和组件。
- 辅助补齐端口、依赖、连接变量和必要存储。
- 通过 Rainbond 执行构建、部署和访问配置。
- 支持单组件项目和包含数据库、后端、前端的全栈项目。

### 运行排障

- 读取组件状态、Pod 诊断、事件、构建日志和运行日志。
- 区分构建失败、镜像拉取失败、依赖缺失、变量不匹配和启动异常。
- 对低风险平台配置问题提供修复路径。
- 遇到业务代码、镜像内容和平台容量问题时明确停止并给出建议。

### 交付验证

- 检查组件、Pod、事件、存储和访问配置是否收敛。
- 验证页面路径与 API 路径，而不只确认资源已经创建。
- 识别最终访问地址。
- 输出已交付、需要人工验证、部分交付或阻塞等结论。

### 版本与发布

- 查看应用版本概览并创建快照。
- 发布到本地组件库或云市场。
- 查看发布草稿和发布事件。
- 辅助查看快照、回滚记录并执行受控回滚。

## RainSkills 与 RainAgent 有什么区别？

RainSkills 和 RainAgent 都使用 AI 辅助 Rainbond 操作，但入口和上下文不同。

| 对比项 | RainSkills | RainAgent |
| --- | --- | --- |
| 使用位置 | Codex、Claude Code 等本地 AI 编码工具 | Rainbond 控制台 |
| 工作起点 | 当前项目、仓库和本地绑定信息 | 当前企业、团队、应用和组件 |
| 主要场景 | 项目接入、部署、排障、交付验证和版本操作 | 平台内查询、排障、运维和授权执行 |
| 关系 | 从本地开发流程连接 Rainbond | 从 Rainbond 页面上下文操作平台 |

它们不会互相替代。开发者可以用 RainSkills 从本地项目发起部署，再用 RainAgent 在控制台中结合页面上下文继续查看和运维。

## 支持的 Agent 与运行环境

当前官方主安装流程优先支持 Codex 和 Claude Code。npm 安装器同时包含 Pi Agent、DeepSeek Harness、WorkBuddy 和 Hermes Agent 等适配入口，但不同操作系统和安装方式可能有额外限制，应以当前稳定版本的 [GitHub README](https://github.com/goodrain/rainskills#readme) 为准。

RainSkills 可以连接或协助准备以下 Rainbond 环境：

- Rainbond Cloud。
- 已经运行的私有化 Rainbond。
- 由安装器引导新建的单机版或多节点集群版 Rainbond。
- 在已有 Kubernetes 集群中安装并接入 Rainbond。

不同安装目标的节点规划、资源、网络、存储、高可用和离线材料要求不同。RainSkills 会根据用户选择进入对应流程，具体前置条件仍以 [Rainbond 安装文档](/docs/installation) 为准。

## 安装器会完成什么？

- 识别或选择 Codex、Claude Code 等目标 Agent。
- 安装 RainSkills 的独立业务 Skill。
- 选择 Rainbond Cloud、已有私有化环境、新建单机或多节点 Rainbond，或接入已有 Kubernetes。
- 在浏览器中完成登录和授权。
- 配置当前 Agent 对应的 Rainbond MCP。
- 验证 MCP 是否可以访问。

安装完成后，重新加载 Plugin 或重启当前 AI 编码工具，确保 Skill 和 MCP 配置生效。

## 常用提示词

### 部署与初始化

```text
帮我把当前项目部署到 Rainbond。
```

```text
如果这个项目还没有初始化，就先接入 Rainbond，然后继续部署。
```

```text
用这个 Git 仓库创建一个 Rainbond 应用。
```

### 排障与修复

```text
帮我看看当前应用为什么没有正常运行。
```

```text
检查 api 组件的构建日志，看看失败原因。
```

```text
这个前端页面能打开，但接口不通，帮我排查一下。
```

### 交付验证

```text
帮我验证这个应用是否已经交付成功，并给我访问地址。
```

### 版本与发布

```text
给当前应用创建一个快照。
```

```text
把这个快照发布到本地组件库。
```

```text
把当前应用回滚到上一个快照。
```

## 更新、刷新与故障处理

### 更新 RainSkills

```bash
npx --yes rainskills@latest --force
```

### 刷新授权

如果 Rainbond MCP 返回 401、403、`unauthorized` 或 `token expired`，执行：

```bash
npx --yes rainskills refresh
```

刷新成功后重启当前 Agent，因为 MCP 客户端通常在进程启动时读取环境变量。

## 安全、权限和数据边界

- RainSkills 优先读取当前项目下的 `rainbond.app.json` 和 `.rainbond/local.json`，不会扫描其他仓库猜测绑定关系。
- `.rainbond/env.preview.json` 和 `.rainbond/env.prod.json` 只保存非敏感环境覆盖，不应写入密码、Token、证书或私钥。
- 删除应用、删除组件、修改业务代码和平台安装等高风险动作需要明确确认。
- 用户没有明确选择 Rainbond Cloud 或私有化环境时，Agent 不应替用户采用默认项。
- 问题定位到业务代码、构建脚本、镜像内容或平台容量时，RainSkills 会停止继续尝试并说明下一步。

## 常见问题

<div className={styles.faqList}>
  {rainskillsFaqs.map((faq) => (
    <details key={faq.question} className={styles.faqItem}>
      <summary className={styles.faqSummary}>
        <span className={styles.faqQuestion}>{faq.question}</span>
        <span className={styles.faqIcon} aria-hidden="true" />
      </summary>
      <div className={styles.faqAnswer}>
        <p>{faq.answer}</p>
      </div>
    </details>
  ))}
</div>

## 相关内容

- [Rainbond AI 能力概览](/docs/ai)
- [RainSkills 安装使用视频](/videos/rainskills-ai-deploy)
- [RainAgent：控制台 AI 助手](/docs/ai/rainagent)
- [Rainbond 快速安装](/docs/quick-start/quick-install)
- [RainSkills GitHub 源码](https://github.com/goodrain/rainskills)
