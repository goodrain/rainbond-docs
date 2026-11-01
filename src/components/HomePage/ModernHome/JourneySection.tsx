import React from 'react';
import { Activity, Network, PackageCheck, Rocket, Route, Users } from 'lucide-react';
import styles from './styles.module.css';

const steps = [
  ['01 · 获得结果', '部署上线', '代码或开源软件变成可访问应用。', Rocket],
  ['02 · 稳定运行', '统一运维', '日志、伸缩、证书、升级与备份持续可控。', Activity],
  ['03 · 核心差异', '版本化交付', '整套应用成为可安装、可升级的软件资产。', PackageCheck],
  ['04 · 跨越环境', '多环境迁移', '开发、测试、生产与客户现场一致交付。', Network],
  ['05 · 组织协同', '规模化管理', '统一管理供应商、版本、权限与验收。', Users],
] as const;

export default function JourneySection() {
  return <section className={`${styles.section} ${styles.journeySection}`}>
    <div className={styles.container}>
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}><Route /> 一条完整的成长路径</span><h2>先用十分钟得到结果，再逐步沉淀交付能力</h2></div><p>首页不要求新用户一次理解所有功能。每一步都对应一个更深的问题，也对应 Rainbond 更难被替代的价值。</p></div>
      <div className={styles.journeyLine}>{steps.map(([num, title, copy, Icon], index) => <article key={title} className={index === 2 ? styles.keyStep : undefined}><span>{num}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div>
  </section>;
}
