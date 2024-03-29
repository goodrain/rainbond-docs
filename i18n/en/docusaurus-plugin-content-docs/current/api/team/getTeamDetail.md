---
title: Get team details
---

## Basic Information

This interface is mainly used to obtain team details

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}
```

## request parameters

| name    | Location | type   | required | Chinese name | illustrate |
| ------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id | path     | string | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                  |
| ----------- | ------------------- | ---------- | --------------------------- |
| 200         | OK                  | success    | [TeamInfo](#schemateaminfo) |

## Model

### TeamInfo<a id="schemateaminfo"></a>

```json
{
  "tenant_id": "string",
  "tenant_name": "string",
  "tenant_alias": "string",
  "enterprise_id": "string",
  "is_active": true,
  "create_time": " string",
  "creater": "string",
  "role_infos": [
    {
      "role_name": "string",
      "role_id": "string"
    }
  ],
  "service_num": 0,
  "region_num": 0
}
```

### Attributes

| name          | type                          | required | constraint | Chinese name  | illustrate                                    |
| ------------- | ----------------------------- | -------- | ---------- | ------------- | --------------------------------------------- |
| tenant_id     | string                        | true     | none       | Tenant id     | Team ID                                       |
| tenant_name   | string                        | true     | none       | Tenant name   | Team Name                                     |
| tenant_alias  | string                        | true     | none       | Tenant alias  | team alias                                    |
| enterprise_id | string                        | true     | none       | Enterprise id | Enterprise ID                                 |
| is_active     | boolean                       | false    | none       | Is active     | Activate now                                  |
| create_time   | string                        | false    | none       | Create time   | creation time                                 |
| creator       | string                        | false    | none       | Creater       | Team owner user                               |
| role_infos    | [[RoleInfo](#schemaroleinfo)] | false    | none       |               | The roles the user has in the team            |
| service_num   | integer                       | false    | none       | Service num   | The number of components in the team          |
| region_num    | integer                       | false    | none       | Region num    | The number of data centers opened by the team |

### RoleInfo<a id="schemaroleinfo"></a>

```json
{
  "role_name": "string",
  "role_id": "string"
}
```

### Attributes

| name      | type   | required | constraint | Chinese name | illustrate |
| --------- | ------ | -------- | ---------- | ------------ | ---------- |
| role_name | string | true     | none       | Role name    | Role Name  |
| role_id   | string | true     | none       | Role id      | role id    |
