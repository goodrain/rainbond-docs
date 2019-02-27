---
title: 高级环境变量配置
summary: 高级环境变量配置
toc: true
---


Rainbond平台启动服务时默认注入以下环境变量信息以供应用使用：

| 变量名              | 变量值                                      | 说明                                                         |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| PORT                | 应用设置的第一个端口号                      | 应用建立端口监听时尽量获取 PORT 环境变量值进行监听           |
| PROTOCOL            | http\tcp\mysql 等                           | 对应上诉端口的协议类型                                       |
| DEFAULT_DOMAIN      | 默认域名                                    | 第一个 http 协议的端口的平台默认域名                         |
| TENANT_ID           | 租户 ID                                     | 租户 ID                                                      |
| SERVICE_ID          | 应用 ID                                     | 应用 ID                                                      |
| MEMORY_SIZE         | micro， small， medium， large， 2xlarge 等 | 表示当前应用实例的内存大小设置，一般用于应用内存相关设置的初始化，例如 JAVA_OPTS |
| SERVICE_POD_NUM     | 应用实例数量                                | 应用实例的数量                                               |
| DEPEND_SERVICE      | serviceAlias:serviceID,                     | 依赖的应用                                                   |
| HOST_IP             | ip地址                                      | 服务运行时所在宿主机IP地址                                   |
| POD_IP              | ip地址                                      | 服务运行时的IP地址                                           |
| DISCOVER_URL        | http://xxxxxxx/v1/resources/xxx             | 配置发现接口地址,插件运行环境有效                            |
| DISCOVER_URL_NOHOST | /v1/resources/xxx                           | 不带IP地址的配置发现URL, 地址使用HOST_IP：6100               |

使用以下高级环境变量可以解锁更多高级功能：

## 部署（构建）应用时使用的变量

变量名以`BUILD_`开头的环境变量在源码构建类应用构建阶段生效，比如下述变量：

| 变量名                   | 变量值                                                       | 说明                        |
| ------------------------ | ------------------------------------------------------------ | --------------------------- |
| BUILD_REPARSE            | true                                                         | 构建时重新识别代码语言类型  |
| NO_CACHE                 | true                                                         | 构建时不使用缓存包          |
| BUILD_MAVEN_CUSTOM_OPTS  | -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true | 用于 maven 构建，默认值如前 |
| BUILD_MAVEN_CUSTOM_GOALS | clean install                                                | 用于 maven 构建，默认值如前 |
| NO_CACHE                 | true                                                         | 构建时不使用缓存包          |

变量名以`BUILD_ARG_`开头的环境变量定义Dockerfile构建的ARG变量：
比如  BUILD_ARG_VERSION=v1 变量在构建Dockerfile时存在ARG变量 VERSION=v1


## 应用运行高级变量
以`ES_`开头的环境变量将作为扩展功能变量，例如下面用例：

| 变量名         | 变量值         | 说明                                                         |
| -------------- | -------------- | :----------------------------------------------------------- |
| ES_SELECTNODE  | 选择宿主机的ID | 用于定点调度，指定调度到某台宿主机上，节点的ID通过grctl node list 可得 |
| ES_HOSTNETWORK | true           | 是否使用主机端口映射                                         |
| ES_HOSTANME    | 主机名         | 设置实例的主机名，适用于单实例服务                           |
| ES_CPULIMIT    | 1核=1000       |  自定义服务的CPU限制值  5.0.3及以后版本支持                   |
| ES_CPUREQUEST    | 1核=1000       |  自定义服务的CPU请求值     5.0.3及以后版本支持           |

