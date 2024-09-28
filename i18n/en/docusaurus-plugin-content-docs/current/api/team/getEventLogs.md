---
title: Get event log
---

## 基本信息

This interface is mainly used to obtain event logs

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/events/{event_id}/logs
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate       |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------------- |
| team_id     | path     | string | Yes      |              | Team ID, name    |
| region_name | path     | string | Yes      |              | data center name |
| event_id    | path     | string | Yes      |              | Event ID         |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 200         | OK                  | success    | [TeamEventLog](#schemateameventlog) |

## Model

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

### Attributes

| name | type                                                                                                 | required | constraint | Chinese name | illustrate      |
| ---- | ---------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | --------------- |
| logs | [[EventLogMessage](#schemaeventlogmessage)]¦null | false    | none       |              | log information |

### EventLogMessage<a id="schemaeventlogmessage"></a>

```json
{
  "message": "string",
  "time": "string",
  "utime": 0
}
```

### Attributes

| name    | type         | required | constraint | Chinese name | illustrate      |
| ------- | ------------ | -------- | ---------- | ------------ | --------------- |
| message | string¦null  | false    | none       | Message      | log information |
| time    | string¦null  | false    | none       | Time         | log time        |
| utime   | integer¦null | false    | none       | Utime        | timestamp       |
