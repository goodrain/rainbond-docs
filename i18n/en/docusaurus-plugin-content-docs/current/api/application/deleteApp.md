---
title: delete app
---

## Basic Information

This interface is mainly used to delete applications

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate   |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------ |
| app_id      | Path     | integer | Yes      |              | app id       |
| team_id     | Path     | String  | Yes      |              | none         |
| region_name | Path     | String  | Yes      |              | none         |
| Force                            | Query    | integer | no       |              | Force delete |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 204         | No Content          | success    | Inline     |
