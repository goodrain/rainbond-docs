const sidebars = {
  // But you can create a sidebar manually
  docs: [
    'quick-start/introduction',
    {
      type: 'category',
      label: '快速开始',
      collapsed: false,
      items: [
        'quick-start/quick-install',
        'quick-start/getting-started'
      ]
    },
    {
      type: 'category',
      label: '使用教程',
      items: [
        'tutorial/via-rainbond-deploy-sourceandmiddleware',
        'tutorial/component-version-update-and-rollback',
        'tutorial/custom-gateway',
        'tutorial/app-template-manage',
        'tutorial/app-template-offline',
        'tutorial/docking-selfhost'
      ]
    },
    {
      type: 'category',
      label: '安装&升级',
      items: [
        {
          type: 'category',
          label: '基于主机安装',
          link: {
            type: 'doc',
            id: 'installation/install-with-ui/index',
          },
          items: [
            'installation/install-with-ui/console-recover',
            'installation/install-with-ui/ha',

          ]
        },
        {
          type: 'category',
          label: '基于 Kubernetes 安装',
          link: {
            type: 'doc',
            id: 'installation/install-with-helm/index'
          },
          items: [
            'installation/install-with-helm/vaules-config',
          ]
        },
        'installation/offline/index',
        'upgrade/latest-version',
        'installation/uninstall',
      ]
    },
    {
      type: 'category',
      label: '操作指南',
      items: [
        {
          type: 'category',
          label: '应用部署',
          items: [
            {
              type: 'category',
              label: '使用源代码部署',
              items: [
                'how-to-guides/app-deploy/source-code/springboot',
                'how-to-guides/app-deploy/source-code/nodejs',
                'how-to-guides/app-deploy/source-code/python',
                'how-to-guides/app-deploy/source-code/golang',
                'how-to-guides/app-deploy/source-code/php',
                'how-to-guides/app-deploy/source-code/dockefile',
                'how-to-guides/app-deploy/source-code/html',
                'how-to-guides/app-deploy/source-code/thirdparty',
              ]
            },
            {
              type: 'category',
              label: '使用容器镜像部署',
              items: [
                'how-to-guides/app-deploy/image/image-example',
                'how-to-guides/app-deploy/image/via-registry-deploy',
              ]
            },
            {
              type: 'category',
              label: '使用 YAML/Helm 部署',
              items: [
                'how-to-guides/app-deploy/deploy-using-yaml-helm/yaml-convert-ram',
                'how-to-guides/app-deploy/deploy-using-yaml-helm/yaml-example',
                {
                  type: 'category',
                  label: '使用 Helm Chart 部署',
                  link: {
                    type: 'doc',
                    id: 'how-to-guides/app-deploy/deploy-using-yaml-helm/helm-example',
                  },
                  items: [
                    'how-to-guides/app-deploy/deploy-using-yaml-helm/export-chart',
                  ]
                },
              ]
            },
            'how-to-guides/app-deploy/deploy-job',
            'how-to-guides/app-deploy/gitops',
            'how-to-guides/app-deploy/import-resource',
          ]
        },
        {
          type: 'category',
          label: '应用运维',
          items: [
            'how-to-guides/app-ops/lifecycle',
            'how-to-guides/app-ops/service-auto-scaling',
            'how-to-guides/app-ops/environment',
            'how-to-guides/app-ops/dependon',
            'how-to-guides/app-ops/storage',
            'how-to-guides/app-ops/app-sidecar',
            'how-to-guides/app-ops/k8s-attribute',
            'how-to-guides/app-ops/environment-manage',
            'how-to-guides/app-ops/auto-build',
            'how-to-guides/app-ops/cert-manager',
            {
              type: 'category',
              label: '应用商店',
              link: {
                type: 'doc',
                id: 'how-to-guides/app-ops/app-store-manage/index'
              },
              items: [
                'how-to-guides/app-ops/app-store-manage/install-app',
                'how-to-guides/app-ops/app-store-manage/share-app',
                'how-to-guides/app-ops/app-store-manage/export-non-container-package',
              ]
            },
          ]
        },
        // {
        //   type: 'category',
        //   label: 'Pipeline 概述',
        //   link: {
        //     type: 'doc',
        //     id: 'devops/pipeline/index',
        //   },
        //   items: [
        //     'devops/pipeline/install',
        //     'devops/pipeline/app-service',
        //     'devops/pipeline/repository',
        //     'devops/pipeline/images',
        //     'devops/pipeline/deploy-history',
        //     'devops/pipeline/pipelines',
        //   ]
        // },
        // {
        {
          type: 'category',
          label: '微服务部署',
          items: [
            'how-to-guides/micro-service-deploy/intro',
            'how-to-guides/micro-service-deploy/pig-example',
            'how-to-guides/micro-service-deploy/blade-example',
          ]
        },
        {
          type: 'category',
          label: '应用交付',
          items: [
            {
              type: 'category',
              label: '在线持续交付',
              items: [
                'how-to-guides/delivery/continuous/source-code',
                'how-to-guides/delivery/continuous/ram',
                'how-to-guides/delivery/continuous/multi-env',
              ]
            },
            {
              type: 'category',
              label: '离线交付',
              items: [
                'how-to-guides/delivery/offline/micro-service',
                'how-to-guides/delivery/offline/development-iteration',
              ]
            },
            {
              type: 'category',
              label: '应用模板参数说明',
              link: {
                type: 'doc',
                id: 'how-to-guides/delivery/app-model-parameters',
              },
              items: [
                'how-to-guides/delivery/upgrade-app',
              ]
            },
          ]
        },
        {
          type: 'category',
          label: '国产化信创',
          items: [
            'how-to-guides/localization-guide/intro',
            'how-to-guides/localization-guide/multi-arch-installation',
            'how-to-guides/localization-guide/multi-arch-app-deploy',
            'how-to-guides/localization-guide/multi-arch-app-orchestration',
            'how-to-guides/localization-guide/multi-arch-model',
          ]
        },
        // {
        //   type: 'category',
        //   label: '虚拟机指南',
        //   link: {
        //     type: 'doc',
        //     id: 'vm-guide/index'
        //   },
        //   items: [
        //     'vm-guide/overview',
        //     'vm-guide/vm_deploy',
        //     'vm-guide/vm_use',
        //   ]
        // },
      ]
    },
    {
      type: 'category',
      label: '参考指南',
      items: [
        {
          type: 'category',
          label: 'Rainbond 中的工具集成',
          items: [
            {
              type: 'category',
              label: 'CI 工具',
              items: [
                'reference/ci-tools/gitlab-ci',
                'reference/ci-tools/sonarqube',
              ]
            },
            {
              type: 'category',
              label: '链路追踪',
              items: [
                'reference/tracking/pinpoint',
                'reference/tracking/skywalking',
                'reference/tracking/jaeger',
              ]
            },
            {
              type: 'category',
              label: '性能分析',
              items: [
                'reference/analysis/pyroscope',
                'reference/analysis/arthas',
              ]
            },
          ]
        },
        {
          type: 'category',
          label: 'Rainbond 架构',
          items: [
            // 'quick-start/differences',
            'quick-start/architecture/design-concept',
            'quick-start/architecture/flow',
            'quick-start/architecture/architecture'
          ]
        },
        {
          "type": "category",
          "label": "最佳实践",
          "items": [
            "reference/best-practice/connect-api",
            "reference/best-practice/auto-schema",
            "reference/best-practice/data-initialization"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "运维指南",
      "items": [
        'ops-guides/overview',
        {
          "type": "category",
          "label": "管理集群",
          "items": [
            "ops-guides/management/resource-cleanup",
            "ops-guides/management/data-migration",
            "ops-guides/management/buildkit-args",
            "ops-guides/management/switch-registry",
            "ops-guides/management/add-gatewayorchaos",
            "ops-guides/management/change-tcp-range",
            "ops-guides/management/reset-pwd",
          ]
        },
        {
          "type": "category",
          "label": "配置集群",
          "items": [
            "ops-guides/configuration/use-domain-for-rainbond",
          ]
        },
        "ops-guides/cli-tools",
      ]
    },
    'faq/index',
    {
      type: 'category',
      label: '故障排除',
      link: {
        type: 'doc',
        id: 'troubleshooting/index'
      },
      items: [
        'troubleshooting/install',
        'troubleshooting/cluster-connect',
        'troubleshooting/common',
      ]
    },
    {
      type: 'category',
      label: '贡献指南',
      link: {
        type: 'doc',
        id: 'contribution/index'
      },
      items: [
        'contribution/code/index',
        'contribution/code/ui',
        'contribution/code/console',
        'contribution/code/region',
        'contribution/document/index',
      ]
    },
    'support',
  ],
  api: [
    'api/Intro',
    {
      type: 'category',
      label: '企业API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/enterprise'
        }
      ]
    },
    {
      type: 'category',
      label: '团队API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/team',
        },
      ]
    },
    {
      type: 'category',
      label: '集群API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/region',
        },
      ]
    },
    {
      type: 'category',
      label: '应用API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/application',
        },
      ]
    },
    {
      type: 'category',
      label: '网关API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/gateway',
        },
      ]
    },
    {
      type: 'category',
      label: '用户API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/user',
        },
      ]
    },
  ],
  store: [
    'store/marketplace',
    {
      type: 'category',
      label: '使用指南',
      items: [
        {
          type: 'autogenerated',
          dirName: 'store/install'
        }
      ]
    },
    {
      type: 'category',
      label: '发布指南',
      items: [
        {
          type: 'autogenerated',
          dirName: 'store/onLine'
        }
      ]
    },
  ]
};

module.exports = sidebars;
