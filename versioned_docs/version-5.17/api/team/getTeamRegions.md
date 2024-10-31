---
title: 获取团队开通的集群列表
---

## 基本信息

该接口主要用于获取团队开通的集群列表

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions
```

## 请求参数

| 名称      | 位置  | 类型   | 必选 | 中文名 | 说明                 |
| --------- | ----- | ------ | ---- | ------ | -------------------- |
| team_id   | path  | string | 是   |        | none                 |
| query     | query | string | 否   |        | 根据数据中心名称搜索 |
| page      | query | string | 否   |        | 页码                 |
| page_size | query | string | 否   |        | 每页数量             |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [ListTeamRegionsResp](#schemalistteamregionsresp)   |

## 模型

### ListTeamRegionsResp<a id="schemalistteamregionsresp"></a>

```json
{
  "total": 0,
  "regions": [
    {
      "region_id": "string",
      "region_name": "string",
      "region_alias": "string",
      "tenant_name": "string",
      "url": "string",
      "wsurl": "string",
      "httpdomain": "string",
      "tcpdomain": "string",
      "token": "",
      "status": "st",
      "desc": "string",
      "scope": "private"
    }
  ]
}
```

### 属性

| 名称    | 类型                                        | 必选 | 约束 | 中文名 | 说明 |
| ------- | ------------------------------------------- | ---- | ---- | ------ | ---- |
| total   | integer                                     | true | none | Total  | none |
| regions | [[TeamRegionsResp](#schemateamregionsresp)] | true | none |        | none |

### TeamRegionsResp<a id="schemateamregionsresp"></a>

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "tenant_name": "string",
  "url": "string",
  "wsurl": "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "token": "",
  "status": "st",
  "desc": "string",
  "scope": "private"
}
```

### 属性

| 名称         | 类型        | 必选  | 约束 | 中文名       | 说明                                           |
| ------------ | ----------- | ----- | ---- | ------------ | ---------------------------------------------- |
| region_id    | string      | true  | none | Region id    | region id                                      |
| region_name  | string      | true  | none | Region name  | 数据中心名称                                   |
| region_alias | string      | true  | none | Region alias | 数据中心别名                                   |
| tenant_name  | string      | true  | none | Tenant name  | 租户名称                                       |
| url          | string      | true  | none | Url          | 数据中心API url                                |
| wsurl        | string      | true  | none | Wsurl        | 数据中心Websocket url                          |
| httpdomain   | string      | true  | none | Httpdomain   | 数据中心http应用访问根域名                     |
| tcpdomain    | string      | true  | none | Tcpdomain    | 数据中心tcp应用访问根域名                      |
| token        | string¦null | false | none | Token        | 数据中心token                                  |
| status       | string      | true  | none | Status       | 数据中心状态 0：编辑中 1:启用 2：停用 3:维护中 |
| desc         | string      | true  | none | Desc         | 数据中心描述                                   |
| scope        | string      | false | none | Scope        | 数据中心范围 private                           |
