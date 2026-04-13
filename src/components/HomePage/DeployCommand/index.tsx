import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { Tabs } from '@douyinfe/semi-ui';
import { IconGlobe, IconServer } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

const deploymentHighlights = [
  { label: '交付方式', value: '一条命令完成安装' },
  { label: '访问入口', value: '浏览器打开 http://您的IP:7070' },
  { label: '下一步', value: '跟随快速入门部署首个应用' },
];

export default function DeployCommand() {
  const { TabPane } = Tabs;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const updateIsMobile = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile);
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.panel}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className={styles.backdrop} aria-hidden="true">
          <span className={styles.orbPrimary}></span>
          <span className={styles.orbSecondary}></span>
          <span className={styles.gridGlow}></span>
        </div>

        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerMain}>
                <span className={styles.eyebrow}>PRIVATE DEPLOYMENT</span>
                <h2 className={styles.title}>准备好开始了吗？</h2>
                <p className={styles.subtitle}>
                  让 Rainbond 部署在你的基础设施里。几分钟内把应用平台交到团队手里。
                </p>
                <div className={styles.actions}>
                  <TrackedLink
                    to="/docs/quick-start/quick-install"
                    className={styles.primaryButton}
                    eventName="cta_install_clicked"
                    eventProps={{
                      module: 'home_deploy_command',
                      cta_text: '立即私有化部署',
                      target_path: '/docs/quick-start/quick-install',
                    }}>
                    立即私有化部署
                  </TrackedLink>
                  <TrackedLink
                    to="/docs/quick-start/getting-started"
                    className={styles.secondaryLink}
                    appendSourcePageParam>
                    查看快速入门
                  </TrackedLink>
                </div>
              </div>

              <div className={styles.infoPanel}>
                <div className={styles.infoPanelHeader}>
                  <span className={styles.infoPanelTitle}>DEPLOYMENT SNAPSHOT</span>
                  <span className={styles.infoPanelStatus}>READY</span>
                </div>
                <div className={styles.infoList}>
                  {deploymentHighlights.map((item) => (
                    <div key={item.label} className={styles.infoItem}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={styles.infoValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.consoleShell}>
              <div className={styles.consoleHeader}>
                <div className={styles.consoleDots} aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className={styles.commandContainer}>
                <div className={styles.commandWrapper}>
                  {/* <Tabs tabPosition={isMobile ? 'top' : 'left'}>
                    <TabPane tab={<span><IconServer />Linux & MacOS</span>} itemKey="1"> */}
                      <div className={styles.commandText}>在您的终端执行以下命令：</div>
                      <CodeBlock language="bash" className={styles.commandCode}>
                        {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
                      </CodeBlock>
                      <div className={styles.commandFooter}>
                        <div className={styles.commandText}>
                          安装完成后，在浏览器输入<span className={styles.inlineCode}>http://您的IP:7070</span>访问 Rainbond UI。
                        </div>
                        <div className={styles.commandLinkRow}>
                          <span className={styles.commandTip}>推荐继续完成初始化引导</span>
                          <TrackedLink
                            to="/docs/quick-start/getting-started"
                            className={styles.commandLink}
                            appendSourcePageParam>
                            前往快速入门
                          </TrackedLink>
                        </div>
                      </div>
                    {/* </TabPane>
                  </Tabs> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
