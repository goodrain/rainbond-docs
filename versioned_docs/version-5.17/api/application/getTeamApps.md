---
title: 获取团队应用列表
---

## 基本信息
该接口主要用于获取团队下所有应用列表

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|team_id|path|string| 是 ||none|
|region_name|path|string| 是 ||none|
|query|query|string| 否 ||搜索查询应用名称，团队名称|

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|Inline|

## 返回数据结构

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[AppBaseInfo](#schemaappbaseinfo)]|false|none||none|
|» ID|integer|false|read-only|ID|none|
|» tenant_id|string|true|none|Tenant id|租户id|
|» group_name|string|true|none|Group name|组名|
|» region_name|string|true|none|Region name|区域中心名称|
|» is_default|boolean|false|none|Is default|默认组件|
|» order_index|integer|false|none|Order index|应用排序|
|» note|string¦null|false|none|Note|备注|
|» username|string¦null|false|none|Username|the username of principal|
|» governance_mode|string¦null|false|none|Governance mode|governance mode|
|» create_time|string(date-time)|true|none|Create time|创建时间|
|» update_time|string(date-time)|true|none|Update time|更新时间|
|» app_type|string|false|none|App type|应用类型|
|» app_store_name|string¦null|false|none|App store name|应用商店名称|
|» app_store_url|string¦null|false|none|App store url|应用商店 URL|
|» app_template_name|string¦null|false|none|App template name|应用模板名称|
|» version|string¦null|false|none|Version|Helm 应用版本|
|» logo|string¦null|false|none|Logo|应用logo|
|» k8s_app|string|false|none|K8s app|集群内应用名称|

```json title="响应示例"
[
  {
    "ID": 3,
    "tenant_id": "string",
    "group_name": "string",
    "region_name": "string",
    "is_default": true,
    "order_index": 3,
    "note": "string",
    "username": "string",
    "governance_mode": "string",
    "create_time": "2004-01-01 11:11:11",
    "update_time": "2004-01-01 11:11:11",
    "app_type": "string",
    "app_store_name": "string",
    "app_store_url": "string",
    "app_template_name": "string",
    "version": "string",
    "logo": "string",
    "k8s_app": "string"
  }
]
```

## 模型

### AppBaseInfo<a id="schemaappbaseinfo"></a>

```json
{
  "ID": 0,
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14:15:22Z",
  "update_time": "2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

### 属性

| 名称              | 类型              | 必选  | 约束      | 中文名            | 说明                      |
| ----------------- | ----------------- | ----- | --------- | ----------------- | ------------------------- |
| ID                | integer           | false | read-only | ID                | none                      |
| tenant_id         | string            | true  | none      | Tenant id         | 租户id                    |
| group_name        | string            | true  | none      | Group name        | 组名                      |
| region_name       | string            | true  | none      | Region name       | 区域中心名称              |
| is_default        | boolean           | false | none      | Is default        | 默认组件                  |
| order_index       | integer           | false | none      | Order index       | 应用排序                  |
| note              | string¦null       | false | none      | Note              | 备注                      |
| username          | string¦null       | false | none      | Username          | 应用负责人 |
| governance_mode   | string¦null       | false | none      | Governance mode   | 应用治理模式           |
| create_time       | string(date-time) | true  | none      | Create time       | 创建时间                  |
| update_time       | string(date-time) | true  | none      | Update time       | 更新时间                  |
| app_type          | string            | false | none      | App type          | 应用类型                  |
| app_store_name    | string¦null       | false | none      | App store name    | 应用商店名称              |
| app_store_url     | string¦null       | false | none      | App store url     | 应用商店 URL              |
| app_template_name | string¦null       | false | none      | App template name | 应用模板名称              |
| version           | string¦null       | false | none      | Version           | Helm 应用版本             |
| logo              | string¦null       | false | none      | Logo              | 应用logo                  |
| k8s_app           | string            | false | none      | K8s app           | 集群内应用名称            |
