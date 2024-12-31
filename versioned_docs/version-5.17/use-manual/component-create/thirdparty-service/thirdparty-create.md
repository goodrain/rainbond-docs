---
title: 第三方服务创建
description: 讲解Rainbond支持第三方服务的创建方式和流程
---

### 第三方服务创建

第三方服务创建依然存在两个入口，分别是团队视图左侧导航的`创建-->创建第三方组件`和应用 Dashboard 页面的`添加第三方组件`按钮，创建流程一致。

#### 创建静态第三方服务

- 选择服务注册方式为静态注册

- 填写服务的通信地址

  比如服务有两个运行实例，IP 地址分别是 192.168.0.1 192.168.0.2，为了设置方便，我们可以填写第一个实例时携带上端口配置，即提供如下的数据，告知 Rainbond 服务的监听端口是 8080，且都一致。

  > 192.168.0.1:8080
  >
  > 192.168.0.2

- 提交创建，进入到服务的 Dashboard 页面对服务端口、连接信息、健康检查属性进行配置。

#### 创建 Kubernetes 第三方服务(Beta)

- 选择服务注册方式为 Kubernetes
- 填写 Namespace ，默认为当前团队所在 Namespace
- 填写 Service ，Service 应属于上边填写的 Namespace
- 提交创建，进入端口界面进行配置，新增端口必须和 Service 配置端口一致才可以正常访问

#### 创建基于 API 注册的第三方服务

- 选择服务注册方式为 API 注册

- 提交创建，进入到服务的 Dashboard 页面对服务端口、连接信息、健康检查属性进行配置。

- 创建完成后, 可以根据总览页面中展示的`API地址`和`密钥`, 通过调用 API 的方式, 动态的更改服务的通信地址.

API 提供了 GET, PUT, DELETE 三种调用方式, 分别对应服务地址的查询, 添加(或修改)和删除.

##### GET

下面是查询实例的 API 示例:

```bash
curl -s -G \
--url http://ip:port/console/third_party/8ad4b1c7ffb305f2b59b6de625b1ee6a \
--data secret_key=6RW0mYM3
```

执行完 curl 请求后, 会得到一个类似以下的响应:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "查询成功",
    "data": {
        "list": [
            {
                "status": "healthy",
                "ip": "192.168.0.1",
                "is_static": true,
                "is_online": true
            },
            ...
        ]
    }
}
```

请求参数说明:

| 参数       | 是否必填 | 说明 |
| :--------- | :------- | :--- |
| secret_key | 是       | 密钥 |

响应参数说明:

| 参数      | 类型   | 说明                                                  |
| :-------- | :----- | :---------------------------------------------------- |
| code      | int    | 业务码                                                |
| msg       | string | 对该请求的响应结果的详细描述                          |
| msg_show  | string | 对该请求的响应结果的描述, 用于展示                    |
| status    | string | 实例的状态, 可能的值为: healthy, unhealthy, unknown   |
| ip        | string | 实例的 IP 地址                                        |
| is_static | bool   | 实例是否属于静态类型, true: 静态类型; false: 动态类型 |
| is_online | bool   | 实例是否处于上线状态, true: 已上线; false: 已下线     |

##### PUT

下面是修改实例的 API 示例:

```
curl -X PUT \
--url http://192.168.1.200:7070/console/third_party/8d545c3e8e7780b228b6dcc77561388b \
-H "Content-Type: application/json" \
-d '{"secret_key":"4FsL5PWK","ip":"192.168.0.1","is_online":true}'
```

执行完 curl 请求后, 会得到一个类似以下的响应:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "修改成功"
}
```

请求参数说明:

| 参数       | 是否必填 | 类型   | 说明                    |
| :--------- | :------- | :----- | :---------------------- |
| secret_key | 是       | string | 密钥                    |
| ip         | 是       | string | 服务实例地址, ipv4 格式 |
| is_online  | 否       | bool   | 是否上线, 默认 true     |

响应参数说明:

| 参数     | 类型   | 说明                               |
| :------- | :----- | :--------------------------------- |
| code     | int    | 业务码                             |
| msg      | string | 对该请求的响应结果的详细描述       |
| msg_show | string | 对该请求的响应结果的描述, 用于展示 |

##### DELETE

下面是删除实例的 API 示例:

```
curl -X DELETE \
--url http://192.168.1.200:7070/console/third_party/8d545c3e8e7780b228b6dcc77561388b \
-H "Content-Type: application/json" \
-d '{"secret_key":"4FsL5PWK","ip":"192.168.1.107","is_online":true}'
```

执行完 curl 请求后, 会得到一个类似以下的响应:

```
{
    "msg": "success",
    "code": 200,
    "msg_show": "删除成功"
}
```

请求参数说明:

| 参数       | 是否必填 | 类型   | 说明                    |
| :--------- | :------- | :----- | :---------------------- |
| secret_key | 是       | string | 密钥                    |
| ip         | 是       | string | 服务实例地址, ipv4 格式 |

响应参数说明:

| 参数     | 类型   | 说明                               |
| :------- | :----- | :--------------------------------- |
| code     | int    | 业务码                             |
| msg      | string | 对该请求的响应结果的详细描述       |
| msg_show | string | 对该请求的响应结果的描述, 用于展示 |

PUT 和 DELETE 方法的请求内容的类型为 application/json

### 第三方服务创建示例

#### 对接内部服务

> 如 Rainbond 平台的 rbd-app-ui 或者 rbd-monitor 组件

<img src="https://static.goodrain.com/images/5.1/thirdparty-create/dsffwex1.jpg" width="100%" />

创建完成后,需要手动上线。

针对示例来说，如果不想对外开放 7070 端口或者想通过 80/443 访问控制台可以通过此方式实现。

#### 对接阿里云 RDS

Rainbond 针对第三方组件的域名实例进行了相应的支持，允许用户添加第三方组件域名实例地址，并提供 rainbond 平台的对内服务。
结合域名可以解析到多个 IP 地址上这样一个现有的逻辑，rainbond 平台仅允许添加一个域名实例地址到第三方组件中。

静态注册方式

在创建静态第三方组件的过程中，会有地址校验的逻辑，如果用户填写的地址有多个，并且域名地址个数大于等于 1 个，则不能通过校验。
换句话说，以域名方式添加的第三方服务只能添加 1 个域名实例地址。

动态注册方式

在创建动态第三方组件的过程中，特别是 etcd 这样的动态发现的方式添加实例地址时，同样会有地址的校验逻辑，如果发现数据中包含域名，则会使用第一个域名作为第三方组件的实例地址。

调整流程和对接平台内部服务一样，有几点需要注意，如果平台应用需要依赖第三服务安装的 MYSQL,需要开启对内访问，同时需要手动添加应用连接信息。

<img src="https://static.goodrain.com/images/5.1/thirdparty-create/dsffwex2.jpg" width="100%" />
