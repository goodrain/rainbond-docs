---
title: Open a cluster for a team
---

## Basic Information

This interface is mainly used to open a new cluster for a team

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions
```

```json title="Body 请求体示例"
LO
  "region": "string"
}
```

## request parameters

| name                         | Location | type                                  | required | Chinese name | illustrate |
| ---------------------------- | -------- | ------------------------------------- | -------- | ------------ | ---------- |
| team_id | Path     | String                                | Yes      |              | none       |
| body                         | body     | [TeamRegionReq](#schemateamregionreq) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 201         | Created             | success    | [TeamBaseInfo](#schemateambaseinfo) |

## Model

### TeamRegionReq<a id="schemateamregionreq"></a>

```json
LO
  "region": "string"
}
```

### Attributes

| name   | type   | required | constraint | Chinese name | illustrate       |
| ------ | ------ | -------- | ---------- | ------------ | ---------------- |
| Region | String | false    | none       | Region       | data center name |

### TeamBaseInfo<a id="schemateambaseinfo"></a>

```json
{
  "tenant_id": "string",
  "tenant_name": "string",
  "region": "",
  "is_active": true,
  "create_time": "string",
  "creater": 0,
  "limit_memory": 1024,
  "update_time": "string",
  "expired_time": "string",
  "tenant_alias": "",
  "enterprise_id": ""
}
```

### Attributes

| name                               | type        | required | constraint | Chinese name  | illustrate                              |
| ---------------------------------- | ----------- | -------- | ---------- | ------------- | --------------------------------------- |
| tenant_id     | String      | true     | none       | Tenant id     | tenant id                               |
| tenant_name   | String      | true     | none       | Tenant name   | Basic Information                       |
| Region                             | String      | false    | none       | Region        | regional center, deprecated             |
| is_active     | boolean     | false    | none       | Is Active     | active state                            |
| create_time   | String      | true     | none       | Create time   | creation time                           |
| creator                            | integer     | false    | none       | Creator       | Tenant creator                          |
| Limit_memory  | integer     | false    | none       | Limit memory  | Memory size unit (M) |
| update_time   | String      | true     | none       | Update time   | update time                             |
| expired_time  | String      | true     | none       | Expired time  | Expiration                              |
| tenant_alias  | Stringenull | false    | none       | Tenant alias  | team alias                              |
| Enterprise_id | Stringenull | false    | none       | Enterprise id | enterprise id                           |
