---
title: Component scaling
description: Horizontal Scaling and Vertical Scaling Documentation for Rainbond Components
---

Rainbond platform components can be scaled in two：

- Vertical scaling：increases or decreases the memory of the component (currently, the CPU and memory of the component are linked, adjust according to a certain ratio of\`)
- Horizontal scaling：increases or decreases the number of instances of a component, suitable for stateless components and stateful horizontal cluster components</

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/automatic-telescoping/service-scaling/Telescopic.png)

- During vertical scaling, the platform will automatically adjust resources and then restart the components. Single-node components will be interrupted, but multi-node components will not be affected.
- When scaling horizontally, the platform operates by scrolling new or offline nodes, so the operation will not affect existing components.

## Vertical scaling between CPU and memory ratio

| Application value ratio (CPU/memory) | Limit value ratio (CPU/Memory) |
| ------------------------------------------------------- | ------------------------------------------------- |
| 0.24/1                                  | 1.28/1                            |

Kubernetes divides CPU and memory into application value and limit value. For details, please refer to: <a href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/">Manage computing resources of containers</a>
The currently adjusted CPU and memory ratio of the platform has been verified in the production environment and conforms to most component types.If you customize the CPU allocation for some CPU-intensive components, you can configure the environment variable：ES_CPULIMIT : CPU limit value ES_CPUREQUEST：CPU request value如果对某些 CPU 密集型组件自定义分配 CPU，可以配置环境变量：ES_CPULIMIT : CPU 限制值 ES_CPUREQUEST：CPU 请求值

## Horizontal expansion

### Conditions for the component to scale horizontally

- stateless components

我们一般称无需自己保存运行状态的组件为无状态组件，比如 Web 类组件。We generally call components that do not need to save their running state as stateless components, such as Web class components.Usually, as long as the cache system uses a third-party component such as Redis, the Web component can be considered as a stateless component and can be scaled horizontally.

So someone has to ask, what if my web component needs to access files, Rainbond will handle the component's direct persistent storage synchronization.That is, the persistent storage used by each component instance is the same file system, which is the practice of separating computing and data.即每个组件实例使用的持久化存储为同一个文件系统，这就是计算与数据分离的实践。

- stateful components

The horizontal scaling conditions of stateful components will be more complicated. To support stateful scaling, the application must first support clustered horizontal scaling.

For example, if we deploy a Mysql component, and we directly expand it to two instances horizontally, what will happen? Both instances work fine, but there is no relationship between them, that is, two Mysql components.Obviously this doesn't work. 两个实例都可以正常工作，但是它们之间无任何关系，也就是说是两个 Mysql 组件。显然这样使用是不行的。

So what stateful components can scale horizontally, mainly in the following two categories：

1. Clustering components that can scale the cluster horizontally, such as Etcd, Zookeeper, Xiaoqiang Database, TiDB, etc.
2. For master-slave cluster components, we can generally scale the slave components horizontally.Such as Mysql, Redis, MongoDB, etc.比如 Mysql、Redis、MongoDB 等。

## auto scaling

Component instance automatic horizontal scaling function reference document：<a href="./service-auto-scaling/">Automatic scaling</a>

How to make a stateful component cluster application will be explained in the theme document

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
```
