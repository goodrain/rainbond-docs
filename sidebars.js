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
        'quick-start/differences',
        {
          type: 'category',
          label: '架构',
          items: [
            'quick-start/architecture/design-concept',
            'quick-start/architecture/flow',
            'quick-start/architecture/architecture'
          ]
        },
        // 'quick-start/edition',
        // 'quick-start/contributing',
        // 'quick-start/roadmap'
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
        // 'installation/install-with-dind',
        'installation/install-with-ui/index',
        {
          type: 'category',
          label: '基于 Kubernetes 安装',
          link: {
            type: 'doc',
            id: 'installation/install-with-helm/index'
          },
          items: [
            'installation/install-with-helm/install-from-kubernetes',
            'installation/install-with-helm/vaules-config',
            {
              type: 'category',
              label: '在托管 Kubernetes 上安装',
              link: {
                type: 'doc',
                id: 'installation/install-with-helm/cloud/index'
              },
              items: [
                'installation/install-with-helm/cloud/ack-install-with-helm',
                'installation/install-with-helm/cloud/cce-install-with-helm',
              ]
            },
            {
              type: 'category',
              label: '其他安装方式',
              link: {
                type: 'doc',
                id: 'installation/install-with-helm/other/index'
              },
              items: [
                'installation/install-with-helm/other/k3s-install-with-helm',
                'installation/install-with-helm/other/install-from-minikube',
                'installation/install-with-helm/other/install-from-rancher',
              ]
            },
            // {
            //   type: 'link',
            //   label: 'Helm 命令生成工具',
            //   href: '/helm'
            // },
          ]
        },
        {
          type: 'category',
          label: '高可用集群安装',
          link: {
            type: 'doc',
            id: 'installation/ha-deployment/index'
          },
          items: [
            {
              type: 'category',
              label: '安装前准备与要求',
              link: {
                type: 'doc',
                id: 'installation/ha-deployment/overview/index'
              },
              items: [
                'installation/ha-deployment/overview/mysql-ha',
                'installation/ha-deployment/overview/deploy-keepalived',
              ]
            },
            {
              type: 'category',
              label: 'Kubernetes 集群安装',
              link: {
                type: 'doc',
                id: 'installation/ha-deployment/deploy-k8s/index'
              },
              items: [
                'installation/ha-deployment/deploy-k8s/rke-config',
              ]
            },
            {
              type: 'category',
              label: '分布式文件存储安装',
              link: {
                type: 'doc',
                id: 'installation/ha-deployment/storage/index'
              },
              items: [
                'installation/ha-deployment/storage/ceph-rbd',
              ]
            },
            {
              type: 'category',
              label: 'Rainbond 集群安装',
              link: {
                type: 'doc',
                id: 'installation/ha-deployment/deploy-rainbond/index'
              },
              items: [
                'installation/ha-deployment/deploy-rainbond/init-rainbond-config',
              ]
            },
            'installation/ha-deployment/console-recover',
          ]
        },
        'installation/offline/index',
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
            'devops/app-deploy/react-vue',
            'devops/app-deploy/springboot',
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
        {
          type: 'category',
          label: '应用调试',
          link: {
            type: 'doc',
            id: 'devops/app-debug/index',
          },
          items: [
            'devops/app-debug/nocalhost',
          ]
        },
        {
          type: 'category',
          label: 'Pipeline 概述',
          link: {
            type: 'doc',
            id: 'devops/pipeline/index',
          },
          items: [
            'devops/pipeline/install',
            'devops/pipeline/app-service',
            'devops/pipeline/repository',
            'devops/pipeline/images',
            'devops/pipeline/deploy-history',
            'devops/pipeline/pipelines',
          ]
        },
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
            'kubernetes-native-guide/import-manage/special-attribute',
          ]
        },
        'kubernetes-native-guide/gateway-api',
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
            'micro-service/service-mesh/regist_and_discover',
            'micro-service/service-mesh/connection_env',
            'micro-service/service-mesh/traffic-management',
            {
              type: 'category',
              label: '熔断与限流',
              link: {
                type: 'doc',
                id: 'micro-service/service-mesh/fused-limit/index'
              },
              items: [
                'micro-service/service-mesh/fused-limit/fused',
                'micro-service/service-mesh/fused-limit/limit',
              ]
            },
            {
              type: 'category',
              label: 'Service Mesh 治理模式',
              link: {
                type: 'doc',
                id: 'micro-service/service-mesh/model/index'
              },
              items: [
                'micro-service/service-mesh/model/deploy-istio',
              ]
            },
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
        'delivery/app-model-parameters',
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
      label: '集群管理指南',
      link: {
        type: 'doc',
        id: 'cluster-manage/index'
      },
      items: [
        {
          type: 'category',
          label: '集群状态监控',
          link: {
            type: 'doc',
            id: 'cluster-manage/status-monitor/index',
          },
          items: [
            'cluster-manage/status-monitor/dashboard',
          ]
        },
        'cluster-manage/cluster-info',
        {
          type: 'category',
          label: '节点管理',
          link: {
            type: 'doc',
            id: 'cluster-manage/nodes/index'
          },
          items: [
            'cluster-manage/nodes/add-node',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '使用手册',
      link: {
        type: 'doc',
        id: 'use-manual/index'
      },
      items: [
        {
          type: 'category',
          label: '使用入门',
          link: {
            type: 'doc',
            id: 'use-manual/get-start/index'
          },
          items: [
            {
              type: 'category',
              label: '学习概念',
              link: {
                type: 'doc',
                id: 'use-manual/get-start/concept/index'
              },
              items: [
                'use-manual/get-start/concept/team',
                'use-manual/get-start/concept/app',
                'use-manual/get-start/concept/component',
                'use-manual/get-start/concept/plugin',
                'use-manual/get-start/concept/gateway'
              ]
            },
            'use-manual/get-start/team-management-and-multi-tenancy',
            'use-manual/get-start/create-app-from-source',
            'use-manual/get-start/create-app-from-market',
            'use-manual/get-start/create-dependency',
            'use-manual/get-start/release-to-market',
            'use-manual/get-start/upgrade-from-market',
            'use-manual/get-start/offline-delivery-with-market'
          ]
        },
        {
          type: 'category',
          label: '部署服务组件',
          link: {
            type: 'doc',
            id: 'use-manual/component-create/index'
          },
          items: [
            'use-manual/component-create/creation-process',
            {
              type: 'category',
              label: '基于源代码创建组件',
              link: {
                type: 'doc',
                id: 'use-manual/component-create/language-support/index'
              },
              items: [
                {
                  type: 'category',
                  label: 'Java语言参考',
                  link: {
                    type: 'doc',
                    id: 'use-manual/component-create/language-support/java/index'
                  },
                  items: [
                    'use-manual/component-create/language-support/java/java-maven',
                    'use-manual/component-create/language-support/java/java-multi-module-build',
                    'use-manual/component-create/language-support/java/java-jar',
                    'use-manual/component-create/language-support/java/java-war',
                    'use-manual/component-create/language-support/java/java-gradle',
                    'use-manual/component-create/language-support/java/java-maven-de',
                    'use-manual/component-create/language-support/java/tomcat-redis-session',
                    'use-manual/component-create/language-support/java/webapp-runner'
                  ]
                },
                'use-manual/component-create/language-support/dockefile',
                'use-manual/component-create/language-support/python',
                'use-manual/component-create/language-support/php',
                'use-manual/component-create/language-support/netcore',
                'use-manual/component-create/language-support/golang',
                'use-manual/component-create/language-support/html',
                'use-manual/component-create/language-support/nodejs',
                'use-manual/component-create/language-support/nodejs-static',
                'use-manual/component-create/language-support/slugignore',
                'use-manual/component-create/language-support/procfile',
                'use-manual/component-create/language-support/rainbondfile',
                'use-manual/component-create/language-support/envs'
              ]
            },
            {
              type: 'category',
              label: '基于Docker镜像创建组件',
              link: {
                type: 'doc',
                id: 'use-manual/component-create/image-support/index'
              },
              items: [
                'use-manual/component-create/image-support/docker-compose',
                'use-manual/component-create/image-support/image'
              ]
            },
            {
              type: 'category',
              label: '接入外部服务作为第三方组件',
              link: {
                type: 'doc',
                id: 'use-manual/component-create/thirdparty-service/index'
              },
              items: [
                'use-manual/component-create/thirdparty-service/thirdparty-define',
                'use-manual/component-create/thirdparty-service/thirdparty-design',
                'use-manual/component-create/thirdparty-service/thirdparty-create'
              ]
            },
            {
              type: 'category',
              label: '本地文件创建组件',
              link: {
                type: 'doc',
                id: 'use-manual/component-create/package-support/index'
              },
              items: [
                'use-manual/component-create/package-support/jar-war',
              ]
            },
          ]
        },
        {
          type: 'category',
          label: '组件管理',
          link: {
            type: 'doc',
            id: 'use-manual/component-manage/index'
          },
          items: [
            {
              type: 'category',
              label: '组件总览',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/overview/index'
              },
              items: [
                'use-manual/component-manage/overview/basic-operation',
                'use-manual/component-manage/overview/service-properties',
              ]
            },
            {
              type: 'category',
              label: '组件监控',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/monitor/index'
              },
              items: [
                'use-manual/component-manage/monitor/service-monitor',
                'use-manual/component-manage/monitor/custom-monitor',
              ]
            },
            'use-manual/component-manage/service-log',
            {
              type: 'category',
              label: '组件伸缩',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/automatic-telescoping/index'
              },
              items: [
                'use-manual/component-manage/automatic-telescoping/service-auto-scaling'
              ]
            },
            {
              type: 'category',
              label: '组件环境配置',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/env/index'
              },
              items: [
                'use-manual/component-manage/env/advanced-env'
              ]
            },
            {
              type: 'category',
              label: '组件存储',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/custom-volume/index'
              },
              items: [
                'use-manual/component-manage/custom-volume/service-volume-custom'
              ]
            },
            'use-manual/component-manage/service-port-domain',
            'use-manual/component-manage/service-plugins',
            {
              type: 'category',
              label: '组件构建源',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/build-source/index'
              },
              items: [
                'use-manual/component-manage/build-source/change_source_type'
              ]
            },
            'use-manual/component-manage/other/index'
          ]
        },
        {
          type: 'category',
          label: '应用管理',
          link: {
            type: 'doc',
            id: 'use-manual/app-manage/index'
          },
          items: [
            {
              type: 'category',
              label: '应用总览',
              link: {
                type: 'doc',
                id: 'use-manual/app-manage/overview/index'
              },
              items: [
                'use-manual/app-manage/overview/app-topology',
                'use-manual/app-manage/overview/operation',
              ]
            },
            'use-manual/app-manage/share-app',
            {
              type: 'link',
              label: '应用网关',
              href: '/docs/use-manual/team-manage/gateway/',
            },
            {
              type: 'category',
              label: '应用升级',
              link: {
                type: 'doc',
                id: 'use-manual/app-manage/app-upgrade/index'
              },
              items: [
                'use-manual/app-manage/app-upgrade/upgrade-app',
              ]
            },
            'use-manual/app-manage/config-group',
          ]
        },
        {
          type: 'category',
          label: '团队管理',
          link: {
            type: 'doc',
            id: 'use-manual/team-manage/index'
          },
          items: [
            {
              type: 'category',
              label: '网关',
              link: {
                type: 'doc',
                id: 'use-manual/team-manage/gateway/index'
              },
              items: [
                {
                  type: 'category',
                  label: '访问策略管理',
                  link: {
                    type: 'doc',
                    id: 'use-manual/team-manage/gateway/rules/index'
                  },
                  items: [
                    'use-manual/team-manage/gateway/rules/domain',
                    'use-manual/team-manage/gateway/rules/tcpip',
                  ]
                },
                'use-manual/team-manage/gateway/certs/index',
              ]
            },
            {
              type: 'category',
              label: '插件',
              link: {
                type: 'doc',
                id: 'use-manual/team-manage/plugin-manage/index'
              },
              items: [
                'use-manual/team-manage/plugin-manage/plugin-design-develop',
                'use-manual/team-manage/plugin-manage/mesh-plugin',
                'use-manual/team-manage/plugin-manage/new-plugin',
                'use-manual/team-manage/plugin-manage/tcm-plugin',
              ]
            },
          ]
        },
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
    {
      type: 'category',
      label: '运维手册',
      link: {
        type: 'doc',
        id: 'ops-guide/index'
      },
      items: [
        {
          type: 'category',
          label: '平台组件概述',
          link: {
            type: 'doc',
            id: 'ops-guide/component/index'
          },
          items: [
            'ops-guide/component/rainbond-operator',
            'ops-guide/component/rbd-hub',
          ]
        },
        'ops-guide/migrate-app',
        {
          type: 'category',
          label: '高级运维',
          link: {
            type: 'doc',
            id: 'ops-guide/management/index'
          },
          items: [
            'ops-guide/management/resource-cleanup',
            'ops-guide/management/data-migration',
            'ops-guide/management/container-runtime-switch',
            'ops-guide/management/change-gateway',
            'ops-guide/management/buildkit-args',
            'ops-guide/management/docker-log',
            'ops-guide/management/custom-shared-storage',
            'ops-guide/management/change-ports',
            'ops-guide/management/switch-registry',
            'ops-guide/management/auto-cert',
            'ops-guide/management/reset-admin-password',
          ]
        },
        {
          type: 'category',
          label: '存储解决方案',
          link: {
            type: 'doc',
            id: 'ops-guide/storage/index'
          },
          items: [
            'ops-guide/storage/ali-disk',
            'ops-guide/storage/change-nfs'
          ]
        },
        {
          type: 'category',
          label: '集群监控',
          link: {
            type: 'doc',
            id: 'ops-guide/monitor/index'
          },
          items: [
            'ops-guide/monitor/monitor-alert-items',
            'ops-guide/monitor/monitor-alert-deploy',
            {
              type: 'category',
              label: '告警配置项',
              link: {
                type: 'doc',
                id: 'ops-guide/monitor/alert/index'
              },
              items: [
                'ops-guide/monitor/alert/alert-wechat',
                'ops-guide/monitor/alert/alert-dingtalk',
                'ops-guide/monitor/alert/alert-mail'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'CLI 命令行',
          link: {
            type: 'doc',
            id: 'ops-guide/tools/index'
          },
          items: [
            'ops-guide/tools/grctl',
            'ops-guide/tools/shell',
          ]
        },
        {
          type: 'category',
          label: '扩展',
          link: {
            type: 'doc',
            id: 'expand/index'
          },
          items: [
            'expand/practices/app-dev/connect-api',
            'expand/practices/app-dev/auto-schema',
            'expand/practices/app-dev/data-initialization',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '常见问题',
      link: { 
        type: 'doc', 
        id: 'troubleshooting/index' 
      },
      items: [
        {
          type: 'category',
          label: '安装问题',
          link: {
            type: 'doc',
            id: 'troubleshooting/installation/index'
          },
          items: [
            'troubleshooting/installation/dind',
            'troubleshooting/installation/ui',
            'troubleshooting/installation/helm',
          ]
        },
        {
          type: 'category',
          label: '使用问题',
          link: {
            type: 'doc',
            id: 'troubleshooting/use/index'
          },
          items: [
            'troubleshooting/use/build',
            'troubleshooting/use/run',
            'troubleshooting/use/gateway',
            'troubleshooting/use/cluster-connect',
            'troubleshooting/use/console-exception',
            'troubleshooting/use/cluster-component',
            'troubleshooting/use/other',
          ]
        },
      ],
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
          label: '安全能力',
          link: {
            type: 'doc',
            id: 'enterprise/security/index',
          },
          items: [
            'enterprise/security/audit',
          ]
        },
        'enterprise/style',
        'enterprise/GPU',
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
