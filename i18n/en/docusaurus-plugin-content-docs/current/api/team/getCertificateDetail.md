---
title: Get the details of the certificate under the team
---

## Basic Information

This interface is mainly used to obtain the details of the certificate under the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/certificates/{certificate_id}
```

## request parameters

| name                                | Location | type   | required | Chinese name | illustrate |
| ----------------------------------- | -------- | ------ | -------- | ------------ | ---------- |
| team_id        | Path     | String | Yes      |              | none       |
| certificate_id | Path     | String | Yes      |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                    |
| ----------- | ------------------- | ---------- | --------------------------------------------- |
| 200         | OK                  | success    | [TeamCertificatesR](#schemateamcertificatesr) |

## Model

### TeamCertificatesR<a id="schemateamcertificatesr"></a>

```json
LO
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string",
  "id": 0
}
```

### Attributes

| name                                  | type    | required | constraint | Chinese name     | illustrate        |
| ------------------------------------- | ------- | -------- | ---------- | ---------------- | ----------------- |
| alias                                 | String  | true     | none       | Alias            | certificate name  |
| private key                           | String  | true     | none       | Private key      | Certificates      |
| Certificate                           | String  | true     | none       | Certificates     | certificate key   |
| Certificate_type | String  | true     | none       | Certificate type | Basic Information |
| Id                                    | integer | true     | none       | Id               | Id                |
