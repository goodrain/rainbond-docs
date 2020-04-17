---
title: "Kubernetes监控"
description: "Rainbond平台集成Kubernetes监控"
hidden: true
---

#### 概述

kubernetes作为Rainbond平台底层应用编排的基础组件，其运行状态以及资源使用情况决定着运行在其上应用的正常与否。Rainbond平台在刚开始就集成Prometheus组件提供平台的监控，更好的了解平台的使用情况。出于对平台上应用的资源使用情况、应用数量以及节点和集群健康状况等k8s集群相关指标的需要，自V5.1.9版本起，Rainbond平台实现了k8s监控指标的收集，用户可以结合Rainbond平台提供的监控组件，直接对接k8s监控。

#### 组件介绍

kubernetes官方提供的k8s监控方案[`kube-state-metrics`](https://github.com/kubernetes/kube-state-metrics)通过监听Kubernetes API服务，直接生成k8s内部各种对象（例如部署，节点和实例等）的运行状况，中间不做任何的修饰。直接生成的指标其可塑性非常高，用户可以根据这些指标构造更多实际需要的指标，而该项目所需要的只有与k8s集群建立起一个稳定的链接。

`kube-state-metrics`通过监控Kubernetes API服务生成监控指标而不做任何修饰，确保了其生成的数据和直接通过Kubernetes API获得的数据保持最高级别的一致性。换句话说，其查询的数据和kubelet查询出来的数据或许会存在一定的误差。这是因为kubelet获取的数据是会经过一定的描述修饰的，被加工成了高可读性的数据，用户使用上更容易接受。
#### Rainbond平台集成k8s监控

Rainbond平台集成k8s监控同样是只需要`kube-state-metrics`暴露的api地址，并将其注册到Prometheus中。自V5.1.9版本开始新版安装包中会包含`kube-state-metrics`组件，提供脚本自动安装的支持，`rbd-monitor`组件也会添加`kube-state-metrics`参数，标识k8s监控api地址，启动时自动将其注册到Prometheus中。


#### 参数配置

如果仅需要对接k8s监控，或通过其他相同类似功能的k8s监控组件，同样可以将其暴露的api服务地址作为参数`kube-state-metrics`提供给`rbd-monitor`组件，`rbd-monitor`组件启动参数可参考如下：

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

> 注意：`rbd-monitor`只需要IP和端口组成的地址即可，系统会进行路径的拼接，直接使用`/metrics`路径作为k8s监控暴露的指标地址，再注册到Prometheus中。

#### k8s监控项简介

k8s监控项目`kube-state-metrics`提供了丰富的监控指标，具体可参照[exposed-metrics](https://github.com/kubernetes/kube-state-metrics/tree/master/docs#exposed-metrics)来搜索有用的指标来结合业务使用。