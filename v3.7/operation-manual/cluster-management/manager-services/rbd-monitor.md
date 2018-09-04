---
title: rbd-monitor
summary: 数据中心操作监控与报警服务
toc: true

---

## 1. 概要

rbd-monitor负责处理集群节点、服务、容器的监控和报警。

## 2. 启动参数

```
Usage of /run/rainbond-monitor:
      --advertise-addr string                             advertise address, and registry into etcd. (default "manage01:9999")
      --alertmanager-address stringSlice                  AlertManager url.
      --alertmanager.notification-queue-capacity string   The capacity of the queue for pending Alertmanager notifications. (default "10000")
      --alertmanager.timeout string                       Timeout for sending alerts to Alertmanager. (default "10s")
      --config.file string                                Prometheus configuration file path. (default "/etc/prometheus/prometheus.yml")
      --etcd-endpoints string                             etcd endpoints list. (default "http://127.0.0.1:2379")
      --log.level string                                  log level. (default "info")
      --query.lookback-delta string                       The delta difference allowed for retrieving metrics during expression evaluations. (default "5m")
      --query.max-concurrency string                      Maximum number of queries executed concurrently. (default "20")
      --query.timeout string                              Maximum time a query may take before being aborted. (default "2m")
      --rules-config.file string                          Prometheus alerting rules config file path. (default "/etc/prometheus/rules.yml")
      --storage.remote.flush-deadline string              How long to wait flushing sample on shutdown or config reload. (default "1m")
      --storage.tsdb.max-block-duration string            Maximum duration compacted blocks may span. For use in testing. (Defaults to 10% of the retention period).
      --storage.tsdb.min-block-duration string            Minimum duration of a data block before being persisted. For use in testing. (default "2h")
      --storage.tsdb.no-lockfile                          Do not create lockfile in data directory.
      --storage.tsdb.path string                          Base path for metrics storage. (default "/prometheusdata")
      --storage.tsdb.retention string                     How long to retain samples in storage. (default "7d")
      --web.console.libraries string                      Path to the console library directory. (default "console_libraries")
      --web.console.templates string                      Path to the console template directory, available at /consoles. (default "consoles")
      --web.enable-admin-api                              Enable API endpoints for admin control actions.
      --web.enable-lifecycle                              Enable shutdown and reload via HTTP request.
      --web.external-url string                           The URL under which Prometheus is externally reachable (for example, if Prometheus is served via a reverse proxy). Used for generating relative and absolute links back to Prometheus itself. If the URL has a path portion, it will be used to prefix all HTTP endpoints served by Prometheus. If omitted, relevant URL components will be derived automatically.
      --web.listen-address string                         Address to listen on for UI, API, and telemetry. (default "0.0.0.0:9999")
      --web.max-connections int                           Maximum number of simultaneous connections. (default 512)
      --web.read-timeout string                           Maximum duration before timing out read of the request, and closing idle connections. (default "5m")
      --web.route-prefix string                           Prefix for the internal routes of Web endpoints. Defaults to path of --Web.external-url.
      --web.user-assets string                            Path to static asset directory, available at /user.
```


### 环境变量

|   环境变量名称   |  默认值    |   说明   |
| ---- | ---- | ---- |

