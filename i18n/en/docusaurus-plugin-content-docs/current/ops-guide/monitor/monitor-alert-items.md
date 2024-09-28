---
title: Description of monitoring alarm items
description: Description of cluster monitoring alarm items based on Prometheus
---

### General description

Rainbond monitoring services are performed by component `rbd-monitor`, integrated with Sideecar design mode ideas in the monitor component with [Prometheus](https://prometheus.io/) services, and based on ETCD's dynamic discovery of targets for monitoring, automatic configuration and management of Prometheus services.The monitor periodically scratches indicator data at each targets and perpetuates the data locally, providing flexible Promised Query queries and RESTful API queries.

#### Architecture：

<img src="https://static.goodrain.com/images/docs/3.7/monitor/monitor-structure.jpg" title="monitor服务架构图" width="100%" />

#### Access Method

Default listener port 9999. The default installation has been added to the Service object. Access by adding a third-party service to the platform to open an external port.

Get `ServiceIP`

```bash
$ kubectl get service rbd-monitor - n rbd-system
NAME TYPE CLUSTEER-IP EXTERNAL-IP PORT(S) AGE
rbd-monitor ClusterIP 10.68.140.5   <none>        999/TCP 7h11m
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/monitorservice.jpg" title="添加第三方服务打开对外端口访问" width="100%" />

For specific monitoring alarms please visit the rbd-monitor for review and see below for reference purposes only.

### Monitor Items

#### Node Resource Monitor

| Monitor Items                                                   | Owned Component | Note                     |
| :-------------------------------------------------------------- | :-------------- | :----------------------- |
| cadvisor_version_info | cadvisor        | Node system information  |
| machine_memory_bytes  | cadvisor        | Current host memory size |
| machine_cpu_core      | cadvisor        | Number of current peers  |
| node_filesystem_size  | node            | Storage                  |
| node_load1                                 | node            | Load 1m                  |
| node_load5                                 | node            | Load 5m                  |
| node_load5                                 | node            | Load 15m                 |
| node_memory_MemTotal  | node            | Total node memory        |
| node_memory_MemFree   | node            | Node memory free         |
| node_uname_info       | node            | Node Information         |

#### Rainbod service component monitoring item

| Monitor Items                                                                                                                                                                                                                     | Owned Component | Note                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------- |
| acp_mq_dequeue_number                                                                                                                                              | rbd-mq          |                                                                                                                 |
| acp_mq_enqueue_number                                                                                                                                              | rbd-mq          |                                                                                                                 |
| acp_mq_exporter_health_status                                                                                                                 | rbd-mq          |                                                                                                                 |
| acp_mq_exporter_last_scrape_error                                                                                        | rbd-mq          |                                                                                                                 |
| acp_mq_exporter_scrapes_total                                                                                                                 | rbd-mq          |                                                                                                                 |
| builder_exporter_builder_task_error                                                                                                           | rbd-chaos       | Failed to build source                                                                                          |
| builder_exporter_builder_task_number                                                                                                          | rbd-chaos       | Number of source build tasks                                                                                    |
| builder_exporter_health_status                                                                                                                                     | rbd-chaos       | Component State 1 is health                                                                                     |
| event_log_exporter_chan_size                                                                                                                  | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_collector_duration_seconds                                                                            | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_container_log_store_cache_barrel_count | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_container_log_store_login                                                        | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_event_store_barrel_count                                                         | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_event_store_cache_barrel_count                              | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_event_store_log_count                                                            | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_health_status                                                                                                              | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_last_scrape_error                                                                                     | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_monitor_store_barrel_count                                                       | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_monitor_store_count                                                                                   | rbd-eventlog    |                                                                                                                 |
| event_log_exporter_scrapes_total                                                                                                              | rbd-eventlog    |                                                                                                                 |
| gateway_request_duration_seconds_bucket                                                                                                       | rbd-gateway     | Number of client requests within specified request time (bucket)                             |
| gateway_request_duration_seconds_count                                                                                                        | rbd-gateway     | Total number of client requests                                                                                 |
| gateway_request_duration_seconds_sum                                                                                                          | rbd-gateway     | Total Client Request Time                                                                                       |
| gateway_request_size_bucket                                                                                                                                        | rbd-gateway     | The number of requests that have been met within the specified request size (bucket)         |
| gateway_request_size_count                                                                                                                                         | rbd-gateway     | Total number of client requests                                                                                 |
| gateway_request_size_sum                                                                                                                                           | rbd-gateway     | Total number of client requests                                                                                 |
| gateway_requests                                                                                                                                                                                             | rbd-gateway     | Number of visits by clients                                                                                     |
| gateway_response_duration_seconds_bucket                                                                                                      | rbd-gateway     | The number of responses within the specified response time (bucket)                          |
| gateway_response_duration_seconds_count                                                                                                       | rbd-gateway     | Total Response                                                                                                  |
| gateway_response_duration_seconds_sum                                                                                                         | rbd-gateway     | Total time of response                                                                                          |
| gateway_response_size_bucket                                                                                                                                       | rbd-gateway     | The number of responses that meet the conditions within the specified response size (bucket) |
| gateway_response_size_count                                                                                                                                        | rbd-gateway     | Total Response                                                                                                  |
| gateway_response_size_sum                                                                                                                                          | rbd-gateway     | Total size of response                                                                                          |
| gateway_upstream_late_seconds                                                                                                                                      | rbd-gateway     | Within the specified delay (bucket), the number of times the delay in meeting the condition  |
| gateway_upstream_late_seconds_count                                                                                                           | rbd-gateway     | Total Delays                                                                                                    |
| gateway_upstream_late_seconds_sum                                                                                                             | rbd-gateway     | Sum of delay time                                                                                               |
| Worker_exporter_health_status                                                                                                                                      | rbd-walker      |                                                                                                                 |
| worker_exporter_worker_task_number                                                                                                            | rbd-walker      |                                                                                                                 |
| worker_exporter_collector_duration_seconds                                                                                                    | rbd-walker      |                                                                                                                 |
| worker_exporter_last_scrape_error                                                                                                             | rbd-walker      |                                                                                                                 |
| worker_exporter_scrapes_total                                                                                                                                      | rbd-walker      |                                                                                                                 |
| worker_exporter_worker_task_error                                                                                                             | rbd-walker      |                                                                                                                 |
| worker_exporter_worker_task_number                                                                                                            | rbd-walker      |                                                                                                                 |
| worker_up                                                                                                                                                                                                    | rbd-walker      |                                                                                                                 |
| scrap_samples_scraped                                                                                                                                                                   |                 |                                                                                                                 |
| scrape_samples_post_metric_relabeling                                                                                                         |                 |                                                                                                                 |
| scrape_duration_seconds                                                                                                                                                                 |                 |                                                                                                                 |
| statsd_exporter_build_info                                                                                                                                         |                 |                                                                                                                 |
| statsd_exporter_events_total                                                                                                                                       |                 |                                                                                                                 |
| statsd_exporter_links                                                                                                                                                                   |                 |                                                                                                                 |
| statsd_exporter_loaded_mappings                                                                                                                                    |                 |                                                                                                                 |
| statsd_exporter_samples_total                                                                                                                                      |                 |                                                                                                                 |
| statsd_exporter_tag_errors_total                                                                                                              |                 |                                                                                                                 |
| statsd_exporter_tags                                                                                                                                                                    |                 |                                                                                                                 |
| statsd_exporter_tcp_connection_errors_total                                                                              |                 |                                                                                                                 |
| statsd_exporter_tcp_connections_total                                                                                                         |                 |                                                                                                                 |
| statsd_exporter_tcp_too_long_lines_total                                                            |                 |                                                                                                                 |
| statsd_exporter_udp_packs_total                                                                                                               |                 |                                                                                                                 |
| up                                                                                                                                                                                                                                |                 | Component Status                                                                                                |

#### App level monitoring

| Monitor Items                                                     | Note                                                                                   |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| app_resource_app memory | Apply memory, filter by service_id,tenant_id |
| app_resources_appfs     | Apps                                                                                   |
| app_resource_app memory | Apps                                                                                   |
| app_client_request      | Apps                                                                                   |
| app_client_requesttime  | Apps                                                                                   |
| app_request                                  | Apps                                                                                   |
| app_request_unusual     | Apps                                                                                   |
| App_request customer                         | Apps                                                                                   |
| App_requesttime                              | Apps                                                                                   |

Application levels are based on CAvisor for typical monitoring indicators

| Monitor Items                                                                                                              | Type  | Note                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------- | :---- | :--------------------------------------------------------------------------------------- |
| container_cpu_load_average_10s         | gague | Average load of the last 10 seconds container CPU                                        |
| container_cpu_usage_seconds_total      | count | Cumulative time of container on each CPU kernel (in：seconds)          |
| container_cpu_system_total                                  | count | System CPU cumulative time (in：seconds)                               |
| container_cpu_user_seconds_total       | count | User CPU cumulative time (in：seconds)                                 |
| container_fs_usage_bytes                                    | gague | Use of filesystem in container (unit：bytes)                           |
| container_fs_limit_bytes                                    | gague | Total number of filesystems that containers can use (unit：bytes)      |
| container_fs_reads_bytes_total         | count | Total amount of accumulated data read by container (unit：bytes)       |
| container_fs_writes_bytes_total        | count | Total amount of accumulated container written to data (unit：bytes)    |
| container_memory_max_usage_bytes       | gague | Maximum memory usage of containers (unit：bytes)                       |
| container_memory_usage_bytes                                | gague | Current memory usage of the container (unit：bytes                     |
| container_spec_memory_limit_bytes      | gague | Memory usage limit for containers                                                        |
| container_network_receive_bytes_total  | count | Total cumulative data received by the container network (unit：bytes)  |
| container_network_transfer_bytes_total | count | Total cumulative transfer data for the container network (unit：bytes) |

#### Other monitoring items

| Monitor Items                                                                                | Note |
| :------------------------------------------------------------------------------------------- | :--- |
| process_cpu_seconds_total     |      |
| process_max_fds                                    |      |
| process_open_fds                                   |      |
| process_virtual_memory_bytes  |      |
| process_start_time_seconds    |      |
| process_resident_memory_bytes |      |
| process_open_fds                                   |      |
| process_max_fds                                    |      |
| process_cpu_seconds_total     |      |

### Alarm Rule Description

#### Component monitor alarm

| Alarm items                                                           | Alarm Info                      |
| :-------------------------------------------------------------------- | :------------------------------ |
| api service offline                                                   | APIDown                         |
| chaos service offline                                                 | BuilderDown                     |
| chaos component state exception                                       | Builder Unhealth                |
| The source constructor is more than 30 permanent                      | BuilderTaskError                |
| ETCD service offline                                                  | EtcdDown                        |
| ETCD Leader Node offline                                              | EtcdLoseLeader                  |
| ETCD cluster member exception                                         | Insufficient Members            |
| ETCD cluster leader changes                                           | HighNumberOfLeaderChanges       |
| ETCD GPRC failed request greater than 0.05            | HighNumberOfFailedGRPCRequests  |
| ETCD 1 minute HTTP request failed more than 0.05      | HighNumberOfFailedHTTP Requests |
| ETCD Slow Query in 1 minute is greater than 0.15      | GRPCRequestsSlow                |
| ETCD disk space takes more than 80%                                   | DatabaseSpaceExcelled           |
| eventlog component state exception                                    | EventLogUnhealth                |
| eventlog service offline                                              | EventLogDown                    |
| gateway service offline                                               | GatewayDown                     |
| gateway request size greater than 10M                                 | Request SizeToMuch              |
| gateway requests more than 200 per second                             | RequestMany                     |
| The number of error requests in gateway 10 s is greater than 5        | FailureRequestMany              |
| mq service offline                                                    | MqDown                          |
| mq-component state exception                                          | MqUnhealth                      |
| Mq Message queue has tasks with a time greater than 1 minute          | MqMessageQueuBlock              |
| webclient service offline                                             | WebcliDown                      |
| Web clip state exception                                              | WebcliUnhealth                  |
| Error executing command in webclip is greater than 5 times per second | WebcliUnhealth                  |
| Worker service offline                                                | WorkerDown                      |
| Worker component state exception                                      | WorkerUnhealth                  |
| Worker performed job errors greater than 50                           | WorkerTaskError                 |

#### Cluster monitor alarm

| Alarm items                                                   | Alarm Info                            |
| :------------------------------------------------------------ | :------------------------------------ |
| Rainbond cluster node node unhealthy                          | RbdNodeUnhealth                       |
| Unhealthy K8s cluster node node                               | KubeNodeUnhealth                      |
| Collect cluster information for more than 10 s                | ClusterCollectorTimeout               |
| Tenants use resources above resource limit                    | InsufficientTenantResources           |
| Node offline                                                  | NodeDown                              |
| CPU usage is greater than 70% in 5 minutes                    | HighCpuUsageOnNode                    |
| Cluster available memory resources are less than 2 GB         | Insufficient Cluster Memory Resources |
| Cluster CPU availability less than 500 m                      | InsufficientClusteCPUResources        |
| Node load is greater than 5 minutes                           | HighLoadOnNode                        |
| Remaining amount less than 0.3 for Node Inode | InodeFreerateLow                      |
| Node Root Root Use Rate is greater than 85%                   | HighRootDiskUsageOnNode               |
| Node Docker Disk Usage Rate greater than 85%                  | HighDockerdiskUsageOnNode             |
| Node memory usage is greater than 80%                         | HighMemory UsageOnNode                |

**Cluster monitoring alerts see [监控报警部署](./monitor-alert-employ/)**
