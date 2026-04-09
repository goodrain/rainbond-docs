import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import InstallHub from '@src/components/Docs/InstallHub';
import styles from './styles.module.css';

export default function InstallHubPage(): JSX.Element {
  const title = '安装总入口 - Rainbond';
  const description = '先选择正确安装路径，再开始部署 Rainbond。涵盖体验安装、主机安装、Kubernetes 安装、多集群、离线和信创路径。';

  return (
    <Layout wrapperClassName={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Rainbond 安装总入口, Rainbond 安装路径, 体验安装, 主机安装, Kubernetes 安装, 离线安装, 信创安装" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <InstallHub />
        </div>
      </main>
    </Layout>
  );
}
