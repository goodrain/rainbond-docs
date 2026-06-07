import React from 'react';
import Link from '@docusaurus/Link';
import styles from './enterpriseITHome.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type TextItem = {
  title: string;
  description: string;
};

type CapabilityItem = {
  title: string;
  description: string;
  bullets: string[];
};

type LinkItem = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type FocusItem = {
  step: string;
  title: string;
  description: string;
};

type OutcomeItem = {
  title: string;
  description: string;
};

type FitItem = {
  title: string;
  description: string;
};

type OperatingStep = {
  phase: string;
  title: string;
  output: string;
};

type ProofItem = {
  title: string;
  metric: string;
  description: string;
  href: string;
};

type AlternativeRow = {
  option: string;
  bestFor: string;
  limitation: string;
  rainbondFit: string;
};

type ChecklistItem = {
  title: string;
  description: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

const consultationHref = 'https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg';

const heroSignals = [
  '多供应商交付',
  '内网 / 信创环境',
  '应用统一运维',
  '软件资产化沉淀',
];

const outcomes: OutcomeItem[] = [
  {
    title: '交付标准化',
    description: '把供应商交付物和自研系统封装为可安装、可升级、可回滚的应用模板。',
  },
  {
    title: '运维自主化',
    description: '企业 IT 从应用视角查看状态、日志、拓扑、网关和版本。',
  },
  {
    title: '资源应用化',
    description: '物理机、虚拟机、Kubernetes 和多云资源都回到应用承载目标。',
  },
  {
    title: '资产可复用',
    description: '把一次交付沉淀为可复制、可升级、可追溯的软件资产。',
  },
];

const focusItems: FocusItem[] = [
  {
    step: '01',
    title: '统一管理采购软件和自研系统',
    description: '把 ERP、门户、业务系统、供应商交付物和自研应用放到同一应用视图里管理。',
  },
  {
    step: '02',
    title: '让供应商交付可验收、可升级',
    description: '供应商先在隔离空间验证，再发布为标准应用模板，企业掌握上线、升级和回滚节奏。',
  },
  {
    step: '03',
    title: '把软件成果沉淀为资产',
    description: '让版本、配置、依赖关系和交付经验沉淀到企业应用市场，减少重复建设和个人依赖。',
  },
];

const fitItems: FitItem[] = [
  {
    title: '系统数量多、来源复杂',
    description: '既有采购软件，又有自研应用、外包系统和公共中间件，需要统一应用视图。',
  },
  {
    title: '供应商长期参与交付',
    description: '需要供应商准入、隔离测试、标准验收、生产上线和持续升级的闭环。',
  },
  {
    title: '有内网、离线或信创要求',
    description: '不能默认公网、公有云或人工现场反复调环境，需要可复制的交付路径。',
  },
  {
    title: 'Kubernetes 不能只给专家用',
    description: '平台团队懂 K8s，但应用运维、实施和供应商更需要低门槛的应用操作入口。',
  },
];

const unfitItems: FitItem[] = [
  {
    title: '只想做服务器资产登记',
    description: '如果目标只是 CMDB、工单或 ITSM 流程管理，Rainbond 不是这类系统的替代品。',
  },
  {
    title: '只管理底层 Kubernetes 集群',
    description: '如果核心诉求是多集群安全、策略和基础设施治理，应优先看 Rancher 等集群管理平台。',
  },
  {
    title: '只有少量简单单机应用',
    description: '如果应用很少、部署变化低、没有供应商和多环境问题，短期价值不会特别明显。',
  },
  {
    title: '已有成熟平台工程体系',
    description: '如果团队已完整使用 GitOps、Helm、Argo CD 和内部平台，Rainbond 需要明确边界再接入。',
  },
];

const problems: TextItem[] = [
  {
    title: '应用交付与运维效率低',
    description: '部署、升级、回滚和日常运维依赖经验，流程慢且不可复制。',
  },
  {
    title: '资源很多，但应用视图缺失',
    description: '资源能看到，但应用状态、依赖关系和版本链路看不清。',
  },
  {
    title: '供应商协作与交付不可控',
    description: '交付物不统一、环境难复现、升级难验证，生产权限边界不清。',
  },
  {
    title: '软件成果难沉淀为资产',
    description: '配置、依赖和交付经验散落各处，新项目又要重新做一遍。',
  },
];

const capabilities: CapabilityItem[] = [
  {
    title: '应用统一纳管',
    description:
      '从应用视角统一管理采购软件、自研系统、供应商交付物和中间件，减少“每套系统一套运维方式”的混乱。',
    bullets: [
      '支持源码、镜像、Helm 等多来源部署',
      '应用拓扑、运行状态、日志、监控统一查看',
      '按团队做资源隔离、权限分配和配额管理',
    ],
  },
  {
    title: '供应商标准化交付',
    description:
      '让供应商在隔离测试空间完成部署与验证，再将结果发布为标准应用模板，企业按模板验收和上线。',
    bullets: [
      '供应商测试环境与生产环境隔离',
      '应用模板标准化交付与验收',
      '生产环境一键安装、升级与回滚',
    ],
  },
  {
    title: '低门槛 Kubernetes 应用运维',
    description:
      '把 Kubernetes 的复杂资源对象抽象成应用、组件、网关、存储、环境变量和依赖关系，让企业 IT 不必每天写 YAML。',
    bullets: [
      '应用级启停、伸缩、灰度、回滚和故障排查',
      '日志、Web 终端、监控告警和健康检测开箱可用',
      '适合开发、实施、应用运维和企业 IT 共同使用',
    ],
  },
  {
    title: '软件资产化沉淀',
    description:
      '把采购的软件、业务模块、交付方案和可复用中间件沉淀到企业应用市场，形成可复制、可追溯的软件资产库。',
    bullets: [
      '交付成果集中留存与版本可追溯',
      '可复用模板加速新项目启动',
      '降低对单个供应商和个人经验的依赖',
    ],
  },
];

const operatingSteps: OperatingStep[] = [
  {
    phase: '准入',
    title: '给供应商和项目分配隔离空间',
    output: '测试环境与生产环境分离，权限、资源和操作范围清楚。',
  },
  {
    phase: '部署',
    title: '把软件部署为可观测的应用',
    output: '应用拓扑、组件状态、日志、端口、配置和依赖关系可视化。',
  },
  {
    phase: '验收',
    title: '把通过验证的结果发布成模板',
    output: '交付物从零散脚本和文档，变成可安装、可升级的应用模板。',
  },
  {
    phase: '上线',
    title: '企业在生产环境按模板安装',
    output: '生产环境不再让供应商随意 SSH 操作，企业掌握上线节奏。',
  },
  {
    phase: '运维',
    title: '统一升级、回滚、伸缩和排障',
    output: '应用级日志、监控、Web 终端、网关和版本记录形成运维闭环。',
  },
  {
    phase: '复用',
    title: '沉淀到企业应用市场',
    output: '相同系统、相似项目或下级单位可以复用模板和版本。',
  },
];

const paths: LinkItem[] = [
  {
    title: '多供应商项目交付',
    description:
      '供应商在隔离空间验证软件，企业按标准模板验收、上线和升级，减少扯皮与重复工作。',
    href: '/blog/usescene-enterprise-delivery-one',
    linkLabel: '查看标准化交付路径',
  },
  {
    title: '企业级应用统一管理',
    description:
      '像管理应用市场一样管理企业应用，实现安装、升级、回滚、版本和权限的统一管理。',
    href: '/blog/usescene-app-management',
    linkLabel: '查看应用统一管理实践',
  },
  {
    title: '新服务器与多云资源管理',
    description:
      '把新采购的服务器、虚拟机和现有集群纳入统一视图，让资源调度和应用承载不再割裂。',
    href: '/blog/usescene-multi-cloud-management',
    linkLabel: '查看应用级多云管理',
  },
  {
    title: '遗留应用与信创迁移',
    description:
      '从 x86 到 ARM、从虚拟机到云原生，从传统交付到统一管理，按应用视角逐步迁移。',
    href: '/offline-and-xinchuang',
    linkLabel: '查看离线 / 信创专题',
  },
];

const comparisonRows = [
  {
    label: '主要管理对象',
    vm: '服务器、虚拟机和基础设施资源',
    container: '容器、集群和 Kubernetes 资源对象',
    rainbond: '应用、模板、交付链路、版本和运行状态',
  },
  {
    label: '适合谁使用',
    vm: '基础设施运维人员',
    container: '懂容器和 Kubernetes 的平台团队',
    rainbond: '企业 IT、应用运维、实施和交付团队',
  },
  {
    label: '软件采购后的使用方式',
    vm: '依赖人工装环境、人工部署和人工升级',
    container: '更标准，但仍需要懂容器编排和底层概念',
    rainbond: '按应用视角安装、升级、回滚和统一管理',
  },
  {
    label: '供应商交付协作',
    vm: '交付物离散、验收难、升级难',
    container: '交付更标准，但协作仍偏底层资源和配置',
    rainbond: '供应商测试、模板发布、企业一键安装形成闭环',
  },
  {
    label: '软件资产沉淀',
    vm: '项目结束即交付结束，复用困难',
    container: '可复用但门槛高，仍依赖专家',
    rainbond: '应用模板、组件和版本可统一沉淀、复用和追溯',
  },
];

const alternativeRows: AlternativeRow[] = [
  {
    option: '传统虚拟机 / IaaS',
    bestFor: '已有虚拟化体系、主要问题是服务器资源分配',
    limitation: '不直接解决应用部署、升级、回滚和供应商交付标准化',
    rainbondFit: '保留基础设施投资，在上层补应用管理与交付闭环',
  },
  {
    option: '原生 Kubernetes / Helm',
    bestFor: '团队 K8s 能力强，愿意长期维护 YAML、Chart 和运维规范',
    limitation: '对企业 IT、供应商和应用运维团队门槛较高',
    rainbondFit: '用应用模型降低 K8s 使用门槛，让更多角色能参与交付和运维',
  },
  {
    option: 'Rancher',
    bestFor: '多集群治理、集群安全、底层基础设施统一管理',
    limitation: '主要从集群和资源视角出发，应用交付闭环需要额外建设',
    rainbondFit: '可与 Rancher 分工：Rancher 管集群，Rainbond 管应用交付与运维',
  },
  {
    option: 'KubeSphere / OpenShift',
    bestFor: '有成熟平台团队，希望建设更完整的企业级云原生平台',
    limitation: '平台能力完整，但实施、学习和治理成本通常更高',
    rainbondFit: '更适合先解决应用上线、供应商交付、低门槛运维和资产沉淀',
  },
];

const proofItems: ProofItem[] = [
  {
    title: '某餐饮企业：供应商交付与应用资产化',
    metric: '3 个月上线周期缩短到 1 个月',
    description:
      '企业 IT 团队将 Rainbond 与 Rancher 分工使用，供应商在隔离空间交付，企业通过应用模板上线、升级和沉淀软件资产。',
    href: '/blog/case-diningroom',
  },
  {
    title: '智慧巨鹿：多供应商智慧城市应用管理',
    metric: '10+ 供应商、30+ 应用统一管理',
    description:
      '智慧城市项目用 Rainbond 建立供应商准入和应用统一运维流程，减少不同供应商部署方式带来的长期维护压力。',
    href: '/blog/case-zhjl',
  },
  {
    title: '藏书馆 App：微服务应用运维降本',
    metric: '服务器资源缩减三分之二',
    description:
      '团队通过应用拓扑、弹性伸缩、日志和 Web 终端降低微服务运维复杂度，让开发人员也能参与应用级运维。',
    href: '/blog/case-csg-app',
  },
];

const checklistItems: ChecklistItem[] = [
  {
    title: '系统与供应商数量',
    description: '现有多少套应用、多少家供应商、哪些系统最难升级和接管。',
  },
  {
    title: '部署环境约束',
    description: '是否涉及内网、离线、国产 CPU / OS、多个机房或多个 Kubernetes 集群。',
  },
  {
    title: '当前交付方式',
    description: '现在是脚本、文档、镜像、Helm、手工 SSH，还是已有 CI/CD 流程。',
  },
  {
    title: '上线和回滚要求',
    description: '升级频率、停机窗口、回滚要求、生产权限边界和审计要求。',
  },
  {
    title: '复用目标',
    description: '哪些应用、模块、中间件或行业方案希望沉淀为企业内部可复用资产。',
  },
];

const faqItems: FAQItem[] = [
  {
    question: '什么是企业应用统一管理平台？',
    answer:
      '企业应用统一管理平台是面向企业 IT 的应用管理入口，用来统一部署、升级、回滚、监控和沉淀采购软件、自研系统与供应商交付物。',
  },
  {
    question: 'Rainbond 解决的核心问题是什么？',
    answer:
      'Rainbond 解决的是企业应用从交付到运维的标准化问题：应用怎么装、怎么验收、怎么升级、怎么回滚、怎么沉淀为可复用资产。',
  },
  {
    question: '为什么只用虚拟机或 Kubernetes 工具还不够？',
    answer:
      '虚拟机更关注资源，Kubernetes 工具更关注集群和资源对象；企业 IT 真正需要的是围绕应用的交付、运维、权限、版本和资产闭环。',
  },
  {
    question: 'Rainbond 适合哪些团队？',
    answer:
      'Rainbond 适合供应商多、系统多、环境复杂、希望降低 Kubernetes 门槛的企业 IT、政企信息化、学校平台和系统集成团队。',
  },
  {
    question: 'Rainbond 和 Rancher、KubeSphere、OpenShift 怎么选？',
    answer:
      '如果重点是多集群和底层治理，可以优先看 Rancher；如果要建设完整云原生平台，可以评估 KubeSphere 或 OpenShift；如果要先解决应用交付、升级回滚、供应商协作和软件资产沉淀，Rainbond 更贴近。',
  },
  {
    question: '供应商交付为什么适合用 Rainbond 管？',
    answer:
      'Rainbond 可以让供应商先在隔离空间完成部署和验证，再发布成应用模板。企业在生产环境按模板安装和升级，减少供应商直接操作生产环境。',
  },
  {
    question: '需要团队先学会 Kubernetes 吗？',
    answer:
      '不需要让所有开发、实施和企业 IT 都先学会 Kubernetes。Rainbond 基于 Kubernetes，但通过应用模型把高频操作抽象成应用、组件、网关、存储和模板。',
  },
  {
    question: '什么时候不适合优先上 Rainbond？',
    answer:
      '如果只是做服务器资产登记、工单流转，或者团队已经有成熟的 GitOps 和平台工程体系，应该先明确 Rainbond 与现有体系的边界。',
  },
];

export default function EnterpriseITHome(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>让企业 IT 掌握每一套应用的交付、升级和运维</h1>
          <p className={styles.heroLead}>
            Rainbond 面向企业总部 IT、政企、学校和平台型机构，把采购软件、供应商交付物和自研系统纳入同一应用模型，形成从测试、验收、上线、升级到资产复用的标准流程。
          </p>
          <div className={styles.heroSignals}>
            {heroSignals.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className={styles.heroActions}>
            <TrackedLink
              to={consultationHref}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryAction}
              eventName="cta_enterprise_it_consult_clicked"
              eventProps={{
                module: 'it_enterprise_hero',
                cta_text: '获取企业应用管理方案',
                target_path: 'feishu_consultation',
              }}>
              获取企业应用管理方案
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className={styles.answerBox}>
        <h2>企业应用统一管理，关键不是再买一套资源平台，而是把应用生命周期标准化</h2>
        <p>
          企业 IT 真正要解决的是：采购软件、自研系统和供应商交付物能不能统一部署、验收、升级、回滚，并沉淀为可复用的软件资产。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>这套方案最终带来什么结果？</h2>
        </div>
        <div className={styles.outcomeGrid}>
          {outcomes.map((item) => (
            <section key={item.title} className={styles.outcomeCard}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>这个方案主要解决哪 3 件事？</h2>
          <p>如果你继续往下看，通常就是因为你在这三件事里至少命中了一件。</p>
        </div>
        <ol className={styles.numberedList}>
          {focusItems.map((item) => (
            <li key={item.step} className={styles.numberedItem}>
              <span className={styles.numberedBadge}>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>适合谁？不适合谁？</h2>
          <p>提前讲清边界，比把所有平台都说成竞品更容易建立信任。</p>
        </div>
        <div className={styles.fitMatrix}>
          <section className={styles.fitColumn}>
            <div className={styles.fitHeader}>优先适合</div>
            {fitItems.map((item) => (
              <div key={item.title} className={styles.fitItem}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </section>
          <section className={styles.fitColumnMuted}>
            <div className={styles.fitHeader}>暂不优先</div>
            {unfitItems.map((item) => (
              <div key={item.title} className={styles.fitItem}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </section>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>为什么传统模式会把应用管理越做越重？</h2>
          <p>这些问题不是单点故障，而是企业应用管理模式长期缺少统一标准的结果。</p>
        </div>
        <ol className={styles.problemList}>
          {problems.map((item, index) => (
            <li key={item.title} className={styles.problemItem}>
              <div className={styles.problemNo}>0{index + 1}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>关键不是把资源堆得更复杂，而是把重心从“资源”切到“应用”</h2>
          <p>真正要统一的不是机器，而是应用交付、升级、回滚、环境复制和后续运维的整条链路。</p>
        </div>
        <div className={styles.shiftPanel}>
          <div className={styles.shiftSide}>
            <div className={styles.shiftTag}>传统模式</div>
            <h3>资源为中心</h3>
            <ul>
              <li>物理机 / 虚拟机 / 各类云资源分别管理</li>
              <li>软件部署、升级、回滚高度依赖人工经验</li>
              <li>供应商交付结果分散，难验收、难复用</li>
            </ul>
          </div>
          <div className={styles.shiftDivider} />
          <div className={styles.shiftSide}>
            <div className={styles.shiftTag}>Rainbond 模式</div>
            <h3>应用为中心</h3>
            <ul>
              <li>统一纳管各类应用，只从应用视角组织交付和运维</li>
              <li>部署、升级、回滚、环境复制形成标准化闭环</li>
              <li>应用模板、应用市场和版本管理沉淀为数字资产</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Rainbond 让企业应用统一管理落地的 4 组能力</h2>
        </div>
        <div className={styles.capabilityList}>
          {capabilities.map((item, index) => (
            <section key={item.title} className={styles.capabilityItem}>
              <div className={styles.capabilityNo}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.capabilityBody}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>实际落地会怎么运转？</h2>
          <p>这不是只上一套工具，而是把供应商准入、应用验收、生产上线、长期运维和资产复用连成闭环。</p>
        </div>
        <div className={styles.processGrid}>
          {operatingSteps.map((item, index) => (
            <section key={item.phase} className={styles.processItem}>
              <span>{String(index + 1).padStart(2, '0')} / {item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.output}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Rainbond 跟传统虚拟机和 Kubernetes 工具的差异</h2>
          <p>这不是“谁功能多”的比较，而是你到底应该管理什么、由谁来管理、后续怎么持续演进。</p>
        </div>
        <div className={styles.compareTableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>对比项</th>
                <th>传统虚拟机 / IaaS</th>
                <th>Kubernetes / 容器管理工具</th>
                <th>Rainbond</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.vm}</td>
                  <td>{row.container}</td>
                  <td className={styles.highlightCell}>{row.rainbond}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>客户还有哪些替代方案？应该怎么选？</h2>
          <p>Rainbond 不需要把所有平台都说成对手。更准确的判断是：客户当前最想解决的是集群治理、完整云原生平台，还是应用交付与运维闭环。</p>
        </div>
        <div className={styles.compareTableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>方案</th>
                <th>更适合什么情况</th>
                <th>常见不足</th>
                <th>Rainbond 的位置</th>
              </tr>
            </thead>
            <tbody>
              {alternativeRows.map((row) => (
                <tr key={row.option}>
                  <td>{row.option}</td>
                  <td>{row.bestFor}</td>
                  <td>{row.limitation}</td>
                  <td className={styles.highlightCell}>{row.rainbondFit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>已有客户案例能证明什么？</h2>
          <p>市场价值不在“多一个 Kubernetes 控制台”，而在供应商协作、应用运维、资源利用和软件资产沉淀。</p>
        </div>
        <div className={styles.proofGrid}>
          {proofItems.map((item) => (
            <Link key={item.title} to={item.href} className={styles.proofCard}>
              <span className={styles.routeMeta}>客户案例</span>
              <h3>{item.title}</h3>
              <strong>{item.metric}</strong>
              <p>{item.description}</p>
              <span className={styles.routeCta}>查看案例</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>企业应用统一管理最典型的 4 条路径</h2>
          <p>如果你已经知道自己更接近哪类问题，直接从对应入口继续往下看会更快。</p>
        </div>
        <div className={styles.cardNavGrid}>
          {paths.map((item, index) => (
            <Link key={item.title} to={item.href} className={styles.routeCard}>
              <span className={styles.routeMeta}>路径 {String(index + 1).padStart(2, '0')}</span>
              <div className={styles.cardCopy}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className={styles.routeCta}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>咨询前建议先盘点哪些信息？</h2>
          <p>越早把现状说清楚，越容易判断 Rainbond 是否适合，以及应该先从哪类系统试点。</p>
        </div>
        <div className={styles.checklistGrid}>
          {checklistItems.map((item) => (
            <section key={item.title} className={styles.checklistItem}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>常见问题</h2>
          <p>这些问答用于帮助搜索用户和 AI 搜索结果快速理解 Rainbond 在企业应用统一管理中的定位。</p>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div>
          <div className={styles.eyebrow}>下一步</div>
          <h2>如果你正在评估企业应用统一管理，建议先做一次现状梳理</h2>
          <p>
            把当前系统数量、供应商数量、部署方式、升级频率、内网 / 信创要求和运维痛点列出来，Rainbond 团队可以据此判断是否适合走“应用统一管理 + 供应商标准化交付 + 软件资产化”的路径。
          </p>
        </div>
        <TrackedLink
          to={consultationHref}
          target="_blank"
          rel="noreferrer"
          className={styles.primaryAction}
          eventName="cta_enterprise_it_consult_clicked"
          eventProps={{
            module: 'it_enterprise_final',
            cta_text: '获取企业应用管理方案',
            target_path: 'feishu_consultation',
          }}>
          获取企业应用管理方案
        </TrackedLink>
      </section>
    </div>
  );
}
