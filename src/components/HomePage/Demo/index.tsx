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
    description: '源码、镜像、Compose、Helm、YAML 都能部署。',
    icon: AppWindow,
    accent: '#0f6fff',
    accent2: '#5bd6ff',
    surface: '#eaf3ff',
    media: {
      videoSrc: 'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/业务应用.mp4',
    },
  },
  {
    key: 'ai',
    title: 'AI / 大模型',
    description: '把 AI 应用和模型服务部署进企业内网。',
    icon: BrainCircuit,
    accent: '#12a594',
    accent2: '#8b5cf6',
    surface: '#e8f7f4',
    media: {
      videoSrc: 'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/AI大模型.mp4',
    },
  },
  {
    key: 'middleware',
    title: '生产级中间件',
    description: '数据库、缓存、消息队列不再散落各处。',
    icon: Database,
    accent: '#2563eb',
    accent2: '#22c55e',
    surface: '#eef6ff',
    media: {
      videoSrc: 'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/数据库.mp4',
    },
  },
  {
    key: 'virtual-machine',
    title: '虚拟机类工作负载',
    description: '承接暂时无法容器化的存量系统。',
    icon: ServerCog,
    accent: '#64748b',
    accent2: '#0ea5e9',
    surface: '#eef2f7',
    media: {
      videoSrc: 'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/部署虚拟机.mp4',
    },
  },
] as const;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type WorkloadStyle = React.CSSProperties & {
  '--workload-story-count'?: number;
  '--workload-accent'?: string;
  '--workload-accent-2'?: string;
  '--workload-surface'?: string;
};

function WorkloadStory() {
  const workloadVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleWorkloadSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleWorkloadVideoEnded = useCallback((index: number) => {
    if (previewIndex !== null) {
      return;
    }

    setActiveIndex(currentIndex => {
      if (currentIndex !== index) {
        return currentIndex;
      }

      return (currentIndex + 1) % workloadStories.length;
    });
  }, [previewIndex]);

  const closePreview = useCallback(() => {
    setPreviewIndex(null);
  }, []);

  useEffect(() => {
    workloadVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeIndex && previewIndex === null) {
        try {
          video.currentTime = 0;
        } catch (error) {
          console.warn('Reset workload video progress failed:', error);
        }

        video.play().catch(err => console.log('Workload video autoplay prevented:', err));
        return;
      }

      video.pause();
      try {
        video.currentTime = 0;
      } catch (error) {
        console.warn('Reset hidden workload video failed:', error);
      }
    });
  }, [activeIndex, previewIndex]);

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

  const activeStory = workloadStories[activeIndex];
  const previewStory = previewIndex === null ? null : workloadStories[previewIndex];
  const storyStyle: WorkloadStyle = {
    '--workload-story-count': workloadStories.length,
  };

  return (
    <section
      className={styles.workloadStory}
      style={storyStyle}
      aria-labelledby="workload-story-title"
    >
      <div className={styles.workloadSticky}>
        <div className={styles.workloadHeaderShell}>
          <img className={styles.workloadHeaderPattern} src="/img/split-bg.png" alt="" />
          <div className={styles.workloadSliceHeader}>
            <h4 id="workload-story-title" className={styles.workloadTitle}>
              企业常见工作负载统一交付
            </h4>
            <p className={styles.workloadLead}>
              从业务应用、AI 应用到存量虚拟机，统一进入 Rainbond 的交付和运维链路。
            </p>
          </div>
        </div>

        <div className={styles.workloadFusionStage}>
          <div className={styles.workloadTimeline} aria-label="工作负载来源">
            {workloadStories.map((story, index) => {
              const Icon = story.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={story.key}
                  type="button"
                  className={`${styles.workloadTimelineItem} ${isActive ? styles.workloadTimelineItemActive : ''}`}
                  onClick={() => handleWorkloadSelect(index)}
                  aria-current={isActive}
                >
                  <span className={styles.workloadTimelineMarker} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.workloadTimelineContent}>
                    <span className={styles.workloadTimelineTitle}>
                      <Icon aria-hidden="true" />
                      {story.title}
                    </span>
                    <span className={styles.workloadTimelineDescription}>{story.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.workloadMediaViewport}
            onClick={() => setPreviewIndex(activeIndex)}
            aria-label={`放大查看${activeStory.title}演示`}
          >
            {workloadStories.map((story, index) => {
              const isActive = index === activeIndex;

              return (
                <video
                  key={story.key}
                  ref={node => {
                    workloadVideoRefs.current[index] = node;
                  }}
                  className={`${styles.workloadViewportMedia} ${isActive ? styles.workloadViewportMediaActive : styles.workloadViewportMediaHidden}`}
                  src={story.media.videoSrc}
                  aria-label={`${story.title}演示视频`}
                  muted
                  playsInline
                  autoPlay={isActive && previewIndex === null}
                  preload={isActive ? 'auto' : 'metadata'}
                  onEnded={() => handleWorkloadVideoEnded(index)}
                />
              );
            })}
            <span className={styles.workloadMediaExpandCue} aria-hidden="true">
              <Maximize2 />
            </span>
            <span className={styles.workloadViewportProgress} aria-hidden="true">
              <span style={{ transform: `translateX(${activeIndex * 100}%)` }} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {previewStory ? (
          <motion.div
            className={styles.workloadPreviewOverlay}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewStory.title}演示预览`}
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
                aria-label="关闭演示预览"
              >
                <X />
              </button>
              <video
                className={styles.workloadPreviewMedia}
                src={previewStory.media.videoSrc}
                aria-label={`${previewStory.title}演示视频放大预览`}
                controls
                autoPlay
                muted
                loop
                playsInline
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
