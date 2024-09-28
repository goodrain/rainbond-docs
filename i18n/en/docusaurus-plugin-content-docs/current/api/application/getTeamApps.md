---
title: Get a list of team apps
---

## 基本信息

This interface is mainly used to get the list of all applications under the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate                               |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------------------------------------- |
| team_id     | path     | string | Yes      |              | none                                     |
| region_name | path     | string | Yes      |              | none                                     |
| query                            | query    | string | no       |              | Search query application name, team name |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                                          | type                                                                                    | required | constraint | Chinese name      | illustrate                  |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | ---------- | ----------------- | --------------------------- |
| _anonymous_                                                   | [[AppBaseInfo](#schemaappbaseinfo)] | false    | none       |                   | none                        |
| » ID                                                          | integer                                                                                 | false    | read-only  | ID                | none                        |
| » tenant_id                              | string                                                                                  | true     | none       | Tenant id         | tenant id                   |
| » group_name                             | string                                                                                  | true     | none       | Group name        | group name                  |
| » region_name                            | string                                                                                  | true     | none       | Region name       | Regional center name        |
| » is_default                             | boolean                                                                                 | false    | none       | Is default        | default components          |
| » order_index                            | integer                                                                                 | false    | none       | Order index       | Apply sorting               |
| » note                                                        | string¦null                                                                             | false    | none       | Note              | Remark                      |
| » username                                                    | string¦null                                                                             | false    | none       | Username          | the username of principal   |
| » governance_mode                        | string¦null                                                                             | false    | none       | Governance mode   | governance mode             |
| » create_time                            | string(date-time)                                                    | true     | none       | Create time       | creation time               |
| » update_time                            | string(date-time)                                                    | true     | none       | Update time       | update time                 |
| » app_type                               | string                                                                                  | false    | none       | App type          | App types                   |
| » app_store_name    | string¦null                                                                             | false    | none       | App store name    | app store name              |
| » app_store_url     | string¦null                                                                             | false    | none       | App store url     | App store URL               |
| » app_template_name | string¦null                                                                             | false    | none       | App template name | 应用模板名称                      |
| » version                                                     | string¦null                                                                             | false    | none       | Version           | Helm app version            |
| » logo                                                        | string¦null                                                                             | false    | none       | Logo              | application logo            |
| » k8s_app                                | string                                                                                  | false    | none       | K8s app           | In-cluster application name |

```json title="响应示例"
[
  {
    "ID": 3,
    "tenant_id": "string",
    "group_name": "string",
    "region_name": "string",
    "is_default": true,
    "order_index": 3 ,
    "note": "string",
    "username": "string",
    "governance_mode": "string",
    "create_time": "2004-01-01 11:11:11",
    "update_time" : "2004-01-01 11:11:11",
    "app_type": "string",
    "app_store_name": "string",
    "app_store_url": "string",
    "app_template_name": "string",
    "version": "string",
    "logo": "string",
    "k8s_app": "string"
  }
]
```

## Model

### AppBaseInfo<a id="schemaappbaseinfo"></a>

```json
{
  "ID": 0,
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14:15:22Z",
  "update_time": " 2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version ": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

### Attributes

| name                                                        | type                                 | required | constraint | Chinese name      | illustrate                   |
| ----------------------------------------------------------- | ------------------------------------ | -------- | ---------- | ----------------- | ---------------------------- |
| ID                                                          | integer                              | false    | read-only  | ID                | none                         |
| tenant_id                              | string                               | true     | none       | Tenant id         | tenant id                    |
| group_name                             | string                               | true     | none       | Group name        | group name                   |
| region_name                            | string                               | true     | none       | Region name       | Regional center name         |
| is_default                             | boolean                              | false    | none       | Is default        | default components           |
| order_index                            | integer                              | false    | none       | Order index       | Apply sorting                |
| note                                                        | string¦null                          | false    | none       | Note              | Remark                       |
| username                                                    | string¦null                          | false    | none       | Username          | application manager          |
| governance_mode                        | string¦null                          | false    | none       | Governance mode   | Application Governance Model |
| create_time                            | string(date-time) | true     | none       | Create time       | creation time                |
| update_time                            | string(date-time) | true     | none       | Update time       | update time                  |
| app_type                               | string                               | false    | none       | App type          | App types                    |
| app_store_name    | string¦null                          | false    | none       | App store name    | app store name               |
| app_store_url     | string¦null                          | false    | none       | App store url     | App store URL                |
| app_template_name | string¦null                          | false    | none       | App template name | Basic Information            |
| version                                                     | string¦null                          | false    | none       | Version           | Helm app version             |
| logo                                                        | string¦null                          | false    | none       | Logo              | application logo             |
| k8s_app                                | string                               | false    | none       | K8s app           | In-cluster application name  |
