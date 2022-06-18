---
title: 获取团队下证书列表
---

## 基本信息

该接口主要用于获取团队下证书列表

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/certificates
```

## 请求参数

| 名称      | 位置  | 类型   | 必选 | 中文名 | 说明     |
| --------- | ----- | ------ | ---- | ------ | -------- |
| team_id   | path  | string | 是   |        | none     |
| page      | query | number | 否   |        | 页码     |
| page_size | query | number | 否   |        | 每页数量 |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamCertificatesL](#schemateamcertificatesl)   |

## 模型

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
      "end_data": "string",
      "id": 0,
      "issued_by": "string"
    }
  ],
  "page": 0,
  "page_size": 0,
  "total": 0
}
```

### 属性

| 名称      | 类型                                    | 必选 | 约束 | 中文名    | 说明 |
| --------- | --------------------------------------- | ---- | ---- | --------- | ---- |
| list      | [[CertificatesR](#schemacertificatesr)] | true | none |           | none |
| page      | integer                                 | true | none | Page      | none |
| page_size | integer                                 | true | none | Page size | none |
| total     | integer                                 | true | none | Total     | none |

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
  "id": 0,
  "issued_by": "string"
}
```

### 属性

| 名称             | 类型     | 必选 | 约束 | 中文名           | 说明     |
| ---------------- | -------- | ---- | ---- | ---------------- | -------- |
| has_expired      | boolean  | true | none | Has expired      | 是否过期 |
| issued_to        | [string] | true | none |                  | 域名列表 |
| alias            | string   | true | none | Alias            | 证书名称 |
| certificate_type | string   | true | none | Certificate type | 证书类型 |
| end_data         | string   | true | none | End data         | 过期时间 |
| id               | integer  | true | none | Id               | id       |
| issued_by        | string   | true | none | Issued by        | 证书来源 |
