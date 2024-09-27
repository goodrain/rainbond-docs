---
title: Close apps in batches
---

## 基本信息

This interface is mainly used to close applications in batches

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/close
```

```json title="Body 请求体示例"
{
  "service_ids": [
    "string"
  ]
}
```

## request parameters

| name                             | Location | type                                                        | required | Chinese name | illustrate |
| -------------------------------- | -------- | ----------------------------------------------------------- | -------- | ------------ | ---------- |
| team_id     | path     | string                                                      | Yes      |              | none       |
| region_name | path     | string                                                      | Yes      |              | none       |
| body                             | body     | [TeamAppsCloseSerializers](#schemateamappscloseserializers) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                                  |
| ----------- | ------------------- | ---------- | ----------------------------------------------------------- |
| 201         | Created             | success    | [TeamAppsCloseSerializers](#schemateamappscloseserializers) |

```json title="响应示例"
{
  "service_ids": [
    "string"
  ]
}
```

## Model

### TeamAppsCloseSerializers<a id="schemateamappscloseserializers"></a>

```json
{
  "service_ids": [
    "string"
  ]
}
```

### Attributes

| name                             | type                                                         | required | constraint | Chinese name | illustrate |
| -------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ------------ | ---------- |
| service_ids | [string] | false    | none       |              | none       |
