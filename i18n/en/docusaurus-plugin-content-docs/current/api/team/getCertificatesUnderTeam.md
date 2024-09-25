---
title: Get the list of certificates under the team
---

## 基本信息

This interface is mainly used to obtain the list of certificates under the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/certificates
```

## request parameters

| name                           | Location | type   | required | Chinese name | illustrate        |
| ------------------------------ | -------- | ------ | -------- | ------------ | ----------------- |
| team_id   | path     | string | Yes      |              | none              |
| page                           | query    | number | no       |              | page number       |
| page_size | query    | number | no       |              | Quantity per page |

## return result

| status code | Status code meaning | illustrate | data model                                    |
| ----------- | ------------------- | ---------- | --------------------------------------------- |
| 200         | OK                  | success    | [TeamCertificatesL](#schemateamcertificatesl) |

## Model

### TeamCertificatesL<a id="schemateamcertificatesl"></a>

```json
{
  "list": [
    {
      "has_expired": true,
      "issued_to": [
        "string"
      ],
      "alias": "string",
      "certificate_type": "string",
      "end_data ": "string",
      "id": 0,
      "issued_by": "string"
    }
  ],
  "page": 0,
  "page_size": 0,
  "total": 0
}
```

### Attributes

| name                           | type                                                                                        | required | constraint | Chinese name | illustrate |
| ------------------------------ | ------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| list                           | [[CertificatesR](#schemacertificatesr)] | true     | none       |              | none       |
| page                           | integer                                                                                     | true     | none       | Page         | none       |
| page_size | integer                                                                                     | true     | none       | Page size    | none       |
| total                          | integer                                                                                     | true     | none       | Total        | none       |

### CertificatesR<a id="schemacertificatesr"></a>

```json
{
  "has_expired": true,
  "issued_to": [
    "string"
  ],
  "alias": "string",
  "certificate_type": "string",
  "end_data": "string",
  " id": 0,
  "issued_by": "string"
}
```

### Attributes

| name                                  | type                                                         | required | constraint | Chinese name     | illustrate         |
| ------------------------------------- | ------------------------------------------------------------ | -------- | ---------- | ---------------- | ------------------ |
| has_expired      | boolean                                                      | true     | none       | Has expired      | Is it expired      |
| issued_to        | [string] | true     | none       |                  | Domain name list   |
| alias                                 | string                                                       | true     | none       | Alias            | certificate name   |
| certificate_type | string                                                       | true     | none       | Certificate type | Expiration         |
| end_data         | string                                                       | true     | none       | End data         | 过期时间               |
| id                                    | integer                                                      | true     | none       | Id               | id                 |
| issued_by        | string                                                       | true     | none       | Issued by        | Certificate source |
