import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import CompareHeroGraphic from '@site/src/components/Compare/CompareHeroGraphic';
import TopicActionGrid from '@site/src/components/OfflineAndXinchuang/TopicActionGrid';
import styles from './rainskills-deployment.module.css';

const pageTitle = 'RainSkills：用 Claude Code、Codex 部署应用到自己的服务器';
const pageDescription =
  'AI 生成的代码如何上线？RainSkills 让 Claude Code、Codex 从当前项目出发，通过 Rainbond 部署到自己的服务器或 Kubernetes，继续排查部署失败并验证访问结果。';
const canonicalUrl = 'https://www.rainbond.com/rainskills';
const keywords =
  'AI 生成代码怎么部署,AI 项目上线,部署到自己的服务器,RainSkills,Claude Code部署应用,Claude Code部署到服务器,Claude Code deployment skill,Claude Code部署Skill,Codex部署项目,Codex deployment skill,Codex部署到自己的服务器,AI Agent运维Skill,开源部署Skill';

const problemCards = [
  {
    no: '01',
    title: '代码写完，部署上下文却断了',
    description: 'AI 已经理解项目结构，但传统上线流程还要重新整理端口、依赖、数据库、环境变量和启动方式。',
  },
  {
    no: '02',
    title: '脚本执行成功，不等于应用可访问',
    description: '进程启动之后，还要确认网关、域名、证书、存储、健康检查和前后端接口是否真正正常。',
  },
  {
    no: '03',
    title: '失败后，日志散落在不同位置',
    description: '构建日志、运行日志、Pod 状态和平台事件彼此分散，Agent 很难判断下一步应该改配置还是改代码。',
  },
  {
    no: '04',
    title: '一次上线之后，还要持续运维',
    description: '应用需要升级、扩缩容、备份、回滚和再次交付，临时 SSH 命令无法沉淀成长期可复用的能力。',
  },
];

const agents = [
  {
    name: 'Claude Code',
    logo: '/img/agents/claude-code.svg',
    description: '从当前代码目录发起部署、排错和交付验证。',
  },
  {
    name: 'Codex',
    logo: '/img/agents/codex.svg',
    description: '在编码任务完成后继续把项目交付到运行环境。',
  },
  {
    name: '更多 AI Agent',
    logo: '/img/agents/harness.svg',
    description: '通过开放的 Agent Skills 与 MCP 接口接入同一套流程。',
  },
];

const guideCards = [
  {
    title: 'Claude Code部署应用',
    description: '从当前项目开始，让 Claude Code 完成部署、排错和访问验证。',
    href: '/rainskills/claude-code-deploy-app',
  },
  {
    title: 'Codex部署应用',
    description: '让 Codex 在写完代码后继续更新应用并给出交付结果。',
    href: '/rainskills/codex-deploy-app',
  },
  {
    title: 'AI项目部署失败自动排查',
    description: '根据你看到的失败现象，逐层检查构建、运行、依赖和访问。',
    href: '/rainskills/ai-deployment-troubleshooting',
  },
  {
    title: 'Vibe Coding项目如何上线',
    description: '把本地原型推进到有域名、数据持久化、验证和回滚的生产应用。',
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

const capabilityCards = [
  {
    title: '部署当前项目',
    description: '识别源码、镜像或软件包，创建应用与组件，并补齐端口、依赖、连接变量和必要存储。',
    points: ['单组件与全栈项目', '源码、镜像、Compose 与应用模板', '服务器与 Kubernetes 环境'],
  },
  {
    title: '部署失败自动排查',
    description: '让 Agent 基于真实平台状态继续工作，而不是只根据一段终端输出猜测失败原因。',
    points: ['构建与运行日志', 'Pod 诊断与平台事件', '配置问题与代码问题分界'],
  },
  {
    title: '交付结果验证',
    description: '不把“资源已创建”当作完成，继续验证页面、API、组件状态、存储和最终访问入口。',
    points: ['页面与 API 路径', '组件、Pod 和事件收敛', '访问地址与交付结论'],
  },
  {
    title: '持续运维与版本管理',
    description: '在同一套应用模型上继续升级、快照、发布与回滚，让一次部署变成可持续维护的资产。',
    points: ['应用快照与版本', '发布成应用模版', '受控回滚与风险确认'],
  },
];

const comparisonRows = [
  ['工作起点', '服务器地址、SSH 和临时命令', '当前项目与明确的应用上下文'],
  ['应用结构', '人工拼装进程、数据库与网络', '用应用拓扑表达组件和依赖关系'],
  ['失败排查', '在多处日志之间手动切换', 'Agent 读取构建、运行、Pod 和事件状态'],
  ['完成标准', '命令退出码为 0 或进程已启动', '页面/API 可访问并输出交付结论'],
  ['后续维护', '继续维护脚本与服务器差异', '基于同一平台完成升级、快照和回滚'],
  ['安全边界', 'Agent 直接拥有服务器操作能力', '通过 MCP、平台权限和关键操作确认执行'],
];

const faqs = [
  {
    question: 'AI 生成的代码怎么部署到自己的服务器？',
    answer: '先确认项目可以运行，准备 Rainbond 环境并连接 RainSkills，然后在 Claude Code 或 Codex 中要求部署当前项目。Agent 会结合项目结构处理组件、依赖与配置，触发构建和部署，再检查日志与访问地址；数据库、域名和模型接口等配置仍需按实际环境提供。',
  },
  {
    question: 'RainSkills 是什么？',
    answer: 'RainSkills 是 Rainbond 官方开源 Agent Skills，安装在 Claude Code、Codex 等 AI 编码工具中，通过 Rainbond MCP 完成项目接入、应用部署、运行排错、交付验证和版本管理。',
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
      name: 'RainSkills：AI Agent 部署应用',
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

      <CompareHeroGraphic
        title={pageTitle}
        subtitle="把 RainSkills 安装到 Claude Code、Codex 等 AI Agent 中，让 AI 从当前项目继续完成部署、排错、验证和后续运维。"
        decision="AI Agent 不只负责生成代码。借助 RainSkills 与 Rainbond，它还能理解应用拓扑、读取真实运行状态，并把项目稳定交付到你自己的服务器或 Kubernetes。"
        primaryCta={{label: '开始使用 RainSkills', href: '/docs/ai/rainskills'}}
        secondaryCta={{label: '查看 GitHub 源码', href: 'https://github.com/goodrain/rainskills'}}
      />

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>AI 写完代码后，部署不该重新从零开始</h2>
          <p>传统部署会在代码完成的那一刻丢失上下文。RainSkills 让同一个 Agent 带着对项目的理解继续进入运行环境。</p>
        </div>
        <div className={styles.problemGrid}>
          {problemCards.map((item) => (
            <article className={styles.problemCard} key={item.no}>
              <span className={styles.cardNo}>{item.no}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>从当前项目到自己的服务器，一条对话完成交付闭环</h2>
          <p>RainSkills 负责选择正确的 Agent 工作流，Rainbond MCP 提供受控的平台操作，Rainbond 负责应用持续运行。</p>
        </div>
        <ol className={styles.workflow} aria-label="RainSkills 应用交付流程">
          {workflowSteps.map((step, index) => (
            <li className={styles.workflowStep} key={step.title}>
              <span className={styles.workflowNo}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <figure className={styles.deployScreenshot}>
          <img
            src="https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png"
            alt="RainSkills 在 AI Agent 中完成应用部署并返回访问地址"
            width={1720}
            height={1194}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>Claude Code、Codex 都能使用同一套部署能力</h2>
          <p>能力沉淀在开源 Skill 与标准化工具接口中，不依赖某一次对话，也不把项目锁定在单一 AI Agent。</p>
        </div>
        <div className={styles.agentGrid}>
          {agents.map((item) => (
            <article className={styles.agentCard} key={item.name}>
              <img src={item.logo} alt={`${item.name} 标志`} width={52} height={52} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>按你的工具和问题继续阅读</h2>
          <p>选择你正在使用的 AI Agent，或者直接从当前遇到的部署问题开始。</p>
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

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>部署、排错、验证，不止是执行一段脚本</h2>
          <p>RainSkills 把一次部署拆成可观察、可判断、可恢复的步骤，让 Agent 知道什么时候继续，什么时候停止并请求确认。</p>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilityCards.map((item) => (
            <article className={styles.capabilityCard} key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>为什么不直接让 Agent SSH 到服务器？</h2>
          <p>SSH 能执行命令，但稳定交付还需要应用模型、状态判断、权限边界和长期运维能力。</p>
        </div>
        <div className={styles.tablePanel}>
          <table>
            <thead>
              <tr>
                <th>对比维度</th>
                <th>Agent 直接操作服务器</th>
                <th>RainSkills + Rainbond</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, direct, rainskills]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{direct}</td>
                  <td>{rainskills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>常见问题</h2>
          <p>关于 Claude Code 部署应用、Codex 部署项目、服务器环境和安全边界的常见问题。</p>
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

      <TopicActionGrid
        title="开始使用 RainSkills"
        description="选择最适合你的下一步：安装 Skill、观看完整流程，或者直接查看开源代码。"
        items={[
          {
            label: '安装 RainSkills',
            note: '查看安装方式、支持的 Agent 和连接 Rainbond 的完整说明。',
            href: '/docs/ai/rainskills',
          },
          {
            label: '安装 Rainbond',
            note: '准备自己的应用运行平台和目标服务器环境。',
            href: '/install-hub',
          },
        ]}
      />
    </>
  );
}
