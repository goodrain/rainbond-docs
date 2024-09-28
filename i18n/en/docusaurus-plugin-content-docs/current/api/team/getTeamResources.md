---
title: Get a list of team resource statistics
---

## 基本信息

This interface is mainly used to obtain a list of team resource statistics

```shell title="请求路径"
POST /openapi/v1/teams/resource
```

```json title="Body 请求体示例"
[
  {
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
| » total_cpu                                   | integer                                                                                           | false    | none       | total cpu              | total cpu                 |
| » total_memory                                | integer                                                                                           | false    | none       | Total memory           | total memory              |
| » used_cpu                                    | integer                                                                                           | false    | none       | used cpu               | occupy cpu                |
| » used_memory                                 | integer                                                                                           | false    | none       | Used memory            | used internal memory      |
| » used_cpu_percentage    | number                                                                                            | false    | none       | Used cpu percentage    | percentage of cpu         |
| » used_memory_percentage | number                                                                                            | false    | none       | Used memory percentage | percentage of memory used |
| » team_id                                     | string                                                                                            | true     | none       | team id                | Team ID                   |
| » team_name                                   | string                                                                                            | true     | none       | Team name              | Team Name                 |
| » team_alias                                  | string                                                                                            | true     | none       | Team alias             | Team nickname             |

```json title="响应示例"
[
  {
    "total_cpu": 0,
    "total_memory": 0,
    "used_cpu": 0,
    "used_memory": 0,
    "used_cpu_percentage": 0,
    "used_memory_percentage": 0,
    "team_id": "string",
    "team_name": "string",
    "team_alias": "string"
  }
]
```

## Model

### TenantRegionList<a id="schematenantregionlist"></a>

```json
{
  "tenant_id": "string",
  "region_name": "string"
}
```

### Attributes

| name                             | type   | required | constraint | Chinese name | illustrate       |
| -------------------------------- | ------ | -------- | ---------- | ------------ | ---------------- |
| tenant_id   | string | true     | none       | Tenant id    | tenant id        |
| region_name | string | true     | none       | Region name  | data center name |

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
| total_cpu                                   | integer | false    | none       | total cpu              | total cpu                 |
| total_memory                                | integer | false    | none       | Total memory           | total memory              |
| used_cpu                                    | integer | false    | none       | used cpu               | occupy cpu                |
| used_memory                                 | integer | false    | none       | Used memory            | used internal memory      |
| used_cpu_percentage    | number  | false    | none       | Used cpu percentage    | percentage of cpu         |
| used_memory_percentage | number  | false    | none       | Used memory percentage | percentage of memory used |
| team_id                                     | string  | true     | none       | team id                | Team ID                   |
| team_name                                   | string  | true     | none       | Team name              | Team Name                 |
| team_alias                                  | string  | true     | none       | Team alias             | Team nickname             |
