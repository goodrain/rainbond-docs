---
title: Get the list of certificates under the team
---

## Basic Information

This interface is mainly used to obtain the list of certificates under the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/certificates
```

## request parameters

| name                           | Location | type   | required | Chinese name | illustrate        |
| ------------------------------ | -------- | ------ | -------- | ------------ | ----------------- |
| team_id   | Path     | String | Yes      |              | none              |
| page                           | Query    | Number | no       |              | page number       |
| page_size | Query    | Number | no       |              | Quantity per page |

## return result

| status code | Status code meaning | illustrate | data model                                   |
| ----------- | ------------------- | ---------- | -------------------------------------------- |
| 200         | OK                  | success    | [TeamCertificatesL](#schemateamcertificates) |

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

| name                           | type                                                                                      | required | constraint | Chinese name | illustrate |
| ------------------------------ | ----------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| list                           | [[CertificatesR](#schemacifertifesr)] | true     | none       |              | none       |
| page                           | integer                                                                                   | true     | none       | Page         | none       |
| page_size | integer                                                                                   | true     | none       | Page size    | none       |
| Total                          | integer                                                                                   | true     | none       | Total        | none       |

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
| has_expiredd     | boolean                                                      | true     | none       | Has expiredd     | Is it expired      |
| Issued_to        | [string] | true     | none       |                  | Domain name list   |
| alias                                 | String                                                       | true     | none       | Alias            | certificate name   |
| Certificate_type | String                                                       | true     | none       | Certificate type | Expiration         |
| end_data         | String                                                       | true     | none       | End data         | Expiration time    |
| Id                                    | integer                                                      | true     | none       | Id               | Id                 |
| Issued_by        | String                                                       | true     | none       | Issued by        | Certificate source |
