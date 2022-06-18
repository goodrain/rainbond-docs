---
title: 获取用户信息
---

## 基本信息

根据用户ID获取用户信息

```json title="请求路径"
GET /openapi/v1/users/{user_id}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user_id|path|string| 是 |none|



## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[UserInfo](#UserInfo)|


## 模型

### UserInfo

```json
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

```
### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none|User id|none|
|email|string¦null|false|none|Email|邮件地址|
|nick_name|string|false|none|Nick name|用户昵称|
|phone|string¦null|false|none|Phone|手机号码|
|is_active|boolean|false|none|Is active|激活状态|
|origion|string¦null|false|none|Origion|用户来源|
|create_time|string|false|none|Create time|创建时间|
|client_ip|string¦null|false|none|Client ip|注册ip|
|enterprise_id|string|false|none|Enterprise id|enterprise_id|



