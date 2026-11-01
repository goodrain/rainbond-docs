import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from './capability-topic-page.module.css';

export type TopicLink = {
  label: string;
  href: string;
  description?: string;
};

export type TopicPageConfig = {
  title: string;
  shortTitle: string;
  description: string;
  canonical: string;
  keywords: string[];
  updated: string;
  answer: string;
  audience: string;
  navItems: Array<{label: string; href: string}>;
  processAnchor: string;
  capabilityAnchor: string;
  problems: string[];
  process: Array<{title: string; description: string}>;
  capabilities: Array<{title: string; detail: string; boundary: string; evidence?: TopicLink}>;
  steps: Array<{title: string; detail: string}>;
  screenshots: Array<{src: string; alt: string; caption: string}>;
  compatibility: Array<{item: string; verified: string; note: string}>;
  caseStudy: {title: string; summary: string; evidence: string; href: string};
  fit: string[];
  notFit: string[];
  faqs: Array<{question: string; answer: string}>;
  links: TopicLink[];
  sources: TopicLink[];
};

export default function CapabilityTopicPage({config}: {config: TopicPageConfig}): JSX.Element {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    dateModified: config.updated,
    mainEntityOfPage: config.canonical,
    author: {'@type': 'Organization', name: 'Rainbond', url: 'https://www.rainbond.com'},
    publisher: {'@type': 'Organization', name: '北京好雨科技有限公司', url: 'https://www.rainbond.com'},
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {'@type': 'Answer', text: item.answer},
    })),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: '首页', item: 'https://www.rainbond.com'},
      {'@type': 'ListItem', position: 2, name: config.shortTitle, item: config.canonical},
    ],
  };

  return (
    <article className={styles.page}>
      <Head>
        <title>{config.title} | Rainbond</title>
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords.join(',')} />
        <link rel="canonical" href={config.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${config.title} | Rainbond`} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.canonical} />
        <meta property="og:image" content={`https://www.rainbond.com${config.screenshots[0].src}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <span className={styles.eyebrow}>Rainbond 场景专题</span>
        <h1>{config.title}</h1>
        <p className={styles.answer}>{config.answer}</p>
        <p className={styles.audience}>{config.audience}</p>
        <p className={styles.updated}>最近更新时间：{config.updated}</p>
      </header>

      <nav className={styles.topicNav} aria-label="本页目录">
        {config.navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>

      <section id="problems" className={styles.section}>
        <h2>先确认是不是这些问题</h2>
        <div className={styles.problemGrid}>
          {config.problems.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>

      <section id={config.processAnchor} className={styles.section}>
        <h2>从现有系统开始，按这个顺序落地</h2>
        <ol className={styles.processList}>
          {config.process.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section id={config.capabilityAnchor} className={styles.section}>
        <h2>能做什么，哪些工作仍要自己处理</h2>
        <div className={styles.capabilityGrid}>
          {config.capabilities.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <p className={styles.boundary}><strong>边界：</strong>{item.boundary}</p>
              {item.evidence ? <Link className={styles.evidenceLink} to={item.evidence.href}>核验：{item.evidence.label}</Link> : null}
            </article>
          ))}
        </div>
      </section>

      <section id="implementation-steps" className={styles.section}>
        <h2>实际操作步骤</h2>
        <ol className={styles.stepList}>
          {config.steps.map((item, index) => (
            <li key={item.title}>
              <strong>{index + 1}. {item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="product-evidence" className={styles.section}>
        <h2>在产品界面里可以看到什么</h2>
        <div className={styles.mediaGrid}>
          {config.screenshots.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="compatibility" className={styles.section}>
        <h2>已经验证到什么范围</h2>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th>检查项</th><th>已验证内容</th><th>实施说明</th></tr></thead>
            <tbody>
              {config.compatibility.map((item) => (
                <tr key={item.item}><td>{item.item}</td><td>{item.verified}</td><td>{item.note}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="case" className={styles.caseStudy}>
        <span>公开案例</span>
        <h2>{config.caseStudy.title}</h2>
        <p>{config.caseStudy.summary}</p>
        <p><strong>可核验证据：</strong>{config.caseStudy.evidence}</p>
        <Link to={config.caseStudy.href}>查看完整案例</Link>
      </section>

      <section id="fit" className={styles.section}>
        <h2>哪些团队适合，哪些团队不必优先考虑</h2>
        <div className={styles.fitGrid}>
          <div><h3>更适合</h3><ul>{config.fit.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>不应优先选择</h3><ul>{config.notFit.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <h2>常见问题</h2>
        <div className={styles.faqList}>
          {config.faqs.map((item) => (
            <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
          ))}
        </div>
      </section>

      <section id="references" className={styles.section}>
        <h2>继续查证</h2>
        <div className={styles.linkGrid}>
          {config.links.map((item) => (
            <Link key={item.href} to={item.href}><strong>{item.label}</strong><span>{item.description}</span></Link>
          ))}
        </div>
        <h3 className={styles.sourceTitle}>事实来源</h3>
        <ul className={styles.sourceList}>
          {config.sources.map((item) => <li key={item.href}><Link to={item.href}>{item.label}</Link></li>)}
        </ul>
      </section>
    </article>
  );
}
