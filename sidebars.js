const sidebars = {
  // But you can create a sidebar manually
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsible: false,
      items: [
        'quick-start/introduction',
        // 'quick-start/differences',
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
        // 'quick-start/edition',
        // 'quick-start/contributing',
        // 'quick-start/roadmap'
      ]
    },
    {
      type: 'category',
      label: '安装 Rainbond',
      link: {
        type: 'doc',
        id: 'installation/index'
      },
      items: [
        {
          type: 'category',
          label: '基于 Helm 安装',
          link: {
            type: 'doc',
            id: 'installation/install-with-helm/index'
          },
          items: [
            {
              type: 'link',
              label: 'Helm安装命令生成工具',
              href: '/helm'
            },
            'installation/install-with-helm/k8s-install-with-helm',
            'installation/install-with-helm/k3s-install-with-helm',
            'installation/install-with-helm/ack-install-with-helm',
            'installation/install-with-helm/cce-install-with-helm',
            'installation/install-with-helm/install-from-rancher',
            'installation/install-with-helm/vaules-config',
            'installation/install-with-helm/uninstall-with-helm'
          ]
        },
        {
          type: 'category',
          label: '基于 Web 界面安装',
          link: {
            type: 'doc',
            id: 'installation/install-with-ui/index'
          },
          items: [
            'installation/install-with-ui/host-install-with-ui',
            'installation/install-with-ui/ha-installation',
            'installation/install-with-ui/install-by-rainbond',
            'installation/install-with-ui/install-from-k8s',
            'installation/install-with-ui/console-recover'
          ]
        },
        {
          type: 'category',
          label: '安装问题排查',
          link: {
            type: 'doc',
            id: 'installation/install-troubleshoot/index'
          },
          items: [
            'installation/install-troubleshoot/dind-install-troubleshoot',
            'installation/install-troubleshoot/helm-install-troubleshoot',
            'installation/install-troubleshoot/ui-install-troubleshoot'
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
          label: '组件管理指南',
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
                'use-manual/component-manage/overview/version-rollback',
                'use-manual/component-manage/overview/operation-log',
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
              label: '组件间通信',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/component-connection/index'
              },
              items: [
                'use-manual/component-manage/component-connection/regist_and_discover',
                'use-manual/component-manage/component-connection/regist_and_discover_grpc',
                'use-manual/component-manage/component-connection/connection_env'
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
                'use-manual/component-manage/build-source/build_and_version',
                'use-manual/component-manage/build-source/auto_build',
              ]
            },
            {
              type: 'category',
              label: '组件其他设置',
              link: {
                type: 'doc',
                id: 'use-manual/component-manage/other/index'
              },
              items: [
                'use-manual/component-manage/other/service-other-set',
              ]
            },
          ]
        },
        {
          type: 'category',
          label: '应用管理指南',
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
                'use-manual/app-manage/overview/add-service',
                'use-manual/app-manage/overview/app-copy',
                {
                  type: 'category',
                  label: '应用治理模式',
                  link: {
                    type: 'doc',
                    id: 'use-manual/app-manage/overview/model/governance-model'
                  },
                  items: [
                    'use-manual/app-manage/overview/model/deploy-istio',
                  ]
                },
              ]
            },
            'use-manual/app-manage/share-app',
            'use-manual/app-manage/app-backup',
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
            {
              type: 'category',
              label: '构建微服务架构',
              link: {
                type: 'doc',
                id: 'use-manual/app-manage/architecture/index'
              },
              items: [
                'use-manual/app-manage/architecture/service_assembly',
                'use-manual/app-manage/architecture/rate-limiting',
                'use-manual/app-manage/architecture/traffic-management',
                'use-manual/app-manage/architecture/network-visualization'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '团队管理员指南',
          link: {
            type: 'doc',
            id: 'use-manual/team-manage/index'
          },
          items: [
            'use-manual/team-manage/overview/overview',
            {
              type: 'category',
              label: '应用管理',
              link: {
                type: 'doc',
                id: 'use-manual/team-manage/app-manage/index'
              },
              items: [
                'use-manual/team-manage/app-manage/overview',
                'use-manual/team-manage/app-manage/app-create',
              ]
            },
            {
              type: 'link',
              label: '创建组件',
              href: '/docs/use-manual/component-create/creation-process',
            },
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
            {
              type: 'category',
              label: '团队管理',
              link: {
                type: 'doc',
                id: 'use-manual/team-manage/team-manage/index'
              },
              items: [
                'use-manual/team-manage/team-manage/dynamic',
                'use-manual/team-manage/team-manage/team-user',
                'use-manual/team-manage/team-manage/open-cluster',
                {
                  type: 'category',
                  label: '角色',
                  link: {
                    type: 'doc',
                    id: 'use-manual/team-manage/team-manage/rule/index',
                  },
                  items: [
                    'use-manual/team-manage/team-manage/rule/user-rule',
                  ]
                },
                
              ]
            },
          ]
        },
        {
          type: 'category',
          label: '企业管理员指南',
          link: {
            type: 'doc',
            id: 'use-manual/enterprise-manage/index'
          },
          items: [
            'use-manual/enterprise-manage/overview/overview',
            {
              type: 'category',
              label: '应用市场',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manage/appcenter/index'
              },
              items: [
                'use-manual/enterprise-manage/appcenter/desc',
                'use-manual/enterprise-manage/appcenter/application-template',
                'use-manual/enterprise-manage/appcenter/share-app-market',
                'use-manual/enterprise-manage/appcenter/add-app',
                'use-manual/enterprise-manage/appcenter/app-specification'
              ]
            },
            {
              type: 'category',
              label: '团队管理',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manage/teams/index',
              },
              items: [
                'use-manual/enterprise-manage/teams/create-team',
                'use-manual/enterprise-manage/teams/join-team',
              ]
            },
            'use-manual/enterprise-manage/cluster-manage/index',
            {
              type: 'category',
              label: '用户管理',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manage/user-manage/index'
              },
              items: [
                'use-manual/enterprise-manage/user-manage/reset-admin-user-password',
              ]
            },
            {
              type: 'category',
              label: '企业设置',
              link: {
                type: 'doc',
                id: 'use-manual/enterprise-manage/enterprise-settings/index'
              },
              items: [
                {
                  type: 'category',
                  label: '基础设置',
                  link: {
                    type: 'doc',
                    id: 'use-manual/enterprise-manage/enterprise-settings/base/index'
                  },
                  items: [
                    'use-manual/enterprise-manage/enterprise-settings/base/user-register',
                    'use-manual/enterprise-manage/enterprise-settings/base/cert-management',
                    {
                      type: 'category',
                      label: 'OAuth2.0集成',
                      link: {
                        type: 'doc',
                        id: 'use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/index'
                      },
                      items: [
                        'use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/oauth-product-desc',
                        'use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/oauth-conf',
                        'use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/oauth-git',
                        'use-manual/enterprise-manage/enterprise-settings/base/oauth2.0/oauth-create'
                      ]
                    },
                    'use-manual/enterprise-manage/enterprise-settings/base/component-registry',
                    'use-manual/enterprise-manage/enterprise-settings/base/oss',                    
                  ]
                },  
                'use-manual/enterprise-manage/enterprise-settings/admin-manage/admin-manage',
                'use-manual/enterprise-manage/enterprise-settings/data-backup/index',          
              ]
                           
            }
          ]
        },
        {
          type: 'category',
          label: '应用商店指南',
          link: {
            type: 'doc',
            id: 'use-manual/app-store-manage/index'
          },
          items: [
            'use-manual/app-store-manage/share-app',
          ]
        },
        'use-manual/usage_troubleshooting'
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
          label: 'Rainbond 组件概述',
          link: {
            type: 'doc',
            id: 'ops-guide/component/index'
          },
          items: [
            'ops-guide/component/rainbond-operator',
            'ops-guide/component/rbd-api',
            'ops-guide/component/rbd-chaos',
            'ops-guide/component/rbd-db',
            'ops-guide/component/etcd',
            'ops-guide/component/rbd-eventlog',
            'ops-guide/component/rbd-gateway',
            'ops-guide/component/rbd-hub',
            'ops-guide/component/rbd-mq',
            'ops-guide/component/rbd-nfs',
            'ops-guide/component/rbd-node',
            'ops-guide/component/rbd-resource-proxy',
            'ops-guide/component/rbd-webcli',
            'ops-guide/component/rbd-worker',
          ]
        },
        {
          type: 'category',
          label: 'Rainbond 运维概述',
          link: {
            type: 'doc',
            id: 'ops-guide/management/index'
          },
          items: [
            'ops-guide/management/dashboard-op',
            'ops-guide/management/resource-cleanup',
            'ops-guide/management/data-migration',
          ]
        },
        {
          type: 'category',
          label: '集群管理',
          link: {
            type: 'doc',
            id: 'ops-guide/cluster-manage/index'
          },
          items: [
            'ops-guide/cluster-manage/add-cluster',
            'ops-guide/cluster-manage/manage-cluster',
            {
              type: 'category',
              label: '自定义集群参数',
              items: [
                'ops-guide/cluster-manage/manage-rke-cluster',
                'ops-guide/cluster-manage/init-region',
                'ops-guide/cluster-manage/init-region-storage',
              ]
            },
            'ops-guide/cluster-manage/resource-limit'
            
          ]
        },
        {
          type: 'category',
          label: '集群部署扩展文档',
          link: {
            type: 'doc',
            id: 'ops-guide/Install-extension/index'
          },
          items: [
            'ops-guide/Install-extension/centos_keepalived',
            'ops-guide/Install-extension/ubuntu_keepalived',
            'ops-guide/Install-extension/mysql-ha'
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
            'ops-guide/storage/deploy-glusterfs',
            'ops-guide/storage/ceph-rbd',
            'ops-guide/storage/deploy-nfsclient',
            'ops-guide/storage/ali-disk'
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
              label: '报警配置项',
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
            'ops-guide/tools/kubectl',
            'ops-guide/tools/grctl'
          ]
        },
        'ops-guide/troubleshoot/cluster_troubleshooting'
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
            'expand/opensource-app/logikm',
            'expand/opensource-app/nacos'
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
