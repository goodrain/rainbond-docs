---
title: Get app details
---

## Basic Information
This interface is mainly used to obtain application details

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}
```

## request parameters

| name        | Location | type    | required | Chinese name | illustrate |
| ----------- | -------- | ------- | -------- | ------------ | ---------- |
| app_id      | path     | integer | Yes      |              | app id     |
| team_id     | path     | string  | Yes      |              | none       |
| region_name | path     | string  | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                |
| ----------- | ------------------- | ---------- | ------------------------- |
| 200         | OK                  | success    | [AppInfo](#schemaappinfo) |


## return data structure

```json title="响应示例"
{
  "ID": 0,
  "enterprise_id": "string",
  "service_count": 0,
  "running_service_count": 0,
  "used_momory": 0,
  "used_cpu": 0,
  "app_id": 0,
  "team_name": "string",
  "status": "running",
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default ": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14 :15:22Z",
  "update_time": "2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

## Model

### AppInfo<a id="schemaappinfo"></a>

```json
{
  "ID": 0,
  "enterprise_id": "string",
  "service_count": 0,
  "running_service_count": 0,
  "used_momory": 0,
  "used_cpu": 0,
  "app_id": 0,
  "team_name": "string",
  "status": "running",
  "tenant_id": "string",
  "group_name": "string",
  "region_name": "string",
  "is_default ": true,
  "order_index": -2147483648,
  "note": "string",
  "username": "string",
  "governance_mode": "string",
  "create_time": "2019-08-24T14 :15:22Z",
  "update_time": "2019-08-24T14:15:22Z",
  "app_type": "string",
  "app_store_name": "string",
  "app_store_url": "string",
  "app_template_name": "string",
  "version": "string",
  "logo": "string",
  "k8s_app": "string"
}
```

### Attributes

| name                    | type              | required | constraint | Chinese name          | illustrate                         |
| ----------------------- | ----------------- | -------- | ---------- | --------------------- | ---------------------------------- |
| ID                      | integer           | false    | read-only  | ID                    | none                               |
| enterprise_id           | string            | true     | none       | Enterprise id         | Enterprise ID (Federated Cloud ID) |
| service_count           | integer           | true     | none       | Service count         | number of components               |
| running_service_count | integer           | true     | none       | Running service count | number of components running       |
| used_momory             | integer           | true     | none       | Used momory           | allocated memory                   |
| used_cpu                | integer           | true     | none       | used cpu              | allocated cpu                      |
| app_id                  | integer           | true     | none       | App id                | app id                             |
| team_name               | string            | true     | none       | Team name             | team name                          |
| status                  | string            | true     | none       | Status                | application status                 |
| tenant_id               | string            | true     | none       | Tenant id             | tenant id                          |
| group_name              | string            | true     | none       | Group name            | group name                         |
| region_name             | string            | true     | none       | Region name           | Regional center name               |
| is_default              | boolean           | false    | none       | Is default            | default components                 |
| order_index             | integer           | false    | none       | Order index           | Apply sorting                      |
| note                    | string¦null       | false    | none       | Note                  | Remark                             |
| username                | string¦null       | false    | none       | Username              | the username of principal          |
| governance_mode         | string¦null       | false    | none       | Governance mode       | governance mode                    |
| create_time             | string(date-time) | true     | none       | Create time           | creation time                      |
| update_time             | string(date-time) | true     | none       | Update time           | update time                        |
| app_type                | string            | false    | none       | App type              | App types                          |
| app_store_name        | string¦null       | false    | none       | App store name        | app store name                     |
| app_store_url         | string¦null       | false    | none       | App store url         | App store URL                      |
| app_template_name     | string¦null       | false    | none       | App template name     | App template name                  |
| version                 | string¦null       | false    | none       | Version               | Helm app version                   |
| logo                    | string¦null       | false    | none       | Logo                  | application logo                   |
| k8s_app                 | string            | false    | none       | K8s app               | In-cluster application name        |

#### enumeration value

| Attributes | value        |
| ---------- | ------------ |
| status     | running      |
| status     | part_running |
| status     | closed       |