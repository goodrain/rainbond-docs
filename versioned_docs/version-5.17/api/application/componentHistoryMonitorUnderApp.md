---
title: 应用下组件历史监控
---

## 基本信息

该接口主要用于获取某个应用下组件 prometheus 一段时间内的监控数据

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/monitor/query_range
```

## 请求参数

| 名称        | 位置  | 类型    | 必选 | 中文名 | 说明                   |
| ----------- | ----- | ------- | ---- | ------ | ---------------------- |
| team_id     | path  | string  | 是   |        | 团队ID、名称           |
| region_name | path  | string  | 是   |        | 数据中心名称           |
| app_id      | path  | integer | 是   |        | 应用id                 |
| start       | path  | number  | 是   |        | 起始时间戳             |
| end         | path  | number  | 是   |        | 结束时间戳             |
| step        | path  | number  | 是   |        | 步长（默认60）         |
| is_outer    | query | string  | 否   |        | 是否只获取对外组件监控 |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | Inline   |

## 返回数据结构

| 名称            | 类型                                                         | 必选  | 约束 | 中文名        | 说明     |
| --------------- | ------------------------------------------------------------ | ----- | ---- | ------------- | -------- |
| *anonymous*     | [[ComponentMonitorSerializers](#schemacomponentmonitorserializers)] | false | none |               | none     |
| » monitors      | [[ComponentMonitorItemsSerializers](#schemacomponentmonitoritemsserializers)]¦null | false | none |               | none     |
| »» data         | [Data](#schemadata)                                          | false | none | Data          | none     |
| »»» resultType  | string                                                       | false | none | Resulttype    | 返回类型 |
| »»» result      | [[MonitorDataSerializers](#schemamonitordataserializers)]    | true  | none |               | none     |
| »»»» value      | [string]                                                     | true  | none |               | none     |
| »» monitor_item | string                                                       | true  | none | Monitor item  | 监控项   |
| »» status       | string                                                       | false | none | Status        | 监控状态 |
| » service_id    | string                                                       | true  | none | Service id    | 组件id   |
| » service_cname | string                                                       | true  | none | Service cname | 组件名   |
| » service_alias | string                                                       | true  | none | Service alias | 组件昵称 |

```json title="响应示例"
[
  {
    "monitors": [
      {
        "data": {
          "resultType": "string",
          "result": [
            {
              "value": [
                "string"
              ]
            }
          ]
        },
        "monitor_item": "string",
        "status": "string"
      }
    ],
    "service_id": "string",
    "service_cname": "string",
    "service_alias": "string"
  }
]
```

## 模型

### ComponentMonitorSerializers<a id="schemacomponentmonitorserializers"></a>

```json
{
  "monitors": [
    {
      "data": {
        "resultType": "string",
        "result": [
          {
            "value": null
          }
        ]
      },
      "monitor_item": "string",
      "status": "string"
    }
  ],
  "service_id": "string",
  "service_cname": "string",
  "service_alias": "string"
}
```

### 属性

| 名称          | 类型                                                         | 必选  | 约束 | 中文名        | 说明     |
| ------------- | ------------------------------------------------------------ | ----- | ---- | ------------- | -------- |
| monitors      | [[ComponentMonitorItemsSerializers](#schemacomponentmonitoritemsserializers)]¦null | false | none |               | none     |
| service_id    | string                                                       | true  | none | Service id    | 组件id   |
| service_cname | string                                                       | true  | none | Service cname | 组件名   |
| service_alias | string                                                       | true  | none | Service alias | 组件昵称 |

### ComponentMonitorItemsSerializers<a id="schemacomponentmonitoritemsserializers"></a>

```json
{
  "data": {
    "resultType": "string",
    "result": [
      {
        "value": [
          "string"
        ]
      }
    ]
  },
  "monitor_item": "string",
  "status": "string"
}
```

### 属性

| 名称         | 类型                | 必选  | 约束 | 中文名       | 说明     |
| ------------ | ------------------- | ----- | ---- | ------------ | -------- |
| data         | [Data](#schemadata) | false | none |              | none     |
| monitor_item | string              | true  | none | Monitor item | 监控项   |
| status       | string              | false | none | Status       | 监控状态 |

### Data<a id="schemadata"></a>

```json
{
  "resultType": "string",
  "result": [
    {
      "value": [
        "string"
      ]
    }
  ]
}
```

### 属性

| 名称       | 类型                                                      | 必选  | 约束 | 中文名     | 说明     |
| ---------- | --------------------------------------------------------- | ----- | ---- | ---------- | -------- |
| resultType | string                                                    | false | none | Resulttype | 返回类型 |
| result     | [[MonitorDataSerializers](#schemamonitordataserializers)] | true  | none |            | none     |

### MonitorDataSerializers<a id="schemamonitordataserializers"></a>

```json
{
  "value": [
    "string"
  ]
}
```

### 属性

| 名称  | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ----- | -------- | ---- | ---- | ------ | ---- |
| value | [string] | true | none |        | none |

