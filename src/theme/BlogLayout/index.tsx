import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const {pathname} = useLocation();
  const isBlogPostPage =
    pathname.startsWith('/blog/') &&
    !pathname.startsWith('/blog/page') &&
    !pathname.startsWith('/blog/tags');

  const hasSidebar = sidebar && sidebar.items.length > 0 && !isBlogPostPage;

  return (
    <Layout {...layoutProps}>
      <div className={clsx('container margin-vert--lg', isBlogPostPage && styles.postContainer)}>
        <div className={clsx('row', isBlogPostPage && styles.postRow)}>
          {hasSidebar ? <BlogSidebar sidebar={sidebar} /> : null}
          <main
            className={clsx('col', styles.mainCol, {
              'col--7': hasSidebar,
              'col--10 col--offset-1': !hasSidebar && !toc,
              'col--7 col--offset-1': !hasSidebar && toc,
              [styles.postMainNoToc]: !hasSidebar && !toc,
              [styles.postMainWithToc]: !hasSidebar && toc,
              [styles.blogPostMain]: isBlogPostPage,
            })}>
            {children}
          </main>
          {toc ? <div className={clsx('col col--3', styles.tocCol)}>{toc}</div> : null}
        </div>
      </div>
    </Layout>
  );
}
