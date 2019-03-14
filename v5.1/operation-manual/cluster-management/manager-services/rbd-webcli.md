---
title: rbd-webcli
summary: 数据中心容器web终端服务
toc: true

---

## 1. 概要

基于websockt实现应用容器Web终端服务

## 2. 启动参数

```
Usage of /usr/bin/rainbond-webcli:
      --address string               server listen address (default "0.0.0.0")
      --etcd-endpoints stringSlice   etcd v3 cluster endpoints. (default [http://127.0.0.1:2379])
      --hostIP string                Current node Intranet IP
      --hostName string              Current node host name
      --log-level string             the entrance log level (default "info")
      --metric string                prometheus metrics path (default "/metrics")
      --port int                     server listen port (default 7171)
```


### 环境变量

|   环境变量名称   |  默认值    |   说明   |
| ---- | ---- | ---- |

