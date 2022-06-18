---
title: 获取用户列表
---

## 基本信息

获取用户列表

```json title="请求路径"
GET /openapi/v1/users
```


## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|query|query|string| 否 |用户名、邮箱、手机号搜索|
|page|query|string| 否 |页码|
|page_size|query|string| 否 |每页数量|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ListUsersRespView](#listusersrespview)|


## 模型

### listusersrespview

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
