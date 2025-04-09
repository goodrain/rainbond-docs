import React, { useEffect, useState } from 'react';
import { Redirect } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Home() {
  const isBrowser = useIsBrowser();
  const { i18n } = useDocusaurusContext();
  const [targetLocale, setTargetLocale] = useState<'zh' | 'en' | null>(null);

  // 客户端检测逻辑
  useEffect(() => {
    console.log("---------------------", isBrowser)
    if (!isBrowser) return;

    const currentPath = window.location.pathname;
    console.log(currentPath, "currentPath")
    console.log(navigator.language, "navigator.language")

    // 如果已位于语言路径则退出
    // if (currentPath.startsWith('/en/') || currentPath.startsWith('/zh/')) return;
    // if (currentPath === '/en/' || currentPath==='/zh/') return;

    // 优先读取 localStorage
    const savedLocale = localStorage.getItem('docusaurus_selected_locale');
    console.log(savedLocale, "browserLang", i18n.defaultLocale, "i18n.defaultLocale")
    if (savedLocale && savedLocale !== i18n.defaultLocale) {
      setTargetLocale(savedLocale as 'zh' | 'en');
      return;
    }

    // 浏览器语言检测
    const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    console.log(browserLang, "browserLang", i18n.defaultLocale, "i18n.defaultLocale")
    if (browserLang !== i18n.defaultLocale) {
      setTargetLocale(browserLang);
    }
  }, [isBrowser]);

  // 服务端渲染时返回默认语言
  if (!isBrowser) {
    console.log("not browser, return default")
    return <Redirect to={`/`} />;
  }

  // 客户端重定向逻辑
  return (
      <BrowserOnly>
        {() => {
          if (targetLocale) {
            console.log("target locale", targetLocale);
            // 同步 localStorage
            localStorage.setItem('docusaurus_selected_locale', targetLocale);
            return <Redirect to={`/${targetLocale}`} />;
          }

          // 默认情况重定向到当前语言
          console.log("currentLocale", i18n.currentLocale);
          return <Redirect to={`/`} />;
        }}
      </BrowserOnly>
  );
}