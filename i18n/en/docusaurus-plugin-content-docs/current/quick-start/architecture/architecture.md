---
title: Architecture
description: Rainbond Technical Architecture
---

### Rainbond Technical Architecture

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/architecture.svg" width="100%"/>

Rainbond implements the application-centric concept, absorbs excellent community solutions, and forms a data center logic technology architecture that combines application control, application runtime, and cluster control. The physical architecture divided by the storage node to the class node type forms a highly available and highly scalable data center architecture system.

Based on the data center architecture, it is divided into application management control terminals and resource management control terminals according to the target population to serve application development, operation and maintenance and resource users respectively.A multi-data center model that supports users to manage and control multiple data centers at the same time.支撑用户同时管理和控制多个数据中心的多数据中心模式。

## Data Center Service Component Description

### Data Center API Service

As an abstract core control service at the data center level, API service provides Restful-style API services to the outside world, and is the only entry for data center control requests. Security control is based on TLS two-way security authentication.Self-signed certificates are distributed to clients.自主签发证书后分发到客户端。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/api.png" width="100%"/>

API 服务请求进入后由 router 模块进行请求分发，普通请求进入 Handle 请求处理模块，这类请求主要是操作数据库模型的请求，API 服务基于 ORM 支持 Mysql 数据库和 CockroachDB 数据库。进入 Proxy 的请求分为 API 请求和 Websocket 请求。由 Discover 模块通过 etcd 服务发现其代理目标并转发请求。因此其他组件提供的 API 可通过服务注册由 API 服务代理转发请求。

### Application Gateway Service

The application gateway is the only entry point for external traffic to enter the internal components of the Rainbond tenant, providing HTTP, HTTPs routing, TCP/UDP services, load balancers, advanced routing (A/B testing, grayscale publishing), virtual IP support and other functions.

The design of the application gateway is inspired by the NGINX Ingress Controller. Based on the configuration of converting the monitored Kubernetes resource (Ingress, Service, Secret, Endpoint) model from the kube-apiserver to the Proxy controller, it provides an automatic work, real-time effective, dynamic Hot-configured Layer 7, Layer 4 gateway services.

The application gateway can increase concurrency and basic performance through horizontal expansion, and the general configuration takes effect synchronously in all gateway nodes.For 74IP+对于 74IP+

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/gw.png" width="100%"/>

The architectural goal of the single-node application gateway service is to support multiple data sources, support multiple IPs, support high concurrency capabilities, support multiple server capabilities, and support dynamic configuration change capabilities.Based on this, the application gateway architecture is designed as follows：基于此需要应用网关架构设计如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/images/gateway.png" width="100%"/>

The application gateway service integrates the Openresty service as a front-end traffic proxy service. Based on lua, Openresty can be extended. Lua-Config-Controller implements dynamic configuration, Upstream management, and load balancing strategy implementation. Lua-Monitor-Controller implements request data. The record and summary report, Lua-Security-Controller implements the security control of the request.The three Lua modules are driven by Openresty-Controller. The Metric-Controller module aggregates various monitoring data of the gateway and exposes the Metric-Server of the Prometheus specification.Openresty-Controller is driven by data, the data comes from Gateway-Model-Controller, the two layers have no coupling relationship, and it implements standard interface specifications.We can implement drivers based on other proxy services, such as F5, as needed.三个 Lua 模块由 Openresty-Controller 驱动工作，Metric-Controller 模块汇聚网关的各类监控数据并向外暴露 Prometheus 规范的 Metric-Server。Openresty-Controller 由数据驱动，数据来源于 Gateway-Model-Controller，两层无耦合关系，其实现了标准的接口规范。根据需要我们可以实现基于其他 proxy 服务的驱动器，比如 F5。

After the API service request is entered, the router module performs the request distribution, and the ordinary request enters the Handle request processing module. This type of request is mainly the request to operate the database model. The API service supports Mysql database and CockroachDB database based on ORM.The requests entering the Proxy are divided into API requests and Websocket requests.It is up to the Discover module to discover its proxy targets and forward requests through the etcd service.Therefore, APIs provided by other components can forward requests by the API service proxy through service registration.The data model source of the application gateway supports the ingress model of kubernetes or the reduced model discovered from etcd, and the data discovery service drives the dynamic work of the entire gateway.IP is an important resource of the gateway. After the IP-Port-Pool module is started, it will obtain all available IP addresses and ports of the current cluster, and establish the perception of IP address changes. The IP-Manage module will judge whether the gateway policy is based on the IP and port data. Take effect on the current node.

### application building service

<img src="https://static.goodrain.com/images/docs/3.6/architecture/app-ci.png" width="100%"/>

The Rainbond application building service handles the CI process, parses, compiles, and packages the input source including `source code` or `Docker image` or `application market application` , and finally generates the version medium of the application (component).

Package Repository (Artifactory)Traditionally, a complete CI process would include：design, coding, packaging, testing, and release. Since its launch, Docker images have gradually become a new form of packaging for many application codes.Existing CI products have been very mature in source code testing and Pipline, such as Jenkins, Gitlab, etc. Therefore, Rainbond can directly connect with third-party services in the pre-processing of source code or Docker images, which is processed by third-party services. The source code or mirror image is then docked to the Rainbond-Chaos module for application abstraction.

The input sources of Chaos are code repositories that support Git and Svn protocols, and Docker image repositories.If it is source code, Chaos intelligently judges the type of source code, such as Java, PHP, Python, Dockerfile, etc., selects the corresponding BuildingPack (source code builder) for source code compilation according to different source code types, and identifies the operating environment requirements defined in the source code parameters. , application ports, environment variables and other parameters to form the configuration prototype of application abstraction.Source code types other than Dockerfile will be compiled into application code environment package (SLUG) and stored in distributed storage, other generated Docker local images will be stored in data center image warehouse, and application component attributes will be formed in combination with various attribute information of the application.如果是源代码，Chaos 智能判断源码的类型，例如 Java, PHP , Python, Dockerfile 等，根据不同的源码类型选择对应的 BuildingPack(源码构建器)进行源码编译，同时识别源码中定义的运行环境要求参数，应用端口、环境变量等参数，形成应用抽象的配置雏形。除了 Dockerfile 以外的源码类型将被编译成应用代码环境包（SLUG）存储于分布式存储中，其他的生成 Docker 本地镜像存储于数据中心镜像仓库中，结合应用的各类属性信息形成应用组件属性。

The application building service is a stateless architecture, designed with task executors driven by the message system (rbd-mq). Implemented Git client and mirror warehouse client, integrated SVN client to obtain component build source resources. The task execution process records a complete log, and the event client inputs the log to the rbd-event-log service through the message stream.Each source code build process is controlled by Chaos by calling the native Docker API to create a build container and maintain the container life cycle. 实现了 Git 客户端和镜像仓库客户端，集成了 SVN 客户端来获取组件构建源资源。 任务执行过程记录完整日志由 event 客户端通过消息流将日志输入到 rbd-event-log 服务。每一个源码构建过程由 Chaos 控制调用本机 Docker API 创建构建容器并维护容器生命周期。

The source code building process is a very resource-consuming process. Therefore, the application build service supports multi-node deployment to increase the number of concurrently supported build tasks. The maximum number of concurrent builds supported by each node is determined by the number of node CPU cores or manually set by operation and maintenance personnel.

> - About the BuildingPack of source code compilation, please refer to [each language support document](/docs/use-manual/component-create/creation-process).
> - The application construction service supports multi-point high-availability deployment, and multi-point deployment obtains application construction tasks from message middleware.

### Application Runtime Control Service

The application runtime control service instantiates the Rainbond-Application Model and converts it into a Kubernetes resource model, assigns various resources required for application operation, and completes the running state part of the application life cycle. It can be understood as the CD control service. The design points of this service It is the life cycle supervision that supports a large number of applications.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/architecture/worker-arch.svg" width="100%"/>

应用生命周期中可能经历启停、升级与回滚。The application life cycle may experience start, stop, upgrade and rollback.Different application types require different control strategies. For example, stateless applications can perform unordered rolling upgrades, while the upgrade control strategies for stateful applications will be more complex.The Worker service implements lifecycle controllers for various component types, including start, stop, update, and scaling waits.Worker 服务中实现各类组件类型的生命周期控制器器、包含启动、停止、更新、伸缩等待。

Application operation requires various external environment support. For example, network resources such as tenant IP and ports need to be allocated. Persistent storage resources need to be assigned according to application settings. For example, shared file storage allocates storage directories, and block storage relies on various plug-ins to allocate storage resources. Establish service discovery and load balancing strategies based on application dependency properties for mesh plugins.Generate scheduling policies based on application properties to call the Kubernetes cluster to schedule application running. 根据应用依赖属性建立服务发现和负载均衡策略供给 mesh 插件。根据应用属性生成调度策略调用 Kubernetes 集群调度应用运行。

目前 Rainbond 使用 Kubernetes 以下资源类型：Deployment、Statefulset、Service、Ingress、Secret、ConfigMap、Pod。对于用户来说，无需理解这些资源，产品中也不体现，其只是应用运行的载体。

The function of the worker component is divided into a stateful part and a stateless part. In order to realize the cluster deployment of the worker component, the worker elects the master node, and the service elected as the master node will provide the application storage provider and storage statistics service.

The Worker component is a module for the kubernetes-controller controller extension and scheduler extension. Currently, there are local storage providers, shared storage providers for stateful components, etc. It also obtains existing resources in the Kubernetes cluster for Rainbond application components to choose and use .

Worker components can support multi-node deployment to ensure high availability.

### Monitoring service

The design goal of the Rainbond cluster monitoring service is to comprehensively monitor the four dimensions of application business performance level, application container resource level, cluster node level, and management service level. It provides data storage, query, visualization and alarming functions, and supports performance in terms of performance. large-scale clusters.

Prometheus does not support cluster deployment by default, and cannot directly increase monitoring capabilities by expanding nodes.In order to improve the processing capacity of the monitoring system, it currently supports remote storage of stored data to improve data storage capacity; supports configuration synchronization of multiple nodes to provide service availability; supports adjustment of monitoring data storage window and reduces the occupation of memory resources.It is planned to support clustered partitioning of monitoring targets, thereby supporting expansion of nodes to expand monitoring capabilities, and providing a unified query API to shield the underlying data partitions.Rainbond encapsulates the Monitor component based on Prometheus. By automatically discovering various monitoring objects of applications, clusters, and cluster node services from etcd and Kubernetes clusters, and completing the configuration of Prometheus monitoring targets, the monitoring targets are included in the scope of Prometheus monitoring.Each component of Rainbond also implements the monitoring indicators exposed on the exporter side of Prometheus.Automated monitoring of multiple dimensions without user intervention.无需用户干预的条件下实现对多个维度的自动化监控。

The Monitor component can automatically configure some default alarm rules. It plans to support obtaining custom alarm rule resources from Kubernetes to generate Prometheus alarm rules to make them take effect dynamically, thereby supporting custom alarm rules. The alarm information is processed by the third-party Alter-Manage system.

Prometheus 默认情况下不支持集群部署，无法直接通过扩充节点来提高监控能力。为了提高监控系统的处理能力，目前支持将存储数据通过远程存储来提高数据存储能力；支持多个节点配置同步来提供服务可用性；支持调整监控数据存储窗口和减少对内存资源的占用。计划支持对监控目标进行集群化分区，从而支持扩充节点来扩充监控能力，对外提供统一的查询 API 屏蔽底层的数据分区。

### message middleware service

The MQ component is a lightweight distributed, message persistence and globally consistent message middleware based on Etcd.This component maintains asynchronous task messages and provides multi-topic message publishing and subscription capabilities.该组件维护异步任务消息，提供多主题的消息发布和订阅能力。

There are many message middleware products on the market, such as ActiveMQ, RabbitMQ,：, etc. According to our requirements, the key attributes such as distribution, persistence, global consistency, light weight, order, etc., the existing message middleware products or More or less dissatisfied.

Etcd 是简单、安全、快速、可信的键值存储服务，在我们的整个系统架构中扮演重要角色。基于 etcd 已有的特性很方便的实现一个基础消息系统。对于每一个订阅主题采用一个 key，由 etcd 控制时序和独占机制，使进入的消息可以顺序消费，客户端通过 etcd 提供的 watch 机制可以非常简单的订阅消息。基于此我们包装了两类 API: restful 和 grpc。客户端即可便捷的操作消息的 PUB/SUB。

### Event and Log Processing Service

The logs and message information that the Rainbond platform needs to process includes three categories:：user asynchronous operation logs, application construction logs, and application running logs.

Currently Rainbond uses the following resource types in：Deployment, Statefulset, Service, Ingress, Secret, ConfigMap, Pod.For users, there is no need to understand these resources, and they are not reflected in the product, they are just the carrier of application operation.User asynchronous operation log：For the user operation log, we need to track the final status of each operation in a distributed manner. Currently, the eventlog component judges the final status of the operation according to the log aggregation of each operation.In the process of processing an asynchronous task, other components will send process log records to the eventlog cluster through the gRPC message stream.

Application build log：mainly displays the output information of source code build or Docker image build, which comes from the application build service.

Application running log, currently we divide it into two forms：

(1) Standard output/error output log

For standard output logs, the computing node log collector obtains the log stream through Docker Daemon and separates services. By default, the container logs of all computing nodes are sent to the Eventlog component in real time based on TCP data stream communication, and they are aggregated at the application level for storage. and push it to the UI in real time. In subsequent versions, the log collector will realize the connection with the third-party log system and directly deliver the logs to the third-party log processing platform.

(2) Business logs (access logs) output to persistent files

For business logs output to the persistent directory, it is generally necessary to automatically analyze them, such as connecting to the ELK system. Therefore, install a log processing plugin in the plugin system to collect log files from the persistent directory and send them to a third-party log analysis service.

The log processing design requirement for the cluster is to support log aggregation, storage, real-time push and query.And can support a larger log volume.并能够支撑较大的日志量。

According to the above log type analysis, operation logs are limited log streams whose main requirements are to implement storage and implement push clients.The processing link for such logs is mainly that the grpc message stream accepts logs from various component clients, aggregates and stores logs in units of events, and simultaneously propagates them in the cluster, thereby providing distributed logs to clients. Subscription capability.Realize the effect of single-node storage and multi-node readability.Etcd is a simple, secure, fast, and trusted key-value storage service that plays an important role in our entire system architecture.It is very convenient to implement a basic message system based on the existing features of etcd.A key is used for each subscription topic. The timing and exclusive mechanism are controlled by etcd, so that incoming messages can be consumed in sequence. The client can subscribe messages very simply through the watch mechanism provided by etcd.Based on this we wrap two types of APIs: restful and grpc.The client can conveniently operate the PUB/SUB of the message.实现单节点存储，多节点可读的效果。

Based on the open source Artifactory project, it serves all third-party class libraries and file packages required for application construction based on source code, storage or proxy application construction.It is a necessary component for source code construction, and it can be connected to other package repositories within the enterprise.The application running log is an infinite log stream with many log sources, which is determined by the amount of applications existing in the current cluster and the amount of logs generated by each application.Therefore, in order to support the huge amount of application logs, the eventlog service implements the partitioned log processing capability, and flexibly adjusts the log processing nodes in units of components (service_id). The running logs of the same component are passed through the log collection service of each computing node. The TCP message flow sends the log to the specified eventlog service node. After the eventlog service receives the log, the log is aggregated, buffered and placed on the disk.It also provides real-time push capabilities to subscribing clients.When the client subscribes, the rbd-api service loads the specified eventlog service node according to the subscribed service_id information.同时提供向订阅客户端的实时推送能力。客户端订阅时由 rbd-api 服务根据订阅的 service_id 信息负载到指定的 eventlog 服务节点。

The Node component is the basic service formed by the Rainbond cluster, and all nodes in the cluster need to run this component.Provides key capabilities such as node information collection, cluster service maintenance, application log collection, and application runtime support.The cluster nodes of the Eventlog service need to communicate with each other, including operation log stream sharing and processing capacity reporting to determine the processing nodes of the application running log.Therefore, the nodes of the Eventlog service realize the inter-node communication through the ZeroMQ subscription mode. ZeroMQ is a high-performance message library, based on which to ensure the communication performance between the Eventlog services.The worker nodes of Eventlog make full use of the memory buffering mechanism when processing logs to improve the throughput of log messages and reduce the pressure on the disk.Eventlog 的工作节点处理日志时充分使用内存缓冲机制来提高日志消息吞吐率的同时减少对磁盘的压力。

The Eventlog service is a stateful cluster service that supports horizontal scaling to improve application log processing capabilities.

### Cluster, node management services

Node 组件是 Rainbond 集群组建的基础服务，集群内所有节点都需要运行该组件。提供节点信息采集、集群服务维护、应用日志收集、应用运行时支持等关键能力。

Kubernetes Master includes three components, Kube-apiserver, Kube-ControllerManager, and Kube-Scheduler in version 1.10.11.The Node component has two roles, the master role and the worker role.Generally, the Node running on the management node has the master role. The master role maintains the status and information aggregation of all nodes, and provides API query services. The worker role node regularly reports the status to the master node.

<img src="https://static.goodrain.com/images/docs/3.6/architecture/rainbond-cluster-ctl.png" width="100%" />

节点控制器首先充当当前节点运行服务的守护任务，这方面类似于 Kubelet。每个节点需要运行的服务或健康检测项目，通过 yaml 的格式在/opt/rainbond/conf 目录中定义。控制器启动后将读取此目录下的配置，对于需要启动的服务调用 systemd 守护进程来启动服务， 对于健康检测项目则根据配置生成健康检测控制器。这里的设计主要是为了实现集群的自动化运维和扩充 kubernetes 节点的监控项目。节点控制器将维护所有配置项的状态并汇报给 master 节点。对于异常的服务控制器将根据规则尝试重启恢复服务，若无法恢复时将建议 master 节点将当前节点设置为不健康状态并脱离调度可用范围，直到节点恢复。

In terms of monitoring, Node exposes various monitoring indicators at the operating system and hardware level of the node (integrating promethes node-exporter), and as a collector of application performance analysis data, it converts and exposes application performance analysis indicators.All exposed monitoring metrics are collected by the rbd-monitor service.所有暴露的监控指标由 rbd-monitor 服务收集。

The DNS service provides DNS resolution services for the cluster, based on the secondary development of Kube-DNS.The Node service group running on all computing nodes builds the running environment support for running applications in the tenant network, especially ServiceMesh support and plug-in dynamic configuration query support.The Node service provides a general configuration discovery API and service discovery API to support the application architecture running on the current node. On this basis, it provides the XDS Server service and provides dynamic configuration for the built-in ServiceMesh architecture.

<img src="https://static.goodrain.com/images/docs/3.6/architecture/ServiceMesh.png" width="100%"/>

The node controller first acts as a daemon task for the current node running service, similar to Kubelet in this respect.The services or health check items that each node needs to run are defined in the /opt/rainbond/conf directory in the format of yaml.After the controller is started, it will read the configuration in this directory, call the systemd daemon to start the service for the service that needs to be started, and generate the health check controller according to the configuration for the health check project.The design here is mainly to realize the automatic operation and maintenance of the cluster and expand the monitoring project of kubernetes nodes.The node controller will maintain the state of all configuration items and report to the master node.For an abnormal service controller, it will try to restart and restore the service according to the rules. If it cannot be restored, it is recommended that the master node set the current node to an unhealthy state and leave the scheduling availability range until the node is restored.The node controller log collection module implements log collection for all application containers of the current node.By obtaining the container list and log driver configuration in real time from Dockerd, a log copyer driver for each container is generated. There are multiple implementations of the log copyer driver. The default implementation is to transfer logs to the eventlog service.It also supports drivers of other log collection services, such as ES.也支持时间其他日志收集服务的驱动，比如 ES。

### Application Web Terminal Control Service

该组件实现了通过 web 的方式连接到容器控制台的功能。This component implements the function of connecting to the container console through the web.This component communicates with the UI through WebSocket. Users can send various shell commands by simulating the web terminal. The webcli executes commands in the container through the exec method provided by kube-apiserver and returns the results to the web terminal.

The rbd-webcli service can intercept and sanitize all user commands.Prevent malicious command injection, and realize terminal-to-browser through the communication mode.防止恶意的命令注入，通过的通信模式实现终端到浏览器端。

### metadata storage service

Rainbond data center metadata currently supports storage in Mysql database or CockroachDB database.The database mainly stores the basic metadata of the application model, and does not record the running state data of the application.Running state data is mainly maintained by the Kubernetes cluster or recorded in the ETCD service.数据库主要存储应用模型的基础元数据，不记录应用的运行态数据。运行态数据主要由 Kubernetes 集群维护或在 ETCD 服务中记录。

5.1.8 and earlier versions support Mysql 5.6

5.1.9 and later versions support Mysql 5.7 8.0

### Mirror Repository Service

Based on the open source [Distribution](https://github.com/docker/distribution) project, it is used for container image storage in the current data center.

## Description of business logic layer components

### application console

As the key module of Rainbond's application-centric abstraction, the application console UI component is oriented to application developers and application users.Based on the front-end and back-end separation architecture design of Django+Ant design, it provides users with application abstraction, application group abstraction, data center abstraction, and application market abstraction to provide interactive experience.Realize the complete application creation, management process, application delivery and sharing process, etc.基于 Django+Ant design 前后端分离架构设计，提供用户对应用抽象、应用组抽象，数据中心抽象，应用市场抽象提供交互体验。实现完整的应用创建、管理流程，应用交付分享流程等。

### Resource Management Console (Enterprise Edition)

The resource console UI component provides Rainbond cluster resource management. It is planned to support the resource management capability of docking with IaaS, and is designed for operation and maintenance personnel.Pay attention to the management of node physical resources, cluster resources, management service resources, actual application resources, and tenant resources.A key display platform for Rainbond's automated operation and maintenance capabilities.关注节点物理资源，集群资源，管理服务资源，应用实际使用资源，租户资源等管理。Rainbond 自动化运维能力的关键展示平台。

## Component deployment

[Component Deployment Architecture Documentation](/docs/ops-guide/component/)
