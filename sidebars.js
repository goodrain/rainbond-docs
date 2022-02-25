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
        "user-operations/user-operations"
      ]
    },
    {
      type: "category",
      label: "常见场景最佳实践",
      items: [
        "practices/practices"
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
