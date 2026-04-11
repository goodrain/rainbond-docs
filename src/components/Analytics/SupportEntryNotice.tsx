import React from 'react';
import {useLocation} from '@docusaurus/router';
import {normalizePathname} from '@src/utils/umami';

const SUPPORT_CONTEXT: Record<string, {title: string; description: string}> = {
  '/install-hub': {
    title: '你是从安装总入口过来的',
    description: '如果是路径选错或环境不确定，建议发问题时直接说明你的安装目标、环境类型和已经尝试过的入口。',
  },
  '/docs/quick-start/getting-started': {
    title: '你是从第一个应用页过来的',
    description: '如果首个应用部署失败，带上组件状态、访问方式和报错截图，社区能更快帮你判断。',
  },
  '/docs/quick-start/quick-install': {
    title: '你是从快速安装页过来的',
    description: '建议把操作系统、脚本输出、浏览器访问结果和当前网络环境一起说明，能更快定位问题。',
  },
  '/docs/troubleshooting': {
    title: '你是从排障页过来的',
    description: '如果文档没接住你，发问题时把已经排查过的步骤一起带上，社区成员更容易继续往下接。',
  },
};

export default function SupportEntryNotice(): JSX.Element | null {
  const location = useLocation();
  const params = new URLSearchParams(location.search || '');
  const sourcePage = params.get('from');

  if (!sourcePage) {
    return null;
  }

  const context = SUPPORT_CONTEXT[normalizePathname(sourcePage)];

  if (!context) {
    return null;
  }

  return (
    <div className="alert alert--info margin-bottom--md" role="note">
      <strong>{context.title}</strong>
      <div>{context.description}</div>
    </div>
  );
}
