---
title: Component horizontal scaling
---

## 基本信息

This interface is mainly used for horizontal scaling of components

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/telescopic/horizontal
```

```json title="Body 请求体示例"
{
  "new_node": 0
}
```

## request parameters

| name                             | Location | type                                                                    | required | Chinese name | illustrate |
| -------------------------------- | -------- | ----------------------------------------------------------------------- | -------- | ------------ | ---------- |
| app_id      | path     | integer                                                                 | Yes      |              | app id     |
| team_id     | path     | string                                                                  | Yes      |              | none       |
| region_name | path     | string                                                                  | Yes      |              | none       |
| service_id  | path     | string                                                                  | Yes      |              | none       |
| body                             | body     | [AppServiceTelescopicHorizontal](#schemaappservicetelescopichorizontal) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                                              |
| ----------- | ------------------- | ---------- | ----------------------------------------------------------------------- |
| 201         | Created             | success    | [AppServiceTelescopicHorizontal](#schemaappservicetelescopichorizontal) |

## Model

### AppServiceTelescopicHorizontal<a id="schemaappservicetelescopichorizontal"></a>

```json
{
  "new_node": 0
}
```

### Attributes

| name                          | type    | required | constraint | Chinese name | illustrate     |
| ----------------------------- | ------- | -------- | ---------- | ------------ | -------------- |
| new_node | integer | true     | none       | new node     | component node |
