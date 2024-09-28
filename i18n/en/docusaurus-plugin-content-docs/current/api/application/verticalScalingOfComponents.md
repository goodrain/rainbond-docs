---
title: Vertical scaling of components
---

## Basic Information

This interface is mainly used for vertical scaling of components

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/telescopic/vertical
```

```json title="Body 请求体示例"
LO
  "new_memory": 0,
  "new_gpu": 0,
  "new_cpu": 0
 } } }
```

## request parameters

| name                             | Location | type                                                                | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------------------------------------------------------------------- | -------- | ------------ | ---------- |
| app_id      | Path     | integer                                                             | Yes      |              | app id     |
| team_id     | Path     | String                                                              | Yes      |              | none       |
| region_name | Path     | String                                                              | Yes      |              | none       |
| service_id  | Path     | String                                                              | Yes      |              | none       |
| body                             | body     | [AppServiceTelescopicVertical](#schemaappservicetelescopicvertical) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                                          |
| ----------- | ------------------- | ---------- | ------------------------------------------------------------------- |
| 201         | Created             | success    | [AppServiceTelescopicVertical](#schemaappservicetelescopicvertical) |

## Model

### AppServiceTelescopicVertical<a id="schemaappservicetelescopicvertical"></a>

```json
LO
  "new_memory": 0,
  "new_gpu": 0,
  "new_cpu": 0
} }

```

### Attributes

| name                            | type    | required | constraint | Chinese name | illustrate                       |
| ------------------------------- | ------- | -------- | ---------- | ------------ | -------------------------------- |
| new_memory | integer | true     | none       | New memory   | component memory                 |
| new_gpu    | integer | true     | none       | New gpu      | Component gpu memory application |
| new_cpu    | integer | true     | none       | new cpu      | Component CPU quota application  |
