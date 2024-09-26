---
title: Update user information
---

## 基本信息

```json title="请求路径"
PUT /openapi/v1/users/{user_id}
```

>

```json title="Body请求参数"
{
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true
}
```

## request parameters

| name                         | Location | type                      | required | illustrate |
| ---------------------------- | -------- | ------------------------- | -------- | ---------- |
| user_id | path     | string                    | Yes      | none       |
| body                         | body     | [UpdateUser](#UpdateUser) | no       | none       |

## return result

| status code | Status code meaning | illustrate | data model                |
| ----------- | ------------------- | ---------- | ------------------------- |
| 200         | OK                  | success    | [UpdateUser](#UpdateUser) |

## Model

### UpdateUser

| name                               | type                             | required | constraint | Chinese name  | illustrate                         |
| ---------------------------------- | -------------------------------- | -------- | ---------- | ------------- | ---------------------------------- |
| password                           | string                           | false    | none       | Password      | 密码                                 |
| enterprise_id | string                           | false    | none       | Enterprise id | enterprise_id |
| email                              | string(email) | false    | none       | Email         | email address                      |
| phone                              | string                           | false    | none       | Phone         | cellphone number                   |
| is_active     | boolean¦null                     | false    | none       | Is active     | active state                       |

### Attributes

```json
{
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true
}

```
