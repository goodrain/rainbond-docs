import React, {useEffect, useState} from 'react';
import copyToClipboard from 'copy-to-clipboard';
import CodeBlock from '@theme/CodeBlock';
import {trackUmamiEvent} from '@src/utils/umami';
import styles from './styles.module.css';

type CopyCommandBlockProps = {
  code: string;
  language?: string;
  osTab: string;
  commandType: string;
  title?: string;
  hint?: string;
};

export default function CopyCommandBlock({
  code,
  language = 'bash',
  osTab,
  commandType,
  title = '复制安装命令',
  hint,
}: CopyCommandBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    trackUmamiEvent('install_command_copied', {
      os_tab: osTab,
      command_type: commandType,
    });
  };

  return (
    <div className={styles.copyShell}>
      <div className={styles.copyHeader}>
        <div>
          <div className={styles.copyMeta}>{title}</div>
          {hint ? <div className={styles.copyHint}>{hint}</div> : null}
        </div>
        <button className={`button button--secondary button--sm ${styles.copyButton}`} onClick={handleCopy} type="button">
          {copied ? '已复制' : '复制命令'}
        </button>
      </div>
      <CodeBlock language={language}>{code}</CodeBlock>
    </div>
  );
}
