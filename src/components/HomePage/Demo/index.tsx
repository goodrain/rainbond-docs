import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from '@docusaurus/Head';
import {
  AppWindow,
  BrainCircuit,
  CheckCircle2,
  Database,
  GitBranch,
  Maximize2,
  Scaling,
  ServerCog,
  Wrench,
  X,
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

const workloadStories = [
  {
    key: 'business',
    title: '业务应用',
    description: '源码、镜像、Compose、Helm、YAML 都能部署，适合 Java、Node.js、Python、Go、前后端、微服务和企业自研系统。',
    icon: AppWindow,
    accent: '#0f6fff',
    accent2: '#5bd6ff',
    surface: '#eaf3ff',
    screenshot: {
      imageSrc: '/img/homepage/workloads/business.png',
    },
  },
  {
    key: 'ai',
    title: 'AI / 大模型',
    description: '把 AI 应用和模型服务部署进企业内网，支持 Dify、n8n、Qwen 和 DeepSeek 等 AI 应用与大模型服务。',
    icon: BrainCircuit,
    accent: '#12a594',
    accent2: '#8b5cf6',
    surface: '#e8f7f4',
    screenshot: {
      imageSrc: '/img/homepage/workloads/ai.png',
    },
  },
  {
    key: 'virtual-machine',
    title: '虚拟机类工作负载',
    description: '承接暂时无法容器化的存量系统，让传统系统、容器应用和云原生应用逐步进入同一套交付与运维入口。',
    icon: ServerCog,
    accent: '#64748b',
    accent2: '#0ea5e9',
    surface: '#eef2f7',
    screenshot: {
      imageSrc: '/img/homepage/workloads/virtual-machine.png',
    },
  },
] as const;

type WorkloadStoryKey = (typeof workloadStories)[number]['key'];

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type WorkloadStyle = React.CSSProperties & {
  '--workload-story-count'?: number;
  '--workload-track-index'?: number;
  '--workload-accent'?: string;
  '--workload-accent-2'?: string;
  '--workload-surface'?: string;
  '--visual-item-index'?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function WorkloadStory() {
  const workloadStoryRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const section = workloadStoryRef.current;
    if (!section || typeof window === 'undefined') {
      return;
    }

    const stickyTop = 72;
    const rect = section.getBoundingClientRect();
    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
    const nextProgress = clamp((stickyTop - rect.top) / scrollableDistance, 0, 1);
    const maxStoryIndex = workloadStories.length - 1;
    const nextActiveIndex = clamp(
      Math.round(nextProgress * maxStoryIndex),
      0,
      maxStoryIndex,
    );

    setActiveIndex(nextActiveIndex);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const scheduleFrame: (callback: FrameRequestCallback) => number =
      window.requestAnimationFrame?.bind(window) ??
      ((callback) => window.setTimeout(() => callback(Date.now()), 16));
    const cancelFrame: (handle: number) => void =
      window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout.bind(window);
    let frameId: number | null = null;

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = scheduleFrame(() => {
        frameId = null;
        updateScrollState();
      });
    };

    updateScrollState();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId !== null) {
        cancelFrame(frameId);
      }
    };
  }, [updateScrollState]);

  const handleWorkloadSelect = useCallback((index: number) => {
    const section = workloadStoryRef.current;
    setActiveIndex(index);

    if (!section || typeof window === 'undefined' || window.matchMedia('(max-width: 900px)').matches) {
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
    const maxStoryIndex = Math.max(workloadStories.length - 1, 1);
    const targetProgress = index / maxStoryIndex;
    window.scrollTo({
      top: sectionTop - 72 + scrollableDistance * targetProgress,
      behavior: 'smooth',
    });
  }, []);

  const closePreview = useCallback(() => {
    setPreviewIndex(null);
  }, []);

  useEffect(() => {
    if (previewIndex === null || typeof window === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePreview, previewIndex]);

  const snappedTrackIndex = activeIndex;
  const previewStory = previewIndex === null ? null : workloadStories[previewIndex];
  const storyStyle: WorkloadStyle = {
    '--workload-story-count': workloadStories.length,
  };
  const visualTrackStyle: WorkloadStyle = {
    '--workload-track-index': snappedTrackIndex,
  };

  return (
    <section
      ref={workloadStoryRef}
      className={styles.workloadStory}
      style={storyStyle}
      aria-labelledby="workload-story-title"
    >
      <div className={styles.workloadSticky}>
        <div className={styles.workloadLeft}>
          <h4 id="workload-story-title" className={styles.workloadTitle}>
            装好 Rainbond，企业常见工作负载统一交付
          </h4>
          <p className={styles.workloadLead}>
            不同来源、不同技术栈、不同现代化阶段的应用，都可以逐步进入同一套平台入口。
          </p>

          <div className={styles.workloadTabs} aria-label="企业工作负载类型">
            {workloadStories.map((story, index) => {
              const Icon = story.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={story.key}
                  type="button"
                  className={`${styles.workloadTab} ${isActive ? styles.workloadTabActive : ''}`}
                  onClick={() => handleWorkloadSelect(index)}
                  aria-current={isActive}
                >
                  <span className={styles.workloadTabIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.workloadTabCopy}>
                    <span className={styles.workloadTabTitle}>{story.title}</span>
                    <span className={styles.workloadTabDescription}>{story.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.workloadRight}>
          <div className={styles.workloadVisualFrame}>
            <div className={styles.workloadFrameTopbar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.workloadVisualViewport}>
              <div className={styles.workloadVisualTrack} style={visualTrackStyle}>
                {workloadStories.map((story, index) => {
                  const isActive = index === activeIndex;
                  const panelStyle: WorkloadStyle = {
                    '--workload-accent': story.accent,
                    '--workload-accent-2': story.accent2,
                    '--workload-surface': story.surface,
                  };

                  return (
                    <div
                      key={story.key as WorkloadStoryKey}
                      className={`${styles.workloadVisualPanel} ${isActive ? styles.workloadVisualPanelActive : ''}`}
                      style={panelStyle}
                    >
                      <div className={styles.visualSceneStage}>
                        <div className={styles.visualScreenshotStage}>
                          <button
                            type="button"
                            className={styles.visualScreenshotShell}
                            onClick={() => setPreviewIndex(index)}
                            aria-label={`放大查看${story.title}截图`}
                          >
                            <img
                              className={styles.visualScreenshotImage}
                              src={story.screenshot.imageSrc}
                              alt={story.title}
                              loading="lazy"
                            />
                            <span className={styles.visualScreenshotExpandCue} aria-hidden="true">
                              <Maximize2 />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewStory ? (
          <motion.div
            className={styles.workloadPreviewOverlay}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewStory.title}截图预览`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closePreview}
          >
            <motion.div
              className={styles.workloadPreviewDialog}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.workloadPreviewClose}
                onClick={closePreview}
                aria-label="关闭截图预览"
              >
                <X />
              </button>
              <img
                className={styles.workloadPreviewImage}
                src={previewStory.screenshot.imageSrc}
                alt={`${previewStory.title}截图放大预览`}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
            <h2 className={styles.sectionTitle}>让 AI 替你部署、排错、运维</h2>
            <p className={styles.sectionSubtitle}>
              只用自然语言描述需求，RainAgent 会自动查状态、读日志、定位问题，并在你确认后执行操作。
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
