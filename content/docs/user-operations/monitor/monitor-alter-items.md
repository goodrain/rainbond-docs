---
title: 监控报警说明
draft: false
weight: 1402
description: 基于Prometheus监控说明
---

### 概述

Rainbond 监控服务由组件 `rbd-monitor` 完成，在 monitor 组件中采用 Sidecar 设计模式思想整合 [Prometheus](https://prometheus.io/) 服务，并基于 ETCD动态发现 需要监控的 targets，自动配置与管理 Prometheus 服务。monitor 会定期到每个 targets 刮取指标数据，并将数据持久化在本地，提供灵活的PromQL查询与RESTful API查询。

#### 架构图：

<image src="https://static.goodrain.com/images/docs/3.7/monitor/monitor-structure.jpg" title="组件间通信结构图" width="100%">

### 监控项

#### 节点资源监控项

| 监控项     | 所属组件        |说明                     |
| :------- | :----------- |:----------------------- |
|cadvisor_version_info|cadvisor|节点系统信息|
|machine_memory_bytes|cadvisor|当前主机内存大小|
|machine_cpu_cores|cadvisor|当前节点CPU数目|
|node_filesystem_size|node|存储|
|node_load1|node|负载1m|
|node_load5|node|负载5m|
|node_load5|node|负载15m|
|node_memory_MemTotal|node|节点内存total|
|node_memory_MemFree|node|节点内存free|
|node_uname_info|node|节点信息|

#### Rainbond服务组件监控项

| 监控项     | 所属组件        |说明                     |
| :------- | :-----------|:----------------------- |
| acp_mq_dequeue_number | rbd-mq |  |
| acp_mq_enqueue_number | rbd-mq |  |
| acp_mq_exporter_health_status| rbd-mq||
| acp_mq_exporter_last_scrape_error| rbd-mq||
| acp_mq_exporter_scrapes_total| rbd-mq|
| builder_exporter_builder_task_error| rbd-chaos| |源码构建任务失败数|
| builder_exporter_builder_task_number| rbd-chaos| |源码构建任务数|
| builder_exporter_health_status| rbd-chaos|1|chaos组件状态1为健康|
| event_log_exporter_chan_cache_size| rbd-eventlog||
| event_log_exporter_collector_duration_seconds|rbd-eventlog||
| event_log_exporter_container_log_store_cache_barrel_count |rbd-eventlog||
| event_log_exporter_container_log_store_log_count|rbd-eventlog||
| event_log_exporter_event_store_barrel_count|rbd-eventlog||
| event_log_exporter_event_store_cache_barrel_count|rbd-eventlog||
| event_log_exporter_event_store_log_count |rbd-eventlog||
| event_log_exporter_health_status |rbd-eventlog||
| event_log_exporter_last_scrape_error |rbd-eventlog||
| event_log_exporter_monitor_store_barrel_count |rbd-eventlog||
| event_log_exporter_monitor_store_log_count |rbd-eventlog||
| event_log_exporter_scrapes_total |rbd-eventlog||
| gateway_request_duration_seconds_bucket|rbd-gateway|在规定请求时间(bucket)内, 客户端请求的数量|
| gateway_request_duration_seconds_count |rbd-gateway|客户端请求的总数|
| gateway_request_duration_seconds_sum |rbd-gateway|客户端请求时间的总数|
| gateway_request_size_bucket |rbd-gateway|在规定出请求大小(bucket)内, 满足条件的请求的数量|
| gateway_request_size_count |rbd-gateway|客户端请求的总数|
| gateway_request_size_sum |rbd-gateway|客户端请求大小的总数|
| gateway_requests|rbd-gateway|客户端访问的次数|
| gateway_response_duration_seconds_bucket|rbd-gateway|在规定响应时间(bucket)内, 响应的次数|
| gateway_response_duration_seconds_count |rbd-gateway|响应的总次数|
| gateway_response_duration_seconds_sum |rbd-gateway|响应的总时间|
| gateway_response_size_bucket |rbd-gateway|在规定出响应大小(bucket)内, 满足条件的响应的次数|
| gateway_response_size_count |rbd-gateway|响应的总次数|
| gateway_response_size_sum |rbd-gateway|响应的总大小|
| gateway_upstream_latency_seconds |rbd-gateway|在规定出延迟时间(bucket)内, 满足条件的延迟的次数|
| gateway_upstream_latency_seconds_count |rbd-gateway|延迟的总次数|
| gateway_upstream_latency_seconds_sum |rbd-gateway|延迟时间的总和|
| worker_exporter_health_status |rbd-worker||
| worker_exporter_worker_task_number |rbd-worker||
| worker_exporter_collector_duration_seconds |rbd-worker||
| worker_exporter_last_scrape_error |rbd-worker||
| worker_exporter_scrapes_total |rbd-worker||
| worker_exporter_worker_task_error |rbd-worker||
| worker_exporter_worker_task_number |rbd-worker||
| worker_up |rbd-worker||
| scrape_samples_scraped|||
| scrape_samples_post_metric_relabeling|||
| scrape_duration_seconds |||
| statsd_exporter_build_info |||
| statsd_exporter_events_total|||
| statsd_exporter_lines_total |||
| statsd_exporter_loaded_mappings|||
| statsd_exporter_samples_total|||
| statsd_exporter_tag_errors_total|||
| statsd_exporter_tags_total|||
| statsd_exporter_tcp_connection_errors_total|||
| statsd_exporter_tcp_connections_total|||
| statsd_exporter_tcp_too_long_lines_total|||
| statsd_exporter_udp_packets_total|||
| up||组件状态|



#### 应用级监控项
| 监控项            |说明                     |
| :-------  |:----------------------- |
| app_resource_appmemory|应用内存，根据service_id,tenant_id筛选|
| app_resource_appfs |应用|
| app_resource_appmemory |应用|
| app_client_request|应用|
| app_client_requesttime|应用|
| app_request|应用|
| app_request_unusual|应用|
| app_requestclient|应用|
| app_requesttime|应用|

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

#### 其他监控项

| 监控项     | 说明                    |
| :------- | :----------------------- |
| process_cpu_seconds_total||
| process_max_fds||
| process_open_fds||
| process_virtual_memory_bytes||
| process_start_time_seconds||
| process_resident_memory_bytes||
| process_open_fds||
| process_max_fds||
| process_cpu_seconds_total||

### 报警规则说明

#### 组件监控报警

| 报警项     | 报警信息                   |
| :------- | :----------------------- |
| 源码构建异常任务数大于30|BuilderTaskError|
| chaos组件状态异常|BuilderUnhealthy|
| eventlog服务下线|EventLogDown|
| eventlog组件状态异常|EventLogUnhealthy|
| api服务下线|APIDown|
| mq消息队列中存在时间大于1分钟的任务|MqMessageQueueBlock|
| mq组件状态异常|MqUnhealthy|
| mq队列数大于200|TeamTaskMany|
| webcli组件状态异常|WebcliUnhealthy|
| worker执行任务错误数大于50|WorkerUnhealthy|
| monitor服务下线|monitoring_service_down|


#### 集群监控报警


| 报警项     | 报警信息                   |
| :------- | :----------------------- |
| 节点CPU使用率高于70|high_cpu_usage_on_node|
| 节点5分钟内负载大于5|high_la_usage_on_node|
| 节点内存使用率大于80|high_memory_usage_on_node|
| 节点根分区磁盘使用率大于80|node_running_out_of_disk_space|
| 集群内存资源低于2G|InsufficientClusteMemoryResources|
| 集群CPU使用量低于500m|InsufficientClusteCPUResources|
| 租户使用资源超出资源限额|InsufficientTenantResources|
