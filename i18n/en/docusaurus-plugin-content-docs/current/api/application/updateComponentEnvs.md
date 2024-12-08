---
title: Update component environment variables
---

## Basic Information

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

| Name                             | Location | type                                                        | required | Chinese name | illustrate   |
| -------------------------------- | -------- | ----------------------------------------------------------- | -------- | ------------ | ------------ |
| app_id      | Path     | integer                                                     | Yes      |              | app id       |
| service_id  | Path     | String                                                      | Yes      |              | app id       |
| team_id     | Path     | String                                                      | Yes      |              | team id      |
| region_name | Path     | String                                                      | Yes      |              | cluster name |
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

| Name | type                                                                                                                      | required | constraint | Chinese name | illustrate |
| ---- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| envs | [[ComponentEnvsBaseSerializers](#schemacomponentenvsbaseserializers)] | true     | none       |              | none       |

### ComponentEnvBaseSerializers<a id="schemacomponentenvsbaseserializers"></a>

```json
LO
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
| Notes                          | String  | false    | none       | Note         | Remark                     |
| Name                           | String  | true     | none       | Name         | environment variable name  |
| Value                          | String  | true     | none       | Value        | environment variable value |
| is_change | boolean | false    | none       | Is change    | Can it be changed          |
| Scope                          | String  | false    | none       | Scope        | Scope                      |
