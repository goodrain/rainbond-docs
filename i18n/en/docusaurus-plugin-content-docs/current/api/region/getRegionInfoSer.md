---
title: Get the specified data center data
---

## basic information

Get the specified data center data

```json title="请求路径"
GET /openapi/v2/manage/regions/{region_id}
```

## request parameters

| name                           | Location | type   | required | Chinese name | illustrate |
| ------------------------------ | -------- | ------ | -------- | ------------ | ---------- |
| region_id | Path     | String | Yes      |              | none       |

## return result

| status code | Status code meaning                                            | illustrate | data model                                                                 |
| ----------- | -------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| 200         | OK                                                             | success    | [v2_RegionInfoSerializer](#v2_regionininfoserializer) |
| 404         | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | 404        | [Fail](#schemafail)                                                        |

## Model

### v2_RegionInfoSerializer

```json
{
  "region_id": "string",
  "region_name": "string",
  "region_alias": "string",
  "url": "string",
  "token": "string",
  "wsurl" : "string",
  "httpdomain": "string",
  "tcpdomain": "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "cert_file": "string",
  "key_file": "string",
  "status": "st",
  "desc": "string"
}

```

### Attributes

| name                                                  | type        | required | constraint | Chinese name | illustrate                                                                                           |        |
| ----------------------------------------------------- | ----------- | -------- | ---------- | ------------ | ---------------------------------------------------------------------------------------------------- | ------ |
| region_id                        | String      | true     | none       | Region id    | region id                                                                                            |        |
| region_name                      | String      | true     | none       | Region name  | Data center name, cannot be modified                                                                 |        |
| region_alias                     | String      | true     | none       | Region alias | data center alias                                                                                    |        |
| Url                                                   | String      | true     | none       | Url          | Datacenter API url                                                                                   |        |
| token                                                 | Stringenull | false    | none       | Token        | data center token                                                                                    |        |
| wsurl                                                 | String      | true     | none       | Wsurl        | datacenter websocket url                                                                             |        |
| pdomain                                               | String      | true     | none       | Httpdain     | Data center http application access root domain name                                                 |        |
| tcpdomain                                             | String      | true     | none       | Tcpdomain    | Data center tcp application access root domain name                                                  |        |
| Scope                                                 | String      | false    | none       | Scope        | data center scope private                                                                            | Public |
| ssl_ca_cert | Stringenull | false    | none       | ssl ca cert  | Data center access ca certificate address                                                            |        |
| cert_file                        | Stringenull | false    | none       | Cert file    | Verify documents                                                                                     |        |
| key_file                         | Stringenull | false    | none       | Key file     | verification key                                                                                     |        |
| Status                                                | String      | true     | none       | Status       | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | String      | false    | none       | Desc         | Data Center Description                                                                              |        |
