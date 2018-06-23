---
title: Rainbond技术架构
summary: 介绍Rainbond技术架构及组成部分
toc: false
---

## Rainbond技术架构

<img src="https://static.goodrain.com/images/docs/3.6/architecture/architecture.png"></img>

 Rainbond践行以应用为中心的理念，吸纳优秀的社区解决方案，形成了应用控制、应用运行时，集群控制三大模块结合的数据中心技术架构，结合跨数据中心的上层结构应用控制台和资源控制台，形成了完整的PaaS平台解决方案，下面将对每个组件和重点流程进行介绍：


### Chaos组件之应用构建（CI）

<img width="85%" src="https://static.goodrain.com/images/docs/3.6/architecture/app-ci.png"></img>

​        Rainbond应用构建(CI)的过程主要完成将输入介质（源代码，Docker镜像）进行一系列处理生成Rainbond应用抽象介质的过程，此过程可持续进行生成一系列应用版本。传统意义上说，完整的CI过程会包括：设计、编码、打包、测试、Release，Docker自推出以来逐步成为众多应用代码打包的新形式。已有的CI产品中已经在源码测试和Pipline方面做得非常成熟，例如Jenkins，Gitlab等。因此Rainbond在对于源码或Docker镜像的前置处理方面可以直接对接第三方服务，由第三方服务处理完成的源码或镜像再对接到Rainbond-Chaos模块进行应用抽象。因此Chaos的输入源是支持Git协议的代码仓库，Docker镜像仓库。如果是源代码，Chaos智能判断源码的类型，例如Java,PHP,Python，Dockerfile等，根据不同的源码类型选择对应的BuildingPack进行源码编译，同时识别源码中定义的运行环境要求参数，应用端口、环境变量等参数，形成应用抽象的配置雏形。除了Dockerfile以外的源码类型将被编译成应用代码环境包（SLUG）存储于分布式存储中，其他的生成Docker本地镜像存储于数据中心镜像仓库中，结合应用的各类属性信息形成`应用抽象包`。

* 关于源码编译的BuildingPack参考各语言支持文档。
* Chaos组件支持多点高可用部署，多点部署从MQ组件获取应用构建任务。

### Worker组件之应用部署（CD）

<img width="85%" src="https://static.goodrain.com/images/docs/3.6/architecture/app-cd.png"></img>

​        worker组件整体完成一个事，将chaos构建出来的应用抽象进行实例化，配属应用运行需要的各类资源，完成应用生命周期中的运行态部分（CD）。应用生命周期中可能经历启停、升级与回滚。不同的应用类型需要进行不同的控制策略，例如无状态应用能够进行无序的滚动升级，而有状态应用的升级控制策略将更加复杂。应用运行需要各种外部环境支持，例如需要分配租户IP,端口等网络资源，需要根据应用设置配属持久化存储资源，例如共享文件存储分配存储目录，块存储等依托各类插件分配存储资源。根据应用依赖属性建立服务发现和负载均衡策略供给mesh插件。根据应用属性生成调度策略调用Kubernetes集群调度应用运行。目前Rainbond使用Kubernetes以下资源类型：ReplicationController、Deployment、Statefulset、Service、Pod。对于用户来说，无需理解这些资源，我们产品中也不体现，其只是应用运行的载体。

* worker组件功能分为有状态部分和无状态部分，为了实现worker组件的集群部署，worker进行了主节点选举，当选主节点的服务将额外启动一个gRPC服务，提供应用状态等数据服务

### Entrance组件之应用负载均衡（LB）

<img width="85%" src="https://static.goodrain.com/images/docs/3.6/architecture/rbd-entrance.png"></img>
   已运行应用最关键的一部分，如何访问。Rainbond应用运行时会为每个租户分配子网，租户之间网络隔离，因此集群内运行的应用不能之间被外网访问到，应用每次启动IP地址跟随变化，所以租户内应用与应用直接也无法直接访问。Rainbond设计了应用端口级的服务控制，具有两个服务级别：对内服务、对外服务。只有打开了相应的服务级别应用运行时将会生成对应的服务发现策略和负载均衡策略，应用与应用直接的内部访问由ServiceMesh完成，这里主要讲应用外部访问的负载均衡。
   不同的应用提供不同协议的服务，Http,mysql,mongo,websocket等等，现有的负载均衡器例如nginx、haproxy等对于不同的协议的支持效果不同，除了4层的协议支持以外，我们希望应用级的负载均衡支持得更好，实现了应用级别的负载均衡器选择。因此Entrance模块需要对接不同的负载均衡器。针对负载均衡我们抽象了几种资源：池，节点、路由规则。实现不同的adaptar适配不同的负载均衡器。根据应用运行时和集群中应用的状态变化和上线策略，实时操作负载均衡器实现对应用的负载均衡。

   * Entrance集群部署通过etcd实现全局资源一致性，防止了对同一个资源操作的重复进行。

### Eventlog组件之应用日志处理
   Rainbond平台需要处理的日志和消息信息包含：用户异步操作日志、应用构建日志、应用运行日志等。对于操作日志，我们需要分布式跟踪每一次操作的最终状态，目前由eventlog组件根据每一次操作的日志汇聚判断操作的最终状态。其他组件在处理某一次异步任务过程中会将过程日志记录通过gRPC消息流发送到eventlog集群。
   关于应用日志，目前我们推荐区分为两类：由标准输出和错误输出的系统日志，输出到持久化文件的业务日志（访问日志）。对于标准输出的日志，Rainbond定制了docker日志处理驱动插件，基于TCP数据流通信实现将所有计算节点的容器日志实时送往Eventlog组件按照应用级别的汇聚，从而进行存储和实时推送到UI。随着集群规模越大，运行应用越多，日志处理量非常大，因此我们实现了Eventlog的集群，每一个应用的日志在传输之前会选择送往的eventlog服务节点，类似于数据分区。选择过程中做了均衡分配处理，例如当前有10000个应用，3个eventlog服务节点，将做到每个eventlog节点分别处理3000左右应用日志。对于输出到持久化目录的业务日志，一般需要对其进行自动分析，例如对接ELK系统，因此在插件体系中安装日志处理插件，收集持久化目录的日志文件输送到第三方日志分析服务上。

   * 由于各种实时推送的需要，eventlog组件实现了websockt服务。

### Webcli组件之应用容器控制
   用户开发应用过程中避免不了需要进行终端进程调试，Rainbond应用容器化运行，为方便用户进入容器空间进行命令行操作，实现了Webcli组件，该组件通过与UI进行websocket通信，用户可以通过模拟Web终端发送各类shell命令，webcli通过kubernets提供的exec方式在容器中执行命令并返回结果到Web终端。

   * Webcli属于无状态组件，天然支持多点高可用部署。

### Monitor组件之集群监控
   Rainbond集群需要多个维度的监控，应用业务性能级、应用容器资源级、集群节点级、管理服务级等等。Prometheus是一个优秀的监控报警项目，Rainbond包装了Prometheus形成Monitor组件，能够自动发现以上描述的各类监控对象并完成配置，将以上所述所有监控目标纳入Prometheus监控范围。Rainbond各组件也都实现了Prometheus的exporter端暴露监控指标。Prometheus有单点性能障碍，例如单节点服务监控目标越多，内存使用量和磁盘使用量都非常大。对于大型集群，我们必须实现Prometheus多点数据分区运行。如果产生数据分区，对于数据查询就必须在Prometheus之上建立集群查询机制，monitor组件将实现这一层机制。
   除了监控我们还需要报警，monitor能够自动配置一些默认的报警规则，自定义的报警规则支持将在资源管理后台体现，后续支持命令行控制。Prometheus发出报警信息到monitor,完成去重，忽略等操作后根据级别发送用户报警：邮件、微信、站内报警信。

### Node组件之集群节点管理与ServiceMesh

<img width="85%" src="https://static.goodrain.com/images/docs/3.6/architecture/rainbond-cluster-ctl.png"></img>
Rainbond集群组建的基础组件Node,运行于所有节点。运行于管理节点的Node具有master角色，维护所有节点的状态与健康检查。在监控方面，Node暴露出节点的操作系统级别各类指标（集成promethes node-exporter）,同时定时检查不同属性的节点上运行的各类服务状态，网络状态等。监控到问题并尝试自动处理，以提供集群自动化运维能力。

第二方面，所有计算节点运行的Node服务组建起租户网络内运行应用的运行环境支持，特别是ServiceMesh支持。

<img width="85%" src="https://static.goodrain.com/images/docs/3.6/architecture/ServiceMesh.png"></img>

Node提供了envoy的全局化配置发现支持，跟应用绑定的envoy插件通过宿主机网络跳出租户网络访问到Node服务获取全局的服务网络治理配置信息。其他应用插件同样的机制可以从node服务中动态获取配置，应用运行信息等。

### MQ消息组件

​        MQ组件是基于etcd实现的轻量级分布式、消息持久化和一致性的消息中间件，维护异步任务消息，提供多种主题的发布和订阅能力。我们没有选择使用已有的消息中间件服务，主要是由于能够提供分布式消息一致性的消息中间件设计都很重。基于etcd的分布式能力我们实现了轻量级MQ组件，提供了gRPC和http两种接口实现pub/sub。对于异步消息任务的保证执行方面将是MQ组件的下一步迭代方向。

### App-UI组件

​        应用控制台UI组件作为Rainbond以应用为中心抽象的关键模块，面向应用开发者和应用使用者。基于Django+Ant design前后端分离架构设计，提供用户对应用抽象、应用组抽象，数据中心抽象，应用市场抽象提供交互体验。实现完整的应用创建、管理流程，应用交付分享流程等。

### Resource-UI组件（企业版）

​        资源控制台UI组件提供Rainbond集群资源管理，计划支持对接IaaS的资源管理能力，面向运维人员设计。关注节点物理资源，集群资源，管理服务资源，应用实际使用资源，租户资源等管理。Rainbond自动化运维能力的关键展示平台。

### 命令行工具grctl

​        grctl命令行工具提供一些有趣实用的应用管理功能和集群运维功能，并逐步丰富中。对于开源使用用户来说在没有ResourceUI的情况下方便进行集群管理和运维。
