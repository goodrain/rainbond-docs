---
title: Close apps in batches
---

## Basic Information

This interface is mainly used to close applications in batches

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/close
```

```json title="Body 请求体示例"
LO
  "service_ids": [
    "string"
  ]
}
```

## request parameters

| name                             | Location | type                                                        | required | Chinese name | illustrate |
| -------------------------------- | -------- | ----------------------------------------------------------- | -------- | ------------ | ---------- |
| team_id     | Path     | String                                                      | Yes      |              | none       |
| region_name | Path     | String                                                      | Yes      |              | none       |
| body                             | body     | [TeamAppsCloseSerializers](#schemateamappscloseserializers) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                                  |
| ----------- | ------------------- | ---------- | ----------------------------------------------------------- |
| 201         | Created             | success    | [TeamAppsCloseSerializers](#schemateamappscloseserializers) |

```json title="响应示例"
LO
  "service_ids": [
    "string"
  ]
}
```

## Model

### TeamAppsCloseSerializers<a id="schemateamappscloseserializers"></a>

```json
LO
  "service_ids": [
    "string"
  ]
}
```

### Attributes

| name                                | type                                                         | required | constraint | Chinese name | illustrate |
| ----------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ------------ | ---------- |
| service_weight | [string] | false    | none       |              | none       |
