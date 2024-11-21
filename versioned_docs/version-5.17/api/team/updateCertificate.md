---
title: 更新证书
---

## 基本信息

该接口主要用于更新证书

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

## 请求参数

| 名称           | 位置 | 类型                                          | 必选 | 中文名 | 说明 |
| -------------- | ---- | --------------------------------------------- | ---- | ------ | ---- |
| team_id        | path | string                                        | 是   |        | none |
| certificate_id | path | string                                        | 是   |        | none |
| body           | body | [TeamCertificatesC](#schemateamcertificatesc) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamCertificatesR](#schemateamcertificatesr)   |

## 模型

### TeamCertificatesC<a id="schemateamcertificatesc"></a>

```json
{
  "alias": "string",
  "private_key": "string",
  "certificate": "string",
  "certificate_type": "string"
}
```

### 属性

| 名称             | 类型   | 必选 | 约束 | 中文名           | 说明     |
| ---------------- | ------ | ---- | ---- | ---------------- | -------- |
| alias            | string | true | none | Alias            | 证书名称 |
| private_key      | string | true | none | Private key      | 证书     |
| certificate      | string | true | none | Certificate      | 证书key  |
| certificate_type | string | true | none | Certificate type | 证书类型 |

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

### 属性

| 名称             | 类型    | 必选 | 约束 | 中文名           | 说明     |
| ---------------- | ------- | ---- | ---- | ---------------- | -------- |
| alias            | string  | true | none | Alias            | 证书名称 |
| private_key      | string  | true | none | Private key      | 证书     |
| certificate      | string  | true | none | Certificate      | 证书key  |
| certificate_type | string  | true | none | Certificate type | 证书类型 |
| id               | integer | true | none | Id               | id       |
