const sidebars = {
  // But you can create a sidebar manually
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsible: false,
      items: [
        'quick-start/introduction',
        'quick-start/quick-install',
        'quick-start/getting-started',
        // 'quick-start/differences',
        {
          type: 'category',
          label: '架构',
          items: [
            'quick-start/architecture/design-concept',
            'quick-start/architecture/flow',
            'quick-start/architecture/architecture'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '安装与升级 Rainbond',
      link: {
        type: 'doc',
        id: 'installation/index'
      },
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
        // 'installation/offline/index',
        'upgrade/latest-version',
        'installation/uninstall',
      ]
    },
    {
      type: 'category',
      label: 'DevOps 指南',
      link: {
        type: 'doc',
        id: 'devops/index'
      },
      items: [
        'devops/overview/index',
        'devops/code-repository/index',
        {
          type: 'category',
          label: '应用部署',
          link: {
            type: 'doc',
            id: 'devops/app-deploy/index'
          },
          items: [
            'devops/app-deploy/springboot',
            'devops/app-deploy/nodejs',
            'devops/app-deploy/python',
            'devops/app-deploy/golang',
            'devops/app-deploy/php',
            'devops/app-deploy/dockefile',
            'devops/app-deploy/html',
            'devops/app-deploy/thirdparty',
            {
              type: 'category',
              label: '工具集成',
              link: {
                type: 'doc',
                id: 'devops/app-deploy/ci-tools/index',
              },
              items: [
                'devops/app-deploy/ci-tools/gitlab-ci',
                'devops/app-deploy/ci-tools/sonarqube',
              ]
            },
          ]
        },
        'devops/env-version/index',
        {
          type: 'category',
          label: '持续部署',
          link: {
            type: 'doc',
            id: 'devops/continuous-deploy/index',
          },
          items: [
            'devops/continuous-deploy/gitops',
            'devops/continuous-deploy/auto-build',
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
      ]
    },
    {
      type: 'category',
      label: '原生 Kubernetes 指南',
      link: {
        type: 'doc',
        id: 'kubernetes-native-guide/index'
      },
      items: [
        'kubernetes-native-guide/overview/index',
        {
          type: 'category',
          label: '使用 YAML 部署组件',
          link: {
            type: 'doc',
            id: 'kubernetes-native-guide/yaml/index'
          },
          items: [
            'kubernetes-native-guide/yaml/create',
            'kubernetes-native-guide/yaml/example',
          ]
        },
        {
          type: 'category',
          label: '使用 Helm 部署组件',
          link: {
            type: 'doc',
            id: 'kubernetes-native-guide/helm/index'
          },
          items: [
            'kubernetes-native-guide/helm/docking_helm_store',
            'kubernetes-native-guide/helm/creation-process',
            'kubernetes-native-guide/helm/manage-helm-app',
            'kubernetes-native-guide/helm/helm-cmd-install',
            'kubernetes-native-guide/helm/example',
            'kubernetes-native-guide/helm/export-chart',
            'kubernetes-native-guide/helm/helm-offlince',
          ]
        },
        'kubernetes-native-guide/deploy-job',
        {
          type: 'category',
          label: '已有资源导入和管理',
          link: {
            type: 'doc',
            id: 'kubernetes-native-guide/import-manage/index'
          },
          items: [
            'kubernetes-native-guide/import-manage/non-workload',
            'kubernetes-native-guide/import-manage/import-resource',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '微服务架构指南',
      link: {
        type: 'doc',
        id: 'micro-service/index'
      },
      items: [
        'micro-service/overview/index',
        {
          type: 'category',
          label: 'Service Mesh 使用',
          link: {
            type: 'doc',
            id: 'micro-service/service-mesh/index'
          },
          items: [
            'micro-service/service-mesh/connection_env',
          ]
        },
        {
          type: 'category',
          label: 'Spring Cloud 微服务部署',
          link: {
            type: 'doc',
            id: 'micro-service/example/index'
          },
          items: [
            'micro-service/example/pig',
            'micro-service/example/blade',
          ]
        },
        {
          type: 'category',
          label: '链路追踪',
          link: {
            type: 'doc',
            id: 'micro-service/tracking/index'
          },
          items: [
            'micro-service/tracking/pinpoint',
            'micro-service/tracking/skywalking',
            'micro-service/tracking/jaeger',
          ]
        },
        {
          type: 'category',
          label: '性能分析',
          link: {
            type: 'doc',
            id: 'micro-service/analysis/index'
          },
          items: [
            'micro-service/analysis/pyroscope',
            'micro-service/analysis/arthas',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '应用交付指南',
      link: {
        type: 'doc',
        id: 'delivery/index'
      },
      items: [
        {
          type: 'category',
          label: '持续交付',
          link: {
            type: 'doc',
            id: 'delivery/continuous/index',
          },
          items: [
            'delivery/continuous/source-code',
            'delivery/continuous/ram',
            'delivery/continuous/multi-env',
          ]
        },
        {
          type: 'category',
          label: '离线交付',
          link: {
            type: 'doc',
            id: 'delivery/offline/index',
          },
          items: [
            'delivery/offline/micro-service',
            'delivery/offline/development-iteration',
          ]
        },
        {
          type: 'category',
          label: '应用模板参数说明',
          link: {
            type: 'doc',
            id: 'delivery/app-model-parameters',
          },
          items: [
            'delivery/upgrade-app',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '信创指南',
      link: {
        type: 'doc',
        id: 'localization-guide/index'
      },
      items: [
        'localization-guide/overview/index',
        'localization-guide/multi-arch-installation',
        'localization-guide/multi-arch-app-deploy',
        'localization-guide/multi-arch-app-orchestration',
        'localization-guide/multi-arch-model',
      ]
    },
    {
      type: 'category',
      label: '虚拟机指南',
      link: {
        type: 'doc',
        id: 'vm-guide/index'
      },
      items: [
        'vm-guide/overview',
        'vm-guide/vm_deploy',
        'vm-guide/vm_use',
      ]
    },
    {
      type: 'category',
      label: '应用运维指南',
      link: {
        type: 'doc',
        id: 'use-manual/index'
      },
      items: [
        'use-manual/lifecycle',
        'use-manual/service-auto-scaling',
        'use-manual/environment',
        'use-manual/storage',
        'use-manual/app-sidecar',
        'use-manual/k8s-attribute',
        {
          type: 'category',
          label: '应用商店',
          link: {
            type: 'doc',
            id: 'use-manual/app-store-manage/index'
          },
          items: [
            'use-manual/app-store-manage/install-app',
            'use-manual/app-store-manage/share-app',
            'use-manual/app-store-manage/export-non-container-package',
          ]
        },
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
      label: '企业版使用手册',
      link: {
        type: 'doc',
        id: 'enterprise/index'
      },
      items: [
        {
          type: 'category',
          label: '可观测性中心',
          link: {
            type: 'doc',
            id: 'enterprise/observability/index',
          },
          items: [
            'enterprise/observability/dashboard',
            'enterprise/observability/large-screen',
            'enterprise/observability/global-logs',
            'enterprise/observability/alarm',
          ]
        },
        {
          type: 'category',
          label: '微服务治理',
          link: {
            type: 'doc',
            id: 'enterprise/microservices/index',
          },
          items: [
            'enterprise/microservices/springcloud',
            'enterprise/microservices/istio',
          ]
        },
        'enterprise/xinchuang',
        'enterprise/gray-release',
        'enterprise/scanner',
        'enterprise/backup',
        'enterprise/offline',
        {
          type: 'category',
          label: '网关增强',
          link: {
            type: 'doc',
            id: 'enterprise/gateway/index',
          },
          items: [
            'enterprise/gateway/waf',
            'enterprise/gateway/api-gateway',
          ]
        },
        {
          type: 'category',
          label: '安全增强',
          link: {
            type: 'doc',
            id: 'enterprise/security/index',
          },
          items: [
            'enterprise/security/audit',
          ]
        },
        'enterprise/style',
        {
          type: 'category',
          label: '其他功能',
          link: {
            type: 'doc',
            id: 'enterprise/other/index',
          },
          items: [
            'enterprise/other/team-resource',
            'enterprise/other/file-manage',
            'enterprise/other/GPU',
          ]
        },
      ]
    },
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
