import React from 'react';
import Link from '@docusaurus/Link';
import styles from './compareHomeDirectory.module.css';

const capabilities = [
  {
    name: 'RainSkills',
    title: '让 AI 编码工具完成应用部署',
    description: '在 Codex、Claude Code 等工具中，结合当前项目识别组件与依赖，部署到 Rainbond，并读取构建和运行日志，继续排查问题、验证访问结果。',
    href: '/docs/ai/rainskills',
    linkLabel: '了解 AI 开发部署',
  },
  {
    name: 'RainAgent',
    title: '在控制台用自然语言排障运维',
    description: '结合应用状态、日志、事件和当前用户权限，辅助检查启动失败、访问异常及配置问题；涉及运行状态变更时，先展示审批确认，再执行操作。',
    href: '/docs/ai/rainagent',
    linkLabel: '了解 AI 运维助手',
  },
  {
    name: 'Rainbond 大模型',
    title: '部署和管理自己的模型服务',
    description: '通过大模型服务插件管理模型资产，创建 CPU 或 GPU 推理实例，查看运行状态，并通过 OpenAI 兼容接口供 Dify、自研 AI 应用和业务系统调用。',
    href: '/docs/ai/rainbond-llm',
    linkLabel: '了解大模型服务管理',
  },
];

export default function CompareAiCapabilities(): JSX.Element {
  return (
    <section id="rainbond-ai-capabilities" className={styles.section} aria-labelledby="rainbond-ai-title">
      <div className={styles.sectionHead}>
        <h2 id="rainbond-ai-title" className={styles.sectionTitle}>AI 驱动：从开发部署到日常运维</h2>
        <p className={styles.sectionDesc}>
          Rainbond 是一款不用懂 Kubernetes 的开源容器平台。在应用部署与交付能力之上，AI 还能帮助团队完成部署、排障和运维，并管理应用所需的大模型服务。
        </p>
      </div>
      <div className={styles.journeyGrid}>
        {capabilities.map((item) => (
          <Link key={item.name} className={styles.linkCard} to={item.href}>
            <span className={styles.cardTag}>{item.name}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.cardLinkLabel}>{item.linkLabel} →</span>
          </Link>
        ))}
      </div>
      <p className={styles.sectionDesc}>
        对比 AI 能力时，可以用同一个项目验证：能否从代码完成部署、结合运行日志排障、在变更前确认权限，以及接入自己的模型服务。请结合各平台实际版本、扩展和模型配置逐项验证。
        {' '}<Link to="/solutions/ai-private-deployment">查看 AI 应用与大模型私有化方案 →</Link>
      </p>
    </section>
  );
}
