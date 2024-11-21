---
title: 创建团队
---

## 基本信息

该接口主要用于创建团队

```shell title="请求路径"
POST /openapi/v1/teams
```

```json title="Body 请求体示例"
{
  "tenant_name": "string",
  "region": "string"
}
```

## 请求参数

| 名称 | 位置 | 类型                                  | 必选 | 中文名 | 说明 |
| ---- | ---- | ------------------------------------- | ---- | ------ | ---- |
| body | body | [CreateTeamReq](#schemacreateteamreq) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [TeamBaseInfo](#schemateambaseinfo)   |

## 模型

### CreateTeamReq<a id="schemacreateteamreq"></a>

```json
{
  "tenant_name": "string",
  "region": "string"
}
```

### 属性

| 名称        | 类型   | 必选  | 约束 | 中文名      | 说明                               |
| ----------- | ------ | ----- | ---- | ----------- | ---------------------------------- |
| tenant_name | string | true  | none | Tenant name | 团队名称                           |
| region      | string | false | none | Region      | 默认开通的数据中心，未指定则不开通 |

### TeamBaseInfo<a id="schemateambaseinfo"></a>

```json
{
  "tenant_id": "string",
  "tenant_name": "string",
  "region": "",
  "is_active": true,
  "create_time": "string",
  "creater": 0,
  "limit_memory": 1024,
  "update_time": "string",
  "expired_time": "string",
  "tenant_alias": "",
  "enterprise_id": ""
}
```

### 属性

| 名称          | 类型        | 必选  | 约束 | 中文名        | 说明              |
| ------------- | ----------- | ----- | ---- | ------------- | ----------------- |
| tenant_id     | string      | true  | none | Tenant id     | 租户id            |
| tenant_name   | string      | true  | none | Tenant name   | 租户名称          |
| region        | string      | false | none | Region        | 区域中心,弃用     |
| is_active     | boolean     | false | none | Is active     | 激活状态          |
| create_time   | string      | true  | none | Create time   | 创建时间          |
| creater       | integer     | false | none | Creater       | 租户创建者        |
| limit_memory  | integer     | false | none | Limit memory  | 内存大小单位（M） |
| update_time   | string      | true  | none | Update time   | 更新时间          |
| expired_time  | string      | true  | none | Expired time  | 过期时间          |
| tenant_alias  | string¦null | false | none | Tenant alias  | 团队别名          |
| enterprise_id | string¦null | false | none | Enterprise id | 企业id            |
