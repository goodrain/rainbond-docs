---
title: 组件伸缩
description: Rainbond组件的水平伸缩和垂直伸缩文档
---

Rainbond 平台组件有两种伸缩方式：

- 垂直伸缩：增加或减少组件的内存（目前组件 CPU 与内存是联动的，按照一定的`比例调整`）
- 水平伸缩：增加或减少组件的实例数，适用于无状态组件和有状态水平集群组件

![](https://static.goodrain.com/images/docs/5.2/user-manual/app-service-manage/automatic-telescoping/service-scaling/Telescopic.png)

- 垂直伸缩时平台会自动调整资源后重启组件，单节点组件会中断，多节点组件不受影响。
- 水平伸缩时平台通过滚动新增或者下线节点的方式进行操作，因此操作不会影响现有组件。

## 垂直伸缩 CPU 与内存比例关系

| 申请值比例（CPU/内存） | 限制值比例（CPU/内存) |
| ---------------------- | --------------------- |
| 0.24/1                 | 1.28/1                |

Kubernetes 针对 CPU 和内存分为申请值与限制值，详情参见: [管理容器的计算资源](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) 
平台目前调整的 CPU 与内存占比是经过生产环境验证过符合大多数组件类型。如果对某些 CPU 密集型组件自定义分配 CPU，可以配置环境变量：ES_CPULIMIT : CPU 限制值 ES_CPUREQUEST：CPU 请求值

## 水平伸缩

### 组件进行水平伸缩的条件

- 无状态组件

我们一般称无需自己保存运行状态的组件为无状态组件，比如 Web 类组件。通常情况下只要将缓存系统使用第三方的组件比如 Redis，Web 类组件即可认为是无状态组件可进行水平伸缩。

那么有人要问，我的 Web 组件需要存取文件怎么办，Rainbond 将处理组件直接的持久化存储同步。即每个组件实例使用的持久化存储为同一个文件系统，这就是计算与数据分离的实践。

- 有状态组件

有状态组件的水平伸缩条件将比较复杂，要支持有状态伸缩，首先得应用支持集群化水平扩展。

比如我们部署了一个 Mysql 组件，我们直接将其水平扩到两个实例，会出现什么现象呢？ 两个实例都可以正常工作，但是它们之间无任何关系，也就是说是两个 Mysql 组件。显然这样使用是不行的。

那什么有状态组件可以水平伸缩呢，主要是以下两类：

1. 可进行水平扩展集群的集群化组件，比如 Etcd, Zookeeper, 小强数据库，TiDB 等
2. 主从集群类组件，我们一般可以将从组件进行水平伸缩。比如 Mysql、Redis、MongoDB 等。

## 自动伸缩

组件实例自动水平伸缩功能参考文档：[自动伸缩](./service-auto-scaling.md)

有状态组件集群应用的制作方式我们将在主题文档中讲解


```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```