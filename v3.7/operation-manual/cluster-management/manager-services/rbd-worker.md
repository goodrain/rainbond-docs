---
title: rbd-worker
summary: 数据中心worker服务
toc: true

---

## 1. 概要

rbd-worker组件负责操作kubenetes服务，将Rainbond应用抽象转化成Kubernetes的抽象资源，提供滚动升级，水平伸缩等不同的应用部署控制流程。为应用运行设置应用运行时全套的环境需求。

## 2. 启动参数

```
Usage of /run/rainbond-worker:
      --db-type string               db type mysql or etcd (default "mysql")
      --etcd-endpoints stringSlice   etcd v3 cluster endpoints. (default [http://127.0.0.1:2379])
      --etcd-prefix string           the etcd data save key prefix  (default "/store")
      --etcd-timeout int             etcd http timeout seconds (default 5)
      --event-servers stringSlice    event log server address. simple lb (default [127.0.0.1:6367])
      --host-ip string               the ip of this worker,it must be global connected ip
      --kube-config string           kubernetes api server config file (default "/etc/goodrain/kubernetes/admin.kubeconfig")
      --listen string                prometheus listen host and port (default ":6369")
      --log-level string             the entrance log level (default "info")
      --max-tasks int                the max tasks for per node (default 50)
      --metric string                prometheus metrics path (default "/metrics")
      --mq-api string                acp_mq api (default "127.0.0.1:6300")
      --mysql string                 mysql db connection info (default "root:admin@tcp(127.0.0.1:3306)/region")
      --node-api string              node discover api, node docker endpoints (default "http://172.30.42.1:6100")
      --node-name string             the name of this worker,it must be global unique name
      --run string                   sync data when worker start (default "sync")
```


### 环境变量

|   环境变量名称   |  默认值    |   说明   |
| ---- | ---- | ---- |
|   CUR_NET   |   calico   |   网络模式   |
| RUNNER_IMAGE_NAME            | goodrain.me/runner  | 源码类应用运行环境镜像名       |

