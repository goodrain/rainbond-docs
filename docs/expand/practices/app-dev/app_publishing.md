---
title: 滚动发布，灰度发布及蓝绿发布
Description: "基于 Rainbond 实现三种微服务的发布"
weight: 30
---

在软件上线之前，不可避免地要对软件的可用性、可靠性进行测试，又不能停机维护，影响用户体验，并且在新版本出现问题的时候能够及时回滚；所以需要有一套完整的部署方案，在这里对基于 Rainbond 的**滚动发布，灰度发布及蓝绿发布**阐述相关原理、思路、实现方式。

## 一. 滚动发布

### 概述

滚动发布是指对一个实例或者多个实例停止服务，执行更新，并重新将其投入使用；周而复始，直到所有的实例都更新成新版本。

Rainbond平台无状态组件滚动更新与有状态组件滚动更新区别：
  
 - 无状态组件：滚动更新时，首先会生成新的实例，新的实例启动后在后台运行，平台会使用健康监测机制去监听端口，判断新实例内应用是否运行正常，一旦监听到应用运行正常，就会上线新的应用，销毁旧的应用，以此完成滚动发布的流程。
 
 - 有状态组件：如果是非集群化的应用，生成新的实例前，旧的实例会停止运行，待新的实例更新完毕，旧的实例会被废除，如果是集群化的应用，不必担心服务会中断，可以进行分批次更新。以保障服务的运行。


### 前提条件

1. 正常运行的 Rainbond，
2. 运行中的测试组件，参考 [源码构建](/docs/use-manual/component-create/language-support/html) 直接构建 [该项目](https://github.com/Aaron-23/teststatic)即可。

### 操作步骤

这里以无状态组件为例

1. 切换组件构建源代码分支为 devel 分支，
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/brach.jpg" width="100%" />
2. 点击构建，进行构建操作，
3. 构建完成后，将会自动进行滚动升级。


### 效果展示

在滚动升级过程中，在组件 伸缩 界面可以动态查看实例创建情况，新的实例被创建并且运行正常，旧的实例将会被删除，此时新版本上线完成，对于客户端而言，访问服务不受影响。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/Rolling%20update.jpg" width="100%" />

 
## 二. 灰度发布

### 概述

灰度发布是指在黑与白之间，能够平滑过渡的一种发布方式，灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度。


### 前提条件

1. 正常运行的 Rainbond，
2. 运行中的新旧两个版本测试组件，参考 [源码构建](/docs/use-manual/component-create/language-support/html) 直接构建 [该项目](https://github.com/Aaron-23/teststatic)即可（在这里以master分支为旧版本，devel分支为新版本），
3. 拥有一个测试域名。

### 操作步骤

从流量的维度进行控制，开始先 10%流量切换到新版本，后续逐步增加这个权重，在正常的情况下直到旧版本权重减少到 0；即完成了灰度发布。

1. 为两个测试组件绑定测试域名，通过 **网关 -> 访问策略管理** 添加以下两个 HTTP 访问策略设置相应的权重：

|        Web服务  | 域名  | 权重 |
| ------------ | --------- | ------|
| 灰度发布旧版本 | www.rainbondtest.com| 90 |
| 灰度发布新版本 |www.rainbondtest.com|  10 |

示例

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/advanced-scenarios/devops/app-publishing/binddomain.jpg" width="700%" />

2.根据需要逐步减少旧版本权重，增加新版本权重，直到旧版本权重减少到0即完成灰度发布。

### 效果展示

在切换权重的过程中访问测试域名，刷新页面看到的内容是不同的，并且随着权重的调整在不断变化，以此体现灰度发布的过程。

 
## 三. 蓝绿发布

### 概述

蓝绿部署是不停老版本，部署新版本然后进行测试，确认OK，将流量切到新版本，然后老版本同时也升级到新版本。

### 前提条件

1. 正常运行的 Rainbond，
2. 运行中的新旧两个版本测试组件，参考 [源码构建](/docs/use-manual/component-create/language-support/html) 直接构建 [该项目](https://github.com/Aaron-23/teststatic)即可（在这里以master分支为旧版本，devel分支为新版本），
3. 拥有一个测试域名。

### 操作步骤

1. web服务绑定域名

|        Web服务  | 域名  | 权重 |
| ------------ | --------- | ------|
| Web V1 | www.rainbondtest.com| 100 |
| Web V2 |www.rainbondtest.com|  0  |

2.通过 **网关 -> 访问策略管理** 分别降低和升高权重；调整 Web V1的权重为0，调整 Web V2的权重为100，即实现版本间的切换

### 效果展示

访问测试域名，查看流量已经转移到Web V2，蓝绿发布已经完成。

**您可能还需要阅读：**

[基于版本号一键上线/回滚](./update-rollback/)

[基于Rainbond的组件A/B测试实践](./ab_testing/)
