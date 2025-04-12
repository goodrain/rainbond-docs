// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

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
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
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
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/en-docs',
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v6.2'
            }
          }
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
        content: 'Cloud Native Application Management Platform, Kubernetes, k8s, Application Delivery, Application Operations, Microservice, Service Mesh, DevOps, CICD, Continuous Delivery, Continuous Integration, Continuous Deployment, Continuous Operations, Helm, RAM, Rainbond, Rainbond Xinchuang, Rainbond Xinchuang Cloud Platform, Cloud Native, Cloud Application Management Platform, Micro service, Service Mesh'
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
        items: [
          {
            label: 'Docs',
            to: '/docs',
            position: 'left',
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
      },
      algolia: {
        appId: '6NQ861LF9R',
        apiKey: '7d389ee210249d03aca601ad100aad08',
        indexName: 'crawler_rainbond'
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Goodrain, Inc. All Rights Reserved. Powered by <a href="https://www.netlify.com">Netlify</a>`
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
  // scripts: [
  //   'https://static.goodrain.com/docusaurus/baidu-statistics.js'
  // ],
  plugins: [
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image',
    function customWebpackPlugin() {
      return {
        name: 'custom-webpack-plugin',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@src': path.resolve(__dirname, './src'),
              },
            },
          };
        },
      };
    },
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
