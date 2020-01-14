---
title: 监控
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1402
description: 主机、组件、容器(应用异常)监控
hidden: true
---

#### 概述

本节主要介绍的是Raibond监控体系中对Node机器监控，各服务组件监控及容器监控。监控服务由Rainbond组件`rbd-monitor`完成，在monitor组件中采用Sidecar设计模式思想整合[Prometheus](https://prometheus.io/)服务，并基于ETCD动态发现需要监控的targets，自动配置与管理Prometheus服务。monitor会定期到每个targets刮取指标数据，并将数据持久化在本地，提供灵活的PromQL查询与RESTful API查询。通过[Granfana](https://grafana.com/)将监控数据可视化。在Rainbond资源管理后台与控制台中，基于monitor组件刮取的监控数据对应用与容器实现资源可视化等。monitor组件支持自定义报警规则，对接Alertmanager向用户发送报警信息。

当前`rbd-monitor`是冗余的工作模式，即对集群中所有节点的监控数据进行收集，当节点数量或监控数据量庞大时，对监控服务务必带来很大的压力。在后面的版本中我们会持续优化监控体系，支持多点部署、分布式数据采集、查询汇总等。

<img src="https://static.goodrain.com/images/docs/3.7/monitor/monitor-structure.jpg" width="80%"  />

`rbd-monitor`提供Prometheus服务，在浏览器中访问管理节点的`9999`端口即可。Prometheus默认保存七天的数据，如果你需要更改配置，在`/opt/rainbond/conf/master.yaml`文件中的`rbd-monitor`配置中修改启动参数对应的值即可。

#### Node资源监控

有许多第三方组件提供导出现有的Prometheus指标供Prometheus拉取。Prometheus社区提供的[NodeExporter](https://github.com/prometheus/node_exporter)项目可以对于主机的关键度量指标状态监控，Rainbond整合实现了NodeExporter并暴露在Node端口6100上，Prometheus可以通过`http://node_ip:6100/metrics`刮取本节点的主机监控指标及数据。

<img src="https://static.goodrain.com/images/docs/3.7/monitor/node_targets.jpg" width="100%" />

在Rainbond的`monitor`组件中，通过etcd中注册的node信息来发现各节点，将各节点主机监控的Metrics地址配置到Prometheus配置文件，Prometheus按配置的间隔时间定时到所有Node拉取指标数据，存储数据并可用PromQL提供丰富的查询。你可以使用Prometheus的查询语句查询各资源使用情况，或者配置Granfana模版更加直观展示主机的监控信息，在下面会详细介绍如何在Granfana配置Noed监控模版。

<img src="https://static.goodrain.com/images/docs/3.7/monitor/node-targets2.jpg" width="100%" />

#### 服务组件监控

我们在Rainbond的各服务组件中自定义了Prometheus的Exporter，定义组件健康与工作等一些指标，并将指标与数据生成Prometheus可以识别的格式，通过metrics地址供Prometheus刮取。

在Prometheus的`Targets`中你可以看到这些服务组件，并可以查询这些服务组件暴露的指标及数据。

<img src="https://static.goodrain.com/images/docs/3.7/monitor/service-healthy.jpg" width="100%" />

#### 容器监控

[Cadvisor](https://github.com/google/cadvisor)是google开源的监控项目，Cadvisor对Node机器上的资源及容器进行实时监控和性能数据采集，包括CPU使用情况、内存使用情况、网络吞吐量及文件系统使用情况。

CAdvisor 启动通过调用 Linux 系统 inotify 监测 cgroup docker 目录的文件变化判断 docker 的创建和删除。找出Container对应的系统文件读取监控数据。

Kubernetes的生态中，cAdvisor是作为容器监控数据采集的Agent，cAdvisor集成在Kubelet中，其部署在每个计算节点上的kubelet启动时会自动启动cAdvisor，一个cAdvisor仅对一台Node机器进行监控，默认端口为`4194`，在URL`http://node_ip:4194/metrics` 提供监控指标及数据供Prometheus刮取，默认的刮取间隔为`15s`一次。

在Rainbond的`monitor`组件中通过etcd发现计算节点，将该节点CAdvisor提供的metrics地址配置Prometheus的配置文件，通过Prometheus指标丰富的`label`对容器及pod进行分类查找。并可实现对Rainbond应用的资源监控等。具体的监控项可在Granfana中配置模版，下面会详细说明如何在Granfana中配置容器监控模版。

<img src="https://static.goodrain.com/images/docs/3.7/monitor/cadvisor-1.jpg" width="100%" />

<img src="https://static.goodrain.com/images/docs/3.7/monitor/cadvisor-2.jpg" width="100%" />

#### 应用异常事件监控

应用异常事件监控是捕捉并记录在RainBond中部署应用的OOM，运行异常情况等事件。便于发现并调整存在异常的应用，避免由于应用的持续异常影响资源及各服务的正常工作。

##### 实现机制

Rainbond实现的worker组件中，对应用实例出的pod进行状态观察，当pod发生异常退出时触发事件来处理pod的退出信息，并将错误类型、错误原因、触发次数、最后出现时间等信息记录在数据库中供我们查询。

具体处理流程参考文档[应用异常处理](/user-operations/tools/grctl/#应用异常处理)
