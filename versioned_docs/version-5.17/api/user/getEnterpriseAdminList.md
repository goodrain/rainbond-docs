---
title: 获取企业管理员列表
---

## 基本信息

获取企业管理员列表

```json title="请求路径"
GET /openapi/v1/administrators
```


## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|eid|query|string| 否 |企业ID|
|page|query|string| 否 |页码|
|page_size|query|string| 否 |每页数量|


```json title="返回成功示例"
{
  "users": [
    {
      "user_id": 20,
      "create_time": "1989-05-01 04:39:15",
      "origion": null,
      "nick_name": "熊强",
      "client_ip": "191.197.77.228",
      "email": "t.mlnkciau@qq.com",
      "is_active": true,
      "phone": "18671541879",
      "enterprise_id": "18"
    },
    {
      "user_id": 26,
      "phone": "13176190182",
      "create_time": "2016-10-15 03:28:33",
      "client_ip": "111.143.107.142",
      "is_active": true,
      "nick_name": "高秀英",
      "email": "e.ebvmwo@qq.com",
      "enterprise_id": "71",
      "origion": ""
    }
  ],
  "total": 7
}
```

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ListUsersRespView](#listusersrespview)|

## 模型

### ListUsersRespView

```json
{
  "users": [
    {
      "user_id": 0,
      "email": "string",
      "nick_name": "string",
      "phone": "string",
      "is_active": true,
      "origion": "string",
      "create_time": "string",
      "client_ip": "string",
      "enterprise_id": "string"
    }
  ],
  "total": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|users|[[UserInfo](/docs/api/user/getUserInfo#userinfo)]|true|none||none|
|total|integer|true|none|Total|none|