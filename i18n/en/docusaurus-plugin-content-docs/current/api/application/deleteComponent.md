---
title: remove component
---

## 基本信息

This interface is mainly used to delete components

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/regions/{region_name}/apps/{app_id}/services/{service_id}
```

## request parameters

| name                             | Location | type    | required | Chinese name | illustrate   |
| -------------------------------- | -------- | ------- | -------- | ------------ | ------------ |
| app_id      | path     | integer | Yes      |              | app id       |
| team_id     | path     | string  | Yes      |              | none         |
| region_name | path     | string  | Yes      |              | none         |
| service_id  | path     | string  | Yes      |              | none         |
| force                            | query    | integer | no       |              | Force delete |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |
