import React from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import { trackUmamiEvent } from '@src/utils/umami';
import {
  ArrowDown,
  ArrowRight,
  Bot,
  GitBranch,
  Network,
  PackageOpen,
  Server,
} from 'lucide-react';
import styles from './styles.module.css';

const paths = [
  {
    title: 'AI 编程项目',
    description: '让 Claude Code、Codex 把当前全栈项目部署上线。',
    action: '用 RainSkills 部署',
    href: '/docs/quick-start/ai-project',
    icon: Bot,
  },
  {
    title: '开源软件',
    description: '以 Dify 为例，从应用市场安装到访问验证。',
    action: '查看 Dify 安装实操',
    href: '/docs/quick-start/open-source',
    icon: PackageOpen,
  },
  {
    title: 'Git 仓库',
    description: '填写示例仓库地址，完成自动构建并打开应用。',
    action: '查看 Git 源码部署实操',
    href: '/docs/quick-start/git-project',
    icon: GitBranch,
  },
  {
    title: '信创服务器',
    description: '以鲲鹏 / 麒麟 V10 为例，在线完成单节点安装。',
    action: '查看在线单节点安装',
    href: '/docs/quick-start/xinchuang-single-node',
    icon: Server,
  },
] as const;

export default function EntryPaths() {
  return (
    <section className={styles.section} aria-labelledby="entry-paths-title">
      <div className={styles.container}>
        <div className={styles.introRow}>
          <p id="entry-paths-title">
            <strong>四种入口，同一个成功标准：</strong>
            先得到一个真实可访问、可继续运维的应用。
          </p>
          <span>选择最短路径 <ArrowDown aria-hidden="true" /></span>
        </div>

        <div className={styles.pathGrid}>
          {paths.map(path => {
            const Icon = path.icon;
            return (
              <article className={styles.pathCard} key={path.title}>
                <Icon aria-hidden="true" />
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <Link className={styles.pathAction} to={path.href} eventName="home_entry_clicked" eventProps={{ module: 'home_entry_paths', entry: path.title, cta_text: path.action, target_path: path.href }}>{path.action} <ArrowRight aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>

        <aside className={styles.platformRoute}>
          <Network aria-hidden="true" />
          <div>
            <strong>正在评估企业容器平台？</strong>
            <p>直接查看 Kubernetes 架构、多集群管理、应用治理、离线部署与迁移方式。</p>
          </div>
          <div className={styles.platformActions}>
            <a href="#platform" onClick={() => trackUmamiEvent('home_platform_clicked', { module: 'home_entry_paths', cta_text: '评估平台能力', target_path: '/#platform' })}>评估平台能力 <ArrowRight aria-hidden="true" /></a>
            <Link to="/enterprise_server" eventName="home_poc_clicked" eventProps={{ module: 'home_entry_paths', cta_text: '申请 POC', target_path: '/enterprise_server' }}>申请 POC</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
