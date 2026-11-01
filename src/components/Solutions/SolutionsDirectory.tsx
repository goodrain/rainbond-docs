import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {BrainCircuit, PackageCheck, Scale, Workflow} from 'lucide-react';
import styles from './solutions-directory.module.css';

const pageTitle = 'Rainbond 专题总览 | 软件交付、平台工程与 AI 应用';
const pageDescription = '按软件交付、平台工程、AI 应用和容器平台选型四类问题查找 Rainbond 专题、教程与案例。';

const groups = [
  {
    title: '软件交付与企业应用管理',
    description: '面向客户内网交付、多客户版本维护、应用统一纳管和组件复用。',
    href: '/solutions/software-delivery',
    linkLabel: '进入软件交付专题',
    icon: PackageCheck,
    related: [
      {label: '企业应用统一管理', href: '/it-and-enterprise'},
      {label: '离线与信创交付', href: '/offline-and-xinchuang'},
      {label: '应用模板生命周期', href: '/docs/how-to-guides/scenario-tutorials/app-template-lifecycle'},
    ],
  },
  {
    title: '开发者平台与平台工程',
    description: '面向源码自动部署、开发者自助服务、DevOps 和多集群应用管理。',
    href: '/solutions/platform-engineering',
    linkLabel: '进入平台工程专题',
    icon: Workflow,
    related: [
      {label: 'Git 源码自动部署', href: '/docs/how-to-guides/scenario-tutorials/git-source-auto-deploy'},
      {label: '多集群应用管理', href: '/docs/how-to-guides/scenario-tutorials/multi-cluster-app-management'},
      {label: 'Docker Compose 迁移', href: '/docs/how-to-guides/scenario-tutorials/docker-compose-to-kubernetes'},
    ],
  },
  {
    title: 'AI 应用开发与交付',
    description: '面向 AI 应用私有化、模型服务、GPU 实例以及 RainAgent 和 RainSkills。',
    href: '/solutions/ai-private-deployment',
    linkLabel: '进入 AI 应用专题',
    icon: BrainCircuit,
    related: [
      {label: 'Dify 私有化部署', href: '/docs/how-to-guides/scenario-tutorials/dify-private-deployment'},
      {label: 'n8n 私有化部署', href: '/docs/how-to-guides/scenario-tutorials/n8n-private-deployment'},
      {label: '模型与 GPU 实例', href: '/docs/how-to-guides/scenario-tutorials/ai-model-gpu-instance'},
      {label: 'RainSkills', href: '/rainskills'},
    ],
  },
  {
    title: '容器平台选型',
    description: '先区分集群管理、容器管理和应用管理，再比较适合团队的产品。',
    href: '/compare',
    linkLabel: '进入容器平台选型',
    icon: Scale,
    related: [
      {label: 'Rainbond 与 Rancher', href: '/compare/rainbond-vs-rancher'},
      {label: 'Rainbond 与 KubeSphere', href: '/compare/rainbond-vs-kubesphere'},
      {label: 'Rainbond 与 Sealos', href: '/compare/rainbond-vs-sealos'},
    ],
  },
];

export default function SolutionsDirectory(): JSX.Element {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: '首页', item: 'https://www.rainbond.com'},
      {'@type': 'ListItem', position: 2, name: '专题总览', item: 'https://www.rainbond.com/solutions'},
    ],
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.rainbond.com/solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.rainbond.com/solutions" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Head>

      <header className={styles.header}>
        <span className={styles.eyebrow}>Rainbond 专题</span>
        <h1>按要解决的问题查找内容</h1>
        <p>先选择当前任务，再进入专题。专题解释适用范围和产品边界，教程提供操作步骤，案例用于核对实际使用方式。</p>
        <span className={styles.updated}>最近更新时间：2026-10-25</span>
      </header>

      <div className={styles.grid}>
        {groups.map(({icon: Icon, ...group}) => (
          <section className={styles.group} key={group.href}>
            <div className={styles.groupHeader}>
              <span className={styles.icon}><Icon aria-hidden="true" /></span>
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <Link className={styles.primaryLink} to={group.href}>{group.linkLabel}</Link>
            <div className={styles.related}>
              <span>相关内容</span>
              <ul>
                {group.related.map((item) => <li key={item.href}><Link to={item.href}>{item.label}</Link></li>)}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
