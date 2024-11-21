---
title: 获取团队总览信息
---

## 基本信息

该接口主要用于获取团队总览信息

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/overview
```

## 请求参数

| 名称        | 位置 | 类型   | 必选 | 中文名 | 说明 |
| ----------- | ---- | ------ | ---- | ------ | ---- |
| team_id     | path | string | 是   |        | none |
| region_name | path | string | 是   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamAppsResource](#schemateamappsresource)   |

## 模型

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
