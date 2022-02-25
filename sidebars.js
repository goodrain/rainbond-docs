const sidebars = {
  // But you can create a sidebar manually
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsible: false,
      items: [
        'quick-start/introduction',
        'quick-start/differences',
        'quick-start/quick-install',
        'quick-start/edition',
        'quick-start/contributing',
        'quick-start/roadmap'
      ]
    },

    {
      type: 'category',
      label: '快速入门',
      items: [
        {
          type: 'category',
          label: '学习概念',
          items: [
            'get-start/concept/team',
            'get-start/concept/app',
            'get-start/concept/component',
            'get-start/concept/plugin',
            'get-start/concept/gateway'
          ]
        },
        'get-start/team-management-and-multi-tenancy',
        'get-start/create-app-from-source',
        'get-start/create-app-from-market',
        'get-start/create-dependency',
        'get-start/release-to-market',
        'get-start/upgrade-from-market',
        'get-start/offline-delivery-with-market'
      ]
    },

    {
      type: 'category',
      label: '架构',
      items: [
        'architecture/design-concept',
        'architecture/flow',
        'architecture/architecture'
      ]
    },

    {
      type: 'category',
      label: '部署服务组件',
      items: [
        'component-create/creation-process',
        {
          type: 'category',
          label: '基于源代码创建组件',
          items: [
            {
              type: 'category',
              label: 'Java语言参考',
              items: [
                'component-create/source-create/language-support/java-maven',
                'component-create/source-create/language-support/java-multi-module-build',
                'component-create/source-create/language-support/java-jar',
                'component-create/source-create/language-support/java-war',
                'component-create/source-create/language-support/java-gradle',
                'component-create/source-create/language-support/java-maven-de',
                'component-create/source-create/language-support/tomcat-redis-session',
                'component-create/source-create/language-support/webapp-runner'
              ]
            },
            'component-create/source-create/docke-file',
            'component-create/source-create/python',
            'component-create/source-create/php',
            'component-create/source-create/netcore',
            'component-create/source-create/golang',
            'component-create/source-create/html',
            'component-create/source-create/nodejs',
            'component-create/source-create/nodejs-static',
            'component-create/source-create/slugignore',
            'component-create/source-create/procfile',
            'component-create/source-create/rainbondfile',
            'component-create/source-create/envs'
          ]
        },
        {
          type: 'category',
          label: '基于Docker镜像创建组件',
          items: [
            'component-create/docker-create/docker-compose',
            'component-create/docker-create/image'
          ]
        },
        {
          type: 'category',
          label: '接入外部服务作为第三方组件',
          items: [
            'component-create/third-create/thirdparty-define',
            'component-create/third-create/thirdparty-design',
            'component-create/third-create/thirdparty-create'
          ]
        },
        {
          type: 'category',
          label: '基于Helm应用市场创建组件',
          items: [
            'component-create/helm-create/docking_helm_store',
            'component-create/helm-create/creation-process',
            'component-create/helm-create/manage-helm-app'
          ]
        }
      ]
    }
    // {
    //   type: 'category',
    //   label: '管理应用与服务组件',
    //   items: ['user-manual/user-manual']
    // },
    // {
    //   type: 'category',
    //   label: '安装与运维',
    //   items: ['user-operations/user-operations']
    // },
    // {
    //   type: 'category',
    //   label: '常见场景最佳实践',
    //   items: ['practices/practices']
    // },
    // {
    //   type: 'category',
    //   label: '管理企业',
    //   items: ['enterprise-manager/enterprise-manager']
    // },
    // {
    //   type: 'category',
    //   label: '版本升级',
    //   items: ['upgrade/upgrade']
    // },
    // {
    //   type: 'category',
    //   label: '社区',
    //   items: ['community/community']
    // },
    // {
    //   type: 'category',
    //   label: '开源应用精选专区',
    //   items: ['opensource-app/opensource-app']
    // }
  ]
};

module.exports = sidebars;
