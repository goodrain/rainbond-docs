---
title: 获取事件日志
---

## 基本信息

该接口主要用于获取事件日志

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/events/{event_id}/logs
```

## 请求参数

| 名称        | 位置 | 类型   | 必选 | 中文名 | 说明         |
| ----------- | ---- | ------ | ---- | ------ | ------------ |
| team_id     | path | string | 是   |        | 团队ID、名称 |
| region_name | path | string | 是   |        | 数据中心名称 |
| event_id    | path | string | 是   |        | 事件ID       |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamEventLog](#schemateameventlog)   |

## 模型

### TeamEventLog<a id="schemateameventlog"></a>

```json
{
  "logs": [
    {
      "message": "string",
      "time": "string",
      "utime": 0
    }
  ]
}
```

### 属性

| 名称 | 类型                                             | 必选  | 约束 | 中文名 | 说明     |
| ---- | ------------------------------------------------ | ----- | ---- | ------ | -------- |
| logs | [[EventLogMessage](#schemaeventlogmessage)]¦null | false | none |        | 日志信息 |

### EventLogMessage<a id="schemaeventlogmessage"></a>

```json
{
  "message": "string",
  "time": "string",
  "utime": 0
}
```

### 属性

| 名称    | 类型         | 必选  | 约束 | 中文名  | 说明     |
| ------- | ------------ | ----- | ---- | ------- | -------- |
| message | string¦null  | false | none | Message | 日志信息 |
| time    | string¦null  | false | none | Time    | 日志时间 |
| utime   | integer¦null | false | none | Utime   | 时间戳   |
