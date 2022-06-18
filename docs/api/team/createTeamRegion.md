---
title: 为团队开通集群
---

## 基本信息

该接口主要用于为某个团队开通新的集群

```shell title="请求路径"
POST /openapi/v1/teams/{team_id}/regions
```

```json title="Body 请求体示例"
{
  "region": "string"
}
```

## 请求参数

| 名称    | 位置 | 类型                                  | 必选 | 中文名 | 说明 |
| ------- | ---- | ------------------------------------- | ---- | ------ | ---- |
| team_id | path | string                                | 是   |        | none |
| body    | body | [TeamRegionReq](#schemateamregionreq) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 201   | Created | 成功 | [TeamBaseInfo](#schemateambaseinfo)   |

## 模型

### TeamRegionReq<a id="schemateamregionreq"></a>

```json
{
  "region": "string"
}
```

### 属性

| 名称   | 类型   | 必选  | 约束 | 中文名 | 说明         |
| ------ | ------ | ----- | ---- | ------ | ------------ |
| region | string | false | none | Region | 数据中心名称 |


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
