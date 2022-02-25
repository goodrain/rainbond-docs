const sidebars = {
  // But you can create a sidebar manually
  docs: [
    {
      type: "category",
      label: "快速开始",
      collapsible: false,
      items: [
        "quick-start/start",
        "quick-start/startcopy"
      ]
    },
    {
      type: "category",
      label: "快速入门",
      items: [
        "get-start/get-start"
      ]
    },
    {
      type: "category",
      label: "架构",
      items: [
        "architecture/architecture"
      ]
    },
    {
      type: "category",
      label: "部署服务组件",
      items: [
        "component-create/component-create"
      ]
    },
    {
      type: "category",
      label: "管理应用与服务组件",
      items: [
        "user-manual/user-manual"
      ]
    },
    {
      type: "category",
      label: "安装与运维",
      items: [
        'user-operations/op-guide/component-description',
        {
          type: 'category',
          label: '安装 Rainbond',
          items: [
            {
              type: 'category',
              label: '基于 Helm 安装',
              items: [
                'user-operations/deploy/install-with-helm/k8s-install-with-helm',
                'user-operations/deploy/install-with-helm/vaules-config',
                'user-operations/deploy/install-with-helm/uninstall-with-helm'
              ]
            },
            {
              type: 'category',
              label: '基于 Web 界面安装',
              items: [
                'user-operations/deploy/install-with-ui/host-install-with-ui',
                'user-operations/deploy/install-with-ui/install-by-rainbond',
                'user-operations/deploy/install-with-ui/install-from-k8s',
                'user-operations/deploy/install-with-ui/console-recover',
              ]
            },
            {
              type: 'category',
              label: '安装问题排查',
              items: [
                'user-operations/deploy/install-troubleshoot/dind-install-troubleshoot',
                'user-operations/deploy/install-troubleshoot/helm-install-troubleshoot',
                'user-operations/deploy/install-troubleshoot/ui-install-troubleshoot',
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '部署集群扩展文档',
          items: [
            'user-operations/Install-extension/centos_keepalived',
            'user-operations/Install-extension/ubuntu_keepalived',
            'user-operations/Install-extension/mysql-ha'
          ]
        },
        {
          type: 'category',
          label: '集群管理',
          items: [
            'user-operations/cluster-manage/add-cluster',
            'user-operations/cluster-manage/manage-cluster',
            'user-operations/cluster-manage/manage-rke-cluster',
            'user-operations/cluster-manage/init-region',
            'user-operations/cluster-manage/init-region-storage',
            'user-operations/cluster-manage/resource-limit',
          ] 
        },
        {
          type: 'category',
          label: '存储解决方案',
          items: [
            'user-operations/storage/ceph-rbd',
            'user-operations/storage/deploy-glusterfs',
            'user-operations/storage/deploy-nfsclient',
            'user-operations/storage/ali-disk',
          ] 
        },
        {
          type: 'category',
          label: '集群监控',
          items: [
            'user-operations/monitor/monitor-alert-items',
            'user-operations/monitor/monitor-alert-deploy',
            {
              type: 'category',
              label: '报警配置项',
              items: [
                'user-operations/monitor/alert/alert-wechat',
                'user-operations/monitor/alert/alert-dingtalk',
                'user-operations/monitor/alert/alert-mail'
              ] 
            },
          ] 
        },
        {
          type: 'category',
          label: '周边工具集',
          items: [
            'user-operations/tools/kubectl',
            'user-operations/tools/grctl',
          ] 
        },
      ]
    },
    {
      type: "category",
      label: "常见场景最佳实践",
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
        'practices/app-dev/shell-hook-cdn',
      ]
    },
    {
      type: "category",
      label: "管理企业",
      items: [
        {
          type: "category",
          label: "用户管理",
          items: [
            {
              type: "category",
              label: "OAuth2.0集成",
              items: [
                "enterprise-manager/user-registration-login/oauth2.0/oauth-product-desc",
                "enterprise-manager/user-registration-login/oauth2.0/oauth-conf",
                "enterprise-manager/user-registration-login/oauth2.0/oauth-git",
                "enterprise-manager/user-registration-login/oauth2.0/oauth-create",
              ]
            },
            "enterprise-manager/user-registration-login/reset_admin_user_password",
            "enterprise-manager/user-registration-login/user-register",
          ]
        },
        {
          type: "category",
          label: "企业中台",
          items: [
            "enterprise-manager/enterprise/dashboad",
            {
              type: "category",
              label: "应用市场",
              items: [
                "enterprise-manager/enterprise/appcenter/desc",
                "enterprise-manager/enterprise/appcenter/application-template",
                "enterprise-manager/enterprise/appcenter/share-app-market",
                "enterprise-manager/enterprise/appcenter/add-app",
                "enterprise-manager/enterprise/appcenter/app-specification",
              ]
            },
            {
              type: "category",
              label: "团队管理",
              items: [
                "enterprise-manager/enterprise/teams/create-team",
                
              ]
            },
          ]
        }
      ]
    },
    {
      type: "category",
      label: "版本升级",
      items: [
        "upgrade/5.2.2-5.3.1",
        "upgrade/5.3.0-upgrade",
        "upgrade/5.3.1-upgrade",
        "upgrade/5.3.2-upgrade",
        "upgrade/5.4.0-upgrade",
        "upgrade/5.5.0-upgrade"
      ]
    },
    {
      type: "category",
      label: "社区",
      items: [
        "community/FAQs/faqs",
        "community/contribution/contribution",
        "community/upcoming-events",
        "community/doc-style",
        "community/change/5.3.0-5.3.1",
        "community/change/5.3.1-5.3.2",
        "community/change/5.3.2-5.3.3",
        "community/change/5.3.3-5.4.0",
        "community/change/5.4.0-5.5.0"
      ]
    },
    {
      type: "category",
      label: "开源应用精选专区",
      items: [
        "opensource-app/itest",
        "opensource-app/maxkey",
        "opensource-app/TDengine",
        "opensource-app/chatopera",
        "opensource-app/logikm"
      ]
    }
  ]
};

module.exports = sidebars;
