---
title: Get business list
---

## Basic Information

Get business list

```json title="请求路径"
GET /openapi/v2/manage/Enterprises
```

## request parameters

| name     | Location | type   | required | illustrate                              |
| -------- | -------- | ------ | -------- | --------------------------------------- |
| Query    | Query    | String | no       | Search by business name, business alias |
| Current  | Query    | String | no       | page number                             |
| pageSize | Query    | String | no       | Quantity per page                       |

## return result

| status code | Status code meaning | illustrate | data model                    |
| ----------- | ------------------- | ---------- | ----------------------------- |
| 200         | OK                  | success    | [ListEntsResp](#listentsresk) |

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
| Total | integer                                                                                               | true     | none       | Total        | Total      |
| Data  | [[EnterpriseListInfo](#schemaenterpriselistinfo)] | true     | none       |              | none       |
