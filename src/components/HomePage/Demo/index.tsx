import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Tabs } from '@douyinfe/semi-ui';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const videoMap = {
  '1': 'https://static.goodrain.com/mp4/hero-app-deploy.mp4',
  '2': 'https://static.goodrain.com/mp4/hero-app-topology.mp4',
  '3': 'https://static.goodrain.com/mp4/hero-app-ops.mp4',
  '4': 'https://static.goodrain.com/mp4/hero-app-market.mp4',
  '5': 'https://static.goodrain.com/mp4/hero-platform.mp4',
};

const posterMap = {
  '1': '/img/homepage/imagevideo/hero-app-deploy.png',
  '2': '/img/homepage/imagevideo/hero-app-topology.png',
  '3': '/img/homepage/imagevideo/hero-app-ops.png',
  '4': '/img/homepage/imagevideo/hero-app-market.png',
  '5': '/img/homepage/imagevideo/hero-platform.png',
};

type DemoTabKey = keyof typeof videoMap;

const videoKeys = Object.keys(videoMap) as DemoTabKey[];

const descriptionMap: Record<DemoTabKey, string> = {
  '1': '从源码、容器镜像到 AI 应用，无需编写部署脚本，任意工作负载皆可一键极速上线。',
  '2': '微服务架构不再是黑盒。在全景画布上拖拽连线，像搭积木一样完成复杂的系统编排。',
  '3': '告别黑屏敲命令。从外网网关暴露、实时日志监控到实例弹性伸缩，在图形界面一站式掌控。',
  '4': '上百款开源应用与中间件触手可及，免去繁琐配置，点击即装、一键交付到任意集群。',
  '5': '集群接入、团队划分、权限分配，复杂的平台管理工作在可视化界面中化繁为简。',
};

export default function Demo() {
  const videoRefs = useRef<Partial<Record<DemoTabKey, HTMLVideoElement | null>>>({});
  const [activeKey, setActiveKey] = useState<DemoTabKey>('1');
  const [visibleKey, setVisibleKey] = useState<DemoTabKey>('1');
  const [loadedMap, setLoadedMap] = useState<Partial<Record<DemoTabKey, boolean>>>({});
  const [shouldPreloadOthers, setShouldPreloadOthers] = useState(false);

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

  useEffect(() => {
    if (loadedMap[activeKey] && activeKey !== visibleKey) {
      setVisibleKey(activeKey);
    }
  }, [activeKey, loadedMap, visibleKey]);

  useEffect(() => {
    if (!shouldPreloadOthers) {
      return;
    }

    videoKeys.forEach(key => {
      if (key === '1') {
        return;
      }

      const video = videoRefs.current[key];
      if (!video) {
        return;
      }

      video.preload = 'auto';
      if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        video.load();
      }
    });
  }, [shouldPreloadOthers]);

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
    if (key in videoMap) {
      setActiveKey(key as DemoTabKey);
    }
  };

  const handleVideoReady = useCallback(
    (key: DemoTabKey) => {
      markVideoLoaded(key);

      if (key === '1') {
        startBackgroundPreload();
      }
    },
    [markVideoLoaded, startBackgroundPreload],
  );

  return (
    <div className={styles.demo}>
      <div className={styles.bgSection}>
        <div className={styles.lf}></div>
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />

          <div className={styles.tabsWrapper}>
            <Tabs type="button" className={styles.tabs} activeKey={activeKey} onTabClick={handleTabChange}>
              <Tabs.TabPane tab="应用部署" itemKey="1" />
              <Tabs.TabPane tab="应用编排" itemKey="2" />
              <Tabs.TabPane tab="应用运维" itemKey="3" />
              <Tabs.TabPane tab="应用市场" itemKey="4" />
              <Tabs.TabPane tab="平台管理" itemKey="5" />
            </Tabs>
          </div>
        </div>
        <div className={styles.rt}></div>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.gradientBackground}>
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>Rainbond 的核心功能</h2>
          </div>

          <div className={styles.tabsWrapper}>
            <Tabs type="button" className={styles.tabs} activeKey={activeKey} onTabClick={handleTabChange}>
              <Tabs.TabPane tab="应用部署" itemKey="1" />
              <Tabs.TabPane tab="应用编排" itemKey="2" />
              <Tabs.TabPane tab="应用运维" itemKey="3" />
              <Tabs.TabPane tab="应用市场" itemKey="4" />
              <Tabs.TabPane tab="平台管理" itemKey="5" />
            </Tabs>
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
                  {descriptionMap[activeKey]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.videoWrapper}>
            <div className={styles.videoStage}>
              {videoKeys.map(key => (
                <video
                  key={key}
                  ref={node => {
                    videoRefs.current[key] = node;
                  }}
                  src={videoMap[key]}
                  loop
                  muted
                  playsInline
                  poster={posterMap[key]}
                  preload={key === '1' || shouldPreloadOthers ? 'auto' : 'none'}
                  className={`${styles.video} ${key === visibleKey ? styles.videoActive : styles.videoHidden}`}
                  onLoadedData={() => handleVideoReady(key)}
                  onCanPlay={() => handleVideoReady(key)}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
