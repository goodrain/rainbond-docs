---
title: Add regular user
---

## Basic Information

Add regular user

```json title="请求路径"
POST /openapi/v1/users
```

```json title="Body请求参数"
LO
  "nick_name": "string",
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true,
  "origin": "string"
}
```

## request parameters

| name | Location | type                      | required | illustrate |
| ---- | -------- | ------------------------- | -------- | ---------- |
| body | body     | [CreateUser](#createuser) | no       | none       |

## return result

| status code | Status code meaning                                          | illustrate | data model                |
| ----------- | ------------------------------------------------------------ | ---------- | ------------------------- |
| 201         | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | success    | [CreateUser](#createuser) |

## Model

## createuser

```json
{
  "nick_name": "string",
  "password": "stringst",
  "enterprise_id": "string",
  "email": "user@example.com",
  "phone": "string",
  "is_active": true,
  "origion": "string"
}

```

### Attributes

| name                               | type                             | required | constraint | Chinese name                        | illustrate                         |
| ---------------------------------- | -------------------------------- | -------- | ---------- | ----------------------------------- | ---------------------------------- |
| nick_name     | String                           | true     | none       | Nick name                           | User's Nickname                    |
| password                           | String                           | true     | none       | Password                            | Password                           |
| Enterprise_id | String                           | true     | none       | Enterprise id                       | Enterprise_id |
| email                              | string(email) | false    | none       | Email                               | email address                      |
| phone                              | String                           | false    | none       | Phone                               | cellphone number                   |
| is_active     | boolean                          | false    | none       | Is Active                           | active state                       |
| Origin                             | String                           | false    | none       | \* Retiring member. | User source                        |