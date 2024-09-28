---
title: Update certificate
---

## 基本信息

This interface is mainly used to update the certificate

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}/certificates/{certificate_id}
```

```json title="Body 请求体示例"
{
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string"
}
```

## request parameters

| name                                | Location | type                                          | required | Chinese name | illustrate |
| ----------------------------------- | -------- | --------------------------------------------- | -------- | ------------ | ---------- |
| team_id        | path     | string                                        | Yes      |              | none       |
| certificate_id | path     | string                                        | Yes      |              | none       |
| body                                | body     | [TeamCertificatesC](#schemateamcertificatesc) | no       |              | none       |

## return result

| status code | Status code meaning | illustrate | data model                                    |
| ----------- | ------------------- | ---------- | --------------------------------------------- |
| 200         | OK                  | success    | [TeamCertificatesR](#schemateamcertificatesr) |

## Model

### TeamCertificatesC<a id="schemateamcertificatesc"></a>

```json
{
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string"
}
```

### Attributes

| name                                  | type   | required | constraint | Chinese name     | illustrate       |
| ------------------------------------- | ------ | -------- | ---------- | ---------------- | ---------------- |
| alias                                 | string | true     | none       | Alias            | certificate name |
| private_key      | string | true     | none       | Private key      | 证书               |
| certificate                           | string | true     | none       | Certificate      | certificate key  |
| certificate_type | string | true     | none       | Certificate type | 证书类型             |

### TeamCertificatesR<a id="schemateamcertificatesr"></a>

```json
{
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
| alias                                 | string  | true     | none       | Alias            | certificate name  |
| private_key      | string  | true     | none       | Private key      | 证书                |
| certificate                           | string  | true     | none       | Certificate      | certificate key   |
| certificate_type | string  | true     | none       | Certificate type | Basic Information |
| id                                    | integer | true     | none       | Id               | id                |
