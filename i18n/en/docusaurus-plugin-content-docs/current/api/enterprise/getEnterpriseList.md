---
title: Get business list
---

## Basic Information

Get business list

```json title="请求路径"
GET /openapi/v2/manage/enterprises
```

## request parameters

| name     | Location | type   | required | illustrate                              |
| -------- | -------- | ------ | -------- | --------------------------------------- |
| query    | query    | string | no       | Search by business name, business alias |
| current  | query    | string | no       | page number                             |
| pageSize | query    | string | no       | Quantity per page                       |

## return result

| status code | Status code meaning | illustrate | data model                    |
| ----------- | ------------------- | ---------- | ----------------------------- |
| 200         | OK                  | success    | [ListEntsResp](#listentsresp) |

## Model

### ListEntsResp

```json
{
  "total": 0,
  "data": [
    {
      "enterprise_id": "string",
      "enterprise_name": "string",
      "enterprise_alias": "string",
      "create_time": "2019 -08-24T14:15:22Z",
      "region_num": 0,
      "user_num": 0,
      "team_num": 0,
      "is_active": true
    }
  ]
}

```

### Attributes

| name  | type                                                                                                  | required | constraint | Chinese name | illustrate |
| ----- | ----------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| total | integer                                                                                               | true     | none       | Total        | Total      |
| data  | [[EnterpriseListInfo](#schemaenterpriselistinfo)] | true     | none       |              | none       |
