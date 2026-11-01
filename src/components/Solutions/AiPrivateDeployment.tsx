import React from 'react';
import Head from '@docusaurus/Head';
import CompareEvidenceCards from '@site/src/components/Compare/CompareEvidenceCards';
import CompareHeroGraphic from '@site/src/components/Compare/CompareHeroGraphic';
import TopicActionGrid from '@site/src/components/OfflineAndXinchuang/TopicActionGrid';
import styles from './ai-private-deployment.module.css';

const pageTitle = 'AI 应用与大模型私有化部署解决方案 | Rainbond';
const pageDescription =
  '安装并启用 Rainbond AI 大模型插件后，可以准备模型、创建 CPU 或 GPU 推理实例、开放 OpenAI 兼容 API，并将 Dify 等 AI 应用部署到私有环境。';
const canonicalUrl = 'https://www.rainbond.com/solutions/ai-private-deployment';
const aiDocsUrl = 'https://rainbond.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg';

const capabilityRows = [
  ['启用前提', '安装并启用 AI 大模型插件；GPU 管理需要相应插件、驱动和指标采集', '先确认企业授权、插件版本和集群环境是否满足要求'],
  ['大模型服务层', '模型部署、模型实例、推理服务、CPU/GPU 配置、vLLM 参数', '把模型文件部署成可访问的在线推理服务'],
  ['API 接入层', 'API 密钥、OpenAI 兼容 base URL、curl / Python SDK 示例', '让业务系统和 AI 应用安全调用私有模型'],
  ['AI 网关边界', '模型地址、模型名称、API 密钥和 OpenAI 兼容调用', '当前证据支持模型 API 接入，不等同于完整的多厂商路由、配额和计费网关'],
  ['AI 应用层', '应用市场、镜像或 Compose 部署、升级、应用拓扑', '部署 Dify 等 AI 应用，并连接已运行的模型服务'],
  ['运维监控层', '服务概览、实例状态、日志、调用记录、GPU 指标', '判断模型服务是否健康、资源是否足够'],
  ['AI 辅助层', 'RainAgent、RainSkills、受控工具调用、审批确认', '可用范围取决于版本授权、账号权限和部署环境'],
  ['企业交付层', '多团队、多租户、应用市场、离线导入导出、版本管理', '支撑企业内网、客户现场和长期交付'],
];

const fitRows = [
  ['要把 Dify、知识库、RAG、模型 API 带进企业内网', '只想临时调用公有云模型 API 做原型'],
  ['有私有化、离线、客户现场或长期交付要求', '没有自有资源，也不准备维护任何运行环境'],
  ['需要统一管理模型服务、AI 应用、数据库和业务系统', '只在个人电脑上试跑单个模型'],
  ['想通过应用市场复用 AI 应用交付资产', '不关心升级、备份、排障和多环境复制'],
  ['希望用 AI 辅助部署、排错、运维和验收', '只需要纯模型训练平台，不需要应用交付'],
];

const comparisonRows = [
  ['上手方式', '需要写 YAML、处理镜像、服务、存储和网关', '云上体验快，但依赖云服务和账号体系', '以应用为中心，减少底层 K8s 暴露'],
  ['私有化', '可做，但实施成本高', '通常不适合强内网和离线场景', '适合私有化、内网和客户现场交付'],
  ['AI 应用部署', '需要自己组合模型、应用、数据库和网关', '多偏平台内能力', '可通过应用市场安装和复用 AI 应用'],
  ['模型 API', '需要自行封装和鉴权', '平台提供，但通常绑定云生态', '提供 OpenAI 兼容接口和 API 密钥管理'],
  ['运维排障', '依赖 K8s/SRE 能力', '云平台可观测，但环境受限', '结合组件日志、事件、模型监控、RainAgent/RainSkills'],
  ['长期交付', '靠团队自建规范', '受云厂商交付边界影响', '可沉淀为应用市场、版本和可复制交付流程'],
];

const valueCards = [
  {
    title: '把模型跑成服务',
    description: '准备模型、配置 CPU/GPU 与推理参数，启动可访问、可管理、可调试的在线推理服务。',
  },
  {
    title: '用 OpenAI 兼容 API 接入应用',
    description: '创建 API Key，复制 base URL、模型名称和调用示例，让 Dify、业务系统和 AI 助手安全调用。',
  },
  {
    title: '让部署、监控、排障可持续',
    description: '在同一处查看模型监控、组件日志和 GPU 指标，并用 RainAgent 或 RainSkills 辅助排查。',
  },
];

const flowSteps = [
  {
    title: '模型部署',
    description: '准备模型文件，选择推理引擎、CPU/GPU、节点和启动参数。',
  },
  {
    title: 'API 接入',
    description: '生成 API Key，提供 OpenAI 兼容 base URL 和调用示例。',
  },
  {
    title: 'AI 应用',
    description: '通过应用市场安装 Dify 等应用，并连接私有模型服务。',
  },
  {
    title: '监控运维',
    description: '观察服务状态、请求失败、响应时间和 GPU 使用情况。',
  },
  {
    title: 'AI 辅助',
    description: '用 RainAgent / RainSkills 辅助部署、排障、升级和验收。',
  },
];

const capabilityCards = [
  {
    title: '大模型服务',
    summary: '管理模型来源、推理参数、实例状态和运行日志。',
    points: ['内置模型、ModelScope、HTTP、上传文件和本地路径', 'CPU/GPU 模式、节点、环境变量与 vLLM 参数', '实例状态、运行详情、日志和在线调试'],
  },
  {
    title: 'OpenAI 兼容 API',
    summary: '模型实例运行后，直接开放给 Dify、业务系统和 AI 助手调用。',
    points: ['创建、复制和吊销 API Key', '提供 base URL、curl 和 Python SDK 示例', '外部应用按模型名称和有效密钥调用'],
  },
  {
    title: 'AI 应用市场',
    summary: '从应用市场安装 Dify 等已上架模板，也可以用镜像或 Compose 部署其他 AI 应用。',
    points: ['从应用市场安装已上架的 AI 应用模板', '用应用拓扑连接模型、数据库和业务系统', '把验证过的交付结果发布为应用模板'],
  },
  {
    title: 'AI 辅助运维',
    summary: 'RainAgent 和 RainSkills 可以参与部署、日志分析和交付检查。',
    points: ['RainAgent 在控制台中结合页面上下文操作', 'RainSkills 在本地 AI 编码工具中识别项目并部署', '变更类操作通过审批确认降低风险'],
  },
];

const screenshots = [
  {
    src: '/img/video/rainbond-llm-install-use-step-4.png',
    alt: 'Rainbond 中创建大模型实例并配置推理参数的界面',
    caption: '创建模型实例',
  },
  {
    src: '/img/video/rainbond-llm-install-use-step-6.png',
    alt: 'Rainbond 大模型 API 密钥和 OpenAI 兼容调用示例界面',
    caption: 'API 密钥与 OpenAI 兼容调用示例',
  },
  {
    src: '/img/video/rainbond-llm-install-use-step-7.png',
    alt: 'Rainbond 大模型监控页面展示 GPU 和服务指标',
    caption: '模型服务与 GPU 监控',
  },
  {
    src: '/img/video/rainagent-step-6.png',
    alt: 'RainAgent 在 Rainbond 控制台中给出部署计划的对话界面',
    caption: 'RainAgent 控制台部署与确认',
  },
];

const landingSteps = [
  '准备 Rainbond 环境',
  '启用 AI 大模型能力',
  '部署模型实例',
  '开放 OpenAI 兼容 API',
  '部署 AI 应用并连接模型',
  '持续排障、监控和升级',
];

const painPoints = [
  '模型文件从哪里来，如何在内网环境准备和更新？',
  '推理服务如何选择 CPU / GPU、节点和启动参数？',
  'AI 应用如何稳定访问模型服务，而不是依赖个人机器或临时脚本？',
  'API 密钥如何创建、复制、吊销和审计？',
  'GPU、请求量、失败数和响应时间如何持续观察？',
  '部署失败、访问异常、资源不足时谁来排查？',
  '客户现场、内网、离线或信创环境如何复制同一套交付方式？',
];

const operationCards = [
  {
    title: '模型部署',
    description:
      '支持从内置模型、ModelScope、HTTP 地址、上传文件和本地路径等方式准备模型。部署时可以选择推理引擎、CPU 或 GPU 模式、GPU 型号与数量、目标节点和环境变量。',
  },
  {
    title: '推理参数',
    description:
      '对于 vLLM 文本模型，可以配置量化方式、显存利用率、最大上下文长度和额外启动参数，避免模型服务只停留在“能跑起来”的阶段。',
  },
  {
    title: '模型管理和监控',
    description:
      '可以查看实例状态、启动或停止实例、删除实例、查看运行详情和日志，并持续观察请求数、失败数、平均响应时间、GPU 总览和实例占用关系。',
  },
  {
    title: 'AI 应用市场',
    description:
      '企业 AI 通常还需要知识库、RAG、工作流、聊天界面和内部系统。应用市场中已有的模板可以直接安装；没有模板时仍需使用镜像、Compose 或源码部署。',
  },
  {
    title: 'RainAgent',
    description:
      'RainAgent 运行在 Rainbond 控制台内，可以结合页面上下文查询、排障和执行受控变更。开源版默认仅首个注册的企业管理员可用；企业版仍受当前用户权限控制。',
  },
  {
    title: 'RainSkills',
    description:
      'RainSkills 安装在 Codex、Claude Code 等本地 AI 编码工具里，可以从本地项目发起 Rainbond 接入、部署、排错和交付验证。实际可用操作受平台版本、账号和目标资源权限限制。',
  },
];

const faqs = [
  {
    question: '安装 Rainbond 后会默认出现模型和 GPU 管理吗？',
    answer:
      '不会。模型仓库、模型实例、API 密钥和模型监控来自 AI 大模型插件；GPU 资源池、配额和组件 GPU 配置依赖 GPU 插件及集群中的驱动、Device Plugin 和指标采集。部署前要核对插件与平台版本。',
  },
  {
    question: 'AI 应用怎样统一配置模型地址和密钥？',
    answer:
      '可以在 Rainbond 的模型服务中创建 API 密钥，并使用 OpenAI 兼容 base URL 和模型名称接入 Dify 或业务系统。这里可承接基础 AI 网关接入需求，但当前公开证据不支持把它描述为完整的多模型厂商路由、配额和计费网关。',
  },
  {
    question: 'AI 运维与自动化排错能做到什么？',
    answer:
      'RainAgent 和 RainSkills 可以辅助读取应用状态、事件与日志，给出部署或排障步骤，并在受控流程中执行操作。它们属于 AI 辅助运维，不代表无人值守的全自动 AIOps。',
  },
  {
    question: '企业如何私有化部署 AI 应用？',
    answer:
      '企业私有化部署 AI 应用，需要同时准备模型服务、AI 应用、数据库、访问入口、API 密钥、资源监控和升级机制。Rainbond 可以把这些对象按应用拓扑统一管理，并通过应用市场、模型 API 和 AI 助手能力降低部署和运维复杂度。',
  },
  {
    question: '私有化环境能部署哪些大模型？',
    answer:
      '具体模型清单以 AI 大模型插件中的模型仓库为准。插件也支持 ModelScope、HTTP 地址、上传文件和本地路径等准备方式。模型能否运行取决于格式、推理引擎、CPU/GPU 资源和平台环境。',
  },
  {
    question: '私有模型能提供 OpenAI 兼容接口吗？',
    answer:
      '支持。模型实例运行后，Rainbond 可以提供 OpenAI 兼容接入示例，包括 base URL、curl 示例和 Python OpenAI SDK 示例。外部应用调用时需要使用有效 API 密钥，并指定正在运行的模型名称。',
  },
  {
    question: 'Dify 能否接入 Rainbond 上部署的私有模型？',
    answer:
      '可以按 OpenAI 兼容方式接入。通常先在 Rainbond 中部署模型服务并创建 API 密钥，再在 Dify 的模型供应商配置中填写模型服务地址、模型名称和密钥。如果 Dify 与模型服务部署在同一 Rainbond 集群内，也可以优先使用内网访问地址。',
  },
  {
    question: '控制台 AI 助手和本地 Agent 部署工具有什么区别？',
    answer:
      'RainAgent 运行在 Rainbond 控制台内，适合在平台页面中通过自然语言部署、排障和运维应用。RainSkills 安装在 Codex、Claude Code 等本地 AI 编码工具里，适合从本地项目出发完成 Rainbond 接入、部署、排错和交付验证。',
  },
  {
    question: '私有化模型部署必须使用 GPU 吗？',
    answer:
      '不一定。部署时可以选择 CPU 或 GPU 模式。但对于较大规模文本模型，GPU 通常能显著提升推理性能。当前 GPU 资源识别和分配主要以 NVIDIA GPU 资源为主，实际规格应根据模型大小、上下文长度和并发要求评估。',
  },
  {
    question: 'AI 应用可以部署到离线或内网环境吗？',
    answer:
      'Rainbond 适合需要私有化、内网、离线交付和客户现场部署的团队。模型下载、上传和部署仍依赖具体环境中的网络、共享存储、GPU 资源和镜像准备情况；完全离线环境需要提前准备镜像、模型文件和安装包。',
  },
  {
    question: '模型部署失败时应该怎么排查？',
    answer:
      '可以先查看模型实例运行详情、日志、组件状态、事件和资源使用情况，判断问题来自模型加载、启动参数、资源不足、网络访问还是服务响应异常。RainAgent 和 RainSkills 也可以辅助读取日志、分析原因并给出下一步处理建议。',
  },
];

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

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI 应用与大模型私有化部署解决方案',
  description: pageDescription,
  url: canonicalUrl,
  dateModified: '2026-10-25',
  author: {
    '@type': 'Organization',
    name: 'Rainbond',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Rainbond',
  },
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
      name: 'AI 应用与大模型私有化部署解决方案',
      item: canonicalUrl,
    },
  ],
};

export default function AiPrivateDeployment(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="AI应用部署平台,Dify部署平台,n8n部署平台,AI应用私有化部署,AI大模型部署,AI网关,GPU管理,AI运维,AI OPS,AI开发部署,AI开发交付,OpenAI兼容接口,RainAgent,RainSkills"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.rainbond.com/img/video/rainbond-llm-install-use-step-4.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Head>

      <CompareHeroGraphic
        title="AI 应用与大模型私有化部署解决方案"
        subtitle="启用 AI 大模型插件后，在 Rainbond 中准备模型、创建推理实例、开放 OpenAI 兼容 API，并部署 Dify 等 AI 应用。"
        decision="模型服务和 GPU 管理依赖对应插件、驱动与指标采集。部署前需要核对企业授权、插件版本和集群资源。"
        primaryCta={{label: '获取 AI 私有化部署方案', href: aiDocsUrl}}
        secondaryCta={{label: '先快速安装 Rainbond', href: '/install-hub'}}
        audienceHint="适合已经进入企业内网、客户现场、离线交付或长期运维阶段，希望把 Dify、私有模型、业务系统和 GPU 资源统一管理的团队。"
      />
      <p className={styles.updated}>最近更新时间：2026-10-25</p>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>部署前先确认插件和运行环境</h2>
          <p>
            AI 大模型入口来自 Rainbond 插件。基础平台、AI 大模型插件、GPU 插件、驱动和指标采集组件的版本需要相互匹配；没有 GPU 时可以先用 CPU 模式验证轻量模型。
          </p>
        </div>
        <div className={styles.issueGrid}>
          {painPoints.map((point, index) => (
            <article className={styles.issueCard} key={point}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
        <p className={styles.sectionNote}>
          Rainbond 用应用、组件和模型实例管理 AI 应用与大模型服务。下面列出目前可以从产品界面和文档中核对的能力。
        </p>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>模型、应用、API 和监控如何配合</h2>
          <p>
            Rainbond 将模型服务、API 接入、AI 应用、监控运维和企业交付统一到应用管理体系中。
          </p>
        </div>
        <div className={styles.valueGrid}>
          {valueCards.map((item) => (
            <article className={styles.valueCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <ol className={styles.flow}>
          {flowSteps.map((step, index) => (
            <li className={styles.flowItem} key={step.title}>
              <span className={styles.flowNo}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.tablePanel}>
          <table>
            <thead>
              <tr>
                <th>层级</th>
                <th>Rainbond 能力</th>
                <th>解决的问题</th>
              </tr>
            </thead>
            <tbody>
              {capabilityRows.map(([layer, capability, result]) => (
                <tr key={layer}>
                  <td>{layer}</td>
                  <td>{capability}</td>
                  <td>{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>把模型部署成可管理、可调用、可监控的服务</h2>
          <p>
            Rainbond 大模型能力面向企业和团队的大模型私有化部署场景，支持在自己的集群和资源环境中准备模型、启动推理服务、开放 API 调用，并持续观察模型运行状态。
          </p>
        </div>
        <div className={styles.operationGrid}>
          {operationCards.slice(0, 3).map((item) => (
            <article className={styles.operationCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.screenshotGrid}>
          {screenshots.slice(0, 3).map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>通过应用市场安装 AI 应用</h2>
          <p>
            企业 AI 不是只有模型。真实业务通常还需要知识库、RAG、工作流、聊天界面、自动化工具和内部系统集成。Rainbond 应用市场可以把常用 AI 应用沉淀为可复用的软件资产。
          </p>
        </div>
        <div className={styles.operationGrid}>
          {capabilityCards.slice(1, 3).map((item) => (
            <article className={styles.operationCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className={styles.operationCard}>
            <h3>标准化交付给客户</h3>
            <p>把验证过的 AI 应用拓扑沉淀到应用市场，后续按环境复制、升级和维护，减少客户现场反复手工部署。</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>让 AI 不只生成代码，还能继续部署、排障和验证</h2>
          <p>
            RainAgent 运行在 Rainbond 控制台内；RainSkills 接入 Codex、Claude Code 等本地 AI 编码工具。两者都可以读取部署上下文，辅助处理部署、排障和交付检查。
          </p>
        </div>
        <div className={styles.operationGrid}>
          {operationCards.slice(4).map((item) => (
            <article className={styles.operationCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.screenshotGrid}>
          <figure>
            <img src={screenshots[3].src} alt={screenshots[3].alt} />
            <figcaption>{screenshots[3].caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>企业用 Rainbond 部署 AI 应用，通常走这 6 步</h2>
          <p>
            这 6 步覆盖环境准备、模型接入、应用部署和后续维护，也适用于内网和客户现场。
          </p>
        </div>
        <ol className={styles.timeline}>
          {landingSteps.map((step, index) => (
            <li key={step} className={styles.timelineItem}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>哪些团队适合用 Rainbond 部署 AI 应用</h2>
          <p>
            需要进入内网、客户现场或离线环境，并且要长期升级维护时，可以把 Rainbond 作为应用运行和交付平台。
          </p>
        </div>
        <div className={styles.fitGrid}>
          <article className={styles.fitCard}>
            <h3>更适合 Rainbond</h3>
            <ul>
              {fitRows.map(([good]) => (
                <li key={good}>{good}</li>
              ))}
            </ul>
          </article>
          <article className={styles.fitCard}>
            <h3>暂时不一定需要 Rainbond</h3>
            <ul>
              {fitRows.map(([, weak]) => (
                <li key={weak}>{weak}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>Rainbond 和手工 Kubernetes / 公有云 AI 平台有什么区别？</h2>
          <p>
            Rainbond 不替代模型训练平台。它主要管理私有环境中的模型服务、AI 应用及其运行依赖。
          </p>
        </div>
        <div className={styles.tablePanel}>
          <table>
            <thead>
              <tr>
                <th>维度</th>
                <th>手工 Kubernetes</th>
                <th>公有云 AI 平台</th>
                <th>Rainbond</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, k8s, cloud, rainbond]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{k8s}</td>
                  <td>{cloud}</td>
                  <td>{rainbond}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>按部署环境继续阅读</h2>
          <p>
            下面的文章分别讨论整套应用栈、企业内网、离线信创和 Cloud 迁移。
          </p>
        </div>
        <CompareEvidenceCards
          items={[
            {
              type: '产品文档',
              title: '大模型部署与推理服务管理',
              metric: '插件能力与边界',
              description: '核对模型来源、实例、API 密钥、OpenAI 兼容调用和监控条件。',
              href: '/docs/ai/rainbond-llm',
            },
            {
              type: '产品文档',
              title: 'GPU 管理插件',
              metric: '资源池 · 配额 · 组件配置',
              description: '核对 GPU 管理入口、指标来源和插件安装要求。',
              href: '/docs/plugins/gpu',
            },
            {
              type: '应用栈',
              title: 'AI应用栈私有化部署：AI应用部署到自己的服务器',
              metric: '前端 · API · 模型 · 数据',
              description: '把模型服务、AI 应用、数据库和业务系统作为一套应用部署到自己的环境。',
              href: '/solutions/ai-application-stack-private-deployment',
            },
            {
              type: '企业内网',
              title: '企业内网部署',
              metric: '网络 · 账号 · 内部访问',
              description: '企业AI应用私有化与AI应用内网部署，需要规划镜像、模型文件、内部域名、身份认证和跨网络访问。',
              href: '/solutions/enterprise-intranet-ai-deployment',
            },
            {
              type: '离线信创',
              title: '离线与信创部署',
              metric: '材料 · 架构 · 现场验收',
              description: 'AI应用离线部署和信创AI应用部署需要提前准备物料，并按具体硬件验证国产化AI应用平台边界。',
              href: '/solutions/offline-xinchuang-ai-deployment',
            },
            {
              type: '迁移',
              title: 'Cloud迁移到私有环境',
              metric: '盘点 · 迁移 · 切流 · 回滚',
              description: '识别云上托管依赖，按数据、模型、应用和流量顺序迁移到私有环境。',
              href: '/solutions/cloud-to-private-ai-migration',
            },
          ]}
        />
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>常见问题</h2>
          <p>
            围绕私有化部署、模型接入、GPU 资源、离线环境和排障方式，整理常见评估问题。
          </p>
        </div>
        <div className={styles.faqAccordion}>
          {faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>推荐继续看的内容</h2>
          <p>
            如果你正在评估落地路径，可以继续查看模型安装、RainAgent、RainSkills 和应用市场相关内容。
          </p>
        </div>
        <CompareEvidenceCards
          items={[
            {
              type: '安装',
              title: '大模型安装使用',
              metric: '视频教程',
              description: '查看模型仓库、模型实例、API 密钥和模型监控的完整操作路径。',
              href: '/videos/rainbond-llm-install-use',
            },
            {
              type: '场景',
              title: 'RainAgent 安装使用',
              metric: 'AI 运维助手',
              description: '了解控制台 AI 助手如何部署、排障和验证应用。',
              href: '/videos/rainagent-install-use',
            },
            {
              type: '场景',
              title: 'RainSkills 安装使用',
              metric: 'AI 编码工作流',
              description: '让 Codex、Claude Code 等 AI 编码工具调用 Rainbond 的部署与排障能力。',
              href: '/videos/rainskills-ai-deploy',
            },
            {
              type: '应用市场',
              title: '应用市场',
              metric: 'AI 应用组合',
              description: '通过应用市场安装 Dify 等 AI 应用，按实际上架应用为准。',
              href: '/marketplace',
            },
          ]}
        />
      </section>

      <TopicActionGrid
        title="继续验证 AI 私有化部署路径"
        description="如果你已经看清楚自己的阶段，下一步可以直接进入安装、视频教程、应用市场或选型对比。"
        items={[
          {
            label: '快速安装 Rainbond',
            note: '先准备平台环境，进入最短验证路径。',
            href: '/install-hub',
          },
          {
            label: '查看 RainAgent 文档',
            note: '了解控制台 AI 助手如何结合平台上下文工作。',
            href: '/docs/ai/rainagent',
          },
          {
            label: '查看 RainSkills 文档',
            note: '把本地 AI 编码工具接入 Rainbond 部署与验收链路。',
            href: '/docs/ai/rainskills',
          },
          {
            label: '进入选型中心',
            note: '继续比较 Rainbond 与其他平台在 AI 私有化和长期交付上的差异。',
            href: '/compare',
          },
        ]}
      />
    </>
  );
}
