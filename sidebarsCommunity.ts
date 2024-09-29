export default {
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
          ],
        },
        'contribution/document/index',
        'contribution/app-share/index',
        'contribution/plugin/index',
      ],
    },
    {
      type: 'link',
      label: '变更日志',
      href: '/changelog',
    },
    'faqs',
  ],
};
