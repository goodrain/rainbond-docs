---
title: Get a list of team resource statistics
---

## Basic Information

This interface is mainly used to obtain a list of team resource statistics

```shell title="请求路径"
POST /openapi/v1/teams/resource
```

```json title="Body 请求体示例"
[
  LO
    "tenant_id": "string",
    "region_name": "string"
  }
]
```

## request parameters

| name | Location | type                                        | required | Chinese name | illustrate |
| ---- | -------- | ------------------------------------------- | -------- | ------------ | ---------- |
| body | body     | [TenantRegionList](#schematenantregionlist) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

| name                                                               | type                                                                                              | required | constraint | Chinese name           | illustrate                |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------- | ---------- | ---------------------- | ------------------------- |
| _anonymous_                                                        | [[TeamAppsResource](#schemateamappsresource)] | false    | none       |                        | none                      |
| » Total_cpu                                   | integer                                                                                           | false    | none       | total cpu              | total cpu                 |
| » Total_memory                                | integer                                                                                           | false    | none       | Total memory           | total memory              |
| » used_cpu                                    | integer                                                                                           | false    | none       | used cpu               | occupy cpu                |
| » used_memory                                 | integer                                                                                           | false    | none       | Used memory            | used internal memory      |
| used_cpu_percentage      | Number                                                                                            | false    | none       | Use cpu percentage     | percentage of cpu         |
| » used_memory_percentage | Number                                                                                            | false    | none       | User memory percentage | percentage of memory used |
| » team_id                                     | String                                                                                            | true     | none       | team id                | Team ID                   |
| » team_name                                   | String                                                                                            | true     | none       | Team name              | Team Name                 |
| » team_alias                                  | String                                                                                            | true     | none       | Team alias             | Team nickname             |

```json title="响应示例"
[
  LO
    "total_cpu": 0,
    "total_memory": 0,
    "used_cpu": 0,
    "used_memory": 0,
    "used_cpu_percent": 0,
    "used_memory_percent": 0,
    "team_id": "string",
    "team_name": "string",
    "team_alias": "string"
  }
]
```

## Model

### TenantRegionList<a id="schematenantregionlist"></a>

```json
LO
  "tenant_id": "string",
  "region_name": "string"
}
```

### Attributes

| name                             | type   | required | constraint | Chinese name | illustrate       |
| -------------------------------- | ------ | -------- | ---------- | ------------ | ---------------- |
| tenant_id   | String | true     | none       | Tenant id    | tenant id        |
| region_name | String | true     | none       | Region name  | data center name |

### TeamAppsResource<a id="schemateamappsresource"></a>

```json
{
  "total_cpu": 0,
  "total_memory": 0,
  "used_cpu": 0,
  "used_memory": 0,
  "used_cpu_percentage": 0,
  "used_memory_percentage": 0,
  "team_id": "string ",
  "team_name": "string",
  "team_alias": "string"
}
```

### Attributes

| name                                                             | type    | required | constraint | Chinese name           | illustrate                |
| ---------------------------------------------------------------- | ------- | -------- | ---------- | ---------------------- | ------------------------- |
| Total_cpu                                   | integer | false    | none       | total cpu              | total cpu                 |
| Total_memory                                | integer | false    | none       | Total memory           | total memory              |
| used_cpu                                    | integer | false    | none       | used cpu               | occupy cpu                |
| used_memory                                 | integer | false    | none       | Used memory            | used internal memory      |
| used_cpu_percentage    | Number  | false    | none       | Use cpu percentage     | percentage of cpu         |
| used_memory_percentage | Number  | false    | none       | User memory percentage | percentage of memory used |
| team_id                                     | String  | true     | none       | team id                | Team ID                   |
| team_name                                   | String  | true     | none       | Team name              | Team Name                 |
| team_alias                                  | String  | true     | none       | Team alias             | Team nickname             |
