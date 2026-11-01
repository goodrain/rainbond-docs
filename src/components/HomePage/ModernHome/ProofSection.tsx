import React from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import { ArrowRight, BadgeCheck, BookOpen, Github, Store } from 'lucide-react';
import styles from './styles.module.css';
import proofStyles from './proof.module.css';
import boeLogo from '@site/static/img/users/boe.png';
import cctegLogo from '@site/static/img/users/ccteg.png';
import talkwebLogo from '@site/static/img/users/talkweb.png';
import giteeLogo from '@site/static/img/users/gitee.png';
import benzLogo from '@site/static/img/users/benz.jpeg';

const stats = [['GitHub Stars', '6,279', '数据获取于 2026–10–23'], ['GitHub Forks', '878', '真实开源协作信号'], ['开源项目历史', '近 9 年', '仓库创建于 2017 年'], ['应用市场', '100+', '覆盖 AI、数据库与业务软件']];
const logos = [[boeLogo, '京东方'], [cctegLogo, '中国煤炭科工集团'], [talkwebLogo, '拓维信息'], [giteeLogo, 'Gitee'], [benzLogo, '奔驰']];

// The ideal-image plugin returns metadata in production and a URL in development.
function logoUrl(asset: unknown): string {
  const image = asset as string | { default: string } | { src: { src: string } };
  return typeof image === 'string' ? image : 'default' in image ? image.default : image.src.src;
}

export default function ProofSection() {
  return <section className={`${styles.section} ${proofStyles.section}`} aria-labelledby="proof-title">
    <div className={styles.container}>
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}><BadgeCheck /> 成熟开源项目的可信证据</span><h2 id="proof-title">不靠口号，让用户自己验证</h2></div><p>代码仓库、真实产品、公开文档、应用市场和持续更新记录，都应该成为转化的一部分。</p></div>
      <div className={proofStyles.stats}>{stats.map(([label, value, note]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</div>
      <div className={proofStyles.partners}>
        <p>部分用户与生态伙伴</p>
        <ul className={proofStyles.logos}>{logos.map(([src, alt]) => <li key={alt}><img src={logoUrl(src)} alt={alt} width="160" height="56" loading="lazy" decoding="async" /></li>)}</ul>
      </div>
      <div className={proofStyles.evidence}>
        <Evidence icon={Github} title="检查源代码和更新记录" copy="先确认项目是否持续维护，再决定是否安装。" to="https://github.com/goodrain/rainbond" action="查看 GitHub" />
        <Evidence icon={Store} title="用一个真实软件验证" copy="选择开源应用，验证安装、访问与后续升级。" to="https://hub.rainbond.com/" action="浏览应用市场" />
        <Evidence icon={BookOpen} title="按当前任务阅读文档" copy="不从概念开始，直接进入部署、安装或交付路径。" to="/docs" action="进入文档" />
      </div>
    </div>
  </section>;
}

function Evidence({ icon: Icon, title, copy, to, action }) {
  return <article><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p><Link to={to} eventName="home_evidence_clicked" eventProps={{ module: 'home_proof', cta_text: action, target_path: to }}>{action} <ArrowRight aria-hidden="true" /></Link></article>;
}
