---
title: 添加普通用户
---


## 基本信息

添加普通用户

```json title="请求路径"
POST /openapi/v1/users
```

```json title="Body请求参数"
{
  "nick_name": "string",
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true,
  "origion": "string"
}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CreateUser](#createuser)| 否 |none|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|成功|[CreateUser](#createuser)|


## 模型

## createuser

```json
{
  "nick_name": "string",
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true,
  "origion": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|nick_name|string|true|none|Nick name|用户昵称|
|password|string|true|none|Password|密码|
|enterprise_id|string|true|none|Enterprise id|enterprise_id|
|email|string(email)|false|none|Email|邮件地址|
|phone|string|false|none|Phone|手机号码|
|is_active|boolean|false|none|Is active|激活状态|
|origion|string|false|none|Origion|用户来源|