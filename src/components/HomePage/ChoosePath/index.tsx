import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type CardTone = 'beginner' | 'ai' | 'offline' | 'enterprise';

interface PathCard {
  tag: string;
  title: string;
  summary: string;
  href: string;
  tone: CardTone;
  buttonLabel?: string;
  showCta?: boolean;
}

const pathCards: PathCard[] = [
  {
    tag: '快速上手',
    title: '不会 K8s，想把应用跑起来',
    summary: '适合开发多、平台运维少，想先解决应用交付而不是先补齐 k8s 复杂概念。',
    href: '/install-hub',
    tone: 'beginner',
    showCta: false,
  },
  {
    tag: 'AI 私有化',
    title: '几十款 AI 应用私有化部署',
    summary: '适合想把Dify或其他AI应用带进企业环境，并持续升级维护的团队。',
    href: 'https://hub.rainbond.com',
    tone: 'ai',
  },
  {
    tag: '离线交付',
    title: '内网环境、国产化、信创',
    summary: '适合需要离线环境、国产化和信创可适配到生产环境的团队。',
    href: '/offline-and-xinchuang',
    tone: 'offline',
  },
  {
    tag: '企业管理',
    title: '多团队、应用和资源统一管理',
    summary: '适合企业IT、平台负责人和要统一纳管应用交付流程的团队。',
    href: '/it-and-enterprise',
    tone: 'enterprise',
  },
];

export default function ChoosePath() {

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };


  return (
    <div className={styles.choosePathSection}>
      <div className={styles.bgSection}>
        <div className={styles.lf}></div>
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />
          <motion.div
            className={styles.titleWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <h2 className={styles.sectionTitle}>Rainbond 能解决哪些问题？</h2>
            <p className={styles.sectionSubtitle}>别从所有内容开始，先按你当前最关心的场景进入。</p>
          </motion.div>
        </div>
        <div className={styles.rt}></div>
      </div>

      <div className={styles.cardGrid}>
          {pathCards.map((card) => (
            <article key={card.title} className={clsx(styles.card, styles[card.tone])}>
              <div className={styles.cardTag}>{card.tag}</div>
              <div className={styles.cardTitleWrap}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>
              <p className={styles.cardSummary}>{card.summary}</p>

              {card.showCta !== false && (
                <div className={styles.cardFooter}>
                  {card.href === '/install-hub' ? (
                    <TrackedLink
                      to={card.href}
                      className={styles.cardButton}
                      eventName="cta_install_clicked"
                      eventProps={{
                        module: 'home_choose_path',
                        cta_text: card.buttonLabel || '先选安装路径',
                        target_path: card.href,
                      }}>
                      {card.buttonLabel || '了解更多'}
                    </TrackedLink>
                  ) : (
                    <Link to={card.href} className={styles.cardButton}>
                      {card.buttonLabel || '了解更多'}
                    </Link>
                  )}
                </div>
              )}
            </article>
          ))}
      </div>
    </div>
  );
}
