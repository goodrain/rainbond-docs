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
        {
          type: 'category',
          label: '快速入门',
          link: {
            type: 'doc',
            id: 'quick-start/get-start/index'
          },
          items: [
            {
              type: 'category',
              label: '学习概念',
              link: {
                type: 'doc',
                id: 'quick-start/get-start/concept/index'
              },
              items: [
                'quick-start/get-start/concept/team',
                'quick-start/get-start/concept/app',
                'quick-start/get-start/concept/component',
                'quick-start/get-start/concept/plugin',
                'quick-start/get-start/concept/gateway'
              ]
            },
            'quick-start/get-start/team-management-and-multi-tenancy',
            'quick-start/get-start/create-app-from-source',
            'quick-start/get-start/create-app-from-market',
            'quick-start/get-start/create-dependency',
            'quick-start/get-start/release-to-market',
            'quick-start/get-start/upgrade-from-market',
            'quick-start/get-start/offline-delivery-with-market'
          ]
        },
        {
          type: 'category',
          label: '架构',
          items: [
            'quick-start/architecture/design-concept',
            'quick-start/architecture/flow',
            'quick-start/architecture/architecture'
          ]
        },
        'quick-start/edition',
        // 'quick-start/contributing',
        'quick-start/roadmap'
      ]
    },
    {
      type: 'category',
      label: '安装与运维',
      link: {
        type: 'doc',
        id: 'user-operations/index'
      },
      items: [
        'user-operations/op-guide/component-description',
        {
          type: 'category',
          label: '安装 Rainbond',
          link: {
            type: 'doc',
            id: 'user-operations/deploy/index'
          },
          items: [
            {
              type: 'category',
              label: '基于 Helm 安装',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-with-helm/index'
              },
              items: [
                'user-operations/deploy/install-with-helm/k8s-install-with-helm',
                'user-operations/deploy/install-with-helm/k3s-install-with-helm',
                'user-operations/deploy/install-with-helm/ack-install-with-helm',
                'user-operations/deploy/install-with-helm/install-from-rancher',
                'user-operations/deploy/install-with-helm/vaules-config',
                'user-operations/deploy/install-with-helm/uninstall-with-helm'
              ]
            },
            {
              type: 'category',
              label: '基于 Web 界面安装',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-with-ui/index'
              },
              items: [
                'user-operations/deploy/install-with-ui/host-install-with-ui',
                'user-operations/deploy/install-with-ui/ha-installation',
                'user-operations/deploy/install-with-ui/install-by-rainbond',
                'user-operations/deploy/install-with-ui/install-from-k8s',
                'user-operations/deploy/install-with-ui/console-recover'
              ]
            },
            {
              type: 'category',
              label: '安装问题排查',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-troubleshoot/index'
              },
              items: [
                'user-operations/deploy/install-troubleshoot/dind-install-troubleshoot',
                'user-operations/deploy/install-troubleshoot/helm-install-troubleshoot',
                'user-operations/deploy/install-troubleshoot/ui-install-troubleshoot'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '部署集群扩展文档',
          link: {
            type: 'doc',
            id: 'user-operations/Install-extension/index'
          },
          items: [
            'user-operations/Install-extension/centos_keepalived',
            'user-operations/Install-extension/ubuntu_keepalived',
            'user-operations/Install-extension/mysql-ha'
          ]
        },
        {
          type: 'category',
          label: '集群管理',
          link: {
            type: 'doc',
            id: 'user-operations/cluster-manage/index'
          },
          items: [
            'user-operations/cluster-manage/add-cluster',
            'user-operations/cluster-manage/manage-cluster',
            'user-operations/cluster-manage/manage-rke-cluster',
            'user-operations/cluster-manage/init-region',
            'user-operations/cluster-manage/init-region-storage',
            'user-operations/cluster-manage/resource-limit'
          ]
        },
        'user-operations/management/resource-cleanup',
        'user-operations/management/component-op',
        'user-operations/management/dashboard-op',
        'user-operations/management/data-migration',
        {
          type: 'category',
          label: '存储解决方案',
          link: {
            type: 'doc',
            id: 'user-operations/storage/index'
          },
          items: [
            'user-operations/storage/deploy-glusterfs',
            'user-operations/storage/ceph-rbd',
            'user-operations/storage/deploy-nfsclient',
            'user-operations/storage/ali-disk'
          ]
        },
        {
          type: 'category',
          label: '集群监控',
          link: {
            type: 'doc',
            id: 'user-operations/monitor/index'
          },
          items: [
            'user-operations/monitor/monitor-alert-items',
            'user-operations/monitor/monitor-alert-deploy',
            {
              type: 'category',
              label: '报警配置项',
              link: {
                type: 'doc',
                id: 'user-operations/monitor/alert/index'
              },
              items: [
                'user-operations/monitor/alert/alert-wechat',
                'user-operations/monitor/alert/alert-dingtalk',
                'user-operations/monitor/alert/alert-mail'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '周边工具集',
          link: {
            type: 'doc',
            id: 'user-operations/tools/index'
          },
          items: [
            'user-operations/tools/kubectl',
            'user-operations/tools/grctl'
          ]
        }
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
              label: '基于Helm应用市场创建组件',
              link: {
                type: 'doc',
                id: 'use-manual/component-create/helm-support/index'
              },
              items: [
                'use-manual/component-create/helm-support/docking_helm_store',
                'use-manual/component-create/helm-support/creation-process',
                'use-manual/component-create/helm-support/manage-helm-app'
              ]
            }
          ]
        },

        {
          type: 'category',
          label: '管理应用与服务组件',
          link: {
            type: 'doc',
            id: 'use-manual/user-manual/index'
          },
          items: [
            'use-manual/user-manual/join-team/join-team',
            'use-manual/user-manual/app-create/app-create',
            {
              type: 'category',
              label: '外网访问组件',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/gateway/index'
              },
              items: [
                'use-manual/user-manual/gateway/domain',
                'use-manual/user-manual/gateway/tcpip',
                'use-manual/user-manual/gateway/cert-management'
              ]
            },
            {
              type: 'category',
              label: '组件间通信',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/component-connection/index'
              },
              items: [
                'use-manual/user-manual/component-connection/regist_and_discover',
                'use-manual/user-manual/component-connection/regist_and_discover_grpc',
                'use-manual/user-manual/component-connection/connection_env'
              ]
            },
            {
              type: 'category',
              label: '组件开发',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/component-dev/index'
              },
              items: [
                'use-manual/user-manual/component-dev/build_and_version',
                'use-manual/user-manual/component-dev/build_source',
                'use-manual/user-manual/component-dev/auto_build',
                'use-manual/user-manual/component-dev/app_copy',
                'use-manual/user-manual/component-dev/service-env'
              ]
            },
            {
              type: 'category',
              label: '组件运维',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/component-op/index'
              },
              items: [
                {
                  type: 'category',
                  label: '组件基本操作',
                  items: [
                    'use-manual/user-manual/component-op/basic-operation/basic-operation',
                    'use-manual/user-manual/component-op/basic-operation/service-properties'
                  ]
                },
                'use-manual/user-manual/component-op/service-log',
                {
                  type: 'category',
                  label: '组件伸缩',
                  link: {
                    type: 'doc',
                    id: 'use-manual/user-manual/component-op/automatic-telescoping/index'
                  },
                  items: [
                    'use-manual/user-manual/component-op/automatic-telescoping/service-scaling',
                    'use-manual/user-manual/component-op/automatic-telescoping/service-auto-scaling'
                  ]
                },
                {
                  type: 'category',
                  label: '组件存储',
                  link: {
                    type: 'doc',
                    id: 'use-manual/user-manual/component-op/custom-volume/index'
                  },
                  items: [
                    'use-manual/user-manual/component-op/custom-volume/service-volume',
                    'use-manual/user-manual/component-op/custom-volume/service-volume-custom'
                  ]
                },
                'use-manual/user-manual/component-op/service-port-domain',
                'use-manual/user-manual/component-op/custom-monitor',
                'use-manual/user-manual/component-op/health',
                {
                  type: 'category',
                  label: '组件性能分析与监控',
                  link: {
                    type: 'doc',
                    id: 'use-manual/user-manual/component-op/performance-analysis/index'
                  },
                  items: [
                    'use-manual/user-manual/component-op/performance-analysis/service-monitor'
                  ]
                },
                'use-manual/user-manual/component-op/service-other-set',
                'use-manual/user-manual/component-op/service-plugins'
              ]
            },
            {
              type: 'category',
              label: '插件开发',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/plugin-manage/index'
              },
              items: [
                'use-manual/user-manual/plugin-manage/plugin-design-develop',
                'use-manual/user-manual/plugin-manage/mesh-plugin',
                'use-manual/user-manual/plugin-manage/new-plugin'
              ]
            },
            {
              type: 'category',
              label: '应用运维',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/app-manage/index'
              },
              items: [
                'use-manual/user-manual/app-manage/app-topology',
                'use-manual/user-manual/app-manage/operation',
                'use-manual/user-manual/app-manage/add-service',
                'use-manual/user-manual/app-manage/upgrade_app',
                'use-manual/user-manual/app-manage/share-app',
                'use-manual/user-manual/app-manage/config-group',
                'use-manual/user-manual/app-manage/governance-model',
                'use-manual/user-manual/app-manage/deploy-istio'
              ]
            },
            {
              type: 'category',
              label: '构建微服务架构',
              link: {
                type: 'doc',
                id: 'use-manual/user-manual/architecture/index'
              },
              items: [
                'use-manual/user-manual/architecture/service_assembly',
                'use-manual/user-manual/architecture/rate-limiting',
                'use-manual/user-manual/architecture/traffic-management',
                'use-manual/user-manual/architecture/network-visualization'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '管理企业',
          link: {
            type: 'doc',
            id: 'use-manual/enterprise-manager/index'
          },
          items: [
            {
              type: 'category',
              label: '用户管理',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manager/user-registration-login/index'
              },
              items: [
                {
                  type: 'category',
                  label: 'OAuth2.0集成',
                  link: {
                    type: 'doc',
                    id: 'use-manual/enterprise-manager/user-registration-login/oauth2.0/index'
                  },
                  items: [
                    'use-manual/enterprise-manager/user-registration-login/oauth2.0/oauth-product-desc',
                    'use-manual/enterprise-manager/user-registration-login/oauth2.0/oauth-conf',
                    'use-manual/enterprise-manager/user-registration-login/oauth2.0/oauth-git',
                    'use-manual/enterprise-manager/user-registration-login/oauth2.0/oauth-create'
                  ]
                },
                'use-manual/enterprise-manager/user-registration-login/reset_admin_user_password',
                'use-manual/enterprise-manager/user-registration-login/user-register'
              ]
            },
            {
              type: 'category',
              label: '企业中台',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manager/enterprise/index'
              },
              items: [
                'use-manual/enterprise-manager/enterprise/dashboad',
                {
                  type: 'category',
                  label: '应用市场',
                  link: {
                    type: 'doc',
                    id: 'use-manual/enterprise-manager/enterprise/appcenter/index'
                  },
                  items: [
                    'use-manual/enterprise-manager/enterprise/appcenter/desc',
                    'use-manual/enterprise-manager/enterprise/appcenter/application-template',
                    'use-manual/enterprise-manager/enterprise/appcenter/share-app-market',
                    'use-manual/enterprise-manager/enterprise/appcenter/add-app',
                    'use-manual/enterprise-manager/enterprise/appcenter/app-specification'
                  ]
                },
                {
                  type: 'category',
                  label: '团队管理',
                  link: {
                    type: 'doc',
                    id: 'use-manual/enterprise-manager/enterprise/teams/index'
                  },
                  items: [
                    'use-manual/enterprise-manager/enterprise/teams/create-team'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '扩展',
      link: {
        type: 'doc',
        id: 'user-operations/tools/index'
      },
      items: [
        {
          type: 'category',
          label: '常见场景最佳实践',
          link: {
            type: 'doc',
            id: 'expand/practices/index'
          },
          items: [
            'expand/practices/app-dev/work_with_kong',
            'expand/practices/app-dev/work_with_apm',
            'expand/practices/app-dev/work_with_git',
            'expand/practices/app-dev/work_with_elk',
            'expand/practices/app-dev/app_publishing',
            'expand/practices/app-dev/ab_testing',
            'expand/practices/app-dev/update-rollback',
            'expand/practices/app-dev/config_file',
            'expand/practices/app-dev/collect_log',
            'expand/practices/app-dev/java-exporter',
            'expand/practices/app-dev/build_by_dockerfile',
            'expand/practices/app-dev/statefulset',
            'expand/practices/app-dev/build-react-and-vue',
            'expand/practices/app-dev/connect-api',
            'expand/practices/app-dev/port-conflict',
            'expand/practices/app-dev/auto-schema',
            'expand/practices/app-dev/deploy-spark',
            'expand/practices/app-dev/port-alias',
            'expand/practices/operator/gateway-node',
            'expand/practices/app-dev/spring-cloud-advantage',
            'expand/practices/app-dev/spring-cloud-merge',
            'expand/practices/app-dev/spring-cloud-case',
            'expand/practices/app-dev/data-initialization',
            'expand/practices/app-dev/work-helm-app',
            'expand/practices/app-dev/shell-hook-cdn'
          ]
        },
        {
          type: 'category',
          label: '开源应用精选专区',
          link: {
            type: 'doc',
            id: 'expand/opensource-app/index'
          },
          items: [
            'expand/opensource-app/itest',
            'expand/opensource-app/maxkey',
            'expand/opensource-app/TDengine',
            'expand/opensource-app/chatopera',
            'expand/opensource-app/logikm'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '版本升级',
      link: {
        type: 'doc',
        id: 'upgrade/index'
      },
      items: [
        'upgrade/5.2.2-5.3.1',
        'upgrade/5.3.0-upgrade',
        'upgrade/5.3.1-upgrade',
        'upgrade/5.3.2-upgrade',
        'upgrade/5.4.0-upgrade',
        'upgrade/5.5.0-upgrade',
        'upgrade/5.6.0-upgrade'
      ]
    },
    {
      type: 'category',
      label: '社区',
      link: {
        type: 'doc',
        id: 'community/index'
      },
      items: [
        'community/FAQs/faqs',
        // 'community/contribution/contribution',
        'community/upcoming-events',
        // 'community/doc-style',
        'community/change/5.3.0-5.3.1',
        'community/change/5.3.1-5.3.2',
        'community/change/5.3.2-5.3.3',
        'community/change/5.3.3-5.4.0',
        'community/change/5.4.0-5.5.0',
        'community/change/5.5.0-5.6.0'
      ]
    },
    {
      type: 'category',
      label: '贡献',
      items: ['contributing/contributing']
    }
  ]
};

module.exports = sidebars;
