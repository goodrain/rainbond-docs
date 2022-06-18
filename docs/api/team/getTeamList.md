---
title: 获取团队列表
---

## 基本信息

该接口主要用于获取用户所在团队列表

```shell title="请求路径"
GET /openapi/v1/teams
```

## 请求参数

| 名称      | 位置  | 类型   | 必选 | 中文名 | 说明         |
| --------- | ----- | ------ | ---- | ------ | ------------ |
| query     | query | string | 否   |        | 团队名称搜索 |
| page      | query | string | 否   |        | 页码         |
| page_size | query | string | 否   |        | 每页数量     |

## 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | OK | 成功 | [ListTeamResp](#schemalistteamresp)   |

## 模型

## ListTeamResp<a id="schemalistteamresp"></a>

```json
{
  "total": 0,
  "tenants": [
    {
      "tenant_id": "string",
      "tenant_name": "string",
      "tenant_alias": "string",
      "enterprise_id": "string",
      "is_active": true,
      "create_time": "string",
      "creater": "string",
      "role_infos": [
        {
          "role_name": "string",
          "role_id": "string"
        }
      ],
      "service_num": 0,
      "region_num": 0
    }
  ]
}
```

### 属性

| 名称    | 类型                          | 必选  | 约束 | 中文名 | 说明 |
| ------- | ----------------------------- | ----- | ---- | ------ | ---- |
| total   | integer                       | false | none | Total  | none |
| tenants | [[TeamInfo](#schemateaminfo)] | true  | none |        | none |

### TeamInfo<a id="schemateaminfo"></a>

```json
{
  "tenant_id": "string",
  "tenant_name": "string",
  "tenant_alias": "string",
  "enterprise_id": "string",
  "is_active": true,
  "create_time": "string",
  "creater": "string",
  "role_infos": [
    {
      "role_name": "string",
      "role_id": "string"
    }
  ],
  "service_num": 0,
  "region_num": 0
}
```

### 属性

| 名称          | 类型                          | 必选  | 约束 | 中文名        | 说明                   |
| ------------- | ----------------------------- | ----- | ---- | ------------- | ---------------------- |
| tenant_id     | string                        | true  | none | Tenant id     | 团队ID                 |
| tenant_name   | string                        | true  | none | Tenant name   | 团队名称               |
| tenant_alias  | string                        | true  | none | Tenant alias  | 团队别名               |
| enterprise_id | string                        | true  | none | Enterprise id | 企业ID                 |
| is_active     | boolean                       | false | none | Is active     | 是否激活               |
| create_time   | string                        | false | none | Create time   | 创建时间               |
| creater       | string                        | false | none | Creater       | 团队拥有者用户         |
| role_infos    | [[RoleInfo](#schemaroleinfo)] | false | none |               | 用户在团队中拥有的角色 |
| service_num   | integer                       | false | none | Service num   | 团队的组件数量         |
| region_num    | integer                       | false | none | Region num    | 团队开通的数据中心数量 |

### RoleInfo<a id="schemaroleinfo"></a>

```json
{
  "role_name": "string",
  "role_id": "string"
}
```

### 属性

| 名称      | 类型   | 必选 | 约束 | 中文名    | 说明     |
| --------- | ------ | ---- | ---- | --------- | -------- |
| role_name | string | true | none | Role name | 角色名称 |
| role_id   | string | true | none | Role id   | 角色ID   |
