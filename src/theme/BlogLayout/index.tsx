/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from '@theme/BlogLayout';
import BlogSidebar from '@theme/BlogSidebar';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';
export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const location_url = window.location.pathname;
  const { title } = sidebar;
  return (
    <Layout {...layoutProps}>
      <div className='container margin-vert--lg'>
        {title === '使用场景' ? (
          <h1 className={styles.title}>使用场景</h1>
        ) : title === '案例' ? (
          <h1 className={styles.title}>案例</h1>
        ) : (
          ''
        )}
        <div className='row'>
          {hasSidebar && title === '所有文章' && (
            <aside className='col col--3'>
              <BlogSidebar sidebar={sidebar!} />
            </aside>
          )}
          <main
            className={`${clsx('col', {
              'col--7': hasSidebar && title === '所有文章',
              'col--9 col--offset-1': !hasSidebar
            })} ${
              (location_url === '/case' || location_url === '/useScene') &&
              styles.container_box
            }`}
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>
          {toc && <div className='col col--2'>{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
