---
title: 监控指标说明
summary: 本文将列举Rainbond平台内置的监控指标
toc: true
---

## 监控指标

Rainbond-monitor组件负责监控数据收集和存储，其主要由`Prometheus`服务和管理服务构成。Rainbond的监控指标分为内置监控指标和用户自定义指标。

## 内置监控项目

>  详细指标访问 <管理节点:9999> 端口服务，由Prometheus提供的UI

* 资源类

| 收集任务            | 来源     | 说明                   |
| ------------------- | -------- | ---------------------- |
| node_cpu            | node服务 | 宿主机CPU使用情况      |
| node_filesystem_*   | node服务 | 宿主机文件系统使用情况 |
| node_load*          | node服务 | 宿主机负载情况         |
| node_memory_*       | node服务 | 宿主机内存使用情况     |
| node_mountstats_*   | node服务 | 宿主机挂载存储情况     |
| node_netstats_*     | node服务 | 宿主机网络io情况       |
| node_nfs_net_*      | node服务 | 宿主机nfs监控          |
| container_fs        | node服务 | 容器文件系统使用情况   |
| container_cpu_*     | node服务 | 容器cpu使用情况        |
| container_memory_*  | node服务 | 容器内存使用情况       |
| container_network_* | node服务 | 容器网络io使用情况     |
|                     |          |                        |

* 管理服务类
  * 第三方服务 etcd、kubernetes
  * Rainbond服务 mq、worker、chaos等。

* 应用类

  * 服务网关监控

  * 服务性能分析监控


## 自定义监控项目

rbd-monitor支持用户配置自定义的监控目标，使用方式与配置Probetheus的方式一直，配置文件路径默认为：

```
/etc/prometheus/prometheus.yml
```

也可以通过启动参数`--config.file` 指定