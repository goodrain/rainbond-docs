---
title: 无影响滚动升级无状态应用
summary: 无影响滚动升级无状态应用
toc: true
toc_not_nested: true
asciicast: true
---

无状态应用可以包含多个实例，其中所有实例都相同，但各实例之间相互独立，互不依赖，任意一个Web请求完全与其他请求隔离,用户不需要保存应用的状态或者持久化数据，访问时系统会自动为多实例的应用分发请求，所有实例共享存储卷。Rainbond针对无状态应用采用滚动升级策略。

## 应用场景

应用部署运行时，如果应用不需要任何稳定的状态标示、有序的部署、更新升级、删除和扩展，建议使用无状态(Deployment)方式部署。大多数Web类和API类都可以选用无状态应用。平台创建应用默认是无状态应用。

## 平台设置

源码构建还是镜像构建，配置流程一致，这里以镜像创建为例。

#### 创建应用时设置应用类型

应用检测通过后可以配置高级设置

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/stateless/wztyy001.jpg" style="border:1px solid #eee;width:85%">

#### 已创建应用修改应用类型

目前只能对已关闭应用进行应用类型修改。

在应用的其他设置基础信息里可配置应用类型,<b>修改应用类型会丢数据</b>。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/stateless/wztyy002.jpg" style="border:1px solid #eee;width:85%">

## 滚动升级(RollingUpdate)

Rainbond默认使用[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#use-case)类型来部署Web类应用,  应用升级策略方面采用了滚动升级策略.所谓的滚动升级策略就是采用逐步替换的方式，使用新的实例逐步更新替换旧的实例.好处是不会中断服务，但会导致调用时出现应用版本不一致情况，输出内容不一致。

#### 滚动更新策略

```
# 默认RollingUpdateStrategy
25% max unavailable, 25% max surge
```
部署可以确保在更新时只有一定数量的实例可能会关闭。默认情况下，它确保至少比所需的实例数量少25％（25% max unavailable,）。
部署还可以确保在所需数量的实例之上只能创建一定数量的实例。默认情况下，它确保最多比所需数量的实例多25％（25% max surge）。
如果你的实例数为3,确保可用实例至少为2，并且保证实例数总数最多为4.

#### 操作

滚动升级在平台体现在两个方面的操作流程，一个是构建并启动过程，另外一个就是伸缩过程。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/stateless/gj.gif
" style="border:1px solid #eee;width:85%">

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/stateless/kr.gif
" style="border:1px solid #eee;width:85%">

如果仔细查看上面的部署，您将看到它首先创建了一个新的Pod，然后删除了一些旧的Pod并创建了新的Pod。在有足够数量的新Pod出现之前，它不会杀死旧的Pod，并且在足够数量的旧Pod被杀之前不会创建新的Pod。它确保可用Pod的数量至少为2，并且Pod的总数最多为4。
也可以通过命名行方式查看具体event事件，来确定滚动更新具体流程。

```bash
Name:                   eb02a36a5f8d0b349b2254461393369e-deployment
Namespace:              34869bb254f6491e97d4993980a2cf85
Annotations:            deployment.kubernetes.io/revision=4
Selector:               name=gr93369e,service_id=eb02a36a5f8d0b349b2254461393369e,tenant_id=34869bb254f6491e97d4993980a2cf85
Replicas:               3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 (3/3 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  27m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-84dc79c979 to 1 #第一次部署，新建实例设置为1
  Normal  ScalingReplicaSet  25m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-d5ff5fbd4 to 1 #更新操作，新建实例设置为1
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-84dc79c979 to 0 #更新操作，旧实例数设置为0
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 1 #伸缩操作，新建实例设置为1
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-d5ff5fbd4 to 0 #伸缩操作，旧实例设置为0
  Normal  ScalingReplicaSet  30s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 3 #伸缩操作，新建实例数设置为3
  Normal  ScalingReplicaSet  22s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 1 #更新操作，新建实例数设置为1
  Normal  ScalingReplicaSet  20s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 2 #更新操作，旧实例数设置为2
  Normal  ScalingReplicaSet  20s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 2 #更新操作，新实例数设置为2
  Normal  ScalingReplicaSet  18s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 1 #更新操作，旧实例数设置为1
  Normal  ScalingReplicaSet  18s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 3 #更新操作，新实例数设置为3
  Normal  ScalingReplicaSet  16s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 0 #更新操作，旧实例数设置为0
```

## 无影响升级

无影响的前提，是已经多实例部署了。如果单实例部署，需要保证应用启动即服务。

#### 应用健康检查

要确保服务安装正常的需求运行起来且已经可用，需要配置应用的健康检查。

具体配置参考:[应用健康检查](../user-manual/app-manage/service-manage/other-set.html#1-4)

#### 有状态的Web应用

针对这类问题可以参考: [Tomcat配置Redis实现Session共享
](../user-manual/app-creation/language-support/java/tomcat-redis-session.html)
