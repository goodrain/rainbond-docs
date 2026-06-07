import React from 'react';
import Head from '@docusaurus/Head';
import CompareEvidenceCards from '@site/src/components/Compare/CompareEvidenceCards';
import CompareHeroGraphic from '@site/src/components/Compare/CompareHeroGraphic';
import TopicActionGrid from '@site/src/components/OfflineAndXinchuang/TopicActionGrid';
import styles from './ai-private-deployment.module.css';

const pageTitle = 'AI 应用与大模型私有化部署解决方案 | Rainbond';
const pageDescription =
  '在 Rainbond 上私有化部署 Qwen、DeepSeek、GLM 等大模型，开放 OpenAI 兼容 API，并通过应用市场部署 Dify 等 AI 应用。结合 RainAgent 和 RainSkills，让团队完成 AI 应用部署、排障、升级和运维。';
const canonicalUrl = 'https://www.rainbond.com/solutions/ai-private-deployment';
const aiDocsUrl = 'https://rainbond.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg';

const capabilityRows = [
  ['大模型服务层', '模型部署、模型实例、推理服务、CPU/GPU 配置、vLLM 参数', '把模型文件部署成可访问的在线推理服务'],
  ['API 接入层', 'API 密钥、OpenAI 兼容 base URL、curl / Python SDK 示例', '让业务系统和 AI 应用安全调用私有模型'],
  ['AI 应用层', '应用市场、一键安装、升级、复用、应用拓扑', '快速部署 Dify 等 AI 应用，并和模型服务连接'],
  ['运维监控层', '服务概览、实例状态、日志、调用记录、GPU 指标', '判断模型服务是否健康、资源是否足够'],
  ['AI 辅助层', 'RainAgent、RainSkills、MCP 工具、审批确认', '用自然语言完成部署、排障、配置检查和交付验证'],
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
    description: '把模型监控、组件日志、GPU 指标、RainAgent 和 RainSkills 放进同一条交付闭环。',
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
    summary: '从模型来源、推理参数到实例生命周期，统一放在 Rainbond 中管理。',
    points: ['内置模型、ModelScope、HTTP、上传文件和本地路径', 'CPU/GPU 模式、节点、环境变量与 vLLM 参数', '实例状态、运行详情、日志和在线调试'],
  },
  {
    title: 'OpenAI 兼容 API',
    summary: '模型实例运行后，直接开放给 Dify、业务系统和 AI 助手调用。',
    points: ['创建、复制和吊销 API Key', '提供 base URL、curl 和 Python SDK 示例', '外部应用按模型名称和有效密钥调用'],
  },
  {
    title: 'AI 应用市场',
    summary: '把 Dify 等常用 AI 应用变成可安装、可升级、可复用的软件资产。',
    points: ['一键安装 AI 应用和依赖组件', '用应用拓扑连接模型、数据库和业务系统', '把验证过的交付结果沉淀到应用市场'],
  },
  {
    title: 'AI 辅助运维',
    summary: '让 AI 从“生成代码”继续走到“部署、排障和交付验证”。',
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
      '企业 AI 通常还需要知识库、RAG、工作流、聊天界面、自动化工具和内部系统集成。Rainbond 应用市场可以把 Dify 等常用 AI 应用沉淀为可复用的软件资产。',
  },
  {
    title: 'RainAgent',
    description:
      'RainAgent 运行在 Rainbond 控制台内，适合在平台页面中通过自然语言部署、排障和运维应用，并结合页面上下文给出操作建议。',
  },
  {
    title: 'RainSkills',
    description:
      'RainSkills 安装在 Codex、Claude Code 等本地 AI 编码工具里，适合从本地项目出发完成 Rainbond 接入、部署、排错和交付验证。',
  },
];

const faqs = [
  {
    question: '企业如何私有化部署 AI 应用？',
    answer:
      '企业私有化部署 AI 应用，需要同时准备模型服务、AI 应用、数据库、访问入口、API 密钥、资源监控和升级机制。Rainbond 可以把这些对象按应用拓扑统一管理，并通过应用市场、模型 API 和 AI 助手能力降低部署和运维复杂度。',
  },
  {
    question: 'Rainbond 能部署哪些大模型？',
    answer:
      'Rainbond 大模型能力面向 Qwen、DeepSeek、GLM、Kimi 等模型私有化部署场景，支持从内置模型、ModelScope、HTTP 地址、上传文件和本地路径等方式准备模型。具体可部署模型取决于模型格式、推理引擎、算力资源和平台环境。',
  },
  {
    question: 'Rainbond 是否支持 OpenAI 兼容接口？',
    answer:
      '支持。模型实例运行后，Rainbond 可以提供 OpenAI 兼容接入示例，包括 base URL、curl 示例和 Python OpenAI SDK 示例。外部应用调用时需要使用有效 API 密钥，并指定正在运行的模型名称。',
  },
  {
    question: 'Dify 能否接入 Rainbond 上部署的私有模型？',
    answer:
      '可以按 OpenAI 兼容方式接入。通常先在 Rainbond 中部署模型服务并创建 API 密钥，再在 Dify 的模型供应商配置中填写模型服务地址、模型名称和密钥。如果 Dify 与模型服务部署在同一 Rainbond 集群内，也可以优先使用内网访问地址。',
  },
  {
    question: 'RainAgent 和 RainSkills 有什么区别？',
    answer:
      'RainAgent 运行在 Rainbond 控制台内，适合在平台页面中通过自然语言部署、排障和运维应用。RainSkills 安装在 Codex、Claude Code 等本地 AI 编码工具里，适合从本地项目出发完成 Rainbond 接入、部署、排错和交付验证。',
  },
  {
    question: 'Rainbond 的 AI 大模型能力是否必须使用 GPU？',
    answer:
      '不一定。部署时可以选择 CPU 或 GPU 模式。但对于较大规模文本模型，GPU 通常能显著提升推理性能。当前 GPU 资源识别和分配主要以 NVIDIA GPU 资源为主，实际规格应根据模型大小、上下文长度和并发要求评估。',
  },
  {
    question: 'Rainbond 适合离线或内网环境吗？',
    answer:
      'Rainbond 适合需要私有化、内网、离线交付和客户现场部署的团队。模型下载、上传和部署仍依赖具体环境中的网络、共享存储、GPU 资源和镜像准备情况；完全离线环境需要提前准备镜像、模型文件和安装包。',
  },
  {
    question: '如果模型部署失败，Rainbond 怎么排查？',
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
          content="AI 应用私有化部署,大模型私有化部署,企业 AI 私有化平台,Dify 私有化部署,大模型部署平台,OpenAI 兼容接口,GPU 模型部署,RainAgent,RainSkills,Rainbond 大模型"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Head>

      <CompareHeroGraphic
        title="AI 应用与大模型私有化部署解决方案"
        subtitle="在 Rainbond 上部署大模型、开放 OpenAI 兼容 API、安装 Dify 等 AI 应用，并用 RainAgent / RainSkills 完成部署、排障和运维。"
        decision="企业做 AI 私有化，难点通常不只是“模型能不能跑起来”，而是模型服务、AI 应用、GPU 资源、API 密钥、版本升级和排障运维能不能长期可控。"
        primaryCta={{label: '获取 AI 私有化部署方案', href: aiDocsUrl}}
        secondaryCta={{label: '先快速安装 Rainbond', href: '/install-hub'}}
        audienceHint="适合已经进入企业内网、客户现场、离线交付或长期运维阶段，希望把 Dify、私有模型、业务系统和 GPU 资源统一管理的团队。"
      />

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>从 AI Demo 到企业可用，真正难的是长期交付和运维</h2>
          <p>
            很多团队第一次尝试 AI 应用时，会先部署一个 Dify、Ollama 或本地模型 Demo。但进入企业环境后，问题会变成模型来源、资源调度、API 管理、监控排障和多环境复制。
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
          Rainbond 的价值不是把某一个 AI 工具跑起来，而是把 AI 应用和大模型服务纳入企业应用交付体系。
        </p>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <h2>一条链路完成模型、应用、API、监控和 AI 辅助运维</h2>
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
          <h2>从模型服务到 AI 应用，通过应用市场快速组合</h2>
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
            RainAgent 运行在 Rainbond 控制台内，RainSkills 接入 Codex、Claude Code 等本地 AI 编码工具，共同把 AI 从代码生成延伸到部署、运维和交付验证。
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
            从环境准备到模型接入，再到应用部署和持续运维，形成一条适合内网和客户现场复用的交付路径。
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
          <h2>什么团队更适合用 Rainbond 做 AI 私有化？</h2>
          <p>
            如果你的 AI 应用需要进入内网、客户现场、离线环境或长期运维，Rainbond 更适合作为统一交付底座。
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
            Rainbond 的定位不是替代所有 AI 平台，而是降低企业在私有化交付、应用组合和长期运维中的复杂度。
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
              description: '把 Codex / Claude Code 等 AI 编码工具接入 Rainbond 部署闭环。',
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
