---
title: Update team information
---

## 基本信息

This interface is mainly used to update team information

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}
```

```json title="Body 请求体示例"
{
  "region": "string",
  "is_active": true,
  "creater": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

## request parameters

| name                         | Location | type                                          | required | Chinese name | illustrate |
| ---------------------------- | -------- | --------------------------------------------- | -------- | ------------ | ---------- |
| team_id | path     | string                                        | Yes      |              | none       |
| body                         | body     | [UpdateTeamInfoReq](#schemaupdateteaminforeq) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                    |
| ----------- | ------------------- | ---------- | --------------------------------------------- |
| 200         | OK                  | success    | [UpdateTeamInfoReq](#schemaupdateteaminforeq) |

## Model

### UpdateTeamInfoReq<a id="schemaupdateteaminforeq"></a>

```json
{
  "region": "string",
  "is_active": true,
  "creater": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

### Attributes

| name                               | type    | required | constraint | Chinese name  | illustrate         |
| ---------------------------------- | ------- | -------- | ---------- | ------------- | ------------------ |
| region                             | string  | false    | none       | Region        | data center name   |
| is_active     | boolean | false    | none       | Is active     | Activate now       |
| creator                            | integer | false    | none       | Creater       | Team Owner User ID |
| tenant_alias  | string  | false    | none       | Tenant alias  | team alias         |
| enterprise_id | string  | false    | none       | Enterprise id | Enterprise ID      |
