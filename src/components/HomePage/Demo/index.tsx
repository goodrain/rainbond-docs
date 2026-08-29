import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from '@docusaurus/Head';
import {
  AppWindow,
  BrainCircuit,
  Boxes,
  Building2,
  CheckCircle2,
  Check,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Scaling,
  Server,
  ServerCog,
  WifiOff,
  Wrench,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const featureVideos = [
  {
    key: 'source',
    title: '源码部署',
    description: '从源码仓库到应用上线，Rainbond 自动识别语言、构建镜像并完成部署。',
    src: 'https://static.goodrain.com/mp4/源码部署.mp4',
    poster: '/img/homepage/imagevideo/hero-app-deploy.png',
    icon: GitBranch,
  },
  {
    key: 'database',
    title: '部署数据库',
    description: '应用与数据库一起编排，依赖关系、连接信息和访问策略统一管理。',
    src: 'https://static.goodrain.com/mp4/数据库部署.mp4',
    poster: '/img/homepage/imagevideo/hero-app-market.png',
    icon: Database,
  },
  {
    key: 'troubleshoot',
    title: '异常修复',
    description: '构建、运行、访问异常都能在界面中定位，减少排查链路里的反复切换。',
    src: 'https://static.goodrain.com/mp4/故障排错.mp4',
    poster: '/img/homepage/imagevideo/hero-app-ops.png',
    icon: Wrench,
  },
  {
    key: 'scale',
    title: '运维伸缩',
    description: '实例伸缩、资源调整和运行状态观察集中在一个操作入口里完成。',
    src: 'https://static.goodrain.com/mp4/伸缩.mp4',
    poster: '/img/homepage/imagevideo/hero-platform.png',
    icon: Scaling,
  },
  {
    key: 'authorize',
    title: '授权确认',
    description: '关键操作先确认再执行，让自动化保持可控、透明、可追溯。',
    src: 'https://static.goodrain.com/mp4/授权确认.mp4',
    poster: '/img/homepage/imagevideo/hero-app-topology.png',
    icon: CheckCircle2,
  },
] as const;

type DemoTabKey = (typeof featureVideos)[number]['key'];

const videoKeys = featureVideos.map(video => video.key);
const getNextVideoKey = (key: DemoTabKey) => {
  const currentIndex = videoKeys.indexOf(key);
  return videoKeys[(currentIndex + 1) % videoKeys.length];
};

const workloadGroups = [
  {
    key: 'ai-generated',
    title: 'AI 生成项目',
    details: ['Codex · Claude Code', '本地代码仓库'],
    icon: Code2,
  },
  {
    key: 'ai-open-source',
    title: 'AI 开源应用',
    details: ['Dify · RAGFlow · MaxKB', '100+ 一键部署应用'],
    icon: Boxes,
  },
  {
    key: 'model-inference',
    title: '模型与推理',
    details: ['大模型 · Embedding', 'OpenAI 兼容 API'],
    icon: BrainCircuit,
  },
  {
    key: 'business',
    title: '业务系统',
    details: ['前端 · API · 中间件', '数据库 · 定时任务'],
    icon: AppWindow,
  },
  {
    key: 'middleware',
    title: '生产级中间件',
    details: ['MySQL · Redis', 'Kafka · RabbitMQ'],
    icon: Database,
  },
  {
    key: 'virtual-machines',
    title: '虚拟机',
    details: ['Linux · Windows · qcow2', '存量系统统一纳管'],
    icon: ServerCog,
  },
] as const;

const platformCapabilities = ['RainSkills', 'RainAgent', '应用模型', '应用市场'] as const;

const runtimeTargets = [
  { title: '公有云', icon: Cloud },
  { title: '私有云', icon: Building2 },
  { title: 'Kubernetes', icon: Boxes },
  { title: '物理服务器', icon: Server },
  { title: '离线环境', icon: WifiOff },
] as const;

const architectureBenefits = [
  '代码与数据归你',
  '支持离线部署',
  '不锁定云厂商',
  '支持信创环境',
] as const;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function WorkloadStory() {
  return (
    <section
      className={styles.workloadStory}
      aria-labelledby="workload-story-title"
    >
      <div className={styles.workloadSticky}>
        <div className={styles.workloadHeaderShell}>
          <img className={styles.workloadHeaderPattern} src="/img/split-bg.png" alt="" />
          <div className={styles.workloadSliceHeader}>
            <h2 id="workload-story-title" className={styles.workloadTitle}>
              把整套 AI 应用栈，运行在自己的环境。
            </h2>
            <p className={styles.workloadLead}>
              不只是部署一个模型。AI 生成项目、开源应用、模型、业务系统、生产级中间件和虚拟机，都由 Rainbond 统一运行和管理。
            </p>
          </div>
        </div>

        <div className={styles.workloadArchitecture} aria-label="Rainbond 应用运行架构">
          <div className={styles.architectureLayer}>
            <span className={styles.architectureLayerLabel}>工作负载</span>
            <ul className={styles.workloadGrid} aria-label="工作负载">
              {workloadGroups.map(group => {
                const Icon = group.icon;

                return (
                  <li key={group.key} className={styles.workloadCard}>
                    <span className={styles.workloadCardIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <strong>{group.title}</strong>
                    <span className={styles.workloadCardDetails}>
                      {group.details.map(detail => <span key={detail}>{detail}</span>)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.platformBand}>
            <div className={styles.platformIdentity}>
              <span className={styles.platformIcon} aria-hidden="true">
                <Layers3 />
              </span>
              <span className={styles.platformCopy}>
                <strong>Rainbond 开源应用运行平台</strong>
                <span>统一部署、运维、升级、交付</span>
              </span>
            </div>
            <ul className={styles.platformTags} aria-label="平台能力">
              {platformCapabilities.map(capability => <li key={capability}>{capability}</li>)}
            </ul>
          </div>

          <div className={styles.architectureLayer}>
            <span className={styles.architectureLayerLabel}>运行环境</span>
            <ul className={styles.runtimeGrid} aria-label="运行环境">
              {runtimeTargets.map(target => {
                const Icon = target.icon;

                return (
                  <li key={target.title} className={styles.runtimeCard}>
                    <Icon aria-hidden="true" />
                    <span>{target.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className={styles.architectureBenefits} aria-label="平台价值">
            {architectureBenefits.map(benefit => (
              <li key={benefit}>
                <Check aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Demo() {
  const videoRefs = useRef<Partial<Record<DemoTabKey, HTMLVideoElement | null>>>({});
  const progressFillRefs = useRef<Partial<Record<DemoTabKey, HTMLSpanElement | null>>>({});
  const [activeKey, setActiveKey] = useState<DemoTabKey>('source');
  const [visibleKey, setVisibleKey] = useState<DemoTabKey>('source');
  const [loadedMap, setLoadedMap] = useState<Partial<Record<DemoTabKey, boolean>>>({});
  const [preparedVideoMap, setPreparedVideoMap] = useState<Partial<Record<DemoTabKey, boolean>>>({
    source: true,
  });
  const [shouldPreloadOthers, setShouldPreloadOthers] = useState(false);
  const progressFrameRef = useRef<number | null>(null);

  const prepareVideo = useCallback((key: DemoTabKey) => {
    setPreparedVideoMap(prev => {
      if (prev[key]) {
        return prev;
      }

      return {
        ...prev,
        [key]: true,
      };
    });
  }, []);

  const markVideoLoaded = useCallback((key: DemoTabKey) => {
    setLoadedMap(prev => {
      if (prev[key]) {
        return prev;
      }

      return {
        ...prev,
        [key]: true,
      };
    });
  }, []);

  const startBackgroundPreload = useCallback(() => {
    setShouldPreloadOthers(true);
  }, []);

  const setProgressFill = useCallback((key: DemoTabKey, progress: number) => {
    const progressFill = progressFillRefs.current[key];
    if (progressFill) {
      progressFill.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 100) / 100})`;
    }
  }, []);

  const switchVideo = useCallback((key: DemoTabKey) => {
    prepareVideo(key);
    prepareVideo(getNextVideoKey(key));
    setProgressFill(key, 0);
    setActiveKey(key);
    setVisibleKey(key);
  }, [prepareVideo, setProgressFill]);

  const getVideoPreloadMode = useCallback((key: DemoTabKey): HTMLVideoElement['preload'] => {
    if (key === visibleKey || key === getNextVideoKey(visibleKey)) {
      return 'auto';
    }

    if (shouldPreloadOthers && preparedVideoMap[key]) {
      return 'metadata';
    }

    return 'none';
  }, [preparedVideoMap, shouldPreloadOthers, visibleKey]);

  useEffect(() => {
    if (loadedMap[activeKey] && activeKey !== visibleKey) {
      setVisibleKey(activeKey);
    }
  }, [activeKey, loadedMap, visibleKey]);

  useEffect(() => {
    prepareVideo(visibleKey);
    prepareVideo(getNextVideoKey(visibleKey));
  }, [prepareVideo, visibleKey]);

  useEffect(() => {
    if (!shouldPreloadOthers || typeof window === 'undefined') {
      return undefined;
    }

    const idleWindow = window as IdleWindow;
    const timeoutIds: Array<ReturnType<typeof window.setTimeout>> = [];
    const preloadRemainingVideos = () => {
      videoKeys.forEach((key, index) => {
        if (key === visibleKey || key === getNextVideoKey(visibleKey)) {
          return;
        }

        const timeoutId = window.setTimeout(() => {
          prepareVideo(key);
        }, index * 600);
        timeoutIds.push(timeoutId);
      });
    };

    let idleCallbackId: number | undefined;
    let fallbackTimeoutId: ReturnType<typeof window.setTimeout> | undefined;

    if (idleWindow.requestIdleCallback) {
      idleCallbackId = idleWindow.requestIdleCallback(preloadRemainingVideos, { timeout: 2500 });
    } else {
      fallbackTimeoutId = window.setTimeout(preloadRemainingVideos, 1500);
    }

    return () => {
      if (idleCallbackId !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleCallbackId);
      }
      if (fallbackTimeoutId !== undefined) {
        window.clearTimeout(fallbackTimeoutId);
      }
      timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId));
    };
  }, [prepareVideo, shouldPreloadOthers, visibleKey]);

  useEffect(() => {
    videoKeys.forEach(key => {
      const video = videoRefs.current[key];
      if (!video) {
        return;
      }

      if (key === visibleKey) {
        if (video.readyState >= 1) {
          try {
            video.currentTime = 0;
          } catch (error) {
            console.warn('Reset video progress failed:', error);
          }
        }

        video.play().catch(err => console.log('Auto-play prevented:', err));
        return;
      }

      video.pause();
      if (video.readyState >= 1) {
        try {
          video.currentTime = 0;
        } catch (error) {
          console.warn('Reset hidden video progress failed:', error);
        }
      }
    });
  }, [visibleKey]);

  useEffect(() => {
    const cleanups = videoKeys
      .map(key => {
        const video = videoRefs.current[key];
        if (!video) {
          return null;
        }

        const preventContextMenu = (e: MouseEvent) => e.preventDefault();
        video.addEventListener('contextmenu', preventContextMenu as any);

        return () => {
          video.removeEventListener('contextmenu', preventContextMenu as any);
        };
      })
      .filter(Boolean) as Array<() => void>;

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  const handleTabChange = (key: string) => {
    if (videoKeys.includes(key as DemoTabKey)) {
      switchVideo(key as DemoTabKey);
    }
  };

  const handleVideoReady = useCallback(
    (key: DemoTabKey) => {
      markVideoLoaded(key);

      if (key === 'source') {
        startBackgroundPreload();
      }
    },
    [markVideoLoaded, startBackgroundPreload],
  );

  const handleTimeUpdate = useCallback((key: DemoTabKey) => {
    const video = videoRefs.current[key];
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const progress = Math.min((video.currentTime / video.duration) * 100, 100);
    const progressFill = progressFillRefs.current[key];
    if (progressFill) {
      progressFill.style.transform = `scaleX(${progress / 100})`;
    }
  }, []);

  useEffect(() => {
    const updateProgressFrame = () => {
      handleTimeUpdate(visibleKey);
      progressFrameRef.current = requestAnimationFrame(updateProgressFrame);
    };

    progressFrameRef.current = requestAnimationFrame(updateProgressFrame);

    return () => {
      const animationFrameId = progressFrameRef.current;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [handleTimeUpdate, visibleKey]);

  const handleVideoEnded = useCallback((key: DemoTabKey) => {
    if (key !== visibleKey) {
      return;
    }

    const nextKey = getNextVideoKey(visibleKey);
    prepareVideo(nextKey);
    prepareVideo(getNextVideoKey(nextKey));
    setProgressFill(visibleKey, 100);
    setProgressFill(nextKey, 0);
    setActiveKey(nextKey);
    setVisibleKey(nextKey);
  }, [prepareVideo, setProgressFill, visibleKey]);

  const keepVideoPlaying = useCallback((key: DemoTabKey) => {
    const video = videoRefs.current[key];
    if (!video || key !== visibleKey || video.ended) {
      return;
    }

    video.play().catch(err => console.log('Resume video playback failed:', err));
  }, [visibleKey]);

  const activeVideo = featureVideos.find(video => video.key === activeKey) || featureVideos[0];

  return (
    <div className={styles.demo}>
      <Head>
        <link rel="preconnect" href="https://static.goodrain.com" />
        <link rel="dns-prefetch" href="https://static.goodrain.com" />
        <link rel="preload" as="video" href={featureVideos[0].src} type="video/mp4" />
      </Head>
      <div className={styles.bgSection}>
        <div className={styles.lf}></div>
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />
          <div className={styles.titleWrapper}>
            <h2 className={styles.sectionTitle}>让 AI 操作，也能看得见、控得住</h2>
            <p className={styles.sectionSubtitle}>
              部署、排错和运维过程实时呈现在控制台，涉及变更时由你确认后执行。
            </p>
          </div>
        </div>
        <div className={styles.rt}></div>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.gradientBackground}>
          <div className={styles.videoWrapper}>
            <div className={styles.videoStage}>
              {featureVideos.map(video => (
                <video
                  key={video.key}
                  ref={node => {
                    videoRefs.current[video.key] = node;
                  }}
                  src={preparedVideoMap[video.key] ? video.src : undefined}
                  muted
                  playsInline
                  poster={video.poster}
                  preload={getVideoPreloadMode(video.key)}
                  className={`${styles.video} ${video.key === visibleKey ? styles.videoActive : styles.videoHidden}`}
                  onLoadedData={() => handleVideoReady(video.key)}
                  onCanPlay={() => handleVideoReady(video.key)}
                  onTimeUpdate={() => handleTimeUpdate(video.key)}
                  onEnded={() => handleVideoEnded(video.key)}
                  onPause={() => keepVideoPlaying(video.key)}
                  controls={false}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                />
              ))}
            </div>
          </div>

          <div className={styles.moduleControls} aria-label="核心功能视频">
            {featureVideos.map(video => {
              const Icon = video.icon;

              return (
                <button
                  key={video.key}
                  type="button"
                  className={`${styles.moduleButton} ${video.key === activeKey ? styles.moduleButtonActive : ''}`}
                  onClick={() => handleTabChange(video.key)}
                  aria-current={video.key === activeKey}
                >
                  <span className={styles.moduleProgress} aria-hidden="true">
                    <span
                      ref={node => {
                        progressFillRefs.current[video.key] = node;
                      }}
                      className={styles.moduleProgressFill}
                    />
                  </span>
                  <span className={styles.moduleButtonContent}>
                    <Icon className={styles.moduleIcon} aria-hidden="true" />
                    <span className={styles.moduleButtonLabel}>{video.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.tabDescriptionWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={styles.tabDescription}
              >
                {activeVideo.description}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <WorkloadStory />
    </div>
  );
}
