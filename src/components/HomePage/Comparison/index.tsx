import React from 'react';
import clsx from 'clsx';
import { Tag } from '@douyinfe/semi-ui';
import {
  IconCheckCircleStroked,
  IconUserGroup,
  IconLightningStroked,
  IconLayers,
} from '@douyinfe/semi-icons';
import { CircleEllipsis, Target, TrendingUp } from 'lucide-react';
import styles from './styles.module.css';
import { Button } from '@douyinfe/semi-ui';
import Link from "@docusaurus/Link";
import { IconBriefcase } from '@douyinfe/semi-icons';

// lucide-react 备用
// import { CheckCircle, Users, Zap, Target, TrendingUp, Layers } from 'lucide-react';

export default function Comparison() {
  return (
    <div className={styles.comparisonContainer}>
      {/* 标题区 */}
      <div className={styles.comparisonHeader}>
        <h2 className={styles.comparisonTitle}>产品差异</h2>
        <p className={styles.comparisonDesc}>
          了解 Rainbond 与主流容器平台的差异化优势
        </p>
      </div>
      <div className={styles.divider}></div>
      {/* 表格区 */}
      <div className={styles.comparisonTableWrap}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th className={clsx(styles.comparisonTh, styles.comparisonThFirst)}></th>
              <th className={clsx(styles.comparisonTh, styles.comparisonThRainbond)}>
                <div className={styles.comparisonRainbondTitle}>🚀 Rainbond</div>
              </th>
              <th className={styles.comparisonTh}>
                <div className={styles.comparisonOtherTitle}>⚙️ Rancher</div>
              </th>
              <th className={styles.comparisonTh}>
                <div className={styles.comparisonOtherTitle}>🔧 KubeSphere</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 核心定位 */}
            <tr className={styles.comparisonTrHover}>
              <td className={styles.comparisonTdFirst}>
                <div className={styles.comparisonTdContentCenter}>
                  <Target style={{ color: '#2563eb', width: 18, height: 18 }} />
                  <span>核心定位</span>
                </div>
              </td>
              <td className={styles.comparisonTdRainbond}>
                <span className={styles.comparisonRainbondDesc}>应用级 PaaS，应用抽象与交付，无需学习 K8s 的容器平台</span>
              </td>
              <td className={styles.comparisonTd}>
                多集群 K8s 管理与运维平台
              </td>
              <td className={styles.comparisonTd}>
                全栈容器化解决方案，K8s 之上的扩展层
              </td>
            </tr>
            {/* 面向用户 */}
            <tr className={styles.comparisonTrHover}>
              <td className={styles.comparisonTdFirst}>
                <div className={styles.comparisonTdContentCenter}>
                  <IconUserGroup style={{ color: '#22c55e' }} size="small" />
                  <span>面向用户</span>
                </div>
              </td>
              <td className={styles.comparisonTdRainbond}>
              <span className={styles.comparisonRainbondDesc}>开发者 / 运维 / 企业 IT 管理</span>
              </td>
              <td className={styles.comparisonTd}>
                K8s 管理员 / 专业运维团队
              </td>
              <td className={styles.comparisonTd}>
                K8s 管理员 / DevOps 工程师
              </td>
            </tr>
            {/* 与K8s关系 */}
            <tr className={styles.comparisonTrHover}>
              <td className={styles.comparisonTdFirst}>
                <div className={styles.comparisonTdContentCenter}>
                  <IconLayers style={{ color: '#a78bfa' }} size="small" />
                  <span>与K8s关系</span>
                </div>
              </td>
              <td className={styles.comparisonTdRainbond}>
                <span className={styles.comparisonRainbondDesc}>高度抽象 K8s 细节，可纳管 / 安装 K8s</span>
              </td>
              <td className={styles.comparisonTd}>
                管理 / 编排 K8s 集群，提供轻量发行版
              </td>
              <td className={styles.comparisonTd}>
                扩展 K8s 能力，支持自建 / 纳管集群
              </td>
            </tr>
            {/* 学习曲线 */}
            <tr className={styles.comparisonTrHover}>
              <td className={styles.comparisonTdFirst}>
                <div className={styles.comparisonTdContentCenter}>
                  <TrendingUp style={{ color: '#fb923c', width: 18, height: 18 }} />
                  <span>学习曲线</span>
                </div>
              </td>
              <td className={styles.comparisonTdRainbond}>
                <Tag color="green" size="small" className={styles.comparisonTagLow}>低</Tag>
                <div className={styles.comparisonRainbondDesc}>专注应用，零 K8s 门槛</div>
              </td>
              <td className={styles.comparisonTd}>
                <Tag color="yellow" size="small" className={styles.comparisonTagLow}>中</Tag>
                <div style={{ color: '#334155' }}>需掌握 K8s 集群管理</div>
              </td>
              <td className={styles.comparisonTd}>
                <Tag color="red" size="small" className={styles.comparisonTagLow}>中高</Tag>
                <div style={{ color: '#334155' }}>需理解 K8s 及生态组件</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={clsx("row",styles.button_row)}>
        <div className='col col--12'>
          <Link to="/docs">
            <Button theme='solid' type='primary' icon={<CircleEllipsis />} size='large' className={clsx(styles.button_style)}>
              了解更多
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
