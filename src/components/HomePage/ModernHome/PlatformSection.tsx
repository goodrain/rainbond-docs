import React from 'react';
import { Bot, Boxes, Code2, Database, GitBranch, Globe2, HardDrive, Layers, Monitor, Network, Package, Server, ShieldCheck } from 'lucide-react';
import styles from './architecture.module.css';

const entries = [
  { title: 'RainAgent', icon: Bot },
  { title: '开发者控制台', icon: Monitor },
  { title: '开放 API', icon: Code2 },
  { title: '应用市场', icon: Package },
  { title: 'CI/CD 对接', icon: GitBranch },
];
const capabilities = [
  { title: '构建与部署', detail: '源码构建 · 镜像部署', icon: Package },
  { title: '版本化交付', detail: '应用发布 · 安装 · 升级 · 回滚', icon: Layers },
  { title: '运行与运维', detail: '网关与证书 · 日志与监控', icon: Globe2 },
  { title: '配置与数据', detail: '环境配置 · 持久化存储', icon: Database },
];
const governance = ['多租户与权限', '多集群管理', '资源配额', '操作审计', '应用资产管理', '离线交付'];
const infrastructure = ['容器运行时', '网络与服务发现', '持久化存储'];
const servers = [
  { title: '物理服务器', detail: '数据中心 / 裸金属', icon: Server },
  { title: '云服务器', detail: '私有云 / 公有云', icon: HardDrive },
  { title: '边缘服务器', detail: '分支机构 / 客户现场', icon: Network },
  { title: '信创服务器', detail: '适配国产化环境', icon: Server },
];

export default function PlatformSection() {
  return (
    <section id="platform" className={styles.section} aria-labelledby="platform-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div><span>RAINBOND ARCHITECTURE</span><h2 id="platform-title">以应用为中心，连接底层基础设施</h2></div>
          <p>从构建、运行到交付与治理，在自己的服务器上管理整套应用。</p>
        </header>
        <div className={styles.diagram} aria-label="Rainbond 五层平台架构图">
          <div className={styles.layer} data-layer="01">
            <LayerLabel title="使用入口" />
            <div className={styles.entries}>{entries.map(({ title, icon: Icon }) => <span key={title}><Icon aria-hidden="true" />{title}</span>)}</div>
          </div>
          <div className={`${styles.layer} ${styles.application}`} data-layer="02">
            <LayerLabel title="应用平台" />
            <div className={styles.platform}>
              <CapabilityGroup items={capabilities.slice(0, 2)} />
              <div className={styles.model}>
                <span className={styles.modelShape}><Boxes aria-hidden="true" /></span><div><strong>Rainbond 应用模型</strong><span>组件 · 依赖 · 配置 · 数据</span></div>
              </div>
              <CapabilityGroup items={capabilities.slice(2)} />
            </div>
          </div>
          <div className={`${styles.layer} ${styles.governance}`} data-layer="03">
            <LayerLabel title="企业治理" />
            <div className={styles.governanceItems}><ShieldCheck aria-hidden="true" />{governance.map(item => <span key={item}>{item}</span>)}</div>
          </div>
          <div className={styles.layer} data-layer="04">
            <LayerLabel title="底层基础设施" />
            <div className={styles.foundation}>
              <div className={styles.kubernetes}><Network aria-hidden="true" /><div><strong>Kubernetes</strong><span>标准 API · 多集群</span></div></div>
              <div className={styles.infraItems}>{infrastructure.map(item => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
          <div className={`${styles.layer} ${styles.serverLayer}`} data-layer="05">
            <LayerLabel title="服务器" />
            <div className={styles.servers}>{servers.map(({ title, detail, icon: Icon }) => <div key={title}><Icon aria-hidden="true" /><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerLabel({ title }: { title: string }) {
  return <h3 className={styles.label}>{title}</h3>;
}

function CapabilityGroup({ items }: { items: typeof capabilities }) {
  return <div className={styles.capabilities}>{items.map(({ title, detail, icon: Icon }) => <div key={title}><Icon aria-hidden="true" /><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>;
}
