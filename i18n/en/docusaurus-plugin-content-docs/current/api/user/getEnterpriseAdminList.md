---
title: Get a list of enterprise administrators
---

## Basic Information

Get a list of enterprise administrators

```json title="请求路径"
GET /openapi/v1/administrators
```

## request parameters

| name                           | Location | type   | required | illustrate        |
| ------------------------------ | -------- | ------ | -------- | ----------------- |
| eid                            | Query    | String | no       | Enterprise ID     |
| page                           | Query    | String | no       | page number       |
| page_size | Query    | String | no       | Quantity per page |

```json title="返回成功示例"
{
  "users": [
    {
      "user_id": 20,
      "create_time": "1989-05-01 04:39:15",
      "origion": null,
      "nick_name": "Xiong Qiang" ,
      "client_ip": "191.197.77.228",
      "email": "t.mlnkciau@qq.com",
      "is_active": true,
      "phone": "18671541879",
      "enterprise_id": "18 "
    },
    {
      "user_id": 26,
      "phone": "13176190182",
      "create_time": "2016-10-15 03:28:33",
      "client_ip": "111.143.107.142" ,
      "is_active": true,
      "nick_name": "Gao Xiuying",
      "email": "e.ebvmwo@qq.com",
      "enterprise_id": "71",
      "origion": ""
    }
  ],
  "total": 7
}
```

## return result

| status code | Status code meaning | illustrate | data model                             |
| ----------- | ------------------- | ---------- | -------------------------------------- |
| 200         | OK                  | success    | [ListUsersRespView](#listusersresview) |

## Model

### ListUserReseView

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