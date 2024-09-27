---
title: Get a list of all data centers
---

## basic information

Get a list of all data centers

```json title="请求路径"
GET /openapi/v1/regions
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
| » region_id                        | string                            | false    | none       | Region id    | region id                                                                                        |        |
| » region_name                      | string                            | true     | none       | Region name  | cluster name                                                                                     |        |
| » region_alias                     | string                            | true     | none       | Region alias | cluster alias                                                                                    |        |
| » url                                                   | string                            | true     | none       | Url          | Cluster API url                                                                                  |        |
| » wsurl                                                 | string                            | false    | none       | Wsurl        | cluster websocket url                                                                            |        |
| » httpdomain                                            | string                            | false    | none       | Httpdomain   | Cluster http application access root domain name                                                 |        |
| » tcpdomain                                             | string                            | false    | none       | Tcpdomain    | Cluster tcp application access root domain name                                                  |        |
| » status                                                | string                            | true     | none       | Status       | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| » desc                                                  | string                            | true     | none       | Desc         | Cluster description                                                                              |        |
| » scope                                                 | string                            | false    | none       | Scope        | data center scope private                                                                        | public |
| » ssl_ca_cert | string¦null                       | false    | none       | ssl ca cert  | api ca file                                                                                      |        |
| » cert_file                        | string¦null                       | false    | none       | Cert file    | api cert file                                                                                    |        |
| » key_file                         | string¦null                       | false    | none       | Key file     | api cert key file                                                                                |        |

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

| name                                                  | type         | required | constraint | Chinese name | illustrate                                                                                       |        |
| ----------------------------------------------------- | ------------ | -------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------ | ------ |
| region_id                        | string       | false    | none       | Region id    | region id                                                                                        |        |
| region_name                      | string       | true     | none       | Region name  | cluster name                                                                                     |        |
| region_alias                     | string       | true     | none       | Region alias | cluster alias                                                                                    |        |
| url                                                   | string       | true     | none       | Url          | Cluster API url                                                                                  |        |
| wsurl                                                 | string       | false    | none       | Wsurl        | cluster websocket url                                                                            |        |
| httpdomain                                            | string       | false    | none       | Httpdomain   | Cluster http application access root domain name                                                 |        |
| tcpdomain                                             | string       | false    | none       | Tcpdomain    | Cluster tcp application access root domain name                                                  |        |
| status                                                | string       | true     | none       | Status       | Cluster Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | string       | true     | none       | Desc         | Cluster description                                                                              |        |
| scope                                                 | string       | false    | none       | Scope        | data center scope private                                                                        | public |
| ssl_ca_cert | string\|null | false    | none       | ssl ca cert  | api ca file                                                                                      |        |
| cert_file                        | string\|null | false    | none       | Cert file    | api cert file                                                                                    |        |
| key_file                         | string\|null | false    | none       | Key file     | api cert key file                                                                                |        |
