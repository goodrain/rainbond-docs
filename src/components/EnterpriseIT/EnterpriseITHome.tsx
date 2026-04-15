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

const focusItems: FocusItem[] = [
  {
    step: '01',
    title: '把买来的软件统一管起来',
    description: '纳管不同资源、统一查看状态、统一升级路径，别再让每套软件各管各的。',
  },
  {
    step: '02',
    title: '让供应商交付变标准',
    description: '通过测试空间、标准模板和上线闭环，把“靠人盯交付”改成“按流程交付”。',
  },
  {
    step: '03',
    title: '把软件成果变成资产',
    description: '让版本、模板和交付结果持续沉淀，避免项目一结束，经验也跟着散掉。',
  },
];

const institutions: TextItem[] = [
  {
    title: '企业总部 / 集团 IT',
    description:
      '采购 ERP、CRM、门户、运营支撑系统和各类业务软件，需要统一纳管、统一升级、统一权限和统一交付。',
  },
  {
    title: '政府 / 事业单位',
    description:
      '面对供应商众多、环境隔离、信创适配、客户现场交付和长期运维，重点不是自己开发，而是把采购的软件真正用起来、管起来。',
  },
  {
    title: '学校 / 科研机构',
    description:
      '校园系统、科研平台和公共服务系统来源复杂，版本多、归口多、环境多，缺少统一的应用管理方式。',
  },
  {
    title: '平台型运营机构',
    description:
      '要让多个供应商交付的软件和能力沉淀成可复用资产，而不是每个项目都从头部署、从头维护。',
  },
];

const problems: TextItem[] = [
  {
    title: '应用交付与运维效率低',
    description:
      '环境准备、部署、升级流程繁琐，依赖“老师傅”经验，测试、上线、回滚和日常运维都慢。',
  },
  {
    title: '资源管理混乱，利用率不高',
    description:
      '物理机、虚拟机、私有云、Kubernetes 集群并存，统一视图和资源调度困难，成本高却看不清产出。',
  },
  {
    title: '供应商协作与交付不可控',
    description:
      '交付物格式不统一、环境难复现、升级难验证，生产环境容易继续依赖供应商，缺少标准化测试与交付机制。',
  },
  {
    title: '软件成果难沉淀为资产',
    description:
      '代码、配置、依赖、部署经验散落在各处，重复建设普遍存在，人员流动就会带走知识和能力。',
  },
];

const capabilities: CapabilityItem[] = [
  {
    title: '纳管一切资源，构建统一底座',
    description:
      '兼容物理机、虚拟机、各类 K8s 集群和异构环境，把现有基础设施统一纳入同一控制面。',
    bullets: [
      '兼容已有资源，保护历史投资',
      '多集群统一管理与监控',
      '按团队做资源隔离与配额分配',
    ],
  },
  {
    title: '以应用为中心，运维化繁为简',
    description:
      '不要求团队先掌握 Kubernetes 细节，围绕应用本身做部署、升级、回滚、弹性和可视化管理。',
    bullets: [
      '支持源码、镜像、Helm 等多来源部署',
      '应用级监控、日志、告警、伸缩开箱即用',
      '适合成百上千应用统一管理',
    ],
  },
  {
    title: '规范交付流程，提升供应商协作效率',
    description:
      '让供应商先在隔离空间中完成验证，再将结果发布成标准化应用模板，企业自己掌握安装和升级节奏。',
    bullets: [
      '供应商测试环境与生产环境隔离',
      '应用模板标准化交付与验收',
      '生产环境一键安装、升级与回滚',
    ],
  },
  {
    title: '软件即资产，沉淀、复用、增值',
    description:
      '把采购的软件、解决方案和可复用能力沉淀为企业资产，而不是一次性交付物。',
    bullets: [
      '交付成果集中留存与版本可追溯',
      '可复用模板加速新项目启动',
      '摆脱对单个供应商和个人经验的依赖',
    ],
  },
];

const paths: LinkItem[] = [
  {
    title: '新服务器资源管理',
    description:
      '把新采购的服务器、虚拟机和现有集群纳入统一视图，让资源调度和应用承载不再割裂。',
    href: '/blog/usescene-multi-cloud-management',
    linkLabel: '查看应用级多云管理实践',
  },
  {
    title: '多供应商项目交付',
    description:
      '供应商在隔离空间验证软件，企业按标准模板验收、上线和升级，减少扯皮与重复工作。',
    href: '/blog/usescene-enterprise-delivery-one',
    linkLabel: '查看标准化交付路径',
  },
  {
    title: '遗留应用与信创迁移',
    description:
      '从 x86 到 ARM、从虚拟机到云原生，从传统交付到统一管理，按应用视角逐步迁移。',
    href: '/offline-and-xinchuang',
    linkLabel: '查看离线 / 信创专题',
  },
  {
    title: '软件成果资产化',
    description:
      '把采购的软件、集成结果、业务组件和常用中间件沉淀为模板、组件和可复用资产。',
    href: '/blog/usescene-app-management',
    linkLabel: '查看企业级应用统一管理',
  },
];

const nextActions: LinkItem[] = [
  {
    title: '先选安装路径',
    description:
      '如果你已经想开始验证，先区分单机安装、集群安装、离线安装和信创安装。',
    href: '/install-hub',
    linkLabel: '进入安装总入口',
  },
  {
    title: '看离线 / 信创路径',
    description:
      '如果你有内网、客户现场、国产化 CPU / OS 或 ARM 迁移要求，直接走专题入口。',
    href: '/offline-and-xinchuang',
    linkLabel: '查看专题路径',
  },
];

const comparisonRows = [
  {
    label: '主要管理对象',
    vm: '基础设施与虚拟机资源',
    container: '容器与 Kubernetes 资源对象',
    rainbond: '应用、模板、交付链路和运行状态',
  },
  {
    label: '适合谁',
    vm: '基础设施运维人员',
    container: '懂容器和 Kubernetes 的平台团队',
    rainbond: '企业 IT、应用运维、实施与交付团队',
  },
  {
    label: '软件采购后的使用方式',
    vm: '依赖人工装环境、人工部署和人工升级',
    container: '仍需要懂容器编排和较多底层概念',
    rainbond: '按应用视角安装、升级、回滚和统一管理',
  },
  {
    label: '供应商交付协作',
    vm: '交付物离散、验收难、升级难',
    container: '交付更标准，但仍偏底层能力协作',
    rainbond: '供应商测试、模板发布、企业一键安装形成闭环',
  },
  {
    label: '软件资产沉淀',
    vm: '项目结束即交付结束，复用困难',
    container: '可复用但门槛高，仍依赖专家',
    rainbond: '应用模板、组件和版本可统一沉淀、复用和追溯',
  },
];

const lifecycleSteps = [
  '供应商在隔离测试空间验证软件',
  '通过应用模板发布标准化交付物',
  '企业将交付结果沉淀到应用市场',
  '在生产环境一键安装 / 升级 / 回滚',
  '把软件成果复用到其他组织与项目',
];

export default function EnterpriseITHome(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>不是自己开发软件，也需要做应用现代化</h1>
        <p className={styles.heroLead}>
          面向企业、政府、学校等“采购软件并管理应用”的机构，Rainbond 解决的不是“如何写代码”，
          而是如何把采购来的软件真正装起来、管起来、交付起来，并逐步沉淀成可复用的数字资产。
        </p>
        <div className={styles.heroActions}>
          <TrackedLink
            to="/install-hub"
            className={styles.primaryAction}
            eventName="cta_install_clicked"
            eventProps={{
              module: 'it_enterprise_hero',
              cta_text: '先选安装路径',
              target_path: '/install-hub',
            }}>
            先选安装路径
          </TrackedLink>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>你最可能关心的 3 件事</h2>
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
          <h2>适合哪些团队先看</h2>
          <p>如果你的团队并不以自主研发软件为主，而是采购、集成、验收和管理软件，可以重点看这部分内容。</p>
        </div>
        <div className={styles.textGroup}>
          {institutions.map((item) => (
            <div key={item.title} className={styles.textItem}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>为什么传统模式会把应用管理越做越重</h2>
          <p>这些问题不是单点故障，而是整个应用管理模式的内耗。</p>
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
              <li>统一纳管各类资源，只从应用视角组织交付和运维</li>
              <li>部署、升级、回滚、环境复制形成标准化闭环</li>
              <li>应用模板、应用市场和版本管理沉淀为数字资产</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Rainbond 让应用现代化真正落地的 4 组能力</h2>
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
          <h2>Rainbond 跟传统虚拟机和容器平台的差异</h2>
          <p>这不是“谁功能多”的比较，而是你到底应该管理什么、由谁来管理、后续怎么持续演进。</p>
        </div>
        <div className={styles.compareTableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>对比项</th>
                <th>传统虚拟机 / IaaS</th>
                <th>容器平台 / Kubernetes 工具</th>
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
          <h2>从“供应商交付一次”到“企业资产持续沉淀”的闭环</h2>
        </div>
        <ol className={styles.timeline}>
          {lifecycleSteps.map((item, index) => (
            <li key={item} className={styles.timelineItem}>
              <span className={styles.timelineNo}>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>应用现代化最典型的 4 条路径</h2>
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
              <span className={styles.routeCta}>
                {item.linkLabel}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>看完以后，下一步该做什么</h2>
          <p>不要停在“看懂了”，而是尽快进入验证、案例研究和场景路径。</p>
        </div>
        <div className={styles.cardNavGrid}>
          {nextActions.map((item, index) => (
            <Link key={item.title} to={item.href} className={styles.actionCard}>
              <div className={styles.actionHeader}>
                <span className={styles.routeMeta}>建议 {String(index + 1).padStart(2, '0')}</span>
                <span className={styles.actionIcon}>{item.icon}</span>
              </div>
              <div className={styles.cardCopy}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className={styles.actionCta}>
                {item.linkLabel}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
