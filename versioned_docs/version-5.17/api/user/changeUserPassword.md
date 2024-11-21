---
title: 修改用户密码
---

## 基本信息

修改用户密码

```json title="请求路径"
PUT /openapi/v1/users/{user_id}/changepwd
```

```json title="Body请求参数"
{
  "user_id": 0,
  "password": "stringst",
  "password1": "stringst"
}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user_id|path|string| 是 |none|
|body|body|[ChangePassWdUser](#changepasswduser)| 否 |none|

> 返回示例

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ChangePassWdUser](#changepasswduser)|

## 模型

### changepasswduser

```json
{
  "user_id": 0,
  "password": "stringst",
  "password1": "stringst"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none|User id|user_id|
|password|string|true|none|Password|新密码|
|password1|string|true|none|Password1|再次确认新密码|