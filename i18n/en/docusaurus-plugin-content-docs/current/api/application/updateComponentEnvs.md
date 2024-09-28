---
title: Update component environment variables
---

## 基本信息

This interface is mainly used to update component environment variables

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}/envs
```

```json title="Body 请求体示例"
{
  "envs": [
    {
      "note": "string",
      "name": "string",
      "value": "string",
      "is_change": true,
      "scope": "inner "
    }
  ]
}
```

## request parameters

| 名称                               | Location | type                                                        | required | Chinese name | illustrate   |
| -------------------------------- | -------- | ----------------------------------------------------------- | -------- | ------------ | ------------ |
| app_id      | path     | integer                                                     | Yes      |              | app id       |
| service_id  | path     | string                                                      | Yes      |              | app id       |
| team_id     | path     | string                                                      | Yes      |              | team id      |
| region_name | path     | string                                                      | Yes      |              | cluster name |
| body                             | body     | [ComponentEnvsSerializers](#schemacomponentenvsserializers) | no       |              | none         |

## return result

| status code | Status code meaning | illustrate | data model                                                  |
| ----------- | ------------------- | ---------- | ----------------------------------------------------------- |
| 200         | OK                  | success    | [ComponentEnvsSerializers](#schemacomponentenvsserializers) |

## Model

### ComponentEnvsSerializers<a id="schemacomponentenvsserializers"></a>

```json
{
  "envs": [
    {
      "note": "string",
      "name": "string",
      "value": "string",
      "is_change": true,
      "scope": "inner "
    }
  ]
}
```

### Attributes

| 名称   | type                                                                                                                      | required | constraint | Chinese name | illustrate |
| ---- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| envs | [[ComponentEnvsBaseSerializers](#schemacomponentenvsbaseserializers)] | true     | none       |              | none       |

### ComponentEnvsBaseSerializers<a id="schemacomponentenvsbaseserializers"></a>

```json
{
  "note": "string",
  "name": "string",
  "value": "string",
  "is_change": true,
  "scope": "inner"
}
```

### Attributes

| Basic Information              | type    | required | constraint | Chinese name | illustrate                 |
| ------------------------------ | ------- | -------- | ---------- | ------------ | -------------------------- |
| note                           | string  | false    | none       | Note         | Remark                     |
| name                           | string  | true     | none       | Name         | environment variable name  |
| value                          | string  | true     | none       | Value        | environment variable value |
| is_change | boolean | false    | none       | Is change    | Can it be changed          |
| scope                          | string  | false    | none       | Scope        | 范围                         |
