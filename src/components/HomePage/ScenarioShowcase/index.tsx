import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  GitBranch,
  Hammer,
  ListChecks,
  PackageOpen,
  Rocket,
  Search,
  Wrench,
} from 'lucide-react';
import Demo from '@src/components/HomePage/Demo';
import VideoProgressControls from '@src/components/HomePage/Demo/VideoProgressControls';
import styles from './styles.module.css';
import { trackUmamiEvent } from '@src/utils/umami';

const scenarios = [
  {
    key: 'git',
    eyebrow: '源码交付',
    title: 'Git 仓库上线',
    summary: '自动识别框架、完成构建并生成访问地址。',
    media: '/img/homepage/imagevideo/hero-app-deploy.png',
    steps: ['配置仓库地址', '代码框架检测', '源码构建部署', '生成访问地址'],
    stepIcons: [GitBranch, Search, Hammer, ExternalLink],
    videos: [
      'https://grstatic.tos-cn-beijing.volces.com/mp4/git仓库.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/检测.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/构建.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/访问.mp4',
    ],
    icon: GitBranch,
  },
  {
    key: 'ai-deploy',
    eyebrow: 'AI Agent',
    title: 'AI 部署项目',
    summary: '用一句话把当前全栈项目部署并验证上线。',
    media: '/img/homepage/imagevideo/hero-app-deploy.png',
    steps: ['读取项目', '生成计划', '构建部署', '获得地址'],
    stepIcons: [FileSearch, ListChecks, Rocket, CheckCircle2],
    videos: [
      'https://grstatic.tos-cn-beijing.volces.com/mp4/读取项目.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/生成计划.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/构建部署.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/获得地址.mp4',
    ],
    icon: Bot,
  },
  {
    key: 'market',
    eyebrow: '应用市场',
    title: '部署开源软件',
    summary: '把 Dify、RAGFlow、MaxKB 等部署到自己的环境。',
    media: '/img/homepage/imagevideo/hero-app-market.png',
    steps: ['安装开源软件', '构建部署软件', '运维操作', '访问地址'],
    stepIcons: [Download, Hammer, Wrench, ExternalLink],
    videos: [
      'https://grstatic.tos-cn-beijing.volces.com/mp4/安装开源软件.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/构建部署软件.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/运维操作.mp4',
      'https://grstatic.tos-cn-beijing.volces.com/mp4/访问地址.mp4',
    ],
    icon: PackageOpen,
  },
  {
    key: 'operations',
    eyebrow: '持续运维',
    title: 'AI 智能运维',
    summary: '查状态、读日志、修故障并执行日常运维。',
    icon: Wrench,
  },
] as const;

type ScenarioKey = (typeof scenarios)[number]['key'];
type PreviewScenario = Exclude<(typeof scenarios)[number], { key: 'operations' }>;

export default function ScenarioShowcase() {
  const [activeKey, setActiveKey] = useState<ScenarioKey>('git');
  const reduceMotion = useReducedMotion();
  const activeScenario = scenarios.find(item => item.key === activeKey) || scenarios[0];

  return (
    <section className={styles.section} aria-label="Rainbond 应用交付场景">
      <div className={styles.showcaseFrame}>
        <div className={styles.scenarioHeader}>
          <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
          <div className={styles.scenarioTabs} role="tablist" aria-label="选择 Rainbond 使用场景">
            {scenarios.map(scenario => {
              const Icon = scenario.icon;
              const isActive = scenario.key === activeKey;
              return (
                <button
                  key={scenario.key}
                  id={`scenario-tab-${scenario.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="scenario-panel"
                  className={clsx(styles.scenarioTab, isActive && styles.scenarioTabActive)}
                  onClick={() => { if (!isActive) trackUmamiEvent('home_scenario_selected', { module: 'home_scenarios', scenario: scenario.key, scenario_title: scenario.title }); setActiveKey(scenario.key); }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="scenario-active-pill"
                      className={styles.scenarioActivePill}
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className={styles.scenarioTabContent}>
                    <Icon aria-hidden="true" />
                    <strong>{scenario.title}</strong>
                  </span>
                </button>
              );
            })}
          </div>
          <span className={styles.scenarioStatus}><i />演示进行中</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeScenario.key}
            id="scenario-panel"
            role="tabpanel"
            aria-labelledby={`scenario-tab-${activeScenario.key}`}
            className={styles.scenarioPanel}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            {activeScenario.key === 'operations'
              ? <Demo embedded />
              : <ScenarioPreview scenario={activeScenario as PreviewScenario} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ScenarioPreview({ scenario }: { scenario: PreviewScenario }) {
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const currentStepRef = useRef(0);
  const scenarioVideos = 'videos' in scenario ? scenario.videos : null;

  useEffect(() => {
    currentStepRef.current = 0;
    setCurrentStep(0);
  }, [scenario.key]);

  useEffect(() => {
    Object.values(progressFillRefs.current).forEach(fill => {
      if (fill) fill.style.transform = 'scaleX(0)';
    });
    const updateProgressFrame = () => {
      const video = videoRef.current;
      const progressFill = progressFillRefs.current[String(currentStep)];
      if (video && progressFill && Number.isFinite(video.duration) && video.duration > 0) {
        const progress = Math.min(Math.max(video.currentTime / video.duration, 0), 1);
        progressFill.style.transform = `scaleX(${progress})`;
      }
      animationFrame = requestAnimationFrame(updateProgressFrame);
    };
    let animationFrame = requestAnimationFrame(updateProgressFrame);
    return () => cancelAnimationFrame(animationFrame);
  }, [currentStep]);

  useEffect(() => {
    if (scenarioVideos || currentStep >= scenario.steps.length - 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCurrentStep(step => {
      const nextStep = step + 1;
      currentStepRef.current = nextStep;
      return nextStep;
    }), 1600);
    return () => window.clearTimeout(timer);
  }, [currentStep, scenario.key, scenario.steps.length, scenarioVideos]);

  const handleStepChange = (step: number) => {
    currentStepRef.current = step;
    setCurrentStep(step);
  };

  const handleVideoEnded = (endedStep: number) => {
    if (currentStepRef.current !== endedStep) {
      return;
    }
    const nextStep = (endedStep + 1) % scenario.steps.length;
    currentStepRef.current = nextStep;
    setCurrentStep(nextStep);
  };

  return (
    <div className={styles.preview} key={scenario.key}>
      <div className={styles.previewMedia}>
        {scenarioVideos ? (
          <video
            ref={videoRef}
            key={scenarioVideos[currentStep]}
            src={scenarioVideos[currentStep]}
            aria-label={`${scenario.title}：${scenario.steps[currentStep]}`}
            autoPlay
            muted
            playsInline
            preload="metadata"
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onEnded={() => handleVideoEnded(currentStep)}
          />
        ) : (
          <img src={scenario.media} alt={`${scenario.title}产品界面`} />
        )}
      </div>
      <VideoProgressControls
        className={styles.previewSteps}
        label={`${scenario.title}流程`}
        items={scenario.steps.map((title, index) => ({ key: String(index), title, icon: scenario.stepIcons[index] }))}
        activeKey={String(currentStep)}
        onChange={key => handleStepChange(Number(key))}
        fillRef={(key, node) => { progressFillRefs.current[key] = node; }}
      />
    </div>
  );
}
