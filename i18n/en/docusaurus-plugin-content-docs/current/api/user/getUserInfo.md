---
title: Get user information
---

## 基本信息

Get user information based on user ID

```json title="请求路径"
GET /openapi/v1/users/{user_id}
```

## request parameters

| name                         | Location | type   | required | illustrate |
| ---------------------------- | -------- | ------ | -------- | ---------- |
| user_id | path     | string | Yes      | none       |

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

| name                               | type        | required | constraint | Chinese name  | illustrate                         |
| ---------------------------------- | ----------- | -------- | ---------- | ------------- | ---------------------------------- |
| user_id       | integer     | true     | none       | User id       | none                               |
| email                              | string¦null | false    | none       | Email         | email address                      |
| nick_name     | string      | false    | none       | Nick name     | User's Nickname                    |
| phone                              | string¦null | false    | none       | Phone         | cellphone number                   |
| is_active     | boolean     | false    | none       | Is active     | active state                       |
| origion                            | string¦null | false    | none       | Origion       | User source                        |
| create_time   | string      | false    | none       | Create time   | creation time                      |
| client_ip     | string¦null | false    | none       | Client ip     | register ip                        |
| enterprise_id | string      | false    | none       | Enterprise id | enterprise_id |
