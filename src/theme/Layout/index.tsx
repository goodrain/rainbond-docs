/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import NavbarNew from '../../components/NavBar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import type {Props} from '@theme/Layout';
import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();

  const docs_url = useLocation().pathname.includes('docs');
  const community_url = useLocation().pathname.includes('community');
  const blog_url = useLocation().pathname.includes('blog');
  const changelog_url = useLocation().pathname.includes('changelog');

  // useEffect(() => {
  //   // 插入 window.difyChatbotConfig
  //   const configScript = document.createElement('script');
  //   configScript.innerHTML = `
  //     window.difyChatbotConfig = {
  //       token: 'IjNVNXqpQM0G13wz',
  //       baseUrl: 'http://grfec3f1-80-dhn9y6sk-dev.goodrain.com',
  //       systemVariables: {},
  //     }
  //   `;
  //   document.body.appendChild(configScript);

  //   // 插入 dify embed 脚本
  //   const embedScript = document.createElement('script');
  //   embedScript.src = 'http://grfec3f1-80-dhn9y6sk-dev.goodrain.com/embed.min.js';
  //   embedScript.id = 'IjNVNXqpQM0G13wz';
  //   embedScript.defer = true;
  //   document.body.appendChild(embedScript);

  //   // 插入样式
  //   const style = document.createElement('style');
  //   style.innerHTML = `
  //     #dify-chatbot-bubble-button {
  //       background-color: #1C64F2 !important;
  //     }
  //     #dify-chatbot-bubble-window {
  //       width: 24rem !important;
  //       height: 40rem !important;
  //     }
  //   `;
  //   document.head.appendChild(style);

  //   // 清理函数，组件卸载时移除
  //   return () => {
  //     document.body.removeChild(configScript);
  //     document.body.removeChild(embedScript);
  //     document.head.removeChild(style);
  //   };
  // }, []);

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      {docs_url || community_url || blog_url || changelog_url ? <AnnouncementBar /> : null }
      {docs_url || community_url || blog_url || changelog_url ? <Navbar /> : <NavbarNew /> }

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}
        style={{ marginTop: (docs_url || community_url || blog_url || changelog_url) ? "" : "6rem" }} 
        >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}
