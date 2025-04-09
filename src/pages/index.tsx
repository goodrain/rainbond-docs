import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ZhHome from './zh';
import EnHome from './en';

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  if (currentLocale === 'zh') {
    return <ZhHome />;
  } else {
    return <EnHome />;
  }
}