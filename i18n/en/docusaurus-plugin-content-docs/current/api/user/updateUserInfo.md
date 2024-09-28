---
title: Update user information
---

## Basic Information

```json title="请求路径"
PUT /openapi/v1/users/{user_id}
```

>

```json title="Body请求参数"
LO
  "password": "stringsta",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true
}
```

## request parameters

| name                         | Location | type                      | required | illustrate |
| ---------------------------- | -------- | ------------------------- | -------- | ---------- |
| user_id | Path     | String                    | Yes      | none       |
| body                         | body     | [UpdateUser](#UpdateUser) | no       | none       |

## return result

| status code | Status code meaning | illustrate | data model                |
| ----------- | ------------------- | ---------- | ------------------------- |
| 200         | OK                  | success    | [UpdateUser](#UpdateUser) |

## Model

### UpdateUser

| name                               | type                             | required | constraint | Chinese name  | illustrate                         |
| ---------------------------------- | -------------------------------- | -------- | ---------- | ------------- | ---------------------------------- |
| password                           | String                           | false    | none       | Password      | Password                           |
| Enterprise_id | String                           | false    | none       | Enterprise id | Enterprise_id |
| email                              | string(email) | false    | none       | Email         | email address                      |
| phone                              | String                           | false    | none       | Phone         | cellphone number                   |
| is_active     | booleanexecutive                 | false    | none       | Is Active     | active state                       |

### Attributes

```json
LO
  "password": "stringsta",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_activ": true
}

```
