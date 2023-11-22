---
title: 持续交付
description: 本章节介绍如何使用 Rainbond 进行持续交付
keywords:
- 持续交付
- Continuous Delivery
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=436800242&bvid=BV1uj411N7Vy&cid=1005268829&page=1" />

持续交付是一种软件开发实践，通过持续交付，系统可以自动为将代码更改发布到生产环境做好准备。 

## 持续集成和持续交付的区别

持续集成的目的是让产品可以快速迭代，交付高质量的代码，简化工作流程。核心在于代码集成到主干之前，必须要通过所有的自动化测试。

持续交付的目的是交付高质量、有价值的产品。核心在于频繁地将软件的新版本，交付给测试团队进行测试。如果测试通过，该版本就可作为生产使用。

## 持续交付的重点

持续集成的重点是代码，但持续交付的重点是可交付的产品。

可交付的产品一定要有达标的质量，确保产品在生产环境没问题，所以在成功持续集成以后，还需要进行完整测试。

本章节将会介绍如何在 Rainbond 上实现持续交付流程。

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
