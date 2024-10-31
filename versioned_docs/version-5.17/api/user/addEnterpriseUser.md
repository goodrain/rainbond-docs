---
title: 添加企业用户
---


## 基本信息

添加企业用户

```json title="请求路径"
POST /openapi/v1/administrators
```

```json title="Body请求参数"
{
  "user_id": "string",
  "eid": "string"
}
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CreateAdminUserReq](#createadminuserreq)| 否 |none|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|成功|[CreateAdminUserReq](#createadminuserreq)|

## 模型

### CreateAdminUserReq

```json
{
  "user_id": "string",
  "eid": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|string|true|none|User id|用户ID|
|eid|string|true|none|Eid|企业ID|