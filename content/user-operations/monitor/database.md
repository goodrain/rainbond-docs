---
title: Rainbond平台数据库监控
Description: "Rainbond平台集成数据库监控"
hidden: true
---

<div id="toc"></div>

#### 概述

Rainbond平台强烈依赖database来解决数据的持久化问题，无论是用户通过控制台创建应用，或者配置不同的数据中心，都会涉及到数据持久化的问题。MySQL作为市面上比较常用的关系型数据库，完全可以解决Rainbond数据持久化的需求，而不会带来太多学习上与维护上的成本，所以Rainbond平台选择MySQL关系型数据库作为数据持久化解决方案，并以`rbd-db`单独容器的方式来提供数据库服务。起初Rainbond平台一直使用MySQL5.6发行版，在V5.1.9更新中，会带来MySQL5.7和8.0的支持，用户可以选择使用Rainbond平台中已有的数据库，或可以选择迁移至外部数据提供更多的数据库支持特性，详细可参考[rbd-db数据迁移至外部数据库](/user-operations/management/data-migration/)。

MySQL数据库新的版本中，值得关注的点除了性能上的提升，就是`SQL MODE`的修正，从5.7开始，MySQL的`SQL MODE`默认开启严格模式，意味着遇到数据长度大于数据库表中字段定义长度的问题时，MySQL数据库不会再将数据进行切割从而保证数据的正常写入，而是直接放弃数据的写入，以报错的方式进行替代。这也是版本升级过程中特别要重视的一点。Rainbond在该问题上做了部分修正和测试，针对常用字段、易产生`data too long for column xxx`的字段进行了长度上的调整，以防止类似问题给使用上带来不好的体验。

#### 依赖数据库组件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/monitor/depend_mysql.png" width="70%">

> 组件介绍可参考该文档[技术架构](/architecture/architecture/)

MySQL中Rainbond平台会使用`console`和`region`两个数据库

* console数据库

  `console`数据库记录着Rainbond控制台层面所有操作对应内容的持久化对象，在这个层面，有着用户和租户以及数据中心的概念，意味着，同一个平台中的所有用户、租户以及数据中心的操作和创建的应用等内容，都会记录在这个数据库中。从执行`grctl init`指令搭建Rainbond平台开始，自动化脚本就会启动数据库服务，之后便会插入第一条数据，即默认数据中心数据，到`console`数据库中；再到后续注册用户、创建团队、用户创建需要的组件并运行、分享组件到内部市场或迁移等操作，每一步操作都对应着`console`数据库中的一条记录。

* region数据库

  贴合着Rainbond一个数据中心即一个集群的概念，`region`数据库则对应着一个数据中心，记录着一个数据中心中的不同租户在对应的集群中所有与应用相关的所有元数据，相对于控制台数据库`console`有着复杂逻辑的数据持久化需求，数据中心中的数据则更倾向于数据的记录。其记录着不同租户的应用下所有的组件信息，包括各个组件的路由规则、证书信息、备份信息、存储、端口和环境变量等。

#### Rainbond平台集成MySQL数据库监控

Rainbond采用Prometheus官方给出的MySQL数据库的监控指标收集方案[mysqld_exporter](https://github.com/prometheus/mysqld_exporter.git)，该组件会在新版安装包中一并安装，如有用户需要手动安装可参考该项目官方文档进行部署。

`mysqld_exporter` 组件会通过MySQL连接持续不断的收集MySQL的所有指标，同时暴露api服务，供Prometheus服务端刮取对应的指标。`rbd-monitor`组件并不提供数据库指标的收集和暴露服务，只是将`mysqld_exporter`组件暴露的api服务注册到Prometheus中，以此来达到Prometheus能收集MySQL指标的目的。所以在新版本的`rbd-monitor`组件中新增了`mysqld-exporter`参数，如果用户启用了该参数，则在`rbd-monitor`组件启动时会自动将`mysqld_exporter`暴露的api服务地址注册到Rainbond平台中集成的Prometheus服务中。

#### 参数配置

如果仅需要对接数据库监控，或通过其他相同类似功能的数据库监控组件，同样可以将其暴露的api服务地址作为参数`mysqld-exporter`提供给`rbd-monitor`组件，`rbd-monitor`组件启动参数可参考如下：

```
- name: rbd-monitor
  endpoints:
  - name: MONITOR_ENDPOINTS
    protocol: http
    port: "3329"
  - name: PROMETHEUS_ENDPOINTS
    protocol: http
    port: "9999"
  health:
    name: rbd-monitor
    model: http
    address: 127.0.0.1:3329/monitor/health
    time_interval: 5
    max_errors_num: 3
  only_health_check: false
  is_init_start: false
  disable: false
  after:
  - docker
  requires: []
  type: simple
  pre_start: docker rm rbd-monitor
  start: docker run --name rbd-monitor --network host -v /opt/rainbond/data/prom:/prometheusdata
    -i rainbond/rbd-monitor:master-dev --etcd-endpoints=${ETCD_ENDPOINTS} --advertise-addr=10.10.10.10:9999
    --alertmanager-address=10.10.10.10:9093 --web.listen-address=0.0.0.0:9999 --config.file=/etc/prometheus/prometheus.yml
    --storage.tsdb.path=/prometheusdata --storage.tsdb.no-lockfile --storage.tsdb.retention=7d
    --log.level=info
    --kube-state-metrics=10.10.10.10:9105
    --mysqld-exporter=10.10.10.10:9104
  stop: docker stop rbd-monitor
  restart_policy: always
  restart_sec: "10"
```

> 注意：`rbd-monitor`只需要IP和端口组成的地址即可，系统会进行路径的拼接，直接使用`/metrics`路径作为MySQL监控暴露的指标地址，再注册到Prometheus中。