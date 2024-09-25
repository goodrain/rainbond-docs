---
title: Add enterprise user
---

## 基本信息

Add enterprise user

```json title="请求路径"
POST /openapi/v1/administrators
```

```json title="Body请求参数"
{
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
{
  "user_id": "string",
  "eid": "string"
}

```

### Attributes

| name                         | type   | required | constraint | Chinese name | illustrate    |
| ---------------------------- | ------ | -------- | ---------- | ------------ | ------------- |
| user_id | string | true     | none       | User id      | User ID       |
| eid                          | string | true     | none       | Eid          | Enterprise ID |
