---
title: Upgrade the app
---

## Basic Information

This interface is mainly used to upgrade applications

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/upgrade
```

```json title="Body 请求体示例"
{
  "update_versions": [
    {
      "market_name": "string",
      "app_model_id": "string",
      "app_model_version": "string"
    }
  ]
}
```

## request parameters

| name                             | Location | type                      | required | Chinese name | illustrate           |
| -------------------------------- | -------- | ------------------------- | -------- | ------------ | -------------------- |
| app_id      | path     | integer                   | Yes      |              | application group id |
| team_id     | path     | string                    | Yes      |              | none                 |
| region_name | path     | string                    | Yes      |              | none                 |
| body                             | body     | [Upgrade](#schemaupgrade) | no       |              | none                 |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                                       | type                                                                                    | required | constraint | Chinese name    | illustrate                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | ---------- | --------------- | ---------------------------- |
| _anonymous_                                                | [[ListUpgrade](#schemalistupgrade)] | false    | none       |                 | none                         |
| » market_name                         | string                                                                                  | true     | none       | Market name     | app store name               |
| » app_model_id   | string                                                                                  | true     | none       | App model id    | application model id         |
| » app_model_name | string                                                                                  | true     | none       | App model name  | Basic Information            |
| » current_version                     | string                                                                                  | true     | none       | Current version | current version              |
| » enterprise_id                       | string                                                                                  | true     | none       | Enterprise id   | enterprise id                |
| » can_upgrade                         | boolean                                                                                 | true     | none       | Can upgrade     | upgradeable                  |
| » upgrade_versions                    | [string]                            | true     | none       |                 | List of upgradeable versions |
| » source                                                   | string                                                                                  | true     | none       | Source          | Application Model Source     |

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

## Model

### Upgrade<a id="schemaupgrade"></a>

```json
{
  "update_versions": [
    {
      "market_name": "string",
      "app_model_id": "string",
      "app_model_version": "string"
    }
  ]
}
```

### Attributes

| name                                 | type                                                                                    | required | constraint | Chinese name | illustrate |
| ------------------------------------ | --------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| update_versions | [[UpgradeBase](#schemaupgradebase)] | true     | none       |              | none       |

### UpgradeBase<a id="schemaupgradebase"></a>

```json
{
  "market_name": "string",
  "app_model_id": "string",
  "app_model_version": "string"
}
```

### Attributes

| name                                                        | type   | required | constraint | Chinese name      | illustrate           |
| ----------------------------------------------------------- | ------ | -------- | ---------- | ----------------- | -------------------- |
| market_name                            | string | true     | none       | Market name       | app store name       |
| app_model_id      | string | true     | none       | App model id      | application model id |
| app_model_version | string | true     | none       | App model version | current version      |

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
| market_name                         | string                                                       | true     | none       | Market name     | app store name               |
| app_model_id   | string                                                       | true     | none       | App model id    | application model id         |
| app_model_name | string                                                       | true     | none       | App model name  | Basic Information            |
| current_version                     | string                                                       | true     | none       | Current version | current version              |
| enterprise_id                       | string                                                       | true     | none       | Enterprise id   | enterprise id                |
| can_upgrade                         | boolean                                                      | true     | none       | Can upgrade     | upgradeable                  |
| upgrade_versions                    | [string] | true     | none       |                 | List of upgradeable versions |
| source                                                   | string                                                       | true     | none       | Source          | Application Model Source     |
