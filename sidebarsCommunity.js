module.exports = {
  // But you can create a sidebar manually
  community: [
    'support',
    'members',
    {
      type: 'category',
      label: '贡献指南',
      link: {
        type: 'doc',
        id: 'contribution/index',
      },
      items: [
        {
          type: 'category',
          label: '贡献代码',
          link: {
            type: 'doc',
            id: 'contribution/compile/index',
          },
          items: [
            'contribution/compile/console',
            'contribution/compile/region',
          ]
        },
        'contribution/document/index',
        'contribution/app-share/index',
        'contribution/plugin/index',
      ]
    },
    {
      type: 'category',
      label: '版本变更',
      link: {
        type: 'doc',
        id: 'change/index'
      },
      items: [
        'change/5.15.2',
        'change/5.15.1',
        'change/5.15.0',
        'change/5.14.2',
        'change/5.14.1',
        'change/5.14.0',
        'change/5.13.0',
        'change/5.12.0',
        'change/5.11.1',
        'change/5.11.0',
        'change/5.10.1',
        'change/5.10.0',
        'change/5.9.0',
        'change/5.8.1',
        'change/5.8.0',
        'change/5.7.0',
        'change/5.6.0',
        'change/5.5.0',
        'change/5.4.0',
        'change/5.3.3',
        'change/5.3.2',
        'change/5.3.1',
      ]
    },
    'faqs',
  ]
};