---
title: get user list
---

## Basic Information

get user list

```json title="请求路径"
GET /openapi/v1/users
```

## request parameters

| name                           | Location | type   | required | illustrate                            |
| ------------------------------ | -------- | ------ | -------- | ------------------------------------- |
| Query                          | Query    | String | no       | Username, Email, Mobile Number Search |
| page                           | Query    | String | no       | page number                           |
| page_size | Query    | String | no       | Quantity per page                     |

## return result

| status code | Status code meaning | illustrate | data model                             |
| ----------- | ------------------- | ---------- | -------------------------------------- |
| 200         | OK                  | success    | [ListUsersRespView](#listusersresview) |

## Model

### listusersreply

```json
{
  "users": [
    {
      "user_id": 0,
      "email": "string",
      "nick_name": "string",
      "phone": "string",
      "is_active": true,
      "origion": "string",
      "create_time": "string",
      "client_ip": "string",
      "enterprise_id": "string"
    }
  ],
  "total": 0
}

```

### Attributes

| name  | type                                                                                                  | required | constraint | Chinese name | illustrate |
| ----- | ----------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| Users | [[UserInfo](/docs/api/user/getUserInfo#userinfo)] | true     | none       |              | none       |
| Total | integer                                                                                               | true     | none       | Total        | none       |
