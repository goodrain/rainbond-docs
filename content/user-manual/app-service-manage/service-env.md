---
title: 高级环境变量配置
description: Rainbond服务高级环境变量配置文档
hidden: true
weight: 5030
---


Rainbond平台启动服务时默认注入以下环境变量信息以供应用使用：

| 变量名              | 变量值                                      | 说明                                                         |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| PORT                | 应用设置的第一个端口号                      | 应用建立端口监听时尽量获取 PORT 环境变量值进行监听           |
| PROTOCOL            | http\tcp\mysql 等                           | 对应上诉端口的协议类型                                       |
| TENANT_ID           | 租户 ID                                     | 租户 ID                                                      |
| SERVICE_ID          | 应用 ID                                     | 应用 ID                                                      |
| MEMORY_SIZE         | micro， small， medium， large， 2xlarge 等 | 表示当前应用实例的内存大小设置，一般用于应用内存相关设置的初始化，例如 JAVA_OPTS |
| SERVICE_POD_NUM     | 应用实例数量                                | 应用实例的数量                                               |
| DEPEND_SERVICE      | serviceAlias:serviceID,                     | 依赖的应用                                                   |
| HOST_IP             | ip地址                                      | 服务运行时所在宿主机IP地址                                   |
| POD_IP              | ip地址                                      | 服务运行时的IP地址                                           |
| DISCOVER_URL        | http://xxxxxxx/v1/resources/xxx             | 配置发现接口地址,插件运行环境有效                            |
| DISCOVER_URL_NOHOST | /v1/resources/xxx                           | 不带IP地址的配置发现URL, 地址使用HOST_IP：6100 |
|  |  |  |

#### 域名自动注入的环境变量说明:

应用默认注入当前服务的访问域名环境变量信息：DOMIAN和DOMAIN_PROTOCOL，如果服务具有多个端口，注入策略如下

1. 如果有多个端口, 则会在环境变量名后面加上`_端口号`, 即`DOMAIN_端口号`. 比如: DOMAIN_80, DOMAIN_8080

  对应的域名协议则为 DOMAIN_PROTOCOL_80

2. DOMIAN变量的值为服务端口号从小到大，自定义域名优先的值。比如有端口80,8080,如果8080绑定了自定义域名，则DOMIAN的值为8080端口的自定义域名。如果都没有绑定自定义域名，则为80端口的默认域名。



使用以下高级环境变量可以解锁更多高级功能：

### 部署（构建）应用时使用的变量

变量名以`BUILD_`开头的环境变量在源码构建类应用构建阶段生效，比如下述变量：

| 变量名                   | 变量值                                                       | 说明                        |
| ------------------------ | ------------------------------------------------------------ | --------------------------- |
| BUILD_REPARSE            | true                                                         | 构建时重新识别代码语言类型  |
| NO_CACHE                 | true                                                         | 构建时不使用缓存包          |
| BUILD_MAVEN_CUSTOM_OPTS  | -DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true | 用于 maven 构建，默认值如前 |
| BUILD_MAVEN_CUSTOM_GOALS | clean install                                                | 用于 maven 构建，默认值如前 |
| NO_CACHE                 | true                                                         | 构建时不使用缓存包          |

更多服务构建环境设置，请参考 [服务构建源配置](../service-source/)

### 应用运行高级变量

以`ES_`开头的环境变量将作为扩展功能变量，例如下面用例：

| 变量名         | 变量值         | 说明                                                         |
| -------------- | -------------- | :----------------------------------------------------------- |
| ES_SELECTNODE  | 选择宿主机的ID | 用于定点调度，指定调度到某台宿主机上，节点的ID通过grctl node list 可得 |
| ES_HOSTNETWORK | true           | 是否使用主机端口映射                                         |
| ES_HOSTANME    | 主机名         | 设置实例的主机名，适用于单实例服务                           |
| ES_CPULIMIT    | 1核=1000       |  自定义服务的CPU限制值  5.0.3及以后版本支持                   |
| ES_CPUREQUEST    | 1核=1000       |  自定义服务的CPU请求值     5.0.3及以后版本支持           |
