---
title: 获取需要复制的应用组件信息
---

## 基本信息
该接口主要用于获取需要复制的应用组件信息

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/copy
```

## 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|team_id|path|string| 是 ||none|
|region_name|path|string| 是 ||none|
|app_id|path|string| 是 ||none|

## 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|OK|成功|Inline|

## 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[[AppCopyL](#schemaappcopyl)]|false|none||none|
|» build_source|string|false|read-only|Build source|none|
|» update_time|string|true|none|Update time|更新日期|
|» deploy_version|string|true|none|Deploy version|构建版本|
|» create_status|string|true|none|Create status|创建状态|
|» service_alias|string|true|none|Service alias|组件昵称|
|» service_cname|string|true|none|Service cname|组件中文名称|
|» version|string|true|none|Version|版本|
|» service_type|string|true|none|Service type|组件类型|
|» service_id|string|true|none|Service id|id|
|» app_name|string|true|none|App name|应用名称|
|» min_memory|string|true|none|Min memory|组件运行内存|

## 模型

### AppCopyL<a id="schemaappcopyl"></a>

```json
{
  "build_source": "string",
  "update_time": "string",
  "deploy_version": "string",
  "create_status": "string",
  "service_alias": "string",
  "service_cname": "string",
  "version": "string",
  "service_type": "string",
  "service_id": "string",
  "app_name": "string",
  "min_memory": "string"
}
```

### 属性

| 名称           | 类型   | 必选  | 约束      | 中文名         | 说明         |
| -------------- | ------ | ----- | --------- | -------------- | ------------ |
| build_source   | string | false | read-only | Build source   | none         |
| update_time    | string | true  | none      | Update time    | 更新日期     |
| deploy_version | string | true  | none      | Deploy version | 构建版本     |
| create_status  | string | true  | none      | Create status  | 创建状态     |
| service_alias  | string | true  | none      | Service alias  | 组件昵称     |
| service_cname  | string | true  | none      | Service cname  | 组件中文名称 |
| version        | string | true  | none      | Version        | 版本         |
| service_type   | string | true  | none      | Service type   | 组件类型     |
| service_id     | string | true  | none      | Service id     | id           |
| app_name       | string | true  | none      | App name       | 应用名称     |
| min_memory     | string | true  | none      | Min memory     | 组件运行内存 |
