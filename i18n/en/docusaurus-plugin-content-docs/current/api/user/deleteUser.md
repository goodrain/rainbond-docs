---
title: delete users
---

## delete users

delete user based on user id

```json title="请求路径"
DELETE /openapi/v1/users/{user_id}
```

## request parameters

| name                         | Location | type   | required | illustrate |
| ---------------------------- | -------- | ------ | -------- | ---------- |
| user_id | Path     | String | Yes      | none       |

## return result

| status code | Status code meaning                                             | illustrate | data model |
| ----------- | --------------------------------------------------------------- | ---------- | ---------- |
| 204         | [No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5) | success    | Inline     |

## return data structure

<a id="opIdopenapi_v1_users_create"></a>