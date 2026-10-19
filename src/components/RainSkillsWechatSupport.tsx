import React from 'react';
import CommunityQrCard from '@site/src/components/Analytics/CommunityQrCard';
import styles from '@site/src/components/Analytics/styles.module.css';

type Props = {
  module: string;
  compact?: boolean;
};

export default function RainSkillsWechatSupport({module, compact = false}: Props): JSX.Element {
  return (
    <CommunityQrCard
      className={styles.qrCompact}
      compact={compact}
      imageSrc="/wechat/rainbond-xzs.png"
      imageAlt="添加微信交流 RainSkills 的二维码"
      module={module}
      description="扫码添加微信，备注「RainSkills」，交流安装、部署和使用问题。"
      buttonText="查看微信二维码"
    />
  );
}
