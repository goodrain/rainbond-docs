import React, { useEffect, useRef } from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import { ArrowRight, BadgeCheck, BookOpen, Github, Store } from 'lucide-react';
import styles from './styles.module.css';
import proofStyles from './proof.module.css';

const stats = [['GitHub Stars', '6,279', '数据获取于 2026–10–23'], ['GitHub Forks', '878', '真实开源协作信号'], ['开源项目历史', '近 9 年', '仓库创建于 2017 年'], ['应用市场', '100+', '覆盖 AI、数据库与业务软件']];
const logos = [
  ['boe.png', '京东方'], ['ccteg.png', '中国煤炭科工集团'], ['benz.jpeg', '奔驰'],
  ['talkweb.png', '拓维信息'], ['zhx.png', '中国航信'], ['zggk.png', '中公高科'],
  ['xinanminzu.png', '西南民族大学'], ['haijun.png', '海军工程大学'], ['ligong.png', '北京理工大学'],
  ['guofang.png', '国防科技大学'], ['renminjc.png', '中国人民警察大学'], ['guangxitizhuan.png', '广西体育高等专科学校'],
  ['kaaosi.png', '卡奥斯 COSMOPlat'], ['ghh.jpeg', '中国国际货运航空'], ['xjny.png', '新疆能源'],
  ['bkrj.png', '北控软件'], ['bjcj.png', '北京城建集团'], ['gitee.png', 'Gitee'],
  ['xndl.png', 'SWEPDI'], ['dianxinwusuo.png', '电信五所'], ['28s.jpg', '中国电科二十八所'],
  ['ann.png', '安诺'], ['lyyl.png', '联影医疗'], ['fzsc.png', '福州市数字产业互联网科技有限公司'],
] as const;

export default function ProofSection() {
  const logoRailRef = useRef<HTMLUListElement>(null);
  const scrollDirectionRef = useRef(1);
  const interactionRef = useRef({ hover: false, focus: false });

  useEffect(() => {
    const rail = logoRailRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let distance = 0;

    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (interactionRef.current.hover || interactionRef.current.focus) {
        distance = 0;
      } else {
        // Accumulate fractional pixels so speed stays consistent on high-refresh displays.
        distance += elapsed * 0.042;
        const step = Math.floor(distance);
        distance -= step;
        if (step > 0) {
          const end = rail.scrollWidth - rail.clientWidth;
          const next = rail.scrollLeft + step * scrollDirectionRef.current;
          rail.scrollLeft = Math.max(0, Math.min(end, next));
          if (next >= end) scrollDirectionRef.current = -1;
          else if (next <= 0) scrollDirectionRef.current = 1;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      distance = 0;
      if (visible && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(rail);
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return <section className={`${styles.section} ${proofStyles.section}`} aria-labelledby="proof-title">
    <div className={styles.container}>
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}><BadgeCheck /> 成熟开源项目的可信证据</span><h2 id="proof-title">不靠口号，让用户自己验证</h2></div><p>代码仓库、真实产品、公开文档、应用市场和持续更新记录，都应该成为转化的一部分。</p></div>
      <div className={proofStyles.stats}>{stats.map(([label, value, note]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</div>
    </div>
      <div className={proofStyles.partners}
        onPointerEnter={() => { interactionRef.current.hover = true; }}
        onPointerLeave={() => { interactionRef.current.hover = false; }}
        onFocusCapture={() => { interactionRef.current.focus = true; }}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) interactionRef.current.focus = false; }}>
        <div className={styles.container}>
          <div className={proofStyles.partnersHeader}>
            <h3>企业客户</h3>
          </div>
        </div>
        <ul id="home-customer-logos" ref={logoRailRef} className={proofStyles.logos} aria-label="客户列表，可左右滚动查看更多" tabIndex={0}>{logos.map(([src, alt]) => <li key={src}><img src={`/img/users/${src}`} alt={alt} width="160" height="56" loading="lazy" decoding="async" /></li>)}</ul>
      </div>
    <div className={styles.container}>
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
