---
title: Add enterprise user
---

## Basic Information

Add enterprise user

```json title="请求路径"
POST /openapi/v1/administrators
```

```json title="Body请求参数"
LO
  "user_id": "string",
  "eid": "string"
}
```

## request parameters

| name | Location | type                                      | required | illustrate |
| ---- | -------- | ----------------------------------------- | -------- | ---------- |
| body | body     | [CreateAdminUserReq](#createadminuserreq) | no       | none       |

## return result

| status code | Status code meaning                                          | illustrate | data model                                |
| ----------- | ------------------------------------------------------------ | ---------- | ----------------------------------------- |
| 201         | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | success    | [CreateAdminUserReq](#createadminuserreq) |

## Model

### CreateAdminUserReq

```json
LO
  "user_id": "string",
  "eid": "string"
}

```

### Attributes

| name                         | type   | required | constraint | Chinese name | illustrate    |
| ---------------------------- | ------ | -------- | ---------- | ------------ | ------------- |
| user_id | String | true     | none       | User id      | User ID       |
| eid                          | String | true     | none       | Eid          | Enterprise ID |