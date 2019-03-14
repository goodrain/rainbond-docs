---
title: rbd-mq
summary: 数据中心消息中间件服务
toc: true

---

## 1. 概要

rbd-mq基于etcd实现的分布式一致性的消息中间件服务。

## 2. 启动参数

```
Usage of /run/rainbond-mq:
      --api-port int                 the api server listen port (default 6300)
      --etcd-endpoints stringSlice   etcd v3 cluster endpoints. (default [http://127.0.0.1:2379])
      --etcd-prefix string           the etcd data save key prefix  (default "/mq")
      --etcd-timeout int             etcd http timeout seconds (default 5)
      --hostIP string                Current node Intranet IP
      --hostName string              Current node host name
      --log-level string             the entrance log level (default "info")
      --metric string                prometheus metrics path (default "/metrics")
      --mode string                  the api server run mode grpc or http (default "grpc")
```


### 环境变量

|   环境变量名称   |  默认值    |   说明   |
| ---- | ---- | ---- |

