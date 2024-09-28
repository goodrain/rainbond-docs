---
title: Get the list of clusters opened by the team
---

## 基本信息

This interface is mainly used to obtain the list of clusters opened by the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions
```

## request parameters

| name                           | Location | type   | required | Chinese name | illustrate                 |
| ------------------------------ | -------- | ------ | -------- | ------------ | -------------------------- |
| team_id   | path     | string | Yes      |              | none                       |
| query                          | query    | string | no       |              | Search by data center name |
| page                           | query    | string | no       |              | page number                |
| page_size | query    | string | no       |              | Quantity per page          |

## return result

| status code | Status code meaning | illustrate | data model                                        |
| ----------- | ------------------- | ---------- | ------------------------------------------------- |
| 200         | OK                  | success    | [ListTeamRegionsResp](#schemalistteamregionsresp) |

## Model

### ListTeamRegionsResp<a id="schemalistteamregionsresp"></a>

```json
{
  "total": 0,
  "regions": [
    {
      "region_id": "string",
      "region_name": "string",
      "region_alias": "string",
      "tenant_name": "string ",
      "url": "string",
      "wsurl": "string",
      "httpdomain": "string",
      "tcpdomain": "string",
      "token": "",
      "status" : "st",
      "desc": "string",
      "scope": "private"
    }
  ]
}
```

### Attributes

| name    | type                                                                                            | required | constraint | Chinese name | illustrate |
| ------- | ----------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| total   | integer                                                                                         | true     | none       | Total        | none       |
| regions | [[TeamRegionsResp](#schemateamregionsresp)] | true     | none       |              | none       |

### TeamRegionsResp<a id="schemateamregionsresp"></a>

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "tenant_name": "string",
  "url": "string",
  "wsurl" : "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "token": "",
  "status": "st",
  "desc": "string",
  "scope": "private"
}
```

### Attributes

| name                              | type        | required | constraint | Chinese name | illustrate                                                                                           |
| --------------------------------- | ----------- | -------- | ---------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| region_id    | string      | true     | none       | Region id    | region id                                                                                            |
| region_name  | string      | true     | none       | Region name  | data center name                                                                                     |
| region_alias | string      | true     | none       | Region alias | data center alias                                                                                    |
| tenant_name  | string      | true     | none       | Tenant name  | 租户名称                                                                                                 |
| url                               | string      | true     | none       | Url          | Datacenter API url                                                                                   |
| wsurl                             | string      | true     | none       | Wsurl        | datacenter websocket url                                                                             |
| httpdomain                        | string      | true     | none       | Httpdomain   | Data center http application access root domain name                                                 |
| tcpdomain                         | string      | true     | none       | Tcpdomain    | Data center tcp application access root domain name                                                  |
| token                             | string¦null | false    | none       | Token        | data center token                                                                                    |
| status                            | string      | true     | none       | Status       | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |
| desc                              | string      | true     | none       | Desc         | Data Center Description                                                                              |
| scope                             | string      | false    | none       | Scope        | Datacenter-wide private                                                                              |
