import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Button } from '@douyinfe/semi-ui';
import Link from '@docusaurus/Link';
import { IconCloud, IconDownload, IconServer, IconGlobe } from '@douyinfe/semi-icons';
import CodeBlock from '@theme/CodeBlock';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

export default function Home() {

  return (
    <div className={clsx('container', styles.container)}>
      <div className={clsx(styles.hero_title, 'row')}>
        <div className='col col--12'>
          <p className={styles.hero_title_one}>无需学习 Kubernetes</p>
          <p className={styles.hero_title_two}>像管理手机APP一样管理企业应用</p>
          {/* <div className={styles.hero_title_three_div}>
            <p className={styles.hero_title_three}>Rainbond = 手机级应用管理体验 + 原生 Kubernetes 能力 + 私有化部署特性</p>
          </div> */}
          {/* <p className={styles.hero_title_four}>Rainbond 是一个云原生应用管理平台，100% 兼容 Kubernetes API，100% 开源。支持国产化信创，深度适配私有部署，轻松管理容器化应用，让企业应用管理如手机 APP 操作般简单。</p> */}
        </div>
      </div>
      {/* 按钮区块 */}
      <div className={clsx(styles.hero_button, 'row')}>
        <div className='col col--12'>
          <Link to="/docs/quick-start/quick-install">
            <Button theme='solid' type='primary' icon={<IconDownload />} size='large' className={clsx(styles.hero_button_style, styles.hero_button_style_left)}>
              下载安装
            </Button>
          </Link>
          <Link to="https://run.rainbond.com/#/user/login?link=rainbond">
            <Button theme='outline' type='tertiary' icon={<IconCloud />} size='large' className={styles.hero_button_style}>
              免费试用
            </Button>
          </Link>
        </div>
      </div>
      {/* 统计信息横向排列，按钮下方 */}
      <div className={styles.hero_stats_row}>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <span>Github star 5k+</span>
        </div>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>下载安装 1M+</span>
        </div>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>生产用户 5000+</span>
        </div>
      </div>
      <div className={styles.command_container}>
        <div className={styles.command_wrapper}>
          <Tabs tabPosition="left">
            <TabPane tab={ <span><IconServer />Linux & MacOS</span>} itemKey="1">
              <div className={styles.command_text}>在您的终端执行以下命令：</div>
              <CodeBlock language="bash" className={styles.command_code}>
                {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
              </CodeBlock>
              <div className={styles.command_text}>10 分钟后打开浏览器，输入<span className={styles.inline_code}>http://您的IP:7070</span>访问 Rainbond UI。跟随<Link to="/docs/quick-start/getting-started">快速入门</Link>部署首个应用。</div>
            </TabPane>
            <TabPane tab={ <span><IconGlobe />Windows</span>} itemKey="2"> 
              <div className={styles.command_text}>在您的 PowerShell 执行以下命令：</div>
              <CodeBlock language="powershell" className={styles.command_code}>
                  {`Invoke-WebRequest "https://get.rainbond.com/install-dind.ps1" -o install-dind.ps1 ; ./install-dind.ps1`}
              </CodeBlock>
              <div className={styles.command_text}>10 分钟后打开浏览器，输入<span className={styles.inline_code}>http://您的IP:7070</span>访问 Rainbond UI。跟随<Link to="/docs/quick-start/getting-started">快速入门</Link>部署首个应用。</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}