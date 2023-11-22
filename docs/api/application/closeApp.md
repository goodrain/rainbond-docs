---
title: 批量关闭应用
---

## 基本信息
该接口主要用于批量关闭应用

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/close
```

```json title="Body 请求体示例"
{
  "service_ids": [
    "string"
  ]
}
```

## 请求参数

| 名称        | 位置 | 类型                                                        | 必选 | 中文名 | 说明 |
| ----------- | ---- | ----------------------------------------------------------- | ---- | ------ | ---- |
| team_id     | path | string                                                      | 是   |        | none |
| region_name | path | string                                                      | 是   |        | none |
| body        | body | [TeamAppsCloseSerializers](#schemateamappscloseserializers) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                                   | 说明 | 数据模型                                                    |
| ------ | ------------------------------------------------------------ | ---- | ----------------------------------------------------------- |
| 201    | Created | 成功 | [TeamAppsCloseSerializers](#schemateamappscloseserializers) |

```json title="响应示例"
{
  "service_ids": [
    "string"
  ]
}
```

## 模型

### TeamAppsCloseSerializers<a id="schemateamappscloseserializers"></a>

```json
{
  "service_ids": [
    "string"
  ]
}
```

### 属性

| 名称        | 类型     | 必选  | 约束 | 中文名 | 说明 |
| ----------- | -------- | ----- | ---- | ------ | ---- |
| service_ids | [string] | false | none |        | none |
