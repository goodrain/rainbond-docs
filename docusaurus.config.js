// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rainbond',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/rainbond.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
            label: 'Rainbond是什么?',
            href: 'http://www.baidu.com'
          },
          {
            position: 'left',
            label: '安装',
            href: 'http://www.baidu.com'
          },
          {
            position: 'left',
            label: '文档',
            href: 'http://www.baidu.com'
          },
          {
            position: 'right',
            label: '视频',
            href: 'http://www.baidu.com'
          },
          {
            position: 'right',
            label: '社区',
            href: 'https://t.goodrain.com/'
          },
          {
            position: 'right',
            label: '案例',
            href: 'http://www.baidu.com'
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
            position: 'right',
            label: '加入我们',
            href: 'http://www.goodrain.com/position/'
          },
          {
            href: 'https://github.com/goodrain/rainbond',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} 北京好雨科技有限公司, Inc. All Rights Reserved. 京ICP备15028663号-4`
      },
      prism: {
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
