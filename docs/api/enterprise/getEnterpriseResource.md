---
title: 获取企业使用资源信息
---

## 基本信息

获取企业使用资源信息

```json title="请求路径"
GET /openapi/v2/manage/enterprises/{eid}/resource
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|eid|path|string| 是 |none|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[EnterpriseSource](#enterprisesource)|

## 模型

### EnterpriseSource

```json
{
  "enterprise_id": "string",
  "used_cpu": 0,
  "used_memory": 0,
  "used_disk": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|enterprise_id|string|true|none|Enterprise id|企业ID(联合云ID)|
|used_cpu|number|true|none|Used cpu|使用的cpu|
|used_memory|number|true|none|Used memory|使用的内存|
|used_disk|number|true|none|Used disk|使用的存储|