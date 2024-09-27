---
title: Get the list of clusters opened by the team
---

## Basic Information

This interface is mainly used to obtain the list of clusters opened by the team

```shell title="请求路径"
GET /openapi/v1/teams/{team_id}/regions
```

## request parameters

| name                           | Location | type   | required | Chinese name | illustrate                 |
| ------------------------------ | -------- | ------ | -------- | ------------ | -------------------------- |
| team_id   | Path     | String | Yes      |              | none                       |
| Query                          | Query    | String | no       |              | Search by data center name |
| page                           | Query    | String | no       |              | page number                |
| page_size | Query    | String | no       |              | Quantity per page          |

## return result

| status code | Status code meaning | illustrate | data model                                       |
| ----------- | ------------------- | ---------- | ------------------------------------------------ |
| 200         | OK                  | success    | [ListTeamRegionsResp](#schemalistteamregionsres) |

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

| name    | type                                                                                           | required | constraint | Chinese name | illustrate |
| ------- | ---------------------------------------------------------------------------------------------- | -------- | ---------- | ------------ | ---------- |
| Total   | integer                                                                                        | true     | none       | Total        | none       |
| Regions | [[TeamRegionsResp](#schemateamregionsres)] | true     | none       |              | none       |

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
| region_id    | String      | true     | none       | Region id    | region id                                                                                            |
| region_name  | String      | true     | none       | Region name  | data center name                                                                                     |
| region_alias | String      | true     | none       | Region alias | data center alias                                                                                    |
| tenant_name  | String      | true     | none       | Tenant name  | Tenant Name                                                                                          |
| Url                               | String      | true     | none       | Url          | Datacenter API url                                                                                   |
| wsurl                             | String      | true     | none       | Wsurl        | datacenter websocket url                                                                             |
| pdomain                           | String      | true     | none       | Httpdain     | Data center http application access root domain name                                                 |
| tcpdomain                         | String      | true     | none       | Tcpdomain    | Data center tcp application access root domain name                                                  |
| token                             | Stringenull | false    | none       | Token        | data center token                                                                                    |
| Status                            | String      | true     | none       | Status       | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |
| desc                              | String      | true     | none       | Desc         | Data Center Description                                                                              |
| Scope                             | String      | false    | none       | Scope        | Datacenter-wide private                                                                              |
