---
title: Plugin Design and Development
description: Rainbond application plugin development documentation
---

### Performance analysis plug-in support system

The performance analysis plug-in analyzes the performance indicators of the service by way of bypass, or exposes the performance indicators by the service itself to be captured by the plug-in.

Rainbond provides the statsd service on each computing node to receive the performance analysis results of the performance analysis plug-in, and store and display them. This is a self-level monitoring system.In the future, the performance analysis class will be transformed into a business monitoring class plug-in. The business monitoring class plug-in will expose business monitoring data according to the Prometheus indicator specification, and the Rainbond monitoring system will automatically discover these endpoints for monitoring data collection.After monitoring data is collected, it supports subsequent visualization, alarming, and automatic scaling.The future performance analysis class will be transformed into an OPMM plugin, which will use Prometheus indicator specifications for operational MCS data exposure and the Rainbond MCS will automatically identify these endpoints for monitoring data collection.Monitoring data collection supports subsequent visualization, alarm, and automatic scaling-up controls.

#### Ingress network plug-in support system

Ingress network plug-ins are mainly used for ServiceMesh network or firewall security control. For example, when we deploy a web application, we do not want illegal requests (such as SQL injection) to reach the web. At this time, we can install a web application. A security plug-in, used to control all requests to access the web, is like an ingress controller, so we call this type of plug-in an ingress network plug-in.

- working principle

When an ingress network plug-in is installed for an application, the plug-in is placed in front of the application, and it must listen to a new port allocated by Rainbond to intercept all requests of the application, such as port 8080 in the following figure, then we can Necessary processing is performed on the received request inside the plug-in, and then the processed request is forwarded to the port monitored by the application, such as port 80 in the following figure.The relationship between the ingress network plug-in and the application is shown in the figure below：The connection of the portal network plugin to the app is shown in the graph： below

![Schematic diagram of the entry management plug-in](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/other/net-ingress-plugin.png)

The plugin needs to dynamically discover the configuration from the Rainbond application runtime. The discovery method is as follows：

Configure the discovery address (constructed by environment variables)： `${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}`

```
#
curl ${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}can be executed in the plugin container
```

The plugin configuration structure is as follows：

```
LO
    "base_ports": [
        LO
            "service_alias":"gr23cb0c",
            "service_id": "a55f140efee66c46219 ccc1e8d23cb0c",
            "port":5000,
            "listen_port":65530,
            "protocol":"http",
            "options":LO
                "OPEN":"YES"
            }
        }
    ],
}
```

The way the plug-in intercepts traffic is to establish a monitor on port `65530` and forward it to `127.0.0.1:5000` after business processing.

#### export network

Export network plugins are one of the most commonly used plugins, and Rainbond automatically injects such plugins for services that depend on other services by default.At the same time, Rainbond also provides a default network governance plugin based on envoy implementation.The export network plug-ins mainly provide the governance requirements when the current service accesses the upstream service.And Rainbond also provides a default network governance plugin based on envoy.ExportWeb Plugins mainly provide governance needs for current service access to upstream services.

- working principle

The Rainbond application runtime provides XDS specification services and configuration discovery services, and supports envoy types or other plugin types that support this specification.You can also generate your own plug-in configuration by obtaining the standard configuration information of the native plug-in.The egress network plug-in can perform the following functions as required：dynamic routing, circuit breaker, log printing, link tracking, etc.It can also generate its own configuration by getting standard configuration information for native plugins.Exporting network plugins can do the following functions like：dynamic routing, melting, log printing, link tracking, etc. as needed.

Developers designing export network governance plug-ins need to dynamically discover the configuration from the：application runtime. Plug-ins that support the XDS specification can directly use the XDS API for configuration discovery.

Configure the discovery address (composed of environment variables)： `${XDS_HOST_IP}:${XDS_HOST_PORT}`

The configuration discovery methods that do not support the XDS specification are as follows： Configuration discovery address (composed of environment variables)： `${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}`

```
#
curl ${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}can be executed in the plugin container
```

The plugin configuration structure is as follows：

```
{
    "base_services":[
        {
            "service_alias":"gr23cb0c",
            "service_id":"a55f140efae66c46219ccc1e8d23cb0c",
            "port":5000,
            "protocol":"http",
            "options":{
                "OPEN":"YES"
            }
        }
    ],
}
```

#### initialization class

The working principle of the initialization class plug-in is based on the Kubernetes init-container, that is, the initialization container. It generally completes the data initialization work, and the nature of its work must be to exit normally within a limited time.The business container will start only after the initialization plugin exits normally.Rainbond completes the order control of batch startup of multiple services based on such plugins, refer to rainbond service component [rbd-init-probe](https://github.com/goodrain/rainbond/tree/master/cmd/init-probe).The business container will only start if the initialization plugin exits.Rainbond is based on the sequence of batch start-ups for multiple services performed by such plugins, refer to rainbond service component [rbd-init-probe](https://github.com/goodrain/rainbond/tree/master/cmd/init-probe).
