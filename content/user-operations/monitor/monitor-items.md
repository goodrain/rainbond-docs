---
title: 监控项
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1402
description: 默认支持监控项
hidden: true
---

### 节点资源监控项
| 监控项     | 所属组件        | 监控值|说明                     |
| :------- | :----------- | :-------- |:----------------------- |
|cadvisor_version_info|cadvisor||计算节点系统信息|
|machine_memory_bytes|cadvisor||当前主机内存大小|
|machine_cpu_cores|cadvisor||当前节点CPU数目|
|node_filesystem_size|node||存储|
|node_load1|node||负载1m|
|node_load5|node||负载5m|
|node_load5|node||负载15m|
|node_memory_MemTotal|node||节点内存total|
|node_memory_MemFree|node||节点内存free|
|node_uname_info|node||节点信息|

### Rainbond服务组件监控项

| 监控项     | 所属组件        | 监控值|说明                     |
| :------- | :----------- | :-------- |:----------------------- |
| acp_mq_build_info     | rbd-mq | 1 |                  |
| acp_mq_dequeue_number | rbd-mq |  |
| acp_mq_enqueue_number | rbd-mq |  |
| acp_mq_exporter_health_status| rbd-mq|1||
| acp_mq_exporter_last_scrape_error| rbd-mq|0||
| acp_mq_exporter_scrapes_total| rbd-mq|||
| builder_exporter_builder_task_error| rbd-chaos| |源码构建任务失败数|
| builder_exporter_builder_task_number| rbd-chaos| |源码构建任务数|
| builder_exporter_health_status| rbd-chaos|1|chaos组件状态1为健康|
| event_log_build_info| rbd-eventlog|1||
| event_log_exporter_health_status| rbd-eventlog|1||
| event_log_exporter_event_store_log_count| rbd-eventlog|||
| event_log_exporter_container_log_store_log_count| rbd-eventlog|||
| event_log_exporter_monitor_store_log_count| rbd-eventlog|||
| gateway_active_server|rbd-gateway||http & tcp活跃服务|
| node_exporter_build_info|node|||
| worker_exporter_health_status|worker||
| worker_up|worker|||
| worker_exporter_worker_task_number|worker|||
| up|||组件状态|

### k8s集群监控项

| 监控项     | 所属组件        | 监控值|说明                     |
| :------- | :----------- | :-------- |:----------------------- |
| etcd*|etcd||etcd监控项|

### 应用级监控项
| 监控项     | 所属组件        | 监控值|说明                     |
| :------- | :----------- | :-------- |:----------------------- |
| app_resource_appmemory|||应用内存，根据service_id,tenant_id筛选|

应用级基于CAvisor获取典型监控指标

| 监控项     | 类型       |说明                    |
| :------- | :-----------  |:----------------------- |
|container_cpu_load_average_10s |gauge | 过去10秒容器CPU的平均负载 |
|container_cpu_usage_seconds_total |counter |容器在每个CPU内核上的累积占用时间 (单位：秒)|
|container_cpu_system_seconds_total|counter |System CPU累积占用时间（单位：秒）|
|container_cpu_user_seconds_total |counter|User CPU累积占用时间（单位：秒）|
|container_fs_usage_bytes | gauge | 容器中文件系统的使用量(单位：字节) |
|container_fs_limit_bytes |gauge |容器可以使用的文件系统总量(单位：字节) |
|container_fs_reads_bytes_total|counter|容器累积读取数据的总量(单位：字节)|
|container_fs_writes_bytes_total|counter|容器累积写入数据的总量(单位：字节)|
|container_memory_max_usage_bytes|gauge|容器的最大内存使用量（单位：字节）|
|container_memory_usage_bytes|gauge|容器当前的内存使用量（单位：字节|
|container_spec_memory_limit_bytes|gauge|容器的内存使用量限制|
|container_network_receive_bytes_total| counter|容器网络累积接收数据总量（单位：字节）|
|container_network_transmit_bytes_total |counter |容器网络累积传输数据总量（单位：字节）|

### 其他监控项

| 监控项     | 类型       |说明                    |
| :------- | :-----------  |:----------------------- |
|process_cpu_seconds_total|||
|process_max_fds|||
|process_open_fds|||
