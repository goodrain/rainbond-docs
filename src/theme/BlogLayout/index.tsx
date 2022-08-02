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
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom'

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const location_url = useLocation().pathname;
  const { title } = sidebar;
  const isBlogPage = location_url.includes('/blog');
  const [CasePageStyle, setCasePageStyle] = React.useState(false);
  const [isBlogList, setIsBlogList] = React.useState(false);
  useEffect(() => {
    if (location_url == '/usescene' || location_url == '/case' || location_url == '/en/usescene' || location_url == '/en/case'){
      setCasePageStyle(true);
    } else if(location_url.includes('blog')) {
      setIsBlogList(true);
    }
  });

  return (
    <Layout {...layoutProps}>
      <div className={clsx('container margin-vert--lg',{
        [styles.blogLayout]: isBlogPage,
        }
      )}>
        {title === '使用场景' && location_url == '/usescene' || location_url == '/en/usescene' ? (
          <h1 className={styles.title}>使用场景</h1>
        ) : title === '案例' && location_url == '/case' || location_url == '/en/case' ? (
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
            className={clsx('col',{
              'col--7': hasSidebar && title === '所有文章',
              'col--10': !CasePageStyle && !isBlogList,
              [styles.container_box]: CasePageStyle
            })}
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
