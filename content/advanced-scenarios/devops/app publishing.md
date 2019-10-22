---
title: 基于Rainbond实现三种微服务的发布
Description: "基于Rainbond实现微服务的滚动发布，蓝绿发布及灰度发布"
hidden: true
---

<div id="toc"></div>


#### 概述

  本文档讲述基于Rainbond实现微服务常见的三种发布方式，滚动发布，蓝绿发布及灰度发布的原理、思路、及具体方式。

#### 一. 滚动发布

>Rainbond平台**无状态组件**滚动更新与**有状态组件**滚动更新区别：
  
 **无状态组件：**滚动更新时，首先会生成新的实例，新的实例启动后在后台运行，平台会使用健康监测机制去监听端口，判断新实例内应用是否运行正常，一旦监听到应用运行正常，就会上线新的应用，销毁旧的应用，以此完成滚动发布的流程。
 
 **有状态组件：**如果是非集群化的应用，生成新的实例前，旧的实例会停止运行，待新的实例更新完毕，旧的实例会被废除，如果是集群化的应用，不必担心服务会中断，可以进行分批次更新。以保障服务的运行。

**Rainbond平台滚动发布实践**

这里以无状态组件为例

- 切换构建源

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release01.png" width="100%">

- 切换代码分支

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release02.png" width="100%">

- 重新检测

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release03.png" width="100%">

- 伸缩实例数量

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release04.png" width="100%">

- 开始构建

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release05.png" width="100%">

- 此时就会产生两个新的实例，查看新的实例是否被创建，若新实例内应用运行正常，旧的实例将会被废除，新的版本上线完成

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release07.png" width="100%">

- 此时再查看构建历史记录，可以回滚到构建成功的任意版本

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Rolling%20release08.png" width="100%">



#### 二. 蓝绿发布


>蓝绿部署是不停老版本，部署新版本然后进行测试，确认OK，将流量切到新版本，然后老版本同时也升级到新版本。

 **基于权重使用平台网关功能的蓝绿发布实践**

- web服务绑定域名

|        Web服务  | 域名  | 权重 |
| ------------ | --------- | ------|
| Web V1 | www.test.com| 100 |
| Web V2 |www.test.com|  0  |

- 通过 **应用网关->访问控制** 分别降低和升高权重，即可实现版本间的切换

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Blue%20and%20Green%20Release03.png" width="100%">

- 取消Web V1的权重

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Blue%20and%20Green%20Release04.png" width="100%">

- 调整Web V2的权重

<img src="http://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/advanced-scenarios/app-create/App-Publishing/Blue%20and%20Green%20Release05.png" width="100%">

此时查看流量已经转移到Web V2，蓝绿发布已经完成。


>更多关于应用网关，访问控制介绍请参阅[应用网关](/user-manual/gateway/gateway/) [访问策略](/user-manual/gateway/traffic-control/)

#### 三. 灰度发布

>灰度发布是指在黑与白之间，能够平滑过渡的一种发布方式。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度。

**基于权重的灰度发布实践**

从流量的维度进行控制，比如开始先 10%流量切换到新版本，后续逐步增加这个权重，在正常的情况下直到旧版权重较少到 0；即完成了灰度发布。

依然通过 **应用网关 -> 访问策略**添加以下两个HTTP访问策略：

|        Web服务  | 域名  | 权重 |
| ------------ | --------- | ------|
| Web V1 | www.test.com| 90 |
| Web V2 |www.test.com|  10 |

根据需要逐步减少Web V1权重，增加Web V2权重，直到Web V1权重减少到0即可。

>更多关于应用网关，访问控制介绍请参阅[应用网关](/user-manual/gateway/gateway/) [访问策略](/user-manual/gateway/traffic-control/)

#### 四. A/B测试实践

关于Rainbond的组件A/B测试操作方案请参阅 [A/B测试实践](/advanced-scenarios/devops/ab-released-app)