// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
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
          includeCurrentVersion: false,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Current'
            }
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
      }],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
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
                label: '云原生应用市场',
                to: '/feature/app-market'
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
            type: 'dropdown',
            label: '开源社区',
            position: 'left',
            to: '/community/support',
            items: [
              {
                label: '参与贡献',
                to: '/community/contribution/',
              },
              {
                label: '社区支持',
                to: '/community/support',
              },
              {
                label: '应用商店',
                to: 'https://store.goodrain.com/markets/rainbond',
              },
              {
                label: '合作伙伴',
                to: '/partners',
              },
              {
                label: '用户论坛',
                to: 'https://t.goodrain.com',
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
        appId: '4EFG0MCBR2',
        apiKey: '449c9313e5dfd0ebb2c330a105b302b9',
        indexName: 'rainbond'
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '快速安装',
                to: '/docs/quick-start/quick-install'
              },
              {
                label: 'DevOps指南',
                to: '/docs/devops/'
              },
              {
                label: '微服务架构指南',
                to: '/docs/micro-service/'
              },
              {
                label: '应用交付指南',
                to: '/docs/delivery/'
              }
            ]
          },
          {
            title: '功能特性',
            items: [
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
                label: '云原生应用市场',
                to: '/feature/app-market'
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
                label: '信创',
                to: '/xinchuang'
              },
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
            title: '开源社区',
            items: [
              {
                label: '参与贡献',
                to: '/community/contribution/'
              },
              {
                label: '社区支持',
                to: '/community/support'
              },
              {
                label: '应用商店',
                to: 'https://store.goodrain.com/markets/rainbond'
              },
              {
                label: '合作伙伴',
                to: '/partners'
              },
              {
                label: '用户论坛',
                to: 'https://t.goodrain.com'
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
        copyright: `Copyright © ${new Date().getFullYear()} Goodrain, Inc. All Rights Reserved`
      },
      // prism: {
      //   darkTheme: darkCodeTheme
      // },
      announcementBar: {
        id: 'start',
        content:
          '🎉 Rainbond 国产化信创版本已发布，<a href="/xinchuang">点击了解 Rainbond 国产化信创能力</a> !',
        isCloseable: false,
      }
    }),
  scripts: [
    'https://static.goodrain.com/docusaurus/baidu-statistics.js',
    'https://static.goodrain.com/docusaurus/posthog.js'
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/goodrain/rainbond-docs/tree/main/community',
      }
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          // 配置组件自动构建部署重新 URL
          if (existingPath.includes('docs/devops/continuous-deploy/auto-build')) {
            return [
              existingPath.replace(
                'docs/devops/continuous-deploy/auto-build',
                'docs/use-manual/component-manage/build-source/auto_build',
              )
            ];
          }
          return undefined;
        }
      }
    ],
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image'
  ]
};

module.exports = config;
