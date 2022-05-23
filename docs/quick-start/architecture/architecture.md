---
title: 技术架构
description: Rainbond 技术架构
---

### Rainbond 技术架构

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/architecture.svg" width="100%"/>

Rainbond 践行以应用为中心的理念，吸纳优秀的社区解决方案，形成了应用控制、应用运行时，集群控制三大模块结合的数据中心逻辑技术架构，结合以管理节点、计算节点、网关节点、存储节点给类节点类型划分的物理架构形成高可用、高扩展性的数据中心架构体系。

在数据中心架构之上，根据使用目标人群划分为应用管理控制终端和资源管理控制终端，来分别服务于应用开发运维者和资源使用者。支撑用户同时管理和控制多个数据中心的多数据中心模式。

## 数据中心服务组件说明

### 数据中心 API 服务

API 服务作为数据中心级抽象的核心控制服务，对外提供 Restful 风格的 API 服务，是数据中心控制请求的唯一入口，安全控制基于 TLS 双向安全认证。自主签发证书后分发到客户端。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png" width="100%"/>

API 服务请求进入后由 router 模块进行请求分发，普通请求进入 Handle 请求处理模块，这类请求主要是操作数据库模型的请求，API 服务基于 ORM 支持 Mysql 数据库和 CockroachDB 数据库。进入 Proxy 的请求分为 API 请求和 Websocket 请求。由 Discover 模块通过 etcd 服务发现其代理目标并转发请求。因此其他组件提供的 API 可通过服务注册由 API 服务代理转发请求。

### 应用网关服务

应用网关是外部流量进入 Rainbond 租户内部组件的唯一入口, 提供 HTTP, HTTPs 路由, TCP/UDP 服务, 负载均衡器, 高级路由(A/B 测试, 灰度发布)，虚拟 IP 支持等功能.

应用网关的设计灵感来自于 NGINX Ingress Controller, 基于从 kube-apiserver 将监听到的 Kubernetes 资源(Ingress, Service, Secret, Endpoint)模型转化为 Proxy 控制器的配置，提供一种自动工作、实时生效、动态热配置的 7 层、4 层网关服务。

应用网关可以通过水平扩展的方式来增加并发能力和基础性能，通用配置在所有网关节点中同步生效。对于 74IP+

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/gw.png" width="100%"/>

单节点应用网关服务的架构目标是支持多种数据源、支持多 IP、支持高并发能力、支持多 Server 能力、支持动态配置变化能力。基于此需要应用网关架构设计如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/gateway.png" width="100%"/>

应用网关服务集成 Openresty 服务作为前置流量代理服务，基于 lua 对 Openresty 实现功能扩展，Lua-Config-Controller 实现对 Openresty 的动态配置、Upstream 管理、负载均衡策略实现, Lua-Monitor-Controller 实现对请求数据的记录和汇总上报、Lua-Security-Controller 实现对请求的安全控制。三个 Lua 模块由 Openresty-Controller 驱动工作，Metric-Controller 模块汇聚网关的各类监控数据并向外暴露 Prometheus 规范的 Metric-Server。Openresty-Controller 由数据驱动，数据来源于 Gateway-Model-Controller，两层无耦合关系，其实现了标准的接口规范。根据需要我们可以实现基于其他 proxy 服务的驱动器，比如 F5。

应用网关的数据模型来源支持 kubernetes 的 ingress 模型或从 etcd 中发现精简模型，由数据发现服务驱动整个网关动态工作。IP 是网关的重要资源，IP-Port-Pool 模块启动后将获取当前集群的所有可用 IP 地址和端口，并建立对 IP 地址变化的感知，IP-Manage 模块将根据 IP 和端口数据判断网关策略是否在当前节点生效。

### 应用构建服务

<img src="https://static.goodrain.com/images/docs/3.6/architecture/app-ci.png" width="100%"/>

Rainbond 应用构建服务处理 CI 过程，将输入源包括 `源代码` 或 `Docker镜像` 或 `应用市场应用` 进行解析、编译、打包，最终生成 应用（组件）的版本介质。

传统意义上说，完整的 CI 过程会包括：设计、编码、打包、测试和发布，Docker 镜像自推出以来逐步成为众多应用代码打包的新形式。现有的 CI 产品中已经在源码测试和 Pipline 方面做得非常成熟，例如 Jenkins，Gitlab 等，因此 Rainbond 在对于源码或 Docker 镜像的前置处理方面可以直接对接第三方服务，由第三方服务处理完成的源码或镜像再对接到 Rainbond-Chaos 模块进行应用抽象。

Chaos 的输入源是支持 Git、Svn 协议的代码仓库，Docker 镜像仓库。如果是源代码，Chaos 智能判断源码的类型，例如 Java, PHP , Python, Dockerfile 等，根据不同的源码类型选择对应的 BuildingPack(源码构建器)进行源码编译，同时识别源码中定义的运行环境要求参数，应用端口、环境变量等参数，形成应用抽象的配置雏形。除了 Dockerfile 以外的源码类型将被编译成应用代码环境包（SLUG）存储于分布式存储中，其他的生成 Docker 本地镜像存储于数据中心镜像仓库中，结合应用的各类属性信息形成应用组件属性。

应用构建服务是无状态架构，由消息系统（rbd-mq）驱动的任务执行器设计。 实现了 Git 客户端和镜像仓库客户端，集成了 SVN 客户端来获取组件构建源资源。 任务执行过程记录完整日志由 event 客户端通过消息流将日志输入到 rbd-event-log 服务。每一个源码构建过程由 Chaos 控制调用本机 Docker API 创建构建容器并维护容器生命周期。

源码构建过程是一个非常消耗资源的过程，因此应用构建服务支持多节点部署来增加并发支持的构建任务数量，每一个节点支持的最大并发构建数量由节点 CPU 核数确定或运维人员手工设置。

> - 关于源码编译的 BuildingPack 参考 [各语言支持文档](/docs/use-manual/component-create/creation-process)。
> - 应用构建服务支持多点高可用部署，多点部署从消息中间件获取应用构建任务。

### 应用运行时控制服务

应用运行时控制服务将 Rainbond-Application Model 进行实例化转化为 Kubernetes 资源模型，配属应用运行需要的各类资源，完成应用生命周期中的运行态部分，可以理解为 CD 控制服务，该服务的设计要点是支撑大量应用的生命周期监管。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/worker-arch.svg" width="100%"/>

应用生命周期中可能经历启停、升级与回滚。不同的应用类型需要进行不同的控制策略，例如无状态应用能够进行无序的滚动升级，而有状态应用的升级控制策略将更加复杂。Worker 服务中实现各类组件类型的生命周期控制器器、包含启动、停止、更新、伸缩等待。

应用运行需要各种外部环境支持，例如需要分配租户 IP,端口等网络资源，需要根据应用设置配属持久化存储资源，例如共享文件存储分配存储目录，块存储等依托各类插件分配存储资源。 根据应用依赖属性建立服务发现和负载均衡策略供给 mesh 插件。根据应用属性生成调度策略调用 Kubernetes 集群调度应用运行。

目前 Rainbond 使用 Kubernetes 以下资源类型：Deployment、Statefulset、Service、Ingress、Secret、ConfigMap、Pod。对于用户来说，无需理解这些资源，产品中也不体现，其只是应用运行的载体。

Worker 组件功能分为有状态部分和无状态部分，为了实现 worker 组件的集群部署，worker 进行了主节点选举，选举为主节点的服务将提供应用存储 Provider 和存储统计服务。

Worker 组件是 kubernetes-controller 控制器扩展和调度器扩展的模块，目前有实现本地存储 Provider，有状态组件的共享存储 Provider 等等，其同时会获取 Kubernetes 集群中已有的资源供 Rainbond 应用组件选择使用。

Worker 组件可支持多节点部署已保证高可用性。

### 监控服务

Rainbond 集群监控服务的设计目标是对应用业务性能级，应用容器资源级，集群节点级，管理服务级四个维度进行全面监控，从功能上提供数据存储、查询、可视化和报警，从性能上支持大规模集群。

Rainbond 基于 Prometheus 封装了 Monitor 组件，通过从 etcd、Kubernetes 集群中自动发现应用、集群、集群节点服务的各类监控对象并完成 Prometheus 监控目标配置，将监控目标纳入 Prometheus 监控范围。Rainbond 各组件也都实现了 Prometheus 的 exporter 端暴露监控指标。无需用户干预的条件下实现对多个维度的自动化监控。

Monitor 组件能够自动配置一些默认的报警规则，计划支持从 Kubernetes 中获取自定义的报警规则资源生成 Prometheus 报警规则使其动态生效，从而支持自定义报警规则，报警信息由第三方 Alter-Manage 系统处理。

Prometheus 默认情况下不支持集群部署，无法直接通过扩充节点来提高监控能力。为了提高监控系统的处理能力，目前支持将存储数据通过远程存储来提高数据存储能力；支持多个节点配置同步来提供服务可用性；支持调整监控数据存储窗口和减少对内存资源的占用。计划支持对监控目标进行集群化分区，从而支持扩充节点来扩充监控能力，对外提供统一的查询 API 屏蔽底层的数据分区。

### 消息中间件服务

MQ 组件是基于 Etcd 实现的轻量级分布式、消息持久化和全局一致性的消息中间件。该组件维护异步任务消息，提供多主题的消息发布和订阅能力。

市场上消息中间件产品众多，ActiveMQ、RabbitMQ、ZeroMQ 等等，针对我们的需求：分布式、持久化、全局一致性、轻量级、有序等关键属性，目前已有的消息中间件产品或多或少不满足。

Etcd 是简单、安全、快速、可信的键值存储服务，在我们的整个系统架构中扮演重要角色。基于 etcd 已有的特性很方便的实现一个基础消息系统。对于每一个订阅主题采用一个 key，由 etcd 控制时序和独占机制，使进入的消息可以顺序消费，客户端通过 etcd 提供的 watch 机制可以非常简单的订阅消息。基于此我们包装了两类 API: restful 和 grpc。客户端即可便捷的操作消息的 PUB/SUB。

### 事件与日志处理服务

Rainbond 平台需要处理的日志和消息信息包含三大类，分别为：用户异步操作日志、应用构建日志和应用运行日志。

用户异步操作日志：对于用户操作日志，我们需要分布式跟踪每一次操作的最终状态，目前由 eventlog 组件根据每一次操作的日志汇聚判断操作的最终状态。其他组件在处理某一次异步任务过程中会将过程日志记录通过 gRPC 消息流发送到 eventlog 集群。

应用构建日志：主要展示源码构建或 Docker 镜像构建的输出信息，这些信息来自于应用构建服务。

应用运行日志，目前我们分为两种形式：

(1) 标准输出/错误输出的日志

对于标准输出的日志，计算节点日志收集器通过 Docker Daemon 获取日志流后进行业务分离，默认基于 TCP 数据流通信实现将所有计算节点的容器日志实时送往 Eventlog 组件按照应用级别的汇聚，从而进行存储和实时推送到 UI，后续版本中日志收集器将实现与第三方 日志系统对接直接将日志输送到第三方日志处理平台。

(2) 输出到持久化文件的业务日志（访问日志）

对于输出到持久化目录的业务日志，一般需要对其进行自动分析，例如对接 ELK 系统，因此在插件体系中安装日志处理插件，收集持久化目录的日志文件输送到第三方日志分析服务上。

对于集群的日志处理设计需求是支持日志聚合、存储、实时推送和查询。并能够支撑较大的日志量。

根据上述日志类型分析，操作类日志是有限的日志流，其主要需求是实现存储和实施推送客户端。针对此类日志的处理链路主要是由 grpc 消息流接受各类组件客户端发来的日志，以 event 为单位进行日志汇聚存储，同时在集群中进行同步传播，从而向客户端提供分布式日志订阅能力。实现单节点存储，多节点可读的效果。

应用运行日志是无限的日志流，且日志源多，由当前集群中存在的应用量和每个应用产生的日志量决定。因此，为了支持庞大的应用日志量，eventlog 服务实现了分区化日志处理能力，以组件（service_id）为单位灵活调整日志处理的节点，同一个组件的运行日志由每一个计算节点的日志收集服务通过 TCP 消息流发送日志到指定的 eventlog 服务节点，eventlog 服务接受到日志后进行汇聚、缓冲并落盘。同时提供向订阅客户端的实时推送能力。客户端订阅时由 rbd-api 服务根据订阅的 service_id 信息负载到指定的 eventlog 服务节点。

Eventlog 服务的集群节点需要互相通信，包括操作日志流共享和处理能力汇报以决策应用运行日志的处理节点。因此 Eventlog 服务的节点间通过 ZeroMQ 订阅模式实现节点间通信，ZeroMQ 是一个高性能消息类库，基于此来保证 Eventlog 服务间的通信性能。Eventlog 的工作节点处理日志时充分使用内存缓冲机制来提高日志消息吞吐率的同时减少对磁盘的压力。

Eventlog 服务是有状态集群服务，可支持水平扩展来提高应用日志的处理能力。

### 集群、节点管理服务

Node 组件是 Rainbond 集群组建的基础服务，集群内所有节点都需要运行该组件。提供节点信息采集、集群服务维护、应用日志收集、应用运行时支持等关键能力。

Node 组件有两种角色，分别是 master 角色和 worker 角色。一般运行于管理节点的 Node 具有 master 角色，master 角色维护所有节点的状态和信息汇聚，并提供 API 查询服务，worker 角色的节点定时向 master 节点汇报状态。

<img src="https://static.goodrain.com/images/docs/3.6/architecture/rainbond-cluster-ctl.png" width="100%" />

节点控制器首先充当当前节点运行服务的守护任务，这方面类似于 Kubelet。每个节点需要运行的服务或健康检测项目，通过 yaml 的格式在/opt/rainbond/conf 目录中定义。控制器启动后将读取此目录下的配置，对于需要启动的服务调用 systemd 守护进程来启动服务， 对于健康检测项目则根据配置生成健康检测控制器。这里的设计主要是为了实现集群的自动化运维和扩充 kubernetes 节点的监控项目。节点控制器将维护所有配置项的状态并汇报给 master 节点。对于异常的服务控制器将根据规则尝试重启恢复服务，若无法恢复时将建议 master 节点将当前节点设置为不健康状态并脱离调度可用范围，直到节点恢复。

在监控方面，Node 暴露出节点的操作系统和硬件级别各类监控指标（集成 promethes node-exporter），并作为应用性能分析数据的收集者，转化暴露应用性能分析指标。所有暴露的监控指标由 rbd-monitor 服务收集。

所有计算节点运行的 Node 服务组建起租户网络内运行应用的运行环境支持，特别是 ServiceMesh 支持和插件动态配置查询的支持。Node 服务提供通用的配置发现 API 和服务发现 API 支持当前节点运行的应用架构，在此基础上提供 XDS Server 服务，为内置的 ServiceMesh 架构提供动态配置。

<img src="https://static.goodrain.com/images/docs/3.6/architecture/ServiceMesh.png" width="100%"/>

节点控制器日志收集模块实现对当前节点所有应用容器运行日志收集。通过从 Dockerd 实时获取容器的列表和日志驱动配置，生成针对每一个容器的日志 copyer 驱动，日志 copyer 驱动有多种实现，默认的实现是将日志传输到 eventlog 服务中。也支持时间其他日志收集服务的驱动，比如 ES。

### 应用 Web 终端控制服务

该组件实现了通过 web 的方式连接到容器控制台的功能。该组件通过与 UI 进行 WebSocket 通信，用户可以通过模拟 Web 终端发送各类 shell 命令，webcli 通过 kube-apiserver 提供的 exec 方式在容器中执行命令并返回结果到 Web 终端。

rbd-webcli 服务可以拦截和清洗所有的用户命令。防止恶意的命令注入，通过的通信模式实现终端到浏览器端。

### 元数据存储服务

Rainbond 数据中心元数据目前支持存储于 Mysql 数据库或 CockroachDB 数据库。数据库主要存储应用模型的基础元数据，不记录应用的运行态数据。运行态数据主要由 Kubernetes 集群维护或在 ETCD 服务中记录。

5.1.8 及以前版本支持 Mysql 5.6

5.1.9 及以后版本支持 Mysql 5.7 8.0

### Kubernetes Master 服务

Kubernetes Master 包含 1.10.11 版本的 Kube-apiserver、Kube-ControllerManager、Kube-Scheduler 三个组件。

### DNS 服务

DNS 服务为集群提供 DNS 解析服务, 基于 Kube-DNS 二次开发。

### 镜像仓库服务

基于开源 [Distribution](https://github.com/docker/distribution) 项目，用于当前数据中心下的容器镜像存储。

### 包仓库（Artifactory）

基于开源 Artifactory 项目，服务于应用基于源码构建，存储或代理应用构建所需要的所有第三方类库和文件包。是源码构建必须的组件，其可对接企业内部的其他包仓库。

## 业务逻辑层组件说明

### 应用控制台

应用控制台 UI 组件作为 Rainbond 以应用为中心抽象的关键模块，面向应用开发者和应用使用者。基于 Django+Ant design 前后端分离架构设计，提供用户对应用抽象、应用组抽象，数据中心抽象，应用市场抽象提供交互体验。实现完整的应用创建、管理流程，应用交付分享流程等。

### 资源管理控制台（企业版）

资源控制台 UI 组件提供 Rainbond 集群资源管理，计划支持对接 IaaS 的资源管理能力，面向运维人员设计。关注节点物理资源，集群资源，管理服务资源，应用实际使用资源，租户资源等管理。Rainbond 自动化运维能力的关键展示平台。

## 组件部署

[组件部署架构文档](/docs/ops-guide/component/)
