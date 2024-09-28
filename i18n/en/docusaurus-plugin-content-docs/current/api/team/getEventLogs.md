---
title: Get event log
---

## Basic Information

This interface is mainly used to obtain event logs

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/events/{event_id}/logs
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate       |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------------- |
| team_id     | Path     | String | Yes      |              | Team ID, name    |
| region_name | Path     | String | Yes      |              | data center name |
| event_id    | Path     | String | Yes      |              | Event ID         |

## return result

| status code | Status code meaning | illustrate | data model                         |
| ----------- | ------------------- | ---------- | ---------------------------------- |
| 200         | OK                  | success    | [TeamEventLog](#schemateaeventlog) |

## Model

### TeamEventLog<a id="schemateameventlog"></a>

```json
LO
  "logs": [
    Fum
      "message": "string",
      "time": "string",
      "utilme": 0
    }
  ]
}
```

### Attributes

| name | type                                                                                              | required | constraint | Chinese name | illustrate      |
| ---- | ------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | --------------- |
| Logs | [[EventLogMessage](#schemaeventlogssage)]hull | false    | none       |              | log information |

### EventLogMessage<a id="schemaeventlogmessage"></a>

```json
LO
  "message": "string",
  "time": "string",
  "utility": 0
 } }
```

### Attributes

| name    | type                  | required | constraint | Chinese name | illustrate      |
| ------- | --------------------- | -------- | ---------- | ------------ | --------------- |
| Message | Stringenull           | false    | none       | Message      | log information |
| time    | Stringenull           | false    | none       | Time         | log time        |
| utime   | integerexecutive null | false    | none       | Utime        | timestamp       |
