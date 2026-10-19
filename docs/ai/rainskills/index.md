---
title: RainSkills 安装与使用：支持的 Agent、运行环境与部署流程
description: 了解如何在 Codex、Claude Code、Pi Agent、DeepSeek Harness、WorkBuddy 和 Hermes Agent 中安装 RainSkills，连接 Rainbond，并部署、排障和验证应用。
sidebar_label: RainSkills
keywords:
- RainSkills 安装
- RainSkills 使用
- AI Agent 部署
- Codex 部署应用
- Claude Code 部署应用
- Agent Skills
- 应用部署
- 应用排障
- 交付验证
image: /img/video/rainskills-ai-deploy-cover.jpg
---

import Head from '@docusaurus/Head';
import VideoDocCallout from '@site/src/components/Docs/VideoDocCallout';
import RainSkillsWechatSupport from '@site/src/components/RainSkillsWechatSupport';
import styles from './styles.module.css';

export const rainskillsUrl = 'https://www.rainbond.com/docs/ai/rainskills';
export const rainskillsImageUrl = 'https://www.rainbond.com/img/video/rainskills-ai-deploy-cover.jpg';
export const rainskillsSoftwareId = 'https://www.rainbond.com/docs/ai/rainskills#software';

export const rainskillsFaqs = [
  {
    question: 'RainSkills 是什么？',
    answer: 'RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Codex、Claude Code 等 AI 编码工具中。它通过受保护的本地运行时连接 Rainbond，完成项目接入、应用部署、运行排障、交付验证和版本管理。',
  },
  {
    question: '安装 RainSkills 时会直接连接 Rainbond 吗？',
    answer: '不会。安装阶段只安装完整的独立 Skill 集合和本地运行组件。用户第一次提出部署、查询或其他需要 Rainbond 的任务时，Agent 才会引导选择并连接一个运行环境。',
  },
  {
    question: 'RainSkills 和 RainAgent 有什么区别？',
    answer: 'RainSkills 从本地项目和 AI 编码工具出发，适合接入、部署、排障和交付；RainAgent 运行在 Rainbond 控制台中，更适合结合当前企业、应用和组件上下文进行平台内运维。',
  },
  {
    question: '没有 Rainbond 可以使用 RainSkills 吗？',
    answer: '可以先安装 RainSkills。第一次需要运行环境时，可以选择 Rainbond Cloud、已有私有 Rainbond，或在本机、独立服务器和已有 Kubernetes 中准备私有 Rainbond。',
  },
  {
    question: 'RainSkills 会自动执行高风险操作吗？',
    answer: '不会静默执行删除应用、删除组件、修改业务代码等高风险操作。遇到需要用户选择、平台安装或高风险变更时，RainSkills 会暂停并请求明确确认。',
  },
  {
    question: 'RainSkills 会上传本地项目或凭据吗？',
    answer: 'RainSkills 只读取完成当前任务所需的项目和 Rainbond 上下文，不会把 JWT、密码或本地源码写入公开文档与统计事件。Rainbond 授权凭据保存在受保护的本地状态中。',
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
    title: '受保护的本地运行时',
    description: '在首次需要时连接一个 Rainbond，并通过固定工具契约执行操作。',
    emphasis: false,
  },
  {
    title: 'Rainbond 应用运行平台',
    description: '统一处理应用构建、部署、依赖、访问、运维和版本。',
    emphasis: true,
  },
  {
    title: '目标运行环境',
    description: '让应用运行在云端、自己的服务器、Kubernetes 或离线环境。',
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
      headline: 'RainSkills 安装与使用',
      description: 'RainSkills 支持的 Agent、安装方式、运行环境连接、部署流程、能力边界和常用提示词。',
      url: rainskillsUrl,
      image: rainskillsImageUrl,
      inLanguage: 'zh-CN',
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
          name: 'RainSkills 安装与使用',
          item: rainskillsUrl,
        },
      ],
    },
  ],
};

<Head>
  <link rel="canonical" href={rainskillsUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="RainSkills 安装与使用：支持的 Agent、运行环境与部署流程 | Rainbond" />
  <meta property="og:description" content="在 Codex、Claude Code 等 AI Agent 中安装 RainSkills，连接 Rainbond，并部署、排障和验证应用。" />
  <meta property="og:url" content={rainskillsUrl} />
  <meta property="og:image" content={rainskillsImageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">
    {JSON.stringify(rainskillsJsonLd)}
  </script>
</Head>

# RainSkills 安装与使用

RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Codex、Claude Code 等 AI 编码工具中。它从当前项目出发，通过受保护的本地运行时连接 Rainbond，完成应用部署、运行排障、交付验证和版本管理。

安装 RainSkills 与连接应用运行环境是两个阶段。安装完成后可以直接提出部署任务；第一次需要 Rainbond 时，Agent 再引导你选择 Cloud、已有私有环境、本机或服务器。

<VideoDocCallout
  title="RainSkills 安装与连接视频教程"
  description="按照视频中的步骤完成 RainSkills 安装、运行环境选择、浏览器授权和连接验证。"
  href="/videos/rainskills-ai-deploy"
  cover="/img/video/rainskills-ai-deploy-cover.jpg"
  coverAlt="RainSkills 安装与连接视频封面"
/>

## 支持的 Agent 和系统

RainSkills 当前支持以下 AI Agent：

- Codex。
- Claude Code。
- Pi Agent。
- DeepSeek Harness。
- WorkBuddy。
- Hermes Agent。

安装器支持 macOS、Linux 和 Windows。原生 Windows 使用本地 Node.js 入口；macOS、Linux 和 WSL 使用相同的 Skill 集合与本地运行时。不同 Agent 在安装目录和会话刷新方式上可能存在差异，安装器会自动选择匹配入口。

## 安装 RainSkills

在受支持的 Agent 中发送：

```text
帮我安装 RainSkills。
```

也可以直接运行官方安装器：

```bash
npx --yes rainskills
```

`npx` 安装方式需要 Node.js 18 或更高版本。建议使用仍在维护的 Node.js 22 或 24。

安装器会识别当前 Agent，并安装完整的独立 Skill 集合和受保护的本地运行组件。安装阶段不会选择 Rainbond、打开浏览器授权或创建应用。

## 安装后的第一条任务

安装完成后，可以直接在项目目录告诉 Agent：

```text
帮我部署当前项目，并验证页面和 API。
```

RainSkills 会先分析项目结构、组件、构建命令、端口和依赖。任务第一次需要 Rainbond 时，Agent 才会进入运行环境选择。

你也可以先要求分析，不立即部署：

```text
分析当前项目应该如何部署，列出组件、依赖、端口和存储，先不要创建资源。
```

## 连接应用运行环境

如果当前还没有可用的 Rainbond，Agent 会根据任务提供运行环境选项。你也可以单独发送：

```text
帮我连接应用运行环境。
```

RainSkills 可以连接或协助准备以下环境：

- Rainbond Cloud。
- 已经运行的私有 Rainbond。
- 本机 Rainbond。
- 独立服务器上的单节点或多节点 Rainbond。
- 已有 Kubernetes 集群中的 Rainbond。

选择 Cloud 或已有 Rainbond 后，按照浏览器页面完成账号授权。不需要在聊天中粘贴 Token、JWT、密码或私钥。浏览器显示授权成功后，继续等待原连接过程结束；只有 Agent 明确返回连接成功，当前运行环境才可使用。

RainSkills 只保存一个全局运行环境。更换环境会替换当前连接，新的授权和可用性验证成功后才会覆盖原有凭据。

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

RainSkills 会结合当前项目文件、项目与 Rainbond 的绑定信息、Rainbond 返回的真实平台状态，以及用户在关键节点的确认继续工作。

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

| 对比项 | RainSkills | RainAgent |
| --- | --- | --- |
| 使用位置 | Codex、Claude Code 等本地 AI 编码工具 | Rainbond 控制台 |
| 工作起点 | 当前项目、仓库和本地绑定信息 | 当前企业、团队、应用和组件 |
| 主要场景 | 项目接入、部署、排障、交付验证和版本操作 | 平台内查询、排障、运维和授权执行 |
| 关系 | 从本地开发流程连接 Rainbond | 从 Rainbond 页面上下文操作平台 |

开发者可以用 RainSkills 从本地项目发起部署，再用 RainAgent 在控制台中结合页面上下文继续查看和运维。

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

## 更新、重新连接与故障处理

### 更新或修复 RainSkills

可以让当前 Agent 重新运行安装流程：

```text
帮我更新 RainSkills。
```

也可以直接运行最新安装器：

```bash
npx --yes rainskills@latest
```

安装器会比较并更新已经安装的独立 Skills。Hermes Agent 的已打开会话可能需要执行 `/reset` 或新建会话，让 Skill 目录重新加载。

### 重新连接 Rainbond

如果运行环境返回 401、403、`unauthorized` 或 `token expired`，发送：

```text
帮我重新连接 Rainbond。
```

RainSkills 会重新进入浏览器授权。继续等待原连接过程结束，不要在浏览器显示成功后重复发起连接。

## 安全、权限和数据边界

- RainSkills 优先读取当前项目下的 `rainbond.app.json` 和 `.rainbond/local.json`，不会扫描其他仓库猜测绑定关系。
- `.rainbond/env.preview.json` 和 `.rainbond/env.prod.json` 只保存非敏感环境覆盖，不应写入密码、Token、证书或私钥。
- Rainbond 授权凭据保存在受保护的本地状态中，不写入项目文件。
- 删除应用、删除组件、修改业务代码和平台安装等高风险动作需要明确确认。
- 用户没有明确选择运行环境时，Agent 不应替用户采用默认项。
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

## 微信交流 {#wechat-support}

<RainSkillsWechatSupport module="rainskills_docs" />

## 相关内容

- [AI 生成代码如何部署到自己的服务器](/rainskills)
- [RainSkills 安装与连接视频](/videos/rainskills-ai-deploy)
- [RainAgent：控制台 AI 助手](/docs/ai/rainagent)
- [Rainbond 快速安装](/docs/quick-start/quick-install)
- [RainSkills GitHub 源码](https://github.com/goodrain/rainskills)
