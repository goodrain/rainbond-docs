---
title: delete app
---

## Basic Information
This interface is mainly used to delete applications

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}
```

## request parameters

| name        | Location | type    | required | Chinese name | illustrate   |
| ----------- | -------- | ------- | -------- | ------------ | ------------ |
| app_id      | path     | integer | Yes      |              | app id       |
| team_id     | path     | string  | Yes      |              | none         |
| region_name | path     | string  | Yes      |              | none         |
| force       | query    | integer | no       |              | Force delete |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 204         | No Content          | success    | Inline     |
