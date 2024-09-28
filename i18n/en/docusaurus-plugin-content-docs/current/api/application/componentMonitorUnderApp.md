---
title: Real-time monitoring of components under the application
---

## 基本信息

This interface is mainly used to obtain the monitoring data of the component prometheus under an application

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/monitor/query
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate                                        |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------------------------------------------- |
| app_id      | path     | integer | Yes      |              | app id                                            |
| team_id     | path     | string  | Yes      |              | none                                              |
| region_name | path     | string  | Yes      |              | none                                              |
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
        "service_cname": "Mysql5.5 (single machine) )",
        "service_alias": "gr516625"
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
