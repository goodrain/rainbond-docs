---
title: get user list
---

## 基本信息

get user list

```json title="请求路径"
GET /openapi/v1/users
```

## request parameters

| name                           | Location | type   | required | illustrate                            |
| ------------------------------ | -------- | ------ | -------- | ------------------------------------- |
| query                          | query    | string | no       | Username, Email, Mobile Number Search |
| page                           | query    | string | no       | page number                           |
| page_size | query    | string | no       | Quantity per page                     |

## return result

| status code | Status code meaning | illustrate | data model                              |
| ----------- | ------------------- | ---------- | --------------------------------------- |
| 200         | OK                  | success    | [ListUsersRespView](#listusersrespview) |

## Model

### listusersrespview

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
| users | [[UserInfo](/docs/api/user/getUserInfo#userinfo)] | true     | none       |              | none       |
| total | integer                                                                                               | true     | none       | Total        | none       |
