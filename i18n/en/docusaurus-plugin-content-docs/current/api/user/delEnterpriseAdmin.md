---
title: delete enterprise administrator
---

## 基本信息

delete enterprise administrator

```json title="请求路径"
DELETE /openapi/v1/administrators/{user_id}
```

## request parameters

| name                         | Location | type   | required | illustrate |
| ---------------------------- | -------- | ------ | -------- | ---------- |
| user_id | path     | string | Yes      | none       |

> back to example

## return result

| status code | Status code meaning                                              | illustrate | data model    |
| ----------- | ---------------------------------------------------------------- | ---------- | ------------- |
| 204         | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)  | success    | Inline        |
| 400         | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | 400        | [Fail](#fail) |
| 404         | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | 404        | [Fail](#fail) |

## Model

### Fail

```json
{
  "msg": "string"
}

```

### Attributes

| name | type   | required | constraint | Chinese name | illustrate |
| ---- | ------ | -------- | ---------- | ------------ | ---------- |
| msg  | string | true     | none       | Msg          | none       |
