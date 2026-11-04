import React from 'react';
import { Activity, Bot, Boxes, Code2, Cpu, GitBranch, Layers, Monitor, Network, Package, ShieldCheck } from 'lucide-react';
import styles from './architecture.module.css';
import homeStyles from './styles.module.css';

const entryPoints = [
  { title: '开发者控制台', icon: Monitor },
  { title: 'AI助手', icon: Bot },
  { title: '开放 API', icon: Code2 },
  { title: 'CI/CD 对接', icon: GitBranch },
  { title: '应用市场', icon: Package },
] as const;

const featureGroups = [
  { title: '应用部署', icon: Package, items: ['源码构建', '镜像部署', '软件包部署', '应用市场', 'Compose / Helm', '自动构建'] },
  { title: '应用编排', icon: Boxes, items: ['应用拓扑', '组件依赖', '环境变量', '配置文件', '持久存储', 'Sidecar'] },
  { title: '运行运维', icon: Activity, items: ['日志监控', '健康检查', '弹性伸缩', 'Web 终端', 'HTTP / TCP', '域名证书'] },
  { title: '软件交付', icon: Layers, items: ['模板发布', '模版导入导出', '升级回滚', '跨集群迁移', '离线交付', '多架构交付'] },
  { title: '团队治理', icon: ShieldCheck, items: ['多租户', '团队管理', '成员管理', '基础权限', '资源配额', '私有应用库'] },
  { title: '集群管理', icon: Network, items: ['多集群', '节点管理', '原生资源', '命名空间', '存储管理', '插件管理'] },
] as const;

const extensions = [
  { title: '企业增强', icon: ShieldCheck, items: ['应用备份', '操作审计', '精细权限', '个性化配置', '运行时管理', '资源超分'] },
  { title: '监控与安全', icon: Activity, items: ['监控中心', '告警中心', '日志中心', '安全中心', '源码扫描', '灾备恢复'] },
  { title: 'AI 与资源', icon: Cpu, items: ['AI助手', 'AI 大模型', 'GPU 管理', '数据库服务', '虚拟机'] },
  { title: '交付与集成', icon: GitBranch, items: ['流水线', '云原生应用商店', '应用集成门户'] },
] as const;

export default function PlatformSection() {
  return (
    <section id="platform" className={`${homeStyles.section} ${styles.section}`} aria-labelledby="platform-title">
      <div className={homeStyles.container}>
        <header className={`${homeStyles.sectionHead} ${styles.heading}`}>
          <div><span className={`${homeStyles.eyebrow} ${styles.kicker}`}>PLATFORM CAPABILITIES</span><h2 id="platform-title">Rainbond 平台功能全景</h2></div>
          <p>应用全生命周期管理，企业能力按需扩展。</p>
        </header>

        <div className={styles.diagram} aria-label="Rainbond 平台功能全景图">
          <div className={styles.layerRow} role="group" aria-labelledby="platform-access-title">
            <div className={styles.layerLabel}><span>L1</span><h3 id="platform-access-title">接入层</h3></div>
            <div className={styles.layerBody}>
            <ul className={styles.entries}>{entryPoints.map(({ title, icon: Icon }) => <li key={title}><Icon aria-hidden="true" />{title}</li>)}</ul>
            </div>
          </div>

          <div className={styles.layerRow} role="group" aria-labelledby="platform-core-title">
            <div className={styles.layerLabel}><span>L2</span><h3 id="platform-core-title">核心层</h3></div>
            <div className={`${styles.layerBody} ${styles.featureGrid}`}>
            {featureGroups.map(({ title, icon: Icon, items }) => (
              <article key={title} className={styles.featureGroup} aria-label={title}>
                <header><Icon aria-hidden="true" /><h4>{title}</h4></header>
                <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
            </div>
          </div>

          <div className={styles.layerRow} role="group" aria-labelledby="platform-extension-title">
            <div className={styles.layerLabel}><span>L3</span><h3 id="platform-extension-title">扩展层</h3><small>按需启用</small></div>
            <div className={`${styles.layerBody} ${styles.extensions}`} aria-label="企业与插件扩展">{extensions.map(({ title, items, icon: Icon }) => <article key={title} className={styles.featureGroup} aria-label={title}><header><Icon aria-hidden="true" /><h4>{title}</h4></header><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
