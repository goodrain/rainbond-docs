---
title: 插件设计与开发
description: Rainbond应用插件的开发文档
---

### 性能分析类插件支持体系

性能分析类插件通过旁路的方式分析服务的性能指标，或通过服务自身暴露性能指标由插件捕获。

Rainbond 在每个计算节点提供了 statsd 服务接收性能分析插件的性能分析结果，并进行存储和展示，这是一种自定级监控体系。未来性能分析类将转型为业务监控类插件，业务监控类插件将以 Prometheus 指标规范进行业务监控数据暴露，Rainbond 监控系统自动发现这些端点进行监控数据收集。监控数据收集后从而支持后续的可视化、报警和自动伸缩调控。

#### 入口网络类插件支持体系

入口网络插件主要用于 ServiceMesh 网络或防火墙安全控制，比如，当我们部署了一个 web 应用后，我们不希望有不合法的请求（比如 SQL 注入）到达 web 中，这时我们可以为 web 应用安装一个安全插件，用来控制所有访问 web 的请求，就像是一个入口控制器，所以我们把这类插件叫做入口网络插件。

- 工作原理

当为某个应用安装了入口网络插件后，该插件被置于应用的前面，它必须监听一个由 Rainbond 分配的新端口用来拦截应用的所有请求，如下图中的 8080 端口，这时我们可以在插件内部对收到的请求进行必要的处理，然后把处理后的请求转发给应用监听的端口，如下图中的 80 端口。入口网络插件与应用的关系如下图所示：

![入口治理插件工作示意图](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/other/net-ingress-plugin.png)

插件需要从 Rainbond 应用运行时中动态发现配置，发现方式如下：

配置发现地址(环境变量构成)： `${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}`

```
# 可在插件容器中执行
curl ${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}
```

插件配置结构如下：

```
{
    "base_ports":[
        {
            "service_alias":"gr23cb0c",
            "service_id":"a55f140efae66c46219ccc1e8d23cb0c",
            "port":5000,
            "listen_port":65530,
            "protocol":"http",
            "options":{
                "OPEN":"YES"
            }
        }
    ],
}
```

插件截断流量的方式是建立端口 `65530` 的监听，经过业务处理后转发到 `127.0.0.1:5000` 。

#### 出口网络类

出口网络类插件是最常用插件之一，Rainbond 会默认为具有依赖其他服务的服务自动注入此类插件。同时 Rainbond 也提供了基于 envoy 实现的默认网络治理插件。出口网络类插件主要提供当前服务访问上游服务时的治理需求。

- 工作原理

Rainbond 应用运行时提供了 XDS 规范的服务和配置发现服务，支持支持 envoy 类型或其他支持此规范的插件类型。也可以通过获取原生插件标准配置信息自行生成插件自己的配置。出口网络插件可以根据需要做如下功能：动态路由、熔断、日志打印、链路追踪等。

开发者设计出口网络治理插件需要从 Rainbond 应用运行时中动态发现配置，支持 XDS 规范的插件，可以直接使用 XDS API 进行配置发现：

配置发现地址(环境变量构成)： `${XDS_HOST_IP}:${XDS_HOST_PORT}`

不支持 XDS 规范的配置发现方式如下：
配置发现地址(环境变量构成)： `${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}`

```
# 可在插件容器中执行
curl ${XDS_HOST_IP}:${API_HOST_PORT}${DISCOVER_URL_NOHOST}
```

插件配置结构如下：

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

#### 初始化类

初始化类插件工作原理是基于 Kubernetes init-container，即初始化容器，它一般完成数据初始化工作，其工作性质必须是在有限的时间内正常退出。只有初始化插件正常退出后，业务容器才会启动。Rainbond 基于此类插件完成多个服务的批量启动时的顺序控制, 参考 rainbond 服务组件 [rbd-init-probe](https://github.com/goodrain/rainbond/tree/master/cmd/init-probe)。
