---
title: rbd-eventlog
summary: 数据中心操作事件和日志处理服务
toc: true

---

## 1. 概要

rbd-eventlog负责跟踪操作事件，处理应用、操作和监控日志信息。提供websockt服务实时推送日志信息。

## 2. 启动参数

```
Usage of /run/rainbond-eventlog:
      --cluster                                    Whether open cluster mode (default true)
      --cluster.bind.ip string                     Cluster communication to listen the IP (default "0.0.0.0")
      --cluster.bind.port int                      Cluster communication to listen the Port (default 6365)
      --cluster.instance.ip string                 The current instance IP in the cluster can be communications.
      --db.pool.maxsize int                        Data persistence db pool max size. (default 10)
      --db.pool.size int                           Data persistence db pool init size. (default 3)
      --db.type string                             Data persistence type. (default "mysql")
      --db.url string                              Data persistence db url. (default "root:admin@tcp(127.0.0.1:3306)/event")
      --discover.etcd.addr stringSlice             set all etcd server addr in cluster for message instence auto discover. (default [http://127.0.0.1:2379])
      --discover.etcd.homepath string              etcd home key (default "/event")
      --discover.etcd.pass string                  etcd server user password
      --discover.etcd.user string                  etcd server user info
      --discover.type string                       the instance in cluster auto discover way. (default "etcd")
      --docker.log.homepath string                 container log persistent home path (default "/grdata/logs/")
      --dockerlog.bind.ip string                   Collect the log service to listen the IP (default "0.0.0.0")
      --dockerlog.bind.port int                    Collect the log service to listen the Port (default 6362)
      --dockerlog.cache int                        the docker log server cache the receive message size (default 200)
      --dockerlog.mode string                      the server mode zmq or stream (default "stream")
      --dockermessage.cache.number int             Maintain log the largest number in the memory peer docker service (default 512)
      --eventlog.bind.ip string                    Collect the log service to listen the IP (default "0.0.0.0")
      --eventlog.bind.port int                     Collect the log service to listen the Port (default 6366)
      --eventlog.cache int                         the event log server cache the receive message size (default 100)
      --log.level string                           app log level (default "info")
      --log.path string                            app log output file path.it is effective when log.type=file (default "/var/log/")
      --log.type string                            app log output type. stdout or file  (default "stdout")
      --message.cache.number int                   Maintain log the largest number in the memory peer event (default 256)
      --message.dockerlog.handle.core.number int   The number of concurrent processing receive log data. more than message.handle.core.number (default 2)
      --message.garbage.file string                save garbage message file path when save type is file (default "/var/log/envent_garbage_message.log")
      --message.garbage.save string                garbage message way of storage (default "file")
      --message.handle.core.number int             The number of concurrent processing receive log data. (default 2)
      --message.max.number int                     the max number log message for peer event (default 100000)
      --message.sub.handle.core.number int         The number of concurrent processing receive log data. more than message.handle.core.number (default 3)
      --message.type string                        Receive and transmit the log message type. (default "json")
      --monitor-path string                        promethesu monitor metrics path (default "/metrics")
      --monitor.cache int                          the monitor sub server cache the receive message size (default 200)
      --monitor.subaddress stringSlice             monitor message source address (default [tcp://127.0.0.1:9442])
      --monitor.subscribe string                   the monitor message sub server subscribe info (default "ceptop")
      --monitor.udp.host string                    receive new monitor udp server host (default "0.0.0.0")
      --monitor.udp.port int                       receive new monitor udp server port (default 6166)
      --nodeid-file string                         the unique ID for this node. Just specify, don't modify (default "/opt/rainbond/etc/node/node_host_uuid.conf")
      --webhook.console.token string               console web api token
      --webhook.console.url string                 console web api url (default "http://console.goodrain.me")
      --websocket.bind.ip string                   the bind ip of websocket for push event message (default "0.0.0.0")
      --websocket.bind.port int                    the bind port of websocket for push event message (default 6363)
      --websocket.certfile string                  websocket ssl cert file (default "/etc/ssl/goodrain.com/goodrain.com.crt")
      --websocket.compression                      weither enable compression for web socket (default true)
      --websocket.keyfile string                   websocket ssl cert file (default "/etc/ssl/goodrain.com/goodrain.com.key")
      --websocket.maxrestart int                   the max restart count of websocket for push event message (default 5)
      --websocket.readbuffersize int               the readbuffersize of websocket for push event message (default 4096)
      --websocket.ssl                              whether to enable websocket  SSL
      --websocket.ssl.bind.port int                the ssl bind port of websocket for push event message (default 6364)
      --websocket.timeout string                   Keep websocket service the longest time when without message  (default "1m")
      --websocket.writebuffersize int              the writebuffersize of websocket for push event message (default 4096)
```


### 环境变量

|   环境变量名称   |  默认值    |   说明   |
| ---- | ---- | ---- |

