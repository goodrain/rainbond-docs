---
title: 操作应用
---

## 基本信息
该接口主要用于批量操作应用下的组件，支持启动、停止、更新、构建

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/operations
```

```json title="Body 请求体示例"
{
  "action": "stop",
  "service_ids": [
    "string"
  ]
}
```

## 请求参数

| 名称        | 位置 | 类型                                                    | 必选 | 中文名 | 说明   |
| ----------- | ---- | ------------------------------------------------------- | ---- | ------ | ------ |
| app_id      | path | integer                                                 | 是   |        | 应用id |
| team_id     | path | string                                                  | 是   |        | none   |
| region_name | path | string                                                  | 是   |        | none   |
| body        | body | [ServiceGroupOperations](#schemaservicegroupoperations) | 否   |        | none   |

## 返回结果

| 状态码 | 状态码含义                                                   | 说明 | 数据模型                  |
| ------ | ------------------------------------------------------------ | ---- | ------------------------- |
| 200    | OK      | 成功 | Success |

## 返回数据结构

```json title="响应示例"

```

## 模型
### ServiceGroupOperations<a id="schemaservicegroupoperations"></a>

```json
{
  "action": "stop",
  "service_ids": [
    "string"
  ]
}
```

### 属性

| 名称        | 类型     | 必选  | 约束 | 中文名 | 说明                                   |
| ----------- | -------- | ----- | ---- | ------ | -------------------------------------- |
| action      | string   | true  | none | Action | 操作类型                               |
| service_ids | [string] | false | none |        | 组件ID列表，不传值则操作应用下所有组件 |

#### 枚举值

| 属性   | 值      |
| ------ | ------- |
| action | stop    |
| action | start   |
| action | upgrade |
| action | deploy  |
