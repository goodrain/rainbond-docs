---
title: Create a team
---

## 基本信息

This interface is mainly used to create teams

```shell title="请求路径"
POST /openapi/v1/teams
```

```json title="Body 请求体示例"
{
  "tenant_name": "string",
  "region": "string"
}
```

## request parameters

| name | Location | type                                  | required | Chinese name | illustrate |
| ---- | -------- | ------------------------------------- | -------- | ------------ | ---------- |
| body | body     | [CreateTeamReq](#schemacreateteamreq) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                          |
| ----------- | ------------------- | ---------- | ----------------------------------- |
| 200         | OK                  | success    | [TeamBaseInfo](#schemateambaseinfo) |

## Model

### CreateTeamReq<a id="schemacreateteamreq"></a>

```json
{
  "tenant_name": "string",
  "region": "string"
}
```

### Attributes

| name                             | type   | required | constraint | Chinese name | illustrate                                                                               |
| -------------------------------- | ------ | -------- | ---------- | ------------ | ---------------------------------------------------------------------------------------- |
| tenant_name | string | true     | none       | Tenant name  | Team Name                                                                                |
| region                           | string | false    | none       | Region       | The data center that is activated by default, if not specified, it will not be activated |

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
