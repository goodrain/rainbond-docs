---
title: 高级环境变量配置
summary: 高级环境变量配置
toc: false
---

<div id="toc"></div>
Rainbond平台默认注入以下环境变量信息以供应用使用：

| 变量名          | 变量值                                      | 说明                                                                             |
| --------------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| PORT            |  应用设置的第一个端口号                     | 应用建立端口监听时尽量获取 PORT 环境变量值进行监听                               |
| PROTOCOL        | http\tcp\mysql 等                           | 对应上诉端口的协议类型                                                           |
| DEFAULT_DOMAIN  | 默认域名                                    | 第一个 http 协议的端口的平台默认域名                                             |
| TENANT_ID       | 租户 ID                                     | 租户 ID                                                                          |
| SERVICE_ID      | 应用 ID                                     | 应用 ID                                                                          |
| MEMORY_SIZE     | micro， small， medium， large， 2xlarge 等 | 表示当前应用实例的内存大小设置，一般用于应用内存相关设置的初始化，例如 JAVA_OPTS |
| SERVICE_POD_NUM | 应用实例数量                                | 应用实例的数量                                                                   |
| DEPEND_SERVICE  | serviceAlias:serviceID,                     | 依赖的应用                                                                       |
| DISCOVER_URL    | http://xxxxxxx                              | 配置发现接口地址,插件运行环境有效                                                |

使用以下高级环境变量可以解锁更多高级功能：

## 编译使用高级变量

以`BUILD_`开头的环境变量用于应用编译时，目前有以下变量可用：
| 变量名 |变量值|说明|
|-|-|-|
|BUILD_REPARSE| true| 构建时重新识别代码语言类型|
|NO_CACHE| true | 构建时不使用缓存包 |
|BUILD_MAVEN_CUSTOM_OPTS|-DskipTests=true -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true | 用于 maven 构建，默认值如前|
|BUILD_MAVEN_CUSTOM_GOALS| clean install |用于 maven 构建，默认值如前 |

## 调度使用高级变量

## 应用运行高级变量

| 变量名   | 变量值           | 说明                             |
| -------- | ---------------- | -------------------------------- |
| HOSTNAME | 需要使用的主机名 | 设置应用主机名称，单实例应用生效 |
