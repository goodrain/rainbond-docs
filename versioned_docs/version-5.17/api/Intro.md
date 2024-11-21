---
title: 如何使用 OpenAPI
slug: /Intro
---

## 如何调用控制台 OpenAPI

1. 在调用控制台 OpenAPI 前，需要用户在平台右上角，点击个人中心-访问令牌-新增，创建访问令牌用于授权
2. 在调用控制台 OpenAPI 前，确保已获取 API 所需的访问令牌，并加入到请求 Header 中
3. OpenAPI 文档中只展示相对路径，如 `/openapi/v1/administrators`，不展示实际请求路径。需要将你的控制台访问地址作为与路径拼凑起来，形成完整地址。如 `http://192.168.2.225:7070/openapi/v1/administrators`

## OpenAPI 文档约定格式

控制台 OpenAPI 文档格式主要如下：

```
请求：
    基本信息: 介绍 API 是干什么的
    请求方法: 介绍 API 所需要的请求方法（POST、PUT、DELETE、GET等）
    请求参数: API 所使用的路径参数和查询参数的简要说明
    请求体: 这部分参数需要放在 HTTP 请求的 Body 中，一般为 JSON 格式
    请求体示例: 对应 API 的成功请求参数的样例
响应：
    响应体: 一次 API 调用后，HTTP 响应中 Body 部分的内容
    响应体示例: API 成功请求结果的样例
```

## OpenAPI 通用参数说明

以下参数是在调用平台时，经常会使用到的路径参数的说明。

|名称|位置|类型|中文名|说明|
|---|---|---|---|---|
|team_id|path|string|团队ID|标识某一个团队的ID，32位字符串|
|app_id|path|int|应用ID|标识某个应用，整型|
|service_id|path|string|组件ID|标识某一个组件的ID，32位字符串|
|region_name|path|string|集群唯一标识|标识某个集群的名称，在企业下唯一，用户自定义值|
|user_id|path|int|用户ID|标识某一个用户的ID，整型

## 参数的获取以及接口示例

Rainbond主要分四个视图：企业视图、团队视图、应用视图、组件视图，因此 Openapi 文档也按照此逻辑进行组织。

下面介绍具体请求样例：

### 获取企业下团队列表

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/teams' -H 'Authorization: <此处请填写从控制台获取的访问令牌>'
```

#### 响应结果示例

此处的 `tenant_id` 即对应 `team_id` 的值

```json
{
    "tenants":[
        {
            "ID":1,
            "tenant_id":"8e5a07dd37e34dd7a2a74b0a2ab29d95",
            "tenant_name":"o19p6wen",
            "tenant_alias":"admin的团队",
            "is_active":true,
            "enterprise_id":"f246bce23170eeaac90d6f7b150793f0",
            "create_time":"2022-06-01T13:52:13.321196",
            "creater":"admin",
            "role_infos":[
                {
                    "role_id":"1",
                    "role_name":"管理员"
                }
            ]
        }
    ],
    "total":1,
    "page":1,
    "page_size":10
}
```

### 获取集群列表

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/regions' -H 'Authorization: <此处请填写从控制台获取的访问令牌>'
```

#### 响应结果示例

此处的 `region_name` 即对应集群唯一标识

```json
[
    {
        "region_id":"febc993cefe84d158b3ac245d7aa0943",
        "region_name":"test",
        "region_alias":"自建集群",
        "url":"https://192.168.2.225:8443",
        "status":"1",
        "desc":"提供主机安装 Kubernetes 集群并对接",
        "scope":"private",
        "ssl_ca_cert":null,
        "cert_file":null,
        "key_file":null
    }
]
```

### 获取应用列表

`team_id` 与 `region_name` 请填写上述两个接口获取到的响应值

```bash
curl -X GET 'http://192.168.2.225:7070/openapi/v1/teams/{team_id}/regions/{region_name}/apps' -H 'Authorization: <此处请填写从控制台获取的访问令牌>'
```

#### 响应结果示例

此处的 `ID` 即对应 `app_id`

```json
[
    {
        "ID":1,
        "tenant_id":"8e5a07dd37e34dd7a2a74b0a2ab29d95",
        "group_name":"测试应用",
        "region_name":"test",
        "is_default":true,
        "order_index":0,
        "note":"",
        "username":"",
        "governance_mode":"BUILD_IN_SERVICE_MESH",
        "create_time":"2022-06-01T13:52:13.407637",
        "update_time":"2022-06-15T15:37:51.020167",
        "app_type":"rainbond",
        "app_store_name":null,
        "app_store_url":null,
        "app_template_name":null,
        "version":null,
        "logo":"",
        "k8s_app":"app-38b4d14a"
    }
]
```

### 构建组件

根据以上接口请求示例，我们可以继续寻找到对应的 `service_id` ，从而对组件进行操作。此处以构建组件为例

```bash
curl -X POST 'http://192.168.2.225:7070/openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/build' -H 'Authorization: <此处请填写从控制台获取的访问令牌>'
```

#### 响应结果示例

```json
{
    "event_id": "5821167607ec460b89b326084fb3d1e0"
}
```
