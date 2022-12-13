/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import NavbarCustom from '../../components/NavBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProviders from '@theme/LayoutProviders';
import type {Props} from '@theme/Layout';
import {
  PageMetadata,
  ThemeClassNames,
  useKeyboardNavigation,
} from '@docusaurus/theme-common';
import ErrorPageContent from '@theme/ErrorPageContent';
import './styles.css';
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

  return (
    <LayoutProviders>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      {docs_url || community_url ? <AnnouncementBar /> : null }
      {docs_url || community_url ? <Navbar /> : <NavbarCustom /> }

      <div className={clsx(ThemeClassNames.wrapper.main, wrapperClassName)} style={{ marginTop: (docs_url || community_url) ? "" : "4rem" }}>
        <ErrorBoundary fallback={ErrorPageContent}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
}
