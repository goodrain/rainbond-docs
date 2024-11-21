---
title: 更新用户信息
---

## 基本信息

```json title="请求路径"
PUT /openapi/v1/users/{user_id}
```

> 

```json title="Body请求参数"
{
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true
}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user_id|path|string| 是 |none|
|body|body|[UpdateUser](#UpdateUser)| 否 |none|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[UpdateUser](#UpdateUser)|

## 模型

### UpdateUser

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|password|string|false|none|Password|密码|
|enterprise_id|string|false|none|Enterprise id|enterprise_id|
|email|string(email)|false|none|Email|邮件地址|
|phone|string|false|none|Phone|手机号码|
|is_active|boolean¦null|false|none|Is active|激活状态|

### 属性

```json
{
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true
}

```

