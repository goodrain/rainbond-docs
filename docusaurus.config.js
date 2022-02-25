// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
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
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
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
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
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
            position: 'left',
            label: '视频',
            href: 'http://www.baidu.com'
          },
          {
            position: 'left',
            label: '社区',
            href: 'https://t.goodrain.com/'
          },
          {
            position: 'left',
            label: '案例',
            href: 'http://www.baidu.com'
          },
          {
            position: 'left',
            label: '应用商店',
            href: 'https://store.goodrain.com/'
          },
          {
            position: 'left',
            label: '企业服务',
            href: 'https://www.goodrain.com/'
          },
          {
            position: 'left',
            label: '加入我们',
            href: 'http://www.goodrain.com/position/'
          },
          {
            href: 'https://github.com/goodrain/rainbond-ui',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus'
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
      },
      prism: {
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
