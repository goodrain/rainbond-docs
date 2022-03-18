// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
          routeBasePath: '/useScene',
          path: 'blog',
          blogTitle: '使用场景',
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/main/blog',
          postsPerPage: 10,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '使用场景',
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
      navbar: {
        title: 'Rainbond',
        logo: {
          alt: 'Rainbond Logo',
          src: 'img/rainbond.png',
          href: '/'
        },
        // navbar的选项卡
        items: [
          {
            position: 'left',
            label: '文档',
            to: 'docs/quick-start/introduction'
          },
          {
            to: 'useScene',
            label: '使用场景',
            position: 'left'
          },
          {
            to: 'case',
            label: '案例',
            position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          },
          {
            position: 'right',
            label: '应用商店',
            href: 'https://store.goodrain.com/'
          },
          {
            position: 'right',
            label: '企业服务',
            href: 'https://www.goodrain.com/'
          },
          {
            href: 'https://github.com/goodrain/rainbond',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ]
      },
      hideableSidebar: true,
      autoCollapseSidebarCategories: true,
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
                label: '快速开始',
                to: 'docs/quick-start/quick-install'
              },
              {
                label: '部署组件',
                to: 'docs/use-manual/component-create'
              },
              {
                label: '最佳实践',
                to: 'docs/expand/practices'
              }
            ]
          },
          {
            title: '加入社区',
            items: [
              {
                label: '参与贡献',
                to: 'docs/contributing'
              }
            ]
          },
          {
            title: '贡献',
            items: [
              {
                label: '参与贡献',
                to: 'docs/contributing'
              }
            ]
          },
          {
            title: '更多',
            items: [
              {
                label: '使用场景',
                to: 'useScene'
              },
              {
                label: '案例',
                to: 'case'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 北京好雨科技有限公司, Inc. All Rights Reserved. 京ICP备15028663号-4`
      },
      prism: {
        darkTheme: darkCodeTheme
      },
      announcementBar: {
        id: 'start',
        content:
          '⭐️ If you like Rainbond, give it a star on <a target="_blank" href="https://github.com/goodrain/rainbond">GitHub</a> !'
      }
    }),
  scripts: ['https://static.goodrain.com/docusaurus/baidu-statistics.js'],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'case',
        routeBasePath: 'case',
        path: './case',
        blogTitle: '案例',
        editUrl: 'https://github.com/goodrain/rainbond-docs/tree/main/case',
        postsPerPage: 10,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '案例',
        sortPosts: 'descending'
      }
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/use-manual/component-create')) {
            return [
              existingPath.replace(
                '/use-manual/component-create',
                '/component-create'
              )
            ];
          }
          if (existingPath.includes('/use-manual/enterprise-manager')) {
            return [
              existingPath.replace(
                '/use-manual/enterprise-manager',
                '/enterprise-manager'
              )
            ];
          }
          if (existingPath.includes('/use-manual/user-manual')) {
            return [
              existingPath.replace('/use-manual/user-manual', '/user-manual')
            ];
          }
          if (existingPath.includes('/quick-start/get-start')) {
            return [
              existingPath.replace('/quick-start/get-start', '/get-start')
            ];
          }
          if (existingPath.includes('/quick-start/architecture')) {
            return [
              existingPath.replace('/quick-start/architecture', '/architecture')
            ];
          }
          if (existingPath.includes('/expand/practices')) {
            return [existingPath.replace('/expand/practices', '/practices')];
          }
          if (existingPath.includes('/expand/opensource-app')) {
            return [
              existingPath.replace('/expand/opensource-app', '/opensource-app')
            ];
          }
          return undefined;
        },
        redirects: [
          {
            // 社区分享活动记录
            to: '/community/upcoming-events',
            from: ['/upcoming-events']
          },
          {
            // 技术架构
            to: '/quick-start/architecture/',
            from: ['/architecture/architecture']
          },
          {
            // 快速安装
            to: '/quick-start/quick-install',
            from: ['/quick-start/rainbond_install']
          },
          {
            // 简介
            to: '/',
            from: ['/quick-start/rainbond_overview']
          }
        ]
      }
    ]
  ]
};

module.exports = config;
