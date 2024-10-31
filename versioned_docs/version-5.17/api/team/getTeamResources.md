---
title: 获取团队资源统计列表
---

## 基本信息

该接口主要用于获取团队资源统计列表

```shell title="请求路径"
POST /openapi/v1/teams/resource
```

```json title="Body 请求体示例"
[
  {
    "tenant_id": "string",
    "region_name": "string"
  }
]
```

## 请求参数

| 名称 | 位置 | 类型                                        | 必选 | 中文名 | 说明 |
| ---- | ---- | ------------------------------------------- | ---- | ------ | ---- |
| body | body | [TenantRegionList](#schematenantregionlist) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |


## 返回数据结构

| 名称                     | 类型                                          | 必选  | 约束 | 中文名                 | 说明           |
| ------------------------ | --------------------------------------------- | ----- | ---- | ---------------------- | -------------- |
| *anonymous*              | [[TeamAppsResource](#schemateamappsresource)] | false | none |                        | none           |
| » total_cpu              | integer                                       | false | none | Total cpu              | cpu总额        |
| » total_memory           | integer                                       | false | none | Total memory           | 内存总额       |
| » used_cpu               | integer                                       | false | none | Used cpu               | 占用cpu        |
| » used_memory            | integer                                       | false | none | Used memory            | 占用内存       |
| » used_cpu_percentage    | number                                        | false | none | Used cpu percentage    | 占用cpu百分比  |
| » used_memory_percentage | number                                        | false | none | Used memory percentage | 占用内存百分比 |
| » team_id                | string                                        | true  | none | Team id                | 团队ID         |
| » team_name              | string                                        | true  | none | Team name              | 团队名称       |
| » team_alias             | string                                        | true  | none | Team alias             | 团队昵称       |

```json title="响应示例"
[
  {
    "total_cpu": 0,
    "total_memory": 0,
    "used_cpu": 0,
    "used_memory": 0,
    "used_cpu_percentage": 0,
    "used_memory_percentage": 0,
    "team_id": "string",
    "team_name": "string",
    "team_alias": "string"
  }
]
```

## 模型

### TenantRegionList<a id="schematenantregionlist"></a>

```json
{
  "tenant_id": "string",
  "region_name": "string"
}
```

### 属性

| 名称        | 类型   | 必选 | 约束 | 中文名      | 说明         |
| ----------- | ------ | ---- | ---- | ----------- | ------------ |
| tenant_id   | string | true | none | Tenant id   | 租户id       |
| region_name | string | true | none | Region name | 数据中心名称 |

### TeamAppsResource<a id="schemateamappsresource"></a>

```json
{
  "total_cpu": 0,
  "total_memory": 0,
  "used_cpu": 0,
  "used_memory": 0,
  "used_cpu_percentage": 0,
  "used_memory_percentage": 0,
  "team_id": "string",
  "team_name": "string",
  "team_alias": "string"
}
```

### 属性

| 名称                   | 类型    | 必选  | 约束 | 中文名                 | 说明           |
| ---------------------- | ------- | ----- | ---- | ---------------------- | -------------- |
| total_cpu              | integer | false | none | Total cpu              | cpu总额        |
| total_memory           | integer | false | none | Total memory           | 内存总额       |
| used_cpu               | integer | false | none | Used cpu               | 占用cpu        |
| used_memory            | integer | false | none | Used memory            | 占用内存       |
| used_cpu_percentage    | number  | false | none | Used cpu percentage    | 占用cpu百分比  |
| used_memory_percentage | number  | false | none | Used memory percentage | 占用内存百分比 |
| team_id                | string  | true  | none | Team id                | 团队ID         |
| team_name              | string  | true  | none | Team name              | 团队名称       |
| team_alias             | string  | true  | none | Team alias             | 团队昵称       |
