import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type TreeLeaf = {
  prefix: string;
  branch: string;
  title: string;
  subtitle?: string;
  to: string;
};

const directPath: TreeLeaf = {
  prefix: '├──',
  branch: '有',
  title: '基于 Helm 安装',
  to: '/docs/installation/install-with-helm',
};

const guidedPaths: TreeLeaf[] = [
  {
    prefix: '    ├──',
    branch: '单机版',
    title: '快速安装',
    subtitle: 'Docker 单机',
    to: '/docs/quick-start/quick-install',
  },
  {
    prefix: '    ├──',
    branch: '生产多节点',
    title: '基于主机安装',
    to: '/docs/installation/multi-node-install',
  },
  {
    prefix: '    └──',
    branch: '离线环境',
    title: '离线安装',
    to: '/docs/installation/offline',
  },
];

function TreeLink({ prefix, branch, title, subtitle, to }: TreeLeaf): JSX.Element {
  return (
    <div className={styles.row}>
      <span className={styles.prefix}>{prefix}</span>
      <span className={styles.branch}>{branch}</span>
      <span className={styles.arrow}>→</span>
      <Link className={styles.link} to={to}>
        {title}
        {subtitle ? `（${subtitle}）` : ''}
      </Link>
    </div>
  );
}

export default function InstallationDecisionTree(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tree}>
        <div className={styles.question}>我有没有现成的 Kubernetes 集群？</div>
        <TreeLink {...directPath} />
        <div className={styles.row}>
          <span className={styles.prefix}>└──</span>
          <span className={styles.branch}>没有</span>
        </div>
        <div className={styles.children}>
          {guidedPaths.map((item) => (
            <TreeLink key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
