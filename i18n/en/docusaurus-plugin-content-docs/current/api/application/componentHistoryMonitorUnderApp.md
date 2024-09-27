---
title: Application component history monitoring
---

## 基本信息

This interface is mainly used to obtain monitoring data of the component prometheus under an application for a period of time

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/monitor/query_range
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate                                        |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------------------------------------------- |
| team_id     | path     | string  | Yes      |              | Team ID, name                                     |
| region_name | path     | string  | Yes      |              | data center name                                  |
| app_id      | path     | integer | Yes      |              | app id                                            |
| start                            | path     | number  | Yes      |              | start timestamp                                   |
| end                              | path     | number  | Yes      |              | end timestamp                                     |
| step                             | path     | number  | Yes      |              | step size (default 60)         |
| is_outer    | query    | string  | no       |              | Whether to get only external component monitoring |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                 | type                                                                                                                                   | required | constraint | Chinese name  | illustrate         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------- | ------------------ |
| _anonymous_                          | [[ComponentMonitorSerializers](#schemacomponentmonitorserializers)]                | false    | none       |               | none               |
| » monitors                           | [[ComponentMonitorItemsSerializers](#schemacomponentmonitoritemsserializers)]¦null | false    | none       |               | none               |
| »» data                              | [Data](#schemadata)                                                                                                                    | false    | none       | Data          | none               |
| »»» resultType                       | string                                                                                                                                 | false    | none       | Resulttype    | return type        |
| »»» result                           | [[MonitorDataSerializers](#schemamonitordataserializers)]                          | true     | none       |               | none               |
| »»»» value                           | [string]                                                                           | true     | none       |               | none               |
| »» monitor_item | string                                                                                                                                 | true     | none       | Monitor item  | Monitoring item    |
| »» status                            | string                                                                                                                                 | false    | none       | Status        | monitor status     |
| » service_id    | string                                                                                                                                 | true     | none       | Service id    | component id       |
| » service_cname | string                                                                                                                                 | true     | none       | Service cname | component name     |
| » service_alias | string                                                                                                                                 | true     | none       | Service alias | component nickname |

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
    "service_alias": "string "
  }
]
```

## Model

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

### Attributes

| name                               | type                                                                                                                                   | required | constraint | Chinese name  | illustrate         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------- | ------------------ |
| monitors                           | [[ComponentMonitorItemsSerializers](#schemacomponentmonitoritemsserializers)]¦null | false    | none       |               | none               |
| service_id    | string                                                                                                                                 | true     | none       | Service id    | component id       |
| service_cname | string                                                                                                                                 | true     | none       | Service cname | component name     |
| service_alias | string                                                                                                                                 | true     | none       | Service alias | component nickname |

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
  "monitor_item": "string ",
  "status": "string"
}
```

### Attributes

| name                              | type                | required | constraint | Chinese name | illustrate      |
| --------------------------------- | ------------------- | -------- | ---------- | ------------ | --------------- |
| data                              | [Data](#schemadata) | false    | none       |              | none            |
| monitor_item | string              | true     | none       | Monitor item | Monitoring item |
| status                            | string              | false    | none       | Status       | monitor status  |

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

### Attributes

| name       | type                                                                                                          | required | constraint | Chinese name | illustrate  |
| ---------- | ------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ----------- |
| resultType | string                                                                                                        | false    | none       | Resulttype   | return type |
| result     | [[MonitorDataSerializers](#schemamonitordataserializers)] | true     | none       |              | none        |

### MonitorDataSerializers<a id="schemamonitordataserializers"></a>

```json
{
  "value": [
    "string"
  ]
}
```

### Attributes

| name  | type                                                         | required | constraint | Chinese name | illustrate |
| ----- | ------------------------------------------------------------ | -------- | ---------- | ------------ | ---------- |
| value | [string] | true     | none       |              | none       |
