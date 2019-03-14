---
CUR_NETtitle: rbd-api
summary: 数据中心api服务
toc: true
---

## 1. 概要

rbd-api组件提供无状态的数据中心Restful-API 服务和Websocket代理服务。数据存储依赖Mysql或者[CockroachDB](http://jandan.net/2014/07/23/cockroach-db.html)数据库。后端自动发现和负载均衡代理rbd-entrance，rbd-monitor等服务提供的API。当前组件完成用户对应用的一系列操作逻辑的处理。

## 2. 启动参数

```
Usage of /run/rainbond-api:
      --api-addr string             the api server listen address (default ":8888")
      --api-addr-ssl string         the api server listen address (default ":8443")
      --api-ssl-certfile string     api ssl cert file
      --api-ssl-enable              whether to enable websocket  SSL
      --api-ssl-keyfile string      api ssl cert file
      --builder-api stringSlice     the builder api (default [127.0.0.1:3228])
      --client-ca-file string       api ssl ca file
      --db-type string              db type mysql or etcd (default "mysql")
      --debug                       open debug will enable pprof
      --entrance-api stringSlice    the entrance api (default [127.0.0.1:6200])
      --etcd stringSlice            etcd server or proxy address (default [http://127.0.0.1:2379])
      --event-servers stringSlice   event log server address. simple lb (default [127.0.0.1:6367])
      --kube-config string          kubernetes api server config file (default "/etc/goodrain/kubernetes/admin.kubeconfig")
      --log-level string            the entrance log level (default "info")
      --logger-file string          request log file path (default "/logs/request.log")
      --mq-api string               acp_mq api (default "127.0.0.1:6300")
      --mysql string                mysql db connection info (default "admin:admin@tcp(127.0.0.1:3306)/region")
      --node-api stringSlice        the node server api (default [127.0.0.1:6100])
      --opentsdb string             opentsdb server config (default "127.0.0.1:4242")
      --region-tag string           region tag setting (default "test-ali")
      --start                       Whether to start region old api
      --v1-api string               the region v1 api (default "127.0.0.1:8887")
      --ws-addr string              the websocket server listen address (default ":6060")
      --ws-ssl-certfile string      websocket and fileserver ssl cert file (default "/etc/ssl/goodrain.com/goodrain.com.crt")
      --ws-ssl-enable               whether to enable websocket  SSL
      --ws-ssl-keyfile string       websocket and fileserver ssl key file (default "/etc/ssl/goodrain.com/goodrain.com.key")
```



### 环境变量

| 环境变量名称      | 默认值             | 说明                             |
| ----------------- | ------------------ | -------------------------------- |
| RUNNER_IMAGE_NAME | goodrain.me/runner | 源码应用运行环境镜像名称         |
| EX_DOMAIN         | 《自动生成》       | http协议应用默认域名             |
| CUR_NET           | calico             | 网络模式，可选值：calico midonet |

