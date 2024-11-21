---
title: Add certificate
---

## Basic Information

This interface is mainly used to add certificates

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/certificates
```

```json title="Body 请求体示例"
LO
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string"
}
```

## request parameters

| name                         | Location | type                                           | required | Chinese name | illustrate |
| ---------------------------- | -------- | ---------------------------------------------- | -------- | ------------ | ---------- |
| team_id | Path     | String                                         | Yes      |              | none       |
| body                         | body     | [TeamCertificatesC](#schemateamcertificateesc) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                    |
| ----------- | ------------------- | ---------- | --------------------------------------------- |
| 200         | OK                  | success    | [TeamCertificatesR](#schemateamcertificatesr) |

## Model

### TeamCertificatesC<a id="schemateamcertificatesc"></a>

```json
LO
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string"
}
```

### Attributes

| name                                  | type   | required | constraint | Chinese name     | illustrate       |
| ------------------------------------- | ------ | -------- | ---------- | ---------------- | ---------------- |
| alias                                 | String | true     | none       | Alias            | certificate name |
| private key                           | String | true     | none       | Private key      | Certificates     |
| Certificate                           | String | true     | none       | Certificates     | certificate key  |
| Certificate_type | String | true     | none       | Certificate type | Certificate Type |

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
