// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const VersionsArchived = require('./versionsArchived.json');
const ArchivedVersionsDropdownItems = Object.entries(VersionsArchived)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rainbond',
  tagline: 'Application Delivery Center',
  url: 'https://www.rainbond.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/rainbond.png',
  organizationName: 'goodrain', // Usually your GitHub org/user name.
  projectName: 'rainbond-docs', // Usually your repo name.
  trailingSlash: 'false',
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeConfigs: {
      zh: {
        label: '简体中文',
      },
      en: {
        label: 'English',
      },
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/main',
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'V6.2'
            },
            "5.17": {
              label: 'V5.17',
            },
          }
        },
        blog: {
          routeBasePath: '/blog',
          path: 'blog',
          blogTitle: '博客',
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/main/blog',
          postsPerPage: 18,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '所有文章',
          sortPosts: 'descending'
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/base.css')
          ]
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{
        name: 'Rainbond is Cloud Native Multi Cloud Application Management Platform', 
        content: 'Kubernetes, Cloud Native, Cloud Application Management Platform, Micro service, Service Mesh'
      },
      {
        name: 'keywords', 
        content: '信创, 国产化, 云原生, 应用管理平台, 信创云平台, Kubernetes, k8s, 应用交付, 应用运维, 微服务, 服务网格, Service Mesh, DevOps, CICD, 持续交付, 持续集成, 持续部署, 持续运维, Helm, RAM, Rainbond, Rainbond Xinchuang, Rainbond Xinchuang Cloud Platform, Cloud Native, Cloud Application Management Platform, Micro service, Service Mesh'
      }
    ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      navbar: {
        title: 'Rainbond',
        logo: {
          alt: 'Rainbond Logo',
          src: 'img/rainbond.png',
          href: '/'
        },
        hideOnScroll: true,
        // navbar的选项卡
        items: [
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'docs',
            label: '文档',
          },
          {
            type: 'dropdown',
            label: '功能特性',
            position: 'left',
            items: [
              {
                label: '信创',
                to: '/xinchuang'
              },
              {
                label: '一体化DevOps',
                to: '/feature/devops'
              },
              {
                label: 'Kubernetes多集群管理',
                to: '/feature/multi-cluster'
              },
              {
                label: '开箱即用的微服务治理',
                to: '/feature/service-mesh'
              },
              {
                label: '自动化应用运维',
                to: '/feature/app-ops'
              }
            ]
          },
          {
            type: 'dropdown',
            label: '深入',
            position: 'left',
            items: [
              {
                label: '使用场景',
                href: '/usescene',
              },
              {
                label: '用户案例',
                href: '/case',
              },
              {
                label: '博客',
                href: '/blog',
              },
              {
                type: 'docSidebar',
                sidebarId: 'api',
                label: 'OpenAPI',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr class="dropdown-separator">',
              },
              {
                type: 'html',
                className: 'dropdown-archived-versions',
                value: '<b style="font-size: 14px;">Archived versions</b>',
              },
              ...ArchivedVersionsDropdownItems.map(
                ([versionName, versionUrl]) => ({
                  label: versionName,
                  href: versionUrl,
                }),
              ),
              {
                type: 'html',
                value: '<hr class="dropdown-separator">',
              },
              {
                to: '/docs/versions',
                label: 'All versions',
              },
            ]
          },
          {
            position: 'right',
            label: '企业版',
            href: '/enterprise_server'
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/goodrain/rainbond',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ]
      },
      docs: {
        sidebar: {
          hideable: true,
          // autoCollapseCategories: true
        }
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // 黑白切换按钮
        respectPrefersColorScheme: false
      },
      algolia: {
        appId: '6NQ861LF9R',
        apiKey: '7d389ee210249d03aca601ad100aad08',
        indexName: 'crawler_rainbond'
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '快速入门',
                to: '/docs/quick-start/getting-started'
              },
              {
                label: '使用教程',
                to: '/docs/tutorial/via-rainbond-deploy-sourceandmiddleware'
              }
            ]
          },
          {
            title: '功能特性',
            items: [
              {
                label: '信创',
                to: '/xinchuang'
              },
              {
                label: '一体化DevOps',
                to: '/feature/devops'
              },
              {
                label: 'Kubernetes多集群管理',
                to: '/feature/multi-cluster'
              },
              {
                label: '开箱即用的微服务治理',
                to: '/feature/service-mesh'
              },
              {
                label: '自动化应用运维',
                to: '/feature/app-ops'
              }
            ]
          },
          {
            title: '深入',
            items: [
              {
                label: '使用场景',
                to: 'usescene'
              },
              {
                label: '用户案例',
                to: 'case'
              },
              {
                label: '博客',
                to: 'blog'
              },
              {
                label: 'OpenAPI',
                to: '/docs/Intro'
              },
            ]
          },
          {
            title: '更多',
            items: [
              {
                label: '企业版',
                to: 'enterprise_server'
              },
              {
                label: '联系我们',
                to: 'https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg'
              },
              {
                html: `<a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /> </a>`
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Goodrain, Inc. All Rights Reserved. <a href="https://beian.miit.gov.cn">京ICP备15028663号-4</a>`
      },
      prism: {
        // darkTheme: darkCodeTheme
        additionalLanguages: ['bash'],
      },
      announcementBar: {
        id: 'start',
        content:
          '⭐️ If you like <a href="https://github.com/goodrain/rainbond">Rainbond</a>, give it a star on GitHub! ⭐️',
        isCloseable: false,
      }
    }),
  scripts: [
    'https://static.goodrain.com/docusaurus/baidu-statistics.js',
    'https://static.goodrain.com/docusaurus/hotjar.js'
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/how-to-guides/micro-service-deploy/blade-example',
            from: '/docs/micro-service/example/blade',
          },
          {
            to: '/docs/how-to-guides/micro-service-deploy/pig-example',
            from: '/docs/micro-service/example/pig',
          },
          {
            to: '/docs/how-to-guides/app-ops/auto-build',
            from: '/docs/use-manual/component-manage/build-source/auto_build',
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes('/docs/how-to-guides/localization-guide')) {
            return [
              existingPath.replace( '/docs/how-to-guides/localization-guide', '/docs/localization-guide')
            ];
          }
          if (existingPath.includes('/docs/how-to-guides/delivery')) {
            return [
              existingPath.replace('/docs/how-to-guides/delivery', '/docs/delivery')
            ];
          }
          if (existingPath.includes('/docs/how-to-guides/app-ops')) {
            return [
              existingPath.replace('/docs/how-to-guides/app-ops', '/docs/use-manual')
            ];
          }
          if (existingPath.includes('/docs/how-to-guides/app-deploy')) {
            return [
              existingPath.replace('/docs/how-to-guides/app-deploy', '/docs/devops/app-deploy')
            ];
          }
          if (existingPath.includes('/')) {
            return [
              existingPath.replace('/', '/en')
            ];
          }
          return undefined;
        }
      }
    ],
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image'
  ],
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid'
  ],
  markdown: {
    mermaid: true,
  },
};

module.exports = config;
