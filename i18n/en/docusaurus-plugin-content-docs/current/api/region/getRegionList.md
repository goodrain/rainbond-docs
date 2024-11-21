---
title: Get a list of all data centers
---

## basic information

Get a list of all data centers

```json title="请求路径"
GET /openapi/v1/region
```

## return result

| status code | Status code meaning | illustrate | data model |
| ----------- | ------------------- | ---------- | ---------- |
| 200         | OK                  | success    | Inline     |

## return data structure

Status code **200**

| name                                                    | type                              | required | constraint | Chinese name | illustrate                                                                                       |        |
| ------------------------------------------------------- | --------------------------------- | -------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------ | ------ |
| _anonymous_                                             | [RegionInfoResp](#regioninforesp) | false    | none       |              | none                                                                                             |        |
| » region_id                        | String                            | false    | none       | Region id    | region id                                                                                        |        |
| » region_name                      | String                            | true     | none       | Region name  | cluster name                                                                                     |        |
| » region_alias                     | String                            | true     | none       | Region alias | cluster alias                                                                                    |        |
| » url                                                   | String                            | true     | none       | Url          | Cluster API url                                                                                  |        |
| » wsurl                                                 | String                            | false    | none       | Wsurl        | cluster websocket url                                                                            |        |
| » httpomain                                             | String                            | false    | none       | Httpdain     | Cluster http application access root domain name                                                 |        |
| » tcpdomain                                             | String                            | false    | none       | Tcpdomain    | Cluster tcp application access root domain name                                                  |        |
| » status                                                | String                            | true     | none       | Status       | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| » desc                                                  | String                            | true     | none       | Desc         | Cluster description                                                                              |        |
| » scope                                                 | String                            | false    | none       | Scope        | data center scope private                                                                        | Public |
| » ssl_ca_cert | Stringenull                       | false    | none       | ssl ca cert  | api ca file                                                                                      |        |
| » cert_file                        | Stringenull                       | false    | none       | Cert file    | api cert file                                                                                    |        |
| » key_file                         | Stringenull                       | false    | none       | Key file     | api cert key file                                                                                |        |

## Model

### RegionInfoResp

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "wsurl": "string",
  "httpdomain" : "string",
  "tcpdomain": "string",
  "status": "st",
  "desc": "string",
  "scope": "private",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string"
}

```

### Attributes

| name                                                  | type        | required | constraint | Chinese name | illustrate                                                                                       |        |
| ----------------------------------------------------- | ----------- | -------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------ | ------ |
| region_id                        | String      | false    | none       | Region id    | region id                                                                                        |        |
| region_name                      | String      | true     | none       | Region name  | cluster name                                                                                     |        |
| region_alias                     | String      | true     | none       | Region alias | cluster alias                                                                                    |        |
| Url                                                   | String      | true     | none       | Url          | Cluster API url                                                                                  |        |
| wsurl                                                 | String      | false    | none       | Wsurl        | cluster websocket url                                                                            |        |
| pdomain                                               | String      | false    | none       | Httpdain     | Cluster http application access root domain name                                                 |        |
| tcpdomain                                             | String      | false    | none       | Tcpdomain    | Cluster tcp application access root domain name                                                  |        |
| Status                                                | String      | true     | none       | Status       | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | String      | true     | none       | Desc         | Cluster description                                                                              |        |
| Scope                                                 | String      | false    | none       | Scope        | data center scope private                                                                        | Public |
| ssl_ca_cert | Stringenull | false    | none       | ssl ca cert  | api ca file                                                                                      |        |
| cert_file                        | Stringenull | false    | none       | Cert file    | api cert file                                                                                    |        |
| key_file                         | Stringenull | false    | none       | Key file     | api cert key file                                                                                |        |
