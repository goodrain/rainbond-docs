---
title: 删除企业管理员
---

## 基本信息

删除企业管理员

```json title="请求路径"
DELETE /openapi/v1/administrators/{user_id}
```


## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user_id|path|string| 是 |none|

> 返回示例

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|400|[Fail](#fail)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|404|[Fail](#fail)|

## 模型

### Fail

```json
{
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|msg|string|true|none|Msg|none|