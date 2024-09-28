---
title: Open a cluster for a team
---

## 基本信息

This interface is mainly used to open a new cluster for a team

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions
```

```json title="Body 请求体示例"
{
  "region": "string"
}
```

## request parameters

| name                         | Location | type                                  | required | Chinese name | illustrate |
| ---------------------------- | -------- | ------------------------------------- | -------- | ------------ | ---------- |
| team_id | path     | string                                | Yes      |              | none       |
| body                         | body     | [TeamRegionReq](#schemateamregionreq) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 201         | Created             | success    | [TeamBaseInfo](#schemateambaseinfo) |

## Model

### TeamRegionReq<a id="schemateamregionreq"></a>

```json
{
  "region": "string"
}
```

### Attributes

| name   | type   | required | constraint | Chinese name | illustrate       |
| ------ | ------ | -------- | ---------- | ------------ | ---------------- |
| region | string | false    | none       | Region       | data center name |

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
| tenant_id     | string      | true     | none       | Tenant id     | tenant id                               |
| tenant_name   | string      | true     | none       | Tenant name   | Basic Information                       |
| region                             | string      | false    | none       | Region        | regional center, deprecated             |
| is_active     | boolean     | false    | none       | Is active     | active state                            |
| create_time   | string      | true     | none       | Create time   | creation time                           |
| creator                            | integer     | false    | none       | Creater       | Tenant creator                          |
| limit_memory  | integer     | false    | none       | Limit memory  | Memory size unit (M) |
| update_time   | string      | true     | none       | Update time   | update time                             |
| expired_time  | string      | true     | none       | Expired time  | Expiration                              |
| tenant_alias  | string¦null | false    | none       | Tenant alias  | team alias                              |
| enterprise_id | string¦null | false    | none       | Enterprise id | enterprise id                           |
