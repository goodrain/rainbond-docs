import React from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import { Sparkles } from 'lucide-react';
import { useAgentDeploymentModal } from '@src/components/HomePage/Hero';
import styles from './styles.module.css';

const proofItems = [
  ['6,279', 'GitHub Stars'],
  ['100+', '开源应用'],
  ['x86 / ARM', '多架构'],
  ['在线 / 离线', '均可部署'],
];

export default function LandingHero() {
  const { openAgentModal, agentEntryButtonRef, agentModal } = useAgentDeploymentModal();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}><Sparkles /> AI 驱动的开源应用交付平台</span>
          <h1>把代码和复杂软件<strong>持续交付到自己的服务器</strong></h1>
          <p>AI 帮你完成第一次部署，Rainbond 让整套应用持续运行、升级和跨环境交付。无需先学 Kubernetes，代码、数据和运行环境始终由你掌控。</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/docs/quick-start/quick-install" eventName="cta_home_install_clicked" eventProps={{ module: 'home_hero', cta_text: '安装到我的服务器', target_path: '/docs/quick-start/quick-install' }}>安装到我的服务器</Link>
            <button ref={agentEntryButtonRef} type="button" className={styles.secondaryButton} onClick={openAgentModal} aria-haspopup="dialog">让 AI 部署当前项目</button>
          </div>
          <div className={styles.heroProof}>
            {proofItems.map(([value, label]) => <span key={label}><strong>{value}</strong>{label}</span>)}
          </div>
        </div>

      </div>
      {agentModal}
    </section>
  );
}
