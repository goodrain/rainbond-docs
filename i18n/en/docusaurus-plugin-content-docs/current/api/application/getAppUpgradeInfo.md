---
title: Get application upgradeable information
---

## Basic Information

This interface is mainly used to obtain application upgradeable information

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/upgrade
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate           |
| -------------------------------- | -------- | ------- | -------- | ------------ | -------------------- |
| app_id      | Path     | integer | Yes      |              | application group id |
| team_id     | Path     | String  | Yes      |              | none                 |
| region_name | Path     | String  | Yes      |              | none                 |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

```json title="响应示例"
[
  {
    "market_name": "string",
    "app_model_id": "string",
    "app_model_name": "string",
    "current_version": "string",
    "enterprise_id": "string",
    " can_upgrade": true,
    "upgrade_versions": [
      "string"
    ],
    "source": "string"
  }
]
```

| name                                                       | type                                                                                    | required | constraint | Chinese name    | illustrate                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | ---------- | --------------- | ---------------------------- |
| _anonymous_                                                | [[ListUpgrade](#schemalistupgrade)] | false    | none       |                 | none                         |
| » market_name                         | String                                                                                  | true     | none       | Market name     | app store name               |
| » app_model_id   | String                                                                                  | true     | none       | App model id    | application model id         |
| » app_model_name | String                                                                                  | true     | none       | App model name  | Application model name       |
| » current_version                     | String                                                                                  | true     | none       | Current version | current version              |
| » enterprise_id                       | String                                                                                  | true     | none       | Enterprise id   | enterprise id                |
| can_upgrade                           | boolean                                                                                 | true     | none       | Can upgrade     | upgradeable                  |
| » upgrade_versions                    | [string]                            | true     | none       |                 | List of upgradeable versions |
| » source                                                   | String                                                                                  | true     | none       | Source          | Application Model Source     |

## Model

### ListUpgrade<a id="schemalistupgrade"></a>

```json
{
  "market_name": "string",
  "app_model_id": "string",
  "app_model_name": "string",
  "current_version": "string",
  "enterprise_id": "string",
  "can_upgrade" : true,
  "upgrade_versions": [
    "string"
  ],
  "source": "string"
}
```

### Attributes

| name                                                     | type                                                         | required | constraint | Chinese name    | illustrate                   |
| -------------------------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | --------------- | ---------------------------- |
| market_name                         | String                                                       | true     | none       | Market name     | app store name               |
| app_model_id   | String                                                       | true     | none       | App model id    | application model id         |
| app_model_name | String                                                       | true     | none       | App model name  | Basic Information            |
| current_version                     | String                                                       | true     | none       | Current version | current version              |
| Enterprise_id                       | String                                                       | true     | none       | Enterprise id   | enterprise id                |
| can_upgrade                         | boolean                                                      | true     | none       | Can upgrade     | upgradeable                  |
| upgrade_versions                    | [string] | true     | none       |                 | List of upgradeable versions |
| source                                                   | String                                                       | true     | none       | Source          | Application Model Source     |
