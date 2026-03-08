import React, { useRef, useEffect, useState } from 'react';
import { Tabs } from '@douyinfe/semi-ui';
import styles from './styles.module.css';

const videoMap = {
  '1': 'https://static.goodrain.com/mp4/hero-app-deploy.mp4',
  '2': 'https://static.goodrain.com/mp4/hero-app-topology.mp4',
  '3': 'https://static.goodrain.com/mp4/home-page-intro.mp4',
};

const descriptionMap = {
  '1': '从源码、容器镜像到 AI 大模型，无需编写部署脚本，任意工作负载皆可一键极速上线。',
  '2': '微服务架构不再是黑盒。在全景画布上拖拽连线，像搭积木一样完成复杂的系统编排。',
  '3': '告别黑屏敲命令。从外网网关暴露、实时日志监控到实例弹性伸缩，在图形界面一站式掌控。',
};

export default function Demo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    if (videoRef.current) {
      // 强制自动播放并禁用所有控制
      videoRef.current.play().catch(err => console.log('Auto-play prevented:', err));

      // 禁用右键菜单
      const preventContextMenu = (e: MouseEvent) => e.preventDefault();
      videoRef.current.addEventListener('contextmenu', preventContextMenu as any);

      // 禁用暂停
      const forcePlay = () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      };
      videoRef.current.addEventListener('pause', forcePlay);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('contextmenu', preventContextMenu as any);
          videoRef.current.removeEventListener('pause', forcePlay);
        }
      };
    }
  }, [activeKey]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.demo}>
      {/* 背景分割区域 */}
      <div className={styles.bgSection}>
        <div className={styles.lf}></div>
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />

          {/* Tabs 放在背景分割区域内 */}
          <div className={styles.tabsWrapper}>
            <Tabs 
              type="button" 
              className={styles.tabs} 
              activeKey={activeKey}
              onTabClick={handleTabChange}
            >
              <Tabs.TabPane tab="应用部署" itemKey="1" />
              <Tabs.TabPane tab="应用编排" itemKey="2" />
              <Tabs.TabPane tab="应用运维" itemKey="3" />
            </Tabs>
          </div>
        </div>
        <div className={styles.rt}></div>
      </div>

      {/* 视频区域 */}
      <div className={styles.videoContainer}>
        {/* macOS 风格渐变背景 - 包含 Tabs 和视频 */}
        <div className={styles.gradientBackground}>
          <div className={styles.tabsWrapper}>
            <Tabs 
              type="button" 
              className={styles.tabs} 
              activeKey={activeKey}
              onTabClick={handleTabChange}
            >
              <Tabs.TabPane tab="应用部署" itemKey="1" />
              <Tabs.TabPane tab="应用编排" itemKey="2" />
              <Tabs.TabPane tab="应用运维" itemKey="3" />
            </Tabs>
            <div className={styles.tabDescription}>
              {descriptionMap[activeKey]}
            </div>
          </div>

          {/* 视频内容 */}
          <video
            key={activeKey}
            ref={videoRef}
            src={videoMap[activeKey]}
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
          />
        </div>
      </div>
    </div>
  );
}
