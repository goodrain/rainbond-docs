---
title: 更新团队信息
---

## 基本信息

该接口主要用于更新团队信息

```shell title="请求路径"
PUT /openapi/v1/teams/{team_id}
```

```json title="Body 请求体示例"
{
  "region": "string",
  "is_active": true,
  "creater": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

## 请求参数

| 名称    | 位置 | 类型                                          | 必选 | 中文名 | 说明 |
| ------- | ---- | --------------------------------------------- | ---- | ------ | ---- |
| team_id | path | string                                        | 是   |        | none |
| body    | body | [UpdateTeamInfoReq](#schemaupdateteaminforeq) | 否   |        | none |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                      |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------- |
| 200    | OK | 成功 | [UpdateTeamInfoReq](#schemaupdateteaminforeq) |

## 模型

### UpdateTeamInfoReq<a id="schemaupdateteaminforeq"></a>

```json
{
  "region": "string",
  "is_active": true,
  "creater": 0,
  "tenant_alias": "string",
  "enterprise_id": "string"
}
```

### 属性

| 名称          | 类型    | 必选  | 约束 | 中文名        | 说明             |
| ------------- | ------- | ----- | ---- | ------------- | ---------------- |
| region        | string  | false | none | Region        | 数据中心名称     |
| is_active     | boolean | false | none | Is active     | 是否激活         |
| creater       | integer | false | none | Creater       | 团队拥有者用户ID |
| tenant_alias  | string  | false | none | Tenant alias  | 团队别名         |
| enterprise_id | string  | false | none | Enterprise id | 企业ID           |
