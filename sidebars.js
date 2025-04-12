const sidebars = {
  // But you can create a sidebar manually
  docs: [
    'quick-start/introduction',
    {
      type: 'category',
      label: 'Rainbond - No need understand K8s',
      collapsed: false,
      items: [
        'quick-start/quick-install',
        'quick-start/getting-started'
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
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
      label: 'Installation & Upgrade',
      items: [
        {
          type: 'category',
          label: 'Bare machine install',
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
          label: 'Helm install',
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
      label: 'How-to Guides',
      items: [
        {
          type: 'category',
          label: 'Application Deployment',
          items: [
            {
              type: 'category',
              label: 'Source Code Deployment',
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
              label: 'Image Deployment',
              items: [
                'how-to-guides/app-deploy/image/image-example',
                'how-to-guides/app-deploy/image/via-registry-deploy',
              ]
            },
            {
              type: 'category',
              label: 'YAML/Helm Deployment',
              items: [
                'how-to-guides/app-deploy/deploy-using-yaml-helm/yaml-convert-ram',
                'how-to-guides/app-deploy/deploy-using-yaml-helm/yaml-example',
                {
                  type: 'category',
                  label: 'Helm Chart Deployment',
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
          label: 'Application operation and maintenance',
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
              label: 'App governance',
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
        {
          type: 'category',
          label: 'Microservice deployment',
          items: [
            'how-to-guides/micro-service-deploy/intro',
            'how-to-guides/micro-service-deploy/pig-example',
            'how-to-guides/micro-service-deploy/blade-example',
          ]
        },
        {
          type: 'category',
          label: 'Application delivery',
          items: [
            {
              type: 'category',
              label: 'Online continuous delivery',
              items: [
                'how-to-guides/delivery/continuous/source-code',
                'how-to-guides/delivery/continuous/ram',
                'how-to-guides/delivery/continuous/multi-env',
              ]
            },
            {
              type: 'category',
              label: 'Offline Delivery',
              items: [
                'how-to-guides/delivery/offline/micro-service',
                'how-to-guides/delivery/offline/development-iteration',
              ]
            },
            {
              type: 'category',
              label: 'Application template parameter description',
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
      ]
    },
    'faq/index',
    {
      type: 'category',
      label: 'Troubleshooting',
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
      label: 'Contribution Guide',
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
  ]
};

module.exports = sidebars;
