// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rainbond',
  tagline: 'Application Delivery Center',
  url: 'https://www.rainbond.com',
  baseUrl: '/docs/',
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
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/V5.5-dev'
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
          src: 'img/rainbond.png'
        },
        // navbar的选项卡
        items: [
          {
            position: 'left',
            label: '安装',
            to: '/docs/quick-start/quick-install/'
          },
          {
            position: 'left',
            label: '文档',
            to: '/docs/',
          },
          {
            position: 'right',
            label: '视频',
            href: 'https://www.rainbond.com/video/'
          },
          {
            position: 'right',
            label: '社区',
            href: 'https://t.goodrain.com/'
          },
          {
            position: 'right',
            label: '案例',
            href: 'https://www.goodrain.com/#refer-case'
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
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      // algolia: {
      //   appId: "4EFG0MCBR2",
      //   apiKey: "449c9313e5dfd0ebb2c330a105b302b9",
      //   indexName: "rainbond",
      // },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} 北京好雨科技有限公司, Inc. All Rights Reserved. 京ICP备15028663号-4`
      },
      prism: {
        darkTheme: darkCodeTheme
      },
      announcementBar: {
        id: "start",
        content:
          '⭐️ If you like Rainbond, give it a star on <a target="_blank" href="https://github.com/goodrain/rainbond">GitHub</a> !',
      },
    }),
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              // 社区分享活动记录
              to: '/community/upcoming-events',
              from: ['/docs/upcoming-events'],
            },
            {
              // 技术架构
              to: '/architecture/',
              from: ['/docs/architecture/architecture'],
            },
            {
              // 组件基础操作
              to: '/user-manual/component-op/basic-operation/service-properties',
              from: ['/docs/user-manual/component-op/basic-operation/service-properties'],
            },
          ],
        },
      ],
    ],
};

module.exports = config;
