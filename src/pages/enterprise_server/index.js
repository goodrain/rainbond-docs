import React from 'react';
import Layout from '@theme/Layout';
import PageContainer from '@src/components/PageContainer';

import Section from '@src/components/Section';
import styles from './index.module.scss';

const CheckIcon = ({ className }) => (
  <svg className={className || styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.004 7.004a1 1 0 01-1.414 0l-3.004-3.004a1 1 0 111.414-1.414l2.297 2.297 6.297-6.297a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const DashIcon = () => <span className={styles.dashIcon}>—</span>;

const plans = [
  {
    name: '社区版',
    tag: '自托管',
    price: '免费',
    priceUnit: '',
    desc: '为开发者提供体验与协作基础能力，开放开源',
    features: ['开放开源', '社区支持', '社区版迭代'],
    primaryBtn: null,
    outlineBtn: { text: '免费下载', href: '/docs/quick-start/quick-install/' },
    highlighted: false,
  },
  {
    name: '企业版',
    tag: '私有化',
    price: '联系我们',
    priceUnit: '',
    desc: '为企业提供专属支持与运营商级可靠性',
    features: ['专业支持', '7×24 响应', '定制服务'],
    primaryBtn: { text: '商业咨询', href: 'https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg' },
    outlineBtn: { text: '预约演示', href: 'https://rainbond.feishu.cn/share/base/form/shrcngJKwbek0nbP1bBIcFA5g6d' },
    highlighted: true,
  },
];

const comparisonSections = [
  {
    category: '应用构建',
    rows: [
      { feature: '常见开发语言自动识别/自动构建', community: true, enterprise: true },
      { feature: 'Dockerfile构建和镜像构建', community: true, enterprise: true },
      { feature: '集成对接Gitlab/Github/Gitee/SVN', community: true, enterprise: true },
      { feature: '持续构建及版本回滚', community: true, enterprise: true },
      { feature: '一体化开发测试环境', community: true, enterprise: true },
    ],
  },
  {
    category: '微服务架构',
    rows: [
      { feature: '多种Service Mesh框架按需切换', community: true, enterprise: true },
      { feature: '支持Spring Cloud和Dubbo等常见微服务架构', community: true, enterprise: true },
      { feature: '通过"拖拉拽"的方式进行服务编排', community: true, enterprise: true },
      { feature: '多级探索式服务拓扑', community: true, enterprise: true },
      { feature: '集成skywalking/pinpoint', community: true, enterprise: true },
    ],
  },
  {
    category: '应用市场',
    rows: [
      { feature: '可以运行就可以一键发布到应用市场', community: true, enterprise: true },
      { feature: '通过应用市场实现软件资产管理', community: true, enterprise: true },
      { feature: '离线导入和导出', community: true, enterprise: true },
      { feature: '复杂应用一键安装和一键升级', community: true, enterprise: true },
      { feature: '对接多个外部Helm市场', community: true, enterprise: true },
    ],
  },
  {
    category: '应用运维和管理',
    rows: [
      { feature: '应用和组件两种粒度的管理模式', community: true, enterprise: true },
      { feature: '手动伸缩和自动伸缩', community: true, enterprise: true },
      { feature: '实时日志展示和对接外部日志系统', community: true, enterprise: true },
      { feature: '应用级监控和性能分析', community: true, enterprise: true },
      { feature: '通过插件扩展多种运维和管理能力', community: true, enterprise: true },
      { feature: 'web终端管理', community: true, enterprise: true },
    ],
  },
  {
    category: '应用网关',
    rows: [
      { feature: '端口管理和多种负载均衡策略', community: true, enterprise: true },
      { feature: '统一的域名管理和HTTPS证书管理', community: true, enterprise: true },
      { feature: '灰度发布和A/B测试', community: true, enterprise: true },
    ],
  },
  {
    category: '集群管理',
    rows: [
      { feature: '对接管理虚拟机/服务器/K8s/公有云', community: true, enterprise: true },
      { feature: '应用无差别的在多云上运行', community: true, enterprise: true },
      { feature: '应用跨云备份和迁移', community: true, enterprise: true },
      { feature: '多团队和多租户管理', community: true, enterprise: true },
    ],
  },
  {
    category: '服务支持',
    rows: [
      { feature: '社区支持', community: true, enterprise: true },
      { feature: 'SLA保障', community: false, enterprise: true },
      { feature: '技术支持', community: false, enterprise: true },
      { feature: '现场实施与培训', community: false, enterprise: true },
    ],
  },
  {
    category: '企业级功能扩展',
    rows: [
      { feature: '国产化信创', sub: '支持国产CPU和操作系统', community: false, enterprise: true },
      { feature: '基础功能扩展', sub: '应用备份、个性化视觉配置及审计日志等核心模块增强', community: false, enterprise: true },
      { feature: '监控中心', sub: '集群与应用级全方位监控，集成指标采集、日志分析、链路追踪', community: false, enterprise: true },
      { feature: '告警中心', sub: '实时异常检测与智能告警，支持自定义阈值、多通道通知', community: false, enterprise: true },
      { feature: '日志中心', sub: '平台、组件级的日志分析与检索', community: false, enterprise: true },
      { feature: 'GPU高级管理', sub: 'AI训练/推理加速、显存监控、多卡分配策略', community: false, enterprise: true },
      { feature: '源码安全扫描', sub: '代码质量和安全检测', community: false, enterprise: true },
      { feature: '灾备恢复', sub: '可视化备份策略配置和自动化恢复能力', community: false, enterprise: true },
      { feature: '流水线', sub: '灰度发布、自动化编排', community: false, enterprise: true },
      { feature: '计量计费', sub: '账户充值、账单明细、价格计算器、用量明细', community: false, enterprise: true },
      { feature: '云原生应用商店', community: false, enterprise: true },
      { feature: '应用集成和展示门户', community: false, enterprise: true },
      { feature: '三级等保支持', community: false, enterprise: true },
    ],
  },
];

function CellValue({ value }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <DashIcon />;
  return <span className={styles.cellText}>{value}</span>;
}

export default function Index() {
  return (
    <Layout wrapperClassName={styles.layoutWrapper}>
      <PageContainer>
        {/* Screen 1: Hero */}
        <Section style={{ position: 'relative' }}>
          <div className={styles.hero}>
            <span className={styles.heroLabel}>Pricing</span>
            <h1 className={styles.heroTitle}>选择适合您的 Rainbond 产品</h1>
            <p className={styles.heroDesc}>
              从开源社区版到生产级企业版，满足不同阶段的业务需求。
            </p>
          </div>
        </Section>

        {/* Screen 2: Cards + Comparison Table */}
        <Section noBorder>
          <div className={styles.cardsWrapper}>
            <div className={styles.cards}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`${styles.card} ${plan.highlighted ? styles.cardHighlighted : ''}`}
                >
                  <div className={styles.cardTag}>{plan.tag}</div>
                  <div className={styles.cardName}>{plan.name}</div>
                  <div className={styles.cardPriceRow}>
                    <span className={styles.cardPrice}>{plan.price}</span>
                    {plan.priceUnit && <span className={styles.cardPriceUnit}>{plan.priceUnit}</span>}
                  </div>
                  <p className={styles.cardDesc}>{plan.desc}</p>
                  <ul className={styles.cardFeatures}>
                    {plan.features.map((f) => (
                      <li key={f}>
                        <CheckIcon className={styles.checkIconCard} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cardBtns}>
                    {plan.primaryBtn && (
                      <a
                        className={styles.btnPrimary}
                        href={plan.primaryBtn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plan.primaryBtn.text}
                      </a>
                    )}
                    {plan.outlineBtn && (
                      <a
                        className={styles.btnOutline}
                        href={plan.outlineBtn.href}
                        target={plan.outlineBtn.href.startsWith('http') ? '_blank' : undefined}
                        rel={plan.outlineBtn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {plan.outlineBtn.text}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.comparison}>
            {/* Sticky Table Header */}
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderFeature}></div>
              <div className={styles.tableHeaderPlan}>
                <span className={styles.planLabel}>社区版</span>
              </div>
              <div className={styles.tableHeaderPlan}>
                <span className={`${styles.planLabel} ${styles.planLabelHighlight}`}>企业版</span>
              </div>
            </div>

            {/* Table Body */}
            {comparisonSections.map((section) => (
              <div key={section.category} className={styles.tableSection}>
                <div className={styles.tableCategoryRow}>
                  <span className={styles.categoryName}>{section.category}</span>
                </div>
                {section.rows.map((row) => (
                  <div key={row.feature} className={styles.tableRow}>
                    <div className={styles.tableFeature}>
                      <span className={styles.featureName}>{row.feature}</span>
                      {row.sub && <span className={styles.featureSub}>{row.sub}</span>}
                    </div>
                    <div className={styles.tableCell}>
                      <CellValue value={row.community} />
                    </div>
                    <div className={styles.tableCell}>
                      <CellValue value={row.enterprise} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>
      </PageContainer>
    </Layout>
  );
}
