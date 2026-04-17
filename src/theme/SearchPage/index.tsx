import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import SearchPage from "@theme-original/SearchPage";

export default function SearchPageWrapper(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const pageTitle = "Rainbond 文档搜索 | 快速查找安装、交付与运维内容";
  const pageDescription =
    "通过 Rainbond 文档搜索页快速查找安装、应用交付、应用运维、多集群、微服务治理和信创等内容，帮助团队更快定位所需文档。";
  const pageKeywords =
    "Rainbond 文档搜索, Rainbond 搜索, Kubernetes 文档搜索, 应用交付文档, 应用运维文档, 多集群文档, 信创文档";
  const pageUrl = new URL("/search", siteConfig.url).toString();
  const imageUrl = new URL("/img/rainbond.png", siteConfig.url).toString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${pageUrl}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SearchPage />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta property="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
    </>
  );
}
