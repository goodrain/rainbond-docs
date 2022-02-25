---
title: 服务速率限制
description: 本文描述基于 Rainbond 平台进行服务速率限制
# keywords: 微服务架构 速率限制 quotas mesh
---

Rainbond 默认支持基于 envoy 的全局速率限制。在 Rainbond 默认提供的综合网络治理插件中呈现。本文我们将一个用例呈现 Rainbond 中全局速率限制的使用方式。

### 前置条件

1. 部署可访问的 Demo 组件一个。
2. 为此组件开通综合网络治理插件。

### 操作流程

1.部署全局限制服务需要使用的 Redis 组件，使用镜像 `redis:alpine` 创建组件，组件创建后在端口设置中将 6379 端口别名修改为 `REDIS` ,开启 `对内服务` 权限。

2.部署全局限制服务，使用镜像的方式部署全局限制服务。使用以下 DockerRun 命令创建组件，组件可部署到业务的同一个应用中。添加后使其依赖上步安装的 REDIS 组件。

```
docker run -e USE_STATSD=false -e REDIS_SOCKET_TYPE=tcp -e REDIS_URL=${REDIS_HOST}:${REDIS_PORT} -e RUNTIME_ROOT=/data -e RUNTIME_SUBDIRECTORY=ratelimit -v /data/ -p 8081:8081 barnett/ratelimit:v1.4.0 /bin/ratelimit
```

添加成功后切换到组件端口设置页面，将 8081 端口对内服务打开并设置端口别名为 `RATE_LIMIT_SERVER`

> 默认使用的全局限制服务是 envoy 的默认实现，你可以根据 envoy 的速率限制服务 API 规范进行自定义实现。

3.添加速率限制配置文件

进入全局限制服务组件的环境管理中，添加配置文件，文件路径为 `/data/ratelimit/config/config.yaml`

```
domain: limit.common
descriptors:
  - key: remote_address
    rate_limit:
      unit: second
      requests_per_unit: 10

  # Black list IP
  - key: remote_address
    value: 50.0.0.5
    rate_limit:
      unit: second
      requests_per_unit: 0
```

添加完配置文件后重启组件。

> 该配置的含义是通过请求来源 IP 进行速率限制，`IP` 为 50.0.0.5 限制访问，其他 IP 地址限制每秒请求 10 次

4.业务组件依赖限制服务组件并更新插件配置

编辑拓扑图使业务组件依赖刚刚部署的速率限制服务组件，然后进入业务组件插件管理，点击已开通的综合治理插件的查看配置入口。在配置表单中做如下配置：

- 配置 `OPEN_LIMIT` 为 `yes`
- 配置 `LIMIT_DOMAIN` 为 `limit.common`,该值与上面配置文件中的配置 domain 形成对应。

配置完成后更新插件配置即可。

5.验证速率限制是否生效

我们可以使用 `ab` 命令进行压力测试

```
ab -n 1000 -c 20 http://5000.gr425688.duaqtz0k.17f4cc.grapps.cn/
```

结果会显示如下:

```
Concurrency Level:      20
Time taken for tests:   6.132 seconds
Complete requests:      1000
Failed requests:        794
   (Connect: 0, Receive: 0, Length: 794, Exceptions: 0)
Non-2xx responses:      794
```

可见 1000 次请求有 794 次被限制，被速率限制驳回的请求访问码为 `429`

### 参考视频

服务请求速率限制配置参考视频: https://www.bilibili.com/video/BV1ai4y14718/

### 常见问题

- 是否可以自定义开发速率限制服务

  > 当然可以，本文采用的服务实现是[envoy ratelimit](https://github.com/envoyproxy/ratelimit.git),你可以基于[API 规范](https://github.com/envoyproxy/ratelimit/blob/0ded92a2af8261d43096eba4132e45b99a3b8b14/proto/ratelimit/ratelimit.proto)自主实现。

- 是否支持更多速率限制策略

  > 速率限制策略还可以支持基于请求头来进行限制，但目前仅支持基于来源 IP 地址。
