---
title: 系统服务部署参数说明
summary: 系统服务部署参数说明
toc: true
---

## 一、 概述

本文介绍Rainbond自研组件的主要可配置参数，并以一个实际的例子说明如何自定义一个组件的特性后使之生效。
Rainbond各组件的配置文件存放于 `/opt/rainbond/conf` 目录下，配置文件格式为 `yaml`。

## 二、 rbd-api

```bash
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd=${ETCD_ENDPOINTS}
    #指定api监听地址，该地址使用https协议
    --api-addr-ssl=10.10.10.19:8443
    #指定api监听地址，该地址使用http协议
    --api-addr=10.10.10.19:8888
    #指定日志级别
    --log-level=debug
    #指定集群数据库连接信息
    --mysql="write:AX5Oan8I@tcp(10.10.10.19:3306)/region"
    #开启websocket协议的SSL，即wss
    --api-ssl-enable=true
    #以下三项指定了ssl证书路径
    --api-ssl-certfile=/etc/goodrain/region.goodrain.me/ssl/server.pem
    --api-ssl-keyfile=/etc/goodrain/region.goodrain.me/ssl/server.key.pem
    --client-ca-file=/etc/goodrain/region.goodrain.me/ssl/ca.pem
```

## 三、 rbd-chaos

```bash
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
    #当前节点的内网IP地址
    --hostIP=10.10.10.19
    #指定日志级别
    --log-level=debug
    #指定集群数据库连接信息
    --mysql="write:AX5Oan8I@tcp(10.10.10.19:3306)/region"
```

## 四、 rbd-mq

```bash
    #指定日志级别
    --log-level=debug
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
    #当前节点的内网IP地址
    --hostIP=10.10.10.19
```

## 五、 rbd-webcli

```bash
    #当前节点的内网IP地址
    --hostIP=10.10.10.19
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
```

## 六、 rbd-worker

```bash
    #指定日志级别
    --log-level=info
    #当前节点的内网IP地址
    --host-ip=10.10.10.19
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
    #指定当前节点主机名
    --node-name=node1
    #指定kubernetes集群配置文件路径
    --kube-config="/etc/goodrain/kubernetes/admin.kubeconfig"
    #指定集群数据库连接信息
    --mysql="write:AX5Oan8I@tcp(10.10.10.19:3306)/region"
```

## 七、 rbd-monitor

```bash
    #指定集群etcd地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
    #指定服务监听地址
    --advertise-addr=10.10.10.19:9999
    #为UI API指定的监听地址
    --web.listen-address=0.0.0.0:9999
    #配置文件路径
    --config.file=/etc/prometheus/prometheus.yml
    #指定数据存储路径
    --storage.tsdb.path=/prometheusdata
    #不在数据存储目录中创建文件锁
    --storage.tsdb.no-lockfile
    #指定采样存储时间
    --storage.tsdb.retention=7d
    #指定日志级别
    --log.level=info
```

## 八、rbd-eventlog

```bash
    #集群通信监听IP
    --cluster.bind.ip=10.10.10.19
    #集群中的当前实例IP
    --cluster.instance.ip=10.10.10.19
    #指定数据库类型
    --db.type=mysql
    #数据库连接信息
    --db.url="write:AX5Oan8I@tcp(10.10.10.19:3306)/region"
    #设置集群中用于消息自动发现的所有etcd服务器地址
    --discover.etcd.addr=${ETCD_ENDPOINTS}
    #收集日志服务监听的IP
    --eventlog.bind.ip=10.10.10.19
    #用于推送事件消息的websocket绑定ip
    --websocket.bind.ip=10.10.10.19
```

## 九、rbd-gateway

```bash
    # kubernetes 集群配置文件路径
    --kube-conf="/etc/goodrain/kubernetes/admin.kubeconfig"
    # etcd 地址，当前使用默认集群地址，可更改为指定的地址,格式为 http://ETCD1:2379,http://ETCD2:2379,http://ETCD3:2379
    --etcd-endpoints=${ETCD_ENDPOINTS}
    # etcd 连接超时时间, 单位'秒'
    --etcd-timeout=5
    # Gateway 健康检查端口
    --healthz-port=10254
    # Gateway 健康检查URI
    --health-path="/healthz"
    # Gateway 健康检查超时时间, 单位'秒'
    --health-check-timeout=10
    # 是否开启 Rainbond 的默认服务
    --enable-rbd-endpoints=true
    # Rainbond 默认服务在 ETCD 中的Key
    --rbd-endpoints=/rainbond/endpoint/
    # Rainbond 默认服务绑定的 IP
    --rbdsrv-internal-ip=0.0.0.0
    # Nginx 中 worker 的数量, 默认获取当前节点 CPU 的核心数, 最多应为节点上的 CPU 核心数。
    --worker-processes=0
    # Nginx 中每个 worker 的最大连接数
    --worker-connections=4000
    # Nginx可用的文件描述符数
    --worker-rlimit-nofile=200000
    # 让每个线程可以处理更多的 client. 只能在 Linux 上使用
    --enable-epool=true
    # 在nginx获得有关新连接的通知后，接受尽可能多的连接
    --enable-multi-accept=true
    # 只打印 critical 级别的日志
    --error-log=/dev/stderr crit
    # nginx 的用户和组
    --nginx-user=root
    # 客户端可以通过 keep-alive 连接发出的请求数
    --keepalive-requests=10000
    # 保持连接的超时. 服务器将在此时间后关闭连接
    --keepalive-timeout=30
    # 开启对 rbd-gateway 指标的收集
    --enable-metrics=true
    # 日志级别
    --log.level=info
```

## 十、 查看一个组件的所有配置项

当你希望获取某个组件的所有可配置信息的时候，下面的方法可以帮助你实现目的：

以 `rbd-eventlog` 组件为例，当你处在一个部署了该组件的管理节点时，执行如下操作：

```bash
#进入组件容器环境
din rbd-eventlog
#查询该组件使用二进制命令
ps -ef
#获取帮助信息
/run/rainbond-eventlog -h
```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/get-all-para.png" width="100%"  />

## 十一、 修改配置后如何生效

当你修改了配置文件，执行以下操作可以使变更生效：

以 `rbd-eventlog` 组件为例，当配置文件修改保存后：

```bash
#重启node服务，更新配置
systemctl restart node
#重启rbd-eventlog服务，使之生效
systemctl restart rbd-eventlog
```

> 在后续的迭代中，会优化这一过程，使之更加简便快捷