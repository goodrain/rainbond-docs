import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import CompareHeroGraphic from '@site/src/components/Compare/CompareHeroGraphic';
import RainSkillsWechatSupport from '@site/src/components/RainSkillsWechatSupport';
import styles from './rainskills-deployment.module.css';

const pageTitle = 'AI 生成代码如何部署到自己的服务器 | RainSkills';
const pageHeading = 'AI 生成代码如何部署到自己的服务器';
const pageDescription =
  'RainSkills 让 Codex、Claude Code 等 AI Agent 读取当前项目，通过 Rainbond 部署到自己的服务器或 Kubernetes，继续排查构建与运行问题，并验证页面和 API。';
const canonicalUrl = 'https://www.rainbond.com/rainskills';
const keywords =
  'AI 生成代码怎么部署,AI 项目上线,部署到自己的服务器,RainSkills,Claude Code 部署应用,Codex 部署应用,AI Agent 部署,开源部署 Skill';

const supportedAgents = ['Claude Code', 'Codex', 'Pi Agent', 'DeepSeek Harness', 'WorkBuddy', 'Hermes Agent'];

const guideCards = [
  {
    title: 'Claude Code 部署应用',
    description: '从当前项目发起部署与验证。',
    href: '/rainskills/claude-code-deploy-app',
  },
  {
    title: 'Codex 部署应用',
    description: '写完代码，继续部署和更新应用。',
    href: '/rainskills/codex-deploy-app',
  },
  {
    title: 'AI 项目部署失败排查',
    description: '定位构建、运行与访问问题。',
    href: '/rainskills/ai-deployment-troubleshooting',
  },
  {
    title: 'Vibe Coding 项目如何上线',
    description: '从本地原型走向可维护的生产应用。',
    href: '/rainskills/vibe-coding-go-live',
  },
];

const workflowSteps = [
  {
    title: '读取当前项目',
    description: '识别语言、框架、组件、端口、依赖和已有部署配置。',
  },
  {
    title: '选择交付目标',
    description: '连接已有 Rainbond，或明确选择自己的服务器与 Kubernetes 环境。',
  },
  {
    title: '生成应用拓扑',
    description: '把前端、后端、数据库、缓存和存储组织成可管理的应用。',
  },
  {
    title: '部署并持续排错',
    description: '读取构建日志、运行日志、Pod 状态和事件，定位阻塞原因。',
  },
  {
    title: '验证最终交付',
    description: '检查组件与访问路径，给出可访问地址和明确的交付结论。',
  },
];

const capabilities = [
  {title: '部署', description: '识别源码、镜像与组件依赖，组织应用拓扑。'},
  {title: '排错', description: '读取构建、运行日志与平台事件，定位失败原因。'},
  {title: '验证', description: '检查页面与 API，返回访问地址和交付结论。'},
  {title: '运维', description: '在同一应用上继续升级、快照、发布与回滚。'},
];

const comparisonRows = [
  ['工作起点', '服务器地址、SSH 和临时命令', '当前项目与明确的应用上下文'],
  ['应用结构', '人工拼装进程、数据库与网络', '用应用拓扑表达组件和依赖关系'],
  ['失败排查', '在多处日志之间手动切换', 'Agent 读取构建、运行、Pod 和事件状态'],
  ['完成标准', '命令退出码为 0 或进程已启动', '页面/API 可访问并输出交付结论'],
  ['后续维护', '继续维护脚本与服务器差异', '基于同一平台完成升级、快照和回滚'],
  ['安全边界', 'Agent 直接拥有服务器操作能力', '通过受控工具调用、平台权限和关键操作确认执行'],
];

const faqs = [
  {
    question: 'AI 生成的代码怎么部署到自己的服务器？',
    answer: '先安装 RainSkills，再在 Claude Code 或 Codex 中要求部署当前项目。Agent 会结合项目结构处理组件、依赖与配置，首次需要时引导选择 Rainbond 运行环境，然后触发构建、检查日志并验证访问地址；数据库、域名和模型接口等配置仍需按实际环境提供。',
  },
  {
    question: 'RainSkills 是什么？',
    answer: 'RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Claude Code、Codex 等 AI 编码工具中，通过受保护的本地运行时连接 Rainbond，完成项目接入、应用部署、运行排错、交付验证和版本管理。',
  },
  {
    question: 'Claude Code 可以直接把应用部署到自己的服务器吗？',
    answer: '可以。RainSkills 让 Claude Code 从当前项目发起部署，并通过 Rainbond 把应用运行在自己的服务器或 Kubernetes 上。Rainbond 负责构建、网络、存储、访问和后续运维，Claude Code 继续负责理解项目、推进任务和处理异常。',
  },
  {
    question: 'Codex deployment skill 能处理全栈项目吗？',
    answer: '可以处理包含前端、后端、数据库和缓存的全栈项目。RainSkills 会先识别组件边界和依赖关系，再创建或复用 Rainbond 应用拓扑，最后检查每个组件与访问路径是否正常。',
  },
  {
    question: 'RainSkills 会自动修改业务代码吗？',
    answer: '不会默认修改业务代码。问题定位到源码或构建脚本后，RainSkills 会说明原因和下一步；涉及代码修改、删除资源、安装平台等高风险操作时，需要用户明确确认。',
  },
  {
    question: '使用 RainSkills 必须先会 Kubernetes 吗？',
    answer: '不需要先掌握 Kubernetes YAML。用户以应用和交付目标描述任务，RainSkills 与 Rainbond 负责把组件、依赖、网络、存储和运行状态组织起来；需要深入排查时仍可查看底层 Kubernetes 状态。',
  },
  {
    question: 'RainSkills 是免费开源的吗？',
    answer: 'RainSkills 是开源部署 Skill，可以在 GitHub 查看源码，并通过 npm 安装器接入支持的 AI Agent。实际运行环境可以选择 Rainbond Cloud 或部署在自己的服务器与 Kubernetes 集群中。',
  },
];

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RainSkills',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Linux, Windows',
  description: pageDescription,
  url: canonicalUrl,
  isAccessibleForFree: true,
  creator: {
    '@type': 'Organization',
    name: 'Rainbond',
    url: 'https://www.rainbond.com',
  },
  sameAs: ['https://github.com/goodrain/rainskills', 'https://www.npmjs.com/package/rainskills'],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
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
      name: 'AI 生成代码部署',
      item: canonicalUrl,
    },
  ],
};

export default function RainSkillsDeployment(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.rainbond.com/img/video/rainskills-ai-deploy-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(softwareJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Head>

      <header className={styles.intro}>
        <CompareHeroGraphic
          title={pageHeading}
          subtitle="让 AI Agent 带着当前项目上下文，通过 Rainbond 完成部署、排错、验证与持续运维。"
          primaryCta={{label: '开始使用 RainSkills', href: '/docs/ai/rainskills'}}
          secondaryCta={{label: '查看 GitHub 源码', href: 'https://github.com/goodrain/rainskills'}}
        />
        <div className={styles.agentSupport} aria-label="支持的 AI Agent">
          <span>支持</span>
          {supportedAgents.map((name) => <span className={styles.agentTag} key={name}>{name}</span>)}
        </div>
      </header>

      <section className={styles.sectionBlock} aria-labelledby="deployment-overview">
        <div className={styles.sectionHead}>
          <h2 id="deployment-overview">从当前项目到可访问的应用</h2>
          <p>受保护的本地运行时连接 Rainbond，让应用运行在 Cloud、自己的服务器或 Kubernetes 中。</p>
        </div>
        <div className={styles.overviewGrid}>
          <ul className={styles.capabilityList}>
            {capabilities.map((item, index) => (
              <li key={item.title}>
                <span className={styles.capabilityNo} aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <figure className={styles.deployScreenshot}>
            <a href="https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png"
                alt="RainSkills 在 AI Agent 中完成应用部署并返回访问地址"
                width={1720}
                height={1194}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>实际部署结果 · 点击查看原图</figcaption>
          </figure>
        </div>

        <div className={styles.detailList}>
          <details className={styles.disclosure}>
            <summary>查看完整交付流程</summary>
            <ol className={styles.workflow} aria-label="RainSkills 应用交付流程">
              {workflowSteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </details>
          <details className={styles.disclosure}>
            <summary>为什么不直接让 Agent SSH 到服务器？</summary>
            <p className={styles.detailIntro}>RainSkills 用应用拓扑管理组件与依赖，并持续验证运行状态、访问结果和后续版本。</p>
            <div className={styles.tablePanel} role="region" aria-label="部署方式对比" tabIndex={0}>
              <table>
                <caption className={styles.srOnly}>Agent 直接操作服务器与 RainSkills + Rainbond 的交付能力对比</caption>
                <thead>
                  <tr>
                    <th scope="col">对比维度</th>
                    <th scope="col">Agent 直接操作服务器</th>
                    <th scope="col">RainSkills + Rainbond</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([label, direct, rainskills]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{direct}</td>
                      <td>{rainskills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-labelledby="deployment-guides">
        <div className={styles.sectionHead}>
          <h2 id="deployment-guides">按你的工具和问题继续阅读</h2>
        </div>
        <div className={styles.guideGrid}>
          {guideCards.map((guide) => (
            <Link className={styles.guideCard} to={guide.href} key={guide.href}>
              <div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.helpGrid}>
        <section aria-labelledby="rainskills-faq">
          <div className={styles.sectionHead}>
            <h2 id="rainskills-faq">常见问题</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <aside className={styles.helpPanel} aria-labelledby="get-started">
          <h2 id="get-started">开始使用 RainSkills</h2>
          <p>安装到你正在使用的 AI Agent，再告诉它：</p>
          <blockquote>帮我部署当前项目，并验证页面和 API。</blockquote>
          <div className={styles.helpLinks}>
            <Link to="/docs/ai/rainskills">安装与使用文档 ↗</Link>
            <Link to="/videos/rainskills-ai-deploy">观看安装视频 ↗</Link>
            <Link to="/install-hub">准备 Rainbond 运行环境 ↗</Link>
          </div>
          <div className={styles.wechatSupport}>
            <h3 id="wechat-support">微信交流</h3>
            <RainSkillsWechatSupport module="rainskills_topic" compact />
          </div>
        </aside>
      </div>
    </>
  );
}
