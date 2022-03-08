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
      link: {
        type: 'doc',
        id: 'get-start/index',
      },
      items: [
        {
          type: 'category',
          label: '学习概念',
          link: {
            type: 'doc',
            id: 'get-start/concept/index',
          },
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
      link: {
        type: 'doc',
        id: 'component-create/index',
      },
      items: [
        'component-create/creation-process',
        {
          type: 'category',
          label: '基于源代码创建组件',
          link: {
            type: 'doc',
            id: 'component-create/language-support/index',
          },
          items: [
            {
              type: 'category',
              label: 'Java语言参考',
              link: {
                type: 'doc',
                id: 'component-create/language-support/java/index',
              },
              items: [
                'component-create/language-support/java/java-maven',
                'component-create/language-support/java/java-multi-module-build',
                'component-create/language-support/java/java-jar',
                'component-create/language-support/java/java-war',
                'component-create/language-support/java/java-gradle',
                'component-create/language-support/java/java-maven-de',
                'component-create/language-support/java/tomcat-redis-session',
                'component-create/language-support/java/webapp-runner'
              ]
            },
            'component-create/language-support/dockefile',
            'component-create/language-support/python',
            'component-create/language-support/php',
            'component-create/language-support/netcore',
            'component-create/language-support/golang',
            'component-create/language-support/html',
            'component-create/language-support/nodejs',
            'component-create/language-support/nodejs-static',
            'component-create/language-support/slugignore',
            'component-create/language-support/procfile',
            'component-create/language-support/rainbondfile',
            'component-create/language-support/envs'
          ]
        },
        {
          type: 'category',
          label: '基于Docker镜像创建组件',
          link: {
            type: 'doc',
            id: 'component-create/image-support/index',
          },
          items: [
            'component-create/image-support/docker-compose',
            'component-create/image-support/image'
          ]
        },
        {
          type: 'category',
          label: '接入外部服务作为第三方组件',
          link: {
            type: 'doc',
            id: 'component-create/thirdparty-service/index',
          },
          items: [
            'component-create/thirdparty-service/thirdparty-define',
            'component-create/thirdparty-service/thirdparty-design',
            'component-create/thirdparty-service/thirdparty-create'
          ]
        },
        {
          type: 'category',
          label: '基于Helm应用市场创建组件',
          link: {
            type: 'doc',
            id: 'component-create/helm-support/index',
          },
          items: [
            'component-create/helm-support/docking_helm_store',
            'component-create/helm-support/creation-process',
            'component-create/helm-support/manage-helm-app'
          ]
        }
      ]
    },

    {
      type: 'category',
      label: '管理应用与服务组件',
      link: {
        type: 'doc',
        id: 'user-manual/index',
      },
      items: [
        'user-manual/join-team/join-team',
        'user-manual/app-create/app-create',
        {
          type: 'category',
          label: '外网访问组件',
          link: {
            type: 'doc',
            id: 'user-manual/gateway/index',
          },
          items: [
            'user-manual/gateway/domain',
            'user-manual/gateway/tcpip',
            'user-manual/gateway/cert-management'
          ]
        },
        {
          type: 'category',
          label: '组件间通信',
          link: {
            type: 'doc',
            id: 'user-manual/component-connection/index',
          },
          items: [
            'user-manual/component-connection/regist_and_discover',
            'user-manual/component-connection/regist_and_discover_grpc',
            'user-manual/component-connection/connection_env'
          ]
        },
        {
          type: 'category',
          label: '组件开发',
          link: {
            type: 'doc',
            id: 'user-manual/component-dev/index',
          },
          items: [
            'user-manual/component-dev/build_and_version',
            'user-manual/component-dev/build_source',
            'user-manual/component-dev/auto_build',
            'user-manual/component-dev/app_copy',
            'user-manual/component-dev/service-env'
          ]
        },
        {
          type: 'category',
          label: '组件运维',
          link: {
            type: 'doc',
            id: 'user-manual/component-op/index',
          },
          items: [
            {
              type: 'category',
              label: '组件基本操作',
              items: [
                'user-manual/component-op/basic-operation/basic-operation',
                'user-manual/component-op/basic-operation/service-properties'
              ]
            },
            'user-manual/component-op/service-log',
            {
              type: 'category',
              label: '组件伸缩',
              link: {
                type: 'doc',
                id: 'user-manual/component-op/automatic-telescoping/index',
              },
              items: [
                'user-manual/component-op/automatic-telescoping/service-scaling',
                'user-manual/component-op/automatic-telescoping/service-auto-scaling'
              ]
            },
            {
              type: 'category',
              label: '组件存储',
              link: {
                type: 'doc',
                id: 'user-manual/component-op/custom-volume/index',
              },
              items: [
                'user-manual/component-op/custom-volume/service-volume',
                'user-manual/component-op/custom-volume/service-volume-custom'
              ]
            },
            'user-manual/component-op/service-port-domain',
            'user-manual/component-op/custom-monitor',
            'user-manual/component-op/health',
            {
              type: 'category',
              label: '组件性能分析与监控',
              link: {
                type: 'doc',
                id: 'user-manual/component-op/performance-analysis/index',
              },
              items: [
                'user-manual/component-op/performance-analysis/service-monitor'
              ]
            },
            'user-manual/component-op/service-other-set',
            'user-manual/component-op/service-plugins'
          ]
        },
        {
          type: 'category',
          label: '插件开发',
          link: {
            type: 'doc',
            id: 'user-manual/plugin-manage/index',
          },
          items: [
            'user-manual/plugin-manage/plugin-design-develop',
            'user-manual/plugin-manage/mesh-plugin',
            'user-manual/plugin-manage/new-plugin'
          ]
        },
        {
          type: 'category',
          label: '应用运维',
          link: {
            type: 'doc',
            id: 'user-manual/app-manage/index',
          },
          items: [
            'user-manual/app-manage/app-topology',
            'user-manual/app-manage/operation',
            'user-manual/app-manage/add-service',
            'user-manual/app-manage/upgrade_app',
            'user-manual/app-manage/share-app',
            'user-manual/app-manage/config-group',
            'user-manual/app-manage/governance-model',
            'user-manual/app-manage/deploy-istio'
          ]
        },
        {
          type: 'category',
          label: '构建微服务架构',
          link: {
            type: 'doc',
            id: 'user-manual/architecture/index',
          },
          items: [
            'user-manual/architecture/service_assembly',
            'user-manual/architecture/rate-limiting',
            'user-manual/architecture/traffic-management',
            'user-manual/architecture/network-visualization'
          ]
        }
      ]
    },

    {
      type: 'category',
      label: '安装与运维',
      link: {
        type: 'doc',
        id: 'user-operations/index',
      },
      items: [
        'user-operations/op-guide/component-description',
        {
          type: 'category',
          label: '安装 Rainbond',
          link: {
            type: 'doc',
            id: 'user-operations/deploy/index',
          },
          items: [
            {
              type: 'category',
              label: '基于 Helm 安装',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-with-helm/index',
              },
              items: [
                'user-operations/deploy/install-with-helm/k8s-install-with-helm',
                'user-operations/deploy/install-with-helm/k3s-install-with-helm',
                'user-operations/deploy/install-with-helm/ack-install-with-helm',
                'user-operations/deploy/install-with-helm/vaules-config',
                'user-operations/deploy/install-with-helm/uninstall-with-helm'
              ]
            },
            {
              type: 'category',
              label: '基于 Web 界面安装',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-with-ui/index',
              },
              items: [
                'user-operations/deploy/install-with-ui/host-install-with-ui',
                'user-operations/deploy/install-with-ui/ha-installation',
                'user-operations/deploy/install-with-ui/install-by-rainbond',
                'user-operations/deploy/install-with-ui/install-from-k8s',
                'user-operations/deploy/install-with-ui/console-recover',                
              ]
            },
            {
              type: 'category',
              label: '安装问题排查',
              link: {
                type: 'doc',
                id: 'user-operations/deploy/install-troubleshoot/index',
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
            id: 'user-operations/Install-extension/index',
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
            id: 'user-operations/cluster-manage/index',
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
            id: 'user-operations/storage/index',
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
            id: 'user-operations/monitor/index',
          },
          items: [
            'user-operations/monitor/monitor-alert-items',
            'user-operations/monitor/monitor-alert-deploy',
            {
              type: 'category',
              label: '报警配置项',
              link: {
                type: 'doc',
                id: 'user-operations/monitor/alert/index',
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
            id: 'user-operations/tools/index',
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
      label: '常见场景最佳实践',
      link: {
        type: 'doc',
        id: 'practices/index',
      },
      items: [
        'practices/app-dev/work_with_kong',
        'practices/app-dev/work_with_apm',
        'practices/app-dev/work_with_git',
        'practices/app-dev/work_with_elk',
        'practices/app-dev/app_publishing',
        'practices/app-dev/ab_testing',
        'practices/app-dev/update-rollback',
        'practices/app-dev/config_file',
        'practices/app-dev/collect_log',
        'practices/app-dev/java-exporter',
        'practices/app-dev/build_by_dockerfile',
        'practices/app-dev/statefulset',
        'practices/app-dev/build-react-and-vue',
        'practices/app-dev/connect-api',
        'practices/app-dev/port-conflict',
        'practices/app-dev/auto-schema',
        'practices/app-dev/deploy-spark',
        'practices/app-dev/port-alias',
        'practices/operator/gateway-node',
        'practices/app-dev/spring-cloud-advantage',
        'practices/app-dev/spring-cloud-merge',
        'practices/app-dev/spring-cloud-case',
        'practices/app-dev/data-initialization',
        'practices/app-dev/work-helm-app',
        'practices/app-dev/shell-hook-cdn'
      ]
    },
    {
      type: 'category',
      label: '管理企业',
      link: {
        type: 'doc',
        id: 'enterprise-manager/index',
      },
      items: [
        {
          type: 'category',
          label: '用户管理',
          link: {
            type: 'doc',
            id: 'enterprise-manager/user-registration-login/index',
          },
          items: [
            {
              type: 'category',
              label: 'OAuth2.0集成',
              link: {
                type: 'doc',
                id: 'enterprise-manager/user-registration-login/oauth2.0/index',
              },
              items: [
                'enterprise-manager/user-registration-login/oauth2.0/oauth-product-desc',
                'enterprise-manager/user-registration-login/oauth2.0/oauth-conf',
                'enterprise-manager/user-registration-login/oauth2.0/oauth-git',
                'enterprise-manager/user-registration-login/oauth2.0/oauth-create'
              ]
            },
            'enterprise-manager/user-registration-login/reset_admin_user_password',
            'enterprise-manager/user-registration-login/user-register'
          ]
        },
        {
          type: 'category',
          label: '企业中台',
          link: {
            type: 'doc',
            id: 'enterprise-manager/enterprise/index',
          },
          items: [
            'enterprise-manager/enterprise/dashboad',
            {
              type: 'category',
              label: '应用市场',
              link: {
                type: 'doc',
                id: 'enterprise-manager/enterprise/appcenter/index',
              },
              items: [
                'enterprise-manager/enterprise/appcenter/desc',
                'enterprise-manager/enterprise/appcenter/application-template',
                'enterprise-manager/enterprise/appcenter/share-app-market',
                'enterprise-manager/enterprise/appcenter/add-app',
                'enterprise-manager/enterprise/appcenter/app-specification'
              ]
            },
            {
              type: 'category',
              label: '团队管理',
              link: {
                type: 'doc',
                id: 'enterprise-manager/enterprise/teams/index',
              },
              items: [
                'enterprise-manager/enterprise/teams/create-team'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '版本升级',
      link: {
        type: 'doc',
        id: 'upgrade/index',
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
        id: 'community/index',
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
      label: '开源应用精选专区',
      link: {
        type: 'doc',
        id: 'opensource-app/index',
      },
      items: [
        'opensource-app/itest',
        'opensource-app/maxkey',
        'opensource-app/TDengine',
        'opensource-app/chatopera',
        'opensource-app/logikm'
      ]
    }
  ]
};

module.exports = sidebars;
