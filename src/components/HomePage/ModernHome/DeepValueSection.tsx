import React, { useState } from 'react';
import clsx from 'clsx';
import { ArrowRight, BrainCircuit, CheckCircle2, ClipboardCheck, PackageCheck } from 'lucide-react';
import styles from './styles.module.css';
import { trackUmamiEvent } from '@src/utils/umami';
import visualStyles from './deep-value-visuals.module.css';

const solutions = [
  {
    key: 'delivery',
    audience: '01 · ISV / 软件厂商',
    label: '复杂软件交付',
    eyebrow: '软件从部署物变成产品',
    title: '把多组件系统交付成可安装、可升级的软件包',
    description: '组件、依赖、配置、数据和版本关系不再散落在文档与脚本里，客户现场可以重复安装和持续升级。',
    points: ['整套软件一键安装，不逐组件实施', '版本差异、升级记录和回滚路径清晰', '同一交付物覆盖在线、内网和离线环境'],
    icon: PackageCheck,
  },
  {
    key: 'supplier',
    audience: '02 · 企业 IT',
    label: '供应商与交付过程管理',
    eyebrow: '让交付过程可见、结果可验',
    title: '统一管理供应商、交付版本和企业软件资产',
    description: '企业 IT 不再只收到安装文档。供应商提交应用版本，Rainbond 记录部署与验证过程，企业按真实运行结果验收并接管。',
    points: ['供应商按权限部署，企业保留运行控制权', '以状态、访问结果和版本记录完成验收', '采购软件和自研系统沉淀为长期资产'],
    icon: ClipboardCheck,
  },
  {
    key: 'ai',
    audience: '03 · AI 团队',
    label: 'AI 应用与模型私有化',
    eyebrow: '整套 AI 应用栈留在企业环境',
    title: '统一运行 AI 应用、模型服务、数据与业务系统',
    description: '不只是部署一个模型。Dify、自研 Agent、向量数据库、GPU 模型服务和原有业务系统在同一平台持续运行。',
    points: ['AI 应用、模型和中间件统一连接', '模型 API、GPU 状态和应用运行统一管理', '支持私有云、内网、离线与信创基础设施'],
    icon: BrainCircuit,
  },
] as const;

type SolutionKey = (typeof solutions)[number]['key'];

export default function DeepValueSection() {
  const [activeKey, setActiveKey] = useState<SolutionKey>('delivery');
  const active = solutions.find(item => item.key === activeKey) || solutions[0];
  const ActiveIcon = active.icon;

  return (
    <section id="solutions" className={`${styles.section} ${styles.depthSection}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div><span className={styles.eyebrow}><PackageCheck /> 从快速部署到深度价值</span><h2>应用越复杂，Rainbond 的差异越明显</h2></div>
          <p>三个场景共用同一底层能力：应用模型、多环境交付和持续运维。点击切换，查看 Rainbond 具体解决了什么。</p>
        </div>
        <div className={styles.depthTabs} role="tablist" aria-label="Rainbond 深度价值">
          {solutions.map(item => (
            <button key={item.key} type="button" role="tab" aria-selected={item.key === activeKey} className={clsx(item.key === activeKey && styles.active)} onClick={() => { if (item.key !== activeKey) trackUmamiEvent('home_solution_selected', { module: 'home_deep_value', solution: item.key, solution_title: item.label }); setActiveKey(item.key); }}>
              <span>{item.audience}</span><strong>{item.label}</strong>
            </button>
          ))}
        </div>
        <div className={styles.depthStage} role="tabpanel" key={active.key}>
          <div className={styles.depthCopy}>
            <span className={styles.eyebrow}><ActiveIcon /> {active.eyebrow}</span>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <ul>{active.points.map(point => <li key={point}><CheckCircle2 /> {point}</li>)}</ul>
            <span className={styles.inlineAction}>对应方案入口待确认 <ArrowRight /></span>
          </div>
          <div className={`${styles.solutionVisual} ${visualStyles.canvas}`}>
            {active.key === 'delivery' && <DeliveryVisual />}
            {active.key === 'supplier' && <SupplierVisual />}
            {active.key === 'ai' && <AiVisual />}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryVisual() {
  return (
    <figure className={visualStyles.diagram} tabIndex={0} aria-label="软件交付架构图，小屏可横向滚动查看">
      <img src="/img/homepage/deep-value/software-delivery.svg" width="760" height="520" loading="lazy" alt="前端、后端与数据服务打包为 Rainbond 应用模板，安装到在线、企业内网和离线环境，并持续升级与回滚" />
    </figure>
  );
}

function SupplierVisual() {
  return (
    <figure className={visualStyles.diagram} tabIndex={0} aria-label="供应商交付流程图，小屏可横向滚动查看">
      <img src="/img/homepage/deep-value/supplier-workflow.svg" width="760" height="520" loading="lazy" alt="供应商提交应用版本，Rainbond 部署并记录运行状态，企业 IT 按实际结果验收、接管运维，后续版本重复此交付流程" />
    </figure>
  );
}

function AiVisual() {
  return (
    <figure className={visualStyles.productShot}>
      <a href="/img/video/rainbond-llm-install-use-step-7.png" target="_blank" rel="noopener noreferrer" aria-label="在新窗口查看 Rainbond 大模型监控产品截图原图">
        <img src="/img/video/rainbond-llm-install-use-step-7.png" width="3420" height="1904" loading="lazy" alt="Rainbond AI 大模型插件的模型监控页面，展示模型服务状态、请求数、GPU 显存与节点监控指标" />
      </a>
      <figcaption><span>产品实景 · 模型服务与 GPU 监控</span><span>点击查看原图 ↗</span></figcaption>
    </figure>
  );
}
