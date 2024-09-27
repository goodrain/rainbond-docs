---
title: ServiceMesh Network Governance Plugin Description
description: The principle and usage instructions of the ServiceMesh network management plug-in installed by default in Rainbond
---

### ServiceMesh Network Governance Plugin

After version 5.1.5, Rainbod provided by default two plugins for integrated network governance (processing both the inbound and outbound networks) and the outbound network governance plugin.
The network governance plugin is working in the same cyberspace as the business container and can listen to an assignment port, interception of business traffic at entry points for limited flow, circuit breaks, etc. processing and loading traffic loads over the actual listening port of the operational service.It is also possible to work in the outbound direction and when operational services require access to upstream services, to handle traffic routes, circuit breaks, security validations, and then load traffic onto existing servers by visiting the ports of the local outbound governance plugin.
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

- The outbound governance plugin does not have a port mapping, and the outbound governance plugin configured information to listen at a cost to remote addresses based on its dynamics.

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

Use the original configuration above to find and find services to make custom plugins work, the plugin level needs more data adaptations.Rainbod also provides a dynamic configuration discovery service based on envoy XDS (Gripc), retrieving the address of the XDS service via XDS_HOST_IP XDS_HOST_PORT in the plugin.

Web governance at the plugin level is completely transparent for the business layer and all dependent distribution services are similar to running the same host.

### Plugin Practice

#### After version 5.1.5, Rainbond provides two plugins available by default, the integrated network management plugin (which handles both inbound and outbound networks) and the outbound network management plugin. The network management plug-in works in the same network space as the business container. It can monitor an allocated port, intercept the inbound business traffic, perform current limiting, circuit breaking and other processing, and then load the traffic onto the actual listening port of the business service.At the same time, it can also work in the outbound direction. When the business service needs to access the upstream service, it can perform traffic routing, circuit breaking, security verification, etc. by accessing the port monitored by the local outbound management plug-in, and then load the traffic to the host with the service. superior. ![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1.5/mesh-de.png)

The integrated network governance plugin provided by default is based on envoy 1.9.0, and the integrated network plugin implements the governance of the inbound and outbound directions, providing configuration parameter： below

##### Entry Orientation

Global Stream：

- OPEN_LIMIT
  Enable global restricted flow functions that depend on third party restricted services such as [ratelimit](https://github.com/lyft/ratelimit), current service needs to rely on rateimit and set RATE_LIMIT_SERVER_HOST_and RATE_LIMIT_SERVER_PORT environment variables.
- LIMIT_DOMOIN
  Domain key for restricted stream links, in conjunction with Global Restricted Stream Service configuration

Disconnect：

- MaxConnections
  max connections. The Http protocol only applies to http.1.TCP when setting the maximum TCP connections.
- MaxRequests
  for both requests for HTTP protocol
- MaxPendingRequests
  max pending requests, applicable to HTTP protocol
- MaxActiveRetries
  Maximum retries for HTTP protocol
- MaxRequestsPerConnection
  Maximum number of single-connection requests, available for HTTP protocol support http1.1 and http2

##### Outbound Direction

Dynamic Route (HTP Protocol)：

- Domains

  Request a domain name, for the upstream service of the http-protocol, support for routing based on domain name and reuse 80 ports.

- Prefix

  Request the prefix of the Path path, based on the prefix to route different upstream services.

- Headers

  Requests header, routing different upstream services based on the head of request.

- Weight

  Weight based on different weights to distribute traffic to different upstream services.

Disconnect (connected)：

- MaxConnections
  max connections. The Http protocol only applies to http.1.TCP when setting the maximum TCP connections.
- MaxRequests
  for both requests for HTTP protocol
- MaxPendingRequests
  max pending requests, applicable to HTTP protocol
- MaxActiveRetries
  Maximum retries for HTTP protocol
- MaxRequestsPerConnection
  Maximum number of single-connection requests, available for HTTP protocol support http1.1 and http2

Breakdown (for upstream hosts)：

- ConsecutiveErrors
  upstream service host error 500 times.
- BaseEjectionTimeMS
  base time for the host to be evicted and first time from it, n\*BaseEjectionTimeMS
- Max percentage of MaxEjection Percent
  to be evicted from host, allowing full eviction if set to 100.
- IntervalMS
  to analyze whether the host should be evicted interval
- Health PanicThreshold
  in panic mode by default, 50

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

When the service does not need to use the governance function in the inbound direction, only the outbound governance plugin is used, and configuration parameters are the same as the outbound of the integrated governance plugin.
