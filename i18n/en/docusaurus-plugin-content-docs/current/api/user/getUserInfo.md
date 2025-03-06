---
title: Get user information
---

## Basic Information

Get user information based on user ID

```json title="请求路径"
GET /openapi/v1/users/{user_id}
```

## request parameters

| name                         | Location | type   | required | illustrate |
| ---------------------------- | -------- | ------ | -------- | ---------- |
| user_id | Path     | String | Yes      | none       |

## return result

| status code | Status code meaning | illustrate | data model            |
| ----------- | ------------------- | ---------- | --------------------- |
| 200         | OK                  | success    | [UserInfo](#UserInfo) |

## Model

### UserInfo

```json
{
  "user_id": 0,
  "email": "string",
  "nick_name": "string",
  "phone": "string",
  "is_active": true,
  "origion": "string" ,
  "create_time": "string",
  "client_ip": "string",
  "enterprise_id": "string"
}

```

### Attributes

| name                               | type        | required | constraint | Chinese name                        | illustrate                         |
| ---------------------------------- | ----------- | -------- | ---------- | ----------------------------------- | ---------------------------------- |
| user_id       | integer     | true     | none       | User id                             | none                               |
| email                              | Stringenull | false    | none       | Email                               | email address                      |
| nick_name     | String      | false    | none       | Nick name                           | User's Nickname                    |
| phone                              | Stringenull | false    | none       | Phone                               | cellphone number                   |
| is_active     | boolean     | false    | none       | Is Active                           | active state                       |
| Origin                             | Stringenull | false    | none       | \* Retiring member. | User source                        |
| create_time   | String      | false    | none       | Create time                         | creation time                      |
| client_ip     | Stringenull | false    | none       | Client ip                           | register ip                        |
| Enterprise_id | String      | false    | none       | Enterprise id                       | Enterprise_id |



