---
title: Create an app
---

## Basic Information

This interface is mainly used to create applications

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions/{region_name}/apps 
```

```json title="Body 请求体示例"
LO
  "app_name": "Test",
  "app_note": "sint dolor in consectetur"
}
```

## request parameters

| name                             | Location | type                              | required | illustrate |
| -------------------------------- | -------- | --------------------------------- | -------- | ---------- |
| team_id     | Path     | String                            | Yes      | none       |
| region_name | Path     | String                            | Yes      | none       |
| body                             | body     | [AppPostInfo](#schemaapppostinfo) | no       | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                                        | type                                 | required | constraint | Chinese name      | illustrate                  |
| ----------------------------------------------------------- | ------------------------------------ | -------- | ---------- | ----------------- | --------------------------- |
| ID                                                          | integer                              | false    | read-only  | ID                | none                        |
| tenant_id                              | String                               | true     | none       | Tenant id         | tenant id                   |
| group_name                             | String                               | true     | none       | Group name        | group name                  |
| region_name                            | String                               | true     | none       | Region name       | Regional center name        |
| is_default                             | boolean                              | false    | none       | Is default        | default components          |
| order_index                            | integer                              | false    | none       | Order index       | Apply sorting               |
| Notes                                                       | Stringenull                          | false    | none       | Note              | Remark                      |
| username                                                    | Stringenull                          | false    | none       | Username          | The username of principal   |
| governance_mode                        | Stringenull                          | false    | none       | Governance mode   | Governance mode             |
| create_time                            | string(date-time) | true     | none       | Create time       | creation time               |
| update_time                            | string(date-time) | true     | none       | Update time       | update time                 |
| app_type                               | String                               | false    | none       | App type          | App types                   |
| app_store_name    | Stringenull                          | false    | none       | App store name    | app store name              |
| app_store_url     | Stringenull                          | false    | none       | App store url     | App store URL               |
| app_template_name | Stringenull                          | false    | none       | App template name | Basic Information           |
| version                                                     | Stringenull                          | false    | none       | Version           | Helm app version            |
| logo                                                        | Stringenull                          | false    | none       | Logo              | application logo            |
| k8s_app                                | String                               | false    | none       | K8s app           | In-cluster application name |

```json title="响应示例"
{
  "ID": 3,
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default": true,
  "order_index": 3,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2004-01-01 11:11:11",
  "update_time": " 2004-01-01 11:11:11",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  " version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

## Model

### AppPostInfo<a id="schemaapppostinfo"></a>

```json
LO
  "app_name": "string",
  "app_note": ""
}
```

### Attributes

| name                          | type   | required | constraint | Chinese name | illustrate        |
| ----------------------------- | ------ | -------- | ---------- | ------------ | ----------------- |
| app_name | String | true     | none       | App name     | Application Name  |
| app_note | String | false    | none       | App note     | Application Notes |
