---
title: rbd-chaos
summary: 数据中心应用构建和发布服务
toc: true

---

## 1. 概要

rbd-chaos 组件负责完成应用安装持续构建，应用分享发布，应用导入导出

## 2. 启动参数

```
Usage of /run/rainbond-chaos:
      --api-port int                 the port for api server (default 3228)
      --db-type string               db type mysql or etcd (default "mysql")
      --dockerd string               dockerd endpoint (default "127.0.0.1:2376")
      --etcd-endpoints stringSlice   etcd v3 cluster endpoints. (default [http://127.0.0.1:2379])
      --etcd-prefix string           the etcd data save key prefix  (default "/store")
      --etcd-timeout int             etcd http timeout seconds (default 5)
      --event-servers stringSlice    event log server address. simple lb (default [127.0.0.1:6367])
      --hostIP string                Current node Intranet IP
      --kube-config string           kubernetes api server config file (default "/etc/goodrain/kubernetes/admin.kubeconfig")
      --log-level string             the entrance log level (default "info")
      --max-tasks int                the max tasks for per node (default 50)
      --metric string                prometheus metrics path (default "/metrics")
      --mq-api string                acp_mq api (default "127.0.0.1:6300")
      --mysql string                 mysql db connection info (default "root:admin@tcp(127.0.0.1:3306)/region")
      --run string                   sync data when worker start (default "sync")
```



### 环境变量

| 环境变量名称                 | 默认值              | 说明                           |
| ---------------------------- | ------------------- | ------------------------------ |
| BUILD_IMAGE_REPOSTORY_DOMAIN | goodrain.me         | 数据中心内部镜像仓库访问域名   |
| BUILD_IMAGE_REPOSTORY_USER   |                     | 数据中心内部镜像仓库访问用户名 |
| BUILD_IMAGE_REPOSTORY_PASS   |                     | 数据中心内部镜像仓库访问密码   |
| RUNNER_IMAGE_NAME            | goodrain.me/runner  | 源码类应用运行环境镜像名       |
| BUILDER_IMAGE_NAME           | goodrain.me/builder | 源码类应用构建环境镜像名       |

