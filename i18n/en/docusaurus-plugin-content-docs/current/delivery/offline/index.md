---
title: 离线交付
description: Offline delivery with Rainbond
keywords:
  - 离线交付
  - toB 离线交付
  - toB offline delivery
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=524437005&bvid=BV1zM411n7UZ&cid=1011022690&page=1" />

由于数据隐私和网络安全的考虑，大多数 toB 场景的客户需要私有化应用交付，也就是需要交付到客户的环境里，这样的客户有政府、金融、军工、公安、大型企业、特色行业等，这些私有化场景限制很多，如何提高私有化应用交付的效率是个难题。

尤其是对于微服务应用而言，一个应用可能有几十个模块，光是编译打包就需要耗费很长时间，每个服务还有自己的配置。即使写好了完整的部署文档和检查表，在服务器较多时，仍可能会因为人工操作错误导致失败。而且在离线环境中，许多开发工具集不完整，出现问题解决起来也极其困难。

而上述问题的根本原因是因为，应用系统的多环境适配、应用安装部署、应用升级、应用运维等操作自动化程度不高，需要大量人员手工操作，所以效率很低，解决问题的重点在解决应用管理的自动化。

本章节将介绍如何使用 Rainbond 实现应用管理的自动化。利用 Rainbond 实现微服务架构的离线交付，解决离线环境的定制开发和持续迭代问题。

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
