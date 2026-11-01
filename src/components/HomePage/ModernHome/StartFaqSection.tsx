import React, { useState } from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import { trackUmamiEvent } from '@src/utils/umami';
import { ArrowRight, Check, ChevronDown, CircleHelp, Copy, Cpu, PackageOpen, Server, Sparkles, TerminalSquare } from 'lucide-react';
import styles from './styles.module.css';

const paths = [
  ['我正在用 AI 编程', '让 Claude Code、Codex 部署当前项目', '/rainskills', Sparkles],
  ['我有一台服务器', '3 分钟安装 Rainbond，再部署首个应用', '/docs/quick-start/quick-install', Server],
  ['我要私有部署开源软件', '从应用市场选择一个真实软件', 'https://hub.rainbond.com/', PackageOpen],
  ['我要进入离线或信创环境', '先确认架构、网络与交付路径', '/offline-and-xinchuang', Cpu],
] as const;

const faqs = [
  ['Rainbond 和常见服务器部署工具的核心区别是什么？', '这些产品非常适合把应用快速部署到服务器。Rainbond 除了完成部署，更强调把多组件应用沉淀为可版本化、可升级、可跨环境交付的软件资产，适合复杂软件、客户现场和企业持续管理。'],
  ['不用 AI 编程工具还能使用吗？', '可以。AI 是新的低门槛入口，不改变源码、镜像、Docker Compose、Helm 和应用市场等原有部署方式。'],
  ['使用 Rainbond 必须先懂 Kubernetes 吗？', '不需要。日常操作以应用为中心完成；已有 Kubernetes 团队仍可接入现有集群，并在需要时管理原生资源。'],
  ['Rainbond 能否作为现有 Kubernetes 集群的应用平台？', '可以。Rainbond 可以管理现有 Kubernetes 集群，在其上提供应用构建、发布、网关、运维和交付能力。'],
  ['是否支持离线和信创环境？', '支持。可以面向离线网络、国产服务器和不同 CPU 架构准备平台与应用交付物，并持续维护升级路径。'],
] as const;

export default function StartFaqSection() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const copyCommand = async () => {
    try { await navigator.clipboard.writeText('npx --yes rainskills'); setCopied(true); trackUmamiEvent('install_command_copied', { module: 'home_start', command_type: 'rainskills', os_tab: 'all' }); window.setTimeout(() => setCopied(false), 1600); } catch (_) { setCopied(false); }
  };
  return <>
    <section id="start" className={`${styles.section} ${styles.startSection}`}><div className={`${styles.container} ${styles.startLayout}`}>
      <div className={styles.startCopy}><span className={styles.eyebrow}><TerminalSquare /> 现在开始</span><h2>从你手上的项目、软件或服务器开始</h2><p>不需要先完成平台学习。选择最符合当前状态的入口，目标都是得到第一个可访问结果。</p><div className={styles.commandBox}><span>使用 RainSkills，让 AI 编程工具部署当前项目</span><div><code>npx --yes rainskills</code><button type="button" onClick={copyCommand} aria-label="复制 RainSkills 安装命令">{copied ? <Check /> : <Copy />}</button></div></div></div>
      <div className={styles.startPaths}>{paths.map(([title, copy, to, Icon]) => <Link className={styles.startPath} to={to} key={title} eventName={to === '/docs/quick-start/quick-install' ? 'cta_install_clicked' : 'home_start_path_clicked'} eventProps={{ module: 'home_start', cta_text: title, target_path: to }}><span><Icon /></span><div><strong>{title}</strong><small>{copy}</small></div><ArrowRight /></Link>)}</div>
    </div></section>
    <section className={`${styles.section} ${styles.faqSection}`}><div className={`${styles.container} ${styles.faqLayout}`}><div><span className={styles.eyebrow}><CircleHelp /> 开始前的关键问题</span><h2>把边界说清楚</h2></div><div className={styles.faqList}>{faqs.map(([question, answer], index) => <div className={styles.faqItem} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => { if (openFaq !== index) trackUmamiEvent('home_faq_opened', { module: 'home_faq', question }); setOpenFaq(openFaq === index ? -1 : index); }}><span>{question}</span><ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
  </>;
}
