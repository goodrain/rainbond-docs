---
title: rbd-entrance
summary: 数据中心entrance服务
toc: true

---

## 1. 概要

rbd-entrance组件负责处理应用外网访问（Gateway）负载均衡设置。entrance组件中处理几类抽象模型：`Pool` `VirtualService` `Node`  `Rule` `Domain` `Certificate` ，使用以上模型描述每一个服务的gateway配置，插件式对接不同的Gateway实现。开源版本中支持 [openrestry-lb](https://github.com/goodrain/lb-openresty)

## 2. 启动参数

```
Usage of /run/rainbond-entrance:
      --api-addr string              the api server listen address (default ":6200")
      --bind-ip string               register ip to etcd, with bind-port (default "127.0.0.1")
      --bind-port int                register port to etcd, need bind-ip (default 6200)
      --cluster-name string          the instance name in cluster
      --debug                        if debug true will open pprof
      --etcd-endpoints stringSlice   etcd cluster endpoints. (default [http://127.0.0.1:2379])
      --etcd-prefix string           the etcd data save key prefix  (default "/entrance")
      --etcd-timeout int             etcd http timeout seconds (default 5)
      --event-servers stringSlice    event message server address. (default [http://127.0.0.1:6363])
      --hostIP string                Current node Intranet IP
      --hostName string              Current node host name
      --kube-conf string             absolute path to the kubeconfig file (default "./kubeconfig")
      --log-level string             the entrance log level (default "info")
      --metric string                prometheus metrics path (default "/metrics")
      --nginx-http stringSlice       Nginx lb http api.
      --nginx-stream stringSlice     Nginx stream api.
      --plugin-name string           default lb plugin to be used. (default "zeus")
      --plugin-opts stringSlice      default lb plugin options.
      --run-mode string              the entrance run mode,could be 'default' or 'sync' (default "default")
      --token string                 zeus api token
      --ttl int                      register keepalive time (default 30)
```



### 环境变量

| 环境变量名称       | 默认值 | 说明                          |
| ------------------ | ------ | ----------------------------- |
| DEFAULT_HTTPS_PORT | 443    | https协议应用负载均衡监听端口 |
| DEFAULT_HTTP_PORT  | 80     | http协议应用负载均衡监听端口  |

