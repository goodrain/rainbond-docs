---
title: 流量路由管理
description: 讲解基于Rainbond做微服务流量路由管理
---

流量路由管理包括网关边缘流量路由和组件间通信流量路由。流量路由管理的目的旨在根据业务需要灵活的调整流量走向，实现灰度发布，A/B 测试等高级服务发布场景。

### 网关边缘流量路由

网关边缘流量路由请参考 [通过域名访问提供 HTTP 服务的组件](/docs/use-manual/team-manage/gateway/rules/domain)

### 组件间通信路由

Rainbond 中组件间通信默认情况下采用 TCP 4 层通信，因此默认情况下无需设置路由参数。当我们希望从应用层通信控制流量时，需要安装 [出口网络治理插件](/docs/use-manual/team-manage/plugin-manage/) 。将服务间的通信治理升级为 7 层通信治理。目前只支持 Restful 协议路由管理，支持以下路由参数：

1. <b>域名</b> 5.2.0 版本以前，该域名仅支持自定义顶级域名，比如 `user`。5.2.0 版本以后支持定义多级域名，比如`user.domian`。Rainbond 将自动完成填写域名的域名解析。Mesh 层根据流量访问的域名进行路由。

2. <b>请求路径</b> 根据请求路径进行匹配路由策略。

3. <b>请求头</b> 根据请求头信息进行路由匹配。

在插件配置中，需用开发者针对每一个通信链路进行路由匹配。比如 A 组件依赖 B\C\D 组件，分别使用 `domain.b` `domain.c` `domain.d` 域名进行通信。那么需要在插件配置中分别对 B\C\D 三个组件的链路上信息域名配置。

![组件间路由参数配置](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/plugin.png)
