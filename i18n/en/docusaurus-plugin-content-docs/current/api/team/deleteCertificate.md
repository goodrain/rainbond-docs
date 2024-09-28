---
title: delete certificate
---

## 基本信息

This interface is mainly used to delete the certificate

```shell title="请求路径"
DELETE /openapi/v1/teams/{team_id}/certificates/{certificate_id}
```

## request parameters

| name                                | Location | type   | required | Chinese name | illustrate |
| ----------------------------------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id        | path     | string | Yes      |              | none       |
| certificate_id | path     | string | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 204         | OK                  | success    | Inline     |
