---
title: 获取企业列表
---

## 基本信息

获取企业列表

```json title="请求路径"
GET /openapi/v2/manage/enterprises
```

## 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|query|query|string| 否 |按企业名称, 企业别名搜索|
|current|query|string| 否 |页码|
|pageSize|query|string| 否 |每页数量|


## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|[ListEntsResp](#listentsresp)|


## 模型

### ListEntsResp

```json
{
  "total": 0,
  "data": [
    {
      "enterprise_id": "string",
      "enterprise_name": "string",
      "enterprise_alias": "string",
      "create_time": "2019-08-24T14:15:22Z",
      "region_num": 0,
      "user_num": 0,
      "team_num": 0,
      "is_active": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|total|integer|true|none|Total|总数|
|data|[[EnterpriseListInfo](#schemaenterpriselistinfo)]|true|none||none|

