import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {PageMetadata, HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import styles from './styles.module.css';

const CATEGORY_DEFS = [
  {key: 'all', label: '全部'},
  {key: 'tutorial', label: '入门教程'},
  {key: 'comparison', label: '对比选型'},
  {key: 'use-scene', label: '使用场景'},
  {key: 'case', label: '客户案例'},
  {key: 'release', label: '版本发布'},
  {key: 'xinchuang', label: '信创实践'},
];

function getTagLabels(metadata) {
  const labels = (metadata.tags || []).map((tag) => {
    if (typeof tag === 'string') return tag;
    return tag.label || tag.name || '';
  });
  return Array.from(new Set(labels.filter(Boolean)));
}

function classifyPost(metadata) {
  const tags = getTagLabels(metadata).join(' ');
  const source = `${metadata.title || ''} ${metadata.description || ''} ${metadata.permalink || ''} ${tags}`.toLowerCase();

  if (source.includes('case-') || tags.includes('客户案例')) {
    return 'case';
  }
  if (source.includes('usescene-') || tags.includes('使用场景')) {
    return 'use-scene';
  }
  if (source.includes('对比') || source.includes('怎么选') || source.includes('vs ')) {
    return 'comparison';
  }
  if (source.includes('发布') || /^v\d/.test(metadata.title || '')) {
    return 'release';
  }
  if (source.includes('信创') || source.includes('arm') || source.includes('国产') || source.includes('麒麟')) {
    return 'xinchuang';
  }
  return 'tutorial';
}

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListItem({item}) {
  const metadata = item.content.metadata;
  const date = metadata.date
    ? new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(metadata.date))
    : '';
  const readingTime = metadata.readingTime ? `阅读需 ${Math.ceil(metadata.readingTime)} 分钟` : '';
  const tags = getTagLabels(metadata);

  return (
    <article className={styles.postItem}>
      <Link to={metadata.permalink} className={styles.postTitle}>
        {metadata.title}
      </Link>
      <div className={styles.postMeta}>
        {date ? <span>{date}</span> : null}
        {readingTime ? <span>{readingTime}</span> : null}
      </div>
      <p className={styles.postSummary}>{metadata.description || '查看完整文章了解更多内容。'}</p>
      <div className={styles.postFooter}>
        <div className={styles.tagRow}>
          <span className={styles.tagLabel}>标签:</span>
          <div className={styles.badges}>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span key={`${metadata.permalink}-${tag}`} className={styles.tagBadge}>
                  {tag}
                </span>
              ))
            ) : (
              <span className={styles.tagBadge}>Rainbond</span>
            )}
          </div>
        </div>
        <Link to={metadata.permalink} className={styles.readMore}>
          阅读更多
        </Link>
      </div>
    </article>
  );
}

function BlogListPageContent(props) {
  const {items} = props;
  const [activeCategory, setActiveCategory] = useState('all');

  const counts = useMemo(() => {
    const next = {all: items.length};
    items.forEach((item) => {
      const key = classifyPost(item.content.metadata);
      next[key] = (next[key] || 0) + 1;
    });
    return next;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => classifyPost(item.content.metadata) === activeCategory);
  }, [activeCategory, items]);

  return (
    <Layout>
      <div className={clsx('container margin-vert--lg', styles.blogShell)}>
        <div className="row">
          <aside className={clsx('col col--3', styles.leftCol)}>
            <div className={styles.leftSticky}>
              <h1 className={styles.pageTitle}>Blog</h1>
              <p className={styles.pageDesc}>
                官方内容阵地，集中整理教程、对比选型、客户案例、使用场景和版本发布。
              </p>
              <nav className={styles.categoryNav}>
                {CATEGORY_DEFS.map((category) => (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={clsx(styles.categoryItem, activeCategory === category.key && styles.categoryItemActive)}>
                    <span>{category.label}</span>
                    <b>{counts[category.key] || 0}</b>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className={clsx('col col--9', styles.rightCol)}>
            <div className={styles.listWrap}>
              {filteredItems.map((item) => (
                <BlogListItem key={item.content.metadata.permalink} item={item} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
