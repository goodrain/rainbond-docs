import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ArrowDown,
  Bot,
  Boxes,
  Cloud,
  Cog,
  Database,
  GitBranch,
  Monitor,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
  Workflow,
} from 'lucide-react';
import styles from './styles.module.css';
import { trackUmamiEvent } from '@src/utils/umami';

const valueSteps = [
  {
    key: 'connect',
    number: '01',
    label: '软件接入',
  },
  {
    key: 'model',
    number: '02',
    label: '应用建模',
  },
  {
    key: 'deliver',
    number: '03',
    label: '版本交付',
  },
  {
    key: 'operate',
    number: '04',
    label: '持续运维',
  },
] as const;

type ValueStepKey = (typeof valueSteps)[number]['key'];

export default function UniqueValue() {
  const [activeKey, setActiveKey] = useState<ValueStepKey>('model');
  const [isPaused, setIsPaused] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const activeIndex = valueSteps.findIndex(step => step.key === activeKey);
  const activeStep = valueSteps[activeIndex] || valueSteps[0];

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % valueSteps.length;
      setActiveKey(valueSteps[nextIndex].key);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="unique-value-title">
      <div className={styles.intro}>
        <div>
          <span className={styles.kicker}>Rainbond 独特的价值</span>
          <h2 id="unique-value-title">一个应用模型，贯穿交付的每一层</h2>
        </div>
        <p>
          Rainbond 不只让容器运行起来。它把软件从来源、构建、拓扑到交付和运维组织成一个连续系统，最终沉淀为可持续复用的软件资产。
        </p>
      </div>

      <div
        ref={frameRef}
        className={clsx(styles.systemFrame, isPaused && styles.systemFramePaused)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={handleBlur}
      >
        <div className={styles.systemCanvas} data-active={activeStep.key} aria-label="Rainbond 应用交付体系">
          <span className={styles.scanLine} aria-hidden="true" />
          <div className={styles.agentRail}>
            <div className={styles.agentIdentity}>
              <Bot aria-hidden="true" />
              <div><strong>RainAgent 智能交付助手</strong><span>降低平台使用门槛，不替代平台本身</span></div>
            </div>
            <div className={styles.agentProcess}>
              <span>理解任务</span><i>→</i><span>生成部署计划</span><i>→</i><span>用户确认</span><i>→</i><span>调用 Rainbond 能力</span>
            </div>
            <b>可选智能入口</b>
          </div>

          <div className={styles.canvasLabels} aria-hidden="true">
            <span>标准输入</span><span>Rainbond 应用模型</span><span>持续交付能力</span>
          </div>

          <div className={styles.sourceRail}>
            <CapabilityItem icon={GitBranch} title="代码仓库" meta="GitHub / Gitee / GitLab" className={styles.sourceItem} />
            <CapabilityItem icon={Boxes} title="现有描述" meta="镜像 / Compose / Helm" className={styles.sourceItem} />
            <CapabilityItem icon={Store} title="开源软件" meta="应用市场 / 离线包" className={styles.sourceItem} />
            <CapabilityItem icon={Workflow} title="平台接口" meta="控制台 / API / CI 流程" className={styles.sourceItem} />
          </div>

          <ArrowDown className={styles.flowArrow} aria-hidden="true" />

          <div className={styles.modelCore}>
            <div className={styles.modelCoreHead}>
              <span><Boxes /></span>
              <div><small>RAM · Rainbond Application Model</small><strong>Rainbond 应用模型</strong></div>
              <b>v1.8.2</b>
            </div>
            <div className={styles.topologyCanvas} aria-label="Rainbond 多组件应用拓扑">
              <div className={styles.topologyBackdrop} aria-hidden="true" />
              <svg className={styles.topologyConnections} viewBox="0 0 480 300" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="topology-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#60a5fa" stopOpacity="0.32" />
                    <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#34d399" stopOpacity="0.42" />
                  </linearGradient>
                  <filter id="topology-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <g className={styles.connectionBase}>
                  <path id="route-gateway-web" d="M240 67 C204 82 145 98 103 132" />
                  <path id="route-gateway-api" d="M240 67 C240 88 240 106 240 132" />
                  <path id="route-gateway-mysql" d="M240 67 C286 82 344 99 377 132" />
                  <path id="route-web-api" d="M122 157 C158 148 193 148 216 157" />
                  <path id="route-api-mysql" d="M264 157 C300 148 337 148 358 157" />
                  <path id="route-api-worker" d="M230 182 C218 205 198 221 178 239" />
                  <path id="route-api-redis" d="M250 182 C264 204 287 221 302 239" />
                  <path id="route-mysql-redis" d="M383 182 C376 211 345 230 325 246" />
                </g>
                <g className={styles.connectionPulse}>
                  <path d="M240 67 C204 82 145 98 103 132" />
                  <path d="M240 67 C240 88 240 106 240 132" />
                  <path d="M240 67 C286 82 344 99 377 132" />
                  <path d="M122 157 C158 148 193 148 216 157" />
                  <path d="M264 157 C300 148 337 148 358 157" />
                  <path d="M230 182 C218 205 198 221 178 239" />
                  <path d="M250 182 C264 204 287 221 302 239" />
                  <path d="M383 182 C376 211 345 230 325 246" />
                </g>
                <g className={styles.flowParticles} filter="url(#topology-glow)">
                  <circle r="3"><animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#route-gateway-web" /></animateMotion></circle>
                  <circle r="3"><animateMotion dur="2.4s" begin="-.9s" repeatCount="indefinite"><mpath href="#route-gateway-api" /></animateMotion></circle>
                  <circle r="3"><animateMotion dur="3.1s" begin="-1.7s" repeatCount="indefinite"><mpath href="#route-gateway-mysql" /></animateMotion></circle>
                  <circle r="3"><animateMotion dur="2.2s" begin="-1.1s" repeatCount="indefinite"><mpath href="#route-api-worker" /></animateMotion></circle>
                  <circle r="3"><animateMotion dur="2.5s" begin="-.4s" repeatCount="indefinite"><mpath href="#route-api-redis" /></animateMotion></circle>
                </g>
              </svg>
              <GatewayNode />
              <TopologyNode className={styles.frontendNode} icon={Monitor} title="Web" meta="前端组件" tone="orange" />
              <TopologyNode className={styles.apiNode} icon={Boxes} title="API" meta="3 个实例" tone="blue" featured />
              <TopologyNode className={styles.databaseNode} icon={Database} title="MySQL" meta="持久化" tone="green" />
              <TopologyNode className={styles.workerNode} icon={Cog} title="Worker" meta="异步任务" tone="violet" />
              <TopologyNode className={styles.redisNode} icon={Database} title="Redis" meta="缓存" tone="red" />
            </div>
            <div className={styles.modelCoreStats}>
              <span><small>依赖关系</small><strong>8 条已连接</strong></span>
              <span><small>配置与数据</small><strong>随应用管理</strong></span>
              <span><small>运行状态</small><strong>全部正常</strong></span>
            </div>
          </div>

          <div className={styles.capabilityGrid}>
            <CapabilityItem icon={PackageCheck} title="版本化软件包" meta="组件、配置、依赖一起保存" className={styles.capabilityItem} />
            <CapabilityItem icon={RotateCcw} title="安装与升级" meta="跨环境升级、回滚" className={styles.capabilityItem} />
            <CapabilityItem icon={Truck} title="客户现场交付" meta="在线、内网、完全离线" className={styles.capabilityItem} />
            <CapabilityItem icon={ShieldCheck} title="企业统一治理" meta="权限、验收、操作记录" className={styles.capabilityItem} />
          </div>

          <div className={styles.foundationRail}>
            <span className={styles.foundationLabel}>运行基础设施</span>
            <strong>Kubernetes</strong>
            <div className={styles.foundationTargets}>
              <span><i />已有集群</span><span><i />裸金属服务器</span><span><i />私有云</span><span><i />信创与离线环境</span>
            </div>
          </div>
        </div>

        <div className={styles.stepTabs} role="tablist" aria-label="Rainbond 交付流程">
          {valueSteps.map(step => (
            <button
              key={step.key}
              id={`value-tab-${step.key}`}
              type="button"
              role="tab"
              aria-selected={step.key === activeKey}
              className={clsx(styles.stepTab, step.key === activeKey && styles.stepTabActive)}
              onClick={() => { if (step.key !== activeKey) trackUmamiEvent('home_value_step_selected', { module: 'home_unique_value', step: step.key, step_title: step.label }); setActiveKey(step.key); }}
            >
              <span>{step.number}</span>
              <strong>{step.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.modelDifference} aria-label="Rainbond 与普通部署工具的结果差异">
        <div>
          <span>普通部署工具</span>
          <strong>得到一个正在运行的容器</strong>
          <p>继续升级、迁移、交付时，仍要重新整理脚本、配置和依赖。</p>
        </div>
        <div className={styles.rainbondDifference}>
          <span>Rainbond</span>
          <strong>得到一套可持续交付的软件资产</strong>
          <p>部署结果天然可以版本化、安装、升级、回滚并迁移到客户环境。</p>
        </div>
      </div>
    </section>
  );
}

function CapabilityItem({ className, icon: Icon, title, meta }) {
  return (
    <div className={className}>
      <Icon aria-hidden="true" />
      <span><strong>{title}</strong><small>{meta}</small></span>
    </div>
  );
}

function GatewayNode() {
  return (
    <span className={styles.gatewayNode}>
      <span className={styles.gatewayCloud}>
        <Cloud aria-hidden="true" />
        <i aria-hidden="true" />
      </span>
      <span><strong>网关</strong><small>HTTPS / TCP</small></span>
    </span>
  );
}

function TopologyNode({ className, icon: Icon, title, meta, tone, featured = false }) {
  return (
    <span
      className={clsx(styles.topologyNode, className, featured && styles.topologyNodeFeatured)}
      data-tone={tone}
    >
      <span className={styles.hexagon}>
        <svg viewBox="0 0 100 112" aria-hidden="true">
          <polygon className={styles.hexagonHalo} points="50,3 95,29 95,83 50,109 5,83 5,29" />
          <polygon className={styles.hexagonFace} points="50,9 90,32 90,80 50,103 10,80 10,32" />
        </svg>
        <span className={styles.hexagonContent}>
          <i aria-hidden="true" />
          <Icon aria-hidden="true" />
        </span>
      </span>
      <span className={styles.topologyNodeLabel}><strong>{title}</strong><small>{meta}</small></span>
    </span>
  );
}
