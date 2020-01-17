---
title: 无影响滚动升级无状态应用
Description: 无影响滚动升级无状态应用
Hidden: true
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
  Normal  ScalingReplicaSet  27m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-84dc79c979 to 1 #第一次部署，新建实例数设置为1
  Normal  ScalingReplicaSet  25m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-d5ff5fbd4 to 1 #构建操作，新建实例数设置为1
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-84dc79c979 to 0 #构建操作，旧实例数设置为0
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 1 #伸缩操作，新建实例数设置为1
  Normal  ScalingReplicaSet  24m   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-d5ff5fbd4 to 0 #伸缩操作，旧实例数设置为0
  Normal  ScalingReplicaSet  30s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 3 #伸缩操作，新建实例数设置为3
  Normal  ScalingReplicaSet  22s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 1 #构建操作，新建实例数设置为1
  Normal  ScalingReplicaSet  20s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 2 #构建操作，旧实例数设置为2
  Normal  ScalingReplicaSet  20s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 2 #构建操作，新实例数设置为2
  Normal  ScalingReplicaSet  18s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 1 #构建操作，旧实例数设置为1
  Normal  ScalingReplicaSet  18s   deployment-controller  Scaled up replica set eb02a36a5f8d0b349b2254461393369e-deployment-9fcdf797 to 3 #构建操作，新实例数设置为3
  Normal  ScalingReplicaSet  16s   deployment-controller  Scaled down replica set eb02a36a5f8d0b349b2254461393369e-deployment-66b58566c9 to 0 #构建操作，旧实例数设置为0
```

## 无影响升级

无影响的前提，是已经多实例部署了。如果单实例部署，需要保证应用启动即服务。

#### 配置应用健康检查

Rainbond提供应用健康检查功能，用于查看应用和用户业务是否正常运行，设置健康检查可以在应用运行过程中，根据设置需要定时检查应用健康状态。如果不设置健康检测，我们默认应用和用户业务都是正常运行的;如果设置健康检测，我们会根据配置去探测应用或者业务是否正常运行，保证业务的可靠性。

默认我们提供了两种健康检查方式：

- 应用启动时检查(应用实例存活检查): 探测应用实例是否已经启动，该检查方式用于检测实例是否存活或者服务是否启动，类似于执行`ps`检查进程是否存在。如果检查失败，会将应用状态设置为不健康;若检查成功不执行任何操作。
- 应用运行时检查(应用业务就绪检查): 探测应用业务是否已经就绪，该检查方式用于检测实例是否准备好开始处理用户请求或者运行过程中业务是否异常退出情况。如果检查失败，会重启该实例；若检查成功不执行任何操作。

具体如何配置健康检查请参考:[应用健康检查](../user-manual/app-manage/service-manage/other-set.html#1-4)

#### 微服务架构下分布式session共享

在某些场景下，单实例情况下多数将session存在到内存中,所有用户请求由单实例进行响应处理，达到保持用户状态的需求。随着微服务架构的普及发展,需要对原有单一实例的应用进行改造拆分，实现应用向云平台迁移。拆分每一个微应用都具有自己的Web页面，这些Web页面都会通过浏览器客户端展现给用户，整个微应用架构可以近似地看作是一个大型的分布式应用，所以每个微应用都需要有Session对象，同时整个微应用架构中，同一用户的Session数据应该是一致的。因此，在微服务架构下，对session的处理不再保存在内存中, 而是在架构中引入独立的中间存储介质如redis或memcache，将企业应用的session统一管理。

针对这类场景, 可以参考: [Tomcat基于Redis实现Session共享
](../user-manual/app-creation/language-support/java/tomcat-redis-session.html)
