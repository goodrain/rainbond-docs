---
title: ServiceMesh Network Governance Plugin Description
description: The principle and usage instructions of the ServiceMesh network management plug-in installed by default in Rainbond
---

### ServiceMesh Network Governance Plugin

5.1.5版本后，Rainbond默认提供了综合网络治理插件（同时处理入站和出站网络）和出站网络治理插件两个插件可用。
网络治理插件工作在与业务容器同一个网络空间之中，可以监听一个分配端口，拦截入站的业务流量进行限流、断路等处理再将流量负载到业务服务的实际监听端口之上。同时也可以工作在出站方向，业务服务需要访问上游服务时，通过访问本地出站治理插件监听的端口，进行流量路由、断路、安全验证等处理，再将流量负载到尚有服务的主机之上。
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/mesh-de.png)

For plugin developers, the following two points need to be paid attention to：

- The inbound governance plug-in needs to forward traffic according to the port forwarding rules assigned by the system. For example, the UI service itself is listening on port 8080, which cannot be changed, but we can change the access port when accessing the UI service from the edge gateway, so Rainbond application Runtime to dynamically generate listening port pairs for inbound network management plugins, such as the following configuration：

  ```
  "base_ports":[
        {
            "service_alias":"gre484d9",
            "service_id":"9703228e9b42cde3e3a72f4826e484d9",
            "port":8080,
            "listen_port":65301,
            "protocol":"http",
            " options":{
                "LIMIT_DOMAIN":"limit.common",
                "OPEN_LIMIT":"NO"
            }
        }
  ```

The plugin will automatically inject the DISCOVER_URL variable when it is running. The above configuration information can be dynamically obtained through the address of this variable value. The inbound network management plugin must listen to port 65301 through the above configuration and load traffic to port 127.0.0.1:8080.- The outbound management plug-in does not have the problem of port mapping. The outbound management plug-in generates the local listening load to the remote address according to the dynamic configuration information of the subordinates.

- 出站治理插件不存在端口映射的问题，出站治理插件根据下属的动态配置信息生成本地监听负载到远程地址。

```
"base_services":[
        {
            "service_alias":"gre484d9",
            "service_id":"9703228e9b42cde3e3a72f4826e484d9",
            "depend_service_alias":"grcff92d",
            "
            ":"c81923991ff24280820a5d9d4"
            "protocol":"http",
            "options":{
                "BaseEjectionTimeMS":"30000",
                "ConsecutiveErrors":"5",
                "Domains":"todos",
                "Headers":"",
                "IntervalMS":"10",
                "MaxActiveRetries":"5",
                "MaxConnections":"10",
                "MaxEjectionPercent":"20",
                "MaxPendingRequests":"1024",
                "MaxRequests": "1024",
                "MaxRequestsPerConnection":"",
                "PROXY":"YES",
                "Prefix":"/",
                "Weight":"80"
            }
        }
]
```

使用上述原生配置发现和服务发现来让自定义插件工作，插件层面需要做较多的数据适配工作。Rainbond同时提供了基于envoy XDS（grpc）规范的动态配置发现服务，在插件中通过XDS_HOST_IP XDS_HOST_PORT两个变量来获取XDS服务的地址。

对用用户来说插件层的网络治理对于业务层是完全透明的，所有有依赖关系的分布式服务类似于运行同一台主机一样。

### 插件实践

#### After version 5.1.5, Rainbond provides two plugins available by default, the integrated network management plugin (which handles both inbound and outbound networks) and the outbound network management plugin. The network management plug-in works in the same network space as the business container. It can monitor an allocated port, intercept the inbound business traffic, perform current limiting, circuit breaking and other processing, and then load the traffic onto the actual listening port of the business service.At the same time, it can also work in the outbound direction. When the business service needs to access the upstream service, it can perform traffic routing, circuit breaking, security verification, etc. by accessing the port monitored by the local outbound management plug-in, and then load the traffic to the host with the service. superior. ![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/mesh-de.png)

默认提供的综合网络治理插件基于envoy 1.9.0实现，综合网络插件同时实现了入站方向的治理和出站方向的治理，提供以下配置参数：

##### 入站方向

全局限流：

- OPEN_LIMIT
  开启全局限流功能，全局限流功能依赖于第三方的限流服务，比如 [ratelimit](https://github.com/lyft/ratelimit) , 当前服务需要依赖ratelimit服务，并设置RATE_LIMIT_SERVER_HOST和RATE_LIMIT_SERVER_PORT环境变量。
- LIMIT_DOMAIN
  限流链路的domain key,与全局限流服务的配置对应

断路：

- MaxConnections
  最大连接数，Http协议时仅适用于http1.1，TCP协议时设置最大TCP连接数。
- MaxRequests
  并发请求数，适用于HTTP协议
- MaxPendingRequests
  最大等待请求数，适用于HTTP协议
- MaxActiveRetries
  最大重试次数，适用于HTTP协议
- MaxRequestsPerConnection
  单连接最大请求数，适用于HTTP协议，支持http1.1 和http2

##### 出站方向

动态路由（HTTP协议）：

- Domains

  请求域名，对于http协议的上游服务，支持基于域名路由并复用80端口。

- Prefix

  请求Path路径的前缀，基于前缀来路由不同的上游服务。

- Headers

  请求头，基于请求头的路由不同的上游服务。

- Weight

  权重，基于不同的权重来将流量分发到不同的上游服务。

断路（面向连接）：

- MaxConnections
  最大连接数，Http协议时仅适用于http1.1，TCP协议时设置最大TCP连接数。
- MaxRequests
  并发请求数，适用于HTTP协议
- MaxPendingRequests
  最大等待请求数，适用于HTTP协议
- MaxActiveRetries
  最大重试次数，适用于HTTP协议
- MaxRequestsPerConnection
  单连接最大请求数，适用于HTTP协议，支持http1.1 和http2

断路（面向上游主机）：

- ConsecutiveErrors
  上游服务主机发生500错误的被逐出的次数。
- BaseEjectionTimeMS
  主机被逐出的基础时间，及第一次被逐出的时间，如果被逐出n次，时间则为n\*BaseEjectionTimeMS
- MaxEjectionPercent
  被逐出主机的最大比例，如果设置为100则允许全量逐出。
- IntervalMS
  分析主机是否应该被逐出的时间间隔
- HealthyPanicThreshold
  进入恐慌模式的比例，默认是50

#### Using the above native configuration discovery and service discovery to make custom plug-ins work, more data adaptation work needs to be done at the plug-in level.Rainbond also provides a dynamic configuration discovery service based on the envoy XDS (grpc) specification. The address of the XDS service is obtained through the two variables of XDS_HOST_IP and XDS_HOST_PORT in the plugin.For users, the network governance of the plug-in layer is completely transparent to the business layer, and all distributed services with dependencies are similar to running the same host.### Plugin Practice#### Integrated Network Governance PluginThe integrated network management plug-in provided by default is based on envoy 1.9.0. The integrated network plug-in implements both inbound and outbound management. The following configuration parameters are provided:：##### Inbound directionAll restricted flow：- OPEN_LIMIT enables the full current limiting function, which depends on the third-party current limiting service, such as [ratelimit](https://github.com/lyft/ratelimit) , the current service needs to rely on the ratelimit service, and set the RATE_LIMIT_SERVER_HOST and RATE_LIMIT_SERVER_PORT environment variables.
- LIMIT_DOMAIN The domain key of the current-limiting link, corresponding to the configuration of the global current-limiting serviceopen circuit：- MaxConnections is the maximum number of connections. It is only applicable to http1.1 for the Http protocol. The maximum number of TCP connections is set for the TCP protocol.
- MaxRequests The number of concurrent requests, applicable to the HTTP protocol
- MaxPendingRequests The maximum number of pending requests, applicable to the HTTP protocol
- MaxActiveRetries maximum number of retries, applicable to HTTP protocol
- MaxRequestsPerConnection The maximum number of requests per connection, applicable to HTTP protocol, supports http1.1 and http2##### Outbound directionDynamic routing (HTTP protocol)：- Domains

  Request a domain name. For the upstream service of the http protocol, it supports routing based on the domain name and reuses port 80.

- Prefix

  Request the prefix of the Path path, and route different upstream services based on the prefix.

- Headers

  Request headers, which route different upstream services based on request headers.

- Weight

  Weight, based on different weights to distribute traffic to different upstream services.Open circuit (connection oriented)：- MaxConnections is the maximum number of connections. It is only applicable to http1.1 for the Http protocol. The maximum number of TCP connections is set for the TCP protocol.
- MaxRequests The number of concurrent requests, applicable to the HTTP protocol
- MaxPendingRequests The maximum number of pending requests, applicable to the HTTP protocol
- MaxActiveRetries maximum number of retries, applicable to HTTP protocol
- MaxRequestsPerConnection The maximum number of requests per connection, applicable to HTTP protocol, supports http1.1 and http2Open circuit (facing upstream host)：- ConsecutiveErrors The number of times the upstream service host was evicted with a 500 error.
- BaseEjectionTimeMS The base time when the host was evicted, and the time when the host was evicted for the first time. If it is evicted n times, the time is n\*BaseEjectionTimeMS
- MaxEjectionPercent The maximum percentage of hosts to be ejected. If set to 100, full eviction is allowed.
- IntervalMS The interval at which to analyze whether a host should be evicted
- HealthyPanicThreshold Proportion to enter panic mode, default is 50#### Outbound Network Governance PluginWhen the service does not need to use the management function in the inbound direction, only the outbound management plug-in can be used, and the configuration parameters are consistent with the outbound direction of the comprehensive management plug-in.

当服务无需使用入站方向的治理功能时，可只使用出站治理插件，配置参数与综合治理插件的出站方向一致。
