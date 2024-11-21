---
title: Application component history monitoring
---

## Basic Information

This interface is mainly used to obtain monitoring data of the component prometheus under an application for a period of time

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/monitor/query_range
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate                                        |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------------------------------------------- |
| team_id     | Path     | String  | Yes      |              | Team ID, name                                     |
| region_name | Path     | String  | Yes      |              | data center name                                  |
| app_id      | Path     | integer | Yes      |              | app id                                            |
| Start                            | Path     | Number  | Yes      |              | start timestamp                                   |
| end                              | Path     | Number  | Yes      |              | end timestamp                                     |
| step                             | Path     | Number  | Yes      |              | step size (default 60)         |
| is_outer    | Query    | String  | no       |              | Whether to get only external component monitoring |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                 | type                                                                                                          | required | constraint | Chinese name  | illustrate         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------- | ------------------ |
| _anonymous_                          | [[ComponentMonitorSerializers](#schemacomponentmonitors)] | false    | none       |               | none               |
| » Monitors                           | [[ComponentMonitorItemsSerializers](#schemacomponentmonitortemsserializers)hull     | false    | none       |               | none               |
| » data                               | [Data](#schemadata)                                                                                           | false    | none       | Data          | none               |
| resultType                           | String                                                                                                        | false    | none       | Resulttype    | return type        |
| » Result                             | [[MonitorDataSerializers](#schemamonitordaaterializers)]  | true     | none       |               | none               |
| »» value                             | [string]                                                  | true     | none       |               | none               |
| » monitor_item  | String                                                                                                        | true     | none       | Monitor item  | Monitoring item    |
| » status                             | String                                                                                                        | false    | none       | Status        | monitor status     |
| » service_id    | String                                                                                                        | true     | none       | Service id    | component id       |
| » service_name  | String                                                                                                        | true     | none       | Service cname | component name     |
| » service_alias | String                                                                                                        | true     | none       | Service alias | component nickname |

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

### ComponentMonitor Serializers<a id="schemacomponentmonitorserializers"></a>

```json
Flag
  "monitors": [
    Fum
      "data": LOs
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

| name                               | type                                                                                                      | required | constraint | Chinese name  | illustrate         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------- | ------------------ |
| Monitors                           | [[ComponentMonitorItemsSerializers](#schemacomponentmonitortemsserializers)hull | false    | none       |               | none               |
| service_id    | String                                                                                                    | true     | none       | Service id    | component id       |
| service_name  | String                                                                                                    | true     | none       | Service cname | component name     |
| service_alias | String                                                                                                    | true     | none       | Service alias | component nickname |

### ComponentMonitor ItemsSerializers<a id="schemacomponentmonitoritemsserializers"></a>

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
| Data                              | [Data](#schemadata) | false    | none       |              | none            |
| monitor_item | String              | true     | none       | Monitor item | Monitoring item |
| Status                            | String              | false    | none       | Status       | monitor status  |

### Data<a id="schemadata"></a>

```json
LO
  "resultType": "string",
  "result": [
    LO
      "value": [
        "string"
      ]
    }
  ]
}
```

### Attributes

| name       | type                                                                                                         | required | constraint | Chinese name | illustrate  |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------- | ---------- | ------------ | ----------- |
| ResultType | String                                                                                                       | false    | none       | Resulttype   | return type |
| Result     | [[MonitorDataSerializers](#schemamonitordaaterializers)] | true     | none       |              | none        |

### MonitorDataSerializers<a id="schemamonitordataserializers"></a>

```json
LO
  "value": [
    "string"
  ]
}
```

### Attributes

| name  | type                                                         | required | constraint | Chinese name | illustrate |
| ----- | ------------------------------------------------------------ | -------- | ---------- | ------------ | ---------- |
| Value | [string] | true     | none       |              | none       |
