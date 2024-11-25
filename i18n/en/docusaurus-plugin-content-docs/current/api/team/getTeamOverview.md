---
title: Get team overview information
---

## Basic Information

This interface is mainly used to obtain team overview information

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions/{region_name}/overview
```

## request parameters

| name                             | Location | type   | required | Chinese name | illustrate |
| -------------------------------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id     | Path     | String | Yes      |              | none       |
| region_name | Path     | String | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                  |
| ----------- | ------------------- | ---------- | ------------------------------------------- |
| 200         | OK                  | success    | [TeamAppsResource](#schemateamappsresource) |

## Model

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
