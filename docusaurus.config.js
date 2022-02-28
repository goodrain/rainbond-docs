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
          editUrl: 'https://github.com/goodrain/rainbond-docs/tree/V5.5-dev',
          includeCurrentVersion: false,
          lastVersion: "current",
          versions: {
            current: {
              label: 'Current',
            },
          },
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
          href: 'https://www.rainbond.com'
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
            type: "docsVersionDropdown",
            position: "right",
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
      algolia: {
        appId: "4EFG0MCBR2",
        apiKey: "449c9313e5dfd0ebb2c330a105b302b9",
        indexName: "rainbond",
      },
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
    scripts: [
      'https://static.goodrain.com/docusaurus/baidu-statistics.js',
    ],
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              // 社区分享活动记录
              to: '/community/upcoming-events',
              from: ['/upcoming-events'],
            },
            {
              // 技术架构
              to: '/architecture/',
              from: ['/architecture/architecture'],
            },
            {
              // 组件创建流程说明
              to: '/component-create/creation-process',
              from: ['/user-manual/component-create/creation-process'],
            },
            {
              // 部署Helm应用
              to: '/component-create/helm-support/creation-process',
              from: ['/user-manual/app-creation/helm-support/creation-process/'],
            },
            {
              // 对接Helm仓库
              to: '/component-create/helm-support/docking_helm_store',
              from: ['/user-manual/app-creation/helm-support/docking_helm_store'],
            },
            {
              // Helm应用管理
              to: '/component-create/helm-support/manage-helm-app',
              from: ['/docs/user-manual/app-creation/helm-support/manage-helm-app'],
            },
            {
              // DockerCompose支持规范
              to: '/component-create/image-support/docker-compose',
              from: ['/user-manual/app-creation/image-support/docker-compose'],
            },
            {
              // Docker镜像支持规范
              to: '/component-create/image-support/image',
              from: ['/docs/user-manual/app-creation/image-support'],
            },
            {
              // Dockerfile
              to: '/component-create/language-support/dockefile',
              from: ['/docs/user-manual/app-creation/language-support/dockerfile'],
            },
            {
              // 其他环境变量设置
              to: '/component-create/language-support/envs',
              from: ['/user-manual/component-create/language-support/etc/envs'],
            },
            {
              // golang
              to: '/component-create/language-support/golang',
              from: ['/user-manual/app-creation/language-support/golang'],
            },
            {
              // html
              to: '/component-create/language-support/html',
              from: ['/user-manual/app-creation/language-support/html'],
            },
            {
              // .NetCore
              to: '/component-create/language-support/netcore',
              from: ['/user-manual/app-creation/language-support/netcore'],
            },
            {
              // NodeJS前端语言
              to: '/component-create/language-support/nodejs-static',
              from: ['/docs/user-manual/app-creation/language-support/nodejs-static'],
            },
            {
              // Node.JS
              to: '/component-create/language-support/nodejs',
              from: ['/user-manual/app-creation/language-support/nodejs'],
            },
            {
              // PHP
              to: '/component-create/language-support/php',
              from: ['/user-manual/app-creation/language-support/php'],
            },
            {
              // Procfile文件
              to: '/component-create/language-support/procfile',
              from: ['/user-manual/app-creation/language-support/etc/procfile/'],
            },
            {
              // Python
              to: '/component-create/language-support/python',
              from: ['/user-manual/app-creation/language-support/python'],
            },
            {
              // rainbondfile源码定义环境配置文件
              to: '/component-create/language-support/rainbondfile',
              from: ['/user-manual/app-creation/language-support/etc/rainbondfile'],
            },
            {
              // .slugignore文件
              to: '/component-create/language-support/slugignore',
              from: ['/user-manual/app-creation/language-support/etc/slugignore'],
            },
            {
              // Java Gradle源码部署组件
              to: '/component-create/language-support/java/java-gradle',
              from: ['/user-manual/component-create/language-support/java/java-gradle'],
            },
            {
              // Java Jar包部署组件
              to: '/component-create/language-support/java/java-jar',
              from: ['/user-manual/app-creation/language-support/java/java-jar'],
            },
            {
              // Rainbond构建Java Maven项目原理解读
              to: '/component-create/language-support/java/java-maven-de',
              from: ['/user-manual/app-creation/language-support/java/java-maven-de'],
            },
            {
              // Java Maven源码部署组件
              to: '/component-create/language-support/java/java-maven',
              from: ['/user-manual/app-creation/language-support/java/java-maven'],
            },
            {
              // Java Maven 多模块源码构建
              to: '/component-create/language-support/java/java-multi-module-build',
              from: ['/advanced-scenarios/devops/java-multi-module-build'],
            },
            {
              // Java War包部署组件
              to: '/component-create/language-support/java/java-war',
              from: ['/user-manual/app-creation/language-support/java/java-war'],
            },
            {
              // Tomcat配置Redis实现Session共享
              to: '/component-create/language-support/java/tomcat-redis-session',
              from: ['/user-manual/app-creation/language-support/java/tomcat-redis-session'],
            },
            {
              // webapp-runner使用指南
              to: '/component-create/language-support/java/webapp-runner',
              from: ['/user-manual/app-creation/language-support/java/webapp-runner'],
            },
            {
              // 应用
              to: '/get-start/concept/app',
              from: ['/user-manual/concept/app'],
            },
            {
              // 组件
              to: '/get-start/concept/component',
              from: ['/user-manual/concept/component'],
            },
            {
              // 网关
              to: '/get-start/concept/gateway',
              from: ['/docs/user-manual/concept/gateway'],
            },
            {
              // 插件
              to: '/get-start/concept/plugin',
              from: ['/user-manual/concept/plugin'],
            },
            {
              // 团队
              to: '/get-start/concept/team',
              from: ['/user-manual/concept/team'],
            },
            {
              // 基于 Rainbond 实现组件A/B测试
              to: '/practices/app-dev/ab_testing',
              from: ['/get-start/best-practices/ab_testing'],
            },
            {
              // 滚动发布，灰度发布及蓝绿发布
              to: '/practices/app-dev/app_publishing',
              from: ['/get-start/best-practices/app_publishing'],
            },
            {
              // 日志收集对接到阿里云日志服务
              to: '/practices/app-dev/collect_log',
              from: ['/get-start/best-practices/collect_log'],
            },
            {
              // 组件配置文件实践
              to: '/practices/app-dev/config_file',
              from: ['/get-start/best-practices/config_file'],
            },
            {
              // Spring Cloud 微服务部署在 Rainbond 的优势
              to: '/practices/app-dev/spring-cloud-advantage',
              from: ['/get-start/best-practices/spring_cloud/spring-cloud-advantage'],
            },
            {
              // Spring Cloud 微服务部署在 Rainbond 的案例
              to: '/practices/app-dev/spring-cloud-case',
              from: ['/get-start/best-practices/spring_cloud/spring-cloud-case'],
            },
            {
              // Spring Cloud 微服务与 Service Mesh 的融合
              to: '/practices/app-dev/spring-cloud-merge',
              from: ['/get-start/best-practices/spring_cloud/spring-cloud-merge'],
            },
            {
              // 基于Rainbond实现一键上线/回滚
              to: '/practices/app-dev/update-rollback',
              from: ['/get-start/best-practices/update-rollback'],
            },
            {
              // 基于 PinPoint 实现微服务无侵入的监控与链路追踪
              to: '/practices/app-dev/work_with_apm',
              from: ['/get-start/best-practices/work_with_apm'],
            },
            {
              // 日志对接 ELK 体系
              to: '/practices/app-dev/work_with_elk',
              from: ['/get-start/best-practices/work_with_elk'],
            },
            {
              // 整合 Git 仓库快速部署组件
              to: '/practices/app-dev/work_with_git',
              from: ['/get-start/best-practices/work_with_git'],
            },
            {
              // 在 Rainbond 部署 API-Gateway
              to: '/practices/app-dev/work_with_kong',
              from: ['/get-start/best-practices/work_with_kong'],
            },
            {
              // 快速安装
              to: '/quick-start/quick-install',
              from: ['/quick-start/rainbond_install'],
            },
            {
              // 通信变量注入
              to: '/user-manual/component-connection/connection_env',
              from: ['/docs/user-manual/app-service-manage/service-rely'],
            },
            {
              // 控制台迁移
              to: '/user-operations/deploy/install-with-ui/console-recover',
              from: ['/user-operations/ha-deploy/console-recover'],
            },
            {
              // 基于主机高可用安装
              to: '/user-operations/deploy/install-with-ui/ha-installation',
              from: ['/user-operations/ha-deployment/ha-installation'],
            },
            {
              // 安装故障排查
              to: '/user-operations/deploy/install-troubleshoot/ui-install-troubleshoot',
              from: ['/user-operations/install/troubleshooting'],
            },
          ],
        },
      ],
    ],
};

module.exports = config;
