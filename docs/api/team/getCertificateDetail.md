---
title: 获取团队下证书详情
---

## 基本信息

该接口主要用于获取团队下证书详情

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/certificates/{certificate_id}
```

## 请求参数

| 名称           | 位置 | 类型   | 必选 | 中文名 | 说明 |
| -------------- | ---- | ------ | ---- | ------ | ---- |
| team_id        | path | string | 是   |        | none |
| certificate_id | path | string | 是   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamCertificatesR](#schemateamcertificatesr)   |

## 模型

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
