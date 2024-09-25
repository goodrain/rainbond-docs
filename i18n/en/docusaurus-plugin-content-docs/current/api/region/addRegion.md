---
title: Add data center
---

## basic information

Add data center

```json title="请求路径"
POST /openapi/v1/regions
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
| body                                                    | body     | object  | no       | AddRegionRequest | none          |
| » cert_file                        | body     | string  | no       |                  | none          |
| » desc                                                  | body     | string  | no       |                  | Remark        |
| » httpdomain                                            | body     | string  | Yes      |                  | none          |
| » key_file                         | body     | string  | no       |                  | none          |
| » region_alias                     | body     | string  | Yes      |                  | cluster alias |
| » region_name                      | body     | string  | Yes      |                  | cluster ID    |
| » scope                                                 | body     | string  | no       |                  | none          |
| » ssl_ca_cert | body     | string  | no       |                  | none          |
| » status                                                | body     | integer | no       |                  | none          |
| » tcpdomain                                             | body     | string  | Yes      |                  | none          |
| » url                                                   | body     | string  | Yes      |                  | none          |
| » wsurl                                                 | body     | string  | Yes      |                  | none          |

> back to example

## return result

| status code | Status code meaning                                              | illustrate | data model                |
| ----------- | ---------------------------------------------------------------- | ---------- | ------------------------- |
| 201         | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)     | success    | [RegionInfo](#regioninfo) |
| 400         | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | 400        | [Fail](#schemafail)       |

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
| region_id                        | string      | true     | none       | Region id     | region id                                                                                            |        |
| region_name                      | string      | true     | none       | Region name   | Data center name, cannot be modified                                                                 |        |
| region_alias                     | string      | true     | none       | Region alias  | data center alias                                                                                    |        |
| url                                                   | string      | true     | none       | Url           | Datacenter API url                                                                                   |        |
| token                                                 | string¦null | false    | none       | Token         | data center token                                                                                    |        |
| wsurl                                                 | string      | true     | none       | Wsurl         | datacenter websocket url                                                                             |        |
| httpdomain                                            | string      | true     | none       | Httpdomain    | Data center http application access root domain name                                                 |        |
| tcpdomain                                             | string      | true     | none       | Tcpdomain     | Data center tcp application access root domain name                                                  |        |
| scope                                                 | string      | false    | none       | Scope         | data center scope private                                                                            | public |
| ssl_ca_cert | string¦null | false    | none       | ssl ca cert   | Data center access ca certificate address                                                            |        |
| cert_file                        | string¦null | false    | none       | Cert file     | Verify documents                                                                                     |        |
| key_file                         | string¦null | false    | none       | Key file      | verification key                                                                                     |        |
| status                                                | string      | true     | none       | Status        | Data Center Status 0：Editing 1: Enabled 2：Disabled 3: In Maintenance |        |
| desc                                                  | string      | false    | none       | Desc          | Data Center Description                                                                              |        |
| enterprise_id                    | string¦null | false    | none       | Enterprise id | enterprise id                                                                                        |        |
