import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import copyToClipboard from 'copy-to-clipboard';
import { Modal } from '@douyinfe/semi-ui';
import { Check, Copy, X } from 'lucide-react';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { trackUmamiEvent } from '@src/utils/umami';

const RAINSKILLS_INSTALL_PROMPT = '帮我通过npx 安装rainskills';
const RAINSKILLS_DEPLOY_PROMPT = '帮我部署当前项目';
const SUPPORTED_AGENTS = [
  { name: 'Codex', logo: '/img/agents/codex.svg' },
  { name: 'Claude Code', logo: '/img/agents/claude-code.svg' },
  { name: 'Pi', logo: '/img/agents/pi.svg' },
  { name: 'WorkBuddy', logo: '/img/agents/workbuddy.svg' },
  { name: 'DeepSeek Harness', logo: '/img/agents/deepseek-harness.svg' },
  { name: 'Harness', logo: '/img/agents/harness.svg' },
] as const;

type CopyTarget = 'install' | 'deploy';
type CopyStatus = 'idle' | 'copied' | 'error';
type CopyState = {
  target: CopyTarget | null;
  status: CopyStatus;
};

const INITIAL_COPY_STATE: CopyState = { target: null, status: 'idle' };

export default function Home() {
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>(INITIAL_COPY_STATE);
  const agentEntryButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const copyResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAgentModalOpen) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      copyButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isAgentModalOpen]);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const clearCopyResetTimer = () => {
    if (copyResetTimerRef.current !== null) {
      window.clearTimeout(copyResetTimerRef.current);
      copyResetTimerRef.current = null;
    }
  };

  const openAgentModal = () => {
    clearCopyResetTimer();
    setCopyState(INITIAL_COPY_STATE);
    setAgentModalOpen(true);
    trackUmamiEvent('cta_home_rainskills_agent_opened', {
      module: 'home_hero',
      cta_text: '接入我的 AI Agent',
    });
  };

  const closeAgentModal = () => {
    clearCopyResetTimer();
    setCopyState(INITIAL_COPY_STATE);
    setAgentModalOpen(false);
  };

  const handleCopyPrompt = (target: CopyTarget) => {
    clearCopyResetTimer();
    const prompt = target === 'install'
      ? RAINSKILLS_INSTALL_PROMPT
      : RAINSKILLS_DEPLOY_PROMPT;
    const copied = copyToClipboard(prompt);

    if (copied) {
      setCopyState({ target, status: 'copied' });
      trackUmamiEvent(target === 'install'
        ? 'cta_home_rainskills_prompt_copied'
        : 'cta_home_rainskills_deploy_prompt_copied', {
        module: 'home_hero',
        cta_text: target === 'install' ? '复制安装指令' : '复制部署指令',
      });
      copyResetTimerRef.current = window.setTimeout(() => setCopyState(INITIAL_COPY_STATE), 1800);
    } else {
      setCopyState({ target, status: 'error' });
    }
  };

  const getCopyButtonLabel = (target: CopyTarget, idleLabel: string) => {
    if (copyState.target !== target) {
      return idleLabel;
    }
    if (copyState.status === 'copied') {
      return '已复制';
    }
    if (copyState.status === 'error') {
      return '重新复制';
    }
    return idleLabel;
  };

  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.hero_layout}>
        <div className={styles.hero_title}>
          {/* 标签 */}
          <div className={styles.hero_badge}>
            100%开源，核心功能永久免费
          </div>

          {/* 标题部分 */}
          <h1 className={styles.hero_title_one}>AI 生成</h1>
          <h1 className={styles.hero_title_two}>Rainbond 运行</h1>
          <h1 className={clsx(styles.hero_title_one, styles.hero_title_last)}>始终由你掌控</h1>
          <p className={styles.hero_title_four}>将 AI 生成的项目、AI 开源软件和业务应用，以容器方式运行在自己的服务器或 Kubernetes 上，并持续完成部署、运维、升级与交付。</p>

          {/* 按钮区块 */}
          <div className={styles.hero_button}>
            <div className={styles.hero_primary_actions}>
              <button
                ref={agentEntryButtonRef}
                type="button"
                className={`${styles.hero_button_style} ${styles.hero_button_primary}`}
                onClick={openAgentModal}
              >
                接入我的 AI Agent
              </button>
              <TrackedLink
                to="/docs/quick-start/quick-install"
                className={`${styles.hero_button_style} ${styles.hero_button_secondary}`}
                eventName="cta_home_install_clicked"
                eventProps={{
                  module: 'home_hero',
                  cta_text: '安装 Rainbond',
                  target_path: '/docs/quick-start/quick-install',
                }}>
                安装 Rainbond
              </TrackedLink>
            </div>
            <div className={styles.heroAgentCompatibility}>
              <ul className={styles.agentCompatibilityList} aria-label="首页支持的 AI Agent">
                {SUPPORTED_AGENTS.map(({ name, logo }) => (
                  <li key={name} className={styles.agentCompatibilityItem}>
                    <img src={logo} alt="" width={20} height={20} aria-hidden="true" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <TrackedLink
              to="/compare"
              className={styles.hero_compare_link}
              eventName="cta_home_compare_clicked"
              eventProps={{
                module: 'home_hero',
                cta_text: '正在选型容器平台？了解 Rainbond 的不同',
                target_path: '/compare',
              }}>
              正在选型容器平台？了解 Rainbond 的不同 <span aria-hidden="true">→</span>
            </TrackedLink>
            <OverlayTrigger
              placement="bottom"
              container={typeof document !== 'undefined' ? document.body : undefined}
              popperConfig={{ strategy: 'fixed' }}
              overlay={(overlayProps) => (
                <div
                  {...overlayProps}
                  className={styles.wechatOverlay}
                  style={{ ...overlayProps.style, zIndex: 9999 }}
                >
                  <div className="card">
                    <div className="card__body">
                      <img width="200px" height="200px" src="/wechat/wechatgroup-text.png" />
                    </div>
                  </div>
                </div>
              )}
            >
              <button type="button" className={styles.hero_community_link}>
                加入微信交流群
              </button>
            </OverlayTrigger>
{/*       
            <TrackedLink
              to="/docs"
              className={`${styles.hero_button_style} ${styles.hero_button_secondary}`}
              eventName="cta_docs_clicked"
              eventProps={{
                module: 'home_hero',
                cta_text: '了解 Rainbond',
                target_path: '/docs',
              }}>
              了解 Rainbond
            </TrackedLink> */}
          </div>
        </div>
      </div>

      {/* 统计信息区块 */}
      <div className={styles.hero_stats_row}>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <span>Github star 6k+</span>
        </div>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>下载安装 10M+</span>
        </div>
        <div className={styles.hero_stat_item}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>生产用户 10000+</span>
        </div>
      </div>

      <Modal
        visible={isAgentModalOpen}
        onCancel={closeAgentModal}
        afterClose={() => agentEntryButtonRef.current?.focus()}
        closable={false}
        maskClosable
        closeOnEsc
        centered
        footer={null}
        className={styles.agentModal}
        header={(
          <div className={styles.modalTitleRow}>
            <h2 id="semi-modal-title" className={styles.modalTitle}>让 AI Agent 连接 Rainbond</h2>
            <button
              type="button"
              className={styles.modalCloseButton}
              aria-label="关闭 RainSkills 接入说明"
              onClick={closeAgentModal}
            >
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}
      >
        <p className={styles.modalSummary}>安装 RainSkills 后，就可以直接让 Agent 部署和运维应用。</p>
        <div className={styles.agentCompatibility}>
          <p className={styles.agentCompatibilityLabel}>已适配这些 Agent</p>
          <ul className={styles.agentCompatibilityList} aria-label="已适配的 AI Agent">
            {SUPPORTED_AGENTS.map(({ name, logo }) => (
              <li key={name} className={styles.agentCompatibilityItem}>
                <img src={logo} alt="" width={20} height={20} aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.modalStageTitle}>连接 AI Agent</p>
        <p className={styles.modalInstruction}>复制下面的指令，发送给你正在使用的 Agent：</p>
        <div className={styles.promptBox}>
          <code>{RAINSKILLS_INSTALL_PROMPT}</code>
          <button
            ref={copyButtonRef}
            type="button"
            className={clsx(styles.copyPromptButton, {
              [styles.copyPromptButtonSuccess]: copyState.target === 'install' && copyState.status === 'copied',
              [styles.copyPromptButtonError]: copyState.target === 'install' && copyState.status === 'error',
            })}
            onClick={() => handleCopyPrompt('install')}
          >
            {copyState.target === 'install' && copyState.status === 'copied' ? (
              <Check size={17} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Copy size={17} strokeWidth={2.2} aria-hidden="true" />
            )}
            {getCopyButtonLabel('install', '复制安装指令')}
          </button>
        </div>
        <div className={styles.modalNextStep}>
          <div className={styles.modalNextStepTitle}>
            <span className={styles.modalStageBadge}>接入后</span>
            <p className={styles.modalStageTitle}>部署应用</p>
          </div>
          <p className={styles.modalInstruction}>安装完成后，继续在同一个对话中输入：</p>
          <div className={styles.promptBox}>
            <code>{RAINSKILLS_DEPLOY_PROMPT}</code>
            <button
              type="button"
              className={clsx(styles.copyPromptButton, styles.copyPromptButtonSecondary, {
                [styles.copyPromptButtonSuccess]: copyState.target === 'deploy' && copyState.status === 'copied',
                [styles.copyPromptButtonError]: copyState.target === 'deploy' && copyState.status === 'error',
              })}
              onClick={() => handleCopyPrompt('deploy')}
            >
              {copyState.target === 'deploy' && copyState.status === 'copied' ? (
                <Check size={17} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Copy size={17} strokeWidth={2.2} aria-hidden="true" />
              )}
              {getCopyButtonLabel('deploy', '复制部署指令')}
            </button>
          </div>
        </div>
        <p className={styles.copyFeedback} aria-live="polite">
          {copyState.status === 'copied' ? '已复制' : copyState.status === 'error' ? '复制失败，请手动复制' : ''}
        </p>
      </Modal>
    </div>
  );
}
