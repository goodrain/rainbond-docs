---
title: ServiceMesh网络治理插件说明
description: Rainbond默认安装的ServiceMesh网络治理插件的原理和使用说明
weight: 8007
---

## ServiceMesh网络治理插件

5.1.5版本后，Rainbond默认提供了综合网络治理插件（同时处理入站和出站网络）和出站网络治理插件两个插件可用。 

综合网络治理插件与业务主容器同处一个 Pod 实例中，共享网络资源。作为入站网络治理，该插件可以监听业务主容器分配的端口，拦截入站的业务流量进行限流、断路等处理，再将流量负载到业务服务的实际监听端口之上。也可以作为出站网络治理，在业务服务需要访问上游服务时，通过访问该插件监听的端口，进行流量路由、断路、安全验证等处理，再将流量负载到上游服务的主机之上。
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/mesh-de.png)

对于插件的开发者来说需要关注如下两点：

* 入站治理插件需要根据系统分配的端口转发规则进行流量转发，比如UI服务本身是监听的8080端口，这是不能改变的，但是我们可以改变从边缘网关访问UI服务时的访问端口，因此Rainbond应用运行时为动态为入站网络治理插件生成监听端口对，比如下述配置：

  ```
  "base_ports":[
        {
            "service_alias":"gre484d9",
            "service_id":"9703228e9b42cde3e3a72f4826e484d9",
            "port":8080,
            "listen_port":65301,
            "protocol":"http",
            "options":{
                "LIMIT_DOMAIN":"limit.common",
                "OPEN_LIMIT":"NO"
            }
        }
    ]
  ```
插件运行时会自动注入DISCOVER_URL变量，通过此变量值的地址可以动态获取到如上的配置信息，入站网络治理插件必须通过以上配置来监听65301端口，将流量负载到127.0.0.1:8080端口。

* 出站治理插件不存在端口映射的问题，出站治理插件根据下属的动态配置信息生成本地监听负载到远程地址。

```
"base_services":[
        {
            "service_alias":"gre484d9",
            "service_id":"9703228e9b42cde3e3a72f4826e484d9",
            "depend_service_alias":"grcff92d",
            "depend_service_id":"c81923991ff2428082a5d9d478cff92d",
            "port":5000,
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
                "MaxRequests":"1024",
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

#### 综合网络治理插件

默认提供的综合网络治理插件基于envoy 1.9.0实现，综合网络插件同时实现了入站方向的治理和出站方向的治理，提供以下配置参数：

##### 入站方向

入站方向将参数归类为`全局限流`和`断流`两部分。

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

出站方向的参数配置根据上游服务协议不同，支持不同的参数配置。上游组件端口使用非 HTTP 协议时，仅支持设置最大连接数这一个参数。

动态路由（HTTP协议）：

* Domains

  请求域名，对应http协议的上游服务，支持基于域名路由并复用80端口。

* Prefix

  请求Path路径的前缀，支持基于前缀来路由到不同的上游服务。

* Headers

  请求头，基于请求头的路由到不同的上游服务。

* Weight

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

  将实例从负载均衡池中剔除，需要连续的错误（HTTP5XX或者TCP断开/超时）次数。默认是5。

- BaseEjectionTimeMS

  最短拒绝访问时长。这个时间主机将保持拒绝访问，且如果拒绝访问达到一定的次数。这允许自动增加不健康服务的拒绝访问时间，时间为 `BaseEjectionTimeMS` * 驱逐次数。格式: `1h/1m/1s/1ms`，但必须大于等于`1ms`。实例被剔除后，至少多久不得返回负载均衡池，默认是 30 秒。单位毫秒。

- MaxEjectionPercent

  服务在负载均衡池中被拒绝访问（被移除）的最大百分比，负载均衡池中最多有多大比例被剔除，默认是 20% 。
  
  > envoy 默认 10% 。

- IntervalMS

  拒绝访问的时间间隔，即在interval（1s）内连续发生1个consecutiveErrors错误，则触发服务熔断，格式是1h/1m/1s/1ms，但必须大于等于1ms。即分析是否需要剔除的频率，多久分析一次，默认10秒。单位毫秒。

### 出站网络治理插件

当服务无需使用入站方向的治理功能时，可只使用出站治理插件，配置参数与综合治理插件的出站方向一致。

