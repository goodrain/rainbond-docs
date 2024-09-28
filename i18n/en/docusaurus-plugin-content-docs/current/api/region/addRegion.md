---
title: Add data center
---

## basic information

Add data center

```json title="请求路径"
POST /openapi/v1/region
```

```json title="Body请求参数"
{
  "cert_file": "string",
  "desc": "string",
  "httpdomain": "string",
  "key_file": "string",
  "region_alias": "string",
  "region_name" : "string",
  "scope": "string",
  "ssl_ca_cert": "string",
  "status": 0,
  "tcpdomain": "string",
  "url": "string",
  " wsurl": "string"
}
```

## request parameters

| name                                                    | Location | type    | required | Chinese name     | illustrate    |
| ------------------------------------------------------- | -------- | ------- | -------- | ---------------- | ------------- |
| body                                                    | body     | Object  | no       | AddRegionRequest | none          |
| » cert_file                        | body     | String  | no       |                  | none          |
| » desc                                                  | body     | String  | no       |                  | Remark        |
| » httpomain                                             | body     | String  | Yes      |                  | none          |
| » key_file                         | body     | String  | no       |                  | none          |
| » region_alias                     | body     | String  | Yes      |                  | cluster alias |
| » region_name                      | body     | String  | Yes      |                  | cluster ID    |
| » scope                                                 | body     | String  | no       |                  | none          |
| » ssl_ca_cert | body     | String  | no       |                  | none          |
| » status                                                | body     | integer | no       |                  | none          |
| » tcpdomain                                             | body     | String  | Yes      |                  | none          |
| » url                                                   | body     | String  | Yes      |                  | none          |
| » wsurl                                                 | body     | String  | Yes      |                  | none          |

> back to example

## return result

| status code | Status code meaning                                                                                                                                                                                                      | illustrate | data model                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------- |
| 201         | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)                                                                                                                                                             | success    | [RegionInfo](#regioninfo) |
| 400         | [Bad Request] (https://tools.ietf.org/html/rfc7231#section-6.5.1) | 400        | [Fail](#schemafail)       |

## Model

### RegionInfo

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
  "desc": "string",
  "enterprise_id": "string"
}

```

### Attributes

| name                                                  | type        | required | constraint | Chinese name  | illustrate                                                                                           |        |
| ----------------------------------------------------- | ----------- | -------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| region_id                        | String      | true     | none       | Region id     | region id                                                                                            |        |
| region_name                      | String      | true     | none       | Region name   | Data center name, cannot be modified                                                                 |        |
| region_alias                     | String      | true     | none       | Region alias  | data center alias                                                                                    |        |
| Url                                                   | String      | true     | none       | Url           | Datacenter API url                                                                                   |        |
| token                                                 | Stringenull | false    | none       | Token         | data center token                                                                                    |        |
| wsurl                                                 | String      | true     | none       | Wsurl         | datacenter websocket url                                                                             |        |
| pdomain                                               | String      | true     | none       | Httpdain      | Data center http application access root domain name                                                 |        |
| tcpdomain                                             | String      | true     | none       | Tcpdomain     | Data center tcp application access root domain name                                                  |        |
| Scope                                                 | String      | false    | none       | Scope         | data center scope private                                                                            | Public |
| ssl_ca_cert | Stringenull | false    | none       | ssl ca cert   | Data center access ca certificate address                                                            |        |
| cert_file                        | Stringenull | false    | none       | Cert file     | Verify documents                                                                                     |        |
| key_file                         | Stringenull | false    | none       | Key file      | verification key                                                                                     |        |
| Status                                                | String      | true     | none       | Status        | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | String      | false    | none       | Desc          | Data Center Description                                                                              |        |
| Enterprise_id                    | Stringenull | false    | none       | Enterprise id | Enterprise id                                                                                        |        |
