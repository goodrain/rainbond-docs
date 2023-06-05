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
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom'
import Link from '@docusaurus/Link';

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps} = props;

  return (
    <Layout {...layoutProps}>
      <div className={clsx('container margin-vert--lg')}>
        <div className='row'>
          {/* {hasSidebar && title === '所有文章' && (
            <aside className='col col--3'>
              <BlogSidebar sidebar={sidebar!} />
            </aside>
          )} */}
          <main
            className={clsx('col col--10')}
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>
          {toc && 
            <div className='col col--2'>
              <h2>
                <Link to="/blog" className={styles.link}>
                  博客首页
                </Link>
              </h2>
              <h4>目录</h4>
              {toc}
            </div>}
        </div>
      </div>
    </Layout>
  );
}
