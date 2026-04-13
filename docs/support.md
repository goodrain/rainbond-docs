---
title: 社区支持
description: Rainbond 社区支持
keywords: 
- Rainbond 社区支持
---

import PageEntryTracker from '@site/src/components/Analytics/PageEntryTracker';
import SupportEntryNotice from '@site/src/components/Analytics/SupportEntryNotice';
import CommunityQrCard from '@site/src/components/Analytics/CommunityQrCard';
import TrackedLink from '@site/src/components/Analytics/TrackedLink';

<PageEntryTracker eventName="support_opened" />

## 社区支持

本页将列出一些 Rainbond 相关的社区供你加入。

<SupportEntryNotice />

## 获取帮助之前，先判断你的问题属于哪一类

| 你的问题 | 建议先去哪里 |
| :--- | :--- |
| 安装时卡住、脚本失败、控制台打不开 | [安装故障排查](./troubleshooting/install.md) |
| 首个应用部署失败、域名打不开 | [故障排除概述](./troubleshooting/index.md) |
| 想提交 Bug 或查找已知问题 | [GitHub Issues](https://github.com/goodrain/rainbond/issues) |
| 想找人快速交流 | 看下方微信群 / 社区入口 |
| 需要正式商业支持 | [官方支持](https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg) |

## 提问前建议准备的信息

- Rainbond 版本
- 安装方式（体验安装 / 生产安装 / 离线安装 / 信创路径）
- 操作系统与环境类型
- 报错截图、日志或复现步骤
- 你当前在哪一步失败（安装、首次访问、部署第一个应用、升级等）

在参与 Rainbond 社区交流前，[请先阅读我们的行为守则](https://github.com/goodrain/rainbond/blob/main/CODE_OF_CONDUCT.md)。期望所有社区成员都遵守该准则。

### 微信群

扫描下方二维码加入微信群，由社区成员或社区用户帮助你解决问题。

<CommunityQrCard
  imageSrc="/wechat/wechatgroup.png"
  imageAlt="Rainbond 微信群二维码"
  module="support_page"
  title="微信群支持"
  description="如果你已经卡在安装、访问或首个应用阶段，打开二维码后可以直接进群继续问。"
  alwaysVisible
/>

### 微信公众号

关注 Rainbond 微信公众号，了解更多用户案例、最佳实践等，了解第一手干货。

<div>
  <img src="/wechat/wechat-public.jpg" width="20%"/>
</div>

你也可以继续使用下面这些入口：

- <TrackedLink to="https://github.com/goodrain/rainbond/issues" target="_blank" rel="noreferrer" eventName="community_link_clicked" eventProps={{target: 'github_issues'}}>GitHub Issues</TrackedLink>：搜索同类问题或提交新的问题。
- <TrackedLink to="https://t.goodrain.com" target="_blank" rel="noreferrer" eventName="community_link_clicked" eventProps={{target: 'community_forum'}}>Rainbond 社区论坛</TrackedLink>：适合继续看历史讨论和使用经验。
- <TrackedLink to="https://p5yh4rek1e.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg/" target="_blank" rel="noreferrer" eventName="community_link_clicked" eventProps={{target: 'official_support'}}>官方支持</TrackedLink>：适合需要商业支持的团队。
