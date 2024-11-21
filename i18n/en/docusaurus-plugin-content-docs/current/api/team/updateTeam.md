---
title: Update team information
---

## Basic Information

This interface is mainly used to update team information

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}
```

```json title="Body 请求体示例"
LO
  "region": "string",
  "is_activ": true,
  "creator": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

## request parameters

| name                         | Location | type                                        | required | Chinese name | illustrate |
| ---------------------------- | -------- | ------------------------------------------- | -------- | ------------ | ---------- |
| team_id | Path     | String                                      | Yes      |              | none       |
| body                         | body     | [UpdateTeamInfoReq](#schemaupdateaminforeq) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                  |
| ----------- | ------------------- | ---------- | ------------------------------------------- |
| 200         | OK                  | success    | [UpdateTeamInfoReq](#schemaupdateaminforeq) |

## Model

### UpdateTeamInfo<a id="schemaupdateteaminforeq"></a>

```json
LO
  "region": "string",
  "is_activ": true,
  "creator": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

### Attributes

| name                               | type    | required | constraint | Chinese name  | illustrate         |
| ---------------------------------- | ------- | -------- | ---------- | ------------- | ------------------ |
| Region                             | String  | false    | none       | Region        | data center name   |
| is_active     | boolean | false    | none       | Is Active     | Activate now       |
| creator                            | integer | false    | none       | Creator       | Team Owner User ID |
| tenant_alias  | String  | false    | none       | Tenant alias  | team alias         |
| Enterprise_id | String  | false    | none       | Enterprise id | Enterprise ID      |
