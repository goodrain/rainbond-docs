---
title: Modify user password
---

## 基本信息

Modify user password

```json title="请求路径"
PUT /openapi/v1/users/{user_id}/changepwd
```

```json title="Body请求参数"
{
  "user_id": 0,
  "password": "stringst",
  "password1": "stringst"
}
```

## request parameters

| name                         | Location | type                                  | required | illustrate |
| ---------------------------- | -------- | ------------------------------------- | -------- | ---------- |
| user_id | path     | string                                | Yes      | none       |
| body                         | body     | [ChangePassWdUser](#changepasswduser) | no       | none       |

> back to example

## return result

| status code | Status code meaning | illustrate | data model                            |
| ----------- | ------------------- | ---------- | ------------------------------------- |
| 200         | OK                  | success    | [ChangePassWdUser](#changepasswduser) |

## Model

### changepasswduser

```json
{
  "user_id": 0,
  "password": "stringst",
  "password1": "stringst"
}

```

### Attributes

| name                         | type    | required | constraint | Chinese name | illustrate                     |
| ---------------------------- | ------- | -------- | ---------- | ------------ | ------------------------------ |
| user_id | integer | true     | none       | User id      | user_id   |
| password                     | string  | true     | none       | Password     | new password                   |
| password1                    | string  | true     | none       | Password1    | Confirm the new password again |
