---
title: 组件介绍
summary: 管理节点中组件的信息，组件信息，所有组件
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

##云帮系统组件

| 组件                                       | 功能                                       |
| :--------------------------------------- | :--------------------------------------- |
| [**docker**](/docs/stable/platform-maintenance/add-management-node/component-introduction/docker.html) | docker是云帮容器的管理引擎。                        |
| [**builder**](/docs/stable/platform-maintenance/add-management-node/component-introduction/builder.html) | 平台源码构建的基础组件，根据不同的开发语言构建语言运行环境，最终将环境与源码打包成tgz文件。 |
| [**etcd**](/docs/stable/platform-maintenance/add-management-node/component-introduction/etcd.html) | 键值数据库，能够构建一个高可用的分布式键值数据库，来存放集群状态和配置，所有有节点都从etcd中获取其他机器和容器状态，所以etcd是集群状态同步的关键。 |
| [**rainbond-node**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rainbond-node.html) | 集群资源控制器，管理节点的安装都依赖acp-node来完成。           |
| [**kubernetes**](/docs/stable/platform-maintenance/add-management-node/component-introduction/kubernetes.html) | 提供与云帮集群管理相关的API服务，例如校验应用的配置信息存储到后端的etcd服务器上。 |

##云帮基础组件

| 组件                                       | 功能                                       |
| :--------------------------------------- | :--------------------------------------- |
| [**rbd-webcli**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-webcli.html) | 是云帮应用的终端，可以在浏览器界面操作云帮服务的容器的终端。           |
| [**rbd-chaos**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-chaos.html) | 应用构建控制器。                                 |
| [**rbd-db**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-db.html) | 提供后端mysql数据库服务。                          |
| [**rbd-mq**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-mq.html) | 基于etcd的消息组件。                             |
| [**rbd-dns**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-dns.html) | 集群dns服务。                                 |
| [**rbd-api**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-api.html) | 提供与云帮集群管理相关的API服务，例如校验应用的配置信息存储到后端的etcd服务器上。 |
| [**rbd-event-log**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-event-log.html) | 提供云帮上应用的日志，消息服务。                         |
| [**rbd-slogger**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-slogger.html) | 提供应用日志的输出服务。                             |
| [**rbd-entrance**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-entrance.html) | 云帮应用层面的负载均衡控制器。                          |
| [**rbd-worker**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-worker.html) | 应用的生命周期控制器。                              |
| [**rbd-registry**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-registry.html) | 提供集群中的镜像仓库服务。                            |
| [**rbd-repo**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-repo.html) | 基于Artifactory开源版本的应用构建控制器。               |
| [**rbd-web**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-repo.html) | 云帮应用的控制台，在浏览器可以操作应用的一些配置。                |
| [**rbd-dalaran**](/docs/stable/platform-maintenance/add-management-node/component-introduction/rbd-dalaran.html) | zmq消息的中间件。                               |

