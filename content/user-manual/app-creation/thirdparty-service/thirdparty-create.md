---
title: 第三方服务创建
Description: 讲解Rainbond支持第三方服务的创建方式和流程
Weight: 3
Hidden: true

---

### 第三方服务创建

第三方服务创建依然存在两个入口，分别是平台左侧导航的 创建应用-添加第三方服务 和应用Dashboard页面的添加第三方服务按钮，创建流程一致。

#### 创建静态第三方服务

* 选择服务注册方式为静态注册

* 填写服务的通信地址

  比如服务有两个运行实例，IP地址分别是192.168.0.1 192.168.0.2，为了设置方便，我们可以填写第一个实例时携带上端口配置，即提供如下的数据，告知Rainbond服务的监听端口是8080，且都一致。

  > 192.168.0.1:8080
  >
  > 192.168.0.2

* 提交创建，进入到服务的Dashboard页面对服务端口、连接信息、健康检查属性进行配置 [参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)


#### 创建动态第三方服务

- 选择服务注册方式为动态注册
- 选择动态注册类型
- 填写地址, Key 等服务注册中心的信息(用户名和密码为非必选项)
- 提交创建，进入到服务的 Dashboard 页面对服务端口、连接信息、健康检查属性进行配置。 [参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)

##### 服务注册中心中数据的格式
以 etcd 为例:
```bash
/rainbond/service1/3201a2727b6445e9a9234a26284549e6
{"ip":"192.168.0.1", "port": 5000}
/rainbond/service1/728d17f86a5f3d834b6db984dd4a50ad
{"ip":"192.168.0.2"}
```
这是注册在 etcd 中的两条信息, 每一条代表一个第三方服务的实例. 其中 `/rainbond/service1` 为上面填写的服务注册中心的信息的 Key, `3201a2727b6445e9a9234a26284549e6` 为这条数据的唯一标识(uuid), 以斜杠分割.

`{"ip":"192.168.0.107", "port": 5000}` 为第三方服务的实例的 IP 地址和端口. 如果没有提供端口, 那么 Rainbond 将会取你在[参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)中添加的端口.

#### 创建基于API注册的第三方服务

* 选择服务注册方式为 API 注册

* 提交创建，进入到服务的Dashboard页面对服务端口、连接信息、健康检查属性进行配置 [参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)

* 创建完成后, 可以根据总览页面中展示的`API地址`和`密钥`, 通过调用 API 的方式, 动态的更改服务的通信地址.

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

|参数|是否必填|说明|
|:---|:---|:---|
|secret_key|是|密钥, 可以从[参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)的总览页中获取|

响应参数说明:

|参数|类型|说明|
|:---|:---|:---|
|code|int|业务码|
|msg|string|对该请求的响应结果的详细描述|
|msg_show|string|对该请求的响应结果的描述, 用于展示|
|status|string|实例的状态, 可能的值为: healthy, unhealthy, unknown|
|ip|string|实例的 IP 地址|
|is_static|bool|实例是否属于静态类型, true: 静态类型; false: 动态类型|
|is_online|bool|实例是否处于上线状态, true: 已上线; false: 已下线|

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

|参数|是否必填|类型|说明|
|:---|:---|:---|:---|
|secret_key|是|string|密钥, 可以从[参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)的总览页中获取|
|ip|是|string|服务实例地址, ipv4 格式|
|is_online|否|bool|是否上线, 默认 true|

响应参数说明:

|参数|类型|说明|
|:---|:---|:---|
|code|int|业务码|
|msg|string|对该请求的响应结果的详细描述|
|msg_show|string|对该请求的响应结果的描述, 用于展示|

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

|参数|是否必填|类型|说明|
|:---|:---|:---|:---|
|secret_key|是|string|密钥, 可以从[参考第三方服务管理](/user-manual/app-service-manage/thirdparty-manage/)的总览页中获取|
|ip|是|string|服务实例地址, ipv4 格式|

响应参数说明:

|参数|类型|说明|
|:---|:---|:---|
|code|int|业务码|
|msg|string|对该请求的响应结果的详细描述|
|msg_show|string|对该请求的响应结果的描述, 用于展示|

{{% notice note %}}
PUT 和 DELETE 方法的请求内容的类型为 application/json
{{% /notice %}}

### 第三方服务创建示例

#### 对接内部服务

> 如Rainbond平台的rbd-app-ui或者rbd-monitor组件

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/thirdparty-create/dsffwex1.jpg" width="100%" />

创建完成后,需要手动上线。

针对示例来说，如果不想对外开放7070端口或者想通过80/443访问控制台可以通过此方式实现。

#### 对接阿里云RDS

{{% notice info %}}
目前不支持添加第三方服务地址为域名，将在下个版本里支持。
{{% /notice %}}

调整流程和对接平台内部服务一样，有几点需要注意，如果平台应用需要依赖第三服务安装的MYSQL,需要开启对内访问，同时需要手动添加应用连接信息。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/thirdparty-create/dsffwex2.jpg" width="100%" />
