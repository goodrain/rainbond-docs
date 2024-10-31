---
title: 修改个人账号密码
---

## 基本信息

修改个人账号密码

```json title="请求路径"
PUT /openapi/v1/changepwd
```

```json title="Body请求参数"
{
  "password": "stringst",
  "password1": "stringst"
}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[ChangePassWd](#changepasswd)| 否 |none|

> 返回示例

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ChangePassWd](#changepasswd)|

## 模型

### ChangePassWd

```json
{
  "password": "stringst",
  "password1": "stringst"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|password|string|true|none|Password|新密码|
|password1|string|true|none|Password1|再次确认新密码|