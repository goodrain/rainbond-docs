---
title: 应用下组件实时监控
---

## 基本信息

该接口主要用于获取某个应用下组件 prometheus 的监控数据

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/monitor/query
```

## 请求参数

| 名称        | 位置  | 类型    | 必选 | 中文名 | 说明                   |
| ----------- | ----- | ------- | ---- | ------ | ---------------------- |
| app_id      | path  | integer | 是   |        | 应用id                 |
| team_id     | path  | string  | 是   |        | none                   |
| region_name | path  | string  | 是   |        | none                   |
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
                    "resultType": "vector",
                    "result": [
                        {
                            "value": [
                                "1655531430.126",
                                "0"
                            ]
                        }
                    ]
                },
                "monitor_item": "request_client",
                "status": "success"
            }
        ],
        "service_id": "8377bede3b344e3daa96563a55516625",
        "service_cname": "Mysql5.5(单机)",
        "service_alias": "gr516625"
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

